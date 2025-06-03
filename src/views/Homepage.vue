<template>
    <NavBar></NavBar>
    <div class="container">
        <HomePageMid
            style="
                margin-bottom: 50px;
                width: 100%;
            "
        />
        <!-- <GuideCarousel :imgArray="imgArray"></GuideCarousel> -->
    </div>
</template>

<script>
import GuideCarousel from "@/components/guidePage/GuideCarousel.vue";
import NavBar from "@/components/guidePage/NavBar.vue";
import HomePageMid from "@/components/homePage/homePageMid.vue";
import RightSideBar from "@/components/homePage/rightSideBar.vue";
import sideBar from "@/components/homePage/sideBar.vue";
export default {
    data() {
        return {
            imgArray: [
                '/images/guidePage/guide/guide1.png',
                '/images/guidePage/guide/guide2.png',
                '/images/guidePage/guide/guide3.png',
                '/images/guidePage/guide/guide4.png',
                '/images/guidePage/guide/guide5.png',
                '/images/guidePage/guide/guide6.png',
            ],
        };
    },
    components: {
        HomePageMid,
        sideBar,
        RightSideBar,
        NavBar,
        GuideCarousel,
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
