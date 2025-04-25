<template>
    <div id="app">
        <router-view />
    </div>
    <Footer />
</template>

<script>
import GuidePage from "./views/GuidePage.vue";
import Footer from "./components/Footer.vue";
export default {
    name: "App",
    components: {
        GuidePage,
        Footer,
    },
};
</script>

<style scoped>
.container {
    /* display: flex; */
    width: 100%;
}
</style>
