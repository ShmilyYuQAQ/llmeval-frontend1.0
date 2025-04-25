<template>
    <div class="model-card">
        <!-- 卡片上部分 -->
        <div class="card-header">
            <!-- 左侧：模型图片 -->
            <div class="img-container">
                <img
                    :src="model.model_image_path || defaultUrl"
                    alt="Model Image"
                    class="model-img"
                />
            </div>

            <!-- 右侧：模型信息 - 重新布局 -->
            <div class="header-content">
                <!-- 第一行：模型名称和收藏量 -->
                <div class="header-top-row">
                    <div class="model-name-container">
                        <span class="model-name" :title="model.name">{{
                            model.name
                        }}</span>
                    </div>

                    <div class="favorite-count" @click.stop="toggleFavorite" :class="{ 'disabled': isLoading }">
                        <div class="favorite-icon-container">
                            <!-- 加载中状态显示加载指示器 -->
                            <div v-if="isLoading" class="loading-spinner"></div>
                            <img
                                v-else
                                :src="isFavorited ? favoriteActiveIcon : favoriteIcon"
                                alt="Favorite"
                                class="favorite-img"
                            />
                        </div>
                        <div class="favorite-number">{{ displayFavoriteCount }}</div>
                    </div>
                </div>

                <!-- 第二行：机构名称和发布时间 -->
                <div class="header-bottom-row">
                    <div class="model-institution">
                        <img
                            :src="companyIcon"
                            alt="Company"
                            class="icon-img"
                        />
                        <span :title="model.institution">{{
                            model.institution
                        }}</span>
                    </div>

                    <div class="release-date">
                        <img
                            :src="timeIcon"
                            alt="time"
                            class="icon-img"
                        />
                        <span>{{ model.releaseDate }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 卡片中部：模型描述 -->
        <div class="card-body">
            <div class="content" :title="model.description">
                {{ model.description }}
            </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="showError" class="error-message">
            {{ errorMessage }}
        </div>

        <!-- 卡片下部：详情按钮 -->
        <div class="card-footer">
            <button class="details-button" @click="goToDetail(model.name)">
                查看详情
                <img :src="arrowRightIcon" alt="Arrow" class="arrow-icon" />
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 导入图片资源
import arrowRightIcon from './images/arrow_right.png';
import companyIcon from './images/company.png';
import favoriteIcon from './images/favorite.png';
import favoriteActiveIcon from './images/favorite_active.png';
import defaultLogoIcon from './images/logo1.png';
import timeIcon from './images/time.png';

export default {
    name: 'ModelCard',
    
    props: {
        model: {
            type: Object,
            required: true,
        }
    },
    
    data() {
        return {
            defaultUrl: defaultLogoIcon,
            isLoading: false, // 加载状态
            showError: false, // 是否显示错误
            errorMessage: '', // 错误信息
            // 导出图标路径
            favoriteActiveIcon,
            favoriteIcon,
            companyIcon,
            arrowRightIcon,
            timeIcon
        };
    },
    
    computed: {
        // 计算收藏状态
        isFavorited() {
            return this.model.isFavorited;
        },
        
        // 计算显示的收藏数量
        displayFavoriteCount() {
            const baseCount = this.model.favoritesCount || 0;
            return this.isFavorited ? baseCount : baseCount;
        }
    },
    
    methods: {
        // 获取认证Token
        getAuthToken() {
            return localStorage.getItem('token');
        },
        
        // 获取认证头
        getAuthHeaders() {
            const token = this.getAuthToken();
            return token ? {
                'Authorization': `Bearer ${token}`
            } : {};
        },
        
        // 检查用户是否登录
        checkUserLogin() {
            const token = this.getAuthToken();
            return !!token;
        },
        
        // 跳转到登录页面
        goToLogin() {
            ElMessage({
                message: '请先登录后再收藏模型',
                type: 'warning'
            });
            this.$router.push({ 
                name: 'Login', 
                query: { redirect: this.$router.currentRoute.value.fullPath } 
            });
        },
        
        // 切换收藏状态 - 使用axios
        async toggleFavorite() {
            // 如果正在加载中，不执行任何操作
            if (this.isLoading) return;
            
            // 检查用户是否登录
            if (!this.checkUserLogin()) {
                this.goToLogin();
                return;
            }
            
            // 设置加载状态
            this.isLoading = true;
            this.showError = false;
            
            try {
                const modelId = this.model.modelId;
                if (!modelId) {
                    throw new Error('模型ID不存在');
                }
                
                // API基础URL
                const baseUrl = 'http://49.233.82.133:9091/user/favorites';
                
                let response;
                if (this.isFavorited) {
                    // 取消收藏 - DELETE请求
                    response = await axios.delete(`${baseUrl}/delete`, {
                        params: { modelId },
                        headers: this.getAuthHeaders()
                    });
                } else {
                    // 添加收藏 - POST请求
                    response = await axios.post(`${baseUrl}/add`, null, {
                        params: { modelId },
                        headers: this.getAuthHeaders()
                    });
                }
                
                // 检查响应中的success属性
                if (response.data && response.data.success) {
                    // 成功处理
                    const action = this.isFavorited ? '取消收藏' : '收藏';
                    // 更新收藏量
                    this.model.isFavorited = !this.isFavorited;
                    this.model.favoritesCount = this.isFavorited ? this.model.favoritesCount + 1 : this.model.favoritesCount - 1;
                    
                } else {
                    // 业务逻辑错误处理
                    throw new Error(response.data.message || '操作未成功完成');
                }
                
            } catch (error) {
                // 显示错误消息
                console.error('收藏操作失败', error);
                this.errorMessage = error.response?.data?.message || error.message || '操作失败，请稍后重试';
                this.showError = true;
                
                // 自动隐藏错误信息
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            } finally {
                // 完成后重置加载状态
                this.isLoading = false;
            }
        },
        
        // 跳转到详情页
        goToDetail(name) {
            this.$router.push({ name: "ModelDetail", params: { name } });
        }
    }
};
</script>

<style scoped>
.model-card {
    width: 100%;
    height: 242px; /* 增加卡片整体高度，与容器保持一致 */
    max-width: 100%;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    padding: 18px 18px 18px 18px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    background-color: white;
    overflow: hidden;
    margin: 0 auto; /* 居中显示 */
    position: relative; /* 添加相对定位，用于错误提示定位 */
}

.model-card:hover {
    border: 1px solid #870066;
    box-shadow: 0 4px 16px rgba(135, 0, 102, 0.15);
}

/* 卡片上部分样式 - 固定高度 */
.card-header {
    display: flex;
    width: 100%;
    height: 70px; /* 固定上部分高度 */
    flex-shrink: 0; /* 防止压缩 */
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 12px;
    margin-bottom: 0; /* 移除底部间距，使用固定高度控制 */
}

.img-container {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 8px;
    background-color: #f5f7fa;
    margin-right: 14px; /* 增加间距 */
    flex-shrink: 0;
}

.model-img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

/* 新的头部内容布局 */
.header-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0; /* 确保内容能够适应容器 */
}

