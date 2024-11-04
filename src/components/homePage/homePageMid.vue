<template>
    <div class="home-page-mid">
        <FeatureSelector />
        <FeatureSequencer/>
        <modelCardContainer/>
    </div>
</template>
<script>
import FeatureSelector from "./featureSelector.vue";
import FeatureSequencer from "./featureSequencer.vue";
import modelCardContainer from './modelCardContainer.vue';
export default {
    data() {
        return {};
    },
    components: {
        FeatureSelector,
        FeatureSequencer,
        modelCardContainer
    },
    methods: {},
};
</script>
<style scoped>
.home-page-mid {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap:20px;
}
</style>