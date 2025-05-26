<template>
    <NavBar></NavBar>
    <main class="page-content">
        <div class="main-content">
            <!-- 原有的页面内容 -->
            <div style="
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                ">
                <div class="home-page" style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                    ">
                    <div class="banner">
                        <h1>琅琊海评</h1>
                        <p>
                            一个标签化展示大模型能力，为用户提供大模型选择建议的平台
                        </p>
                    </div>
                    <div class="level">
                        <h1>
                            能力等级
                        </h1>
                        <p>Capability level</p>
                        <div class="pyramid-container" style="width: 80%;margin-bottom:100px;position:relative;">
                            <img src="@/components/guidePage/images/level.png" alt="" style="width: 90%" />
                            <div class="level-descriptions">
                                <div class="level-item">
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;模型表现明显不足，与平均水平差距较大，需要较大改进</p>
                                </div>
                                <div class="level-item">
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;能力表现略低于平均水平，需要进一步提升。</p>
                                </div>
                                <div class="level-item good">
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;模型表现尚可，达到一般水平，但仍有一定的提升空间。</p>
                                    <h4 class="model-title">代表模型</h4>
                                    <div class="model-list">
                                        <a href="/model-detail/ERNIE 4.0" target="_blank" class="model-card" style="color: #ffcc00;">
                                            ERNIE 4.0<br><span>文本生成较稳定</span>
                                        </a>
                                        <a href="/model-detail/ChatGLM3-6B" target="_blank" class="model-card" style="color: #ffcc00;">
                                            ChatGLM3-6B<br><span>支持多语言</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="level-item excellent">
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;模型表现优异，超过大多数模型，仅有一些轻微不足。</p>
                                    <h4 class="model-title">代表模型</h4>
                                    <div class="model-list">
                                        <a href="/model-detail/Yi-1.5-9B-Chat" target="_blank" class="model-card" style="color: #33cc33;">
                                            Yi-1.5-9B-Chat<br><span>推理速度快</span>
                                        </a>
                                        <a href="/model-detail/DeepSeek-R1" target="_blank" class="model-card" style="color: #33cc33;">
                                            DeepSeek-R1<br><span>语义理解强</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="level-item top">
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;模型能力非常出色，远超平均水平，几乎无明显缺陷。</p>
                                    <h4 class="model-title">代表模型</h4>
                                    <div class="model-list">
                                        <a href="/model-detail/Doubao-pro-32k" target="_blank" class="model-card" style="color: #9933cc;">
                                            Doubao-pro-32k<br><span>综合能力极强</span>
                                        </a>
                                        <a href="/model-detail/GPT-4o" target="_blank" class="model-card" style="color: #9933cc;">
                                            GPT-4o<br><span>多模态支持</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-container">
                        <div class="cards">
                            <p class="card-title">标签识能，交互荐优，个性匹配</p>
                            <p class="card-subtitle">Interactive recommendation, personalized matching</p>
                            <div class="guide-card">
                                <div class="card-body">
                                    <div class="card-icon">
                                        <img src="@/components/guidePage/images/biaoqian.png" alt="标签" />
                                    </div>
                                    <div class="text_container">
                                        <h2>标签化：充分展现各模型特色</h2>
                                        <ul>
                                            <li>没有分数的直观对比，而是以标签的形式去描述模型</li>
                                            <li>各模型的能力、特色可以在网站上充分体现出来</li>
                                            <li>细粒度的模型能力对比,200+标签</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="guide-card">
                                <div class="card-body">
                                    <div class="card-icon">
                                        <img src="@/components/guidePage/images/jiaohu.png" alt="交互" />
                                    </div>
                                    <div class="text_container">
                                        <h2>交互性：用户导向的评测与推荐网站</h2>
                                        <ul>
                                            <li>根据用户搜索、收藏历史个性化推荐模型</li>
                                            <li>用户可以输入任务需求，得到模型推荐结果</li>
                                            <li>用户可以对各大模型进行评论，交互性强</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="guide-card">
                                <div class="card-body">
                                    <div class="card-icon">
                                        <img src="@/components/guidePage/images/gexing.png" alt="个性" />
                                    </div>
                                    <div class="text_container">
                                        <h2>个性化：给用户提供选择模型的参考</h2>
                                        <ul>
                                            <li>划分五级能力标签，让用户了解模型能力</li>
                                            <li>根据用户收藏个性化推荐模型</li>
                                            <li>针对用户特定需求推荐模型</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right-content">
                            <img src="@\components\guidePage\images\doubao.png"
                                alt="豆包" class="pyramid-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!-- 页面底部轮播图 -->
    <div style="display: flex; justify-content: center;background-color: white;margin-bottom:20px">
        <GuideCarousel style="max-width: 800px; width: 100%;" />
    </div>
</template>

<script>
import NavBar from "@/components/guidePage/NavBar.vue";
import Pyramid from "@/components/guidePage/Pyramid.vue";
import GuideCard from "@/components/guidePage/guideCard.vue";
import SponsorCard from "@/components/guidePage/sponsorCard.vue";
import GuideCarousel from "@/components/guidePage/GuideCarousel.vue";

export default {
    components: {
        NavBar,
        SponsorCard,
        GuideCard,
        Pyramid,
        GuideCarousel,
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
            currentIndex: 0
        };
    },
    mounted() {
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }, 3000);
    }
};
</script>

<style scoped>
/* 原有的样式 */
.page-content {
    background-color: rgb(255, 255, 255);
}

