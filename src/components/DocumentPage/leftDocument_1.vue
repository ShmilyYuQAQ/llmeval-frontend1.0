<template>
  <div class="left-content">
    <div v-if="loadingPapers" class="loading">加载中...</div>
    <div v-else-if="papers.length" class="paper-list">
      <div v-for="paper in papers" :key="paper.id" class="paper-item">
        <div class="paper-header">
          <span class="paper-title">{{ paper.title }}</span>
          <div class="paper-actions">
            <span class="upvote" @click="handleUpvote(paper)">
              ▲ Upvote {{ paper.upvotes }}
            </span>
            <a :href="paper.github" target="_blank" class="github">
              <span>GitHub</span> ★ {{ paper.stars }}
            </a>
            <a :href="paper.arxivUrl" target="_blank" class="arxiv">
              X arXiv Page
            </a>
          </div>
        </div>
        <div class="paper-abstract">{{ paper.abstract }}</div>
        <div class="paper-meta">
          <span>{{ paper.authors.join(" • ") }}</span>
          <span> • Published on {{ paper.date }}</span>
        </div>
        <img
          v-if="paper.imageUrl"
          :src="paper.imageUrl"
          alt="Paper Image"
          class="paper-image"
        />
      </div>
    </div>
    <div v-else class="no-data">暂无论文</div>
  </div>
</template>
<!--
接口返回示例（http://localhost:8080/api/articles）:

[
  {
    "id": 1,
    "title": "大模型推荐与评测",
    "summary": "本文介绍了大模型推荐系统的核心设计理念……",
    "author": "张三",
    "date": "2025-08-20"
  },
  {
    "id": 2,
    "title": "微服务监控与故障检测",
    "summary": "基于 Prometheus + Grafana 的微服务监控实践……",
    "author": "李四",
    "date": "2025-08-21"
  }
]
-->
<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "LeftDocument",
  setup() {
    const papers = ref([]);
    const loadingPapers = ref(true);

    // 加载论文列表
    const fetchPapers = async () => {
      try {
        const response = await axios.get("http://your-backend.com/api/papers");
        papers.value = response.data.map((paper) => ({
          id: paper.id,
          title: paper.title,
          abstract: paper.abstract,
          authors: paper.authors || ["Unknown Author"],
          date: paper.date || new Date().toISOString().split("T")[0],
          upvotes: paper.upvotes || 0,
          stars: paper.stars || 0,
          github: paper.github || "#",
          arxivUrl: paper.arxivUrl || "#",
          imageUrl: paper.imageUrl || "",
        }));
      } catch (error) {
        console.error("加载论文失败:", error);
        papers.value = [];
      } finally {
        loadingPapers.value = false;
      }
    };

    // 点赞
    const handleUpvote = async (paper) => {
      try {
        const res = await axios.post(
          `http://your-backend.com/api/papers/${paper.id}/upvote`
        );
        if (res.data.success) {
          paper.upvotes += 1; // 前端立即更新
        }
      } catch (error) {
        console.error("点赞失败:", error);
      }
    };

    onMounted(fetchPapers);

    return {
      papers,
      loadingPapers,
      handleUpvote,
    };
  },
};
</script>

<style scoped>
.paper-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.paper-item {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
  background-color: #fff;
}
.paper-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}
.paper-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
.paper-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.upvote {
  color: #666;
  font-size: 14px;
  cursor: pointer;
}
.upvote:hover {
  color: #870066;
}
.github,
.arxiv {
  color: #1a0dab;
  text-decoration: none;
  font-size: 14px;
}
.github:hover,
.arxiv:hover {
  text-decoration: underline;
}
.paper-abstract {
  font-size: 14px;
  color: #444;
  margin-bottom: 10px;
  line-height: 1.5;
}
.paper-meta {
  font-size: 12px;
  color: #777;
}
.paper-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 4px;
}
.loading {
  text-align: center;
  padding: 20px;
  color: #870066;
}
.no-data {
  text-align: center;
  padding: 20px;
  color: #999;
}
</style>
