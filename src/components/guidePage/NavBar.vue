<template>
    <header class="navbar">
        <div class="navbar-wrapper">
            <div class="header-container">
                <div class="logo-container">
                    <a href="https://cs.nankai.edu.cn/" target="_blank">
                        <img
                            src="./images/nkcs_logo.png"
                            alt="南开大学软件学院"
                            class="logo"
                        />
                    </a>
                </div>
                <div class="nav-center">
                    <nav class="navbar-menu">
                        <router-link to="/" class="link-item" active-class="active"
                                     @mouseenter="hovering.guide = true"
                                     @mouseleave="hovering.guide = false">
                            <img :src="guideIcon" 
                                 alt="指南" 
                                 class="nav-icon">
                            <span>指南</span>
                        </router-link>
                        <router-link to="/home" class="link-item" active-class="active"
                                     @mouseenter="hovering.home = true"
                                     @mouseleave="hovering.home = false">
                            <img :src="homeIcon" 
                                 alt="主页" 
                                 class="nav-icon">
                            <span>主页</span>
                        </router-link>
                        <router-link to="/news" class="link-item" active-class="active"
                                     @mouseenter="hovering.news = true"
                                     @mouseleave="hovering.news = false">
                            <img :src="newsIcon" 
                                 alt="新闻" 
                                 class="nav-icon">
                            <span>新闻</span>
                        </router-link>
                        <router-link to="/center" class="link-item" active-class="active"
                                     @mouseenter="hovering.center = true"
                                     @mouseleave="hovering.center = false">
                            <img :src="centerIcon" 
                                 alt="个人中心" 
                                 class="nav-icon">
                            <span>个人中心</span>
                        </router-link>
                    </nav>
                </div>
                <div class="user-container">
                    <div class="menu-toggle" @click="toggleMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="user-info">
                        <div class="avatar-wrapper">
                            <img 
                                :src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" 
                                alt="用户头像" 
                                class="avatar-img"
                            />
                        </div>
                        <div class="user-details" v-if="isLoggedIn">
                            <div class="username">{{ userName }}</div>
                            <button @click="logout" class="logout-btn">退出登录</button>
                        </div>
                        <button v-else @click="login" class="login-btn">登录</button>
                    </div>
                </div>
            </div>
        </div>
        <div :class="['mobile-menu', { 'active': isMenuOpen }]">
            <router-link to="/home" class="mobile-link-item" active-class="active"
                         @mouseenter="hovering.home = true"
                         @mouseleave="hovering.home = false">
                <img :src="homeIcon" alt="主页" class="nav-icon">
                <span>主页</span>
            </router-link>
            <router-link to="/" class="mobile-link-item" active-class="active"
                         @mouseenter="hovering.guide = true"
                         @mouseleave="hovering.guide = false">
                <img :src="guideIcon" alt="指南" class="nav-icon">
                <span>指南</span>
            </router-link>
            
            <router-link to="/news" class="mobile-link-item" active-class="active"
                         @mouseenter="hovering.news = true"
                         @mouseleave="hovering.news = false">
                <img :src="newsIcon" alt="新闻" class="nav-icon">
                <span>新闻</span>
            </router-link>
            <router-link to="/center" class="mobile-link-item no-border" active-class="active"
                         @mouseenter="hovering.center = true"
                         @mouseleave="hovering.center = false">
                <img :src="centerIcon" alt="个人中心" class="nav-icon">
                <span>个人中心</span>
            </router-link>
            <button v-if="!isLoggedIn" @click="login" class="mobile-link-item no-border login-button"
                    @mouseenter="hovering.login = true"
                    @mouseleave="hovering.login = false"
                    style="border: none !important; background: transparent !important; outline: none !important;">
                <img :src="hovering.login ? icons.center.active : icons.center.normal" alt="登录" class="nav-icon">
                <span>登录</span>
            </button>
            <button v-else @click="logout" class="mobile-link-item no-border logout-button"
                    @mouseenter="hovering.logout = true"
                    @mouseleave="hovering.logout = false"
                    style="border: none !important; background: transparent !important; outline: none !important;">
                <img :src="hovering.logout ? icons.center.active : icons.center.normal" alt="退出登录" class="nav-icon">
                <span>退出登录</span>
            </button>
        </div>
    </header>
