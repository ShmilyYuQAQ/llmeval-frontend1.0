<template>
    <div class="tag-container">
        <div class="header-tag">
            <span class="tag-title">{{ tagTitle }}</span>
        </div>
        <div class="tag-list" :style="{ '--zindex': tags.length - index }">
            <div
                v-for="(tag, index) in tags"
                :key="index"
                class="tag"
                @click="handleTagClick(tag, index)"
                :class="{
                    'has-subtags': tag.subtags && tag.subtags.length > 0,
                    'active': activeTagIndex === index
                }"
            >
                <span class="out-span">
                    <span class="in-span">{{ tag.text }}</span>
                </span>
                <div
                    v-if="tag.subtags && tag.subtags.length > 0"
                    class="subtags-container"
                    :class="{ 'mobile-show': activeTagIndex === index }"
                >
                    <div
                        v-for="(subtag, subIndex) in tag.subtags"
                        :key="subIndex"
                        class="subtag"
                        @click.stop="selectSubTag(subtag.value)"
                    >
                        <span class="subtag-text">{{ subtag.text }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TagContainer",
    props: {
        tags: {
            type: Array,
            required: true,
        },
        tagTitle: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            activeTagIndex: null
        }
    },
    methods: {
        handleTagClick(tag, index) {
            if (window.innerWidth <= 768) {
                this.activeTagIndex = this.activeTagIndex === index ? null : index;
            }
            this.selectTag(tag.value);
        },
        selectTag(value) {
            this.$emit('custom-event', value);
        },
        selectSubTag(value) {
            this.$emit('custom-event', value);
        },
        async fetchData() {
            this.loading = true;
            try {
                const response = await axiosInstance.get("/model/");
                this.models = response.data.data;
                this.totalModels = this.models.length;
                this.updatePaginatedModel();
            } catch (error) {
                this.error = "Failed to fetch data";
            } finally {
                this.loading = false;
            }
            console.log("全部data", this.models);
        },
    },
};
</script>

<style scoped>
.tag-container {
    display: flex;
    flex-wrap: wrap;
    font-family: "PingFang SC", "Microsoft Yahei", "Helvetica Neue", Helvetica,
        Arial, "Hiragino Sans GB", -apple-system, sans-serif;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.88);
    position: relative;
    margin-bottom: 32px;
    flex-direction: column;
    margin-left: 20px;
    margin-right: 20px;
    width: calc(100% - 40px);
    z-index: 1;
}

.tag-container:hover {
    z-index: 999;
}

.header-tag {
    display: flex;
    justify-content: space-between;
    height: 20px;
    margin-bottom: 12px;
    color: #27254c;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0;
}
.tag-title {
    color: #27254c;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0;
}
.tag-list {
    position: relative;
    z-index: --zindex;
    display: flex;
    flex-flow: row wrap;
}
.tag {
    cursor: pointer;
    position: relative;
    display: inline-block;
    max-width: 260px;
    margin-right: 6px;
    margin-bottom: 6px;
    transform: scale(0.92);
}

.out-span {
    margin-bottom: 0px;
    border-radius: 3px;
    padding: 0;
    border: none;
    margin-right: 0px;
    cursor: pointer;
    margin: 0;
    font-size: 12px;
    line-height: 20px;
    transition: all 0.2s;
    text-align: start;
    position: relative;
    z-index: -1;
}
.in-span {
    color: #3B29B3;
    background-color: #f4f6fa;
    padding: 0 6px;
    max-width: 260px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    border-radius: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.has-subtags:hover .subtags-container {
    display: flex;
    flex-wrap: wrap;
    color: rgba(39, 38, 77, 0.45);
    justify-content: flex-start;
    gap: 8px;
}
.tag:hover .in-span {
    background-color: #3B29B3;;
    color: white;
}

.subtags-container {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgb(243, 245, 259);
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 8px;
    border-radius: 4px;
    min-width: 200px;
    width: max-content;
    max-width: 90vw;
}

.subtag {
    cursor: pointer;
    padding: 4px;
    background-color: transparent;
    margin: 0;
    flex: 0 0 auto;
    min-width: auto;
    position: relative;
    z-index: 1;
}
.subtag-text {
    border-radius: 3px;
    margin-right: 0px;
    padding: 0 4px;
    color: #27254c;
    font-size: 12px;
    -webkit-transform: scale(0.92);
    -moz-transform: scale(0.92);
    -ms-transform: scale(0.92);
    transform: scale(0.92);
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
    white-space: nowrap;
    display: inline-block;
}
.subtag-text:hover {
    color: #816df8 !important;
}

/* 桌面端保持原有的hover效果 */
@media (min-width: 769px) {
    .has-subtags:hover .subtags-container {
        display: flex;
        flex-wrap: wrap;
        color: rgba(39, 38, 77, 0.45);
        justify-content: flex-start;
        gap: 8px;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
    }
}

/* 移动端样式调整 */
@media (max-width: 768px) {
    .has-subtags:hover .subtags-container {
        display: none;
    }
    
    .subtags-container.mobile-show {
        display: flex;
        flex-wrap: wrap;
        color: rgba(39, 38, 77, 0.45);
        justify-content: flex-start;
        gap: 8px;
        position: static;
        transform: none;
        left: auto;
        width: 100%;
        margin-top: 8px;
        box-shadow: none;
        background-color: transparent;
    }
}
</style>