/* 第一行：模型名称和收藏量 */
.header-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px; /* 增加行间距 */
    width: 100%;
}

.model-name-container {
    flex: 1;
    min-width: 0; /* 允许收缩 */
    margin-right: 14px; /* 增加间距 */
}

.model-name {
    font-family: "PingFangSC", -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    width: 100%;
}

/* 第二行：机构名称和发布时间 */
.header-bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.model-institution {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #606266;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 75%; /* 给机构名称更多空间 */
    min-width: 0; /* 允许收缩 */
}

.icon-img {
    width: 14px;
    height: 14px;
    margin-right: 5px; /* 增加图标间距 */
    flex-shrink: 0; /* 防止图标被压缩 */
}

.favorite-count {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #409eff;
    flex-shrink: 0; /* 防止被压缩 */
    white-space: nowrap;
    cursor: pointer; /* 添加指针样式，表示可点击 */
    transition: transform 0.2s ease; /* 添加点击时的过渡效果 */
    min-width: 42px; /* 确保足够宽度容纳图标和数字 */
    justify-content: flex-end; /* 右对齐 */
    height: 20px; /* 固定高度 */
}

.favorite-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px; /* 固定图标容器宽度 */
    height: 18px; /* 固定图标容器高度 */
    position: relative; /* 使用相对定位 */
    margin-right: 4px; /* 增加与数字的间距 */
}

.favorite-number {
    display: inline-block;
    min-width: 16px; /* 固定数字宽度 */
    text-align: left; /* 文本左对齐 */
}

.favorite-img {
    width: 14px;
    height: 14px;
    position: absolute; /* 绝对定位 */
    left: 50%; /* 水平居中 */
    top: 50%; /* 垂直居中 */
    transform: translate(-50%, -50%); /* 完全居中 */
    transition: transform 0.2s ease; /* 平滑过渡 */
}

