<template>
  <div class="max-w-xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg shadow-md font-sans">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-2">意见反馈</h1>
    <p class="text-center text-gray-500 mb-6">您也可以选择邮箱联系：<a href="mailto:langyahaiping@datumdata.com" class="text-blue-600 underline">langyahaiping@datumdata.com</a></p>
    <form @submit.prevent="submitForm" novalidate>
      <div class="mb-5">
        <label for="title" class="block mb-1 font-semibold text-gray-700">标题：</label>
        <input id="title" v-model="title" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <div class="mb-5">
        <label for="name" class="block mb-1 font-semibold text-gray-700">您的姓名：</label>
        <input id="name" v-model="name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-1 font-semibold text-gray-700">电子邮件：</label>
        <input id="email" v-model="email" type="email" required class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <div class="mb-5">
        <label for="content" class="block mb-1 font-semibold text-gray-700">内容：</label>
        <textarea id="content" v-model="content" rows="6" required class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-vertical"></textarea>
      </div>
      <button type="submit" :disabled="isLoading" class="w-full py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
        {{ isLoading ? '提交中...' : '提交' }}
      </button>
      <p v-if="formMessage" :class="['mt-3 text-center font-bold', isSuccess ? 'text-green-600' : 'text-red-600']">{{ formMessage }}</p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const title = ref('');
const name = ref('');
const email = ref('');
const content = ref('');
const formMessage = ref('');
const isSuccess = ref(false);
const isLoading = ref(false);

function validateEmail(value: string): boolean {
  // 简单邮箱校验
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function submitForm() {
  formMessage.value = '';
  isSuccess.value = false;

  if (!title.value || !name.value || !email.value || !content.value) {
    formMessage.value = '请填写所有必填字段！';
    isSuccess.value = false;
    return;
  }
  if (!validateEmail(email.value)) {
    formMessage.value = '请输入有效的电子邮件地址！';
    isSuccess.value = false;
    return;
  }

  isLoading.value = true;
  try {
    const response = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        name: name.value,
        email: email.value,
        content: content.value,
      }),
    });
    if (response.ok) {
      formMessage.value = '提交成功！我们会尽快与您联系。';
      isSuccess.value = true;
      title.value = '';
      name.value = '';
      email.value = '';
      content.value = '';
    } else {
      const error = await response.json();
      formMessage.value = `提交失败：${error.message || '请稍后再试'}`;
      isSuccess.value = false;
    }
  } catch (e) {
    formMessage.value = '提交失败：网络错误，请稍后再试';
    isSuccess.value = false;
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
/**** 额外的移动端适配可用 Tailwind 完成，无需自定义样式 ****/
</style> 