<template>
    <div class="home-page-mid">
        <div class="search-container">
            <el-input
                v-model="searchQuery"
                placeholder="输入关键字 搜索您想找的模型"
                class="search-input"
                clearable
                @keyup.enter="handleSearch"
                @clear="clearSearch"
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
        <div v-if="hasFilters" class="filter-tags-container">
            <span
                >共找到
                <span style="color: #409eff; font-weight: 600; font-size: 13px"
                    >&ensp;{{ datas.length }}&ensp;</span
                >个结果&ensp;&ensp;</span
            >
            <el-tag
                v-if="activeSearchQuery"
                closable
                @close="clearSearch"
                class="filter-tag"
            >
                {{ activeSearchQuery }}
            </el-tag>
            <el-tag
                v-if="selected_tag[0]"
                closable
                @close="clearTag"
                class="filter-tag"
            >
                {{ selected_tag[0] }}
            </el-tag>
        </div>
        <FeatureSelector
            @custom-event="selectModel"
            :selected_tag="selected_tag"
            :tag_description="tag_description"
            @change="openSourceChange"
        />
        <FeatureSequencer @change="sequencerChange" ref="featureSequencer" />
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
            selected_tag: ["", ""],
            originDatas: [],
            searchQuery: "",
            activeSearchQuery: "",
            isSearching: false,
            activeFilters: [],
            searchDatas: [],
            tagDatas: [],
            sequencerValue: 0,
        };
    },
    components: {
        FeatureSelector,
        FeatureSequencer,
        modelCardContainer,
    },
    methods: {
        processImagePath(data) {
            const BASE_URL = "http://49.233.82.133:5174";
            return data.map(item => ({
                ...item,
                model_image_path: item.model_image_path ? 
                    `${BASE_URL}${this.getSubstringAfterKeyword(item.model_image_path, "public")}` : 
                    item.model_image_path
            }));
        },
        async fetchData() {
            try {
                const { data: { data } } = await axiosInstance.get("/model/");
                this.datas = this.processImagePath(data);
                this.originDatas = this.processImagePath(data);
                console.log(this.datas,"datas")
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            } catch (error) {
                console.log(error,"error")
            }
        },
        async selectModel(tag) {
            try {
                const [modelResponse, descResponse] = await Promise.all([
                    axiosInstance.get(`/model/tagName/?tagName=${tag[0]}`),
                    axiosInstance.get(`/tag/description?tagId=${tag[1]}`)
                ]);

                this.tagDatas = this.processImagePath(modelResponse.data.data || []);
                this.tag_description = descResponse.data.data;
                
                // 更新数据显示
                this.datas = !this.activeSearchQuery ? this.tagDatas :
                    this.searchDatas.filter(searchItem => 
                        this.tagDatas.some(tagItem => String(tagItem.name) === String(searchItem.name))
                    );
                this.sortDatas(this.sequencerValue);
                this.originDatas = this.datas; // 保存原始数据，原始数据应该是经过标签或者搜索过滤后的数据
                this.selected_tag = tag;
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            } catch (error) {
                this.handleError("标签筛选失败");
            }
        },
        getSubstringAfterKeyword(inputString, keyword) {
            const index = inputString?.indexOf(keyword);
            return index !== -1 ? inputString.substring(index + keyword.length) : "";
        },
        filterItems(filterArray) {
            if (!filterArray?.length) return this.originDatas;
            
            return this.originDatas.filter(item => 
                (filterArray.includes("开源") && item.isOpenSource) ||
                (filterArray.includes("不开源") && !item.isOpenSource)
            );
        },
        openSourceChange(value) {
            if (!Array.isArray(value)) {
                // console.log('Received invalid value type for openSourceChange:', value);
                return;
            }
            this.activeFilters = [...value];
            this.datas = this.filterItems(this.activeFilters);
            this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
        },
        async handleSearch() {
            if (!this.searchQuery.trim()) {
                return this.clearSearch();
            }

            this.isSearching = true;
            try {
                const { data: { data } } = await axiosInstance.get(
                    `/model/searchByName?name=${this.searchQuery}`
                );
                
                this.searchDatas = this.processImagePath(data || []);
                this.activeSearchQuery = this.searchQuery;
                // 如果搜索结果没有标签，则直接显示搜索结果 否则显示搜索结果和标签的交集
                this.datas = !this.selected_tag[0] ? this.searchDatas :
                    this.searchDatas.filter(searchItem => 
                        this.tagDatas.some(tagItem => 
                            String(tagItem.name) === String(searchItem.name)
                        )
                    );
                this.sortDatas(this.sequencerValue);
                this.originDatas = this.datas; // 保存原始数据，原始数据应该是经过标签或者搜索过滤后的数据
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            } catch (error) {
                this.handleError("搜索失败");
            } finally {
                this.isSearching = false;
            }
        },
        async clearSearch() {
            this.searchQuery = this.activeSearchQuery = "";
            this.searchDatas = [];
            await this.refreshData();
        },
        async clearTag() {
            this.selected_tag = "";
            this.tag_description = "";
            this.tagDatas = [];
            await this.refreshData();
        },
        async refreshData() {
            if (!this.searchQuery && !this.selected_tag[0]) {
                this.fetchData();// 如果没有任何过滤条件，则重新获取所有数据
            } else if (this.searchQuery) {
                await this.handleSearch(); // 如果有搜索条件，则重新进行搜索
            } else if (this.selected_tag[0]) {
                await this.selectModel(this.selected_tag); // 如果有标签条件，则重新进行标签筛选
            }

            if (this.activeFilters.length) {
                this.datas = this.filterItems(this.activeFilters);
            }

            this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
        },
        handleError(message) {
            this.datas = [];
            this.$message.error(message);
            console.error(message);
        },
        sequencerChange(value) {
            if (typeof value !== 'number') {
                return;
            }
            this.sequencerValue = value;
            if(value === 0){
                this.datas = this.originDatas;
            }
            this.datas = [...this.datas].sort((a, b) => {
                switch (value) {
                    case 1: // 发布时间排序
                        return new Date(b.releaseDate) - new Date(a.releaseDate); // 降序：新的在前
                    case 2: // 收藏量排序
                        return b.favoritesCount - a.favoritesCount; // 降序：多的在前
                    default:
                        return 0;
                }
            });
            
            this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
        },
        sortDatas(value){
            this.datas = [...this.datas].sort((a, b) => {
                switch (value) {
                    case 1: // 发布时间排序
                        return new Date(b.releaseDate) - new Date(a.releaseDate); // 降序：新的在前
                    case 2: // 收藏量排序
                        return b.favoritesCount - a.favoritesCount; // 降序：多的在前
                    default:
                        return 0;
                }
            });
        }
    },
    created() {
        this.fetchData();
        this.activeFilters = ["开源", "不开源"];
    },
    mounted(){
        this.sequencerValue = this.$refs.featureSequencer.getRadio();
    },
    watch: {
        models: function (newVal, oldVal) {
            this.$refs.modelCardContainer.models = newVal;
            this.$refs.modelCardContainer.updatePaginatedModel();
        },
    },
    computed: {
        hasFilters() {
            return (
                this.activeSearchQuery ||
                this.selected_tag[0] ||
                this.activeFilters.length > 0 ||
                this.datas.length > 0
            );
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

.filter-tags-container {
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
    position: relative;
    display: flex;
    flex-direction: row;
    background-color: white;
    width: calc(90% - 20px);
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    align-items: center;
}

.filter-tag {
    font-size: 11 px;
    background-color: #f0f2f5;
    max-width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.filter-tag:hover {
    overflow: visible;
    z-index: 1;
}
</style>
