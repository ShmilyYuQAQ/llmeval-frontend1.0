<template>
    <div class="empty-result">
        <el-empty
            description="当前模型的能力标签尚未测评完成，请耐心等待。"
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