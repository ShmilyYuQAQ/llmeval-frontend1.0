<template>
    <div class="model-card">
        <a :href="model.detailsUrl" target="_blank" class="a_container">
            <div class="img_container">
                <img :src="defaultUrl" alt="Model Image" class="img" />
                <!-- <el-button type="success" circle /> -->
            </div>
        </a>
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
            <a class="a_details" @click="goToDetail(model.modelId)">详细信息</a>
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
        goToDetail(modelId) {
            this.$router.push({ name: "ModelDetail", params: { modelId } });
        },
    },
    // props: ['name','author','imgUrl','description','date','detailsUrl']
};
</script>
<style scoped>
.model-card {
    width: 300px;
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
.a_container {
    width: 100%;
    height: 160px;
    border-radius: 5%; /* 使容器变成圆形 */
    overflow: hidden; /* 隐藏溢出的内容 */
    position: relative; /* 定位伪元素 */
    display: inline-block;
}
.a_container:hover {
    border: solid 1px rgb(64, 158, 255);
}
.img_container {
    width: 100%;
    height: 100%;
    border-radius: 5%; /* 使容器变成圆形 */
    overflow: hidden; /* 隐藏溢出的内容 */
    position: relative; /* 定位伪元素 */
}
.img {
    width: 0px;
    height: 0px;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
    position: absolute; /* 绝对定位 */
    top: 50%; /* 垂直居中 */
    left: 50%; /* 水平居中 */
    transform: translate(-50%, -50%); /* 使用transform进行居中 */
    transition: transform 0.5s ease;
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
    font-size:14px;
}
.a_details:hover {
    color:#95c6f7
}
</style>
