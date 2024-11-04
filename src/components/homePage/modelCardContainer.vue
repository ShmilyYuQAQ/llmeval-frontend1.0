<template>
    <div class="model-card-container">
        <ModelCard
            v-for="(item, index) in paginatedModel"
            :key="index"
            :model="item"
        ></ModelCard>
    </div>
    <el-pagination
        background
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="totalModels"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
    >
    </el-pagination>
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
                pageSize: 10,
            },
            model: {
                name: "腾讯混元大模型",
                author: "腾讯云",
                imgUrl: "./images/tengxun.png",
                description:
                    "由腾讯研发的大语言模型，具备强大的中文创作能力，复杂语境下的逻辑推理能力，以及可靠的任务执行能力。",
                date: "2024.09.25",
                detailsUrl:
                    "https://cloud.tencent.com/act/pro/Hunyuan-promotion",
            },
            models: [],
        };
    },
    methods: {
        handleCurrentChange(newPage) {
            this.pagination.currentPage = newPage;
            this.updatePaginatedModel();
        },
        handleSizeChange(newSize) {
            this.pagination.pageSize = newSize;
            this.updatePaginatedModel();
        },
        updatePaginatedModel() {
            // 根据当前页和每页大小计算需要显示的模型列表
            const start = (this.pagination.currentPage - 1) * this.pagination.pageSize;
            const end = start + this.pagination.pageSize;
            this.paginatedModel = this.models.slice(start, end);
        },
    },
    created() {
        for (let i = 0; i < 99; i++) {
            this.models.push(this.model);
        } // 模拟，实际数据应该从后端获得
        this.totalModels = this.models.length;
        this.updatePaginatedModel();
    },
};
</script>

<style>
.model-card-container {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    align-items: center;
}
</style>
