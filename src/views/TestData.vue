<template>
  <NavBar />
  <div class="dataset-container">
    <el-container>
      <el-main>
        <!-- 标题框 -->
        <el-card class="dataset-header-card">
          <h1 class="header-title">大模型评测数据集介绍</h1>

          <!-- 数据集介绍 -->
          <p class="dataset-description">
            本数据集涵盖多种任务，包括<strong>文本分类、语义理解、推理</strong>等，涉及多个应用领域，支持大规模语言模型的多维度评估。
            数据来源于权威机构与公开数据集，旨在提供标准化的测评基准，以衡量不同模型的表现。
          </p>

          <!-- 统计信息 -->
          <div class="stats-container">
            <div class="stats-item">
              <span class="big-number">{{ dataset.count }}</span>
              <p>数据集数量（中文：{{ dataset.cn_count }} 英文：{{ dataset.en_count }}）</p>
            </div>
            <div class="divider"></div>
            <div class="stats-item">
              <span class="big-number">{{ dataset.samples }}</span>
              <p>测试用例数量</p>
            </div>
            <div class="divider"></div>
            <div class="stats-item">
              <span class="big-number">{{ dataset.dimensions }}</span>
              <p>维度</p>
            </div>
            <div class="divider"></div>
            <div class="stats-item">
              <span class="big-number">{{ dataset.domains }}</span>
              <p>领域</p>
            </div>
          </div>
        </el-card>

        <!-- 选项卡和示例数据 -->
        <el-card class="combined-card">
          <el-row :gutter="20" class="content-row">
            <!-- 左侧选项卡 -->
            <el-col :span="3">
              <el-tree
                :data="data"
                :props="defaultProps"
                @node-click="handleNodeClick"
              ></el-tree>
            </el-col>

            <!-- 右侧示例数据 -->
            <el-col :span="21">
              <el-table :data="dataset.examples" border>
                <el-table-column prop="type" label="题型" width="100" align="center" />
                <el-table-column prop="difficulty" label="难度" width="60" align="center" />
                <el-table-column prop="question" label="问题" width="1158" align="center" />
              </el-table>
            </el-col>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
  </div>
  <Footer />
</template>

<script>
import NavBar from "../components/guidePage/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
      dataset: {
        count: 118,
        cn_count: 48,
        en_count: 76,
        samples: "320万",
        dimensions: 52,
        domains: 4,
        examples: [
          { type: "单轮问答题", difficulty: "高", question: "把句子翻译成现代汉语：从是观之，地形险阻，奚足以霸王矣！" },
          { type: "多轮问答题", difficulty: "高", question: "把句子翻译成现代汉语：从是观之，地形险阻，奚足以霸王矣！" },
        ],
      },
      data: [
        {
          label: "语言理解与生成",
          children: [
            {
              label: "跨语言理解",
            },
            {
              label: "文本纠错",
            },
            {
              label: "理解能力",
            },
            {
              label: "语言生成",
            },
            {
              label: "场景生成",
            },
          ],
        },
        {
          label: "知识能力",
          children: [
            {
              label: "知识记忆及应用",
            },
          ],
        },
        {
          label: "代码能力",
          children: [
            {
              label: "代码能力",
            },
          ],
        },
        {
          label: "推理能力",
          children: [
            {
              label: "推理能力",
            },
          ],
        },
        {
          label: "安全性",
          children: [
            {
              label: "对话安全性",
            },
            {
              label: "公平性",
            },
            {
              label: "社会道德规范",
            },
            {
              label: "系统安全性",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  components: {
    NavBar,
    Footer,
  },
  methods: {
    handleNodeClick(data, node) {
  if (!node.parent || !node.parent.data || !node.parent.data.label) {
    // 如果没有父节点，或者父节点的 label 为 undefined，说明是一级维度
    console.log(`当前选中的一级维度为：${data.label}，二级维度为：无`);
  } else {
    // 如果有父节点且父节点的 label 存在，说明是二级维度
    console.log(`当前选中的一级维度为：${node.parent.data.label}，二级维度为：${data.label}`);
  }
},
    handleNodeClick(data, node) {
      if (!node.parent || !node.parent.data || !node.parent.data.label) {
        // 如果没有父节点，或者父节点的 label 为 undefined，说明是一级维度
        console.log(`当前选中的一级维度为：${data.label}，二级维度为：无`);
      } else {
        // 如果有父节点且父节点的 label 存在，说明是二级维度
        console.log(`当前选中的一级维度为：${node.parent.data.label}，二级维度为：${data.label}`);
      }
    },  
  },
};
</script>

<style scoped>
.dataset-container {
  background-color: #f8f9fa;
  padding: 0;
  min-height: 100vh;
}

/* 标题卡片 */
.dataset-header-card {
  margin-top: 0;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 15px;
}

/* 数据集介绍文本 */
.dataset-description {
  font-size: 16px;
  margin-bottom: 15px;
  line-height: 1.5;
}

/* 统计信息 */
.stats-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 10px 0;
}

.stats-item {
  flex: 1;
}

.big-number {
  font-size: 32px;
  font-weight: bold;
  color: rgba(135, 0, 102, 1);
  display: block;
}

.divider {
  width: 1px;
  height: 50px;
  background-color: #ced4da;
  margin: 0 10px;
}

/* 左右布局 */
.content-row {
  margin-top: 5px;
}

.combined-card {
  padding: 5px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-top: 10px;
}

.examples-container {
  margin-top: -10px; /* 向上调整示例数据 */
}

.examples-title {
  font-size: 20px;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 15px;
}

.el-table {
  margin-top: 5px;
}

.el-table th {
  background-color: #e9ecef;
  color: #333;
  font-weight: bold;
  text-align: center; /* 设置表头和单元格内容居中 */
}

.el-table td {
  color: #495057;
  text-align: center; /* 设置表头和单元格内容居中 */
}
</style>