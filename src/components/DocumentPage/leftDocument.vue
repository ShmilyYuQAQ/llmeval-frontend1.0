<template>
  <div class="left-content">
    <div v-if="loadingPapers" class="loading">加载中...</div>
    <div v-else-if="papers.length" class="paper-list">
      <div v-for="paper in papers" :key="paper.id" class="paper-item">
  <div class="paper-content">
    <img
      v-if="paper.imageUrl"
      :src="paper.imageUrl"
      alt="Paper Image"
      class="paper-image"
    />
    <div class="paper-info">
      <div class="paper-header">
        <span class="paper-title">{{ paper.title }}</span>
        <div class="paper-actions">
          <span class="upvote" @click="handleUpvote(paper)">
            ▲ Upvote {{ paper.upvotes }}
          </span>
          <a :href="paper.github" target="_blank" class="github">
            <span>GitHub</span> 
          </a>
          <a :href="paper.arxivUrl" target="_blank" class="arxiv">
            X arXiv Page
          </a>
          <a :href="paper.webUrl" target="_blank" class="webUrl">
            网站
          </a>
        </div>
      </div>
      <div class="paper-abstract">{{ paper.abstract }}</div>
      <div class="paper-tags">
        <span class="tag" v-for="(t, index) in paper.tag.split(',')" :key="index">{{ t }}</span>
      </div>
      <div class="paper-meta">
        <span>{{ paper.authors.join(" • ") }}</span>
        <span> • Published on {{ paper.date }}</span>
      </div>
    </div>
  </div>
</div>

    </div>
    <div v-else class="no-data">暂无论文</div>
  </div>
</template>


<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import orderData from "./json/data.json";
import testImg from './images/test1.png';
import testImg2 from './images/test2.png';
export default {
  name: "LeftDocument",
  setup() {
    const papers = ref([]);
    const loadingPapers = ref(true);

    // Mock 数据
    const mockPapers = [
      {
        id: 1,
        title: "Physics: Benchmarking Foundation Models for PhD-Qualifying Exam Physics Problem Solving",
        imageUrl: testImg,
        abstract: "基于物理问题对基础模型进行基准测试，并包含评估指标。",
        tag: "物理,基础模型",
        authors: ["Kaiyue Feng，Yilun Zhao, Yixin Liu, Tianyu Yang, Chen Zhao, John Sous, Arman Cohan"],
        date: "2025-05-05",
        upvotes: 0,
        github: "https://github.com/yale-nlp/Physics",
        arxivUrl: "https://openreview.net/forum?id=ssCw35Jl44",
      },
      {
        id: 2,
        title: "ProBench: Judging Multimodal Foundation Models on Open-ended Multi-domain Expert Tasks",
        imageUrl: testImg2,
        abstract: "对多模态模型在专家任务上进行基准测试，与性能排行榜相关。",
        tag: "多模态模型,专家任务",
        authors: ["Yan Yang, Dongxu Li, Haoning Wu, Bei Chen, Liu Liu, Liyuan Pan, Junnan Li"],
        date: "2025-08-21",
        upvotes: 0,
        github: "https://github.com/Yan98/ProBench_eval",
        arxivUrl: "https://arxiv.org/pdf/2503.06885",
        webUrl: "https://yan98.github.io/ProBench/index.html#leaderboard"
        
      },
    ];

    // 加载论文列表
    const fetchPapers = async () => {
      try {
        const response = await axios.get("http://your-backend.com/api/papers");
        papers.value = response.data.map((paper) => ({
          id: paper.id,
          title: paper.title,
          imageUrl: paper.imageUrl || "",
          abstract: paper.abstract,
          tag: paper.tag || "未分类",
          authors: paper.authors || ["Unknown Author"],
          date: paper.date || new Date().toISOString().split("T")[0],
          upvotes: paper.upvotes || 0,
          github: paper.github || "#",
          arxivUrl: paper.arxivUrl || "#",
          webUrl: paper.webUrl || "#",
        }));
      } catch (error) {
        console.error("加载论文失败，使用 Mock 数据:", error);
        papers.value = mockPapers; // 🔹接口失败时用假数据
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
.arxiv,
.webUrl {
  color: #1a0dab;
  text-decoration: none;
  font-size: 14px;
}
.github:hover,
.arxiv:hover,
.webUrl:hover {
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
.paper-tags {
  margin-bottom: 10px;
}
.tag {
  display: inline-block;
  background-color: #f0f0f0;
  color: #555;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  margin-right: 6px;
  margin-bottom: 4px;
}
.tag:hover {
  background-color: #870066;
  color: #fff;
}
.paper-item {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
  background-color: #fff;
}

.paper-content {
  display: flex;
  gap: 15px;
}

.paper-image {
  width: 150px; /* 左侧固定宽度 */
  height: auto;
  border-radius: 4px;
  flex-shrink: 0;
}

.paper-info {
  flex: 1; /* 右侧占剩余空间 */
  display: flex;
  flex-direction: column;
}

</style>

