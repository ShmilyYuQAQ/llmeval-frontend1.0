<template>
  <div class="document-page">
    <h1>{{ route.query.title }}</h1>
    <p><strong>发布者：</strong>{{ route.query.publisher }}</p>
    <p><strong>发布时间：</strong>{{ route.query.publishDate }}</p>
    <p><strong>简介：</strong>{{ route.query.description }}</p>
    <div class="content">
      {{ route.query.content }}
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped>
.document-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  line-height: 1.6;
}
.content {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 8px;
}
</style>