</template>

<script>
import defaultAvatar from '@/assets/images/default.png';
import centerLogoNormal from './images/center_logo.png';
import centerLogoActive from './images/center_logo_active.png';
import guideLogoNormal from './images/guide_logo.png';
import guideLogoActive from './images/guide_logo_active.png';
import homeLogoNormal from './images/home_logo.png';
import homeLogoActive from './images/home_logo_active.png';
import newsLogoNormal from './images/news_logo.png';
import newsLogoActive from './images/news_logo_active.png';

export default {
    data() {
        return {
            isMenuOpen: false,
            isLoggedIn: false,
            userName: '',
            userAvatar: '',
            defaultAvatar: defaultAvatar,
            icons: {
                home: {
                    normal: homeLogoNormal,
                    active: homeLogoActive
                },
                guide: {
                    normal: guideLogoNormal,
                    active: guideLogoActive
                },
                news: {
                    normal: newsLogoNormal,
                    active: newsLogoActive
                },
                center: {
                    normal: centerLogoNormal,
                    active: centerLogoActive
                }
            },
            hovering: {
                home: false,
                guide: false,
                news: false,
                center: false,
                login: false,
                logout: false
            }
        };
    },
    computed: {
        homeIcon() {
            return this.$route.path === '/home' || this.hovering.home ? this.icons.home.active : this.icons.home.normal;
        },
        guideIcon() {
            return this.$route.path === '/' || this.hovering.guide ? this.icons.guide.active : this.icons.guide.normal;
        },
        newsIcon() {
            return this.$route.path === '/news' || this.hovering.news ? this.icons.news.active : this.icons.news.normal;
        },
        centerIcon() {
            return this.$route.path === '/center' || this.hovering.center ? this.icons.center.active : this.icons.center.normal;
        }
    },
    mounted() {
        // 检查用户是否已登录
        this.isLoggedIn = !!localStorage.getItem('token');
        this.userName = localStorage.getItem('userName') || '用户';
        this.userAvatar = localStorage.getItem('userAvatar') || this.defaultAvatar;

        // 监听事件总线的 logout 事件
        this.$bus.on('logout', this.logout);
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },

        login() {
            // 登录逻辑
            window.location.href = `/login?redirect=${encodeURIComponent(window.location.href)}`;
        },
        logout() {
            // 退出登录逻辑
            this.isLoggedIn = false;
            this.userName = '';
            // 这里可以添加实际的退出登录逻辑，例如清除 token 等
            localStorage.removeItem('token'); 
            localStorage.removeItem('userName');
            localStorage.removeItem('userAvatar');
            
            if (this.$route.path === '/center') {
                this.$router.push('/'); // 重定向到首页
            } else {
                location.reload(); // 刷新当前页面
            }
            
            console.log("退出登录");
        },
        beforeDestroy() {
            // 移除事件监听
            this.$bus.off('logout', this.logout);
        }
    }
};
</script>

