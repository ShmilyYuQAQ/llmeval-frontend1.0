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
            isInitialized: false
        };
    },
    methods: {
        handleChange(value) {
            // 仅当初始化完成后才触发变更事件
            if (this.isInitialized) {
                this.$emit('change', Number(value));
            }
        },
        getRadio(){
            return this.radio;
        },
        setRadio(value) {
            const oldValue = this.radio;
            this.radio = value;
            // 手动触发变更事件，确保即使值没有变化也触发排序
            if (oldValue === value && this.isInitialized) {
                this.handleChange(value);
            }
        }
    },
    mounted() {
        // 在下一个事件循环中将组件标记为已初始化
        this.$nextTick(() => {
            this.isInitialized = true;
        });
    },
    watch: {
        radio: {
            handler(newValue) {
                this.handleChange(newValue);
            },
            immediate: false // 改回 false，避免在组件挂载前触发
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
    font-size: 13px; /* 调小字体大小 */
}

:deep(.el-radio) {
    margin-right: 15px;
    font-size: 13px;
}

:deep(.el-radio__label) {
    font-size: 13px;
    padding-left: 6px;
}

/* 修改单选按钮选中颜色 */
:deep(.el-radio__input.is-checked .el-radio__inner) {
    background-color: #870066;
    border-color: #870066;
}

:deep(.el-radio__input.is-checked + .el-radio__label) {
    color: #870066;
}

:deep(.el-radio__inner:hover) {
    border-color: #870066;
}

:deep(.el-radio.is-focus .el-radio__inner) {
    border-color: #870066;
}

/* 添加响应式样式 */
@media (max-width: 768px) {
    .feature-sequencer {
        width: 100%;
        text-align: left;
        padding: 10px 0;
    }
    
    :deep(.el-radio-group) {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }
    
    :deep(.el-radio) {
        margin-right: 10px;
        margin-bottom: 5px;
        font-size: 12px;
    }
    
    :deep(.el-radio__label) {
        font-size: 12px;
        padding-left: 4px;
    }
}
</style>
