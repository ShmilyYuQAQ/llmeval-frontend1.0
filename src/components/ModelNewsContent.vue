<template>
  <div class="page-container">
    <NavBar />
    <div class="text-wrapper_2 flex-col">
      <div>
        <span class="text_7">新闻资讯</span>
      </div>
      <div>
        <span class="text_8">关注最新新闻资讯，了解行业尖端创新</span>
      </div>
    </div>
    <div class="main-content">
      <!-- 新闻列表 -->
      <div class="group_2 flex-col justify-between">
        <div
          class="box_2 flex-col"
          v-for="news in paginatedNews"
          :key="news.id"
          @click="handleClick(news.url)"
        >
          <div class="text-group_1 flex-col justify-between">
            <span class="text_9">{{ news.title }}</span>
            <span class="text_10">{{ news.description }}</span>
          </div>
          <span class="text_11">{{ news.publisher }}丨{{ news.publishDate }}</span>
        </div>
      </div>

      <!-- 分页 -->
      <div class="group_3 flex-row">
        <button class="pagination-button" @click="loadLastPage" :disabled="currentPage === 1">上一页</button>
        <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
        <button class="pagination-button" @click="loadNextPage" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import NavBar from "./guidePage/NavBar.vue";

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
    const response = await axios.get("http://49.233.82.133:9091/modelInfo/all");
    if (response.data.success) {
      newsItems.value = response.data.data.sort(
        (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
      );
    } else {
      console.error("Error fetching news:", response.data.errorMsg);
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

const handleClick = (url) => {
  console.log("Opening URL:", url); // 打印 URL
  if (url) {
    window.open(url, "_blank");
  } else {
    console.error("URL is undefined or null");
  }
};

onMounted(fetchNews);

</script>

<style scoped>

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.text-wrapper_2 {
  background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/020169b56f4e4d209b4ded3c2aa3db4f_mergeImage.png);
  width: 100%; /* 宽度与父容器一致 */
  max-width: 1440px; /* 可选：设置最大宽度，防止过宽 */
  height: 190px;
  background-size: cover; /* 确保图片覆盖整个容器 */
  background-position: center; /* 将背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: center; /* 垂直方向居中 */
  align-items: flex-start; /* 水平方向靠左对齐 */
  padding-left: 145px; /* 设置左侧内边距 */
  margin: 0 auto; /* 水平居中 */
}

.text_7 {
  font-size: 32px;
  font-weight: 500;
  color: rgba(135, 0, 102, 1);
  margin-bottom: 10px; /* 添加下边距 */
}

.text_8 {
  font-size: 14px;
  color: rgba(30, 36, 55, 1);
}

.group_2 {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.box_2 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%; /* 设置宽度为父容器的 80% */
  margin: 0 auto; /* 让框水平居中 */
  border: 1px solid transparent; /* 默认边框透明 */
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* 添加过渡效果 */
}

.box_2:hover {
  border-color: rgba(135, 0, 102, 1); /* 鼠标悬停时边框变为紫色 */
  box-shadow: 0 4px 8px rgba(135, 0, 102, 0.2); /* 鼠标悬停时增加阴影 */
  cursor: pointer; /* 鼠标变为手指 */
}

.text-group_1 {
  margin-bottom: 10px;
}

.text_9 {
  font-size: 18px;
  font-weight: 600;
  color: rgba(34, 34, 34, 1);
  transition: color 0.3s ease; /* 添加过渡效果 */
}

.box_2:hover .text_9 {
  color: rgba(135, 0, 102, 1); /* 鼠标悬停时标题变为紫色 */
}

.text_10 {
  font-size: 14px;
  color: rgba(89, 95, 110, 1);
  text-align: justify;
}

.text_11 {
  font-size: 12px;
  color: rgba(89, 95, 110, 1);
}

.group_3 {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination-button {
  padding: 8px 12px;
  background-color: rgba(135, 0, 102, 1);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>