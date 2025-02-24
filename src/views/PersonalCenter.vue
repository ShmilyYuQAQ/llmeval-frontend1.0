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
                        <el-button
                            type="text"
                            @click="changeNameClick"
                            class="action-btn"
                        >
                            <el-icon><Edit /></el-icon> 修改昵称
                        </el-button>
                        <el-button
                            type="text"
                            @click="changePasswordClick"
                            class="action-btn"
                        >
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
            <div class="comment">
                <div class="title">已评价模型</div>
                <div
                    class="comment-list"
                    v-loading="loading"
                    element-loading-text="加载中..."
                >
                    <div
                        v-for="(comment, index) in paginatedComments"
                        :key="index"
                        class="comment-item"
                    >
                        <div class="model-link">
                            <a :href="comment.modelUrl">{{
                                comment.modelName
                            }}</a>
                        </div>
                        <div class="comment-content">{{ comment.content }}</div>
                        <div class="comment-footer">
                            <span class="comment-time"
                                >发表于{{ comment.createTime }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="pagination-container" v-if="totalComments > 0">
                    <el-pagination
                        v-model:current-page="currentPage"
                        :page-size="pageSize"
                        :total="totalComments"
                        @current-change="handlePageChange"
                        layout="prev, pager, next"
                        background
                    />
                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="nameDialogVisible" title="修改昵称" width="400px">
        <el-form :model="nameForm" :rules="nameRules" ref="nameFormRef">
            <el-form-item prop="newName">
                <el-input
                    v-model="nameForm.newName"
                    placeholder="请输入新昵称"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="nameDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitNameChange">确认</el-button>
        </template>
    </el-dialog>
    <el-dialog v-model="passwordDialogVisible" title="修改密码" width="400px">
        <el-form
            :model="passwordForm"
            :rules="passwordRules"
            ref="passwordFormRef"
        >
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
            <el-button type="primary" @click="submitPasswordChange"
                >确认</el-button
            >
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
            userName: localStorage.getItem("userName") || "未知用户",
            userAvatar:
                "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            nameDialogVisible: false,
            passwordDialogVisible: false,
            nameForm: {
                newName: "",
            },
            passwordForm: {
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
            nameRules: {
                newName: [
                    {
                        required: true,
                        message: "请输入新昵称",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 20,
                        message: "长度在 2 到 20 个字符",
                        trigger: "blur",
                    },
                ],
            },
            passwordRules: {
                oldPassword: [
                    {
                        required: true,
                        message: "请输入原密码",
                        trigger: "blur",
                    },
                ],
                newPassword: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur",
                    },
                    { min: 6, message: "密码长度不能小于6位", trigger: "blur" },
                ],
                confirmPassword: [
                    {
                        required: true,
                        message: "请确认新密码",
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.passwordForm.newPassword) {
                                callback(new Error("两次输入密码不一致"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
            },
            comments: [],
            loading: false,
            currentPage: 1,
            pageSize: 10,
        };
    },
    computed: {
        totalComments() {
            return this.comments.length;
        },
        paginatedComments() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.comments.slice(start, end);
        },
    },
    components: {
        NavBar,
        modelCardContainer,
    },
    methods: {
        changeNameClick() {
            this.nameDialogVisible = true;
            this.nameForm.newName = this.userName;
        },
        changePasswordClick() {
            this.passwordDialogVisible = true;
        },
        async submitNameChange() {
            try {
                await this.$refs.nameFormRef.validate();
                const token = localStorage.getItem("token");
                if (!token) {
                    this.$message.error("请先登录");
                    return;
                }

                const response = await axiosInstance.put(
                    `/user/updateUsername?newUsername=${encodeURIComponent(
                        this.nameForm.newName
                    )}`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.success) {
                    this.userName = this.nameForm.newName;
                    localStorage.setItem("userName", this.nameForm.newName);
                    this.nameDialogVisible = false;
                    this.$message.success("昵称修改成功");
                } else {
                    throw new Error(response.data.message || "昵称修改失败");
                }
            } catch (error) {
                console.error("Change name failed:", error);
                this.$message.error(error.message || "昵称修改失败");
            }
        },
        async submitPasswordChange() {
            try {
                await this.$refs.passwordFormRef.validate();
                const token = localStorage.getItem("token");
                if (!token) {
                    this.$message.error("请先登录");
                    return;
                }

                const response = await axiosInstance.put(
                    `/user/updatePassword?oldPassword=${encodeURIComponent(
                        this.passwordForm.oldPassword
                    )}&newPassword=${encodeURIComponent(
                        this.passwordForm.newPassword
                    )}`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.success) {
                    this.passwordDialogVisible = false;
                    this.passwordForm = {
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    };
                    this.$message.success("密码修改成功，即将跳转到登录界面");
                    alert("密码修改成功，即将跳转到登录界面");  
                    window.location.href = `/login?redirect=${encodeURIComponent(window.location.href)}`;
                } else {
                    throw new Error(response.data.message || "旧密码不正确");
                }
            } catch (error) {
                console.error("Change password failed:", error);
                if (error.response?.status === 401) {
                    this.$message.error("旧密码不正确");
                } else {
                    this.$message.error(
                        error.message || "网络错误，请稍后重试"
                    );
                }
            }
        },
        async fetchData() {
            const token = localStorage.getItem("token");
            if (!token) {
                this.$message.error("请先登录");
                return;
            }
            try {
                // 并行请求提高性能
                const [modelResponse, favoritesResponse] = await Promise.all([
                    axiosInstance.get("/model/"),
                    axiosInstance.get("/user/favorites?userId=1", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);

                const allModels = this.processImagePath(
                    modelResponse.data.data
                );
                const favorites = favoritesResponse.data.data || [];
                console.log(favorites);
                // 使用 filter 和 map 替代循环
                this.datas = allModels.filter((model) =>
                    favorites.includes(model.modelId)
                );

                if (this.$refs.modelCardContainer) {
                    this.$refs.modelCardContainer.updatePaginatedModel(
                        this.datas
                    );
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
                this.datas = [];
                this.$message.error("获取数据失败");
            }
        },
        processImagePath(data) {
            const BASE_URL = "http://49.233.82.133:5174";
            return data.map((item) => ({
                ...item,
                model_image_path: item.model_image_path
                    ? `${BASE_URL}${this.getSubstringAfterKeyword(
                          item.model_image_path,
                          "public"
                      )}`
                    : item.model_image_path,
            }));
        },
        getSubstringAfterKeyword(inputString, keyword) {
            const index = inputString?.indexOf(keyword);
            return index !== -1
                ? inputString.substring(index + keyword.length)
                : "";
        },
        async fetchComments() {
            this.loading = true;
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    this.$message.error("请先登录");
                    return;
                }

                const response = await axiosInstance.get("/user/dynamic", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.data);

                if (response.data.success) {
                    this.comments = response.data.data.flatMap((item) => {
                        if (!item.modelName) return [];

                        return item.comments
                            .filter((comment) => {
                                return (
                                    comment.commentDetail && comment.createTime
                                );
                            })
                            .map((comment) => ({
                                modelName: item.modelName,
                                modelUrl: `/model-detail/${item.modelName}`,
                                content: comment.commentDetail,
                                createTime: comment.createTime,
                            }));
                    });
                    console.log(this.comments);
                } else {
                    throw new Error(response.data.message || "获取评论失败");
                }
            } catch (error) {
                console.error("Failed to fetch comments:", error);
                this.$message.error(error.message || "获取评论失败");
            } finally {
                this.loading = false;
            }
        },
        handlePageChange(newPage) {
            this.currentPage = newPage;
            // 滚动到评论区顶部
            const commentSection = document.querySelector(".comment");
            if (commentSection) {
                commentSection.scrollIntoView({ behavior: "smooth" });
            }
        },
        async checkLoginStatus() {
            const token = localStorage.getItem("token");
            if (!token) {
                this.$router.push("/");
                return false;
            }
            return true;
        },
        async initializeData() {
            if (await this.checkLoginStatus()) {
                const storedUserName = localStorage.getItem("userName");
                if (storedUserName) {
                    this.userName = storedUserName;
                }
                await this.fetchData();
                await this.fetchComments();
            }
        },
    },
    async beforeMount() {
        await this.initializeData();
    },
    created() {
        // 移除 initializeData 的调用，因为已经在 beforeMount 中处理
    },
    async beforeRouteEnter(to, from, next) {
        const token = localStorage.getItem("token");
        if (!token) {
            if (from.path === "/center") {
                next(vm => {
                    vm.$router.push("/");
                });
            } else {
                alert("请先登录!");
                next(false); // 阻止导航
            }
        } else {
            next();
        }
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
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
    color: #409eff;
}
.main {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
}
.comment-list {
    margin-top: 20px;
    min-height: 200px;
    position: relative;
}
.comment-list:empty {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f7fa;
    border-radius: 4px;
}
.comment-item {
    padding: 20px;
    border-bottom: 1px solid #ebeef5;
}
.comment-item:last-child {
    border-bottom: none;
}
.comment-content {
    margin: 10px 0;
    color: #303133;
    line-height: 1.6;
    font-size: 15px;
}
.comment-footer {
    margin-top: 10px;
}
.comment-time {
    color: #909399;
    font-size: 14px;
}
.model-link {
    margin-bottom: 19px;
}

.model-link a {
    color: #409eff;
    text-decoration: none;
    font-weight: 500;
    font-size: 20px;
}

.model-link a:hover {
    color: #66b1ff;
    text-decoration: underline;
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

/* 可选：自定义分页样式 */
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
    background-color: #409eff;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
    color: #409eff;
}
</style>
