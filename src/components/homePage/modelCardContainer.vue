<template>
    <div
        style="
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            width: 90%;
        "
        class="outer"
    >   
        <div class="model-card-container">
            <div
                v-for="(item, index) in paginatedModel"
                :key="index"
                class="container-c"
            >
                <ModelCard :model="item"></ModelCard>
            </div>
        </div>
        <EmptyResult v-if="datas.length === 0" />
        <el-pagination
            v-if="shouldShowPagination"
            background
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            :total="totalModels"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            style="margin-top: 20px"
        >
        </el-pagination>
    </div>
</template>

<script>
import EmptyResult from './emptyResult.vue';
import ModelCard from "./modelCard.vue";
export default {
    components: {
        ModelCard,
        EmptyResult
    },
    data() {
        return {
            totalModels: 0,
            pagination: {
                currentPage: 1,
                pageSize: 12,
            },
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
            const maxPage = Math.ceil(this.models.length / this.pagination.pageSize);
            if (newPage > maxPage) {
                this.$message.error(`页码 ${newPage} 超出范围，最大页码为 ${maxPage}`);
                this.pagination.currentPage = 1;
            } else {
                this.pagination.currentPage = newPage;
            }
            this.updatePaginatedModel();
            this.$parent.updateUrlParams();
        },
        handleSizeChange(newSize) {
            this.pagination.pageSize = newSize;
            this.updatePaginatedModel();
        },
        updatePaginatedModel(datas = null) {
            if (datas !== null) {
                this.models = datas;
            }
            
            const maxPage = Math.ceil(this.models.length / this.pagination.pageSize);
            if (this.pagination.currentPage > maxPage && maxPage > 0) {
                this.$message.error(`页码 ${this.pagination.currentPage} 超出范围，最大页码为 ${maxPage}`);
                this.pagination.currentPage = 1;
            }
            
            const start = (this.pagination.currentPage - 1) * this.pagination.pageSize;
            const end = start + this.pagination.pageSize;
            this.paginatedModel = this.models.slice(start, end);
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth
        },
    },
    created() {
        this.models = this.datas;
    },
    computed: {
        models() {
            return this.datas;
        },
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
                    const maxPage = Math.ceil(newData.length / this.pagination.pageSize);
                    if (this.pagination.currentPage > maxPage) {
                        this.$message.error(`当前页码超出范围，已自动跳转到第一页`);
                        this.pagination.currentPage = 1;
                    }
                }
            },
            immediate: true
        }
    }
};
</script>

<style>
.model-card-container {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin-top:20px;
}

.model-card-wrapper {
    width: fit-content;
    margin: 0 auto;
}
.container-c {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: calc(100%);
    margin-bottom: 15px;
    margin-left: 10px;
    margin-right: 10px;
}
@media (min-width: 914px) {
    .container-c {
        width: calc(50% - 20px);
    }
}
@media (min-width: 1266px) {
    .container-c {
        width: calc(33.333% - 20px);
    }
}
@media (min-width: 1611px) {
    .container-c {
        width: calc(25% - 20px);
    }
}
</style>
