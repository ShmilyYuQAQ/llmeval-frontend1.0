<template>
  <div class="main-content">
    <div class="content">
      <div class="header">
        <input type="text" placeholder="请输入内容...">
        <button>搜索</button>
        <div class="user-info">
          <img :src="userAvatarUrl" alt="User" width="40">
        </div>
      </div>
      
      <h2>全部模型</h2>
      
      <!-- 条件勾选模块 -->
      <div class="filter-options1">
        <label>全部功能&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <label><input type="checkbox" name="option1">全选</label>
      </div>
      <div class="filter-options2">
        <label>是否开源&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <label><input type="checkbox" name="option1"> 开源</label>
        <label><input type="checkbox" name="option2"> 不开源</label>
      </div>
      <div class="filter-options3">
        <label>自然语言处理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <label><input type="checkbox" name="option1"> 全部</label>
        <label><input type="checkbox" name="option2"> 文本分类</label>
        <label><input type="checkbox" name="option3"> 文本生成</label>
        <label><input type="checkbox" name="option4"> 翻译</label>
      </div>
      <div class="filter-options4">
        <label>语言&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <label><input type="checkbox" name="option1"> 全部</label>
        <label><input type="checkbox" name="option2"> 语音识别</label>
        <label><input type="checkbox" name="option3"> 语音合成</label>
        <label><input type="checkbox" name="option4"> 语音降噪</label>
      </div>
      <div class="filter-options5">
        <label>多模态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <label><input type="checkbox" name="option1"> 全部</label>
        <label><input type="checkbox" name="option2"> 图像描述</label>
        <label><input type="checkbox" name="option3"> 视频描述</label>
        <label><input type="checkbox" name="option4"> 文生图</label>
        <label><input type="checkbox" name="option5"> 视频问答</label>
      </div>
      <div class="filter-options6">
        <label>年份&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <label><input type="checkbox" name="option1"> 全部</label>
        <label><input type="checkbox" name="option2"> 2024</label>
        <label><input type="checkbox" name="option3"> 2023</label>
        <label><input type="checkbox" name="option4"> 2022</label>
        <label><input type="checkbox" name="option5"> 2021</label>
      </div>

      <!-- 模型推荐区域 -->
      <div class="models">
        <div class="model-card" v-for="model in models" :key="model.name">
          <img :src="model.url" :alt="model.name" width="40">
          <h3>{{ model.name }}</h3>
          <p>{{ model.updateDate }}更新</p>
          <button @click="goToDetail(model.name)">详细信息</button>
        </div>
      </div>
    </div>

    <!-- 右侧最新资讯与推荐区域 -->
    <div class="sidebar-right">
      <div class="recommend-box">
        <h3>最新资讯</h3>
        <button class="model-item" @click="goToNews">
          <span>2024中国高校计算机视觉AIGC创新竞赛已开始报名</span>
          <span class="heart-icon" @click="toggleHeart">&#10084;</span>
          <span class="like-count">78</span>
          <br><br>
          <span>2024.04.08发布</span>
        </button>
        <!-- 可以添加更多的模型推荐项 -->
      </div>
      <div class="recommend-box">
        <h3>模型推荐</h3>
        <button class="model-item">
          <span>whisper-large-v3-turbo</span>
          <span class="heart-icon" @click="toggleHeart">&#10084;</span>
          <span class="like-count">78</span>
          <br><br>
          <span>By OpenAI</span>
        </button>
        <!-- 可以添加更多的模型推荐项 -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import userAvatarUrl from '/icons/user-avatar.png?url';
import model1Url from '/icons/model1.png?url';
import model2Url from '/icons/model2.png?url';

const router = useRouter();

const models = shallowRef([
  { name: 'GOT-OCR2_0', url: model1Url, updateDate: '2024.09.25' },
  { name: 'Qwen2.5-T2B-Instruct', url: model2Url, updateDate: '2024.09.19' },
  // 其他模型数据
]);

const toggleHeart = (event) => {
  event.target.classList.toggle('red');
};

const goToDetail = (modelName) => {
  console.log('Navigating to detail page for model:', modelName);
  router.push({ name: 'ModelDetail', params: { modelName } });
};

const goToNews = () => {
  window.open('https://cs.nankai.edu.cn/info/1039/3642.htm', '_blank');
};
</script>

<style scoped>
.main-content {
  display: flex;
  flex-grow: 1;
}
.content {
  flex-grow: 1;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.header input[type="text"] {
  padding: 10px;
  font-size: 16px;
  width: 300px; /* 设置搜索框宽度 */
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.header button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.header button:hover {
  background-color: #0056b3;
}
.user-info {
  position: absolute;
  right: 0; /* 将用户头像移至右侧 */
}
/* 模型推荐卡片 */
.models {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}
.model-card {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.model-card img {
  width: 100%;
  border-radius: 10px;
}
.model-card h3 {
  font-size: 16px;
  margin: 10px 0;
}
.model-card p {
  font-size: 14px;
  color: gray;
}
/* 右侧最新资讯与推荐区域 */
.sidebar-right {
  width: 250px; /* 设置宽度 */
  height: 120%; /* 设置高度 */
  padding: 20px;
  background-color: #f1f3fa;
  flex-shrink: 0; /* 防止侧边栏缩小 */
  position: absolute; /* 使其绝对定位 */
  right: 0; /* 靠右 */
  top: 0; /* 从顶部开始 */
}
.update-box {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.update-box h3 {
  font-size: 20px;
  margin-bottom: 10px;
}
.update-box .news-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  width: 100%; /* 确保文本框宽度 */
}
.recommend-box {
  margin-top: 20px;
}
.recommend-box h3 {
  font-size: 20px;
  margin-bottom: 10px;
}
.recommend-box .model-item {
  border: 1px solid #ccc;
  padding: 20px; /* 增大按钮的内边距 */
  margin-bottom: 10px;
  background-color: #fff;
  width: 100%; /* 确保按钮宽度 */
  display: block; /* 确保内容换行 */
  text-align: left; /* 左对齐文本 */
  cursor: pointer;
  background-color: #f9f9f9;
}
.recommend-box .model-item:hover {
  background-color: #e0e0e0;
}
.recommend-box .model-item span:first-child {
  font-weight: bold; /* 加粗文本 */
}
.heart-icon {
  color: gray;
  cursor: pointer;
  margin-left: 10px;
}
.heart-icon.red {
  color: red;
}
.like-count {
  margin-left: 5px;
  font-size: 14px;
  color: gray;
}
</style>