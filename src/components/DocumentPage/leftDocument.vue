<template>
  <div class="left-content">
    <div v-if="loadingPapers" class="loading">加载中...</div>
    <div v-else-if="totalPapers > 0" class="paper-list">
      <!-- 渲染当前页的论文数据（不是全部数据） -->
      <div v-for="paper in currentPagePapers" :key="paper.id" class="paper-item">
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
              <span
                class="tag"
                v-for="(t, index) in paper.tag.split(',')"
                :key="index"
                >{{ t.trim() }}</span
              >
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

    <!-- 分页器：优化布局和绑定 -->
  <div class="pagination-container">
    <el-pagination
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalPapers" 
      layout="prev, pager, next, ->" 
      @current-change="handleCurrentChange" 
      @size-change="handleSizeChange"
      class="custom-pagination"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import testImg from "./images/test1.png";
import testImg2 from "./images/test2.png";

export default {
  name: "LeftDocument",
  setup() {
    const allPapers = ref([]); // 存储所有论文（不分页）
    const loadingPapers = ref(true);
    const currentPage = ref(1); // 当前页码
    const pageSize = ref(6); // 每页条数

    // 总数据条数（计算属性）
    const totalPapers = computed(() => allPapers.value.length);

    // 当前页显示的论文（计算属性：根据当前页和每页条数截取数据）
    const currentPagePapers = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize.value;
      const endIndex = startIndex + pageSize.value;
      return allPapers.value.slice(startIndex, endIndex);
    });

    // 切换页码
    const handleCurrentChange = (page) => {
      currentPage.value = page;
      // 滚动到顶部（优化体验）
      document.querySelector(".left-content").scrollTop = 0;
    };

    // 切换每页条数
    const handleSizeChange = (size) => {
      pageSize.value = size;
      currentPage.value = 1; // 重置为第一页
    };

    // Mock 数据
    const mockPapers = [
      {
        id: 1,
        title: "Physics: Benchmarking Foundation Models for PhD-Qualifying Exam Physics Problem Solving",
        imageUrl: testImg,
        abstract: "基于物理问题对基础模型进行基准测试，并包含评估指标。",
        tag: "物理,基础模型",
        authors: ["Kaiyue Feng", "Yilun Zhao", "Yixin Liu", "Tianyu Yang", "Chen Zhao", "John Sous", "Arman Cohan"],
        date: "2025-05-05",
        upvotes: 0,
        github: "https://github.com/yale-nlp/Physics",
        arxivUrl: "https://openreview.net/forum?id=ssCw35Jl44",
        webUrl: "#",
      },
      {
        id: 2,
        title: "ProBench: Judging Multimodal Foundation Models on Open-ended Multi-domain Expert Tasks",
        imageUrl: testImg2,
        abstract: "对多模态模型在专家任务上进行基准测试，与性能排行榜相关。",
        tag: "多模态模型,专家任务",
        authors: ["Yan Yang", "Dongxu Li", "Haoning Wu", "Bei Chen", "Liu Liu", "Liyuan Pan", "Junnan Li"],
        date: "2025-08-21",
        upvotes: 0,
        github: "https://github.com/Yan98/ProBench_eval",
        arxivUrl: "https://arxiv.org/pdf/2503.06885",
        webUrl: "https://yan98.github.io/ProBench/index.html#leaderboard",
      },
      // 新增几条 Mock 数据用于测试分页
      {
        id: 3,
        title: "Large Language Models for Scientific Discovery",
        imageUrl: "",
        abstract: "探索大语言模型在科学发现中的应用，包括假设生成、实验设计和结果分析。",
        tag: "大语言模型,科学发现",
        authors: ["Alice Smith", "Bob Johnson", "Charlie Brown"],
        date: "2025-07-15",
        upvotes: 5,
        github: "#",
        arxivUrl: "https://arxiv.org/pdf/2507.01234",
        webUrl: "#",
      },
      {
        id: 4,
        title: "Multimodal AI for Medical Image Analysis",
        imageUrl: "",
        abstract: "结合文本、图像和临床数据的多模态AI模型，用于医学影像诊断和疾病预测。",
        tag: "多模态AI,医学影像",
        authors: ["David Lee", "Eve Wilson", "Frank Martinez"],
        date: "2025-06-30",
        upvotes: 3,
        github: "#",
        arxivUrl: "https://arxiv.org/pdf/2506.07890",
        webUrl: "#",
      },
      {
        id: 5,
        title: "Reinforcement Learning for Autonomous Systems",
        imageUrl: "",
        abstract: "强化学习在自动驾驶、机器人导航等自主系统中的最新研究进展和应用案例。",
        tag: "强化学习,自主系统",
        authors: ["Grace Kim", "Henry Taylor", "Ivy Davis"],
        date: "2025-09-01",
        upvotes: 8,
        github: "#",
        arxivUrl: "https://arxiv.org/pdf/2509.00123",
        webUrl: "#",
      },
      {
        id: 6,
        title: "Federated Learning for Privacy-Preserving AI",
        imageUrl: "",
        abstract: "联邦学习框架设计与优化，实现隐私保护的分布式AI模型训练。",
        tag: "联邦学习,隐私保护",
        authors: ["Jack Wilson", "Julia Brown", "Kevin Miller"],
        date: "2025-08-10",
        upvotes: 4,
        github: "#",
        arxivUrl: "https://arxiv.org/pdf/2508.04567",
        webUrl: "#",
      },
      {
        id: 7,
        title: "Explainable AI in Financial Risk Prediction",
        imageUrl: "",
        abstract: "可解释AI模型在金融风险评估中的应用，提升模型透明度和可信度。",
        tag: "可解释AI,金融风险",
        authors: ["Lisa Garcia", "Mike Robinson", "Nancy Taylor"],
        date: "2025-07-20",
        upvotes: 2,
        github: "#",
        arxivUrl: "https://arxiv.org/pdf/2507.06789",
        webUrl: "#",
      },
    ];
   
    // 加载论文列表
    const fetchPapers = async () => {
      try {
        const response = await axios.get("http://49.233.82.133:9091/paper/list");
        console.log("加载论文成功:", response.data.data);
        // 存储所有数据到 allPapers（不分页）
        allPapers.value = response.data.data.map((paper) => ({
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
        allPapers.value = mockPapers; // 接口失败时用假数据
      } finally {
        loadingPapers.value = false;
      }
    };

    // 点赞
    const handleUpvote = async (paper) => {
      try {
        // 这里替换为你的真实点赞接口
        const res = await axios.post(`http://49.233.82.133:9091/paper/${paper.id}/upvote`);
        if (res.data.success) {
          // 找到对应论文并更新点赞数（因为 allPapers 是源数据，currentPagePapers 会自动响应）
          const targetPaper = allPapers.value.find(item => item.id === paper.id);
          if (targetPaper) targetPaper.upvotes += 1;
        }
      } catch (error) {
        console.error("点赞失败:", error);
        // 前端友好提示
        alert("点赞失败，请稍后重试～");
      }
    };

    onMounted(fetchPapers);

    return {
      allPapers,
      loadingPapers,
      currentPage,
      pageSize,
      totalPapers,
      currentPagePapers, // 当前页数据
      handleUpvote,
      handleCurrentChange,
      handleSizeChange,
    };
  },
};
</script>

<style scoped>
.paper-info{
  width: 90%;
}
.paper-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.paper-item {
  
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
  width: 15%;
  height: auto;
  margin-top: 10px;
  border-radius: 4px;
  margin-right: 4px;
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
/* 分页器样式 */
.custom-pagination,.pagination-container {
  font-size: 14px;
  margin-top: 20px;
}
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #870066 !important;
  color: #ffffff !important;
  transition: all 0.3s ease;
}
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
  color: #870066 !important;
  transition: color 0.3s ease;
}
:deep(.el-pagination .btn-next:hover, .el-pagination .btn-prev:hover) {
  color: #870066 !important;
  transition: color 0.3s ease;
}
:deep(.el-pagination .el-pager li:not(.disabled).active) {
  color: #ffffff !important;
  background-color: #870066 !important;
  transition: all 0.3s ease;
}
:deep(.el-pagination button:hover) {
  color: #870066 !important;
}
:deep(.el-pagination.is-background .btn-next, 
      .el-pagination.is-background .btn-prev, 
      .el-pagination.is-background .el-pager li) {
  background-color: #f4f4f5;
  transition: all 0.3s ease;
}
:deep(.el-pagination.is-background .btn-next:hover:not(:disabled), 
      .el-pagination.is-background .btn-prev:hover:not(:disabled)) {
  color: #870066 !important;
}
:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #870066 !important;
}
:deep(.el-pagination) {
  font-weight: normal;
  padding: 0;
}
.paper-content{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
/* 响应式调整 */
@media (max-width: 768px) {
  .paper-content {
    flex-direction: column; /* 移动端垂直布局 */
  }

  .paper-image {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  .paper-title {
    font-size: 16px;
  }

  .paper-actions {
    margin-top: 8px;
  }
}
</style>