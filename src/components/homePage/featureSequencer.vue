<template>
    <div class="feature-sequencer">
        <el-radio-group v-model="radio">
            <el-radio :label="0">综合排序</el-radio>
            <el-radio :label="1">发布时间排序</el-radio>
            <el-radio :label="2">收藏量排序</el-radio>
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
    methods: {
        handleChange(value) {
            this.$emit('change', Number(value));
        },
        getRadio(){
            return this.radio;
        },
        setRadio(value) {
            this.radio = value;
        }
    },
    watch: {
        radio: {
            handler(newValue) {
                this.handleChange(newValue);
            },
            immediate: false
        }
    }
};
</script>
<style scoped>
.feature-sequencer{
    width: calc(90% - 20px);
    background-color: white;
    padding: 10px;
    text-align: right;
}
</style>
