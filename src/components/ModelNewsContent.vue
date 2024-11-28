<template>
  <NavBar></NavBar>
  <div class="main-content">
    <div class="model-info-container">
      <div class="title">相关新闻资讯:</div>
      
      <div class="news-item" v-for="news in newsItems" :key="news.id">
        <div>
          <a :href="news.link" target="_blank" class="news-content">{{ news.content }}</a>
          <div class="news-source">{{ news.source }}</div>
        </div>
        <div class="news-date">{{ news.date }}</div>
      </div>
      
      <div class="pagination">
        <button class="last-page" @click="loadLastPage">上一页</button>
        第1页，共1页
        <button class="next-page" @click="loadNextPage">下一页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './guidePage/NavBar.vue';
const newsItems = ref([
  { id: 1, link: 'https://cloud.tencent.com/', content: 'vivo发布全新蓝心大模型矩阵推出30亿参数3B端侧大模型', source: '腾讯云', date: '2024-10' },
  { id: 2, link: 'https://equal-eval-public.com/ranking', content: 'EqualEval大模型语音能力排行榜首期揭晓！', source: 'EqualEval公能中文大模型排行榜公众号', date: '2024-09' },
  { id: 3, link: 'https://equal-eval-public.com/ranking', content: 'EqualEval公能中文大模型排行榜发布', source: 'EqualEval公能中文大模型排行榜公众号', date: '2024-09' },
  { id: 4, link: 'https://software.nankai.edu.cn/', content: 'EqualEval公能中文大模型排行榜发布', source: '南开大学软件学院', date: '2024-09' },
  { id: 5, link: 'https://news.nankai.edu.cn/', content: 'EqualEval公能中文大模型排行榜发布', source: '南开新闻网', date: '2024-09' },
  { id: 6, link: 'https://search-ai.com/ranking', content: '2024年9月AI大模型排行榜 — 开搜AI免费问答搜索', source: '开搜AI', date: '2024-09' }
])

const loadNextPage = () => {
  // 加载下一页的逻辑
  console.log('加载下一页');
};

const loadLastPage = () => {
  // 加载上一页的逻辑
  console.log('加载上一页');
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
}
.title {
  font-size: 24px;
  font-weight: bold;
  color: purple;
  margin-bottom: 20px;
  margin-left: 300px;
}
.news-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  width: 60%; /* 设置宽度为100% */
  margin-left: 300px;
  margin-right: 300px;
}
.news-item:last-child {
  border-bottom: none;
}
.news-content {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}
.news-content:hover {
  color: #1a73e8;
  text-decoration: underline;
}
.news-source {
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}
.news-date {
  font-size: 14px;
  color: #666;
}
.pagination {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  margin-top: 20px;
  font-size: 14px;
  color: #888;
  margin-left: 600px;
}
.pagination button {
  background-color: #e9ecf0;
  border: none;
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
  color: #0c0b13;
}
.next-page {
  margin-right: 20px; /* 将按钮向右移动一定的距离 */
  background-color: #1a73e8;
  color: white;
}
.last-page {
  background-color: #1a73e8;
  color: white;
}

</style>