<template>
    <div class="home-page-mid">
        <!-- 添加顶部背景图和文字内容 -->
        <div class="hero-wrapper">
            <div class="hero-section">
                <div class="hero-content content-container">
                    <div class="text-container">
                        <h1 class="hero-title">LLMEval</h1>
                        <div class="divider"></div>
                        <p class="hero-description">
                            一个标签化展示大模型能力，为用户提供大模型选择建议的平台
                        </p>

                        <!-- 搜索框放到text-container内部实现左对齐 -->
                        <div class="search-container">
                            <div class="custom-search">
                                <el-input
                                    v-model="searchQuery"
                                    placeholder="输入关键字 搜索您想找的模型"
                                    class="search-input"
                                    clearable
                                    @keyup.enter="handleSearch"
                                    @clear="clearSearch"
                                >
                                </el-input>
                                <el-button
                                    :loading="isSearching"
                                    @click="handleSearch"
                                    class="search-button"
                                >
                                    搜索
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- FeatureSelector 组件 -->
        <div class="feature-selector-wrapper content-container">
            <FeatureSelector
                ref="featureSelector"
                @custom-event="selectModel"
                :selected_tag="selected_tag"
                :tag_description="tag_description"
                @change="openSourceChange"
            />
        </div>

        <!-- 新的白色背景区域，包含已选标签、结果计数、标签简介和排序控件 -->
        <div v-if="hasFilters" class="filter-info-container content-container">
            <div class="filter-info-top">
                <!-- 左上：已选标签 -->
                <div class="filter-tags">
                    <div
                        v-if="!activeSearchQuery && !selected_tag[0]"
                        class="no-tags-message"
                    >
                        已选：
                    </div>
                    <template v-else>
                        <span
                            class="select-prefix"
                            v-if="activeSearchQuery || selected_tag[0]"
                            >选择：</span
                        >
                        <el-tag
                            v-if="activeSearchQuery"
                            closable
                            @close="clearSearch"
                            class="filter-tag"
                        >
                            搜索：{{ activeSearchQuery }}
                        </el-tag>
                        <el-tag
                            v-if="selected_tag[0]"
                            closable
                            @close="clearTag"
                            class="filter-tag"
                        >
                            {{ selected_tag[0] }}
                        </el-tag>
                    </template>
                </div>

                <!-- 右上：标签简介 -->
                <div class="tag-description" v-if="tag_description">
                    <p class="description-content">
                        <span class="description-label">简介：</span
                        >{{ tag_description }}
                    </p>
                </div>
                <div class="tag-description" v-else-if="selected_tag[0]">
                    <p class="description-content">
                        <span class="description-label">简介：</span
                        >该标签暂无描述
                    </p>
                </div>
            </div>

            <div class="filter-info-bottom">
                <!-- 左下：结果计数 -->
                <div class="result-count">
                    <span
                        >共找到
                        <span class="count-number">{{ datas.length }}</span>
                        个结果</span
                    >
                </div>

                <!-- 右下：排序控件 -->
                <div class="sequencer-wrapper">
                    <FeatureSequencer
                        @change="sequencerChange"
                        ref="featureSequencer"
                    />
                </div>
            </div>
        </div>

        <div class="model-card-container-wrapper content-container">
            <template v-if="isLoading">
                <div class="loading-container">
                    <el-skeleton :rows="10" animated />
                </div>
            </template>
            <template v-else>
                <modelCardContainer
                    v-if="datas.length > 0"
                    :datas="datas"
                    ref="modelCardContainer"
                ></modelCardContainer>
                <EmptyResult v-else />
            </template>
        </div>
    </div>
