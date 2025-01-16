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
                <div class="content">
                    <div class="menu-toggle" @click="toggleMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav :class="['navbar-menu', { 'active': isMenuOpen }]">
                        <router-link to="/" class="link-item">指南</router-link>
                        <router-link to="/home" class="link-item">主页</router-link>
                        <router-link to="/news" class="link-item">新闻</router-link>
                        <router-link to="/center" class="link-item">个人中心</router-link>
                        <button v-if="!isLoggedIn" @click.native="login" class="link-item">登录</button>
                        <button v-if="isLoggedIn" @click.native="logout" class="link-item">退出登录</button>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isMenuOpen: false,
            isLoggedIn: false // 这里可以根据实际情况初始化
        }
    },
    mounted() {
        // 检查用户是否已登录
        this.isLoggedIn = !!localStorage.getItem('token'); // 这里可以根据实际情况修改
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
            localStorage.removeItem('token');
            localStorage.removeItem('userName'); // 同时清除用户名
            // 重定向到主页
            this.$router.push('/');
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
}
.navbar-wrapper {
    padding: 0 22px 0 32px;
    display: block;
    position: relative;
    border-bottom: 1px solid #dcdfe6;
    height: 55px; /*55*/
}
.header-container {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
}
.logo-container {
    display: flex;
    align-items: center;
    height: 55px;
}
.logo-container > a {
    height: 40px;
    width: 190px;
    user-select: pointer;
}
.logo {
    position: relative;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
}
.content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 1;
    /* border:solid 1px red; */
}
.navbar-menu {
    display: flex;
    margin-right: 40px;
}
.link-item {
    display: block;
    padding: 0 12px;
    line-height: 52px;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    transition: color 0.3s;
    border-bottom: 2px solid transparent;
    border: none; /* 去除按钮默认边框 */
    background: none; /* 去除按钮默认背景色 */
    cursor: pointer; /* 鼠标悬停样式 */
    outline: none; /* 去除按钮默认点击高亮框 */
    font-family: inherit; /* 继承字体样式 */
    appearance: none; /* 去除按钮默认样式（兼容性更强） */
}
.link-item:hover {
    color: #409eff;
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
@media screen and (max-width: 768px) {
    .menu-toggle {
        display: flex;
    }
    .navbar-menu {
        display: none;
        position: absolute;
        top: 55px;
        right: 0;
        flex-direction: column;
        background-color: white;
        width: 200px;
        margin: 0;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .navbar-menu.active {
        display: flex;
    }
    .link-item {
        padding: 10px 20px;
        line-height: 1.5;
        border-bottom: 1px solid #eee;
    }
    .link-item:last-child {
        border-bottom: none;
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
</style>
