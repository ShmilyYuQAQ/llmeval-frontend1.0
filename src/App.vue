<template>
  <div class="container">
    <Sidebar @navigate="handleNavigation" />
    <div class="main-content">
      <component :is="currentComponent" class="content" />
    </div>
    <MessageModal />
  </div>
  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import MessageModal from './components/MessageModal.vue'
import Footer from './components/Footer.vue'
import ProfileContent from './components/ProfileContent.vue'
import ModelSquareContent from './components/ModelSquareContent.vue'
import ModelNewsContent from './components/ModelNewsContent.vue'
import { onMounted } from 'vue'

const currentComponent = ref('ModelSquareContent')
//1111
const handleNavigation = (componentName) => {
  if (componentName === 'ProfileContent') {
    currentComponent.value = ProfileContent
  } else if (componentName === 'ModelSquareContent') {
    currentComponent.value = ModelSquareContent
  } else if (componentName === 'ModelNewsContent') {
    currentComponent.value = ModelNewsContent
  }
}

onMounted(() => {
  // 获取模态窗口
  var modal = document.getElementById("messageModal");

  // 获取按钮，打开模态窗口
  var btn = document.getElementById("leaveMessageBtn");

  // 获取 <span> 元素，关闭模态窗口
  var span = document.getElementsByClassName("close")[0];

  // 当用户点击按钮时，打开模态窗口
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // 当用户点击 <span> (x)，关闭模态窗口
  span.onclick = function() {
    modal.style.display = "none";
  }

  // 当用户点击模态窗口外部，关闭模态窗口
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // 页面加载时默认显示模型广场内容
  currentComponent.value = ModelSquareContent
})

</script>

<style scoped>

body {
  font-family: Arial, sans-serif;
  background-color: #f7f9fc;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
}

.main-content {
  display: flex;
  flex-grow: 1;
  margin-left: 40px; /* 确保主内容不被侧边栏覆盖 */
  justify-content: space-between; /* 确保内容和右侧栏之间有间距 */
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>