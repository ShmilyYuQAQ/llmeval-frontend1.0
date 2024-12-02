<template>
    <div class="home-page-mid">
        <FeatureSelector @custom-event="selectModel" :selected_tag="selected_tag"/>
        <FeatureSequencer/>
        <modelCardContainer :datas="datas" ref="modelCardContainer" ></modelCardContainer>
    </div>
</template>
<script>
import axiosInstance from "@/plugins/axios";
import FeatureSelector from "./featureSelector.vue";
import FeatureSequencer from "./featureSequencer.vue";
import modelCardContainer from "./modelCardContainer.vue";
export default {
    data() {
        return {
            datas: [],
            selected_tag:""
        };
    },
    components: {
        FeatureSelector,
        FeatureSequencer,
        modelCardContainer,
    },
    methods: {
        async fetchData() {
            try {
                const response = await axiosInstance.get("/model/");
                this.datas = response.data.data;
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            } catch (error) {
                this.error = "Failed to fetch data";
            }
        },
        async selectModel(tag){
            try {
                const response = await axiosInstance.get("/model/tagName/?tagName="+tag);
                this.datas = response.data.data || [];
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
                this.selected_tag = tag;
                console.log(tag,this.datas);
            } catch (error) {
                this.datas = [];
                this.error = "Failed to fetch data";
            }
        }
    },
    created() {
        this.fetchData();
    },
    watch:{
        "models": function(newVal, oldVal){
            this.$refs.modelCardContainer.models = newVal;
            this.$refs.modelCardContainer.updatePaginatedModel();
        }
    }
};
</script>
<style scoped>
.home-page-mid {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}
</style>
