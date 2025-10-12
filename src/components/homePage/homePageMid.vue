<template>
  <div class="home-page-mid">
    <!-- 添加顶部背景图和文字内容 -->
    <div class="hero-wrapper">
      <div class="hero-section">
        <div class="hero-content content-container">
          <div class="text-container">
            <h1 class="hero-title">琅琊海评</h1>
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

    <!-- 新的白色背景区域，包含已选标签、结果计数、标签简介和排序控件 -->
    <div v-if="hasFilters" class="filter-info-container content-container">
      <div class="filter-info-top">
        <!-- 左上：已选标签 -->
        <div class="filter-tags">
          <div
            v-if="!activeSearchQuery && !selected_tag[0] && !selected_org[0]"
            class="no-tags-message"
          >
            已选：
          </div>
          <template v-else>
            <span
              class="select-prefix"
              v-if="activeSearchQuery || selected_tag[0] || selected_org[0]"
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
            <el-tag
              v-if="selected_org[0]"
              closable
              @close="clearOrg"
              class="filter-tag"
            >
              发布机构：{{ selected_org[0] }}
            </el-tag>
          </template>
        </div>

        <!-- 右上：标签简介 -->
        <div class="tag-description" v-if="tag_description">
          <p class="description-content">
            <span class="description-label">简介：</span>{{ tag_description }}
          </p>
        </div>
        <div class="tag-description" v-else-if="selected_tag[0]">
          <p class="description-content">
            <span class="description-label">简介：</span>该标签暂无描述
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
          <FeatureSequencer @change="sequencerChange" ref="featureSequencer" />
        </div>
      </div>
    </div>
    <!-- 模型分类Tab筛选器 -->
    <div class="category-tab-bar content-container">
      <div class="category-tabs" ref="categoryTabs">
        <span
          v-for="(item, idx) in categoryList"
          :key="item.value"
          :class="['category-tab', { active: selectedCategory === item.value }]"
          @click="handleCategoryTabClick(item, idx)"
          ref="categoryTab"
        >
          {{ item.label }}
        </span>
        <div class="category-tab-underline">
          <div
            class="category-tab-underline-active"
            :style="underlineStyle"
          ></div>
        </div>
      </div>
    </div>
    <!-- FeatureSelector 组件 -->
    <div class="feature-selector-wrapper content-container">
      <FeatureSelector
        ref="featureSelector"
        @select-org="selectOrg"
        @select-tag="selectTag"
        :selected_tag="selected_tag"
        :tag_description="tag_description"
        @change="openSourceChange"
      />
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
      selected_org: ["", ""],
      originDatas: [],
      orgDatas: [], // 新增：机构数据
      searchQuery: "",
      activeSearchQuery: "",
      isSearching: false,
      activeFilters: [],
      searchDatas: [],
      tagDatas: [],
      sequencerValue: 0,
      isRestoringState: false,
      isLoading: true,
      categoryList: [
        { label: "全部", value: "0" },
        { label: "基础", value: "1" },
        { label: "专业", value: "2" },
        { label: "多模态", value: "3" },
        { label: "智能体", value: "4" },
      ],
      selectedCategory: "1",
      underline: {
        left: 0,
        width: 0,
      },
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
      return data.map((item) => ({
        ...item,
        model_image_path: item.model_image_path
          ? `/images/${item.model_image_path.split("/images/")[1]}` // 提取 /images/ 后面的部分并拼接
          : "",
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
    async fetchData(tag = this.selectedCategory) {
      this.isLoading = true;
      try {
        let data;
        if (tag !== "0") {
          const response = await axiosInstance.get(`/model/tag?tag=${tag}`);
          data = response.data.data;
        } else {
          const response = await axiosInstance.get(`/model/`);
          data = response.data.data;
        }

        // console.log(data, "ssssdata");
        const processedData = this.processImagePath(data);
        this.originDatas = [...processedData];
        this.datas = this.sortByJsonOrder(processedData);

        const dataWithScore = await Promise.all(
          processedData.map(async (item) => {
            try {
              const scoreRes = await axiosInstance.get(
                `/model/rating/stats?modelId=${item.modelId}`
              );
              const averageRating = scoreRes.data.data?.averageRating || 0; // 默认0分避免排序出错
              return { ...item, averageRating }; 
            } catch (err) {
              console.error(`获取模型${item.modelId}评分失败:`, err);
              return { ...item, averageRating: 0 }; // 失败时赋默认值
            }
          })
        );
        // 3. 替换为带评分的数据
        this.originDatas = [...dataWithScore];
        this.datas = this.sortByJsonOrder(dataWithScore);
        // console.log(dataWithScore, "aaaadatas");

        //
        const codeAbilityRes = await axiosInstance.get(`/model/sorted-by-code`);
        // 处理按代码能力评分排序的数据
        const codeAbilityData = codeAbilityRes.data.data; // 获取返回的评分数据数组

        // 创建一个modelId到codeAbilityScore的映射
        const codeScoreMap = {};
        codeAbilityData.forEach((item) => {
          codeScoreMap[item.modelId] = item.codeAbilityScore;
        });

        // 将代码能力评分合并到现有数据中
        const dataWithCodeAbility = this.originDatas.map((item) => ({
          ...item,
          // 如果有对应的代码能力评分则使用，否则默认为0
          codeAbilityScore: codeScoreMap[item.modelId] || 0,
        }));

        // 更新数据为包含代码能力评分的数据
        this.originDatas = [...dataWithCodeAbility];
        this.datas = this.sortByJsonOrder(dataWithCodeAbility);
        // console.log(this.datas, "datas 整合版");

        const prieRes = await axiosInstance.get(`/model/sorted-by-price`);
        const datawithPrice = prieRes.data.data;
        const priceMap = {};
        datawithPrice.forEach((item) => {
          priceMap[item.modelId] = item.priceNew;
        });
        const dataWithPrice = this.originDatas.map((item) => ({
          ...item,
          priceNew: priceMap[item.modelId] || 0,
        }));
        this.originDatas = [...dataWithPrice];
        this.datas = this.sortByJsonOrder(dataWithPrice);
        console.log(this.datas, "datas 添加价格");

        this.$nextTick(() => {
          if (this.$refs.modelCardContainer) {
            // console.log("更新分页数据，总数据量:", this.datas.length);
            this.$refs.modelCardContainer.updatePaginatedModel(this.datas);

            if (this.$refs.modelCardContainer.pagination.currentPage !== 1) {
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
    async handleCategoryChange() {
      // 切换分类时重置所有筛选项
      this.selected_tag = ["", ""];
      this.selected_org = ["", ""];
      this.activeSearchQuery = "";
      this.searchQuery = "";
      this.activeFilters = ["开源", "不开源"];
      this.tag_description = "";
      this.tagDatas = [];
      this.searchDatas = [];
      this.sequencerValue = 0;
      // 拉取新分类下的数据
      await this.fetchData(this.selectedCategory);
      // 重新过滤和分页
      this.filterAndSetDatas();
      // 更新URL参数
      this.$nextTick(() => this.updateUrlParams());
    },
    filterAndSetDatas() {
      
      let filtered = [...this.originDatas];

      // 标签筛选（用 tagDatas 里的 name 做交集）
      if (this.selected_tag[0]) {
        if (this.tagDatas.length > 0) {
          filtered = filtered.filter((item) =>
            this.tagDatas.some(
              (tagItem) => String(tagItem.name) === String(item.name)
            )
          );
        } else {
          // 如果选择了标签但没有对应的模型数据，则返回空数组
          filtered = [];
        }
      }
      // 搜索筛选
      if (this.activeSearchQuery) {
        if (this.searchDatas.length > 0) {
          filtered = filtered.filter((item) =>
            this.searchDatas.some(
              (searchItem) => String(searchItem.name) === String(item.name)
            )
          );
        } else {
          // 如果有搜索关键词但没有对应的模型数据，则返回空数组
          filtered = [];
        }
      }
      // 机构筛选
      // 假设 mainstreamOrgs 是主流机构名称数组
      if (this.selected_org[0] === "其他") {
        // 只展示 institution 不在主流机构里的模型
        const mainstreamOrgs = [
          "阿里云",
          "上海人工智能实验室",
          "智谱AI",
          "零一万物",
          "字节跳动",
          "Meta",
          "科大讯飞",
          "百川智能",
          "MiniMax",
          "OpenAI",
          "Google",
          "深度求索",
          "Mistral AI",
          "腾讯",
          "商汤日日新",
          "百度",
        ];
        filtered = filtered.filter(
          (item) => !mainstreamOrgs.includes(item.institution)
        );
      } else if (this.selected_org[0]) {
        filtered = filtered.filter(
          (item) => item.institution === this.selected_org[0]
        );
      }
      // 开源筛选
      if (this.activeFilters.length === 1) {
        filtered = filtered.filter(
          (item) =>
            (this.activeFilters[0] === "开源" && item.isOpenSource) ||
            (this.activeFilters[0] === "不开源" && !item.isOpenSource)
        );
      }

      // 应用排序
      filtered = this.sortDatasByValue(filtered, this.sequencerValue);
      // console.log("父组件排序后全量数据:", filtered.length, "条"); // 验证：此处应为全部数据
      // 排序后更新数据源 Vue 自动检测到 datas 的变化（因为是新数组），从而触发视图重新渲染。
      this.datas = [...filtered];
      // console.log("排序后的数据前20条score:", this.datas.slice(0,5).map(item => ({name: item.name, score: item.score})));

      if (this.$refs.modelCardContainer) {
        this.$refs.modelCardContainer.updatePaginatedModel(this.datas);

        if (this.$refs.modelCardContainer.pagination.currentPage !== 1) {
          this.$refs.modelCardContainer.pagination.currentPage = 1;
          this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
        }
        console.log(
          "子组件paginatedData:",
          this.$refs.modelCardContainer.paginatedModel
        );
      }
      this.$nextTick(() => this.updateUrlParams());
    },
    sortDatasByValue(data, value) {
      if (value === 0) {
        return this.sortByJsonOrder(data);
      }
      if (value === 4) {
        // 开源模型大小从大到小
        return [...data]
          .filter((item) => item.isOpenSource)
          .sort((a, b) => (b.size || 0) - (a.size || 0));
      }
      if (value === 5) {
        // 开源模型大小从小到大
        return [...data]
          .filter((item) => item.isOpenSource)
          .sort((a, b) => (a.size || 0) - (b.size || 0));
      }
      // 其他排序
      return [...data].sort((a, b) => {
        switch (value) {
          case 1:
            return new Date(b.releaseDate) - new Date(a.releaseDate);
          case 2:
            return new Date(a.releaseDate) - new Date(b.releaseDate);
          case 3:
            return b.favoritesCount - a.favoritesCount;
          case 6:
            return (b.averageRating || 0) - (a.averageRating || 0);
          case 7:
            return (b.codeAbilityScore || 0) - (a.codeAbilityScore || 0);
          case 8:
            return (b.priceNew || 0) - (a.priceNew || 0);
          default:
            return 0;
        }
      });
    },
    async selectTag(tag) {
      try {
        const [modelResponse, descResponse] = await Promise.all([
          axiosInstance.get(`/model/tagName/?tagName=${tag[0]}`),
          axiosInstance.get(`/tag/description?tagId=${tag[1]}`),
        ]);

        this.tagDatas = this.processImagePath(modelResponse.data.data || []);

        this.tag_description = descResponse.data.data || "该标签暂无描述";

        this.selected_tag = tag;

        this.$nextTick(() => this.filterAndSetDatas());
      } catch (error) {
        this.handleError("标签筛选失败");
      }
    },
    async selectOrg(org) {
      this.selected_org = org;
      this.filterAndSetDatas();
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

        this.filterAndSetDatas();
      } catch (error) {
        this.handleError("搜索失败");
      } finally {
        this.isSearching = false;
      }
    },
    openSourceChange(value) {
      if (!Array.isArray(value)) return;
      this.activeFilters = [...value];
      this.filterAndSetDatas();
    },
    async clearOrg() {
      // 重置机构值
      this.selected_org = ["", ""];
      this.orgDatas = [];

      // 清除URL中的机构相关参数
      const url = new URL(window.location.href);
      url.searchParams.delete("org");
      url.searchParams.delete("orgId");

      // 使用history API更新URL，不触发页面刷新
      window.history.replaceState({}, document.title, url.toString());

      // 然后刷新页面，重置所有状态
      window.location.reload();
    },
    validateOrg(org, orgId) {
      const featureSelector = this.$refs.featureSelector;
      if (!featureSelector) return false;
      const allOrgs = featureSelector.tags_4;
      return allOrgs.some(
        (item) =>
          item.value[0] === org && String(item.value[1]) === String(orgId)
      );
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
      url.searchParams.delete("tag");
      url.searchParams.delete("tagId");

      // 确保清除任何可能存在的子标签相关参数
      const tagRelatedParams = ["tag", "tagId", "subtag", "subtagId"];
      tagRelatedParams.forEach((param) => url.searchParams.delete(param));

      // 使用history API更新URL，不触发页面刷新
      window.history.replaceState({}, document.title, url.toString());

      console.log("已清除所有标签参数，准备刷新页面");

      // 然后刷新页面，重置所有状态
      window.location.reload();
    },
    async refreshData() {
      if (!this.searchQuery && !this.selected_tag[0]) {
        this.fetchData(); // 如果没有任何过滤条件，则重新获取所有数据
      } else if (this.searchQuery) {
        await this.handleSearch(); // 如果有搜索条件，则重新进行搜索
      } else if (this.selected_tag[0]) {
        await this.selected_tag(this.selected_tag); // 如果有标签条件，则重新进行标签筛选
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
      this.filterAndSetDatas();
    },
    sortDatas(value) {
      console.log(value, "sortDatas中的数据是");
      this.datas = [...this.datas].sort((a, b) => {
        switch (value) {
          case 1:
            // 发布时间从新到旧
            return new Date(b.releaseDate) - new Date(a.releaseDate);
          case 2:
            // 发布时间从旧到新
            return new Date(a.releaseDate) - new Date(b.releaseDate);
          case 3:
            // 收藏量排序
            return b.favoritesCount - a.favoritesCount;
          case 4:
            // 开源模型大小从大到小
            return b.size - a.size;
          case 5:
            // 开源模型大小从小到大
            return a.size - b.size;
          case 6:
            //模型评分从高到低
            return (b.averageRating || 0) - (a.averageRating || 0);
          case 7:
            //代码能力从高到低
            return (b.codeAbilityScore || 0) - (a.codeAbilityScore || 0);
          case 8:
            //价钱从高到低
            return (b.priceNew || 0) - (a.priceNew || 0);
          default:
            return 0;
        }
      });
      // 如果排序是模型大小，则需要根据开源闭源进行排序
      if (value === 4 || value === 5) {
        this.datas = this.datas.filter((item) => item.isOpenSource);
        console.log("开源模型大小排序", this.datas);
      }
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
      return [0, 1, 2, 3, 4, 5, 6, 7, 8].includes(Number(sort));
    },

    async restoreFromUrl() {
      if (this.isRestoringState) return; // 防止重复进入
      this.isRestoringState = true;
      try {
        const { search, tag, tagId, filters, sort, page } = this.$route.query;

        // 先恢复数据
        if (search) {
          this.searchQuery = search;
          await this.handleSearch();
        }
        // 验证并恢复标签
        if (tag && tagId) {
          if (this.validateTag(tag, tagId)) {
            await this.selectTag([tag, tagId]);
          } else {
            this.$message.error(`无效的标签参数: ${tag}`);
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
      } finally {
        this.isRestoringState = false;
      }
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
      // if (
      //     this.selected_org[0] &&
      //     this.selected_org[1] &&
      //     this.validateOrg(this.selected_org[0], this.selected_org[1])
      // ) {
      //     query.org = this.selected_org[0];
      //     query.orgId = this.selected_org[1];
      // }
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

      const currentPage = this.$refs.modelCardContainer?.pagination.currentPage;
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
    async handleCategoryTabClick(item, idx) {
      if (this.selectedCategory === item.value) return;
      this.selectedCategory = item.value;
      this.$nextTick(() => this.updateUnderline());
      // 切换分类时重置所有筛选项
      this.selected_tag = ["", ""];
      this.selected_org = ["", ""];
      this.activeSearchQuery = "";
      this.searchQuery = "";
      this.activeFilters = ["开源", "不开源"];
      this.tag_description = "";
      this.tagDatas = [];
      this.searchDatas = [];
      this.sequencerValue = 0;
      // 拉取新分类下的数据
      await this.fetchData(this.selectedCategory);
      console.log(this.selectedCategory);
      // 重新过滤和分页
      this.filterAndSetDatas();
      // 更新URL参数
      this.$nextTick(() => this.updateUrlParams());
    },
    updateUnderline() {
      // 计算高亮横线的位置和宽度，使用offsetLeft/offsetWidth保证精确
      this.$nextTick(() => {
        const tabs = this.$refs.categoryTab;
        let tabEl = null;
        if (Array.isArray(tabs)) {
          tabEl =
            tabs[
              this.categoryList.findIndex(
                (i) => i.value === this.selectedCategory
              )
            ];
        } else {
          tabEl = tabs;
        }
        if (tabEl) {
          this.underline.left = tabEl.offsetLeft;
          this.underline.width = tabEl.offsetWidth;
        }
      });
    },
  },
  created() {
    // 设置初始筛选器状态
    this.activeFilters = ["开源", "不开源"];
    this.selectedCategory = this.categoryList[0].value;
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
    this.fetchData(this.selectedCategory).then(() => {
      this.$nextTick(() => {
        this.updateUnderline();
        // 确保排序组件已初始化
        if (this.$refs.featureSequencer) {
          this.sequencerValue = this.$refs.featureSequencer.getRadio() || 0;
        }

        // 延迟一点时间再恢复URL参数，确保所有子组件都已加载
        // setTimeout(() => {
        this.restoreFromUrl();

        // 如果需要初始排序，确保在所有组件都加载完成后进行
        if (
          this.sequencerValue !== 0 &&
          this.datas.length &&
          this.$refs.modelCardContainer
        ) {
          this.sortDatas(this.sequencerValue);
          this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
        }

        // 无论是否需要排序，都确保 modelCardContainer 更新了分页数据
        if (this.$refs.modelCardContainer && this.datas.length > 0) {
          console.log("mounted: 再次确认更新分页数据");
          this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
        }
        // }, 100);
      });
    });
  },
  watch: {
    selectedCategory() {
      this.$nextTick(() => this.updateUnderline());
    },
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
    underlineStyle() {
      return {
        left: this.underline.left + "px",
        width: this.underline.width + "px",
      };
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
  margin: 20px;
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
  width: auto; /* 改为自动宽度，而不是固定的125px */
  height: auto; /* 允许高度自适应内容 */
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 32px;
  color: #870066;
  line-height: 45px;
  text-align: left;
  font-style: normal;
  margin-bottom: 10px;
  white-space: nowrap; /* 防止文本换行 */
}

.divider {
  height: 2px;
  background-color: #870066;
  width: 180px; /* 增加分隔线宽度，与标题文本宽度匹配 */
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

/* 新增的模型分类Tab样式 */
.category-tab-bar {
  width: 95%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  position: relative;
}
.category-tabs {
  display: flex;
  position: relative;
  border-bottom: 2px solid #e5e7eb;
  height: 44px;
  align-items: flex-end;
}
.category-tab {
  display: inline-block;
  font-size: 16px;
  color: #666a75;
  font-weight: 500;
  padding: 0 32px 10px 32px;
  cursor: pointer;
  position: relative;
  background: none;
  border: none;
  outline: none;
  transition: color 0.2s;
  user-select: none;
}
.category-tab.active {
  color: #870066;
  font-weight: 600;
}
.category-tab-underline {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #e5e7eb;
  z-index: 1;
}
.category-tab-underline-active {
  position: absolute;
  top: 0;
  height: 2px;
  background: #870066;
  border-radius: 1px;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
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
    white-space: nowrap; /* 确保在移动设备上也不换行 */
  }

  .divider {
    margin: 0 auto 10px;
    width: 180px; /* 保持与桌面版一致 */
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

  /* 新增的模型分类筛选器响应式样式 */
  .category-selector-wrapper {
    width: 95%;
    padding: 0;
  }

  .category-select {
    width: 100%;
  }
  .category-tab-bar {
    width: 95%;
    padding: 0;
  }
  .category-tabs {
    height: 40px;
  }
  .category-tab {
    font-size: 14px;
    padding: 0 16px 8px 16px;
  }
}
</style>
