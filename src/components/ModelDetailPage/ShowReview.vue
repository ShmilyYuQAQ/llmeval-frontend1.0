<template>
  <div class="section_2 flex-col">
    <div class="image-text_1 flex-row justify-between">
      <img
        class="thumbnail_5"
        referrerpolicy="no-referrer"
        src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb484f54abc7a40151b124086f6b2e6a468b5915cb4223d4123b2e6a5eab530d3"
      />
      <span class="text-group_1">用户反馈（6）</span>
    </div>

    <div class="box_7 flex-row justify-between">
      <div class="text-wrapper_3 flex-col">
        <textarea 
          class="text-input" 
          placeholder="聊聊这个模型吧…" 
          rows="3"></textarea>
      </div>
      <div class="section_3 flex-row">
        <div class="image-text_2 flex-col justify-between">
          <img
            class="thumbnail_6"
            referrerpolicy="no-referrer"
            src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb77e0db108b48f17a326a3673294061f2b5805cce41074a119005e87e0b37d38"
          />
          <span class="text-group_2">发表评价</span>
        </div>
      </div>
    </div>
    <div class="box_8 flex-row">
      <span class="text_11">廖添胤</span>
      <img
        class="thumbnail_7"
        referrerpolicy="no-referrer"
        src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPng77f91f4a5d1ae92315befc31f4c30af9ea8872185b1b722d84975ae8a65353bc"
      />
      <span class="text_12">已收藏该模型</span>
      <span class="text_13">回复</span>
      <span class="text_14">2025-03-20&nbsp;16:59:10</span>
      <span class="text_15">，感觉这个模型就是像和真人操作一样的，丝毫没有机械呆笨感。</span>
      <div class="box_9 flex-row">
        <div class="image-text_3 flex-row justify-between">
          <div class="text-group_4">
            <span class="text_19">廖添胤&nbsp;&nbsp;回复&nbsp;&nbsp;</span>
            <span class="text_20">&#64;张三：</span>
            <span class="text_16"
            >确实很好用，我也是刚试用完。确实很好用，我也是刚试用完。确实很好用，我也是刚试用完。确实很好用，我也是刚试用完。确实很好用，我也是刚试用完。确实很好用，我也是刚试用完。确实很好用，我也是刚试用完。确实很好用，我也是刚试用完。确实很好用，我也是刚试用完。确实很好用，我也是刚试用完。</span
          >
          </div>
        </div>
        <div class="right-content">
          <span class="text_22">回复</span>
          <span class="text_23">2025-03-20&nbsp;16:59:10</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowReviews",
  mounted() {
    this.adjustBoxHeight(); // 在组件挂载后调用
    window.addEventListener("resize", this.adjustBoxHeight); // 监听窗口大小变化
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.adjustBoxHeight); // 移除监听器，避免内存泄漏
  },
  methods: {
    adjustBoxHeight() {
      const box9 = document.querySelector(".box_9");
      const text16 = document.querySelector(".text_16");

      if (!box9 || !text16) {
        console.warn("box_9 或 text_16 未找到");
        return;
      }

      // 获取 .text_16 的高度
      const text16Height = text16.offsetHeight;
      console.log("text_16 的高度:", text16Height);

      // 设置 box_9 的高度或 padding-bottom
      box9.style.paddingBottom = `${text16Height - 10}px`; // 添加额外的间距
    },
  },

  data() {
    return {
    };
  },
};
</script>

<style scoped>
.section_2 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 16px;
  position: absolute;
  left: 1520px;
  top: 30px;
  width: 2000px;
  height: 750px;
  justify-content: flex-center;
}

