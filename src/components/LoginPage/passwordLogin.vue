<template>
    <div class="image-text_1 flex-row justify-between">
        <!-- 欢迎登录 -->
        <div class="text-group_1 flex-col justify-between">
            <span class="text_1">HI！欢迎登录</span>
            <span class="text_2">琅琊海评</span>
        </div>
    </div>

    <div class="block_2 flex-row">
        <div class="image-text_2 flex-row justify-between">
            <img
            class="thumbnail_1"
            referrerpolicy="no-referrer"
            src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPng7d6b6bb55e8745e4ac6ea719d2dfeb1feea999bd69aa4763c17d018fcfc2b62d"
            />
            <input
            class="text-group_2"
            type="text"
            placeholder="请输入邮箱或手机号"
            v-model="email"
            />
        </div>
    </div>

    <div class="block_3 flex-row">
        <div class="image-text_3 flex-row align-center">
            <img
            class="thumbnail_2"
            referrerpolicy="no-referrer"
            src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPngfb27592d6bf29f7cde12a61ed2f84e726131b09bd372863818d70e75170af410"
            />
            <input
            class="text-group_3"
            type="text"
            placeholder="请输入密码"
            v-model="password"
            />
        </div>
    </div>

    <!-- 登录按钮 -->
    <div class="text-wrapper_1 flex-col" @click="handleLogin">
        <button class="text_4">登&nbsp;&nbsp;&nbsp;录</button>
    </div>

    <div class="text-wrapper_2 flex-col" @click="showRegisterModal">
        <span class="new_text_4">注&nbsp;&nbsp;&nbsp;册</span>
    </div>

    <!-- 注册弹窗 -->
    <Register v-if="isRegisterModalVisible" @close="closeRegisterModal" />

    <div class="text-wrapper_3">
        <span class="text_5">忘记密码？</span>
        <span class="text_6" @click="showFindPasswordModal">找回密码</span>
    </div>

    <!-- 找回密码弹窗 -->
    <FindPassword v-if="isFindPasswordModalVisible" @close="closeFindPasswordModal" />
</template>

