<template>
  <div class="article-container">
    <NavBar />
    <div class="content-wrapper">
      <aside class="toc-sidebar">
        <h3 class="toc-title">目录</h3>
        <ul class="toc-list">
          <li v-for="item in toc" :key="item.id" class="toc-item">
            <a v-if="item.level === 2" :href="`#${item.id}`" @click.prevent="toggleSection(item.id); scrollToSection(item.id)">
              {{ item.text }} <span :class="['toggle-icon', { open: isSectionOpen(item.id) }]">▶</span>
            </a>
            
            <ul v-if="isSectionOpen(item.id)" class="sub-list">
              <li v-for="subItem in item.children" :key="subItem.id" class="toc-item">
                <a :href="`#${subItem.id}`" @click.prevent="scrollToSection(subItem.id)" class="sub-item">{{ subItem.text }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      <div class="main-content">
        <div v-if="loading" class="loading">加载中...</div>
        <div v-else-if="article" class="article-content">
          <h1>{{ article.title }}</h1>
          <p class="meta">{{ article.publisher }} | {{ article.publishDate }}</p>
          <div v-html="parsedContent" class="markdown-body"></div>
        </div>
        <div v-else class="error">文章未找到</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown-light.css';
import fm from 'front-matter';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import NavBar from '../components/guidePage/NavBar.vue';

// 自定义 LaTeX 扩展
const latexExtension = {
  name: 'latex',
  level: 'inline',
  start(src) { return src.match(/\$/)?.index; },
  tokenizer(src) {
    const inlineRule = /^\$([^\$\n]+?)\$/;
    const blockRule = /^```math\n([\s\S]*?)\n```/;
    let match;
    if ((match = blockRule.exec(src))) {
      return { type: 'latex', raw: match[0], text: match[1].trim(), displayMode: true };
    }
    if ((match = inlineRule.exec(src))) {
      return { type: 'latex', raw: match[0], text: match[1].trim(), displayMode: false };
    }
  },
  renderer(token) {
    try {
      return katex.renderToString(token.text, { throwOnError: false, displayMode: token.displayMode });
    } catch (e) {
      console.error('KaTeX 渲染错误:', e);
      return `<span class="katex-error">${token.text}</span>`;
    }
  },
};

// 自定义高亮扩展
const highlightExtension = {
  name: 'highlight',
  level: 'inline',
  start(src) { return src.match(/==/)?.index; },
  tokenizer(src) {
    const rule = /^==([^\n]+?)==/;
    const match = rule.exec(src);
    if (match) {
      return { type: 'highlight', raw: match[0], text: match[1].trim() };
    }
  },
  renderer(token) {
    return `<mark>${token.text}</mark>`;
  },
};

// 配置 marked
marked.use({
  extensions: [latexExtension, highlightExtension],
  gfm: true,
  breaks: true,
  pedantic: false,
  mangle: false,
  headerIds: true,
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
const toc = ref([]);
const activeTocId = ref(null);
const openSections = ref(new Set()); // 跟踪展开的章节

// 解析 Markdown 内容并净化
const parsedContent = computed(() => {
  if (!article.value) return '';
  try {
    const html = marked.parse(article.value.content);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headers = doc.querySelectorAll('h2,h3');
    const tocMap = new Map();
    toc.value = Array.from(headers).map((header, index) => {
      const id = header.id || `toc-${index}`;
      header.id = id;
      const level = parseInt(header.tagName.toLowerCase().substring(1));
      const item = { id, text: header.textContent.trim(), level, children: [] };
      if (level === 2) {
        tocMap.set(id, item);
      } else if (level === 3) {
        const parent = Array.from(headers).slice(0, index).reverse().find(h => parseInt(h.tagName.toLowerCase().substring(1)) === 2);
        if (parent) {
          const parentId = parent.id || `toc-${index - 1}`;
          tocMap.get(parentId)?.children.push(item);
        }
      }
      return item;
    });
    const sanitized = DOMPurify.sanitize(html, {
      ADD_TAGS: ['katex', 'mark'],
      ADD_ATTR: ['class', 'style', 'id'],
    });
    return sanitized;
  } catch (error) {
    console.error('Markdown 解析错误:', error);
    return '<p>内容解析失败</p>';
  }
});

// 检查章节是否展开
const isSectionOpen = (id) => {
  return openSections.value.has(id);
};

// 切换展开状态
const toggleSection = (id) => {
  if (openSections.value.has(id)) {
    openSections.value.delete(id);
  } else {
    openSections.value.add(id);
  }
};

// 平滑滚动到指定部分
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeTocId.value = id;
  }
};

// 监听滚动高亮当前标题
let observer = null;
const observeHeaders = () => {
  const headers = document.querySelectorAll('.markdown-body h2, .markdown-body h3');
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeTocId.value = entry.target.id;
        }
      });
    },
    { threshold: 0.1, rootMargin: '-10% 0px -80% 0px' }
  );
  headers.forEach((header) => observer.observe(header));
};

