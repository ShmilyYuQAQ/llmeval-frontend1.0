<template>
    <div class="tag-container">
        <div class="tag-list">
            <div
                v-for="(tag, index) in tags"
                :key="index"
                class="tag"
                @click="handleTagClick(tag, index)"
                :class="{
                    'has-subtags': tag.subtags && tag.subtags.length > 0,
                    'active': isTagActive(tag)
                }"
            >
                <span class="tag-text">{{ tag.text }}</span>
            </div>
        </div>
        
        <!-- 子标签容器：显示在当前激活的标签下方 -->
        <div 
            v-if="activeTagIndex !== null && tags[activeTagIndex]?.subtags && tags[activeTagIndex].subtags.length > 0" 
            class="subtags-wrapper"
        >
            <div class="subtags-container">
                <div
                    v-for="(subtag, subIndex) in tags[activeTagIndex].subtags"
                    :key="subIndex"
                    class="subtag"
                    @click="selectSubTag(subtag.value)"
                >
                    <span class="subtag-text">{{ subtag.text }}</span>
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
        selectedValue: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            activeTagIndex: null
        }
    },
    methods: {
        handleTagClick(tag, index) {
            // 发送标签和索引信息
            this.$emit('custom-event', [...tag.value, index]);
        },
        isTagActive(tag) {
            return this.selectedValue && 
                   this.selectedValue[0] === tag.value[0] && 
                   this.selectedValue[1] === tag.value[1];
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
    flex-direction: column;
    font-family: "PingFang SC", "Microsoft Yahei", "Helvetica Neue", Helvetica,
        Arial, "Hiragino Sans GB", -apple-system, sans-serif;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.88);
    position: relative;
    flex: 1;
    user-select: none;
}

.tag-container:hover {
    z-index: 999;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: flex-end;
}

.tag {
    min-width: 88px;
    height: 32px;
    background: #EDEFF2;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0 12px;
}

.tag:hover, .tag.active {
    min-width: 130px;
    background: #870066;
    color: white;
}

.tag-text {
    font-size: 14px;
    white-space: normal;
    text-align: center;
    padding: 0 4px;
}

.subtags-wrapper {
    margin-top: 12px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.subtags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    background-color: #f7f7f9;
    padding: 12px;
    border-radius: 8px;
    width: 80%;
    justify-content: flex-end;
}

.subtag {
    min-width: 88px;
    height: 32px;
    background: #EDEFF2;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0 12px;
}

.subtag:hover {
    min-width: 130px;
    background: #870066;
    color: white;
}

.subtag-text {
    font-size: 14px;
    white-space: normal;
    text-align: center;
    padding: 0 4px;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .tag-list {
        justify-content: flex-start;
    }
    
    .tag {
        width: calc(33.33% - 12px);
    }
    
    .tag:hover, .tag.active {
        width: calc(33.33% - 12px);
    }
    
    /* 子标签在移动设备上的显示 */
    .subtags-wrapper {
        width: 100%;
        margin-top: 15px;
    }
    
    .subtags-container {
        width: 100%;
        justify-content: flex-start;
        padding: 10px;
    }
    
    .subtag {
        width: calc(50% - 12px);
        min-width: unset;
    }
    
    .subtag:hover {
        width: calc(50% - 12px);
        min-width: unset;
    }
}
</style>
