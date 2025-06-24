<template>
  <div class="page-container">
    <NavBar />
    <div class="text-wrapper_2 flex-col">
      <div>
        <span class="text_7">相关文章</span>
        
      </div>
      <div>
        <span class="text_8">聚焦领域：相关文章及技术报告专栏</span>
      </div>
    </div>
    <div class="main-content">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="newsItems.length" class="group_2 flex-col justify-between">
        <div
          class="box_2 flex-col"
          v-for="news in paginatedNews"
          :key="news.id"
          @click="handleClick(news)"
        >
          <div class="text-group_1 flex-col justify-between">
            <span class="text_9">{{ news.title }}</span>
            <span class="text_10" v-html="news.description"></span>
          </div>
          <div class="action-row">
            <span class="text_11">{{ news.publisher }}丨{{ news.publishDate }}</span>
            
          </div>
        </div>
      </div>
      <div v-else class="no-data">暂无文章</div>


      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          background
          :current-page="currentPage"
          :page-size="pageSize"
          :total="newsItems.length"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          class="custom-pagination"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import NavBar from "./guidePage/NavBar.vue";
import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import fm from 'front-matter';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// 自定义 marked 扩展以支持 LaTeX
const latexExtension = {
  name: 'latex',
  level: 'inline',
  start(src) {
    return src.match(/\$/)?.index;
  },
  tokenizer(src) {
    const inlineRule = /^\$([^\$\n]+?)\$/;
    const blockRule = /^```math\n([\s\S]*?)\n```/;
    let match;

    if ((match = blockRule.exec(src))) {
      return {
        type: 'latex',
        raw: match[0],
        text: match[1].trim(),
        displayMode: true,
      };
    }

    if ((match = inlineRule.exec(src))) {
      return {
        type: 'latex',
        raw: match[0],
        text: match[1].trim(),
        displayMode: false,
      };
    }
  },
  renderer(token) {
    try {
      return katex.renderToString(token.text, {
        throwOnError: false,
        displayMode: token.displayMode,
      });
    } catch (e) {
      console.error('KaTeX 渲染错误:', e);
      return token.text;
    }
  },
};

marked.use({
  extensions: [latexExtension],
  gfm: true,
  breaks: false,
  pedantic: false,
  mangle: false,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

const router = useRouter();

const newsItems = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const pageSize = ref(6);
const likes = ref(new Map());

onMounted(async () => {
  console.log('likes 初始化:', likes.value);
  try {
    const response = await fetch('/posts/file-list.json');
    if (!response.ok) throw new Error('无法加载文件列表');
    const fileList = await response.json();
    console.log('文件列表:', fileList);

    const articles = await Promise.all(
      fileList.map(async (fileName, index) => {
        const fileResponse = await fetch(`/posts/${fileName}`);
        if (!fileResponse.ok) throw new Error(`无法加载 ${fileName}`);
        const markdownContent = await fileResponse.text();
        console.log(`文件 ${fileName} 内容:`, markdownContent);

        let attributes, body;
        try {
          ({ attributes, body } = fm(markdownContent));
        } catch (e) {
          console.error(`解析 front-matter 失败 (${fileName}):`, e);
          attributes = {};
          body = markdownContent;
        }

        const descriptionText = attributes.description || body.split('\n').slice(0, 3).join('\n');
        console.log(`描述文本 (${fileName}):`, descriptionText);
        let description = descriptionText;
        try {
          description = marked.parse(descriptionText);
        } catch (e) {
          console.error(`解析描述失败 (${fileName}):`, e);
          description = '描述解析失败';
        }

        return {
          id: index + 1,
          title: attributes.title || body.split('\n')[0]?.replace(/^#+\s*/, '') || fileName.replace('.md', ''),
          description,
          content: body,
          publisher: attributes.publisher || '作者',
          publishDate: attributes.publishDate || new Date().toISOString().split('T')[0],
        };
      })
    );

    console.log('解析后的文章:', articles);
    newsItems.value = articles;
    loading.value = false;
  } catch (error) {
    console.error('加载文章失败:', error);
    newsItems.value = [
      { id: 1, title: "示例文章1", description: "这是第一篇示例文章描述", publisher: "发布者A", publishDate: "2025-06-10", content: "这是文章1的详细内容" },
      { id: 2, title: "示例文章2", description: "这是第二篇示例文章描述", publisher: "发布者B", publishDate: "2025-06-12", content: "这是文章2的详细内容" },
    ];
    loading.value = false;
  }
  console.log('最终 loading 状态:', loading.value);
});

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return newsItems.value.slice(start, start + pageSize.value);
});

const handleCurrentChange = (page) => {
  currentPage.value = page;
};

const handlePageSizeChange = () => {
  currentPage.value = 1;
};

const handleClick = (news) => {
  router.push({
    name: 'ArticleDetail',
    params: { id: news.id }
  });
};

const toggleLike = (id) => {
  if (likes.value.has(id)) {
    likes.value.delete(id);
  } else {
    likes.value.set(id, true);
  }
  console.log('当前 likes:', likes.value);
};
</script>

<style scoped>

.custom-pagination {
    /* 自定义分页组件类 */
    font-size: 13px;
}
/* 分页容器样式 */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
/* 自定义分页样式 */
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
  background-image: url(./DocumentPage/images/document.png);
  width: 100%;
  max-width: 1440px;
  height: 250px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 145px;
  margin: 0 auto;
}
.text_7 {
  font-size: 32px;
  padding-left: 1045px;
  font-weight: 500;
  color: rgba(135, 0, 102, 1);
  margin-bottom: 10px;
}
.text_8 {
  font-size: 15px;
  padding-left: 1045px;
  font-weight: 500;
 
  margin-bottom: 10px;
}
.group_2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  gap: 24px;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.box_2 {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.box_2:hover {
  border-color: #870066;
  box-shadow: 0 6px 16px rgba(135, 0, 102, 0.15);
  transform: translateY(-2px);
  cursor: pointer;
}
.text-group_1 {
  margin-bottom: 10px;
}
.text_9 {
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin-bottom: 10px;
  line-height: 1.4;
}
.box_2:hover .text_9 {
  color: rgba(135, 0, 102, 1);
}
.text_10 {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  flex: 1;
  text-align: justify;
  word-break: break-word;
}
.text_11 {
  font-size: 13px;
  color: #999;
  margin-top: 16px;
}
.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.like-btn {
  background: none;
  border: none;
  color: #870066;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
}
.like-btn:hover {
  text-decoration: underline;
}
@media (hover: none) {
  .box_2:hover {
    border-color: transparent;
    box-shadow: none;
    transform: none;
  }
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
.markdown-body :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 10px 0;
}
.markdown-body :deep(th, td) {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.markdown-body :deep(th) {
  background-color: #f4f4f5;
}
.markdown-body :deep(.katex) {
  font-size: 1.1em;
  margin: 0 2px;
}
.markdown-body :deep(.katex-display) {
  margin: 1em 0;
  text-align: center;
}
</style>