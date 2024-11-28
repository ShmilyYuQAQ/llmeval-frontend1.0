<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import GuidePage from "./views/GuidePage.vue";

export default {
    name: "App",
    components: {
        GuidePage
    },
};
</script>

<style scoped>
.container {
    /* display: flex; */
    width: 100%;
}
</style>
