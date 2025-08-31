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
    <div class="content-wrapper">
      <div class="main-content">
        <!-- Left 2/3: 顶尖论文 -->
        <div class="left-content">
          <LeftDocument />
        </div>
        <!-- Right 1/3: 自己编写的相关论文 -->
        <div class="right-content">
          <RightDocument />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "./guidePage/NavBar.vue";
import LeftDocument from "./DocumentPage/leftDocument.vue";
import RightDocument from "./DocumentPage/rightDocument.vue";

export default defineComponent({
  name: "DocumentPage",
  components: {
    NavBar,
    LeftDocument,
    RightDocument,
  },
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  font-weight: 500;
  color: rgba(135, 0, 102, 1);
  margin-bottom: 10px;
}
.text_8 {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
}
.content-wrapper {
  display: flex;
  flex-direction: row;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
  flex: 1;
}
.left-content {
  flex: 2;
  padding: 20px;
}
.right-content {
  flex: 1;
  padding: 20px;
}
.main-content {
  flex: 1;
  display: flex;
}
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }
  .left-content,
  .right-content {
    flex: 1;
    width: 100%;
  }
  .left-content {
    border-right: none;
    border-bottom: 1px solid #eee;
  }
}
</style>