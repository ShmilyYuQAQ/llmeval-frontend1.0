<template>
    <div class="home-page-mid">
        <FeatureSelector
            @custom-event="selectModel"
            :selected_tag="selected_tag"
            @change="openSourceChange"
        />
        <FeatureSequencer />
        <modelCardContainer
            :datas="datas"
            ref="modelCardContainer"
        ></modelCardContainer>
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
            selected_tag: "",
            originDatas: [],
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
                this.originDatas = response.data.data; //所有模型数据
                this.datas = response.data.data; //展示的模型数据
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
                // console.log(this.datas);
                let temp = []
                for (let i = 0; i < this.datas.length; i++) {
                    try {
                        this.datas[i].model_image_path =
                            "http://49.233.82.133:5174" +
                            this.getSubstringAfterKeyword(
                                this.datas[i].model_image_path,
                                "public"
                            );
                        if(this.datas[i].model_image_path==="http://49.233.82.133:5174"){
                            temp.push(i)
                        }
                    } catch (error) {
                        // console.log(i)
                    }
                }
                console.log(temp)
                console.log(this.datas);
            } catch (error) {
                this.datas = [];
                this.error = "Failed to fetch data";
            }
        },
        async selectModel(tag) {
            try {
                const response = await axiosInstance.get(
                    "/model/tagName/?tagName=" + tag
                );
                this.datas = response.data.data || [];
                this.originDatas = response.data.data || [];
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
                this.selected_tag = tag;
                console.log(tag, this.datas);
            } catch (error) {
                this.datas = [];
                this.error = "Failed to fetch data";
            }
        },
        getSubstringAfterKeyword(inputString, keyword) {
            // 找到关键字在字符串中的位置
            const index = inputString.indexOf(keyword);

            // 如果找到了关键字
            if (index !== -1) {
                // 截取关键字之后的内容
                return inputString.substring(index + keyword.length);
            } else {
                // 如果没有找到关键字，返回空字符串或者根据需要进行其他处理
                return "";
            }
        },
        filterItems(filterArray) {
            // 根据传入的筛选条件数组来筛选items数组
            const filteredItems = this.originDatas.filter((item) => {
                // 如果筛选条件数组为空，则保留所有元素
                if (filterArray.length === 0) return true;

                // 如果筛选条件数组包含"开源"，则保留isOpenSource为true的元素
                if (filterArray.includes("开源") && item.isOpenSource)
                    return true;

                // 如果筛选条件数组包含"闭源"，则保留isOpenSource为false的元素
                if (filterArray.includes("不开源") && !item.isOpenSource)
                    return true;

                // 如果元素不满足上述任何条件，则不保留
                return false;
            });

            return filteredItems;
        },
        openSourceChange(value) {
            this.datas = this.filterItems(value);
            this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
        },
    },
    created() {
        this.fetchData();
    },
    watch: {
        models: function (newVal, oldVal) {
            this.$refs.modelCardContainer.models = newVal;
            this.$refs.modelCardContainer.updatePaginatedModel();
        },
    },
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
