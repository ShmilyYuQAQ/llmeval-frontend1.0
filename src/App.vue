<template>
    <!-- Language Selector -->
        <div class="language-selector" style="
            position: absolute;
            top: 70px;
            right: 20px;
            z-index: 1000;
        ">
            <select v-model="selectedLang" @change="languageAuto($event.target.value, $event.target.selectedOptions[0].text)"
                style="
                    padding: 8px 12px;
                    width: 130px;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    background-color: white;
                    font-size: 14px;
                    cursor: pointer;
                    outline: none;
                ">
                <option v-for="lang in languageOptions" :key="lang.code" :value="lang.code">
                    {{ lang.name }}
                </option>
            </select>
        </div>
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
     data() {
        return {
            selectedLang: localStorage.getItem("language") || "chinese_simplified",
            languageOptions: [
                { code: 'chinese_simplified', name: '中文' },
                { code: 'english', name: 'English' },
                { code: 'french', name: 'Français' },
                { code: 'italian', name: 'Italiano' },
                { code: 'korean', name: '한어' },
                { code: 'japanese', name: '日本語' },
                { code: 'spanish', name: 'Español' },
                { code: 'russian', name: 'Русский' },
            ],
            
        };
    },
    mounted() {
        this.checkLoginStatus();
        this.checkLoginInterval = setInterval(this.checkLoginStatus, 10000); // 每10秒检测一次
        this.getLang();
        if (this.$translate && this.$translate.listener) {
            this.$translate.listener.start();
        }
    },
    beforeUnmount() {
        clearInterval(this.checkLoginInterval);
    },
    methods: {
        languageAuto(code, name) {
            localStorage.setItem("language", code);
            this.selectedLang = code;
            if (this.$translate) {
                this.$translate.changeLanguage(code);
            }
        },
        getLang() {
            const storedLang = localStorage.getItem("language") || "chinese_simplified";
            this.selectedLang = storedLang;
            if (this.$translate) {
                this.$translate.changeLanguage(storedLang);
            }
        },


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
