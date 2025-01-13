<template>
    <div class="ele-container">
        <span class="selector-row-label">{{ computedTitle }}</span>
        <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            style="margin-right: 30px"
        >
            全部
        </el-checkbox>
        <el-checkbox-group
            v-model="computedChecked"
            @change="handleCheckedChange"
        >
            <el-checkbox
                v-for="option in options"
                :key="option"
                :label="option"
                :value="option"
            >
                {{ option }}
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isIndeterminate: true,
            checkAll: false,
            computedTitle: "",
            computedChecked: [],
            computedOptions: [],
        };
    },
    props: ["title", "checked", "options"],

    methods: {
        handleCheckAllChange(val) {
            this.computedChecked = val ? this.computedOptions : [];
            this.isIndeterminate = false;
            this.$emit("change", [...this.computedChecked]);
        },
        handleCheckedChange(value) {
            const checkedCount = value.length;
            this.checkAll = checkedCount === this.options.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.options.length;
            this.$emit("change", [...value]);
        },
    },
    created() {
        this.computedTitle = this.title;
        this.computedChecked = this.checked;
        this.computedOptions = this.options;
        this.isIndeterminate =
            this.computedChecked.length > 0 &&
            this.computedChecked.length < this.options.length;
        this.checkAll = this.computedChecked.length === this.options.length;
    },
};
</script>
<style scoped>
.ele-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    /* padding-bottom: 10px; */
    align-items: center;
    justify-content: left;
    margin-left: 20px;
    margin-right: 20px;
    width: calc(100% - 40px);
}
.selector-row-label {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    margin-right: 20px;
    width: 110px;
    font-family: "PingFang SC", "Microsoft Yahei", "Helvetica Neue", Helvetica,
        Arial, "Hiragino Sans GB", -apple-system, sans-serif;
    color: #27254c;
    font-weight: 600;
}
</style>