.main-content {
    display: block;
}

.banner {
    text-align: center;
    width: 100%;
    height: 197px;
    background-image: url("@/components/guidePage/images/LLM_BK.png");
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 10; /* 设置较高的 z-index 值，使其显示在上层 */
}

.banner>h1 {
    font-size: 32px;
    font-weight: 400;
    margin: 50px;
    color: #870066;
    font-family: PingFangSC, PingFang SC;
    font-style: normal;
    line-height: 45px;
    position: relative;
}

.banner>h1::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 1px;
    background-color: #C4C5CC;
    display: block;
}

.banner>p {
    font-size: 16px;
    color: #870066;
    margin: -15px;
    line-height: 22px;
    font-family: PingFangSC, PingFang SC;
    font-style: normal;
}

/* 内容容器样式 */
.content-container {
    display: flex;
    width: 100%;
    margin-bottom: 80px;
    /* padding: 0 20px; */
    box-sizing: border-box;
    padding-left: 80px;
}

.card-title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 700;
    font-size: 28px;
    color: #1E2437;
    line-height: 40px;
    text-align: left;
    font-style: normal;
    margin: 0;
}

.card-subtitle {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #C2C5CE;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    margin: 0 0 16px 0;
}

.model-title {
    font-weight: bold;
    margin-top: 10px;
    font-size: 16px;
    text-align: center;
}

.model-list {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 8px;
}

.model-card {
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 12px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    width: 120px;
    font-size: 14px;
    text-align: center;
}

.model-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.level-item.good .model-card {
    border-left: 4px solid #ff9900;
    border-right: 4px solid #ff9900;
    margin: 0 auto; /* 添加此行 */
}

.level-item.excellent .model-card {
    border-left: 4px solid #33cc33;
    border-right: 4px solid #33cc33;
    margin: 0 auto; /* 添加此行 */
}

.level-item.top .model-card {
    border-left: 4px solid #9933cc;
    border-right: 4px solid #9933cc;
    margin: 0 auto; /* 添加此行 */
}

/* 卡片列表样式 */
.cards {
    display: flex;
    flex-direction: column;
    width: 45%;
    gap: 8px;
    padding: 50px 0 0 160px;
}

/* 单个卡片样式 */
.guide-card {
    background: #ffffff;
    padding: 0;
    transition: all 0.3s ease;
    width: 498px;
    height: 149px;
}


/* 卡片内部样式 */
.card-body {
    padding: 20px;
    display: flex;
    align-items: flex-start;
}

.card-icon {
    flex-shrink: 0;
    width: 47px;
    height: 47px;
    margin-right: 15px;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: #000000 1px dashed;
}

.card-icon img {
    width: 48px;
    height: 48px;
    object-fit: cover;
}

/* 文字内容容器样式 */
.text_container {
    flex-grow: 1;
}

.text_container h2 {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #000000;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    margin-bottom: 12px;
    margin-top: 8px;
}

/* 列表样式 */
.text_container ul {
    padding-left: 20px;
    margin: 0;
    list-style-type: disc;
}

ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

ul li {
    font-size: 14px;
    color: #606266;
    line-height: 1.5;
}

/* 右侧图片容器样式 */
.right-content {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

/* 图片样式 */
.pyramid-image {
    width: 115%;
    height: auto; /* 放大图片高度 */
    object-fit: contain;
    right: 100px;
    position: relative;
    top: 40px;
    transition: none; /* 取消动画效果 */
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
    .content-container {
        flex-direction: column;
    }

    .cards,
    .right-content {
        width: 100%;
        margin-right: 0;
    }

    .right-content {
        margin-top: 30px;
    }
}

.level {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url("@/components/guidePage/images/level_BK.png");
    background-size: cover;
    background-repeat: no-repeat;
    height: 900px;
    margin-top: -60px; /* 添加此行，向上移动20px */
}

.level h1 {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28px;
    color: #1E2437;
    line-height: 40px;
    text-align: left;
    font-style: normal;
    margin-bottom: 12px;
    margin-top: 100px;
}

.level p {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #C2C5CE;
    line-height: 22px;
    text-align: center;
    font-style: normal;
    margin-bottom: 50px;
    margin-top: 0;
}

.pyramid-container {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
}

.level-descriptions {
    position: absolute;
    width: 88.5%;
    display: flex;
    justify-content: space-between;
    top: 380px;
}

.level-item {
    position: relative;
    padding: 10px 15px;
    max-width: 16%;
    transition: all 0.3s ease;
}

.level-item:nth-child(1) {
    bottom: 0px;
}

.level-item:nth-child(2) {
    bottom: 30px;
}

.level-item:nth-child(3) {
    bottom: 60px;
}

.level-item:nth-child(4) {
    bottom: 85px;
}

.level-item:nth-child(5) {
    bottom: 125px;
}

.level-item p {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #1E2437;
    line-height: 1.4;
    text-align: start;
    margin: 0;
}

/* 新增的轮播图样式 */
.slider-container {
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: relative;
}

.slider {
    display: flex;
    width: calc(100% * 3);
    height: 100%;
    transition: transform 0.5s ease-in-out;
}

.slider img {
    width: calc(100% / 3);
    height: 100%;
    object-fit: cover;
}

.slider-dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
}

.slider-dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ccc;
    margin: 0 5px;
    cursor: pointer;
}

.slider-dots span.active {
    background-color: #333;
}
</style>