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
            ref="featureSelector"
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
        <EmptyResult v-if="!hasFilters" />
    </div>
</template>
<script>
import axiosInstance from "@/plugins/axios";
import EmptyResult from "./emptyResult.vue";
import FeatureSelector from "./featureSelector.vue";
import FeatureSequencer from "./featureSequencer.vue";
import orderData from './json/data.json';
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
            isRestoringState: false,
        };
    },
    components: {
        FeatureSelector,
        FeatureSequencer,
        modelCardContainer,
        EmptyResult,
    },
    methods: {
        processImagePath(data) {
            const BASE_URL = "http://49.233.82.133:5174";
            return data.map((item) => ({
                ...item,
                model_image_path: item.model_image_path
                    ? `${BASE_URL}${this.getSubstringAfterKeyword(
                          item.model_image_path,
                          "public"
                      )}`
                    : item.model_image_path,
            }));
        },
        sortByJsonOrder(data) {
            try {
                // 创建一个 model_id 到 id（顺序）的映射
                const orderMap = new Map();
                
                // 使用导入的 JSON 数据
                orderData.forEach(item => {
                    orderMap.set(item.model_id, item.id);
                });

                // 对数据进行排序，使用 modelId 而不是 model_id
                return [...data].sort((a, b) => {
                    const orderA = orderMap.get(a.modelId) ?? Infinity;
                    const orderB = orderMap.get(b.modelId) ?? Infinity;
                    return orderA - orderB;
                });
            } catch (error) {
                console.error('排序失败:', error);
                return data; // 如果出错则返回原始数据
            }
        },
        async fetchData() {
            try {
                const {
                    data: { data },
                } = await axiosInstance.get("/model/");
                const processedData = this.processImagePath(data);
                // 在这里应用排序
                this.datas = this.sortByJsonOrder(processedData);
                this.originDatas = [...this.datas];
                console.log(this.datas, "datas");
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            } catch (error) {
                console.log(error, "error");
            }
        },
        async selectModel(tag) {
            try {
                const [modelResponse, descResponse] = await Promise.all([
                    axiosInstance.get(`/model/tagName/?tagName=${tag[0]}`),
                    axiosInstance.get(`/tag/description?tagId=${tag[1]}`),
                ]);

                this.tagDatas = this.processImagePath(
                    modelResponse.data.data || []
                );
                this.tag_description = descResponse.data.data;

                this.datas = !this.activeSearchQuery
                    ? this.tagDatas
                    : this.searchDatas.filter((searchItem) =>
                          this.tagDatas.some(
                              (tagItem) =>
                                  String(tagItem.name) ===
                                  String(searchItem.name)
                          )
                      );
                this.sortDatas(this.sequencerValue);
                this.originDatas = this.datas;
                this.selected_tag = tag;
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
                this.$nextTick(() => this.updateUrlParams());
            } catch (error) {
                this.handleError("标签筛选失败");
            }
        },
        getSubstringAfterKeyword(inputString, keyword) {
            const index = inputString?.indexOf(keyword);
            return index !== -1
                ? inputString.substring(index + keyword.length)
                : "";
        },
        filterItems(filterArray) {
            if (!filterArray?.length) return this.originDatas;

            const dataToFilter = this.selected_tag[0] ? this.datas : this.originDatas;
            return dataToFilter.filter(
                (item) =>
                    (filterArray.includes("开源") && item.isOpenSource) ||
                    (filterArray.includes("不开源") && !item.isOpenSource)
            );
        },
        openSourceChange(value) {
            if (!Array.isArray(value)) return;

            this.activeFilters = [...value];
            this.datas = this.filterItems(this.activeFilters);
            this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            this.$nextTick(() => this.updateUrlParams());
        },
        async handleSearch() {
            if (!this.searchQuery.trim()) {
                return this.clearSearch();
            }

            this.isSearching = true;
            try {
                const {
                    data: { data },
                } = await axiosInstance.get(
                    `/model/searchByName?name=${this.searchQuery}`
                );

                this.searchDatas = this.processImagePath(data || []);
                this.activeSearchQuery = this.searchQuery;
                this.datas = !this.selected_tag[0]
                    ? this.searchDatas
                    : this.searchDatas.filter((searchItem) =>
                          this.tagDatas.some(
                              (tagItem) =>
                                  String(tagItem.name) ===
                                  String(searchItem.name)
                          )
                      );
                this.sortDatas(this.sequencerValue);
                this.originDatas = this.datas;
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
                this.$nextTick(() => this.updateUrlParams());
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
            this.$nextTick(() => this.updateUrlParams());
        },
        async clearTag() {
            this.selected_tag = ["", ""];
            this.tag_description = "";
            this.tagDatas = [];
            await this.refreshData();
            this.$nextTick(() => this.updateUrlParams());
        },
        async refreshData() {
            if (!this.searchQuery && !this.selected_tag[0]) {
                this.fetchData(); // 如果没有任何过滤条件，则重新获取所有数据
            } else if (this.searchQuery) {
                await this.handleSearch(); // 如果有搜索条件，则重新进行搜索
            } else if (this.selected_tag[0]) {
                await this.selectModel(this.selected_tag); // 如果有标签条件，则重新进行标签筛选
            }
            // 如果存在开源闭源过滤条件，则进行过滤
            if (this.activeFilters.length) {
                this.datas = this.filterItems(this.activeFilters);
            }
            // 如果存在排序条件，则进行排序
            if (this.sequencerValue) {
                this.sortDatas(this.sequencerValue);
            }

            this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
        },
        handleError(message) {
            this.datas = [];
            this.$message.error(message);
            console.error(message);
        },
        sequencerChange(value) {
            if (typeof value !== "number") return;

            this.sequencerValue = value;
            
            // 保存当前的筛选状态
            const currentFilters = [...this.activeFilters];
            
            // 首先根据排序更新数据
            if (value === 0) {
                // 综合排序：恢复到原始排序，但保持标签筛选
                this.datas = this.selected_tag[0] ? this.tagDatas : this.originDatas;
            } else {
                this.datas = [...this.datas].sort((a, b) => {
                    switch (value) {
                        case 1:
                            return new Date(b.releaseDate) - new Date(a.releaseDate);
                        case 2:
                            return b.favoritesCount - a.favoritesCount;
                        default:
                            return 0;
                    }
                });
            }

            // 重新应用开源/不开源筛选
            if (currentFilters.length) {
                this.datas = this.filterItems(currentFilters);
            }

            this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            this.$nextTick(() => this.updateUrlParams());
        },
        sortDatas(value) {
            this.datas = [...this.datas].sort((a, b) => {
                switch (value) {
                    case 1:
                        return (
                            new Date(b.releaseDate) - new Date(a.releaseDate)
                        );
                    case 2:
                        return b.favoritesCount - a.favoritesCount;
                    default:
                        return 0;
                }
            });
        },
        validateTag(tag, tagId) {
            // 通过 ref 获取 featureSelector 组件的标签数据
            const featureSelector = this.$refs.featureSelector;
            if (!featureSelector) return false;

            const allTags = [
                ...featureSelector.tags_0,
                ...featureSelector.tags_1,
                ...featureSelector.tags_2,
                ...featureSelector.tags_3,
            ];

            // 递归检查标签及其子标签
            const isValidTag = (tags) => {
                for (const tagItem of tags) {
                    if (
                        tagItem.value[0] === tag &&
                        String(tagItem.value[1]) === String(tagId)
                    ) {
                        return true;
                    }
                    if (tagItem.subtags && tagItem.subtags.length) {
                        if (isValidTag(tagItem.subtags)) {
                            return true;
                        }
                    }
                }
                return false;
            };

            return isValidTag(allTags);
        },

        validateFilters(filters) {
            const validFilters = ["开源", "不开源"];
            return filters.every((filter) => validFilters.includes(filter));
        },

        validateSort(sort) {
            return [0, 1, 2].includes(Number(sort));
        },

        async restoreFromUrl() {
            this.isRestoringState = true;
            const { search, tag, tagId, filters, sort, page } =
                this.$route.query;

            // 先恢复数据
            if (search) {
                this.searchQuery = search;
                await this.handleSearch();
            }

            // 验证并恢复标签
            if (tag && tagId) {
                if (this.validateTag(tag, tagId)) {
                    await this.selectModel([tag, tagId]);
                } else {
                    this.$message.error(`无效的标签参数: ${tag}`);
                    // 移除无效的标签参数
                    const query = { ...this.$route.query };
                    delete query.tag;
                    delete query.tagId;
                    this.$router.replace({ query });
                }
            }

            // 验证并恢复筛选器
            if (filters) {
                const filterArray = filters.split(",");
                if (this.validateFilters(filterArray)) {
                    this.openSourceChange(filterArray);
                } else {
                    this.$message.error("无效的筛选参数");
                    // 移除无效的筛选参数
                    const query = { ...this.$route.query };
                    delete query.filters;
                    this.$router.replace({ query });
                }
            }

            // 验证并恢复排序
            if (sort) {
                const sortValue = parseInt(sort);
                if (this.validateSort(sortValue)) {
                    this.$refs.featureSequencer.setRadio(sortValue);
                    this.sequencerChange(sortValue);
                } else {
                    this.$message.error("无效的排序参数");
                    // 移除无效的排序参数
                    const query = { ...this.$route.query };
                    delete query.sort;
                    this.$router.replace({ query });
                }
            }

            // 最后恢复页码
            if (page) {
                const pageNum = parseInt(page);
                this.$nextTick(() => {
                    this.$refs.modelCardContainer?.handleCurrentChange(pageNum);
                });
            }

            this.isRestoringState = false;
        },

        updateUrlParams() {
            if (this.isRestoringState) return;

            const query = {};

            if (this.activeSearchQuery) {
                query.search = this.activeSearchQuery;
            }

            if (
                this.selected_tag[0] &&
                this.selected_tag[1] &&
                this.validateTag(this.selected_tag[0], this.selected_tag[1])
            ) {
                query.tag = this.selected_tag[0];
                query.tagId = this.selected_tag[1];
            }

            if (
                this.activeFilters.length &&
                this.validateFilters(this.activeFilters)
            ) {
                query.filters = this.activeFilters.join(",");
            }

            const sortValue = this.$refs.featureSequencer?.getRadio();
            if (sortValue !== undefined && this.validateSort(sortValue)) {
                query.sort = sortValue;
            }

            const currentPage =
                this.$refs.modelCardContainer?.pagination.currentPage;
            if (currentPage && currentPage > 1) {
                query.page = currentPage;
            }

            console.log("Updating URL with query:", query); // 添加调试日志

            // 使用 nextTick 确保在 DOM 更新后执行路由更新
            this.$nextTick(() => {
                this.$router
                    .replace({
                        path: this.$route.path,
                        query: Object.keys(query).length ? query : undefined,
                    })
                    .catch((err) => {
                        if (err.name !== "NavigationDuplicated") {
                            console.error("URL update failed:", err);
                        }
                    });
            });
        },
    },
    created() {
        this.fetchData().then(() => {
            this.restoreFromUrl();
        });
        this.activeFilters = ["开源", "不开源"];

        // 添加路由变化监听
        this.$watch(
            () => this.$route.query,
            (newQuery) => {
                console.log("Route query changed:", newQuery); // 添加调试日志
            },
            { deep: true }
        );
    },
    mounted() {
        this.sequencerValue = this.$refs.featureSequencer.getRadio();
    },
    watch: {
        models: function (newVal, oldVal) {
            this.$refs.modelCardContainer.models = newVal;
            this.$refs.modelCardContainer.updatePaginatedModel();
        },
        "$route.query": {
            handler(newQuery, oldQuery) {
                if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
                    this.restoreFromUrl();
                }
            },
            deep: true,
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
