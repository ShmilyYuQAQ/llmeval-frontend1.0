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
                border: 1px solid rgba(204, 204, 204, 0.5);
                background: rgba(255, 255, 255, 0.8);
                backdrop-filter: blur(6px);
                -webkit-backdrop-filter: blur(6px);
                font-size: 14px;
                cursor: pointer;
                outline: none;
            ">
            <option v-for="lang in languageOptions" :key="lang.code" :value="lang.code">
                {{ lang.name }}
            </option>
        </select>
    </div>

    <!-- 悬浮按钮 -->
    <div 
        class="float-btn"
        @click="toggleDialog"
        style="
            position: fixed;
            bottom: 40px;
            right: 40px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(188, 58, 162, 0.03);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.2);
            cursor: pointer;
            z-index: 1000;
        "
    >
    <img data-v-6527686d="" src="/src/components/guidePage/images/langya.png" alt="琅琊海评" class="logo">
    </div>
    

    <!-- 对话框（关键：半透明背景+磨砂） -->
    <div 
        v-if="isFloatDialogShow"
        style="
            position: fixed;
            bottom: 120px;
            right: 40px;
            width: 350px;
            height: 500px;
            background: rgba(236, 229, 221, 0.7); /* 半透明背景 */
            backdrop-filter: blur(10px); /* 对话框整体磨砂 */
            -webkit-backdrop-filter: blur(10px);
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        "
        class="chat-dialog"
    >
        <!-- 对话框标题栏（半透明磨砂） -->
        <div style="
            padding: 12px 16px;
            background: rgba(188, 58, 162, 0.5);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            color: white;
            font-size: 16px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: space-between;
        ">
            <span>请提问我吧~</span>
            <div 
                @click="toggleDialog"
                style="cursor: pointer; font-size: 18px;"
            >
                ×
            </div>
        </div>

        <!-- 聊天内容区（磨砂背景） -->
        <div 
            class="chat-content"
            style="
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 12px;
                background: rgba(255, 255, 255, 0.3); /* 半透明+磨砂 */
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
            "
            ref="chatContent"
        >
            <!-- 欢迎消息（磨砂气泡） -->
            <div v-if="chatMessages.length === 0" style="
                align-self: flex-start;
                max-width: 80%;
            ">
                <div style="
                    background: rgba(255, 255, 255, 0.9); /* 气泡磨砂 */
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    padding: 10px 15px;
                    border-radius: 18px 18px 18px 5px;
                    font-size: 14px;
                    color: #333;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                <div style="
                width: 24px; 
                height: 24px; 
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                    <img data-v-6527686d="" src="/src/components/guidePage/images/langya.png" alt="琅琊海评" class="logo">
                </div>
                    
                你好！请输入模型相关问题，我将为你解答～
                </div>
            </div>

            <!-- 聊天消息列表（磨砂气泡） -->
            <div 
                v-for="(msg, index) in chatMessages"
                :key="index"
                :style="msg.role === 'user' ? 'align-self: flex-end;' : 'align-self: flex-start;'"
                style="max-width: 80%;"
            >
                <!-- 用户消息（磨砂气泡） -->
                <div v-if="msg.role === 'user'" style="
                    display: flex;
                    align-items: flex-end;
                    gap: 8px;
                ">
                    <div style="
                        background: rgba(188, 58, 162, 0.5); /* 用户气泡磨砂 */
                        backdrop-filter: blur(4px);
                        -webkit-backdrop-filter: blur(4px);
                        color: white;
                        padding: 10px 15px;
                        border-radius: 18px 18px 5px 18px;
                        font-size: 14px;
                        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                    ">
                        {{ msg.content }}
                    </div>
                    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="用户头像" style="width: 24px; height: 24px; border-radius: 50%;">
                </div>

                <!-- AI消息（磨砂气泡） -->
                <div v-else-if="msg.role === 'ai'" style="
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                ">
                <div style="
                width: 24px; 
                height: 24px; 
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                    <img data-v-6527686d="" src="/src/components/guidePage/images/langya.png" alt="琅琊海评" class="logo">
                </div>                
                <div style="
                        background: rgba(255, 255, 255, 0.9); /* AI气泡磨砂 */
                        backdrop-filter: blur(4px);
                        -webkit-backdrop-filter: blur(4px);
                        padding: 10px 15px;
                        border-radius: 18px 18px 18px 5px;
                        font-size: 14px;
                        color: #333;
                        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                    ">
                        {{ msg.content }}
                    </div>
                </div>

                <!-- 加载中消息（磨砂气泡） -->
                <div v-else-if="msg.role === 'loading'" style="
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                ">
                <div style="
                width: 24px; 
                height: 24px; 
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                    <img data-v-6527686d="" src="/src/components/guidePage/images/langya.png" alt="琅琊海评" class="logo">
                </div>                    
                <div style="
                        background: rgba(242, 242, 242, 0.9); /* 加载气泡磨砂 */
                        backdrop-filter: blur(4px);
                        -webkit-backdrop-filter: blur(4px);
                        padding: 10px 15px;
                        border-radius: 18px 18px 18px 5px;
                        font-size: 14px;
                        color: #666;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <span class="loading-dot">●</span>
                        <span class="loading-dot">●</span>
                        <span class="loading-dot">●</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 输入区（磨砂背景） -->
        <div style="
            padding: 10px 15px;
            background: rgba(255, 255, 255, 0.8); /* 输入区磨砂 */
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            gap: 10px;
        ">
            <textarea
                v-model="userInput"
                placeholder="请输入问题..."
                :disabled="isLoading"
                style="
                    flex: 1;
                    height: 40px;
                    padding: 10px;
                    border: 1px solid rgba(230, 230, 230, 0.7);
                    border-radius: 20px;
                    resize: none;
                    font-size: 14px;
                    outline: none;
                    box-sizing: border-box;
                    background: rgba(255, 255, 255, 0.7); /* 输入框磨砂 */
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                "
                @keyup.enter.prevent="submitMessage"
            ></textarea>
            <button
                @click="submitMessage"
                :disabled="isLoading || !userInput.trim()"
                style="
                    width: 80px;
                    height: 40px;
                    background: rgba(188, 58, 162, 0.5); /* 按钮磨砂 */
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    color: white;
                    border: none;
                    border-radius: 20px;
                    font-size: 14px;
                    cursor: pointer;
                "
            >
                <span v-if="!isLoading">发送</span>
                <span v-if="isLoading">发送中...</span>
            </button>
        </div>
    </div>

    <div id="app">
        <router-view />
    </div>
    <Footer />
    
   
    <!-- 新手指引：未登录用户所有页面显示 / 已登录老用户不显示 -->
    <NewbieGuide 
        v-if="shouldShowGuide" 
        style="
            z-index: 99999 !important; /* 强制最高层级 */
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        " 
    />
