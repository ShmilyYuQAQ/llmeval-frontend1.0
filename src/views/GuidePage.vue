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
                        <p>
                            一个标签化展示大模型能力，为用户提供大模型选择建议的平台
                        </p>
                    </div>
                    
                    <div class="cards">
                        <div class="guide-card">
                            <div class="card-header">
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
                            </div>
                            <div class="card-body">
                                <div class="text_container">
                                    <h2 style="text-align: center">
                                        标签化：充分展现各模型特色
                                    </h2>
                                    <ul style="text-align: left">
                                        <li>
                                            没有分数的直观对比，而是以标签的形式去描述模型
                                        </li>
                                        <li>
                                            各模型的能力、特色可以在网站上充分体现出来
                                        </li>
                                        <li>细粒度的模型能力对比,200+标签</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="guide-card">
                            <div class="card-header">
                                <div class="user_container">
                                    <el-icon size="60"><UserFilled /></el-icon>
                                    <div class="tags_container">
                                        <div class="icon_text text_1">
                                            个性化推荐
                                        </div>
                                        <div class="icon_text text_1">
                                            需求处理
                                        </div>
                                        <div class="icon_text text_1">
                                            评论交互
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="text_container">
                                    <h2 style="text-align: center">
                                        交互性:用户导向的评测与推荐网站
                                    </h2>
                                    <ul style="text-align: left">
                                        <li>
                                            根据用户搜索、收藏历史个性化推荐模型
                                        </li>
                                        <li>
                                            用户可以输入任务需求，得到模型推荐结果
                                        </li>
                                        <li>
                                            用户可以对各大模型进行评论，交互性强
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="guide-card">
                            <div class="card-header">
                                <div class="img-container">
                                    <img
                                        src="@/components/guidePage/images/12.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="text_container">
                                    <h2 style="text-align: center">
                                        个性化:给用户提供选择模型的参考
                                    </h2>
                                    <ul style="text-align: left">
                                        <li>
                                            划分五级能力标签，让用户了解模型能力
                                        </li>
                                        <li>根据用户收藏个性化推荐模型</li>
                                        <li>针对用户特定需求推荐模型</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h1 style="text-align: center; margin-bottom: 80px">
                        能力等级
                    </h1>
                    <div class="pyramid-container" style="width: 80%;margin-bottom:100px">
                        <img
                            src="@/components/guidePage/images/1.jpg"
                            alt=""
                            style="width: 90%"
                        />
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
    margin-bottom: 20px;
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
.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 0 auto 80px;
    max-width: 1500px;
    margin-top: 59px;
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
    height: 250px;
    display: grid;
    grid-template-columns: 1fr 1fr; /* 创建两列，每列等宽 */
    grid-template-rows: 1fr 1fr; /* 创建两行，每行等高 */
    gap: 10px; /* 可选，设置网格项目之间的间隙 */
    /* border-bottom: solid 1px #e4e7ed; */
}
.img-container {
    width: 300px;
    height: 250px;
}
.icon_item {
    padding: 20px; /* 可选，设置内边距 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.text_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
}
.icon_text {
    border: 2px dashed #409eff;
    color: rgb(23, 57, 101);
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 3px;
    padding-bottom: 3px;
    text-align: center;
    margin-top: 10px;
}
.user_container {
    height: 250px;
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.tags_container {
    margin-left: 40px;
}
.text_1 {
    margin-bottom: 20px;
}
.card-header {
    height: 300px;
    margin-top: 20px;
    border-bottom: solid 1px #e4e7ed;
}
.guide-card {
    background: #ffffff;
    border: 1px solid #dcdfe6;
    text-align: center;
    position: relative;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
}
.card-body {
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
}
h3 {
    margin: 0;
    font-size: 18px;
    color: #303133;
    font-weight: 400;
}
p {
    font-size: 14px;
    color: #99a9bf;
    padding: 0 25px;
    line-height: 20px;
    margin: 16px 0;
}
.card-footer {
    bottom: 0;
    padding: 0;
    border-top: 1px solid #e4e7ed;
}
.card-footer:hover {
    background-color: #409eff;
}
a {
    line-height: 52px;
    font-size: 14px;
    color: #409eff;
    text-align: center;
    border: 0;
    padding: 0;
    cursor: pointer;
    background-color: #ffffff;
    transition: all 0.3s;
    text-decoration: none;
    display: block;
}
.card-a:hover {
    background-color: #409eff;
    color: #ffffff;
}
</style>
