<template>
  <div class="register-overlay">
    <div class="box_1 flex-col">
      <span class="close-button" @click="$emit('close')">×</span>
      <span class="text_1">请选择举报理由</span>
      <el-radio-group v-model="radio" class="report-radio-group">
        <div>
          <span class="text_51">违反法律法规</span>
          <div class="radio-row">
            <el-radio :label="1">违法违规</el-radio>
            <el-radio :label="2">色情</el-radio>
            <el-radio :label="3">低俗</el-radio>
            <el-radio :label="4">赌博诈骗</el-radio>
            <el-radio :label="5">违法信息外链</el-radio>
          </div>
        </div>
        <div>
          <span class="text_51">谣言类不实信息</span>
          <div class="radio-row">
            <el-radio :label="6">涉政谣言</el-radio>
            <el-radio :label="7">虚假不实信息</el-radio>
            <el-radio :label="8">涉社会事件谣言</el-radio>
          </div>
        </div>
        <div>
          <span class="text_51">侵犯个人权益</span>
          <div class="radio-row">
            <el-radio :label="9">人身攻击</el-radio>
            <el-radio :label="10">侵犯隐私</el-radio>
          </div>
        </div>
        <div>
          <span class="text_51">有害社区环境</span>
          <div class="radio-row">
            <el-radio :label="11">青少年不良信息</el-radio>
            <el-radio :label="12">垃圾广告</el-radio>
            <el-radio :label="13">刷屏</el-radio>
            <el-radio :label="14">引战</el-radio>
            <el-radio :label="15">其他</el-radio>
          </div>
        </div>
        <div v-if="radio === 15" class="other-reason-row">
          <el-input
            v-model="otherReason"
            placeholder="请填写举报理由"
            clearable
            maxlength="100"
            show-word-limit
          />
        </div>
      </el-radio-group>
      <div class="text-wrapper_1 flex-col" @click="submitReport">
        <span class="text_3">提交举报</span>
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
    props: {
    commentId: {
      type: [String, Number],
      required: true
    },
    username: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      radio: null,
      otherReason: "",
    };
  },
  methods: {
    async submitReport() {
      if (this.radio === null) {
        alert("请选择举报理由");
        return;
      }
      const reportData = {
        reason: this.radio,
        otherReason: this.radio === 15 ? this.otherReason : "",
      };
      console.log("Submitting report with data:", reportData);
      try {
        console.log("Submitting report with data:", reportData);
        const response = await axios.post("/api/report", reportData);
        if (response.data.success) {
          this.$message.success("举报成功");
          this.$emit("close");
        } else {
          this.$message.error("举报失败，请稍后再试");
        }
      } catch (error) {
        console.error("Error submitting report:", error);
        this.$message.error("网络错误，请稍后再试");
      }
    },
  },
}
    
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
  width: 430px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.995) -50px;
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
  font-size: 18px;
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

.text_51 {
  width: 35px;
  height: 20px;
  overflow-wrap: break-word;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin-left: 5px;
}

.report-radio-group > div {
  margin-bottom: 10px;
  display: block; /* 让标题和选项分两行 */
}
.report-radio-group .text_51 {
  min-width: 90px;
  margin-right: 10px;
  font-weight: bold;
}

.radio-row {
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.other-reason-row {
  margin-top: 10px;
  width: 100%;
}
</style>