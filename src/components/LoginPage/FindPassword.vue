<template>
  <div class="register-overlay" @click.self="$emit('close')">
    <div class="box_1 flex-col">
      <span class="close-button" @click="$emit('close')">×</span>
      <span class="text_1">找回密码</span>
      <div class="box_2 flex-row">
        <div class="image-text_2 flex-row justify-between">
          <img
            class="thumbnail_2"
            referrerpolicy="no-referrer"
            src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPng66d1d8f72f0389f023117c18c8bb7acb4aa061f67df7b1c0c69b5ce96f17fc64"
          />
          <input
            class="text-group_2"
            type="email"
            placeholder="请输入电子邮箱或手机号"
            v-model="email"
          />
        </div>
      </div>
      <div class="box_4 flex-row justify-between">
        <div class="image-text_3 flex-row justify-between">
          <img
            class="thumbnail_3"
            referrerpolicy="no-referrer"
            src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPng132721bb3bfcd9776b3fa2fa15eb3e516af67531bdcb1b5c3afe77653b9c6404"
          />
          <input
            class="text-group_3"
            type="text"
            placeholder="请输入验证码"
            v-model="verificationCode"
          />
          <span
            class="text_2"
            :class="{ disabled: isSendingCode }"
            :disabled="isSendingCode"
            @click="sendVerificationCode"
          >
            {{ isSendingCode ? `${countdown}s 后重新发送` : "发送验证码" }}
          </span>
        </div>
      </div>
      <div class="box_5 flex-row">
        <div class="image-text_4 flex-row justify-between">
          <img
            class="thumbnail_4"
            referrerpolicy="no-referrer"
            src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPngfb27592d6bf29f7cde12a61ed2f84e726131b09bd372863818d70e75170af410"
          />
          <input
            class="text-group_4"
            type="password"
            placeholder="请输入新密码"
            v-model="password"
          />
        </div>
      </div>
      <div class="box_6 flex-row">
        <div class="image-text_5 flex-row justify-between">
          <img
            class="thumbnail_5"
            referrerpolicy="no-referrer"
            src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPngfb27592d6bf29f7cde12a61ed2f84e726131b09bd372863818d70e75170af410"
          />
          <input
            class="text-group_5"
            type="password"
            placeholder="请再次输入新密码"
            v-model="confirmPassword"
          />
        </div>
      </div>
      <div class="text-wrapper_1 flex-col" @click="submitFindPassword">
        <span class="text_3">提交修改密码</span>
      </div>
      <div class="text-wrapper_2 flex-col" @click="$emit('close')">
        <span class="text_4">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // 引入 axios 库
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
      isSendingCode: false, // 是否正在发送验证码
      countdown: 60, // 倒计时时间
    };
  },
  methods: {
    async submitFindPassword() {
      if (!this.email || !this.verificationCode || !this.password || !this.confirmPassword) {
        alert("请填写完整的找回密码信息！");
        return;
      }
      if (this.password !== this.confirmPassword) {
        alert("两次输入的密码不一致！");
        return;
      }

      if(this.checkEmailOrPhone(this.email) === "invalid") {
        alert("请输入有效的电子邮箱或手机号！");
        return;
      }

      // 邮箱找回密码
      if (this.checkEmailOrPhone(this.email) === "email") {
        try {
          const response = await axios.post(`http://49.233.82.133:9091/user/findPassword?email=${this.email}&code=${this.verificationCode}&newPassword=${this.password}`);
          const data = response.data;
          if (data.success) {
            alert(data.data || "找回密码成功！");
            this.closeFindPassword();
          } else {
            alert(data.errorMsg || "找回密码失败，请重试！");
          }
        } catch (error) {
          alert("网络错误或后端异常，请稍后再试");
          console.error(error);
        }
      }

      // 手机号找回密码
      if (this.checkEmailOrPhone(this.email) === "phone") {
        try {
          const response = await axios.post(`http://49.233.82.133:9091/user/findPassword?email=${this.email}&code=${this.verificationCode}&newPassword=${this.password}`);
          const data = response.data;
          if (data.success) {
            alert(data.data || "找回密码成功！");
            this.closeFindPassword();
          } else {
            alert(data.errorMsg || "找回密码失败，请重试！");
          }
        } catch (error) {
          alert("网络错误或后端异常，请稍后再试");
          console.error(error);
        }
      }
    },

    closeFindPassword() {
      this.email = ""; // 清空输入框内容
      this.verificationCode = ""; // 清空输入框内容
      this.password = ""; // 清空输入框内容
      this.confirmPassword = ""; // 清空输入框内容
      this.$emit("close"); // 触发父组件的关闭事件
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

    async sendVerificationCode() {
      if(this.checkEmailOrPhone(this.email) === "invalid") {
        alert("请输入有效的电子邮箱或手机号！");
        return;
      }
      if(this.checkEmailOrPhone(this.email) === "email") {
        try {
          const response = await axios.post(`http://49.233.82.133:9091/user/sendEmailCode?email=${this.email}`);
          const data = response.data;
          
          if (data.success) {
            alert("验证码已发送到您的邮箱！");
            this.startCountdown(); // 启动倒计时
          } else {
            alert(data.errorMsg || "发送验证码失败，请重试！");
          }
        } catch (error) {
          alert("网络错误或后端异常，请稍后再试");
          console.error(error);
        }
      } 
      else if(this.checkEmailOrPhone(this.email) === "phone") {
        try {
          const response = axios.post(`http://49.233.82.133:9091/user/sendEmailCode?email=${this.email}`);
          const data = response.data;
          if (data.success) {
            alert("验证码已发送到您的手机！");
          } else {
            alert(data.errorMsg || "发送验证码失败，请重试！");
          }
        } catch (error) {
          alert("网络错误或后端异常，请稍后再试");
          console.error(error);
        }
      }
    },

    // 开始倒计时
    startCountdown() {
      this.isSendingCode = true;
      this.countdown = 60;
      const interval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(interval);
          this.isSendingCode = false; // 倒计时结束，按钮可用
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.register-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  z-index: 1000; /* 确保浮于其他元素上方 */
}

.close-button {
  position: absolute; /* 绝对定位 */
  top: 10px; /* 距离弹窗顶部 10px */
  right: 10px; /* 距离弹窗右侧 10px */
  font-size: 20px; /* 字体大小 */
  font-weight: bold; /* 加粗 */
  color: rgba(143, 148, 164, 1); /* 设置为灰色 */
  cursor: pointer; /* 鼠标悬停时显示手指 */
  background: none; /* 无背景 */
  border: none; /* 无边框 */
  margin-right: 20px;
}

.box_1 {
  width: 400px;
  padding: 20px;
  background: url(https://lanhu-oss-2537-2.lanhuapp.com/SketchPng9d9090d4fc4cc43b83053b402b489eeb624a7fbabaf9eddecf39e698b8085cdf) -50px;
  background-size: 650px 645px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap:20px;
  position: relative;;
}

.box_2 {
  background-color: rgba(247, 247, 247, 1);
  border-radius: 4px;
  width: 390px;
  height: 48px;
  margin: 0 0 0 0;
}

.box_3, .box_4, .box_5, .box_6 {
  background-color: rgba(247, 247, 247, 1);
  border-radius: 4px;
  width: 390px;
  height: 48px;
  margin: 0 0 0 0;
}

.image-text_1 {
  width: 130px;
  height: 20px;
  margin: 5px 0 0 0;
  display: flex; /* 使用 flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 8px; /* 图标和输入框之间的间距 */
}

.image-text_2, .image-text_3, .image-text_4, .image-text_5 {
  width: 130px;
  height: 20px;
  margin: 5px 0 0 0;
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

.thumbnail_2, .thumbnail_3, .thumbnail_4, .thumbnail_5 {
  width: 20px;
  height: 20px;
  margin-top: 25px;
  margin-left: 15px;
}

.text-group_1 {
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

.text-group_2, .text-group_3, .text-group_4, .text-group_5 {
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

.text_1 {
  font-size: 24px;
  font-weight: bold;
  color: rgba(30, 36, 55, 1);
  text-align: center;
}

input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: rgba(55, 78, 92, 1);
  padding: 5px;
}

.text_2 {
  color: rgba(135, 0, 102, 1); /* 按钮颜色 */
  font-size: 14px; /* 字体大小 */
  font-weight: normal; /* 字体粗细 */
  white-space: nowrap; /* 防止文字换行 */
  line-height: 20px; /* 行高 */
  margin-left: 11px; /* 与输入框的间距 */
  cursor: pointer; /* 鼠标悬停时变成手指 */
  text-align: left; /* 左对齐 */
  margin-top: 25px;
  margin-left: 65px;
}

.text_2.disabled {
  color: rgba(143, 148, 164, 1); /* 灰色 */
  cursor: not-allowed; /* 鼠标悬停时显示不可点击 */
  margin-left: 42px; /* 调整左边距，避免文字超出框 */
}

.text-wrapper_1 {
  background-color: rgba(135, 0, 102, 1);
  color: #fff;
  text-align: center;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.text-wrapper_2 {
  background-color: rgba(255, 255, 255, 1);
  color: rgba(135, 0, 102, 1); /* 字体颜色设置为紫色 */
  text-align: center;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid rgba(135, 0, 102, 1); /* 添加紫色边框 */
}

.text_4 {
  font-size: 16px; /* 字体大小 */
  color: rgba(135, 0, 102, 1); /* 字体颜色设置为紫色 */
}
</style>