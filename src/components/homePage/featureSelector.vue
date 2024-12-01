<template>
    <div class="container">
        <featureElement
            :title="openSourceTitle"
            :checked="openSourceChecked"
            :options="openSourceOptions"
        ></featureElement>
        <tagContainter
            :tags="tags_0"
            :tag-title="tagTitle_0"
            :selected-value="selectedValue"
        ></tagContainter>
        <tagContainter
            :tags="tags_1"
            :tag-title="tagTitle_1"
            :selected-value="selectedValue"
        ></tagContainter>
        <tagContainter
            :tags="tags_2"
            :tag-title="tagTitle_2"
            :selected-value="selectedValue"
        ></tagContainter>
        <tagContainter
            :tags="tags_3"
            :tag-title="tagTitle_3"
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
            tags_0: [
                {
                    text: "知识记忆及应用",
                    value: "",
                    subtags: [
                        { text: "学科知识", value: "" },
                        { text: "常识", value: "" },
                    ],
                },
                {
                    text: "理解能力",
                    value: "",
                    subtags: [
                        { text: "信息分析", value: "" },
                        { text: "信息提取", value: "" },
                        { text: "信息概况", value: "" },
                        { text: "信息分类", value: "" },
                    ],
                },
                {
                    text: "推理能力",
                    value: "",
                    subtags: [
                        { text: "常识推理", value: "" },
                        { text: "逻辑推理", value: "" },
                        { text: "决策推理", value: "" },
                        { text: "推理思维链", value: "" },
                    ],
                },
                {
                    text: "跨语言能力",
                    value: "",
                    subtags: [
                        { text: "面向多种语言的单语言能力", value: "" },
                        { text: "跨语言完成任务", value: "" },
                        { text: "知识记忆及运用能力", value: "" },
                        { text: "知识补全能力", value: "" },
                        { text: "理解能力", value: "" },
                        { text: "推理能力", value: "" },
                        { text: "翻译能力", value: "" },
                    ],
                },
                {
                    text: "场景生成",
                    value: "",
                    subtags: [
                        { text: "结构化生成", value: "" },
                        { text: "创意生成", value: "" },
                        { text: "角色扮演", value: "" },
                    ],
                },
                {
                    text: "代码能力",
                    value: "",
                    subtags: [
                        { text: "代码理解", value: "" },
                        { text: "代码纠错", value: "" },
                        { text: "代码补全", value: "" },
                        { text: "代码生成", value: "" },
                    ],
                },
                {
                    text: "多模态",
                    value: "",
                    subtags: [
                        { text: "文生视频", value: "" },
                        { text: "文生图", value: "" },
                        { text: "图生文", value: "" },
                    ],
                },
                {
                    text: "交互能力",
                    value: "",
                    subtags: [
                        { text: "工具使用", value: "" },
                        { text: "工具创建", value: "" },
                        { text: "创造能力", value: "" },
                        { text: "知识涌现能力", value: "" },
                    ],
                },
            ],
            tags_1: [
                {
                    text: "对话安全性",
                    value: "",
                    subtags: [
                        { text: "暴力内容", value: "" },
                        { text: "非法行为", value: "" },
                        { text: "未成年人伤害", value: "" },
                        { text: "成人内容", value: "" },
                        { text: "心理健康问题", value: "" },
                        { text: "侵犯隐私", value: "" },
                    ],
                },
                {
                    text: "公平性",
                    value: "",
                    subtags: [
                        { text: "公正", value: "" },
                        { text: "偏见", value: "" },
                    ],
                },
                {
                    text: "抵制滥用",
                    value: "",
                    subtags: [
                        { text: "传播性滥用", value: "" },
                        { text: "网络攻击滥用", value: "" },
                        { text: "社会工程滥用", value: "" },
                        { text: "泄露受版权保护的内容", value: "" },
                    ],
                },
                {
                    text: "社会道德规范",
                    value: "",
                    subtags: [
                        { text: "恶意评论", value: "" },
                        { text: "情绪意识", value: "" },
                        { text: "文化敏感", value: "" },
                    ],
                },
                {
                    text: "稳定性",
                    value: "",
                    subtags: [{ text: "输出一致性", value: "" }],
                },
                {
                    text: "系统安全性",
                    value: "",
                    subtags: [
                        { text: "提示攻击", value: "" },
                        { text: "恶意评论攻击", value: "" },
                    ],
                },
            ],
            tags_2: [
                {
                    text: "心理学",
                    value: "",
                    subtags: [
                        { text: "知识记忆及运用能力", value: "" },
                        { text: "理解能力", value: "" },
                        { text: "生成能力", value: "" },
                        { text: "结构化信息处理能力", value: "" },
                    ],
                },
                {
                    text: "法律",
                    value: "",
                    subtags: [
                        { text: "知识记忆及运用能力", value: "" },
                        { text: "理解能力", value: "" },
                        { text: "生成能力", value: "" },
                        { text: "结构化信息处理能力", value: "" },
                    ],
                },
                {
                    text: "金融",
                    value: "",
                    subtags: [
                        { text: "知识记忆及运用能力", value: "" },
                        { text: "理解能力", value: "" },
                        { text: "生成能力", value: "" },
                        { text: "结构化信息处理能力", value: "" },
                    ],
                },
                {
                    text: "教育",
                    value: "",
                    subtags: [
                        { text: "知识记忆及运用能力", value: "" },
                        { text: "理解能力", value: "" },
                        { text: "生成能力", value: "" },
                        { text: "结构化信息处理能力", value: "" },
                    ],
                },
                {
                    text: "可解释性",
                    value: "",
                    subtags: [],
                },
                {
                    text: "模型热身速度",
                    value: "",
                    subtags: [],
                },
            ],
            tags_3: [
                {
                    text: "纠错能力",
                    value: "",
                    subtags: [
                        { text: "字音", value: "" },
                        { text: "字形", value: "" },
                    ],
                },
                {
                    text: "语义理解能力",
                    value: "",
                    subtags: [
                        { text: "一词多义", value: "" },
                        { text: "谐音", value: "" },
                        { text: "歧义消解", value: "" },
                        { text: "修辞", value: "" },
                    ],
                },
                {
                    text: "翻译能力",
                    value: "",
                    subtags: [
                        { text: "古代汉语翻译", value: "" },
                    ],
                },
                {
                    text: "语言生成能力",
                    value: "",
                    subtags: [
                        { text: "诗词", value: "" },
                        { text: "古文", value: "" },
                        { text: "对联", value: "" },
                        { text: "小说", value: "" },
                        { text: "戏剧", value: "" },
                        { text: "散文", value: "" },
                    ],
                },
                {
                    text: "文化理解能力",
                    value: "",
                    subtags: [
                        { text: "传统民俗", value: "" },
                        { text: "传统文化", value: "" },
                        { text: "传统节日", value: "" },
                        { text: "传统工艺", value: "" },
                    ],
                },
            ],
            selectedValue: null,
            tagTitle_0: "模型通用能力",
            tagTitle_1: "安全性",
            tagTitle_2: "实际应用能力",
            tagTitle_3: "中文特色能力",
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
