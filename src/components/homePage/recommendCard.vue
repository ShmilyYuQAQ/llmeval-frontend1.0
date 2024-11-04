<template>
    <div class="recommend-card">
        <div class="recommend-card-header">
            <a href="#" class="model-name">{{ model.name }}</a>
            <LikeButton
                :initialIsLiked="model.isLiked"
                :initialLikeCount="model.likes"
            />
        </div>
        <div class="recommend-card-bottom">
            <span class="recommend-card-bottom-left"
                >By {{ model.author }}</span
            >
            <span class="recommend-card-bottom-right"
                >Updated {{ model.updated }}</span
            >
        </div>
    </div>
</template>

<script>
import LikeButton from "./likeButton.vue";
export default {
    components: {
        LikeButton,
    },
    props: {
        model: {
            type: Object,
            default: {
                name: "whisper-large-v3-turbo",
                author: "OpenAI",
                likes: 100,
                updated: "2021-07-31",
                isLiked: false,
            },
        },
    }, //model格式大概是{name: 'whisper-large-v3-turbo', author: 'xxx', likes: 100, updated: '2021-07-31'}
};
</script>

<style scoped>
.recommend-card {
    background-color: white;
    width: 90%;
    height: 80px;
    border: solid 1px #e6e6e6;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    padding: 10px;
    margin: 10px;
}
.recommend-card-header {
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
}
.model-name {
    font-size: 16px;
    color: black;
    font-weight: 500;
}
.model-name:hover {
    background-color: rgba(0, 0, 0, 0);
}
.recommend-card-bottom {
    width: 100%;
    display: flex;
    /* position: absolute; */
    flex-direction: row;
    justify-content: space-between;
}
.recommend-card-bottom-left {
    font-size: 14px;
    color: #888888;
}
.recommend-card-bottom-right {
    font-size: 14px;
    color: #888888;
}
</style>
