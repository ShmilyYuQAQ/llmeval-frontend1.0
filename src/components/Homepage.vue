<template>
    <div class="container">
        <div>
            <sideBar
                style="
                    position: fixed;
                    width: 200px;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    background-color: white;
                "
            />
        </div>
            <HomePageMid  style="margin-left: 200px;margin-right: 400px;margin-bottom: 50px;"/>
        <div
            style="
                position: fixed;
                width: 400px;
                right: 0;
                top: 0;
                height: 100vh;
                background-color: white;
                margin-top: 10px;
                border: solid 1px #e6e6e6;
                border-radius: 10px;
            "
        >
            <RightSideBar />
        </div>
    </div>
</template>

<script>
import HomePageMid from "./homePage/homePageMid.vue";
import RightSideBar from "./homePage/rightSideBar.vue";
import sideBar from "./homePage/sideBar.vue";
export default {
    data() {
        return {};
    },
    components: {
        HomePageMid,
        sideBar,
        RightSideBar,
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
}
</style>
