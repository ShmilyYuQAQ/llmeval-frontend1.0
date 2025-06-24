<template>
  <div class="article-container">
    <NavBar />
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="article" class="article-content">
      <h1>{{ article.title }}</h1>
      <p class="meta">{{ article.publisher }} | {{ article.publishDate }}</p>
      <div v-html="parsedContent" class="markdown-body"></div>
    </div>
    <div v-else class="error">文章未找到</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown-light.css'; // ✅ GitHub 风格 Markdown 样式


import fm from 'front-matter';
import hljs from 'highlight.js';

import NavBar from '../components/guidePage/NavBar.vue';

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
// ✅ marked 配置
marked.use({
  extensions: [latexExtension],
  gfm: true,
  breaks: false,
  //pedantic: false,
  //mangle: false,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

const route = useRoute();
const article = ref(null);
const loading = ref(true);
// ✅ Markdown 内容解析
const parsedContent = computed(() => {
  return article.value ? marked.parse(article.value.content) : '';
});

onMounted(async () => {
  try {
    console.log('加载文章，ID:', route.params.id);
    const response = await fetch('/posts/file-list.json');
    if (!response.ok) throw new Error('无法加载文件列表');
    const fileList = await response.json();
    console.log('文件列表:', fileList);

    const articleId = parseInt(route.params.id);
    const fileName = fileList[articleId - 1];
    if (!fileName) throw new Error('文章 ID 无效');

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
    let description;
    try {
      description = marked.parse(descriptionText);
    } catch (e) {
      console.error(`解析描述失败 (${fileName}):`, e);
      description = '描述解析失败';
    }

    article.value = {
      id: articleId,
      title: attributes.title || body.split('\n')[0]?.replace(/^#+\s*/, '') || fileName.replace('.md', ''),
      description,
      content: body,
      publisher: attributes.publisher || '博客作者',
      publishDate: attributes.publishDate || new Date().toISOString().split('T')[0],
    };

    //console.log('加载的文章:', article.value);
    loading.value = false;
  } catch (error) {
    console.error('加载文章失败:', error);
    article.value = null;
    loading.value = false;
  }
});
</script>

<style scoped>
.article-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.article-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  font-size: 32px;
  color: #222;
  margin-bottom: 10px;
}
.meta {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}
.markdown-body {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}
.markdown-body :deep(h2) {
  font-size: 24px;
  margin: 20px 0 10px;
}
.markdown-body :deep(p) {
  margin-bottom: 10px;
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
.loading {
  text-align: center;
  padding: 20px;
  color: #870066;
}
.error {
  text-align: center;
  padding: 20px;
  color: #f00;
}
</style>