<template>
    <div class="news-card">
        <div class="news-card-title">{{ news.title }}</div>
        <div class="news-card-content">{{ news.content }}</div>
        <div class="news-card-bottom">
            <a href="" class="news-card-link">查看更多</a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        news: {
            type: Object,
            default: {
                title: "",
                content: "",
                link: "",
            },
        },
    },
};
</script>

<style scoped>
.news-card {
    display: flex;
    flex-direction: column;
    background-color: rgb(78, 112, 248);
    width: 90%;
    height: 150px;
    border: solid 1px #e6e6e6;
    border-radius: 10px;
    position: relative;
    align-items: center;
    padding: 10px;
    margin: 10px;
}
.news-card-title {
    width: 100%;
    height: 22px;
    margin: 5px;
    white-space: nowrap; /* 保持标题在一行显示 */
    overflow: hidden; /* 隐藏溢出的内容 */
    text-overflow: ellipsis; /* 超出部分显示省略号 */
    font-size: 16px;
    color: white;
    
}
.news-card-content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* 这里设置为3行，根据需要调整 */
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
    font-size:12px;
    font-weight: 300;
}
.news-card-bottom{
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
}
.news-card-link{
    background-color: rgb(255,181,81);
    color: black;
    border:#e6e6e6;
    border-radius: 5px;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size:14px;
    margin-bottom: 5px;
    }
.news-card-link:hover{
    background-color: rgb(255, 145, 0);
}
</style>
