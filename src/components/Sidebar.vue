<template>
  <div class="sidebar">
    <h2>大模型推荐系统</h2>
    <ul>
      <li><button @click="navigate('ModelSquareContent')"><img :src="icon1Url" alt="Icon" width="20">模型广场</button></li>
      <li><button @click="navigate('ModelNewsContent')"><img :src="icon5Url" alt="Icon" width="20">模型资讯</button></li>
      <li><button><img :src="icon4Url" alt="Icon" width="20">模型推荐</button></li>
      <li><button id="leaveMessageBtn"><img :src="icon3Url" alt="Icon" width="20">留言</button></li>
      <li><button @click="navigate('ProfileContent')"><img :src="icon2Url" alt="Icon" width="20">个人主页</button></li>
    </ul>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import icon1Url from '/icons/icon1.PNG?url'
import icon2Url from '/icons/icon2.PNG?url'
import icon3Url from '/icons/icon3.PNG?url'
import icon4Url from '/icons/icon4.PNG?url'
import icon5Url from '/icons/icon5.PNG?url'


const emit = defineEmits(['navigate'])

const navigate = (componentName) => {
  emit('navigate', componentName)
}
</script>

<style scoped>
.sidebar {
            width: 200px; /* 增大宽度 */
            background-color: #f1f3fa;
            padding: 20px;
            height: 100vh;
            position: fixed; /* 固定位置 */
            left: 0; /* 靠左对齐 */
            top: 0; /* 从顶部开始 */
            overflow-y: auto; /* 允许垂直滚动 */
        }
        .sidebar h2 {
            font-size: 22px;
            margin-bottom: 20px;
            white-space: nowrap; /* 防止文本换行 */
        }
        .sidebar ul {
            list-style-type: none;
            padding: 0;
        }
        .sidebar ul li {
            padding: 10px 0;
        }
        .sidebar button {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            background-color: #f7f7f8; /* 淡化底色 */
            color: black;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: flex-start; /* 确保内容从左对齐 */
        }
        .sidebar button img {
            margin-right: 10px;
        }
        .sidebar button:hover {
            background-color: #b0c4de;
        }
</style>