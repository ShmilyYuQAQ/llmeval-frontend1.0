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
                @click="selectTag(tag.value)"
                :class="{
                    'has-subtags': tag.subtags && tag.subtags.length > 0,
                }"
            >
                <span class="out-span">
                    <span class="in-span">{{ tag.text }}</span>
                </span>
                <div
                    v-if="tag.subtags && tag.subtags.length > 0"
                    class="subtags-container"
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
    methods: {
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
    /* z-index: 9999; */
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
    padding-top: 6px;
    color: rgba(39, 38, 77, 0.45);
    justify-content: center;
    min-width: 100px;
    width: auto; /* 宽度自动根据子元素变化 */
    gap: 10px; /* 设置子元素之间的间距 */
}
.tag:hover .in-span {
    background-color: #3B29B3;;
    color: white;
}

.subtags-container {
    display: none;
    /* position: absolute; */
    background-color: rgb(243, 245, 259);
    /* 其他样式 */
}

.subtag {
    cursor: pointer;
    padding: 5px;
    background-color: transparent;
    margin-top: 2px;
    flex: 0 0 auto; /* 子元素不伸缩，保持原始大小 */
    /* 可以设置子元素的最小宽度，以确保它们不会变得太窄 */
    min-width: 50px; /* 子元素的最小宽度，根据需要调整 */
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
}
.subtag-text:hover {
    color: #816df8 !important;
}
</style>
