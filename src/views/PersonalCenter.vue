<template>
    <NavBar />
    <div class="personal-center">
        <div class="header">
            <div class="user-info">
                <el-avatar
                    class="user-avatar"
                    :src="userAvatar"
                    @click="handleAvatarClick"
                />
                <div class="user-details">
                    <div class="user-name">{{ userName }}</div>
                    <div class="user-actions">
                        <el-button type="text" @click="changeNameClick" class="action-btn">
                            <el-icon><Edit /></el-icon> 修改昵称
                        </el-button>
                        <el-button type="text" @click="changePasswordClick" class="action-btn">
                            <el-icon><Lock /></el-icon> 修改密码
                        </el-button>
                    </div>
                </div>
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
    <el-dialog v-model="nameDialogVisible" title="修改昵称" width="400px">
        <el-form :model="nameForm" :rules="nameRules" ref="nameFormRef">
            <el-form-item prop="newName">
                <el-input v-model="nameForm.newName" placeholder="请输入新昵称" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="nameDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitNameChange">确认</el-button>
        </template>
    </el-dialog>
    <el-dialog v-model="passwordDialogVisible" title="修改密码" width="400px">
        <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef">
            <el-form-item prop="oldPassword">
                <el-input
                    v-model="passwordForm.oldPassword"
                    type="password"
                    placeholder="请输入原密码"
                />
            </el-form-item>
            <el-form-item prop="newPassword">
                <el-input
                    v-model="passwordForm.newPassword"
                    type="password"
                    placeholder="请输入新密码"
                />
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    placeholder="请确认新密码"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="passwordDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitPasswordChange">确认</el-button>
        </template>
    </el-dialog>
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
            userName: '大模型爱好者小明',
            userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            nameDialogVisible: false,
            passwordDialogVisible: false,
            nameForm: {
                newName: ''
            },
            passwordForm: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            nameRules: {
                newName: [
                    { required: true, message: '请输入新昵称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ]
            },
            passwordRules: {
                oldPassword: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请确认新密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.passwordForm.newPassword) {
                                callback(new Error('两次输入密码不一致'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    components: {
        NavBar,
        modelCardContainer,
    },
    methods: {
        changeNameClick() {
            this.nameDialogVisible = true
            this.nameForm.newName = this.userName
        },
        changePasswordClick() {
            this.passwordDialogVisible = true
        },
        async submitNameChange() {
            this.userName = this.nameForm.newName
            this.nameDialogVisible = false
        },
        async submitPasswordChange() {
            this.passwordDialogVisible = false
            this.passwordForm = {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
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
    margin: 20px auto;
    min-height: calc(100vh - 40px);
}
.header {
    background-color: #fff;
    height: 150px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
.user-info {
    display: flex;
    align-items: center;
}
.user-avatar {
    width: 80px;
    height: 80px;
    cursor: pointer;
    transition: transform 0.3s;
}
.user-avatar:hover {
    transform: scale(1.05);
}
.user-details {
    margin-left: 20px;
}
.user-name {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #303133;
}
.user-actions {
    display: flex;
    gap: 15px;
}
.action-btn {
    padding: 0;
    height: auto;
    font-size: 14px;
    color: #606266;
}
.action-btn:hover {
    color: #409EFF;
}
.main {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
.title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #EBEEF5;
}
</style>
