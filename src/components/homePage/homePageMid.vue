<template>
    <div class="home-page-mid">
        <div class="search-container">
            <el-input
                v-model="searchQuery"
                placeholder="请输入模型名称"
                class="search-input"
                @keyup.enter="handleSearch"
            >
                <template #append>
                    <el-button
                        :loading="isSearching"
                        @click="handleSearch"
                        type="primary"
                    >
                        搜索
                    </el-button>
                </template>
            </el-input>
        </div>
        <FeatureSelector
            @custom-event="selectModel"
            :selected_tag="selected_tag"
            :tag_description="tag_description"
            @change="openSourceChange"
        />
        <FeatureSequencer />
        <modelCardContainer
            :datas="datas"
            ref="modelCardContainer"
        ></modelCardContainer>
    </div>
</template>
<script>
import axiosInstance from "@/plugins/axios";
import FeatureSelector from "./featureSelector.vue";
import FeatureSequencer from "./featureSequencer.vue";
import modelCardContainer from "./modelCardContainer.vue";
export default {
    data() {
        return {
            datas: [],
            selected_tag: "",
            originDatas: [],
            searchQuery: '',
            isSearching: false,
        };
    },
    components: {
        FeatureSelector,
        FeatureSequencer,
        modelCardContainer,
    },
    methods: {
        async fetchData() {
            try {
                const response = await axiosInstance.get("/model/");
                this.originDatas = response.data.data; //所有模型数据
                this.datas = response.data.data; //展示的模型数据
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
                console.log(this.datas);
                let temp = [];
                for (let i = 0; i < this.datas.length; i++) {
                    try {
                        this.datas[i].model_image_path =
                            "http://49.233.82.133:5174" +
                            this.getSubstringAfterKeyword(
                                this.datas[i].model_image_path,
                                "public"
                            );
                    } catch (error) {
                        console.log(this.datas[i].model_image_path)
                        console.log(i)
                    }
                }
                console.log(temp);
                console.log(this.datas);
            } catch (error) {
                this.datas = [];
                this.error = "Failed to fetch data";
            }
        },
        async selectModel(tag) {
            try {
                const response = await axiosInstance.get(
                    "/model/tagName/?tagName=" + tag[0]
                );
                let temp = response.data.data || [];
                for (let i = 0; i < temp.length; i++) {
                    try {
                        temp[i].model_image_path =
                            "http://49.233.82.133:5174" +
                            this.getSubstringAfterKeyword(
                                temp[i].model_image_path,
                                "public"
                            );
                    } catch (error) {
                        // console.log(i)
                    }
                }
                const res = await axiosInstance.get(
                    "/tag/description?tagId=" + tag[1]
                );
                this.datas = temp || [];
                this.originDatas = temp || [];
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
                this.selected_tag = tag[0];
                this.tag_description = res.data.data;
            } catch (error) {
                this.datas = [];
                this.error = "Failed to fetch data";
            }
        },
        getSubstringAfterKeyword(inputString, keyword) {
            // 找到关键字在字符串中的位置
            const index = inputString.indexOf(keyword);

            // 如果找到了关键字
            if (index !== -1) {
                // 截取关键字之后的内容
                return inputString.substring(index + keyword.length);
            } else {
                // 如果没有找到关键字，返回空字符串或者根据需要进行其他处理
                return "";
            }
        },
        filterItems(filterArray) {
            // 根据传入的筛选条件数组来筛选items数组
            const filteredItems = this.originDatas.filter((item) => {
                // 如果筛选条件数组为空，则保留所有元素
                if (filterArray.length === 0) return true;

                // 如果筛选条件数组包含"开源"，则保留isOpenSource为true的元素
                if (filterArray.includes("开源") && item.isOpenSource)
                    return true;

                // 如果筛选条件数组包含"闭源"，则保留isOpenSource为false的元素
                if (filterArray.includes("不开源") && !item.isOpenSource)
                    return true;

                // 如果元素不满足上述任何条件，则不保留
                return false;
            });

            return filteredItems;
        },
        openSourceChange(value) {
            this.datas = this.filterItems(value);
            this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
        },
        async handleSearch() {
            if (!this.searchQuery.trim()) {
                // 如果搜索框为空，恢复显示所有数据
                this.datas = this.originDatas;
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
                return;
            }

            this.isSearching = true;
            try {
                console.log((this.searchQuery))
                const response = await axiosInstance.get(
                    `/model/searchByName?name=${(this.searchQuery)}`
                );
                let searchResults = response.data.data || [];
                console.log(searchResults)
                // 处理图片路径
                for (let item of searchResults) {
                    try {
                        item.model_image_path = "http://49.233.82.133:5174" +
                            this.getSubstringAfterKeyword(
                                item.model_image_path,
                                "public"
                            );
                    } catch (error) {
                        console.log(item.model_image_path);
                    }
                }

                this.datas = searchResults;
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            } catch (error) {
                console.error('搜索失败:', error);
                this.$message.error('搜索失败，请稍后重试');
            } finally {
                this.isSearching = false;
            }
        },
    },
    created() {
        this.fetchData();
    },
    watch: {
        models: function (newVal, oldVal) {
            this.$refs.modelCardContainer.models = newVal;
            this.$refs.modelCardContainer.updatePaginatedModel();
        },
    },
};
</script>
<style scoped>
.home-page-mid {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}

.search-container {
    margin-top: 40px;
    width: 50%;
    margin-bottom: 20px;
}

.search-input {
    width: 100%;
}

.search-input :deep(.el-input__wrapper) {
    height: 38px;
}

.search-input :deep(.el-input__inner) {
    font-size: 15px;
}

.search-input :deep(.el-input-group__append) {
    padding: 0;
}

.search-input :deep(.el-button) {
    background-color: #409eff;
    border-color: #409eff;
    color: white;
    margin: 0;
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
}

.search-input :deep(.el-button:hover) {
    background-color: #66b1ff;
    border-color: #66b1ff;
}

.search-input :deep(.el-button:active) {
    background-color: #3a8ee6;
    border-color: #3a8ee6;
}

/* 确保搜索框在其他元素之上 */
.search-container {
    z-index: 1000;
}
</style>
