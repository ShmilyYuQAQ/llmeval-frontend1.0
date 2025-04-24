<template>
    <NavBar />
    <div class="title">
        <h>个人中心</h>
        <p>您可在此处修改昵称与密码，并查看您收藏、评价的模型</p>
    </div>
    <div class="personal-center-container">
        <!-- 左侧用户信息面板 -->
        <div class="sidebar">
            <div class="user-info-panel">
                <el-avatar class="user-avatar" :src="userAvatar" @click="handleAvatarClick" />
                <div class="user-details">
                    <div class="user-name">{{ userName }}</div>
                    <div class="user-actions">
                        <el-button type="text" @click="changeNameClick" class="action-btn">
                            修改昵称
                        </el-button>
                        <el-button type="text" @click="changePasswordClick" class="action-btn">
                            修改密码
                        </el-button>
                        <el-button type="text" @click="logoutUser" class="action-btn logout-btn">
                            退出登录
                        </el-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 右侧内容区域 -->
        <div class="content-area">
            <!-- 使用 el-tabs 组件 -->
            <el-tabs v-model="activeTab" class="custom-tabs" @tab-change="handleTabChange">
                <el-tab-pane :label="`已收藏模型 (${favoriteCount || 0})`" name="favorites">
                    <div class="tab-content-container">
                        <div class="scrollable-content favorites-content">
                            <modelCardContainer :datas="paginatedFavorites" ref="modelCardContainer"
                                :showPagination="false">
                            </modelCardContainer>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="`已评价模型 (${commentCount})`" name="comments">
                    <div class="tab-content-container">
                        <div class="scrollable-content comments-content" v-loading="loading"
                            element-loading-text="加载中...">
                            <div v-for="(comment, index) in paginatedComments" :key="index" class="comment-item">
                                <div class="model-link">
                                    <div class="model-icon-container">
                                        <img v-if="comment.modelImagePath" :src="comment.modelImagePath"
                                            class="model-image-icon" @error="handleImageError($event)" />
                                        <el-icon v-else class="model-icon">
                                            <Document />
                                        </el-icon>
                                    </div>
                                    <a :href="comment.modelUrl">{{ comment.modelName }}</a>
                                    <span class="comment-time-inline">发表于{{ comment.createTime }}</span>
                                </div>
                                <div class="comment-content">{{ comment.content }}</div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="unified-pagination-container">
                <!-- 收藏模型分页 -->
                <el-pagination v-if="activeTab === 'favorites' && totalFavorites > 0"
                    v-model:current-page="favoritesPage" :page-size="pageSize" :total="totalFavorites"
                    @current-change="handleFavoritesPageChange" layout="prev, pager, next" background />

                <!-- 评论分页 -->
                <el-pagination v-if="activeTab === 'comments' && totalComments > 0" v-model:current-page="currentPage"
                    :page-size="pageSize" :total="totalComments" @current-change="handlePageChange"
                    layout="prev, pager, next" background />
            </div>
        </div>
    </div>

    <!-- 修改昵称对话框 -->
    <el-dialog v-model="nameDialogVisible" title="修改昵称" width="400px" class="custom-dialog">
        <el-form :model="nameForm" :rules="nameRules" ref="nameFormRef">
            <el-form-item prop="newName">
                <el-input v-model="nameForm.newName" placeholder="请输入新昵称" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="nameDialogVisible = false" class="cancel-btn">取消</el-button>
                <el-button type="primary" @click="submitNameChange" class="confirm-btn">确认</el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog v-model="passwordDialogVisible" title="修改密码" width="400px" class="custom-dialog">
        <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef">
            <el-form-item prop="oldPassword">
                <el-input v-model="passwordForm.oldPassword" type="password" placeholder="请输入原密码" />
            </el-form-item>
            <el-form-item prop="newPassword">
                <el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="请确认新密码" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="passwordDialogVisible = false" class="cancel-btn">取消</el-button>
                <el-button type="primary" @click="submitPasswordChange" class="confirm-btn">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import modelCardContainer from "@/components/homePage/modelCardContainer.vue";
import axiosInstance from "@/plugins/axios";
import NavBar from "../components/guidePage/NavBar.vue";

