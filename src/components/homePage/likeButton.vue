<template>
    <div class="like-button" @click="toggleLike">
        <el-icon class="like-icon" v-if="isLiked"><StarFilled /></el-icon>
        <el-icon class="like-icon" v-else><Star /></el-icon>
        <span style="user-select: none;">{{ likeCount }}</span>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    props: {
        // 从父组件接收初始的点赞状态和点赞数
        initialIsLiked: {
            type: Boolean,
            default: false,
        },
        initialLikeCount: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        // 定义响应式数据
        const isLiked = ref(props.initialIsLiked);
        const likeCount = ref(props.initialLikeCount);

        // 定义方法
        const toggleLike = () => {
            // 切换点赞状态
            isLiked.value = !isLiked.value;

            // 更新点赞数
            if (isLiked.value) {
                likeCount.value++;
            } else {
                likeCount.value--;
            }

            // 这里可以添加发送请求到后端的代码，更新数据库中的点赞状态和数量
            // 例如：updateLikeStatus(isLiked.value);
        };

        return {
            isLiked,
            likeCount,
            toggleLike,
        };
    },
};
</script>

<style>
.like-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    user-select: none;
}

.like-button span {
    margin-left: 8px;
}
.like-icon{
    margin-right: 1px;
}
</style>
