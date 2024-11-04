<template>
    <div class="feature-sequencer">
        <el-radio-group v-model="radio">
            <el-radio :value="0">综合排序</el-radio>
            <el-radio :value="1">下载量排序</el-radio>
            <el-radio :value="2">收藏量排序</el-radio>
            <el-radio :value="3">按评分排序</el-radio>
        </el-radio-group>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio: 0,
        };
    },
};
</script>
<style scoped>
.feature-sequencer{
    width: 90%;
    background-color: white;
    padding: 10px;
    text-align: right;
}
</style>