<style scoped>
.navbar {
    position: sticky;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgb(255, 255, 255);
    line-height: 1.4;
    font-size: 16px;
    font-weight: 400;
    font-family: Inter, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, 微软雅黑, Arial, sans-serif;
    z-index: 9999;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.navbar-wrapper {
    padding: 0 22px 0 32px;
    display: block;
    position: relative;
    border-bottom: 1px solid #dcdfe6;
    height: 45px; /*修改了导航栏高度 从55px减少到45px*/
}
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    height: 100%;
}
.logo-container {
    display: flex;
    align-items: center;
    height: 45px; /*从55px减少到45px*/
    flex-shrink: 0;
}
.logo-container > a {
    height: 32px; /*从40px减少到32px*/
    width: 160px; /*从190px减少到160px*/
    user-select: pointer;
}
.logo {
    position: relative;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
}
.nav-center {
    display: flex;
    justify-content: center;
    flex-grow: 1;
}
.navbar-menu {
    display: flex;
    justify-content: center;
}
.link-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    padding: 0 18px; /*从0 20px减少到0 18px*/
    margin: 0 5px;
    height: 42px; /*从52px减少到42px*/
    font-size: 13px; /*从14px减少到13px*/
    font-weight: 500;
    color: #303133;
    transition: all 0.3s;
    text-decoration: none;
}
.link-item span {
    margin-left: 8px;
    transition: color 0.3s;
}
.nav-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    transition: color 0.3s;
}
.link-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #870066;
    transform: translateX(-50%); /* 确保居中 */
    transition: width 0.3s ease;
}
.link-item:hover {
    color: #870066;
}
.link-item:hover::after {
    width: 60%; /* 更短的底部横线 */
}
.link-item.active {
    color: #870066;
}
.link-item.active::after {
    width: 60%; /* 更短的底部横线 */
}
.user-container {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}
.user-info {
    display: flex;
    align-items: center;
}
.avatar-wrapper {
    width: 32px; /*从40px减少到32px*/
    height: 32px; /*从40px减少到32px*/
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
}
.avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.user-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.username {
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    margin-bottom: 2px;
}
.logout-btn {
    font-size: 12px;
    color: #909399;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
}
.logout-btn:hover {
    color: #870066;
}
.login-btn {
    font-size: 14px;
    padding: 6px 12px;
    color: #870066;
    background: none;
    border: 1px solid #870066;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
}
.login-btn:hover {
    color: white;
    background-color: #870066;
}
.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    cursor: pointer;
    margin-right: 20px;
}
.menu-toggle span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: #303133;
    transition: all 0.3s;
}
.mobile-menu {
    display: none;
    position: fixed;
    top: 45px; /*从55px减少到45px*/
    left: 0;
    width: 100%;
    background-color: white;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    z-index: 9998;
}
.mobile-link-item {
    display: flex;
    align-items: center;
    padding: 12px 20px; /*从15px 20px减少到12px 20px*/
    font-size: 13px; /*从14px减少到13px*/
    color: #303133;
    border-bottom: 1px solid #f5f5f5;
    text-decoration: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    position: relative;
    transition: color 0.3s;
    outline: none;
}
.mobile-link-item::after {
    content: none; /* 不显示底部横线 */
}
.mobile-link-item.active::after, .mobile-link-item:hover::after {
    width: 0; /* 不显示底部横线 */
}
.mobile-link-item.active, .mobile-link-item:hover {
    color: #870066;
}
.mobile-link-item .nav-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.mobile-link-item span {
    margin-left: 0;
}
.mobile-link-item:last-child {
    border-bottom: none;
}
.mobile-menu .router-link-exact-active.router-link-active[to="/center"] {
    border-bottom: none;
}
@media screen and (max-width: 768px) {
    .nav-center {
        display: none;
    }
    .menu-toggle {
        display: flex;
    }
    .mobile-menu.active {
        display: flex;
    }
    .user-info .user-details {
        display: none;
    }
    .login-btn {
        padding: 4px 8px;
        font-size: 12px;
    }
}
.nav-bar {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    /* 其他现有样式 */
}
.no-border {
    border-bottom: none !important;
}
/* 专门处理按钮类型的mobile-link-item */
button.mobile-link-item {
    border: none !important; /* 完全移除按钮边框 */
    appearance: none; /* 移除默认按钮样式 */
    -webkit-appearance: none; /* Safari兼容性 */
    -moz-appearance: none; /* Firefox兼容性 */
    outline: none; /* 移除点击时的轮廓线 */
    background: transparent; /* 确保背景透明 */
    box-shadow: none !important; /* 确保没有阴影 */
}

/* 确保按钮在各种状态下都没有边框 */
button.mobile-link-item:hover,
button.mobile-link-item:active,
button.mobile-link-item:focus {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
}

/* 专门处理登录和退出登录按钮 */
.login-button, .logout-button {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    background-color: transparent !important;
}
</style>
