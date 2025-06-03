<template>
    <div class="carousel-container" ref="carouselContainer">
      <div class="carousel-placeholder" :style="{ height: placeholderHeight }"></div>
      <div class="carousel-wrapper" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div class="carousel-item" v-for="(item, index) in imgArray" :key="index">
          <img :src="item" alt="轮播图片" class="carousel-image" loading="lazy" @load="handleImageLoad(index)" />
        </div>
      </div>
      
      <div class="carousel-indicators" v-if="showIndicators">
        <button 
          v-for="(item, index) in imgArray" 
          :key="index"
          :class="{ 'active': index === currentIndex }"
          @click="goToSlide(index)"
        ></button>
      </div>
      
      <button class="carousel-arrow prev" v-if="showArrows" @click="prevSlide">
        <span>❮</span>
      </button>
      <button class="carousel-arrow next" v-if="showArrows" @click="nextSlide">
        <span>❯</span>
      </button>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted, ref, watch } from 'vue'
  
  const props = defineProps({
    imgArray: {
      type: Array,
      default: () => []
    },
    autoplayInterval: {
      type: Number,
      default: 3000
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    showArrows: {
      type: Boolean,
      default: true
    },
    fixedHeight: {
      type: Boolean,
      default: true
    },
    initialHeight: {
      type: String,
      default: '400px'
    }
  })
  
  const emits = defineEmits(['change'])
  
  const currentIndex = ref(0)
  const carouselContainer = ref(null)
  const autoplayTimer = ref(null)
  const imagesLoaded = ref(new Array(props.imgArray.length).fill(false))
  const placeholderHeight = ref(props.initialHeight)
  
  const handleImageLoad = (index) => {
    imagesLoaded.value[index] = true
    updatePlaceholderHeight()
  }
  
  const updatePlaceholderHeight = () => {
    if (props.fixedHeight) return
    
    if (imagesLoaded.value.every(loaded => loaded) && carouselContainer.value) {
      const firstItem = carouselContainer.value.querySelector('.carousel-item')
      if (firstItem) {
        placeholderHeight.value = `${firstItem.offsetHeight}px`
      }
    }
  }
  
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + props.imgArray.length) % props.imgArray.length
    resetAutoplay()
  }
  
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % props.imgArray.length
    resetAutoplay()
  }
  
  const goToSlide = (index) => {
    currentIndex.value = index
    resetAutoplay()
  }
  
  const startAutoplay = () => {
    if (props.autoplay && props.imgArray.length > 1) {
      autoplayTimer.value = setInterval(() => {
        nextSlide()
      }, props.autoplayInterval)
    }
  }
  
  const stopAutoplay = () => {
    if (autoplayTimer.value) {
      clearInterval(autoplayTimer.value)
      autoplayTimer.value = null
    }
  }
  
  const resetAutoplay = () => {
    stopAutoplay()
    startAutoplay()
  }
  
  watch(() => props.imgArray, () => {
    imagesLoaded.value = new Array(props.imgArray.length).fill(false)
    updatePlaceholderHeight()
  })
  
  watch(currentIndex, (newIndex) => {
    emits('change', newIndex)
  })
  
  onMounted(() => {
    updatePlaceholderHeight()
    startAutoplay()
    
    if (carouselContainer.value && props.autoplay) {
      carouselContainer.value.addEventListener('mouseenter', stopAutoplay)
      carouselContainer.value.addEventListener('mouseleave', startAutoplay)
    }
  })
  
  onUnmounted(() => {
    stopAutoplay()
    
    if (carouselContainer.value) {
      carouselContainer.value.removeEventListener('mouseenter', stopAutoplay)
      carouselContainer.value.removeEventListener('mouseleave', startAutoplay)
    }
  })
  </script>
  
  <style scoped>
  .carousel-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    overflow: hidden;
  }
  
  .carousel-placeholder {
    width: 100%;
    position: relative;
    z-index: 1;
  }
  
  .carousel-wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .carousel-item {
    flex: 0 0 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .carousel-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .carousel-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 20;
  }
  
  .carousel-indicators button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    padding: 0;
  }
  
  .carousel-indicators button.active {
    background-color: white;
  }
  
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
    z-index: 20;
  }
  
  .carousel-arrow:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
  
  .carousel-arrow.prev {
    left: 15px;
  }
  
  .carousel-arrow.next {
    right: 15px;
  }
  
  .carousel-arrow span {
    font-size: 24px;
  }
  </style>
      