<template>
    <NavBar></NavBar>
    <main class="page-content">
        <div class="main-content">
            <div
                style="
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                "
            >
                <div
                    class="home-page"
                    style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                    "
                >
                    <div class="banner">
                        <h1>LLMeval</h1>
                        <p>一个提供模型评测和模型选择建议的平台</p>
                    </div>
                    <div class="image-container">
                        <img src="@/components/guidePage/images/1.png" alt="" />
                    </div>
                    <!-- <div class="sponsors-container">
                        <h2>赞助商</h2>
                        <div class="sponsors-list">
                            <SponsorCard :sponsor="sponsor"></SponsorCard>
                            <SponsorCard :sponsor="sponsor"></SponsorCard>
                            <SponsorCard :sponsor="sponsor"></SponsorCard>
                            <SponsorCard :sponsor="sponsor"></SponsorCard>
                        </div>
                    </div> -->
                    <h1 style="text-align: center">能力等级</h1>
                    <div class="pyramid-container" style="width: 80%">
                        <img
                            src="@/components/guidePage/images/guide_pyramid.png"
                            alt=""
                            style="width: 100%"
                        />
                    </div>
                    <div class="cards">
                        <GuideCard
                            v-for="formData in cardData"
                            :key="formData.title"
                            :cardData="formData"
                        ></GuideCard>
                    </div>
                    <div class="features">
                        <div class="feature">
                            <div class="icon_container">
                                <div class="icon_item">
                                    <el-icon size="40"
                                        ><ChatLineSquare
                                    /></el-icon>
                                    <div class="icon_text">语言理解</div>
                                </div>
                                <div class="icon_item">
                                    <el-icon size="40"><Search /></el-icon>
                                    <div class="icon_text">推理能力</div>
                                </div>
                                <div class="icon_item">
                                    <el-icon size="40"><Cpu /></el-icon>
                                    <div class="icon_text">知识能力</div>
                                </div>
                                <div class="icon_item">
                                    <el-icon size="40"><More /></el-icon>
                                </div>
                            </div>
                            <div class="text_container">
                                <h2 style="text-align: center;">标签化：充分展现各模型特色</h2>
                                <ul>
                                    <li>
                                        没有分数的直观对比，而是以标签的形式去描述模型
                                    </li>
                                    <li>
                                        各模型的能力、特色可以在网站上充分体现出来
                                    </li>
                                    <li>细粒度的模型能力对比</li>
                                    <li>200+标签</li>
                                </ul>
                            </div>
                        </div>
                        <div class="feature">
                            <div class="user_container">
                                <el-icon size="60"><UserFilled /></el-icon>
                                <div class="tags_container">
                                    <div class="icon_text text_1">个性化推荐</div>
                                    <div class="icon_text text_1">需求处理</div>
                                    <div class="icon_text text_1">评论交互</div>
                                </div>
                            </div>
                            <div class="text_container">
                                <h2 style="text-align: center;">交互性:用户导向的评测与推荐网站</h2>
                                <ul>
                                    <li>
                                        根据用户搜索、收藏历史个性化推荐模型
                                    </li>
                                    <li>
                                        用户可以输入任务需求，得到模型推荐结果
                                    </li>
                                    <li>用户可以对各大模型进行评论，交互性强</li>
                                    <li>用户可以查看其他人的评论，提供一个平台，帮助用户了解大众对各模型的看法</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import NavBar from "@/components/guidePage/NavBar.vue";
import Pyramid from "@/components/guidePage/Pyramid.vue";
import GuideCard from "@/components/guidePage/guideCard.vue";
import SponsorCard from "@/components/guidePage/sponsorCard.vue";
export default {
    components: {
        NavBar,
        SponsorCard,
        GuideCard,
        Pyramid,
    },
    data() {
        return {
            sponsor: {
                name: "南开大学软件学院",
                logo: "./public/images/guidePage/logo.png",
                description:
                    "我们是南开大学软件学院，致力于为软件开发者提供优质的软件服务。",
            },
            cardData: [
                {
                    title: "指南",
                    content:
                        "了解设计指南，帮助产品设计人员搭建逻辑清晰、结构合理且高效易用的产品。",
                    icon: 0,
                },
                {
                    title: "评测",
                    content:
                        "评测模型的准确性、鲁棒性、可靠性、效率性，并提供改进建议。",
                    icon: 1,
                },
                {
                    title: "选择",
                    content:
                        "提供模型选择建议，帮助产品设计人员快速、准确地选择最适合的模型。",
                    icon: 2,
                },
            ],
        };
    },
};
</script>

<style scoped>
ul {
    display: flex; /* 使用Flexbox布局 */
    flex-direction: column; /* 垂直排列 */
    gap: 15px; /* 调整列表项之间的间距 */
}
.page-content {
    padding-top: 55px;
    background-color: rgb(255, 255, 255);
}
.main-content {
    padding: 40px 40px 0;
    display: block;
}
.banner {
    text-align: center;
}
.banner > h1 {
    font-size: 48px;
    font-weight: 800;
    margin: 0;
    color: #303133;
    font-family: Inter, sans-serif;
}
.banner > p {
    font-size: 16px;
    margin-top: 20px;
    color: #606266;
    margin: 1rem 0;
    line-height: 1.7;
}
.image-container {
    width: 800px;
    margin: 20px auto;
    position: relative;
}
.image-container > img {
    max-width: 100%;
}
.sponsors-container {
    margin-top: 72px;
}
.sponsors-container > h2 {
    margin-top: 0;
    text-align: center;
    margin-bottom: 1rem;
    font-weight: 500;
    color: #606266;
}
.sponsors-list {
    display: grid;
    min-width: 220px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 420px));
    justify-content: center;
    gap: 0.25rem;
    grid-gap: 0.25rem;
}
.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 0 auto 80px;
    max-width: 1200px;
}
.features {
    width: 100%;
}
.feature {
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
    border-bottom: solid 1px #e4e7ed;
}
.icon_container {
    width: 300px;
    display: grid;
    grid-template-columns: 1fr 1fr; /* 创建两列，每列等宽 */
    grid-template-rows: 1fr 1fr; /* 创建两行，每行等高 */
    gap: 10px; /* 可选，设置网格项目之间的间隙 */
}
.icon_item {
    padding: 20px; /* 可选，设置内边距 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.text_container {
    margin-left: 20px;
    width:60%;
}
.icon_text {
    border: 2px dashed #409eff;
    color: rgb(23, 57, 101);
    padding-left: 12px;
    padding-right: 12px;
    padding-top:3px;
    padding-bottom: 3px;
    text-align: center;
    margin-top: 10px;
}
.user_container{
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.tags_container{
    margin-left:20px;
}
.text_1{
    margin-bottom:20px;
}
</style>
