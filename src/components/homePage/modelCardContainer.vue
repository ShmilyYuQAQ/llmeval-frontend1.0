<template>
  <div class="outer">
    <div class="model-card-container">
      <div
        v-for="(item, modelId) in paginatedModel"
        :key="modelId"
        class="container-c"
      >
        <ModelCard
          :model="item"
          :highlightKeyword="activeSearchQuery"
          @favorite-change="handleFavoriteChange"
        ></ModelCard>
      </div>
    </div>
    <div class="pagination-container">
      <el-pagination
        v-if="shouldShowPagination"
        background
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="totalModels"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        class="custom-pagination"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ModelCard from "./modelCard.vue";
export default {
  components: {
    ModelCard,
  },
  data() {
    return {
      totalModels: 0,
      pagination: {
        currentPage: 1,
        pageSize: 12,
      },
      paginatedModel: [],
      model: {
        //测试数据
        name: "腾讯混元大模型",
        institution: "腾讯云",
        imgUrl: "./images/tengxun.png",
        description:
          "由腾讯研发的大语言模型，具备强大的中文创作能力，复杂语境下的逻辑推理能力，以及可靠的任务执行能力。",
        updateTime: "2024.09.25",
        detailsUrl: "https://cloud.tencent.com/act/pro/Hunyuan-promotion",
      },
      data: null,
      loading: false,
      error: null,
      models: [],
      screenWidth: window.innerWidth,
      isDevelopment: process.env.NODE_ENV === "development",
    };
  },
  props: {
  datas: {
    type: Array, // 必须是数组类型
    required: true, // 父组件必须传递
    default: () => [] // 兜底默认值（防止父组件没传时 this.datas 是 undefined）
  },
  activeSearchQuery: {
    type: String, // 必须是字符串类型
    required: false, // 父组件可选传递
    default: "" // 兜底默认值（没搜索时是空字符串）
  }
},
  methods: {
    updatePaginatedModel(newModels) {
      console.log(this.activeSearchQuery);
      if (newModels) {
        this.models = newModels;
        // console.log("子组件接收的全量排序数据:", this.models, "条"); // 验证：与父组件排序后的数据量一致

      }
      if (!this.models.length) {
        this.paginatedModel = [];
        // console.log("updatePaginatedModel: models为空，清空渲染数据");

        return;
      }

      const startIndex =
        (this.pagination.currentPage - 1) * this.pagination.pageSize;
      const endIndex = startIndex + this.pagination.pageSize;

      if (startIndex >= this.models.length) {
        this.pagination.currentPage = 1; // 重置到第一页
        this.updatePaginatedModel(); // 递归调用以更新
        return;
      }

      this.paginatedModel = this.models.slice(startIndex, endIndex);
    //   console.log(`子组件分页：第${this.pagination.currentPage}页，数据量${this.paginatedModel.length}条`);

    },

    handleCurrentChange(newPage) {
      this.pagination.currentPage = newPage;
      this.updatePaginatedModel();

      // 如果不处于恢复状态，则更新URL
      this.$parent?.updateUrlParams?.();

      // 切换页面后滚动到顶部
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    handleSizeChange(newSize) {
      this.pagination.pageSize = newSize;
      // 如果更改每页显示数量后，当前页码已超出范围，则重置为第一页
      const maxPage = Math.ceil(this.models.length / newSize);
      if (this.pagination.currentPage > maxPage) {
        this.pagination.currentPage = 1;
      }
      this.updatePaginatedModel();
    },

    // 处理模型收藏状态改变

    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    getAuthHeaders() {
      const token = localStorage.getItem("token");
      return token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {};
    },
    findFavorite() {
      axios
        .get("http://49.233.82.133:9091/user/favorites", {
          headers: this.getAuthHeaders(),
        })
        .then((response) => {
          const favoriteIds = response.data.data;
          this.models.forEach((model) => {
            // 给模型添加收藏状态（修改models）
            model.isFavorited = favoriteIds.includes(model.modelId);
          });
          // 关键：修改models后，重新生成paginatedModel
          this.updatePaginatedModel();
        })
        .catch((error) => {
          console.error("获取收藏列表失败:", error);
          // 即使请求失败，也确保paginatedModel正常生成
          this.updatePaginatedModel();
        });
    },
  },
  created() {
    // this.models = this.datas || [];
    // console.log(this.models, "得到的models");
    this.findFavorite();
    // this.updatePaginatedModel();
    window.addEventListener("resize", this.updateScreenWidth);
  },
  unmounted() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  computed: {
    totalModels() {
      return this.models.length;
    },
    shouldShowPagination() {
      return this.models.length > this.pagination.pageSize;
    },
  },
  watch: {
    datas: {
      handler(newData) {
        if (newData?.length) {
          this.models = newData;
          const maxPage = Math.ceil(newData.length / this.pagination.pageSize);
          if (this.pagination.currentPage > maxPage) {
            this.$message.error(`当前页码超出范围，已自动跳转到第一页`);
            this.pagination.currentPage = 1;
          }
        //   this.updatePaginatedModel();
          this.findFavorite(); 
        } else {
          this.models = [];
          this.paginatedModel = [];
        }
      },
      immediate: true,
    },
    "pagination.currentPage": function () {
      this.updatePaginatedModel(this.datas);
    },
  },
};
</script>

<style scoped>
.outer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 95%;
  max-width: 1600px;
  margin: 0 auto;
}

.model-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  width: 100%;
  margin-top: 20px;
  justify-content: center; /* 网格整体居中 */
}

.container-c {
  width: 100%;
  min-height: 242px; /* 使用最小高度而不是固定高度 */
  height: auto; /* 允许自动调整高度 */
}

.custom-pagination {
  /* 自定义分页组件类 */
  font-size: 13px;
}

/* 分页容器样式 */
.pagination-container {
  width: 100%;
  display: flex;
  justify-content: flex-end; /* 改为右对齐 */
  margin-top: 25px;
  margin-bottom: 15px;
  padding-right: 20px; /* 右侧添加一些内边距 */
  box-sizing: border-box;
}

/* 自定义分页样式 */
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #870066 !important;
  color: #ffffff !important;
  transition: all 0.3s ease;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
  color: #870066 !important;
  transition: color 0.3s ease;
}

:deep(.el-pagination .btn-next:hover, .el-pagination .btn-prev:hover) {
  color: #870066 !important;
  transition: color 0.3s ease;
}

:deep(.el-pagination .el-pager li:not(.disabled).active) {
  color: #ffffff !important;
  background-color: #870066 !important;
  transition: all 0.3s ease;
}

:deep(.el-pagination button:hover) {
  color: #870066 !important;
}

:deep(
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li
  ) {
  background-color: #f4f4f5;
  transition: all 0.3s ease;
}

:deep(
    .el-pagination.is-background .btn-next:hover:not(:disabled),
    .el-pagination.is-background .btn-prev:hover:not(:disabled)
  ) {
  color: #870066 !important;
}

:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #870066 !important;
}

:deep(.el-pagination) {
  font-weight: normal;
  padding: 0;
}
</style>
