<template>
    <el-carousel indicator-position="outside" style="width: 800px">
        <el-carousel-item v-for="item in imgArray" :key="item">
            <img :src="item" class="rightImg" />
        </el-carousel-item>
    </el-carousel>
</template>
<script setup>
const imgArray = [
    new URL('./images/guide/guide1.png', import.meta.url).href,
    new URL('./images/guide/guide2.png', import.meta.url).href,
    new URL('./images/guide/guide3.png', import.meta.url).href,
    new URL('./images/guide/guide4.png', import.meta.url).href,
    new URL('./images/guide/guide5.png', import.meta.url).href,
    new URL('./images/guide/guide6.png', import.meta.url).href,
]
</script>
<style>
.rightImg {
    width: 100%;
    height: auto;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}
</style>