<script>
import axios from "axios";
import Register from "./Register.vue"; // 引入注册组件
import FindPassword from "./FindPassword.vue"; // 引入找回密码组件
export default {
  data() {
    return {
      email: "", // 手机号
      password: "", // 密码
      isSendingCode: false, // 是否正在发送验证码
      countdown: 60, // 验证码倒计时
      isRegisterModalVisible: false, // 是否显示注册弹窗
      isFindPasswordModalVisible: false, // 是否显示找回密码弹窗
    };
  },
  components: {
    Register, // 注册组件
    FindPassword, // 找回密码组件
  },
  methods: {
    async handleLogin() {
      if (!this.email || !this.password) {
        alert("请输入账号和密码！");
        return;
      }
      try {
        const response = await axios.post("http://49.233.82.133:9091/user/login/", {
          userName: this.email,
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

    checkEmailOrPhone(input) {
      // 判断是否为电子邮箱
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(input)) {
        return "email"; // 是电子邮箱
      }

      // 判断是否为手机号（以中国大陆手机号为例）
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (phoneRegex.test(input)) {
        return "phone"; // 是手机号
      }

      return "invalid"; // 既不是电子邮箱也不是手机号
    },

    // 显示找回密码弹窗
    showFindPasswordModal() {
      this.isFindPasswordModalVisible = true;
    },
    //关闭找回密码弹窗
    closeFindPasswordModal() {
      this.isFindPasswordModalVisible = false;
    },
    // 显示注册弹窗
    showRegisterModal() {
      this.isRegisterModalVisible = true;
    },

    // 关闭注册弹窗
    closeRegisterModal() {
      this.isRegisterModalVisible = false;
    },

    async handleLogin() {
      if (!this.email || !this.password) {
        alert("请输入账号和密码！");
        return;
      }
      if(this.checkEmailOrPhone(this.email) === "invalid") {
        alert("请输入有效的电子邮箱或手机号！");
        return;
      }

      //邮箱登录
      if (this.checkEmailOrPhone(this.email) === "email") {
        try {
          const response = await axios.post("http://49.233.82.133:9091/user/loginByEmail", {
            email: this.email,
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
            this.clearInput(); // 清空输入框
          } else {
            alert(data.errorMsg || "登录失败，请检查账号和密码！");
          }
        } catch (error) {
          alert("网络错误或后端异常，请稍后再试");
          console.error(error);
        }
      }

      //手机号登录
      else if (this.checkEmailOrPhone(this.email) === "phone") {
        try {
          const response = await axios.post(`http://49.233.82.133:9091/user/loginByPhone`, {
            phone: this.email,
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
            this.clearInput(); // 清空输入框
          } else {
            alert(data.errorMsg || "登录失败，请检查账号和密码！");
          }
        } catch (error) {
          alert("网络错误或后端异常，请稍后再试");
          console.error(error);
        }
      }
    },

    // 发送验证码
    async sendVerificationCode(phone) {
      if (!phone) {
        alert("请输入手机号！");
        return;
      }
      try {
        const response = await axios.post(
          `http://49.233.82.133:9091/user/sendPhoneCode?phone=${phone}`
        );
        const data = response.data;
        if (data.success) {
          alert("验证码已发送到您的手机！");
          this.startCountdown();
        } else {
          alert(data.errorMsg || "发送验证码失败，请重试！");
        }
      } catch (error) {
        alert("网络错误或后端异常，请稍后再试");
        console.error(error);
      }
    },

    // 验证码倒计时
    startCountdown() {
      this.isSendingCode = true;
      this.countdown = 60;
      const interval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(interval);
          this.isSendingCode = false;
        }
      }, 1000);
    },

    //清空输入框
    clearInput() {
      this.email = ""; // 清空手机号输入框
      this.password = ""; // 清空密码输入框
    },
  },
};
</script>

<style scoped>
.page {
  background-color: rgba(248, 249, 251, 1);
  position: relative;
  width: 1605px;
  height: 745px;
  overflow: hidden;
  margin: 0; /* 移除默认外边距 */
  padding: 0; /* 移除默认内边距 */
}

.section_1 {
  background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/45006df7cce64cb7a3510e61fd9cab90_mergeImage.png);
  width: 1605px;
  height: 745px;
  background-size: cover; /* 确保图片覆盖整个容器 */
  background-position: center; /* 将背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  margin: 0; /* 移除外边距 */
  padding: 0; /* 移除内边距 */
  display: flex; /* 保持子元素的布局 */
  flex-direction: column; /* 垂直排列子元素 */
}

.group_1 {
  width: 700px;
  height: 500px;
  background: url(https://lanhu-oss-2537-2.lanhuapp.com/SketchPng7ea32a015400c7d33fcc970ee5cf377d38327bbce71656952c1d729d86cd397d) -32px -32px
    no-repeat;
  background-size: 500px 560px;
  margin: 145px 0 0 1000px;
  position: relative; /* 设置为相对定位，方便子元素绝对定位 */
}

.image-text_1 {
  width: 275px;
  height: 95px;
  margin-left: 102px;
}

.text-group_1 {
  width: 196px;
  height: 78px;
  margin-top: 50px;
}

.text_1 {
  width: 120px;
  height: 28px;
  overflow-wrap: break-word;
  color: rgba(55, 78, 92, 1);
  font-size: 20px;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 28px;
  margin-left: 38px;
}

.text_2 {
  width: 196px;
  height: 40px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 28px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  line-height: 40px;
  margin-top: 10px;
  margin-left: 40px;
}

.block_1 {
  width: 72px;
  height: 95px;
  background: url(https://lanhu-oss-2537-2.lanhuapp.com/SketchPng4f175480528a2b80d8be8f72fb6251c9850507f630e7666e41bb4822474c23ee)
    100% no-repeat;
  background-size: 100% 100%;
  margin-left: 325px;
  display: flex; /* 添加 flex 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 水平居中对齐 */
  justify-content: center; /* 垂直居中对齐 */
  position: absolute; /* 绝对定位 */
  z-index: 10; /* 确保浮于其他组件上方 */
}

.label_1 {
  width: 24px;
  height: 25px;
  margin: 7px 25px 0 25px;
}

.paragraph_1 {
  width: 56px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: bold; /* 设置文字加粗 */
  text-align: center; /* 设置文字居中 */
  line-height: 18px;
  margin: 8px 0 25px 0; /* 调整外边距，确保居中对齐 */
}

.block_2 {
  background-color: rgba(247, 247, 247, 1);
  border-radius: 4px;
  width: 340px;
  height: 48px;
  margin: 20px 0 0 35px;
}

.image-text_2 {
  width: 116px;
  height: 20px;
  margin: 30px 0 0 10px;
  display: flex; /* 使用 flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 8px; /* 图标和输入框之间的间距 */
}

.thumbnail_1 {
  width: 20px;
  height: 20px;
  margin-top: 25px;
  margin-left: 15px;
}

.text-group_2 {
  flex: 1; /* 输入框占据剩余空间 */
  border: none; /* 移除边框 */
  outline: none; /* 移除聚焦时的边框 */
  background-color: transparent; /* 设置背景为透明 */
  color: rgba(143, 148, 164, 1); /* 保持字体颜色 */
  font-size: 14px; /* 保持字体大小 */
  font-weight: normal; /* 保持字体粗细 */
  text-align: left; /* 左对齐 */
  line-height: 20px; /* 保持行高 */
  margin-top: 26px;
}

.block_3 {
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  background-color: rgba(247, 247, 247, 1);
  border-radius: 4px;
  width: 340px;
  height: 48px;
  margin: 16px 0 0 35px;
  gap: 8px; /* 输入框和按钮之间的间距 */
}

.image-text_3 {
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 8px; /* 图标和输入框之间的间距 */
  margin-left: 10px;
}

.thumbnail_2 {
  width: 20px;
  height: 20px;
  margin-top: 7px;
  margin-left: 15px;
}

.text-group_3 {
  flex: 1; /* 输入框占据剩余空间 */
  border: none; /* 移除边框 */
  outline: none; /* 移除聚焦时的边框 */
  background-color: transparent; /* 设置背景为透明 */
  color: rgba(143, 148, 164, 1); /* 保持字体颜色 */
  font-size: 14px; /* 保持字体大小 */
  font-weight: normal; /* 保持字体粗细 */
  text-align: left; /* 左对齐 */
  line-height: 20px; /* 保持行高 */
  margin-top: 7px;
}

.text_3 {
  color: rgba(135, 0, 102, 1); /* 按钮颜色 */
  font-size: 14px; /* 字体大小 */
  font-weight: normal; /* 字体粗细 */
  white-space: nowrap; /* 防止文字换行 */
  line-height: 20px; /* 行高 */
  margin-left: 11px; /* 与输入框的间距 */
  cursor: pointer; /* 鼠标悬停时变成手指 */
  text-align: left; /* 左对齐 */
  margin-top: 5px;
}

.text_3.disabled {
  color: rgba(143, 148, 164, 1); /* 禁用状态的颜色 */
  cursor: not-allowed; /* 禁用状态时鼠标样式 */
}

.text-wrapper_1 {
  background-color: rgba(135, 0, 102, 1);
  border-radius: 4px;
  height: 48px;
  width: 340px;
  margin: 34px 0 0 45px;
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  cursor: pointer; /* 鼠标悬停时显示手指 */
}

.text-wrapper_2 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  height: 48px;
  width: 340px;
  margin: 10px 0 0 45px;
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  cursor: pointer; /* 鼠标悬停时显示手指 */
  border: 1px solid rgba(135, 0, 102, 1); /* 添加边框颜色 */
}

.text_4 {
  color: rgba(255, 255, 255, 1); /* 按钮文字颜色 */
  font-size: 14px; /* 字体大小 */
  font-weight: normal; /* 字体粗细 */
  text-align: center; /* 居中对齐 */
  white-space: nowrap; /* 防止文字换行 */
  line-height: normal; /* 让文字垂直居中 */
  margin: 0; /* 移除多余的外边距 */
  background: none; /* 移除按钮默认背景 */
  border: none; /* 移除按钮默认边框 */
  cursor: pointer; /* 鼠标悬停时显示手指 */
}

.new_text_4 {
  color: rgba(135, 0, 102, 1); /* 按钮文字颜色 */
  font-size: 14px; /* 字体大小 */
  font-weight: normal; /* 字体粗细 */
  text-align: center; /* 居中对齐 */
  white-space: nowrap; /* 防止文字换行 */
  line-height: normal; /* 让文字垂直居中 */
  margin: 0; /* 移除多余的外边距 */
  background: none; /* 移除按钮默认背景 */
  border: none; /* 移除按钮默认边框 */
  cursor: pointer; /* 鼠标悬停时显示手指 */
}

.image-text_4 {
  width: 350px;
  height: 60px;
  margin: 16px 0 40px 30px;
  display: flex; /* 使用 flex 布局 */
  align-items: flex-start; /* 垂直顶部对齐 */
}

.checkbox_3 {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  cursor: pointer;
  appearance: none; /* 移除默认样式 */
  border: 1px solid #ccc; /* 添加边框 */
  border-radius: 3px; /* 可选：让勾选框有圆角 */
  outline: none;
  background-color: #fff; /* 未选中时的背景颜色 */
  transition: background-color 0.3s ease, border-color 0.3s ease; /* 添加过渡效果 */
  display: inline-block; /* 确保与文字在同一行 */
  vertical-align: middle; /* 垂直居中对齐 */
}

.checkbox_3:checked {
  background-color: #870066; /* 选中时的背景颜色 */
  border-color: #870066; /* 选中时的边框颜色 */
}

.checkbox_3:checked::after {
  content: "✔"; /* 添加勾选标记 */
  display: block;
  color: #fff; /* 勾选标记的颜色 */
  font-size: 12px; /* 勾选标记的大小 */
  text-align: center;
  line-height: 16px; /* 让勾选标记垂直居中 */
  width: 100%; /* 确保伪元素覆盖整个勾选框 */
  height: 100%; /* 确保伪元素覆盖整个勾选框 */
}

.thumbnail_3 {
  width: 16px;
  height: 16px;
  margin-top: 2px;
}

.text-group_4 {
  width: 450px;
  height: 60px;
  overflow-wrap: break-word;
  font-size: 0;
  font-weight: normal;
  text-align: left;
  line-height: 20px;
}

.text-wrapper_3 {
  width: 126px;
  height: 20px;
  overflow-wrap: break-word;
  font-size: 0;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 20px;
  margin: 16px 0 44px 150px;
}

.text_5 {
  width: 316px;
  height: 60px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  line-height: 20px;
}

.text_6 {
  width: 316px;
  height: 60px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  line-height: 20px;
  cursor: pointer;
}
</style>