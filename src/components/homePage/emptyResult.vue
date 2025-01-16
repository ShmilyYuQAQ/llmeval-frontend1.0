<template>
    <div class="empty-result">
        <el-empty
            description="暂无相关模型..."
            :image-size="200"
        >
        </el-empty>
    </div>
</template>

<script>
export default {
    name: 'EmptyResult'
}
</script>

<style scoped>
.empty-result {
    width: 100%;
    padding: 40px 0;
    background: white;
    border-radius: 8px;
}
</style> 