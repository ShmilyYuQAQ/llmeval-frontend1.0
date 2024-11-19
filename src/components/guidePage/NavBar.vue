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
                    <nav class="navbar-menu">
                        <router-link to="/" class="link-item">指南</router-link>
                        <router-link to="/home" class="link-item">主页</router-link>
                        <router-link to="/news" class="link-item">新闻</router-link>
                        <router-link class="link-item">资源</router-link>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {};
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
    width: 100%;
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
}
.link-item:hover {
    color: #409eff;
}
</style>
