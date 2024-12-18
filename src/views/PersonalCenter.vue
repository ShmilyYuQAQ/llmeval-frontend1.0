<template>
    <NavBar />
    <div class="personal-center">
        <div class="header">
            <div class="user-info">
                <el-avatar
                    class="user-avatar"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
                <div class="user-name">一个测试名字</div>
                <button class="change-btn" @click="changeNameClick">
                    改名
                </button>
                <el-dialog v-model="dialogVisible" width="800">
                    <div>
                        <h1 style="text-align: center">修改昵称</h1>
                    </div>
                </el-dialog>
            </div>
        </div>
        <div class="main">
            <div class="favorite-model">
                <div class="title">已收藏模型</div>
                <modelCardContainer
                    :datas="datas"
                    ref="modelCardContainer"
                ></modelCardContainer>
            </div>
        </div>
    </div>
</template>

<script>
import modelCardContainer from "@/components/homePage/modelCardContainer.vue";
import axiosInstance from "@/plugins/axios";
import NavBar from "../components/guidePage/NavBar.vue";
export default {
    data() {
        return {
            dialogVisible: false,
            datas: [],
        };
    },
    components: {
        NavBar,
        modelCardContainer,
    },
    methods: {
        changeNameClick() {
            this.dialogVisible = true;
        },
        async fetchData() {
            try {
                const data_response = await axiosInstance.get("/model/");
                const response = await axiosInstance.get(
                    "/user/favorites?userId=1"
                );
                this.datas = data_response.data.data; //所有模型数据
                this.favorites = response.data.data; //用户收藏数据
                let temp = [];
                console.log(this.datas);
                console.log(this.favorites);
                for (let i = 0; i < this.favorites.length; i++) {
                    try {
                        temp.push(this.datas[this.favorites[i] - 1]);
                    } catch {}
                }
                console.log(temp);
                this.datas = temp;
                for (let i = 0; i < this.datas.length; i++) {
                    try {
                        this.datas[i].model_image_path =
                            "http://49.233.82.133:5174" +
                            this.getSubstringAfterKeyword(
                                this.datas[i].model_image_path,
                                "public"
                            );
                    } catch (error) {
                        // console.log(i)
                    }
                }
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
                console.log("你干嘛", this.datas);
            } catch (error) {
                this.datas = [];
                this.error = "Failed to fetch data";
            }
        },
        getSubstringAfterKeyword(inputString, keyword) {
            // 找到关键字在字符串中的位置
            const index = inputString.indexOf(keyword);

            // 如果找到了关键字
            if (index !== -1) {
                // 截取关键字之后的内容
                return inputString.substring(index + keyword.length);
            } else {
                // 如果没有找到关键字，返回空字符串或者根据需要进行其他处理
                return "";
            }
        },
    },
    created() {
        this.fetchData();
    },
};
</script>

<style scoped>
.personal-center {
    width: 80%;
    /* border: solid 1px red; */
    margin-left: 10%;
    margin-right: 10%;
    
}
.header {
    background-color: #fff;
    height: 150px;
    position: relative;
    display: flex;
    align-items: center;
}
.user-avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}
.user-info {
    /* position: absolute; */
    left: 0; /* 相对于父元素的左侧 */
    display: flex;
    flex-direction: row;
    align-items: center;
    top: calc(100% - 60px);
    margin-left:10px;
}
.user-name {
    font-weight: 700;
    line-height: 18px;
    font-size: 18px;
}
.change-btn {
    outline: none;
    border: none;
    background: transparent;
    font-size: 13px;
    cursor: pointer;
    margin-left: 10px;
    color: #9499a0;
}
.change-btn:hover {
    color: rgb(64, 158, 255);
}
.main{
    background-color: #fff;
    margin-top:20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top:#9499a0 1px solid;
}
.title{
    margin-top:10px;
    margin-left:10px;
    color:black;
    font-size:22px;
    font-weight:500;
}
</style>
