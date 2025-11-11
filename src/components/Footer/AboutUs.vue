<template>
    <NavBar />
    <div class="about-us">
        <h1 class="about-title">关于琅琊海评</h1>
        <h2 class="introduce">平台简介</h2>
        <p class="introduce2">琅琊海评是一个专注大模型评测的创新平台，采用标签化解析与个性化导航，为用户提供精准、多维的模型能力评估，助力找到最契合的解决方案。</p>

        <h2 class="introduce">平台特色</h2>
        <p class="introduce2">标签化解析：通过超200个标签全面呈现模型在语言理解、专业知识等方面的能力，突破单一评分限制，实现多角度精准评估。</p>
        <p class="introduce2">个性化导航：基于用户行为与具体任务需求，智能推荐匹配模型，提供定制化选型建议。</p>
        <p class="introduce2">用户交互：鼓励用户分享使用体验，构建开放交流社区，反馈也将反哺平台优化。</p>

        <h2 class="introduce">资源整合</h2>
        <p class="introduce2">模型数据库：汇集600+中外主流大模型，覆盖NLP、图像识别、数据处理等多领域，满足多样化需求。</p>
        <p class="introduce2">行业资讯：实时更新技术动态与应用案例，帮助用户把握前沿趋势，辅助科学决策。</p>
        
        <h2 class="introduce">团队理念</h2>
        <p class="introduce2">我们不是简单评分的裁判，而是致力于成为精准的能力翻译官。琅琊海评团队以专业视角深入剖析模型能力，将其转化为用户易懂的标签与信息，让技术选择回归本质，助力用户在复杂模型市场中迅速找到契合业务需求的理想方案，为行业发展贡献力量。</p>
        
        <h2 class="introduce">支持与合作</h2>
        <p class="introduce2">平台由南开大学软件学院、信创海河实验室与深圳市点通数据有限公司联合支持，持续优化服务体验。我们欢迎更多合作，共同推进大模型评测落地与应用。</p>
        <p class="introduce2">如您对平台有任何建议或想法，欢迎通过以下方式联系我们：</p>
        <p class="introduce2">电子邮箱：langyayaiping@datumdata.com</p>
        <p class="introduce2">微信公众号：琅琊海评 - 大模型评测（微信号：datum2025）</p>
        <img src="/images/wechat.jpg" alt="微信公众号" style="width: 200px; height: 200px;  margin: 0 auto auto 150px;" />

        <p class="introduce2">网站链接：https://langyahaiping.com</p>
        <p class="introduce2">琅琊海评，助您精准探索大模型世界，携手迈向智能未来。</p>
     
        <h2 class="introduce" style="margin-top: 30px;">深圳市点通数据有限公司联系方式</h2>
        <p class="introduce2">地 址：广东省深圳市梅林路梅林阁南三楼</p>
        <p class="introduce2">邮 编：518049</p>
        <p class="introduce2">电 话：(86) 0755-83970989,0755-83177010</p>
        <p class="introduce2">传 真： (86) 0755-83104770</p>
        <p class="introduce2">E-mail：szdatum@datumdata.com</p>
    </div>  
</template>

<script>
import NavBar from '../guidePage/NavBar.vue';

export default {
  name: 'AboutUs',
  components: {
    NavBar
  }
}
</script>

<style scoped>
.about-title {
  text-align: center;
}

.introduce {
  margin-left: 150px;
}

.introduce2 {
  padding-left: 150px;
  padding-right: 150px;
  font-size: larger;
  line-height: 2;
}
</style>