</template>
<script>
import axiosInstance from "@/plugins/axios";
import EmptyResult from "./emptyResult.vue";
import FeatureSelector from "./featureSelector.vue";
import FeatureSequencer from "./featureSequencer.vue";
import orderData from "./json/data.json";
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
            isLoading: true,
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
                orderData.forEach((item) => {
                    orderMap.set(item.model_id, item.id);
                });

                // 对数据进行排序，使用 modelId 而不是 model_id
                return [...data].sort((a, b) => {
                    const orderA = orderMap.get(a.modelId) ?? Infinity;
                    const orderB = orderMap.get(b.modelId) ?? Infinity;
                    return orderA - orderB;
                });
            } catch (error) {
                console.error("排序失败:", error);
                return data; // 如果出错则返回原始数据
            }
        },
        async fetchData() {
            this.isLoading = true;
            try {
                const {
                    data: { data },
                } = await axiosInstance.get("/model/");
                const processedData = this.processImagePath(data);
                // 在这里应用排序
                this.datas = this.sortByJsonOrder(processedData);
                this.originDatas = [...this.datas];
                console.log(this.datas, "datas");

                // 确保数据加载完成后，再更新组件
                this.$nextTick(() => {
                    if (this.$refs.modelCardContainer) {
                        console.log(
                            "更新分页数据，总数据量:",
                            this.datas.length
                        );
                        this.$refs.modelCardContainer.updatePaginatedModel(
                            this.datas
                        );

                        // 如果当前页不是第1页，先跳回第1页，确保能显示数据
                        if (
                            this.$refs.modelCardContainer.pagination
                                .currentPage !== 1
                        ) {
                            this.$refs.modelCardContainer.pagination.currentPage = 1;
                            this.$refs.modelCardContainer.updatePaginatedModel();
                        }
                    }
                });
            } catch (error) {
                console.log(error, "error");
                this.datas = [];
                this.originDatas = [];
            } finally {
                this.isLoading = false;
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

                // 增加调试日志
                console.log("获取到的标签描述:", descResponse.data.data);
                this.tag_description =
                    descResponse.data.data || "该标签暂无描述";

                // 先保存未排序的数据
                const unsortedData = !this.activeSearchQuery
                    ? [...this.tagDatas]
                    : this.searchDatas.filter((searchItem) =>
                          this.tagDatas.some(
                              (tagItem) =>
                                  String(tagItem.name) ===
                                  String(searchItem.name)
                          )
                      );

                // 设置为未排序的原始数据
                this.originDatas = [...unsortedData];

                // 然后应用排序
                this.datas = [...unsortedData];
                if (this.sequencerValue) {
                    this.sortDatas(this.sequencerValue);
                }

                this.selected_tag = tag;

                if (this.$refs.modelCardContainer) {
                    this.$refs.modelCardContainer.updatePaginatedModel(
                        this.datas
                    );
                }
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

            const dataToFilter = this.selected_tag[0]
                ? this.datas
                : this.originDatas;
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
            if (this.$refs.modelCardContainer) {
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            }
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

                // 先保存未排序的数据
                const unsortedData = !this.selected_tag[0]
                    ? [...this.searchDatas]
                    : this.searchDatas.filter((searchItem) =>
                          this.tagDatas.some(
                              (tagItem) =>
                                  String(tagItem.name) ===
                                  String(searchItem.name)
                          )
                      );

                // 设置为未排序的原始数据
                this.originDatas = [...unsortedData];

                // 然后应用排序
                this.datas = [...unsortedData];
                if (this.sequencerValue) {
                    this.sortDatas(this.sequencerValue);
                }

                if (this.$refs.modelCardContainer) {
                    this.$refs.modelCardContainer.updatePaginatedModel(
                        this.datas
                    );
                }
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
            // 重置标签值
            this.selected_tag = ["", ""];
            this.tag_description = "";
            this.tagDatas = [];
            
            // 清除URL中的所有标签相关参数
            const url = new URL(window.location.href);
            url.searchParams.delete('tag');
            url.searchParams.delete('tagId');
            
            // 确保清除任何可能存在的子标签相关参数
            const tagRelatedParams = ['tag', 'tagId', 'subtag', 'subtagId'];
            tagRelatedParams.forEach(param => url.searchParams.delete(param));
            
            // 使用history API更新URL，不触发页面刷新
            window.history.replaceState({}, document.title, url.toString());
            
            console.log('已清除所有标签参数，准备刷新页面');
            
            // 然后刷新页面，重置所有状态
            window.location.reload();
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

            // 添加组件引用检查
            if (this.$refs.modelCardContainer) {
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            }
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
                if (this.activeSearchQuery && this.selected_tag[0]) {
                    // 如果同时有搜索和标签，使用现有数据
                    this.datas = [...this.datas];
                } else if (this.activeSearchQuery) {
                    // 如果只有搜索，使用搜索数据
                    this.datas = [...this.searchDatas];
                } else if (this.selected_tag[0]) {
                    // 如果只有标签，使用标签数据
                    this.datas = [...this.tagDatas];
                } else {
                    // 如果没有任何筛选，使用原始数据
                    this.datas = [...this.originDatas];
                }
            } else {
                this.datas = [...this.datas].sort((a, b) => {
                    switch (value) {
                        case 1:
                            return (
                                new Date(b.releaseDate) -
                                new Date(a.releaseDate)
                            );
                        case 2:
                            return b.favoritesCount - a.favoritesCount;
                        default:
                            return 0;
                    }
                });
            }

            // 重新应用开源/不开源筛选
            if (currentFilters.length && currentFilters.length < 2) {
                // 只有当不是全选时才应用筛选
                this.datas = this.filterItems(currentFilters);
            }

            // 添加组件引用检查
            if (this.$refs.modelCardContainer) {
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            }

            // 确保无论组件是否存在都更新URL参数
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
        // 设置初始筛选器状态
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
        // 先获取数据，然后在回调中处理URL参数恢复
        this.fetchData().then(() => {
            // 确保组件已经挂载且数据已加载完成后再恢复URL参数
            this.$nextTick(() => {
                // 确保排序组件已初始化
                if (this.$refs.featureSequencer) {
                    this.sequencerValue =
                        this.$refs.featureSequencer.getRadio() || 0;
                }

                // 延迟一点时间再恢复URL参数，确保所有子组件都已加载
                setTimeout(() => {
                    this.restoreFromUrl();

                    // 如果需要初始排序，确保在所有组件都加载完成后进行
                    if (
                        this.sequencerValue !== 0 &&
                        this.datas.length &&
                        this.$refs.modelCardContainer
                    ) {
                        this.sortDatas(this.sequencerValue);
                        this.$refs.modelCardContainer.updatePaginatedModel(
                            this.datas
                        );
                    }

                    // 无论是否需要排序，都确保 modelCardContainer 更新了分页数据
                    if (
                        this.$refs.modelCardContainer &&
                        this.datas.length > 0
                    ) {
                        console.log("mounted: 再次确认更新分页数据");
                        this.$refs.modelCardContainer.updatePaginatedModel(
                            this.datas
                        );
                    }
                }, 100);
            });
        });
    },
    watch: {
        models: function (newVal, oldVal) {
            if (this.$refs.modelCardContainer) {
                this.$refs.modelCardContainer.models = newVal;
                this.$refs.modelCardContainer.updatePaginatedModel();
            }
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
                this.activeFilters.length > 0
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
    width: 100%;
}

/* 加载中状态的样式 */
.loading-container {
    width: 100%;
    background-color: white;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

/* 新增的白色背景区域样式 */
.filter-info-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 13px; /* 整体字体调小 */
    width: 95%;
    max-width: 1400px; /* 统一最大宽度 */
}

/* 模型容器包裝器 */
.model-card-container-wrapper {
    margin-bottom: 20px;
    width: 95%;
    max-width: 1400px; /* 统一最大宽度 */
    margin-left: auto;
    margin-right: auto;
}

/* FeatureSelector包装器样式 */
.feature-selector-wrapper {
    margin-bottom: 20px;
    width: 95%;
    max-width: 1400px; /* 统一最大宽度 */
    margin-left: auto;
    margin-right: auto;
}

/* 隐藏FeatureSelector中的重复内容 */
.feature-selector-wrapper :deep(.selected-tag) {
    display: none;
}

.filter-info-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
}

