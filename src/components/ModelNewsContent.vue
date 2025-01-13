<template>
  <NavBar></NavBar>
  <div class="main-content">
    <div class="model-info-container">
      <br>
      <div class="title">相关新闻资讯:</div>
      
      <div class="news-item" v-for="news in paginatedNews" :key="news.id">
        <div>
          <a :href="news.url" target="_blank" class="news-content">{{ news.title }}</a>
          <div class="news-source">{{ news.publisher }}</div>
        </div>
        <div class="news-date">{{ news.publishDate }}</div>
      </div>
      
      <div class="pagination">
        <button class="last-page" @click="loadLastPage" :disabled="currentPage === 1">上一页</button>
        第{{ currentPage }}页，共{{ totalPages }}页
        <button class="next-page" @click="loadNextPage" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import NavBar from './guidePage/NavBar.vue';

const newsItems = ref([]);
const currentPage = ref(1);
const pageSize = 6;

const totalPages = computed(() => {
  return Math.ceil(newsItems.value.length / pageSize);
});

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return newsItems.value.slice(start, end);
});

const loadNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const loadLastPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const fetchNews = async () => {
  try {
    const response = await axios.get('http://49.233.82.133:9091/modelInfo/all');
    if (response.data.success) {
      newsItems.value = response.data.data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    } else {
      console.error('Error fetching news:', response.data.errorMsg);
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

onMounted(fetchNews);
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
  text-align: left; /* 左对齐 */
  width: 70%; /* 与新闻内容宽度一致 */
  padding-left: 0px; /* 添加左侧内边距 */
  margin: 0 auto; /* 水平居中对齐 */
  margin-bottom: 10px;
}

.model-info-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 垂直居中对齐 */
  width: 100%; /* 设置宽度 */
  margin: 0 auto; /* 水平居中对齐 */
}

.news-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  width: 70%; /* 设置宽度为70% */
  margin: 0 auto; /* 水平居中对齐 */
}
.news-item:last-child {
  border-bottom: none;
}
.news-content {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  max-width: 80%; /* 设置最大宽度 */
  word-wrap: break-word; /* 必要时换行 */
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
  width: 13%; /* 设置固定宽度 */
  text-align: right; /* 右对齐 */
}
.pagination {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  margin-top: 20px;
  font-size: 14px;
  color: #888;

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