onMounted(async () => {
  try {
    console.log('加载文章，ID:', route.params.id);
    const articleId = parseInt(route.params.id);
    if (isNaN(articleId) || articleId < 1) {
      throw new Error('无效的文章 ID');
    }

    const response = await fetch('/posts/file-list.json');
    if (!response.ok) {
      throw new Error(`无法加载文件列表，状态码: ${response.status}`);
    }
    const fileList = await response.json();
    console.log('文件列表:', fileList);

    if (!fileList || !Array.isArray(fileList) || fileList.length === 0) {
      throw new Error('文件列表为空或格式错误');
    }

    const fileName = fileList[articleId - 1];
    if (!fileName) {
      throw new Error(`文章 ID ${articleId} 对应的文件不存在`);
    }

    const fileResponse = await fetch(`/posts/${fileName}`);
    if (!fileResponse.ok) {
      throw new Error(`无法加载文件 ${fileName}，状态码: ${fileResponse.status}`);
    }
    const markdownContent = await fileResponse.text();
    console.log(`文件 ${fileName} 内容:`, markdownContent);

    let attributes, body;
    try {
      ({ attributes, body } = fm(markdownContent));
    } catch (error) {
      console.error(`解析 front-matter 失败 (${fileName}):`, error);
      attributes = {};
      body = markdownContent;
    }

    article.value = {
      id: articleId,
      title: attributes.title || body.split('\n')[0]?.replace(/^#+\s*/, '') || fileName.replace('.md', ''),
      content: body,
      publisher: attributes.publisher || '博客作者',
      publishDate: attributes.publishDate || new Date().toISOString().split('T')[0],
    };

    console.log('加载的文章:', article.value);
    loading.value = false;

    setTimeout(observeHeaders, 0);
  } catch (error) {
    console.error('加载文章失败:', error.message);
    article.value = {
      id: 0,
      title: '默认文章',
      content: '# 默认文章\n\n抱歉，未能加载文章内容。请稍后重试或联系管理员。',
      publisher: '系统',
      publishDate: new Date().toISOString().split('T')[0],
    };
    loading.value = false;
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.article-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content-wrapper {
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.toc-sidebar {
  width: 250px;
  position: sticky;
  top: 20px;
  height: fit-content;
  padding-right: 20px;
}
.toc-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}
.toc-list {
  list-style: none;
  padding: 0;
}
.toc-item {
  margin-bottom: 8px;
}
.sub-item {
  font-size: 14px;
  color: #555;
  text-decoration: none;
  display: block;
  padding: 2px 0;
}
.sub-item:hover {
  color: #870066;
}
.sub-list {
  padding-left: 16px;
  margin-top: 4px;
}
.toggle-icon {
  transition: transform 0.2s;
  display: inline-block;
}
.toggle-icon.open {
  transform: rotate(90deg);
}
.main-content {
  flex: 1;
  max-width: 800px;
}
.article-content {
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
.markdown-body :deep(h3) {
  font-size: 20px;
  margin: 15px 0 8px;
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
@media (max-width: 900px) {
  .content-wrapper {
    flex-direction: column;
  }
  .toc-sidebar {
    width: 100%;
    position: static;
    padding-right: 0;
    margin-bottom: 20px;
  }
}
</style>