.filter-info-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
}

.filter-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    min-height: 24px; /* 确保即使没有标签时也保留空间 */
    align-items: center;
    margin: 20px;
}

.select-prefix {
    color: #606266;
    font-size: 13px;
    margin-right: 4px;
}

.no-tags-message {
    color: #606266;
    font-size: 13px;
}

.tag-description {
    max-width: 60%;
    text-align: right;
    font-size: 13px; /* 调小字体 */
    color: #666a75;
    min-height: 24px; /* 确保即使没有描述时也保留空间 */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin:20px;
}

.description-label {
    font-weight: 600;
    margin-right: 4px;
    color: #666a75;
    font-size: 13px; /* 调小字体 */
    display: inline; /* 确保在同一行显示 */
}

.description-content {
    margin: 0;
    padding: 0;
    color: #666a75;
    font-size: 13px; /* 调小字体 */
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.result-count {
    font-size: 13px; /* 调小字体 */
    color: #606266;
    margin-left: 20px;
}

.count-number {
    color: #870066;
    font-weight: 600;
    font-size: 14px; /* 调小字体 */
}

.sequencer-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
}

/* 覆盖FeatureSequencer内部样式 */
.sequencer-wrapper :deep(.feature-sequencer) {
    width: auto;
    padding: 0;
    text-align: right;
    background-color: transparent;
}