export default {
    components: {
        NavBar,
        modelCardContainer,
    },
    data() {
        return {
            allModelImagesMap: {},
            activeTab: 'favorites',
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
            favoritesPage: 1,
            favoritePageSize: 10,
        };
    },
    computed: {
        // 计算总评论数
        totalComments() {
            return this.comments.length;
        },
        // 根据当前页获取分页后的评论
        paginatedComments() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.comments.slice(start, end);
        },
        // 计算收藏的模型数量
        favoriteCount() {
            return this.datas.length;
        },
        // 计算评论数量
        commentCount() {
            return this.comments.length;
        },
        // 计算总收藏数
        totalFavorites() {
            return this.datas.length;
        },
        // 根据当前页获取分页后的收藏
        paginatedFavorites() {
            const start = (this.favoritesPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.datas.slice(start, end);
        }
    },
    methods: {
        // 处理标签页切换
        handleTabChange(tab) {
            if (tab.name === 'comments' && this.comments.length === 0) {
                this.fetchComments();
            }
        },

        // 打开修改昵称对话框
        changeNameClick() {
            this.nameDialogVisible = true;
            this.nameForm.newName = this.userName;
        },

        // 打开修改密码对话框
        changePasswordClick() {
            this.passwordDialogVisible = true;
        },

        // 处理头像点击事件
        handleAvatarClick() {
            // 预留给头像更换功能
        },

        // 用户登出
        logoutUser() {
            // 清除本地存储的用户信息
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            localStorage.removeItem('userAvatar');

            // 触发登出事件
            this.$bus.emit('logout');
            this.$message.success("退出登录成功");
            this.$router.push('/');
        },

        // 提交昵称修改
        async submitNameChange() {
            try {
                await this.$refs.nameFormRef.validate();
                const token = this.getToken();
                if (!token) return;

                const response = await axiosInstance.put(
                    `/user/updateUsername?newUsername=${encodeURIComponent(
                        this.nameForm.newName
                    )}`,
                    null,
                    {
                        headers: { Authorization: `Bearer ${token}` },
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

        // 提交密码修改
        async submitPasswordChange() {
            try {
                await this.$refs.passwordFormRef.validate();
                const token = this.getToken();
                if (!token) return;

                const response = await axiosInstance.put(
                    `/user/updatePassword?oldPassword=${encodeURIComponent(
                        this.passwordForm.oldPassword
                    )}&newPassword=${encodeURIComponent(
                        this.passwordForm.newPassword
                    )}`,
                    null,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.data.success) {
                    this.passwordDialogVisible = false;
                    this.resetPasswordForm();
                    this.$message.success("密码修改成功，即将跳转到登录界面");
                    alert("密码修改成功，即将跳转到登录界面");
                    this.$bus.emit('logout');
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

        // 重置密码表单
        resetPasswordForm() {
            this.passwordForm = {
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            };
        },

        // 获取token并校验
        getToken() {
            const token = localStorage.getItem("token");
            if (!token) {
                this.$message.error("请先登录");
                return null;
            }
            return token;
        },

        // 获取收藏的模型数据
        async fetchData() {
            const token = this.getToken();
            if (!token) return;

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

                const allModels = this.processImagePath(modelResponse.data.data);
                const favorites = favoritesResponse.data.data || [];

                // 筛选出已收藏的模型
                this.datas = allModels.filter((model) =>
                    favorites.includes(model.modelId)
                );

                this.updateModelCardContainer();
            } catch (error) {
                console.error("Failed to fetch data:", error);
                this.datas = [];
                this.$message.error("获取数据失败");
            }
        },

        // 更新模型卡片容器
        updateModelCardContainer() {
            if (this.$refs.modelCardContainer) {
                this.$refs.modelCardContainer.updatePaginatedModel(this.datas);
            }
        },

        // 处理图片路径
        processImagePath(data) {
            return data.map((item) => ({
                ...item,
                model_image_path: item.model_image_path
                    ? `/images/${item.model_image_path.split('/images/')[1]}` // 提取 /images/ 后面的部分并拼接
                    : '',
            }));
        },

        // 提取关键词后的子字符串
        getSubstringAfterKeyword(inputString, keyword) {
            if (!inputString) return "";
            const index = inputString.indexOf(keyword);
            return index !== -1
                ? inputString.substring(index + keyword.length)
                : "";
        },

        // 获取用户评论数据
        async fetchComments() {
            this.loading = true;
            try {
                const token = this.getToken();
                if (!token) return;
                const allModelsResponse = await axiosInstance.get("/model/");
                // 处理所有模型的图片路径
                const allModels = this.processImagePath(allModelsResponse.data.data);
                const modelImagesMap = {};
                allModels.forEach(model => {
                    if (model.model_image_path) {
                        modelImagesMap[String(model.modelId)] = model.model_image_path;
                    }
                });

                this.allModelImagesMap = modelImagesMap;

                // 获取用户评论数据
                const response = await axiosInstance.get("/user/dynamic", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    this.processCommentsData(response.data.data);
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

        // 处理评论数据
        processCommentsData(data) {
            const modelImageMap = this.allModelImagesMap || {};

            console.log("所有模型图片映射:", modelImageMap);
            console.log("原始评论数据:", JSON.stringify(data.map(d => ({ id: d.modelId, name: d.modelName }))));

            this.comments = data.flatMap((item) => {
                if (!item.modelName) return [];

                const modelIdKey = String(item.modelId);
                console.log(`处理模型评论: ${item.modelName}(ID:${modelIdKey})`);

                // 检查此模型ID是否有对应的图片
                const hasImage = modelIdKey in modelImageMap;
                console.log(`模型 ${item.modelName} 是否有图片: ${hasImage}`);

                return item.comments
                    .filter((comment) => {
                        return (
                            comment.commentDetail && comment.createTime
                        );
                    })
                    .map((comment) => {
                        return {
                            modelName: item.modelName,
                            modelId: item.modelId,
                            modelUrl: `/model-detail/${item.modelId}`,
                            content: comment.commentDetail,
                            createTime: comment.createTime,
                            modelImagePath: modelImageMap[modelIdKey] || null
                        };
                    });
            });
        },
        handleImageError(event) {
            console.warn('图片加载失败:', event.target.src);

            // 找到父元素
            const container = event.target.closest('.model-icon-container');
            if (container) {
                while (container.firstChild) {
                    container.firstChild.remove();
                }
                const iconEl = document.createElement('div');
                iconEl.className = 'el-icon model-icon';
                iconEl.innerHTML = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm320 512V448h64v128h128v64H544v128h-64V640H352v-64h128z"></path></svg>';
                container.appendChild(iconEl);
            }
        },

        // 处理收藏模型分页变化
        handleFavoritesPageChange(newPage) {
            this.favoritesPage = newPage;
            this.updateModelCardContainer();
            this.scrollToTop('.favorites-content');
        },

        // 处理评论分页变化
        handlePageChange(newPage) {
            this.currentPage = newPage;
            this.scrollToTop('.comments-content');
        },

        // 滚动到顶部
        scrollToTop(selector) {
            const section = document.querySelector(selector);
            if (section) {
                section.scrollTo({ top: 0, behavior: "smooth" });
            }
        },

        // 检查登录状态
        async checkLoginStatus() {
            const token = localStorage.getItem("token");
            if (!token) {
                this.$router.push("/");
                return false;
            }
            return true;
        },

        // 初始化数据
        async initializeData() {
            if (await this.checkLoginStatus()) {
                const storedUserName = localStorage.getItem("userName");
                if (storedUserName) {
                    this.userName = storedUserName;
                }
                await this.fetchData();
                if (this.activeTab === 'comments') {
                    await this.fetchComments();
                }
            }
        },
    },
    async beforeMount() {
        await this.initializeData();
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
    watch: {
        // 监听标签页变化，按需加载数据
        activeTab(newTab) {
            if (newTab === 'comments' && this.comments.length === 0) {
                this.fetchComments();
            }
        }
    }
};
</script>

<style scoped>
.title {
    width: 100%;
    aspect-ratio: 1440 / 160;
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    margin: 0;
    padding: 20px;
    border-bottom: 1px solid #ebeef5;
    background-image: url('@/assets/images/personbk.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.title h {
    position: relative;
    margin: 10px 0 0 120px;
    z-index: 2;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 32px;
    color: #870066;
    line-height: 45px;
    text-align: left;
    font-style: normal;
}

.title p {
    position: relative;
    z-index: 2;
    font-family: OPPOSans, OPPOSans;
    font-weight: normal;
    font-size: 14px;
    color: #1E2437;
    line-height: 18px;
    text-align: left;
    font-style: normal;
    margin: 24px 0 0 120px;
}

.personal-center-container {
    display: flex;
    height: calc(100vh - 100px);
    margin: 20px 120px 20px 120px;
    gap: 20px;
}

/* 左侧侧边栏样式 */
.sidebar {
    flex: 0 0 328px;
    height: 800px;
}

.user-info-panel {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.user-avatar {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    margin-top: 20px;
    cursor: pointer;
    transition: transform 0.3s;
}

.user-avatar:hover {
    transform: scale(1.05);
}

.user-details {
    width: 100%;
}

.user-name {
    margin-bottom: 30px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #1E2437;
    line-height: 25px;
    text-align: center;
    font-style: normal;
}

.user-actions {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 0;
    align-items: center;
}

.action-btn {
    padding: 10px 0;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #870066;
    border-radius: 8px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 20px;
    text-align: center;
    font-style: normal;
    width: calc(100% - 20px);
    margin: 0 10px;
}

.action-btn:hover {
    background-color: #f0f2f5;
    color: #000000;
    border-color: #870066;
}

.logout-btn {
    background-color: #FFFFFF;
    color: #000000;
    border: 1px solid #C4C5CC;
}

.logout-btn:hover {
    background-color: #f0f2f5 !important;
    border-color: #870066;
}

/* 右侧内容区域样式 */
.content-area {
    flex: 1;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px 20px 0 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: calc(100% - 348px);
    box-sizing: border-box;
    min-width: 800px;
}

/* 滚动内容区域 */
.scrollable-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 20px;
}

.scrollable-content :deep(.model-card-container) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 10px;
}

.scrollable-content :deep(.model-card) {
    width: 100%;
    box-sizing: border-box;
}

/* 自定义滚动条 */
.scrollable-content::-webkit-scrollbar {
    width: 6px;
}

.scrollable-content::-webkit-scrollbar-thumb {
    background-color: #c0c4cc;
    border-radius: 3px;
}

.scrollable-content::-webkit-scrollbar-track {
    background-color: #f5f7fa;
}

/* 标签页样式 */
.custom-tabs {
    flex: 0 0 auto;
}

.custom-tabs :deep(.el-tabs__header) {
    margin-bottom: 20px;
    border-bottom: 2px solid #f0f2f5;
    padding-bottom: 0;
}

.custom-tabs :deep(.el-tabs__content) {
    height: 100%;
    overflow: hidden;
}

.custom-tabs :deep(.el-tabs__item) {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #8F94A4;
    line-height: 22px;
    text-align: left;
    font-style: normal;
}

.custom-tabs :deep(.el-tabs__item.is-active) {
    color: #1E2437;
    font-weight: 600;
}

.custom-tabs :deep(.el-tabs__active-bar) {
    background-color: #870066;
    height: 2px;
    border-radius: 3px;
}

/* 评论列表样式 */
.comment-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.comment-item {
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

.comment-item:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-color: #e0e0e0;
    transform: translateY(-2px);
}

.model-link {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;

}

.model-icon {
    color: #870066;
    font-size: 18px;
    margin-right: 8px;
}

.model-icon-container {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 4px;
}

.model-image-icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
}

.model-link a {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #870066;
    line-height: 25px;
    text-align: left;
    font-style: normal;
}

.model-link a:hover {
    text-decoration: underline;
}

.comment-time-inline {
    margin-left: auto;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    text-align: right;
    font-style: normal;
}


.comment-content {
    margin: 10px 0;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #222222;
    line-height: 20px;
    text-align: justify;
    font-style: normal;
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
    margin-bottom: 15px;
}

.comment-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.comment-content {
    margin: 10px 0;
    color: #303133;
    line-height: 1.6;
    font-size: 15px;
    padding: 10px 0;
}

/* 可选：自定义分页样式 */
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
    background-color: #870066;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
    background-color: #a1007a;
}

/* 对话框样式 */
.custom-dialog :deep(.el-dialog__header) {
    background: #870066;
    color: #fff;
    border-radius: 8px 8px 0 0;
    padding: 15px 20px;
    margin: 0;
    border: none;
}

.custom-dialog :deep(.el-dialog__title) {
    color: #fff;
    font-weight: 500;
    font-size: 18px;
}

.custom-dialog :deep(.el-dialog__headerbtn) {
    top: 15px;
    right: 15px;
}

.custom-dialog :deep(.el-dialog__body) {
    padding: 30px 20px;
}

.custom-dialog :deep(.el-dialog__footer) {
    padding: 10px 20px 20px;
}

/* 对话框按钮样式 */
.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.cancel-btn {
    background: #fff;
    border-color: #dcdfe6;
}

.cancel-btn:hover {
    color: #606266;
    border-color: #c6c8cc;
    background-color: #f2f3f5;
}

.confirm-btn {
    background-color: #870066;
    border-color: #870066;
}

.confirm-btn:hover {
    background-color: #a1007a;
    border-color: #a1007a;
}

.unified-pagination-container {
    padding: 15px 0;
    margin-top: auto;
    display: flex;
    justify-content: center;
    border-top: 1px solid #ebeef5;
    background-color: #fff;
    position: sticky;
    bottom: 0;
    z-index: 1;
}

.tab-content-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 200px);
    min-height: 500px;
}

.favorites-content {
    padding: 10px 0;
}
</style>