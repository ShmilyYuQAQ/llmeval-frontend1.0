<template>
    <div class="right_container">
        <div class="recommend_container">
            <div class="recommend_header">
                <h2 style="margin-left: 10px">模型推荐</h2>
                <el-button
                    type="primary"
                    size="mini"
                    class="details_button"
                    style="margin-right: 10px"
                    >See all</el-button
                >
            </div>
            <RecommendCard
                v-for="(item, index) in recommendModels"
                :key="index"
                :model="item"
            ></RecommendCard>
        </div>
        <div class="news_container">
            <div class="recommend_header">
                <h2 style="margin-left: 10px">最新资讯</h2>
                <el-button
                    type="primary"
                    size="mini"
                    class="details_button"
                    style="margin-right: 10px"
                    >See all</el-button
                >
            </div>
            <NewsCard
                v-for="(item, index) in news"
                :key="index"
                :news="item"
            ></NewsCard>
        </div>
    </div>
</template>

<script>
import RecommendCard from "./recommendCard.vue";
import NewsCard from "./newsCard.vue";
export default {
    data() {
        return {
            recommendModels: [],
            news: [],
        };
    },
    components: {
        RecommendCard,
        NewsCard,
    },
    methods: {
        getRecommendModels() {
            for (let i = 0; i < 4; i++) {
                this.recommendModels.push({
                    name: "whisper-large-v3-turbo",
                    author: "xxx",
                    likes: 100,
                    updated: "2021-07-31",
                });
            }
        },
        getNews() {
            for (let i = 0; i < 4; i++) {
                this.news.push({
                    title: "2024中国高校计算机大赛AIGC创新赛现已开通报名",
                    content:
                        "第一届(2024年)“中国高校计算机大赛-AIGC创新赛”(以下简称“竞赛”)由南开大学与vivo公司联合承办。该竞赛面向全国高校在校学生,以vivo自研通用大模型矩阵为技术底座,助力AIGC应用创新和内容创作。",
                    link: "",
                });
            }
        },
    },
    created() {
        this.getRecommendModels();
        this.getNews();
    },
};
</script>

<style scoped>
.right_container{
    width: 100%;
    height: 100vh;
    overflow: auto;
}
.recommend_container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    margin-bottom: 10px;
}
.recommend_header {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 20px;
}
.details_button {
    background-color: rgb(243, 243, 243);
    color: purple;
    font-weight: 600;
}
.details_button:hover {
    background-color: rgb(224, 162, 224);
}
.news_container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    margin-bottom: 10px;
}
</style>
