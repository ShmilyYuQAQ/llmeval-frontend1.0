<template>
    <div id="messageModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>用户反馈</h2>
        <div>
          <label for="question">问题输入<span class="required">*</span></label>
          <input type="text" id="question" name="question">
        </div>
        <div>
          <label for="contact">联系方式</label>
          <input type="text" id="contact" name="contact">
        </div>
        <div>
          <label for="image">相关图片</label>
          <input type="file" id="image" name="image">
        </div>
        <div>
          <button id="submitBtn">提交</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* 留言模态窗口的样式 */
  .modal {
            display: none; /* 默认隐藏 */
            position: fixed; /* 固定位置 */
            z-index: 1; /* 位于顶层 */
            left: 0;
            top: 0;
            width: 100%; /* 全屏宽度 */
            height: 100%; /* 全屏高度 */
            overflow: auto; /* 允许滚动 */
            background-color: rgb(0,0,0); /* 背景颜色 */
            background-color: rgba(0,0,0,0.4); /* 背景颜色透明度 */
        }

        /* 模态窗口内容的样式 */
        .modal-content {
            background-color: #fefefe;
            margin: 15% auto; /* 15% 上边距，居中显示 */
            padding: 20px;
            border: 1px solid #888;
            width: 80%; /* 宽度 */
            max-width: 600px; /* 最大宽度 */
        }

        /* 关闭按钮的样式 */
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        /* 输入框和按钮的样式 */
        .modal-content input[type="text"], .modal-content input[type="file"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            box-sizing: border-box;
        }

        .modal-content button {
            background-color: #4CAF50;
            color: white;
            padding: 15px 20px;
            border: none;
            cursor: pointer;
            width: 100%;
        }

        .modal-content button:hover {
            background-color: #45a049;
        }

        /* 必填项星号的样式 */
        .required {
            color: red;
            margin-left: 5px;
        }
  </style>