.favorite-count:hover {
    transform: scale(1.05);
}

.favorite-count:active .favorite-img {
    transform: translate(-50%, -50%) scale(1.2); /* 保持居中的同时缩放 */
}

/* 特别调整时间图标的高度和对齐方式 */
.release-date .icon-img {
    width: 14px;
    height: 14px; /* 保持宽高一致 */
    margin-right: 5px;
    flex-shrink: 0;
    vertical-align: -2px; /* 微调图标向下偏移 */
    position: relative;
    top: -1px; /* 稍微向上调整位置 */
}

/* 确保整体release-date区域的对齐 */
.release-date {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #909399;
    white-space: nowrap;
    flex-shrink: 0;
    height: 20px;
    line-height: 20px;
}

/* 确保文本对齐 */
.release-date span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal; /* 重置行高，防止影响对齐 */
}

/* 卡片中部样式 - 优化高度 */
.card-body {
    width: 100%;
    flex: 1; /* 改为flex布局，使其占据剩余空间 */
    margin: 10px 0; /* 上下各加10px间距 */
    overflow: hidden; /* 确保内容不会溢出 */
    display: flex; /* 添加flex显示 */
    flex-direction: column; /* 纵向排列 */
}

.content {
    font-size: 14px;
    line-height: 1.6; /* 增加行高 */
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* 显示3行 */
    text-overflow: ellipsis;
    max-height: 95px; /* 适当增加最大高度 */
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #8f94a4;
    text-align: justify;
    font-style: normal;
    flex: 1; /* 确保内容可伸缩 */
}

/* 卡片下部样式 - 固定位置 */
.card-footer {
    width: calc(100% + 36px); /* 加上两侧内边距的宽度 */
    height: 45px; /* 固定底部高度 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0; /* 防止压缩 */
    margin-top: auto; /* 推到底部 */
    margin-left: -18px; /* 抵消父元素的内边距 */
    margin-bottom: -18px; /* 抵消父元素的内边距 */
    position: relative; /* 添加相对定位 */
    bottom: 0; /* 确保在底部 */
}

.details-button {
    width: 100%;
    height: 100%;
    background-color: white;
    color: #870066;
    border: none;
    border-top: 1px solid #e6e6e6;
    border-radius: 0 0 8px 8px; /* 只保留下方圆角 */
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

.details-button:hover {
    background-color: rgba(135, 0, 102, 0.1);
    color: #870066;
    border-top: 1px solid #870066;
}

/* 箭头图标样式 */
.arrow-icon {
    width: 14px;
    height: 14px;
    margin-left: 6px;
    transition: transform 0.3s ease;
}

.details-button:hover .arrow-icon {
    transform: translateX(3px); /* 悬停时箭头向右移动效果 */
}

/* 大屏幕优化 */
@media (min-width: 1280px) {
    .content {
        line-height: 1.7;
        font-size: 14.5px;
    }

    .model-name {
        font-size: 17px;
    }

    .model-institution,
    .favorite-count {
        font-size: 13.5px;
    }

    .release-date {
        font-size: 12.5px;
    }
}

/* 移动端适配 */
@media (max-width: 480px) {
    .model-card {
        height: 242px; /* 在移动端同样增加高度 */
        padding: 16px 16px 16px 16px; /* 移动端略微减小内边距 */
    }

    .card-header {
        height: 70px; /* 保持固定高度 */
    }

    .card-body {
        flex: 1; /* 占据剩余空间 */
    }

    .card-footer {
        height: 45px; /* 保持固定高度 */
        width: calc(100% + 32px); /* 适应移动端边距 */
        margin-left: -16px;
        margin-bottom: -16px;
    }

    .model-name {
        font-size: 15px;
    }

    .model-institution,
    .release-date,
    .favorite-count {
        font-size: 12px;
    }

    .content {
        line-height: 1.5;
    }
}

/* 添加收藏按钮禁用状态 */
.favorite-count.disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

/* 添加加载动画 */
.loading-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(135, 0, 102, 0.1);
    border-left-color: #870066;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

@keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* 错误提示样式 */
.error-message {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(245, 108, 108, 0.9);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 10;
    white-space: nowrap;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, 10px); }
    to { opacity: 1; transform: translate(-50%, 0); }
}
</style>
