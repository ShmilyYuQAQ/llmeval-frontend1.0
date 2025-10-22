<template>
  <!-- 原有引导内容不变 -->
  <div class="newbie-guide">
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
        <!-- 步骤图标和内容不变 -->
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
    return {
      currentStep: 0,
      originPath: '',
      steps: [
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
            tooltipPageTop: 470,
            tooltipPageLeft: 900,
            desc: '🤖 选择不同的维度，可以体验该维度下的优秀模型奥~',
            scene: 'home' // 主页场景标识
          },
          {
            pageTop: 1100,
            pageLeft: 109,
            width: 474,
            height: 302,
            tooltipPageTop: 1000,
            tooltipPageLeft: 600,
            desc: '❤在这里可以收藏查看模型奥~',
            scene: 'home' // 主页场景标识
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
            scene: 'origin' // 原页面场景标识
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
        ]
    };
  },
  // 其他生命周期和方法不变（省略）
  mounted() {
    this.$nextTick(() => {
      this.originPath = this.$route.path;
      this.steps[3].targetPath = this.originPath;
      this.bindTargetClick();
    });
  },
  watch: {
    currentStep() {
      this.bindTargetClick();
    }
  },
  methods: {
    // 其他方法不变（省略）
    nextStep() {
      // 原逻辑不变
      const currentStep = this.steps[this.currentStep];
      if (currentStep.targetPath) {
        this.$router.push(currentStep.targetPath).then(() => {
          this.$nextTick(() => {
            this.currentStep++;
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
      // 调用烟花文字效果
      // this.showCelebration();
    },
    bindTargetClick() {
        if (this.currentStep >= this.steps.length) return;
        
        const step = this.steps[this.currentStep];
        // 创建临时元素计算位置，找到页面中对应的目标元素
        const tempEl = document.createElement('div');
        tempEl.style.position = 'absolute';
        tempEl.style.top = step.pageTop + 'px';
        tempEl.style.left = step.pageLeft + 'px';
        tempEl.style.width = step.width + 'px';
        tempEl.style.height = step.height + 'px';
        document.body.appendChild(tempEl);
        
        // 找到与目标位置重叠的元素（简单实现，可根据实际优化）
        const targetEls = document.elementsFromPoint(
          tempEl.getBoundingClientRect().left + 10,
          tempEl.getBoundingClientRect().top + 10
        );
        document.body.removeChild(tempEl);
        
        // 给目标元素绑定点击事件
        if (targetEls.length > 1) {
          const targetEl = targetEls[1]; // 排除遮罩层本身
          targetEl.addEventListener('click', this.handleTargetClick, { once: true });
        }
      },
    handleTargetClick() {
      this.nextStep();
    },
    // 核心：烟花文字散落效果
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

        // 计算随机动画参数
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 150;
        const rotate = Math.random() * 360;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        // 用JS定时器实现动画（不依赖CSS动画）
        setTimeout(() => {
          let start = null;
          const duration = 2000; // 动画时长2秒

          function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;

            if (progress < 1) {
              // 动画进行中：计算当前位置
              const currentX = x * progress;
              const currentY = y * progress;
              const currentRotate = rotate * progress;
              const currentOpacity = 1 - progress;

              charEl.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotate}deg)`;
              charEl.style.opacity = currentOpacity;
              requestAnimationFrame(animate);
            } else {
              // 动画结束：到达最终位置
              charEl.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
              charEl.style.opacity = 0;
            }
          }

          // 启动动画
          requestAnimationFrame(animate);
        }, index * 100); // 错开每个字符的动画开始时间
      });

      // 3秒后移除容器
      setTimeout(() => {
        container.remove();
      }, 3000);
    },
    // 生成随机亮色（适合烟花效果）
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
/* 原有样式不变，新增烟花效果样式 */

/* 烟花容器：固定在屏幕中心 */
.firework-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
  text-align: center;
}

/* 单个文字元素样式 */
.firework-char {
  display: inline-block;
  position: relative;
  opacity: 0;
  animation: firework 2s ease-out forwards;
}

/* 烟花散落动画 */
@keyframes firework {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    /* 直接使用JS计算好的x/y位移，替代三角函数 */
    transform: translate(var(--x), var(--y)) rotate(var(--rotate));
    opacity: 0;
  }
}

/* 原有其他样式不变（省略） */
.newbie-guide {
  position: static;
}

/* 遮罩层基础样式 + 呼吸动画 */
.guide-mask {
  position: absolute;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  pointer-events: auto;
  z-index: 9999;
  animation: breath 3s infinite ease-in-out;
}

/* 不同场景的遮罩层样式区分 */
.guide-mask.mask-home {
  box-shadow: 0 0 0 9999px rgba(30, 144, 255, 0.3); /* 主页：蓝色调遮罩 */
}
.guide-mask.mask-origin {
  box-shadow: 0 0 0 9999px rgba(72, 209, 204, 0.3); /* 原页面：青色调遮罩 */
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

/* 提示框动画 */
.guide-fade-enter-active, .guide-fade-leave-active {
  transition: all 0.5s ease;
}
.guide-fade-enter-from, .guide-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 提示框基础样式 */
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

/* 不同场景的提示框样式区分 */
.guide-tooltip.tooltip-home {
  border-left: 4px solid #1e8fff63; /* 主页：蓝色边框 */
}
.guide-tooltip.tooltip-origin {
  border-left: 4px solid #48d1cd72; /* 原页面：青色边框 */
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

/* 按钮样式优化 */
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

/* 最后一步完成按钮 */
.next-btn:last-child:not(.skip-btn) {
  background: #4CAF50;
  padding: 6px 24px;
}
.next-btn:last-child:not(.skip-btn):hover {
  background: #45a049;
  transform: translateY(-2px);
}
</style>