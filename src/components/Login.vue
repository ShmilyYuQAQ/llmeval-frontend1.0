<template>
  <div class="page flex-col">
    <div class="section_1 flex-col">
      <div class="group_1 flex-col">
          <div v-if="isPasswordLogin === false" class="block_1 flex-col">
            <img
              class="label_1"
              referrerpolicy="no-referrer"
              src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPng47638b1da138cee666907d5f65204bf4414946d26c4bab281ee9f431085aeb3c"
            />
            <span class="paragraph_1" @click="switchToPasswordLogin">账号密码<br />登录</span>
          </div>
          <div v-else class="block_1 flex-col">
            <img
              class="label_1"
              referrerpolicy="no-referrer"
              src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPng8ef6dcfe1594c288cd5fc1f965dcc08133d91cf095a4c0c4627924e9759a1c0f"
            />
            <span class="paragraph_1" @click="switchToVerificationLogin">验证码<br />登录</span>
          </div>
          <div v-if="isPasswordLogin">
            <PasswordLogin />
          </div>
        <div v-else>
            <div class="image-text_1 flex-row justify-between">
              <!-- 欢迎登录 -->
              <div class="text-group_1 flex-col justify-between">
                <span class="text_1">HI！欢迎登录</span>
                <span class="text_2">琅琊海评</span>
              </div>
            </div>
          <!-- 输入手机号 -->
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
                placeholder="请输入手机号"
                v-model="phone"
              />
            </div>
          </div>

          <!-- 输入验证码 -->
          <div class="block_3 flex-row">
            <div class="image-text_3 flex-row align-center">
              <img
                class="thumbnail_2"
                referrerpolicy="no-referrer"
                src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPng132721bb3bfcd9776b3fa2fa15eb3e516af67531bdcb1b5c3afe77653b9c6404"
              />
              <input
                class="text-group_3"
                type="text"
                placeholder="请输入验证码"
                v-model="verificationCode"
              />
            </div>
            <span
              class="text_3"
              :class="{ disabled: isSendingCode }"
              :disabled="isSendingCode"
              @click="sendVerificationCode(phone)"
            >
              {{ isSendingCode ? `${countdown}s 后重新发送` : '发送验证码' }}
            </span>
          </div>

          <!-- 登录按钮 -->
          <div class="text-wrapper_1 flex-col" @click="handleLogin">
            <button class="text_4">登&nbsp;&nbsp;&nbsp;录</button>
          </div>

          <!-- 协议 -->
          <div class="image-text_4 flex-row justify-between">
            <input
              type="checkbox"
              id="agreement"
              class="checkbox_3"
              v-model="isAgreed"
            />
            <label for="agreement" class="text-group_4">
              <span class="text_5">
                未注册的手机号验证并登录后将自动完成注册。注册即代表您同意并接受
              </span>
              <a href="/琅琊海评平台服务协议.pdf" target="_blank" class="text_6">《琅琊海评平台服务协议》</a>
              <a href="/《琅琊海评个人信息保护政策》.pdf" target="_blank" class="text_6">《琅琊海评个人信息保护政策》</a>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Footer from "./Footer.vue";
import PasswordLogin from "./LoginPage/passwordLogin.vue"; // 引入密码登录组件
export default {
  data() {
    return {
      phone: "", // 手机号
      verificationCode: "", // 验证码
      isSendingCode: false, // 是否正在发送验证码
      countdown: 60, // 验证码倒计时
      isAgreed: false, // 是否同意协议
      isPasswordLogin: false, // 是否切换到账号密码登录
    };
  },
  components: {
    Footer,
    PasswordLogin, // 注册密码登录组件
  },
  methods: {
    // 切换到账号密码登录
    switchToPasswordLogin() {
      this.isPasswordLogin = true;
    },

    // 切换到验证码登录
    switchToVerificationLogin() {
      this.isPasswordLogin = false;
    },

    // 登录处理
    async handleLogin() {
      console.log("当前登录方式:", this.isPasswordLogin ? "账号密码登录" : "验证码登录");
      // 验证码登录
      if (!this.isPasswordLogin) {
        if (!this.phone || !this.verificationCode) {
          alert("请输入手机号和验证码！");
          return;
        }
        if (!this.isAgreed) {
          alert("请同意服务协议和隐私政策！");
          return;
        }
        try {
          const response = await axios.post("http://49.233.82.133:9091/user/login/", {
            phone: this.phone,
            code: this.verificationCode,
          });
          const data = response.data;
          if (data.success) {
            alert("登录成功！");
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("userName", data.data.userName);
            window.location.href = "/";
          } else {
            alert(data.errorMsg || "登录失败，请检查手机号和验证码！");
          }
          }catch (error) {
            alert("网络错误或后端异常，请稍后再试");
            console.error(error);
          }
        }
      // 密码登录
      else {
        this.$refs.passwordLogin.handleLogin(); // 调用密码登录组件的方法
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
  },
};
</script>

<style scoped>
.page {
  background-color: rgba(248, 249, 251, 1);
  position: relative;
  width: auto;
  height: auto;
  overflow: hidden;
  margin: 0; /* 移除默认外边距 */
  padding: 0; /* 移除默认内边距 */
}

.section_1 {
  background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/45006df7cce64cb7a3510e61fd9cab90_mergeImage.png);
  width: 100%;
  height: 772px;
  background-size: cover; /* 确保图片覆盖整个容器 */
  background-position: center; /* 将背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  margin: 0; /* 移除外边距 */
  padding: 0; /* 移除内边距 */
  display: flex; /* 保持子元素的布局 */
  flex-direction: column; /* 垂直排列子元素 */
}

.group_1 {
  width: 430px;
  height: 500px;
  background: rgba(255, 255, 255, 0.755) -32px -32px
    no-repeat;
  background-size: 500px 560px;
  margin: 145px 0 0 1000px;
  position: relative; /* 设置为相对定位，方便子元素绝对定位 */
  border-radius: 8px;
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
  height: auto;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 28px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  line-height: 40px;
  margin-top: 15px;
  margin-left: 40px;
}

.block_1 {
  width: 72px;
  height: 95px;
  background: url('@/assets/images/矩形.png')
  100% no-repeat;
  background-size: 100% 100%;
  margin-left: 325px;
  display: flex; /* 添加 flex 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 水平居中对齐 */
  justify-content: center; /* 垂直居中对齐 */
  position: absolute; /* 绝对定位 */
  z-index: 10; /* 确保浮于其他组件上方 */
  cursor: pointer; /* 鼠标悬停时显示手指 */
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
}
</style>