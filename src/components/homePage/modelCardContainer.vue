<template>
    <div class="outer">   
        <div class="model-card-container">
            <div
                v-for="(item, index) in paginatedModel"
                :key="index"
                class="container-c"
            >
                <ModelCard :model="item"></ModelCard>
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
                detailsUrl:
                    "https://cloud.tencent.com/act/pro/Hunyuan-promotion",
            },
            data: null,
            loading: false,
            error: null,
            models: [],
            screenWidth: window.innerWidth,
            isDevelopment: process.env.NODE_ENV === 'development',
        };
    },
    props: ["datas"],
    methods: {
        handleCurrentChange(newPage) {
            const maxPage = Math.max(Math.ceil(this.models.length / this.pagination.pageSize), 1);
            if (newPage > maxPage) {
                this.$message.error(`页码 ${newPage} 超出范围，最大页码为 ${maxPage}`);
                this.pagination.currentPage = 1;
            } else {
                this.pagination.currentPage = newPage;
            }
            this.updatePaginatedModel();
            if (this.$parent && this.$parent.updateUrlParams) {
                this.$parent.updateUrlParams();
            }
        },
        handleSizeChange(newSize) {
            this.pagination.pageSize = newSize;
            this.updatePaginatedModel();
        },
        updatePaginatedModel(datas = null) {
            if (datas !== null) {
                this.models = datas || [];
                // 当提供新数据时始终重置为第一页
                this.pagination.currentPage = 1;
            }
            
            if (!this.models || this.models.length === 0) {
                this.paginatedModel = [];
                return;
            }
            
            const maxPage = Math.max(Math.ceil(this.models.length / this.pagination.pageSize), 1);
            if (this.pagination.currentPage > maxPage) {
                console.warn(`页码 ${this.pagination.currentPage} 超出范围，最大页码为 ${maxPage}，已自动调整`);
                this.pagination.currentPage = 1;
            }
            
            const start = (this.pagination.currentPage - 1) * this.pagination.pageSize;
            const end = start + this.pagination.pageSize;
            this.paginatedModel = this.models.slice(start, end);
            console.log(`当前页: ${this.pagination.currentPage}, 每页数量: ${this.pagination.pageSize}, 显示数据: ${this.paginatedModel.length}/${this.models.length}`);
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth
        },
    },
    created() {
        this.models = this.datas || [];
        this.updatePaginatedModel();
        window.addEventListener('resize', this.updateScreenWidth);
    },
    unmounted() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },
    computed: {
        totalModels() {
            return this.models.length;
        },
        shouldShowPagination() {
            return this.models.length > this.pagination.pageSize;
        }
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
                    this.updatePaginatedModel();
                } else {
                    this.models = [];
                    this.paginatedModel = [];
                }
            },
            immediate: true
        }
    }
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

:deep(.el-pagination.is-background .btn-next, 
      .el-pagination.is-background .btn-prev, 
      .el-pagination.is-background .el-pager li) {
    background-color: #f4f4f5;
    transition: all 0.3s ease;
}

:deep(.el-pagination.is-background .btn-next:hover:not(:disabled), 
      .el-pagination.is-background .btn-prev:hover:not(:disabled)) {
    color: #870066 !important;
}

:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
    background-color: #870066 !important;
}

:deep(.el-pagination) {
    font-weight: normal;
    padding: 0;
}

/* 响应式调整 */
@media (max-width: 479px) {
    .model-card-container {
        grid-template-columns: 1fr; /* 单列 */
        gap: 20px;
    }
    
    .container-c {
        width: 100%;
        min-height: 242px; /* 保持最小高度 */
        justify-self: center; /* 单元格内居中 */
    }
    
    .pagination-container {
        justify-content: center; /* 小屏幕上居中显示 */
        padding: 0;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    
    :deep(.el-pagination) {
        padding: 0;
        margin: 0;
    }
    
    :deep(.el-pagination .el-pager li) {
        min-width: 30px;
    }
}

/* 平板设备的响应式处理 */
@media (min-width: 480px) and (max-width: 939px) {
    .model-card-container {
        grid-template-columns: minmax(320px, 1fr); /* 单列但限制最大宽度 */
        gap: 25px;
    }
    
    .container-c {
        width: 100%;
        justify-self: center;
    }
    
    .pagination-container {
        justify-content: flex-end; /* 平板依然右对齐 */
        padding-right: 10px;
    }
}

/* 中等屏幕设备 - 显示2列 */
@media (min-width: 940px) and (max-width: 1279px) {
    .model-card-container {
        grid-template-columns: repeat(2, minmax(320px, 1fr));
        gap: 30px;
    }
}

/* 大屏幕设备 - 显示3列 */
@media (min-width: 1280px) and (max-width: 1679px) {
    .model-card-container {
        grid-template-columns: repeat(3, minmax(320px, 1fr));
        gap: 35px;
    }
}

/* 超大屏幕设备 - 显示3列，留出更多空间 */
@media (min-width: 1680px) {
    .model-card-container {
        grid-template-columns: repeat(3, minmax(320px, 1fr));
        gap: 40px;
        width: 90%; /* 收窄一点宽度，提供更多留白 */
        max-width: 1400px;
    }
    
    .pagination-container {
        width: 90%;
        max-width: 1400px;
    }
}
</style>
