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
            <div class="model-name-container">
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
            <span class="model-date">{{ model.releaseDate }}&nbsp;发布</span>
            <a class="a_details" @click="goToDetail(model.name)">详细信息</a>
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
        goToDetail(name) {
            this.$router.push({ name: "ModelDetail", params: { name } });
        },
    },
    // props: ['name','author','imgUrl','description','date','detailsUrl']
};
</script>
<style scoped>
.model-card {
    width: 280px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    background-color: white;
    overflow: hidden;
}
.card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-right: auto;
    width: 100%;
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
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 8px;
    margin-right: 10px;
    min-width: fit-content;
}

.img {
    min-width: 30px;
    min-height: 30px;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
.model-name {
    font-family: PingFangSC;
    font-size: 14px;
    font-weight: 600;
    color: #1f2129;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: none;
    display: block;
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
.model-name-container {
    flex: 1;
    overflow: hidden;
    padding-right: 10px;
}
</style>
