<template>
    <div class="model-card">
        <div class="img_container">
            <img
                :src="model.model_image_path || defaultUrl"
                alt="Model Image"
                class="img"
            />
            <!-- <el-button type="success" circle /> -->
        </div>
        <div
            style="
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                width: 90%;
                max-width: 90%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            "
        >
            <p class="model-name">{{ model.name }}</p>
            <span class="model-title"
                >By {{ model.institution }} {{ openSourece_title }}</span
            >
            <span class="model-description">{{ model.description }}</span>
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
            "
        >
            <span class="model-date">{{ model.updateTime }}更新</span>
            <a class="a_details" @click="goToDetail(model.name)">详细信息</a>
        </div>
    </div>
</template>
<script>
// import Star from "@element-plus/icons-vue";
export default {
    data() {
        return {
            defaultUrl: "./images/tengxun.png",
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
        goToDetail(modelName) {
            this.$router.push({ name: "ModelDetail", params: { modelName } });
        },
    },
    // props: ['name','author','imgUrl','description','date','detailsUrl']
};
</script>
<style scoped>
.model-card {
    width: 280px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    background-color: white;
    z-index: 1;
}
.img_container:hover {
    border: solid 1px rgb(64, 158, 255);
}
.img_container {
    height: 160px; /* 固定高度 */
    width: 100%; /* 宽度自适应 */
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    overflow: hidden; /* 防止图片超出容器 */
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
    font-size: 18px;
    font-weight: 600;
    color: #1f2129;
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
