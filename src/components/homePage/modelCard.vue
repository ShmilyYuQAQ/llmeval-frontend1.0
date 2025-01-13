<template>
    <div class="model-card">
        <div class="card-header">
            <div class="img_container">
                <img
                    :src="model.model_image_path || defaultUrl"
                    alt="Model Image"
                    class="img"
                />
            </div>
            <div
                style="
                    max-width: 200px;
                    overflow: hidden;
                    line-height: 25px;
                "
            >
                <span class="model-name">{{ model.name }}</span>
            </div>
        </div>
        <div class="model-institution">By {{ model.institution }}</div>
        <div class="card-body" style="margin-right: auto;">
            <div class="content">
                {{ model.description }}
            </div>
        </div>
        <div
            style="
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                min-width: 90%;
                max-width: 90%;
                min-height: 90%;
                max-height: 90%;
                margin-top:10px;
            "
        >
            <span class="model-date">{{ model.updateTime }}更新</span>
            <span class="model-date">{{ model.favoritesCount }}收藏</span>
            <a class="a_details" @click="goToDetail(model.modelId)">详细信息</a>
        </div>
    </div>
</template>
<script>
// import Star from "@element-plus/icons-vue";
export default {
    data() {
        return {
            defaultUrl: "./images/212.png",
            openSourece_title: "开源",
        };
    },
    props: ["model"],
    computed: {
        openSourece_title() {
            return this.model.openSource ? "开源" : "闭源"; // 根据布尔值返回不同的字符串
        },
    },
    methods: {
        goToDetail(modelId) {
            this.$router.push({ name: "ModelDetail", params: { modelId } });
        },
    },
    // props: ['name','author','imgUrl','description','date','detailsUrl']
};
</script>
<style scoped>
.model-card {
    width: 280px;
    /* max-height:200px; */
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: flex-start;  */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    background-color: white;
    z-index: 1;
}
.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top:10px;
    margin-right: auto;
    /* border: solid 1px red; */
}
/* .img_container:hover {
    border: solid 1px rgb(64, 158, 255);
} */
.card-body {
    overflow: hidden;
    height: auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin-right: auto;
}
.content {
    height:20px;
    margin-top: 10px;
    /* line-height: 18px; */
    color: rgb(114, 114, 114);
    font-size: 14px;
}
.img_container {
    height: 50px; /* 固定高度 */
    width: auto; /* 宽度自适应 */
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    overflow: hidden; /* 防止图片超出容器 */
    border-radius: 8px;
    margin-right:10px;
}

.img {
    width: auto; /* 宽度自适应 */
    height: auto; /* 高度自适应 */
    max-width: 100%; /* 最大宽度不超过容器 */
    max-height: 100%; /* 最大高度不超过容器 */
    object-fit: contain; /* 保持宽高比 */
}
.model-name {
    font-family: PingFangSC;
    font-size: 14px;
    font-weight: 600;
    color: #1f2129;
    text-align: center;
}
.model-institution {
    /* margin-left: 10px; */
    line-height: 18px;
    height: 18px;
    border-radius: 4px;
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    color: #afaeae;
    margin-right: auto;
    margin-top:5px;
}
.model-title {
    font-size: 12px;
    color: #bdb8b8;
}
.model-description {
    font-size: 12px;
    color: #bdb8b8;
}
.model-date {
    font-size: 12px;
    color: purple;
    font-weight: 600;
}
.a_details {
    color: #409eff;
    text-decoration: none;
    cursor: pointer;
    font-size: 14px;
}
.a_details:hover {
    color: #95c6f7;
}
</style>