.image-text_1 {
  display: flex;
  flex-direction: row;
  width: 130px;
  height: 22px;
  margin: 30px 0 0 20px;
}
.thumbnail_5 {
  width: 16px;
  height: 16px;
  margin-top: 3px;
}
.text-group_1 {
  width: 106px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
  margin-left: 12px;
}
.box_7 {
  width: 1160px;
  height: 83px;
  margin: 20px 0 0 20px;
  display: flex; /* 启用 Flex 布局 */
  flex-direction: row; /* 确保子元素横向排列（默认值，可省略） */
}
.text-wrapper_3 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  height: 83px;
  width: 1066px;
}
.text-input {
  width: 100%; /* 占满父容器宽度 */
  height: 100%; /* 高度自适应父容器 */
  border: none; /* 去掉边框 */
  outline: none; /* 去掉聚焦时的边框 */
  resize: none; /* 禁止调整大小 */
  font-size: 14px;
  color: rgba(34, 34, 34, 1);
  background-color: transparent; /* 背景透明，与父容器一致 */
  margin: 10px 0 0 10px;
}
.text_10 {
  width: 112px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 12px 0 0 16px;
}
.section_3 {
  background-color: rgba(135, 0, 102, 1);
  border-radius: 8px;
  width: 82px;
  height: 83px;
}
.image-text_2 {
  width: 56px;
  height: 46px;
  margin: 19px 0 0 13px;
}
.thumbnail_6 {
  width: 20px;
  height: 20px;
  margin-left: 18px;
}
.text-group_2 {
  width: 56px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 18px;
  margin-top: 8px;
}
.box_8 {
  width: 1160px;
  height: 32px;
  margin: 40px 0 20px 40px;
}
.label_2 {
  width: 32px;
  height: 32px;
}
.text_11 {
  width: 42px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 8px;
}
.thumbnail_7 {
  width: 16px;
  height: 15px;
  margin: 8px 0 0 12px;
}
.text_12 {
  width: 84px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 10px;
}
.text_13 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 0 0 0 780px;
}
.text_14 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 0 0 0 20px;
}
.text_15 {
  display: block;
  width: 1050px;
  height: auto;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  line-height: 20px;
  margin: 10px 0 0 82px;
}
.box_9 {
  position: relative; /* 设置为相对定位，便于内部绝对定位 */
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  width: 1068px;
  height: auto;
  margin: 20px 0 0 75px;
  padding-top: 30px; /* 为父容器添加内边距，避免内容被遮挡 */
}
.image-text_3 {
  position: absolute;
  top: 0;
  left: 10px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 800px;
  height: auto
}
.right-content {
  position: absolute; /* 绝对定位 */
  top: 6px; /* 距离顶部 10px */
  right: 10px; /* 距离右侧 10px */
  display: flex;
  flex-direction: row; /* 子元素横向排列 */
  align-items: center; /* 垂直方向居中 */
  gap: 8px; /* 添加子元素之间的间距 */
}
.label_3 {
  width: 32px;
  height: 32px;
}
.text-group_3 {
  width: 42px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin-left: 0;
}
.text_16 {
  width: 800px;
  height: auto;
  white-space: normal; /* 允许换行 */
  overflow-wrap: break-word;
  color: rgba(102, 106, 117, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  line-height: 20px;
  position: static; /* 确保评论内容在文档流中 */
}
.text_17 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 3px 0 0 750px;
}
.text_18 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 3px 20px 0 20px;
}
.box_10 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  width: 1068px;
  height: 57px;
  justify-content: flex-center;
  margin: 12px 0 0 114px;
}
.image-text_4 {
  width: 174px;
  height: 32px;
  margin: 12px 0 0 20px;
}
.label_4 {
  width: 32px;
  height: 32px;
}
.text-group_4 {
  width: 1000px;
  height: 20px;
  overflow-wrap: break-word;
  font-size: 0;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin-top: 6px;
  flex-wrap: wrap; /* 允许子元素换行 */
}
.text_19 {
  width: 134px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
}
.text_20 {
  width: 134px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
}
.text_21 {
  width: 196px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(102, 106, 117, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin-top: 18px;
}
.text_22 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 0 0 0 660px;
}
.text_23 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 0 20px 0 20px;
}
.comment-content {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
}
.image_2 {
  width: 1160px;
  height: 1px;
  margin: 21px 0 0 20px;
}
.box_11 {
  width: 1160px;
  height: 32px;
  margin: 15px 0 0 20px;
}
.image-text_5 {
  width: 68px;
  height: 32px;
}
.label_5 {
  width: 32px;
  height: 32px;
}
.text-group_5 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin-top: 6px;
}
.thumbnail_8 {
  width: 16px;
  height: 15px;
  margin: 8px 0 0 26px;
}
.text_24 {
  width: 42px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 4px;
}
.text_25 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 814px;
}
.text_26 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 20px;
}
.text_27 {
  width: 700px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 4px 0 0 114px;
}
.text-wrapper_4 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  height: 83px;
  width: 1066px;
  margin: 16px 0 0 114px;
}
.text_28 {
  width: 112px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 12px 0 0 16px;
}
.box_12 {
  width: 132px;
  height: 32px;
  margin: 10px 0 0 114px;
}
.text-wrapper_5 {
  background-color: rgba(135, 0, 102, 1);
  border-radius: 8px;
  height: 32px;
  width: 60px;
}
.meta-info {
  position: absolute; /* 绝对定位，浮于文字上方 */
  top: 0; /* 距离父容器顶部 */
  right: 0; /* 靠右对齐 */
  display: flex;
  gap: 8px; /* 添加“回复”和时间之间的间距 */
  background-color: rgba(255, 255, 255, 0.8); /* 可选：添加背景色，避免遮挡文字 */
  padding: 4px; /* 可选：添加内边距 */
}
.text_29 {
  width: 28px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}
.text-wrapper_6 {
  background-color: rgba(237, 239, 242, 1);
  border-radius: 8px;
  height: 32px;
  width: 60px;
}
.text_30 {
  width: 28px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}
.image_3 {
  width: 1160px;
  height: 1px;
  margin: 21px 0 0 20px;
}
.box_13 {
  width: 1160px;
  height: 32px;
  margin: 15px 0 0 20px;
}
.image-text_6 {
  width: 68px;
  height: 32px;
}
.label_6 {
  width: 32px;
  height: 32px;
}
.text-group_6 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin-top: 6px;
}
.thumbnail_9 {
  width: 16px;
  height: 15px;
  margin: 8px 0 0 26px;
}
.text_31 {
  width: 84px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 4px;
}
.text_32 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 772px;
}
.text_33 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 20px;
}
.text_34 {
  width: 224px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 4px 0 0 114px;
}
.image_4 {
  width: 1160px;
  height: 1px;
  margin: 20px 0 0 20px;
}
.box_14 {
  width: 1160px;
  height: 32px;
  margin: 16px 0 0 20px;
}
.label_7 {
  width: 32px;
  height: 32px;
}
.text_35 {
  width: 42px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 8px;
}
.thumbnail_10 {
  width: 16px;
  height: 15px;
  margin: 8px 0 0 12px;
}
.text_36 {
  width: 84px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 4px;
}
.text_37 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 728px;
}
.text_38 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 16px;
}
.text_39 {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 20px;
}
.text_40 {
  width: 126px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 4px 0 24px 114px;
}
</style>