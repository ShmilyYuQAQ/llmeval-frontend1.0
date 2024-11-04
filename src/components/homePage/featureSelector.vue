<template>
    <div class="container">
        <featureElement
            :title="openSourceTitle"
            :checked="openSourceChecked"
            :options="openSourceOptions"
        ></featureElement>
        <featureElement
            :title="nlpTitle"
            :checked="nlpChecked"
            :options="nlpOptions"
        ></featureElement>
        <featureElement
            :title="voiceTitle"
            :checked="voiceChecked"
            :options="voiceOptions"
        ></featureElement>
        <featureElement
            :title="multiModalTitle"
            :checked="multiModalChecked"
            :options="multiModalOptions"
        ></featureElement>
        <featureElement
            :title="yearTitle"
            :checked="yearChecked"
            :options="yearOptions"
        ></featureElement>
    </div>
</template>
<script>
import featureElement from "./featureElement.vue";
export default {
    data() {
        return {
            openSourceTitle: "是否开源",
            openSourceChecked: ["开源"],
            openSourceOptions: ["开源", "不开源"],
            nlpTitle: "自然语言处理",
            nlpChecked: ["文本分类", "文本生成"],
            nlpOptions: ["文本分类", "文本生成", "翻译"],
            voiceTitle: "语音",
            voiceChecked:["语音识别","语音合成"],
            voiceOptions:["语音识别","语音合成","语音降噪"],
            multiModalTitle: "多模态",
            multiModalChecked:["图像描述","视频描述","文生图","视频问答"],
            multiModalOptions:["图像描述","视频描述","文生图","视频问答"],
            yearTitle:"年份",
            yearChecked:["2024","2023"],
            yearOptions:["2024","2023","2022","2021"]
        };
    },
    components: { featureElement },
};
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 90%;
    justify-content: center; /* 左对齐 */
}
</style>
