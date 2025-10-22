<template>
  <div class="newbie-guide">
    <!-- 开发环境调试按钮 -->
    <button 
      @click="resetGuide" 
      class="reset-guide-btn"
    >
      重置引导（调试用）
    </button>

    <!-- 引导遮罩层 -->
    <div 
      v-if="currentStep < steps.length" 
      class="guide-mask" 
      :class="{'mask-home': currentStep === 2, 'mask-origin': currentStep === 3}"
      :style="{
        top: steps[currentStep].pageTop + 'px',
        left: steps[currentStep].pageLeft + 'px',
        width: steps[currentStep].width + 'px',
        height: steps[currentStep].height + 'px'
      }"
    ></div>

    <!-- 引导提示框 -->
    <transition name="guide-fade">
      <div 
        v-if="currentStep < steps.length" 
        class="guide-tooltip" 
        :class="{'tooltip-home': currentStep === 2, 'tooltip-origin': currentStep === 3}"
        :style="{
          top: steps[currentStep].tooltipPageTop + 'px',
          left: steps[currentStep].tooltipPageLeft + 'px'
        }"
      >
        <div class="step-icon">
          <span>{{ currentStep + 1 }}</span>
        </div>
        <h3>
          <span class="emoji" v-if="currentStep === 0">📚</span>
          <span class="emoji" v-if="currentStep === 1">🏠</span>
          <span class="emoji" v-if="currentStep === 2">🤖</span>
          <span class="emoji" v-if="currentStep === 3">📊</span>
          <span class="emoji" v-if="currentStep >= 4">✨</span>
          新手指引 - 第{{ currentStep + 1 }}步
        </h3>
        <p>{{ steps[currentStep].desc }}</p>
        <div class="guide-buttons">
          <button @click="nextStep" class="next-btn">
            {{ currentStep === steps.length - 1 ? '完成' : '下一步' }}
          </button>
          <button 
            @click="skipGuide" 
            class="skip-btn"
            v-if="currentStep !== steps.length - 1"
          >
            跳过引导
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    // 初始化时检查是否已完成引导
    const hasDoneGuide = localStorage.getItem('newbieGuideDone');
    const steps = [
      {
        pageTop: 7,
        pageLeft: 498,
        width: 80,
        height: 40,
        tooltipPageTop: 70,
        tooltipPageLeft: 343,
        desc: '👈 点击这个“指南”按钮，可查看大模型的全部能力介绍哦~'
      },
      {
        pageTop: 7,
        pageLeft: 600,
        width: 80,
        height: 40,
        tooltipPageTop: 70,
        tooltipPageLeft: 400,
        desc: '👉 点击下一步，我们去主页看看模型等级展示~',
        targetPath: '/home'
      },
      {
        pageTop: 613,
        pageLeft: 80,
        width: 1450,
        height: 450,
        tooltipPageTop: 600,
        tooltipPageLeft: 900,
        desc: '🤖 选择不同的维度，可以体验该维度下的优秀模型奥~',
        scene: 'home'
      },
      {
        pageTop: 1100,
        pageLeft: 109,
        width: 474,
        height: 302,
        tooltipPageTop: 1000,
        tooltipPageLeft: 600,
        desc: '❤在这里可以收藏查看模型奥~',
        scene: 'home'
      },
      {
        pageTop: 7,
        pageLeft: 700,
        width: 100,
        height: 40,
        tooltipPageTop: 70,
        tooltipPageLeft: 700,
        desc: '📊 回到原页面啦~ 这个“数据集”按钮里有训练模型的核心数据',
        targetPath: '',
        scene: 'origin'
      },
      {
        pageTop: 7,
        pageLeft: 809,
        width: 80,
        height: 40,
        tooltipPageTop: 70,
        tooltipPageLeft: 800,
        desc: '📰 “新闻”按钮会推送AI领域的最新动态，记得常看哦~'
      },
      {
        pageTop: 7,
        pageLeft: 912,
        width: 80,
        height: 40,
        tooltipPageTop: 70,
        tooltipPageLeft: 850,
        desc: '📝 “文章”里有详细的AI技术解析，适合深入学习~'
      },
      {
        pageTop: 7,
        pageLeft: 1011,
        width: 100,
        height: 40,
        tooltipPageTop: 70,
        tooltipPageLeft: 860,
        desc: '👤 最后是“个人中心”，可以管理你的使用记录和偏好设置~'
      }
    ];

    return {
      currentStep: hasDoneGuide ? steps.length : 0, // 初始步骤（已完成则隐藏）
      originPath: '',
      steps,
      navHeight: 60 // 导航栏高度（根据实际页面调整，避免遮挡目标元素）
    };
  },
  mounted() {
    // 仅在需要显示引导时执行初始化
    if (this.currentStep === 0) {
      this.$nextTick(() => {
        this.originPath = this.$route.path;
        this.steps[3].targetPath = this.originPath;
        this.bindTargetClick();
        // 首次加载时滚动到第一个引导位置
        this.scrollToCurrentStep();
      });
    }
  },
  watch: {
    // 步骤变化时自动滚动到对应位置
    currentStep() {
      this.bindTargetClick();
      this.scrollToCurrentStep();
    }
  },
  methods: {
    nextStep() {
      const currentStep = this.steps[this.currentStep];
      if (currentStep.targetPath) {
        // 路由跳转后，确保滚动到目标步骤位置
        this.$router.push(currentStep.targetPath).then(() => {
          this.$nextTick(() => {
            this.currentStep++;
            this.scrollToCurrentStep(); // 跳转后补充滚动
          });
        });
      } else {
        this.currentStep++;
      }
      if (this.currentStep >= this.steps.length) {
        this.finishGuide();
      }
    },
    skipGuide() {
      this.finishGuide();
    },
    finishGuide() {
      localStorage.setItem('newbieGuideDone', 'true');
      this.currentStep = this.steps.length;
    },
    resetGuide() {
      localStorage.removeItem('newbieGuideDone');
      this.currentStep = 0;
      this.$nextTick(() => {
        this.bindTargetClick();
        this.scrollToCurrentStep(); // 重置后滚动到第一步
      });
    },
    // 核心：滚动到当前步骤的目标位置
    scrollToCurrentStep() {
      if (this.currentStep >= this.steps.length) return;
      
      const currentStep = this.steps[this.currentStep];
      // 计算滚动位置：目标元素top - 导航栏高度（避免被顶部导航遮挡）
      const scrollTop = currentStep.pageTop - this.navHeight-200;
      
      // 平滑滚动到目标位置（behavior: 'smooth' 实现动画效果）
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    },
    bindTargetClick() {
      if (this.currentStep >= this.steps.length) return;
      
      const step = this.steps[this.currentStep];
      // 创建临时元素计算目标位置
      const tempEl = document.createElement('div');
      tempEl.style.position = 'absolute';
      tempEl.style.top = step.pageTop + 'px';
      tempEl.style.left = step.pageLeft + 'px';
      tempEl.style.width = step.width + 'px';
      tempEl.style.height = step.height + 'px';
      document.body.appendChild(tempEl);
      
      // 找到目标元素并绑定点击事件
      const targetEls = document.elementsFromPoint(
        tempEl.getBoundingClientRect().left + 10,
        tempEl.getBoundingClientRect().top + 10
      );
      document.body.removeChild(tempEl);
      
      if (targetEls.length > 1) {
        const targetEl = targetEls[1]; // 排除遮罩层本身
        targetEl.addEventListener('click', this.handleTargetClick, { once: true });
      }
    },
    handleTargetClick() {
      this.nextStep();
    },
    // 庆祝效果（保持原有逻辑）
    showCelebration() {
      console.log("引导完成，显示庆祝文字");
      const text = '🎉 引导完成！开始体验吧～';
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999999;
        text-align: center;
      `;
      document.body.appendChild(container);

      text.split('').forEach((char, index) => {
        const charEl = document.createElement('span');
        charEl.textContent = char;
        charEl.style.cssText = `
          display: inline-block;
          font-size: ${16 + Math.random() * 10}px;
          color: ${this.getRandomColor()};
          position: relative;
          opacity: 0;
          transform: translate(0, 0) rotate(0deg);
        `;
        container.appendChild(charEl);

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 150;
        const rotate = Math.random() * 360;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        setTimeout(() => {
          let start = null;
          const duration = 2000;

          function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;

            if (progress < 1) {
              const currentX = x * progress;
              const currentY = y * progress;
              const currentRotate = rotate * progress;
              const currentOpacity = 1 - progress;

              charEl.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotate}deg)`;
              charEl.style.opacity = currentOpacity;
              requestAnimationFrame(animate);
            } else {
              charEl.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
              charEl.style.opacity = 0;
            }
          }

          requestAnimationFrame(animate);
        }, index * 100);
      });

      setTimeout(() => {
        container.remove();
      }, 3000);
    },
    getRandomColor() {
      const colors = [
        '#FF5252', '#FF4081', '#E91E63', 
        '#FFEB3B', '#FFC107', '#FF9800',
        '#4CAF50', '#8BC34A', '#03A9F4',
        '#2196F3', '#9C27B0', '#E040FB'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }
};
</script>

