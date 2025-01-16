<template>
  <div class="login-container">
    <h1>大模型推荐系统</h1>
    <div class="login-box">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="text" placeholder="请输入账号" v-model="username" />
        </div>
        <div class="input-group">
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="forgot-password">
          <a href="#">忘记密码？通过邮箱找回</a>
        </div>
        <button class="login-btn" type="submit">登录</button>
        <button class="register-btn" type="button" @click="showRegisterModal">注册</button>
      </form>
    </div>

    <!-- 注册弹窗 -->
    <div v-if="isRegisterModalVisible" class="modal">
      <div class="modal-content">
        <h2>注册</h2>
        <form @submit.prevent="handleRegister">
          <div class="input-group">
            <input
              type="text"
              placeholder="请输入用户名"
              v-model="registerForm.userName"
            />
          </div>
          <div class="input-group">
            <input
              type="email"
              placeholder="请输入电子邮箱"
              v-model="registerForm.email"
            />
          </div>
          <div class="input-group">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="registerForm.password"
            />
          </div>
          <!-- 按钮区域 -->
          <div class="modal-buttons">
            <button class="login-btn" type="submit">提交注册</button>
            <button class="register-btn" type="button" @click="closeRegisterModal">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios"; // 引入 axios
import { useRouter } from "vue-router"; // Vue 3 路由

export default {
  data() {
    return {
      username: "",
      password: "",
      isRegisterModalVisible: false, // 控制注册弹窗
      registerForm: {
        userName: "",
        email: "",
        password: "",
      },
    };
  },
  setup() {
    const router = useRouter(); // 使用 Vue Router
    return { router };
  },
  methods: {
    // 登录处理
    async handleLogin() {
      if (!this.username || !this.password) {
        alert("请输入账号和密码！");
        return;
      }
      try {
        const response = await axios.post("http://49.233.82.133:9091/user/login/", {
          userName: this.username,
          password: this.password,
        });
        const data = response.data;
        if (data.success) {
          alert("登录成功！");
          // 保存 Token 到 localStorage
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('userName', response.data.data.userName);
          const urlParams = new URLSearchParams(window.location.search);
          const redirectUrl = urlParams.get('redirect') || '/';
          window.location.href = redirectUrl;
        } else {
          alert(data.errorMsg || "登录失败，请检查账号和密码！");
        }
      } catch (error) {
        alert("网络错误或后端异常，请稍后再试");
        console.error(error);
      }
    },

    // 显示注册弹窗
    showRegisterModal() {
      this.isRegisterModalVisible = true;
    },

    // 关闭注册弹窗
    closeRegisterModal() {
      this.isRegisterModalVisible = false;
      this.clearRegisterForm();
    },

    // 清空注册表单
    clearRegisterForm() {
      this.registerForm.userName = "";
      this.registerForm.email = "";
      this.registerForm.password = "";
    },

    // 注册处理
    async handleRegister() {
      const { userName, email, password } = this.registerForm;
      if (!userName || !email || !password) {
        alert("请填写完整的注册信息！");
        return;
      }
      try {
        const response = await axios.post(
          "http://49.233.82.133:9091/user/register/",
          { userName, email, password },
          {
            // 请求配置
            headers: {
              "Content-Type": "application/json", // 请求体类型
            },
            withCredentials: false, // 如果需要发送Cookie或其他凭据，可以改为 true
          }
        );
        const data = response.data;
        if (data.success) {
          alert(data.data || "注册成功！");
          this.closeRegisterModal();
        } else {
          alert(data.errorMsg || "注册失败，请重试！");
        }
      } catch (error) {
        alert("网络错误或后端异常，请稍后再试");
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* 登录容器样式 */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

h1 {
  font-size: 24px;
  color: #1e2452;
  margin-bottom: 20px;
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

h2 {
  font-size: 20px;
  color: #1e2452;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.forgot-password {
  margin-bottom: 20px;
}

.forgot-password a {
  font-size: 12px;
  color: #b80077;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

/* 登录按钮 */
.login-btn {
  background-color: #1e2452;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
}

.register-btn {
  background: white;
  color: #1e2452;
  padding: 10px;
  width: 100%;
  border: 1px solid #1e2452;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

/* 悬停样式 */
.login-btn:hover {
  background-color: #16203a;
}

.register-btn:hover {
  background-color: #f5f5f5;
}

/* 弹窗样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.modal-content h2 {
  margin-bottom: 20px;
  color: #1e2452;
}

/* 按钮垂直排列 */
.modal-buttons {
  display: flex;
  flex-direction: column; /* 垂直方向布局 */
  gap: 10px; /* 按钮之间的间距 */
  margin-top: 20px;
}
</style>