.filter-tag {
    font-size: 12px;
    background-color: #f0f2f5;
    border-color: #dcdfe6;
    color: #606266;
    max-width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 10px;
    height: 24px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #870066;
    line-height: 20px;
    text-align: left;
    font-style: normal;
}

/* 添加自定义关闭图标的颜色样式 */
.filter-tag :deep(.el-tag__close) {
    color: #870066;
    font-size: 12px;
}

.filter-tag :deep(.el-tag__close:hover) {
    color: #870066;
    background-color: rgba(135, 0, 102, 0.1);
}

.filter-tag:hover {
    overflow: visible;
    z-index: 1;
}

.hero-wrapper {
    width: 100%;
    background-image: url("./images/top_background.png");
    background-size: cover;
    background-position: center;
    overflow-x: hidden; /* 防止内容溢出 */
}

.hero-section {
    height: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 0; /* 移除左内边距，改用content-container控制 */
    box-sizing: border-box; /* 确保padding不会增加元素宽度 */
}

.hero-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 95%; /* 与其他容器保持一致 */
    max-width: 1400px; /* 保持统一最大宽度 */
    margin: 0 auto;
    padding-left: 20px; /* 使用固定内边距代替百分比 */
    box-sizing: border-box; /* 确保padding不会增加元素宽度 */
}

.text-container {
    align-self: flex-start;
    margin-bottom: 30px;
    width: auto;
}

.hero-title {
    width: 125px;
    height: 45px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 32px;
    color: #870066;
    line-height: 45px;
    text-align: left;
    font-style: normal;
    margin-bottom: 10px;
}

.divider {
    height: 2px;
    background-color: #870066;
    width: 125px;
    margin-bottom: 10px;
}

.hero-description {
    max-width: 448px; /* 改为最大宽度而不是固定宽度 */
    width: 100%; /* 允许在小屏幕上自适应 */
    height: auto; /* 允许文本自动换行 */
    min-height: 22px; /* 保持最小高度 */
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #870066;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    margin-bottom: 20px;
    word-wrap: break-word; /* 允许长词自动换行 */
}

.search-container {
    max-width: 448px; /* 改为最大宽度 */
    width: 100%; /* 允许在小屏幕上自适应 */
    margin-bottom: 20px;
    z-index: 1000; /* 确保搜索框在其他元素之上 */
}

.custom-search {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    height: 36px; /* 与输入框高度保持一致 */
}