<style scoped>
/* 调试按钮样式 */
.reset-guide-btn {
  position: fixed;
  top: 100px;
  right: 100px;
  z-index: 999999;
  padding: 6px 12px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

/* 引导遮罩层样式 */
.guide-mask {
  position: absolute;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  pointer-events: auto;
  z-index: 9999;
  animation: breath 3s infinite ease-in-out;
}
.guide-mask.mask-home {
  box-shadow: 0 0 0 9999px rgba(30, 144, 255, 0.3); /* 主页蓝色调遮罩 */
}
.guide-mask.mask-origin {
  box-shadow: 0 0 0 9999px rgba(72, 209, 204, 0.3); /* 原页面青色调遮罩 */
}

/* 呼吸动画 */
@keyframes breath {
  0%, 100% {
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 255, 255, 0.8);
  }
  50% {
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 1);
  }
}

/* 引导提示框动画 */
.guide-fade-enter-active, .guide-fade-leave-active {
  transition: all 0.5s ease;
}
.guide-fade-enter-from, .guide-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 引导提示框样式 */
.guide-tooltip {
  position: absolute;
  background: white;
  padding: 16px 16px 12px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  width: 280px;
  pointer-events: auto;
  z-index: 99999;
  transition: all 0.3s ease;
}
.guide-tooltip.tooltip-home {
  border-left: 4px solid #1e8fff63; /* 主页蓝色边框 */
}
.guide-tooltip.tooltip-origin {
  border-left: 4px solid #48d1cd72; /* 原页面青色边框 */
}

/* 步骤图标 */
.step-icon {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 28px;
  height: 28px;
  background: #666;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}
.tooltip-home .step-icon {
  background: #1E90FF;
}
.tooltip-origin .step-icon {
  background: #48D1CC;
}

/* 表情符号 */
.emoji {
  margin-right: 8px;
  font-size: 1.2em;
}

/* 按钮样式 */
.guide-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.next-btn {
  padding: 6px 18px;
  background: #666;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}
.next-btn:hover {
  background: #555;
  transform: translateY(-1px);
}
.skip-btn {
  padding: 6px 18px;
  background: #f0f0f0;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}
.skip-btn:hover {
  background: #e8e8e8;
  transform: translateY(-1px);
}
.next-btn:last-child:not(.skip-btn) {
  background: #4CAF50;
  padding: 6px 24px;
}
.next-btn:last-child:not(.skip-btn):hover {
  background: #45a049;
  transform: translateY(-2px);
}

/* 基础容器样式 */
.newbie-guide {
  position: static;
}
</style>