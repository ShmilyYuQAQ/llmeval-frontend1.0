<template>
    <div class="container">
        <div class="feature-section">
            <div class="section-header">
                <div class="title-container">
                    <img
                        src="./images/logo1.png"
                        alt="Logo"
                        class="section-logo"
                    />
                    <span class="section-title">{{ openSourceTitle }}</span>
                </div>
                <featureElement
                    :title="openSourceTitle"
                    :checked="openSourceChecked"
                    :options="openSourceOptions"
                    @select="parentMethod"
                    @change="(val) => $emit('change', val)"
                ></featureElement>
            </div>
        </div>

        <div class="feature-section">
            <div class="section-header">
                <div class="title-container">
                    <img
                        src="./images/logo6.png"
                        alt="Logo"
                        class="section-logo"
                    />
                    <span class="section-title">{{ tagTitle_4 }}</span>
                </div>
                <tagContainter
                    :tags="tags_4"
                    :tag-title="''"
                    :selected-value="selected_org"
                    @custom-event="selectModel"
                    @select-parent-tag="activeTagIndex4 = $event"
                ></tagContainter>
            </div>
            <!-- 子标签容器 -->
            <div
                v-if="
                    activeTagIndex4 !== null &&
                    tags_4[activeTagIndex4]?.subtags &&
                    tags_4[activeTagIndex4].subtags.length > 0
                "
                class="subtags-wrapper"
            >
                <div class="subtags-container">
                    <div class="parent-tag-name">
                        {{ parentTagName4 + "：" }}
                    </div>
                    <div
                        v-for="(subtag, subIndex) in tags_4[activeTagIndex4]
                            .subtags"
                        :key="subIndex"
                        class="subtag"
                        :class="{ active: isSubtagActive4(subtag.value) }"
                        @click="selectSubTag4(subtag.value)"
                    >
                        <span class="subtag-text">{{ subtag.text }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="feature-section">
            <div class="section-header">
                <div class="title-container">
                    <img
                        src="./images/logo2.png"
                        alt="Logo"
                        class="section-logo"
                    />
                    <span class="section-title">{{ tagTitle_0 }}</span>
                </div>
                <tagContainter
                    :tags="tags_0"
                    :tag-title="''"
                    :selected-value="selectedValue"
                    @custom-event="selectModel"
                    @select-parent-tag="activeTagIndex0 = $event"
                ></tagContainter>
            </div>
            <!-- 子标签容器 -->
            <div
                v-if="
                    activeTagIndex0 !== null &&
                    tags_0[activeTagIndex0]?.subtags &&
                    tags_0[activeTagIndex0].subtags.length > 0
                "
                class="subtags-wrapper"
            >
                <div class="subtags-container">
                    <div class="parent-tag-name">
                        {{ parentTagName0 + "：" }}
                    </div>
                    <div
                        v-for="(subtag, subIndex) in tags_0[activeTagIndex0]
                            .subtags"
                        :key="subIndex"
                        class="subtag"
                        :class="{ active: isSubtagActive(subtag.value) }"
                        @click="selectSubTag(subtag.value)"
                    >
                        <span class="subtag-text">{{ subtag.text }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="feature-section">
            <div class="section-header">
                <div class="title-container">
                    <img
                        src="./images/logo3.png"
                        alt="Logo"
                        class="section-logo"
                    />
                    <span class="section-title">{{ tagTitle_1 }}</span>
                </div>
                <tagContainter
                    :tags="tags_1"
                    :tag-title="''"
                    :selected-value="selectedValue"
                    @custom-event="selectModel"
                    @select-parent-tag="activeTagIndex1 = $event"
                ></tagContainter>
            </div>
            <!-- 子标签容器 -->
            <div
                v-if="
                    activeTagIndex1 !== null &&
                    tags_1[activeTagIndex1]?.subtags &&
                    tags_1[activeTagIndex1].subtags.length > 0
                "
                class="subtags-wrapper"
            >
                <div class="subtags-container">
                    <div class="parent-tag-name">
                        {{ parentTagName1 + "：" }}
                    </div>
                    <div
                        v-for="(subtag, subIndex) in tags_1[activeTagIndex1]
                            .subtags"
                        :key="subIndex"
                        class="subtag"
                        :class="{ active: isSubtagActive(subtag.value) }"
                        @click="selectSubTag(subtag.value)"
                    >
                        <span class="subtag-text">{{ subtag.text }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="feature-section">
            <div class="section-header">
                <div class="title-container">
                    <img
                        src="./images/logo4.png"
                        alt="Logo"
                        class="section-logo"
                    />
                    <span class="section-title">{{ tagTitle_2 }}</span>
                </div>
                <tagContainter
                    :tags="tags_2"
                    :tag-title="''"
                    :selected-value="selectedValue"
                    @custom-event="selectModel"
                    @select-parent-tag="activeTagIndex2 = $event"
                ></tagContainter>
            </div>
            <!-- 子标签容器 -->
            <div
                v-if="
                    activeTagIndex2 !== null &&
                    tags_2[activeTagIndex2]?.subtags &&
                    tags_2[activeTagIndex2].subtags.length > 0
                "
                class="subtags-wrapper"
            >
                <div class="subtags-container">
                    <div class="parent-tag-name">
                        {{ parentTagName2 + "：" }}
                    </div>
                    <div
                        v-for="(subtag, subIndex) in tags_2[activeTagIndex2]
                            .subtags"
                        :key="subIndex"
                        class="subtag"
                        :class="{ active: isSubtagActive(subtag.value) }"
                        @click="selectSubTag(subtag.value)"
                    >
                        <span class="subtag-text">{{ subtag.text }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="feature-section">
            <div class="section-header">
                <div class="title-container">
                    <img
                        src="./images/logo5.png"
                        alt="Logo"
                        class="section-logo"
                    />
                    <span class="section-title">{{ tagTitle_3 }}</span>
                </div>
                <tagContainter
                    :tags="tags_3"
                    :tag-title="''"
                    :selected-value="selectedValue"
                    @custom-event="selectModel"
                    @select-parent-tag="activeTagIndex3 = $event"
                ></tagContainter>
            </div>
            <!-- 子标签容器 -->
            <div
                v-if="
                    activeTagIndex3 !== null &&
                    tags_3[activeTagIndex3]?.subtags &&
                    tags_3[activeTagIndex3].subtags.length > 0
                "
                class="subtags-wrapper"
            >
                <div class="subtags-container">
                    <div class="parent-tag-name">
                        {{ parentTagName3 + "：" }}
                    </div>
                    <div
                        v-for="(subtag, subIndex) in tags_3[activeTagIndex3]
                            .subtags"
                        :key="subIndex"
                        class="subtag"
                        :class="{ active: isSubtagActive(subtag.value) }"
                        @click="selectSubTag(subtag.value)"
                    >
                        <span class="subtag-text">{{ subtag.text }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="selected-tag">
            <span
                >当前选中的标签是:<span style="color: red; margin-left: 20px">{{
                    selected_tag[0]
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
    </div>
</template>
<script>
import featureElement from "./featureElement.vue";
import tagContainter from "./tagContainter.vue";
export default {
    data() {
        return {
            activeTagIndex0: null,
            activeTagIndex1: null,
            activeTagIndex2: null,
            activeTagIndex3: null,
            activeTagIndex4: null,
            selectedSubTag: null,
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
                        {
                            text: "汽车知识记忆及运用",
                            value: ["汽车知识记忆及运用", 119],
                        },
                        { text: "汽车知识理解", value: ["汽车知识理解", 120] },
                        { text: "汽车文本生成", value: ["汽车文本生成", 121] },
                        {
                            text: "汽车结构化信息处理",
                            value: ["汽车结构化信息处理", 122],
                        },
                    ],
                },
                {
                    text: "工业",
                    value: ["工业", 123],
                    subtags: [
                        {
                            text: "工业知识记忆及运用",
                            value: ["工业知识记忆及运用", 124],
                        },
                        { text: "工业知识理解", value: ["工业知识理解", 125] },
                        { text: "工业文本生成", value: ["工业文本生成", 126] },
                        {
                            text: "工业结构化信息处理",
                            value: ["工业结构化信息处理", 127],
                        },
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
                    subtags: [
                        { text: "古代汉语翻译", value: ["古代汉语翻译", 101] },
                    ],
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
            tags_4: [
                {
                    text: "阿里云",
                    value: ["阿里云", 200],
                    subtags: [],
                },
                {
                    text: "上海人工智能实验室",
                    value: ["上海人工智能实验室", 201],
                    subtags: [],
                },
                {
                    text: "智谱AI",
                    value: ["智谱AI", 202],
                    subtags: [],
                },
                {
                    text: "零一万物",
                    value: ["零一万物", 203],
                    subtags: [],
                },
                {
                    text: "字节跳动",
                    value: ["字节跳动", 204],
                    subtags: [],
                },
                {
                    text: "Meta",
                    value: ["Meta", 205],
                    subtags: [],
                },
                {
                    text: "科大讯飞",
                    value: ["科大讯飞", 206],
                    subtags: [],
                },
                {
                    text: "百川智能",
                    value: ["百川智能", 207],
                    subtags: [],
                },
                {
                    text: "MiniMax",
                    value: ["MiniMax", 208],
                    subtags: [],
                },
                {
                    text: "OpenAI",
                    value: ["OpenAI", 209],
                    subtags: [],
                },
                {
                    text: "Google",
                    value: ["Google", 210],
                    subtags: [],
                },
                {
                    text: "深度求索",
                    value: ["深度求索", 211],
                    subtags: [],
                },
                {
                    text: "Mistral AI",
                    value: ["Mistral AI", 212],
                    subtags: [],
                },
                {
                    text: "腾讯",
                    value: ["腾讯", 213],
                    subtags: [],
                },
                {
                    text: "商汤日日新",
                    value: ["商汤日日新", 214],
                    subtags: [],
                },
                {
                    text: "百度",
                    value: ["百度", 215],
                    subtags: [],
                },
                {
                    text: "其他",
                    value: ["其他", 216],
                    subtags: [],
                },
            ],
            selectedValue: null,
            selectedValue4: null,
            tagTitle_0: "模型通用能力",
            tagTitle_1: "安全性",
            tagTitle_2: "实际应用能力",
            tagTitle_3: "中文特色能力",
            tagTitle_4: "发布机构",
            parentTagName0: "模型通用能力",
            parentTagName1: "安全性",
            parentTagName2: "实际应用能力",
            parentTagName3: "中文特色能力",
            parentTagName4: "发布机构",
        };
    },
    components: { featureElement, tagContainter },
    props: ["selected_tag", "selected_org", "tag_description"],
    methods: {
        // 接收来自homePageMid组件的标签重置请求
        resetTagState(tagInfo) {
            
        },
        selectModel(value) {
            // value 可能是 [tagName, tagId, index]（父标签）或 [subTagName, subTagId]（子标签）
            let tagValue, tagName;
            if (Array.isArray(value) && value.length >= 2) {
                tagName = value[0];
                tagValue = value[1];
            }
            // 机构判断
            if (tagValue >= 200) {
                this.$emit("select-org", [tagName, tagValue]);
            } else {
                // 同步高亮子标签
                this.selectedSubTag = value;
                this.selectedValue = value;
                this.$emit("select-tag", [tagName, tagValue]);
            }
        },
        findTagIndexById(tags, id) {
            return tags.findIndex((tag) => tag.value[1] === id);
        },
        selectSubTag(value) {
            // 直接调用 selectModel，保证逻辑统一
            this.selectModel(value);
        },
        isSubtagActive(value) {
            return (
                this.selectedSubTag &&
                this.selectedSubTag[0] === value[0] &&
                this.selectedSubTag[1] === value[1]
            );
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
    width: 100%;
    justify-content: center;
    z-index: 99;
    padding-top: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.feature-section {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
}

.section-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;
    margin-right: 20px;
    width: calc(100% - 40px);
    height: 40px; /* 固定高度，确保标题和选项在同一行 */
}

.title-container {
    display: flex;
    align-items: center;
    min-width: 150px;
}

.section-logo {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.section-title {
    color: #27254c;
    font-weight: 600;
    font-size: 16px;
    font-family: "PingFang SC", "Microsoft Yahei", "Helvetica Neue", Helvetica,
        Arial, "Hiragino Sans GB", -apple-system, sans-serif;
}

/* 子标签容器样式优化 */
.subtags-wrapper {
    display: flex;
    justify-content: flex-start; /* 左对齐 */
    width: 100%;
    margin-top: 12px;
    margin-bottom: 12px;
}

.subtags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    background-color: #f7f7f9;
    padding: 16px;
    border-radius: 8px;
    width: 95%;
    justify-content: flex-start; /* 左对齐 */
    align-items: center; /* 垂直居中对齐 */
}

/* 父标签名称样式 */
.parent-tag-name {
    color: #333;
    margin-right: 12px;
    min-width: 120px;
    height: 32px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 14px;
    white-space: normal;
    font-weight: 600;
}

/* 子标签样式微调 */
.subtag {
    min-width: 88px;
    height: 32px;
    background: #edeff2;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0 12px;
    transition: all 0.3s ease;
}

.subtag:hover,
.subtag.active {
    background: #870066;
    color: white;
}

.subtag-text {
    font-size: 14px;
    white-space: normal;
    text-align: center;
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

/* 响应式调整 */
@media (max-width: 768px) {
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        height: auto;
        padding: 10px 0;
        gap: 10px;
    }

    .title-container {
        margin-bottom: 10px;
    }

    .subtags-container {
        width: 95%;
        padding-left: 12px;
        padding-right: 12px;
    }

    .subtag {
        min-width: calc(50% - 12px); /* 移动设备上两列显示 */
        font-size: 13px;
    }

    .parent-tag-name {
        font-size: 13px;
        height: auto;
        min-width: 100px;
        margin-right: 8px;
    }

    /* 修复tagContainter在小屏幕上的宽度 */
    .section-header > *:last-child {
        width: 100%;
    }

    /* 隐藏重复的选中标签信息 */
    .selected-tag {
        margin-bottom: 20px;
        font-size: 13px;
    }
}
</style>
