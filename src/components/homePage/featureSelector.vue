<template>
    <div class="container">
        <featureElement
            :title="openSourceTitle"
            :checked="openSourceChecked"
            :options="openSourceOptions"
        ></featureElement>
        <tagContainter
            :tags="tags"
            :tag-title="tagTitle"
            :selected-value="selectedValue"
        ></tagContainter>
        <tagContainter
            :tags="tags"
            :tag-title="tagTitle"
            :selected-value="selectedValue"
        ></tagContainter>
        <tagContainter
            :tags="tags"
            :tag-title="tagTitle"
            :selected-value="selectedValue"
        ></tagContainter>
        <tagContainter
            :tags="tags"
            :tag-title="tagTitle"
            :selected-value="selectedValue"
        ></tagContainter>
        <!-- <featureElement
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
        ></featureElement> -->
    </div>
</template>
<script>
import featureElement from "./featureElement.vue";
import tagContainter from "./tagContainter.vue";
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
            voiceChecked: ["语音识别", "语音合成"],
            voiceOptions: ["语音识别", "语音合成", "语音降噪"],
            multiModalTitle: "多模态",
            multiModalChecked: ["图像描述", "视频描述", "文生图", "视频问答"],
            multiModalOptions: ["图像描述", "视频描述", "文生图", "视频问答"],
            yearTitle: "年份",
            yearChecked: ["2024", "2023"],
            yearOptions: ["2024", "2023", "2022", "2021"],
            tags: [
                {
                    text: "自然语言处理",
                    value: "NLP",
                    subtags: [
                        { text: "文本分类", value: "TextClassification" },
                        { text: "情感分析", value: "SentimentAnalysis" },
                        { text: "机器翻译", value: "MachineTranslation" },
                    ],
                },
                {
                    text: "计算机视觉",
                    value: "CV",
                    subtags: [
                        { text: "图像识别", value: "ImageRecognition" },
                        { text: "视频分析", value: "VideoAnalysis" },
                        { text: "3D视觉", value: "3DVision" },
                    ],
                },
                {
                    text: "语音识别与合成",
                    value: "Speech",
                    subtags: [
                        { text: "语音转文字", value: "SpeechToText" },
                        { text: "文字转语音", value: "TextToSpeech" },
                        { text: "语音增强", value: "SpeechEnhancement" },
                    ],
                },
                {
                    text: "知识图谱",
                    value: "KG",
                    subtags: [
                        { text: "实体识别", value: "EntityRecognition" },
                        { text: "关系抽取", value: "RelationExtraction" },
                        { text: "图谱构建", value: "GraphConstruction" },
                    ],
                },
                {
                    text: "强化学习",
                    value: "RL",
                    subtags: [
                        { text: "策略学习", value: "PolicyLearning" },
                        { text: "环境模拟", value: "EnvironmentSimulation" },
                        { text: "多智能体系统", value: "MultiAgentSystems" },
                        { text: "多智能体系统", value: "MultiAgentSystems" },
                        { text: "多智能体系统", value: "MultiAgentSystems" },
                        { text: "多智能体系统", value: "MultiAgentSystems" },
                        { text: "多智能体系统", value: "MultiAgentSystems" },
                        { text: "多智能体系统", value: "MultiAgentSystems" },
                        { text: "多智能体系统", value: "MultiAgentSystems" },
                        { text: "多智能体系统", value: "MultiAgentSystems" },
                        { text: "多智能体系统", value: "MultiAgentSystems" },
                        { text: "多智能体系统", value: "MultiAgentSystems" },
                    ],
                },
            ],
            selectedValue: null,
            tagTitle: "计算机视觉",
        };
    },
    components: { featureElement, tagContainter },
};
</script>
<style scoped>
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 90%;
    justify-content: center; /* 左对齐 */
    z-index: 9999;
}
</style>
