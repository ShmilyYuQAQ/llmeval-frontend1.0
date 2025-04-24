<template>
    <div class="empty-result">
        <el-empty
            description="这里空空如也，快来分享你的看法吧！"
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