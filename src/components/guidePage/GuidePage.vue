<template>
    <NavBar></NavBar>
    <main class="page-content">
        <div class="main-content">
            <div style="position: relative;">
                <div class="home-page">
                    <div class="banner">
                        <h1>LLMeval</h1>
                        <p>一个提供模型评测和模型选择建议的平台</p>
                    </div>
                    <div class="image-container">
                        <img src="./images/1.png" alt="">
                    </div>
                    <div class="sponsors-container">
                        <h2>赞助商</h2>
                        <div class="sponsors-list">
                            <SponsorCard :sponsor="sponsor"></SponsorCard>
                            <SponsorCard :sponsor="sponsor"></SponsorCard>
                            <SponsorCard :sponsor="sponsor"></SponsorCard>
                            <SponsorCard :sponsor="sponsor"></SponsorCard>
                        </div>
                    </div>
                    <div class="cards">
                        <GuideCard v-for="formData in cardDatas" :key="formData.titile" :cardData="formData"></GuideCard>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import NavBar from './NavBar.vue';
import SponsorCard from './sponsorCard.vue'
import GuideCard from './guideCard.vue'
export default {
    components:{
        NavBar,
        SponsorCard,
        GuideCard
    },
    data(){
        return{
            sponsor:{
                name:"南开大学软件学院",
                logo:"./public/images/guidePage/logo.png",
                description:"我们是南开大学软件学院，致力于为软件开发者提供优质的软件服务。"
            },
            cardDatas:[
                {titile:'指南',content:'了解设计指南，帮助产品设计人员搭建逻辑清晰、结构合理且高效易用的产品。',icon:0},
                {titile:'评测',content:'评测模型的准确性、鲁棒性、可靠性、效率性，并提供改进建议。',icon:1},
                {titile:'选择',content:'提供模型选择建议，帮助产品设计人员快速、准确地选择最适合的模型。',icon:2}
            ]

        }
    }

}
</script>

<style scoped>
.page-content{
    padding-top:55px;
    background-color: rgb(255,255,255);
}
.main-content{
    padding: 40px 40px 0;
    display: block;
}
.banner{
    text-align: center;
}
.banner>h1{
    font-size: 48px;
    font-weight: 800;
    margin: 0;
    color: #303133;
    font-family: Inter, sans-serif
}
.banner>p{
    font-size: 16px;
    margin-top: 20px;
    color:#606266;
    margin: 1rem 0;
    line-height: 1.7;
}
.image-container{
    width: 800px;
    margin: 20px auto;
    position: relative;
}
.image-container>img{
    max-width: 100%;
}
.sponsors-container{
    margin-top: 72px;
}
.sponsors-container>h2{
    margin-top: 0;
    text-align: center;
    margin-bottom: 1rem;
    font-weight: 500;
    color:#606266;
}
.sponsors-list{
    display: grid;
    min-width: 220px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 420px));
    justify-content: center;
    gap: 0.25rem;
    grid-gap: 0.25rem;
}
.cards{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 0 auto 80px;
    max-width: 1200px;
}
</style>