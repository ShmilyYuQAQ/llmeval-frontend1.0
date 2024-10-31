<template>
    <div class="footer">
      © 2024 Horizon UI. All Rights Reserved.
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* 底部版权 */
  .footer {
            background-color: #e0e4ef;
            padding: 10px;
            text-align: center;
            position: fixed;
            bottom: 0;
            width: 100%;
            left: 0; /* 靠左对齐 */
        }
        .filter-options {
            margin-bottom: 20px;
        }
        .filter-options label {
            margin-right: 10px;
        }
        .filter-options1, .filter-options2, .filter-options3, .filter-options4, .filter-options5 {
            margin-bottom: 20px; /* 增加行间距 */
        }
        .filter-options1 label, .filter-options2 label, .filter-options3 label, .filter-options4 label, .filter-options5 label {
            margin-bottom: 5px; /* 增加标签之间的间距 */
            display: inline-block; /* 取消每个标签占一行 */
        }
        .filter-options1 label:first-child, .filter-options2 label:first-child, .filter-options3 label:first-child, .filter-options4 label:first-child, .filter-options5 label:first-child {
            margin-bottom: 10px; /* 增加条件标题和条件选项之间的距离 */
        }
  </style>