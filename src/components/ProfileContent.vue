<template>
    <div class="profile-container">
        <h2>账号信息</h2>
        <div class="profile-item">
            <label for="username">用户名</label>
            <input type="text" id="username" name="username">
            <button>设置</button>
        </div>
        <div class="profile-item">
            <label for="phone">手机号码</label>
            <input type="text" id="phone" name="phone">
            <button>设置</button>
        </div>
        <div class="profile-item">
            <label for="email">邮箱地址</label>
            <input type="text" id="email" name="email">
            <button>设置</button>
        </div>
        <div class="profile-item">
            <label for="github">GitHub账号</label>
            <input type="text" id="github" name="github">
            <button>设置</button>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.profile-container {
  padding: 20px;
  flex-grow: 1;
  position: relative;
}

.title {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
}

.profile-item {
  margin-top: 60px; /* 确保内容不与标题重叠 */
}

.profile-item label {
  display: inline-block;
  width: 100px;
}

.profile-item input[type="text"] {
  width: 200px;
  padding: 5px;
  margin-right: 0px;
}

.profile-item button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.profile-item button:hover {
  background-color: #0056b3;
}
</style>