</template>

<script>
import GuidePage from "./views/GuidePage.vue";
import Footer from "./components/Footer.vue";
import NavBar from "./components/guidePage/NavBar.vue"; 
import NewbieGuide from "./components/guidePage/NewbieGuide.vue";

export default {
    name: "App",
    components: {
        GuidePage,
        Footer,
        NavBar,
        NewbieGuide,
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
            isGuideDone: localStorage.getItem('newbieGuideDone') === 'true', // 是否完成引导
            isLoggedIn: !!localStorage.getItem('token'), // 是否已登录（通过token判断）
            checkLoginInterval: null,
            isFloatDialogShow: false, 
            userInput: "",
            isLoading: false, 
            chatMessages: [] 
        };
    },
    computed: {
        // 核心计算属性：控制引导显示条件
        shouldShowGuide() {
            // 条件：1.未登录  OR  2.未完成引导（新用户）
            // 已登录且完成引导（老用户）：不显示
            return !this.isLoggedIn ||  !this.isGuideDone;
        }
    },
    mounted() {
        this.checkLoginStatus();
        this.checkLoginInterval = setInterval(this.checkLoginStatus, 10000); 
        this.getLang();
        if (this.$translate && this.$translate.listener) {
            this.$translate.listener.start();
        }
        this.initLoadingAnimation();
        
        // 监听localStorage变化：同步登录状态、引导完成状态
        window.addEventListener('storage', this.handleStorageChange);
    },
    beforeUnmount() {
        clearInterval(this.checkLoginInterval);
        window.removeEventListener('storage', this.handleStorageChange);
    },
    watch: {
        // 监听路由变化：切换页面时更新引导显示状态（未登录用户所有页面都显示）
        '$route.path'() {
            this.isLoggedIn = !!localStorage.getItem('token'); // 重新检查登录状态
        }
    },
    methods: {
        // 重置引导（调试用：清除localStorage状态，重新显示引导）
        resetGuide() {
            localStorage.removeItem('newbieGuideDone');
            this.isGuideDone = false;
            // 触发NewbieGuide组件重新初始化
            this.$nextTick(() => {
                const newbieGuide = this.$refs.newbieGuide;
                if (newbieGuide && newbieGuide.resetGuide) {
                    newbieGuide.resetGuide();
                }
            });
        },
        // 监听localStorage变化：同步token（登录状态）和引导完成状态
        handleStorageChange(e) {
            if (e.key === 'newbieGuideDone') {
                this.isGuideDone = e.newValue === 'true';
            } else if (e.key === 'token') {
                this.isLoggedIn = !!e.newValue;
            }
        },
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
            this.isLoggedIn = !!token; // 实时更新登录状态
            if (!token) return;
            
            try {
                const res = await fetch('http://49.233.82.133:9091/user/favorites', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data && data.success === false && data.errorMsg === "登录已过期，请重新登录") {
                    alert('登录已过期，请重新登录');
                    // 清除过期token，更新登录状态（过期后视为未登录，显示引导）
                    localStorage.removeItem('token');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('userAvatar');
                    this.isLoggedIn = false;
                    
                    if (this.$refs.navbar && this.$refs.navbar.logout) {
                        this.$refs.navbar.logout();
                    } else if (this.$route.path === '/center') {
                        this.$router.push('/'); 
                    } else {
                        location.reload(); 
                    }
                }
            } catch (e) {
                // 处理网络异常
            }
        },
        initLoadingAnimation() {
            const style = document.createElement('style');
            style.textContent = `
                .loading-dot {
                    animation: blink 1.4s infinite both;
                }
                .loading-dot:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .loading-dot:nth-child(3) {
                    animation-delay: 0.4s;
                }
                @keyframes blink {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        },
        toggleDialog() {
            this.isFloatDialogShow = !this.isFloatDialogShow;
            if (!this.isFloatDialogShow) {
                this.chatMessages = [];
                this.isLoading = false;
                this.userInput = "";
            }
        },
        async submitMessage() {
            const question = this.userInput.trim();
            if (!question || this.isLoading) return;

            this.chatMessages.push({ role: 'user', content: question });
            this.userInput = "";
            this.scrollToBottom();

            const loadingMsgIndex = this.chatMessages.length;
            this.isLoading = true;
            this.chatMessages.push({ role: 'loading', content: '' });
            this.scrollToBottom();

            try {
                const res = await fetch('http://49.233.82.133:9091/api/coze/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userquery: question })
                });

                if (!res.ok) throw new Error(`接口请求失败（状态码：${res.status}`);
                const data = await res.text();
                this.chatMessages.splice(loadingMsgIndex, 1);
                this.chatMessages.push({ role: 'ai', content: data });
            } catch (err) {
                this.chatMessages.splice(loadingMsgIndex, 1);
                this.chatMessages.push({ role: 'ai', content: '网络异常或接口错误，请稍后再试～' });
                console.error('问答接口调用失败：', err);
            } finally {
                this.isLoading = false;
                this.scrollToBottom();
            }
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const chatContent = this.$refs.chatContent;
                if (chatContent) {
                    chatContent.scrollTop = chatContent.scrollHeight;
                }
            });
        }
    }
};
</script>

<style scoped>
button {
    transition: transform 0.1s ease;
}
button:active {
    transform: scale(0.95);
}
textarea {
    transition: all 0.2s ease;
}
textarea:focus {
    border-color: #409eff;
    transform: scale(1.01);
    box-shadow: 0 0 5px rgba(64, 158, 255, 0.3);
}
@keyframes mycolor {
    0% { transform: scale(1.1); }
    30% { background-color: rgba(137, 24, 114, 0.345);transform: scale(1.1); }
    60% { background-color: rgba(113, 26, 96, 0.373); transform: scale(1.0);}
    80% { background-color: rgba(113, 26, 96, 0.533); transform: scale(.7);}
    100% { background-color: rgba(113, 26, 96, 0.459); transform: scale(1.0);}
}
.float-btn:hover {
    animation-name: mycolor;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-iteration-count: 2;
}
.container {
    width: 100%;
}
/* 滚动条样式优化 */
.chat-content::-webkit-scrollbar {
    width: 6px;
}
.chat-content::-webkit-scrollbar-thumb {
    background-color: rgba(204, 204, 204, 0.7);
    border-radius: 3px;
}
.chat-content {
    scrollbar-gutter: stable;
}
/* 头像适配 */
img[alt="用户头像"], img[alt="AI头像"] {
    object-fit: cover;
    border: 1px solid rgba(238, 238, 238, 0.7);
}
/* 调试按钮样式（单独定义，避免被scoped影响） */
::v-deep .reset-guide-btn {
    z-index: 999999 !important;
}
.logo {
  width: 60px !important;
  height: 60px !important;
  object-fit: contain !important;
  display: block !important;
  max-width: 100% !important;
  max-height: 100% !important;
}
</style>
