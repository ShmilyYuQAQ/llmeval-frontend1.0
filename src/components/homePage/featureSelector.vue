<template>
    <div class="container">
        <featureElement
            :title="openSourceTitle"
            :checked="openSourceChecked"
            :options="openSourceOptions"
            @select="parentMethod"
            @change="submitChange"
        ></featureElement>
        <tagContainter
            :tags="tags_0"
            :tag-title="tagTitle_0"
            :selected-value="selectedValue"
            @custom-event="selectModel"
        ></tagContainter>
        <tagContainter
            :tags="tags_1"
            :tag-title="tagTitle_1"
            :selected-value="selectedValue"
            @custom-event="selectModel"
        ></tagContainter>
        <tagContainter
            :tags="tags_2"
            :tag-title="tagTitle_2"
            :selected-value="selectedValue"
            @custom-event="selectModel"
        ></tagContainter>
        <tagContainter
            :tags="tags_3"
            :tag-title="tagTitle_3"
            :selected-value="selectedValue"
            @custom-event="selectModel"
        ></tagContainter>
        <div class="selected-tag">
            <span
                >当前选中的标签是:<span style="color: red; margin-left: 20px">{{
                    selected_tag
                }}</span></span
            >
        </div>
        <div class="selected-tag">
            <span
                >选中标签简介:<span style="color: red; margin-left: 20px">{{
                    tag_description
                }}</span></span
            >
        </div>
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
            openSourceChecked: ["开源", "不开源"],
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
                    value: ["知识记忆及应用", 2],
                    subtags: [
                        { text: "学科知识", value: ["学科知识", 3] },
                        { text: "常识", value: ["常识", 4] },
                    ],
                },
                {
                    text: "理解能力",
                    value: ["理解能力", 5],
                    subtags: [
                        { text: "信息分析", value: ["信息分析", 6] },
                        { text: "信息提取", value: ["信息提取", 7] },
                        { text: "信息概况", value: ["信息概况", 8] },
                        { text: "信息分类", value: ["信息分类", 9] },
                    ],
                },
                {
                    text: "推理能力",
                    value: ["推理能力", 10],
                    subtags: [
                        { text: "常识推理", value: ["常识推理", 11] },
                        { text: "逻辑推理", value: ["逻辑推理", 12] },
                        { text: "决策推理", value: ["决策推理", 13] },
                        { text: "推理思维链", value: ["推理思维链", 14] },
                    ],
                },
                {
                    text: "跨语言能力",
                    value: ["跨语言能力", 15],
                    subtags: [
                        {
                            text: "面向多种语言的单语言能力",
                            value: ["面向多种语言的单语言能力", 16],
                        },
                        {
                            text: "跨语言完成任务",
                            value: ["跨语言完成任务", 17],
                        },
                        {
                            text: "知识记忆及运用能力",
                            value: ["知识记忆及运用能力", 18],
                        },
                        { text: "知识补全能力", value: ["知识补全能力", 19] },
                        { text: "理解能力", value: ["理解能力", 20] },
                        { text: "推理能力", value: ["推理能力", 21] },
                        { text: "翻译能力", value: ["翻译能力", 22] },
                    ],
                },
                {
                    text: "场景生成",
                    value: ["场景生成", 23],
                    subtags: [
                        { text: "结构化生成", value: ["结构化生成", 24] },
                        { text: "创意生成", value: ["创意生成", 25] },
                        { text: "角色扮演", value: ["角色扮演", 26] },
                    ],
                },
                {
                    text: "代码能力",
                    value: ["代码能力", 27],
                    subtags: [
                        { text: "代码理解", value: ["代码理解", 28] },
                        { text: "代码纠错", value: ["代码纠错", 29] },
                        { text: "代码补全", value: ["代码补全", 30] },
                        { text: "代码生成", value: ["代码生成", 31] },
                    ],
                },
                {
                    text: "多模态",
                    value: ["多模态", 32],
                    subtags: [
                        { text: "文生视频", value: ["文生视频", 33] },
                        { text: "文生图", value: ["文生图", 34] },
                        { text: "图生文", value: ["图生文", 35] },
                    ],
                },
                {
                    text: "交互能力",
                    value: ["交互能力", 36],
                    subtags: [
                        { text: "工具使用", value: ["工具使用", 37] },
                        { text: "工具创建", value: ["工具创建", 38] },
                        { text: "创造能力", value: ["创造能力", 39] },
                        { text: "知识涌现能力", value: ["知识涌现能力", 40] },
                    ],
                },
            ],
            tags_1: [
                {
                    text: "对话安全性",
                    value: ["对话安全性", 42],
                    subtags: [
                        { text: "暴力内容", value: ["暴力内容", 43] },
                        { text: "非法行为", value: ["非法行为", 44] },
                        { text: "未成年人伤害", value: ["未成年人伤害", 45] },
                        { text: "成人内容", value: ["成人内容", 46] },
                        { text: "心理健康问题", value: ["心理健康问题", 47] },
                        { text: "侵犯隐私", value: ["侵犯隐私", 48] },
                    ],
                },
                {
                    text: "公平性",
                    value: ["公平性", 49],
                    subtags: [
                        { text: "公正", value: ["公正", 50] },
                        { text: "偏见", value: ["偏见", 51] },
                    ],
                },
                {
                    text: "抵制滥用",
                    value: ["抵制滥用", 52],
                    subtags: [
                        { text: "传播性滥用", value: ["传播性滥用", 53] },
                        { text: "网络攻击滥用", value: ["网络攻击滥用", 54] },
                        { text: "社会工程滥用", value: ["社会工程滥用", 55] },
                        {
                            text: "泄露受版权保护的内容",
                            value: ["泄露受版权保护的内容", 56],
                        },
                    ],
                },
                {
                    text: "社会道德规范",
                    value: ["社会道德规范", 57],
                    subtags: [
                        { text: "恶意评论", value: ["恶意评论", 58] },
                        { text: "情绪意识", value: ["情绪意识", 59] },
                        { text: "文化敏感", value: ["文化敏感", 60] },
                    ],
                },
                {
                    text: "稳定性",
                    value: ["稳定性", 61],
                    subtags: [
                        { text: "输出一致性", value: ["输出一致性", 62] },
                    ],
                },
                {
                    text: "系统安全性",
                    value: ["系统安全性", 63],
                    subtags: [
                        { text: "提示攻击", value: ["提示攻击", 64] },
                        { text: "恶意评论攻击", value: ["恶意评论攻击", 65] },
                    ],
                },
            ],
            tags_2: [
                {
                    text: "心理学",
                    value: ["心理学", 68],
                },
                {
                    text: "医疗",
                    value: ["医疗", 69],
                    subtags: [
                        {
                            text: "医疗知识记忆及运用",
                            value: ["医疗知识记忆及运用", 70],
                        },
                        { text: "理解能力", value: ["理解能力", 71] },
                        { text: "生成能力", value: ["生成能力", 72] },
                        {
                            text: "结构化信息处理能力",
                            value: ["结构化信息处理能力", 73],
                        },
                    ],
                },
                {
                    text: "法律",
                    value: ["法律", 74],
                    subtags: [
                        {
                            text: "知识记忆及运用能力",
                            value: ["知识记忆及运用能力", 75],
                        },
                        { text: "理解能力", value: ["理解能力", 76] },
                        { text: "生成能力", value: ["生成能力", 77] },
                        {
                            text: "结构化信息处理能力",
                            value: ["结构化信息处理能力", 78],
                        },
                    ],
                },
                {
                    text: "金融",
                    value: ["金融", 79],
                    subtags: [
                        {
                            text: "知识记忆及运用能力",
                            value: ["知识记忆及运用能力", 80],
                        },
                        { text: "理解能力", value: ["理解能力", 81] },
                        { text: "生成能力", value: ["生成能力", 82] },
                        {
                            text: "结构化信息处理能力",
                            value: ["结构化信息处理能力", 83],
                        },
                    ],
                },
                {
                    text: "教育",
                    value: ["教育", 84],
                    subtags: [
                        {
                            text: "知识记忆及运用能力",
                            value: ["知识记忆及运用能力", 85],
                        },
                        { text: "理解能力", value: ["理解能力", 86] },
                        { text: "生成能力", value: ["生成能力", 87] },
                        {
                            text: "结构化信息处理能力",
                            value: ["结构化信息处理能力", 88],
                        },
                    ],
                },
                {
                    text: "汽车",
                    value: ["汽车", 118],
                    subtags: [
                        { text: "汽车知识记忆及运用", value: ["汽车知识记忆及运用", 119] },
                        { text: "汽车知识理解", value: ["汽车知识理解", 120] },
                        { text: "汽车文本生成", value: ["汽车文本生成", 121] },
                        { text: "汽车结构化信息处理", value: ["汽车结构化信息处理", 122] },
                    ],
                },
                {
                    text: "工业",
                    value: ["工业", 123],
                    subtags: [
                        { text: "工业知识记忆及运用", value: ["工业知识记忆及运用", 124] },
                        { text: "工业知识理解", value: ["工业知识理解", 125] },
                        { text: "工业文本生成", value: ["工业文本生成", 126] },
                        { text: "工业结构化信息处理", value: ["工业结构化信息处理", 127] },
                    ],
                },
                {
                    text: "可解释性",
                    value: ["可解释性", 89],
                    subtags: [],
                },
                {
                    text: "模型热身速度",
                    value: ["模型热身速度", 90],
                    subtags: [],
                },
            ],
            tags_3: [
                {
                    text: "纠错能力",
                    value: ["纠错能力", 92],
                    subtags: [
                        { text: "字音", value: ["字音", 93] },
                        { text: "字形", value: ["字形", 94] },
                    ],
                },
                {
                    text: "语义理解能力",
                    value: ["语义理解能力", 95],
                    subtags: [
                        { text: "语义理解", value: ["语义理解", 96] },
                        { text: "谐音理解", value: ["谐音理解", 97] },
                        { text: "歧义消解理解", value: ["歧义消解理解", 98] },
                        { text: "修辞理解", value: ["修辞理解", 99] },
                    ],
                },
                {
                    text: "翻译能力",
                    value: ["翻译能力", 100],
                    subtags: [{ text: "古代汉语翻译", value: ["古代汉语翻译", 101] }],
                },
                {
                    text: "语言生成能力",
                    value: ["语言生成能力", 102],
                    subtags: [
                        { text: "诗词生成", value: ["诗词生成", 103] },
                        { text: "古文生成", value: ["古文生成", 104] },
                        { text: "对联生成", value: ["对联生成", 105] },
                        { text: "小说生成", value: ["小说生成", 106] },
                        { text: "戏剧生成", value: ["戏剧生成", 107] },
                        { text: "散文生成", value: ["散文生成", 108] },
                        { text: "成语", value: ["成语", 109] },
                        { text: "歇后语", value: ["歇后语", 110] },
                        { text: "方言", value: ["方言", 111] },
                        { text: "文学", value: ["文学", 112] },
                    ],
                },
                {
                    text: "文化理解能力",
                    value: ["文化理解能力", 113],
                    subtags: [
                        { text: "传统民俗", value: ["传统民俗", 114] },
                        { text: "传统文化", value: ["传统文化", 115] },
                        { text: "传统节日", value: ["传统节日", 116] },
                        { text: "传统工艺", value: ["传统工艺", 117] },
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
    props: ["selected_tag", "tag_description"],
    methods: {
        selectModel(value) {
            this.$emit("custom-event", value);
        },
        parentMethod(value) {
            console.log(value);
        },
        submitChange(value) {
            this.$emit("change", value);
        },
    },
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
    padding-top:20px;
}
.selected-tag {
    margin-bottom: 32px;
    margin-left: 20px;
    margin-right: 20px;
    color: rgba(0, 0, 0, 0.88);
    flex-wrap: wrap;
    font-family: "PingFang SC", "Microsoft Yahei", "Helvetica Neue", Helvetica,
        Arial, "Hiragino Sans GB", -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 600;
    z-index: 1;
}
</style>
