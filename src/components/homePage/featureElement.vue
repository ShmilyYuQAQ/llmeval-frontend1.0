<template>
    <div class="ele-container">
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
    align-items: center;
    justify-content: flex-end;
    flex: 1;
}


</style>

<!-- 添加全局样式来覆盖Element UI的默认颜色 -->
<style>
/* 覆盖 Element UI 默认的复选框颜色 */
.ele-container .el-checkbox__input.is-checked .el-checkbox__inner,
.ele-container .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #870066;
    border-color: #870066;
}

.ele-container .el-checkbox__input.is-checked + .el-checkbox__label,
.ele-container .el-checkbox__input.is-indeterminate + .el-checkbox__label {
    color: #870066;
}

.ele-container .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #870066;
}

.ele-container .el-checkbox__inner:hover {
    border-color: #870066;
}

.ele-container .el-checkbox__label {
    font-size: 14px;
}


</style>
