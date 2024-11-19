<template>
    <div id="app">
        <nav>
            <router-link to="/"></router-link>
        </nav>
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
