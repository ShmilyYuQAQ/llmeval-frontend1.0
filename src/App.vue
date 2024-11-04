<template>
    <div class="container" style="background-color: rgb(244,247,255);">
      <Homepage></Homepage>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Homepage from "./components/Homepage.vue";
import ModelNewsContent from "./components/ModelNewsContent.vue";
import ModelSquareContent from "./components/ModelSquareContent.vue";
import ProfileContent from "./components/ProfileContent.vue";
const currentComponent = ref("ModelSquareContent");

const handleNavigation = (componentName) => {
    if (componentName === "ProfileContent") {
        currentComponent.value = ProfileContent;
    } else if (componentName === "ModelSquareContent") {
        currentComponent.value = ModelSquareContent;
    } else if (componentName === "ModelNewsContent") {
        currentComponent.value = ModelNewsContent;
    }
};

onMounted(() => {
    // 获取模态窗口
    var modal = document.getElementById("messageModal");

    // 获取按钮，打开模态窗口
    var btn = document.getElementById("leaveMessageBtn");

    // 获取 <span> 元素，关闭模态窗口
    var span = document.getElementsByClassName("close")[0];

    // 当用户点击按钮时，打开模态窗口
    btn.onclick = function () {
        modal.style.display = "block";
    };

    // 当用户点击 <span> (x)，关闭模态窗口
    span.onclick = function () {
        modal.style.display = "none";
    };

    // 当用户点击模态窗口外部，关闭模态窗口
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // 页面加载时默认显示模型广场内容
    currentComponent.value = ModelSquareContent;
});
</script>

<style scoped>
.container {
    display: flex;
    width: 100%;
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