.search-input {
    width: 100%;
}

.search-input :deep(.el-input__wrapper) {
    height: 36px; /* 略微减小输入框高度 */
    border-radius: 20px !important;
    padding-right: 72px;
    box-shadow: none !important;
    border: 1px solid #e4e7ed;
}

.search-input :deep(.el-input__wrapper):hover {
    border-color: #c0c4cc;
}

.search-input :deep(.el-input__wrapper.is-focus) {
    border-color: #870066;
}

.search-input :deep(.el-input__inner) {
    /* 搜索框内文字样式 */
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 13px; /* 减小搜索框内文字大小 */
    color: #8f94a4;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    padding-left: 15px; /* 为输入文字添加左边距 */
}

.search-input :deep(.el-input__placeholder) {
    font-size: 13px; /* 确保placeholder文字也同步调整 */
    color: #8f94a4;
}

.search-input :deep(.el-input__suffix) {
    right: 70px;
}

.search-input :deep(.el-input__suffix-inner .el-icon) {
    font-size: 14px;
}

.search-button {
    position: absolute;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 32px;
    background: #870066;
    border-radius: 20px;
    border-color: #870066;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border: none;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.search-button span {
    /* 搜索按钮内文字样式 */
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 12px; /* 减小"搜索"二字的字体大小 */
    color: #ffffff;
    line-height: 18px; /* 调整行高匹配字体大小 */
    text-align: center;
    font-style: normal;
    margin: 0;
    padding: 0;
}

.search-button:hover {
    background-color: #a50080;
    border-color: #a50080;
}

.search-button:active {
    background-color: #6c0052;
    border-color: #6c0052;
}

@media (max-width: 768px) {
    .hero-section {
        justify-content: center;
        padding-left: 0;
    }
    
    .hero-content {
        padding-left: 0;
        width: 90%; /* 在移动设备上减小宽度 */
    }

    .text-container {
        align-self: center;
        width: 100%;
    }

    .hero-title {
        text-align: center;
        margin: 0 auto 10px;
    }

    .divider {
        margin: 0 auto 10px;
    }

    .hero-description {
        width: 100%;
        text-align: center;
    }

    .search-container {
        width: 100%;
        align-self: center;
        max-width: 100%;
        padding: 0 15px;
    }
    
    .search-input :deep(.el-input__wrapper) {
        height: 40px;
        border-radius: 20px !important;
    }
    
    .search-button {
        height: 34px;
    }

    /* 标签和描述在移动设备上的样式调整 */
    .tag-description {
        max-width: 100%;
        text-align: left;
        padding: 0;
        margin-top: 10px;
        margin-bottom: 10px;
        align-items: flex-start; /* 在移动设备上左对齐 */
        margin: 10px;
    }

    .description-content {
        width: 100%; /* 内容宽度充满容器 */
        word-break: break-word; /* 长文本换行 */
        justify-content: flex-start; /* 在移动设备上左对齐 */
    }

    .filter-info-container {
        width: 95%;
    }

    .filter-info-top,
    .filter-info-bottom {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }

    .filter-tags {
        margin: 15px 10px 5px 10px;
        width: calc(100% - 20px);
    }

    .description-label {
        margin-bottom: 4px; /* 减小标签和内容之间的距离 */
    }

    .result-count {
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .sequencer-wrapper {
        width: 100%;
        justify-content: flex-start;
        margin-right: 0;
        margin-left: 10px;
        margin-bottom: 10px;
    }

    /* 新增 FeatureSelector 响应式样式 */
    .feature-selector-wrapper,
    .filter-info-container,
    .model-card-container-wrapper {
        width: 95%;
        padding: 0;
    }

    .feature-selector-wrapper :deep(.container) {
        width: 100% !important;
        padding: 10px !important;
    }

    .model-card-container-wrapper {
        padding: 0;
    }

    .filter-info-container {
        padding: 10px 0;
    }
}
</style>
