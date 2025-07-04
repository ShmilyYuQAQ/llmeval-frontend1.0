<template>
    <div id="app">
        <router-view />
    </div>
    <Footer />
</template>

<script>
import GuidePage from "./views/GuidePage.vue";
import Footer from "./components/Footer.vue";
import NavBar from "./components/guidePage/NavBar.vue"; // 导入NavBar

export default {
    name: "App",
    components: {
        GuidePage,
        Footer,
        NavBar, // 注册NavBar
    },
    mounted() {
        this.checkLoginInterval = setInterval(this.checkLoginStatus, 10000); // 每10秒检测一次
    },
    beforeUnmount() {
        clearInterval(this.checkLoginInterval);
    },
    methods: {
        async checkLoginStatus() {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const res = await fetch('http://49.233.82.133:9091/user/favorites', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data && data.success === false && data.errorMsg === "登录已过期，请重新登录") {
                    alert('登录已过期，请重新登录');
                    // 调用NavBar中的logout方法
                    // 通过事件总线或$refs调用
                    if (this.$refs.navbar && this.$refs.navbar.logout) {
                        this.$refs.navbar.logout();
                    } else {
                        // 兼容NavBar未挂载时的兜底处理
                        localStorage.removeItem('token');
                        localStorage.removeItem('userName');
                        localStorage.removeItem('userAvatar');
                        if (this.$route.path === '/center') {
                            this.$router.push('/'); // 重定向到首页
                        } else {
                            location.reload(); // 刷新当前页面
                        }
                    }
                }
            } catch (e) {
                // 可选：处理网络异常
            }
        }
    }
};
</script>

<style scoped>
.container {
    /* display: flex; */
    width: 100%;
}
</style>
