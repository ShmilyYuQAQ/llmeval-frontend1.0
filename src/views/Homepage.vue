<template>
    <NavBar></NavBar>
    <div class="container">
        <HomePageMid
            style="
                margin-bottom: 50px;
                width: 100%;
            "
        />
    </div>
</template>

<script>
import NavBar from "@/components/guidePage/NavBar.vue";
import HomePageMid from "@/components/homePage/homePageMid.vue";
import RightSideBar from "@/components/homePage/rightSideBar.vue";
import sideBar from "@/components/homePage/sideBar.vue";
export default {
    data() {
        return {};
    },
    components: {
        HomePageMid,
        sideBar,
        RightSideBar,
        NavBar,
    },
    methods: {},
};
</script>
<style scoped>
.container {
    position: relative;
    display: flex;
    /* align-items: center; */
    flex-direction: row;
    /* background-color: rgb(244, 247, 255); */
    z-index: 999;
}
</style>
