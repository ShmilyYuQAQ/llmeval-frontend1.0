<template>
    <div class="pyramid">
        <div class="level level-1">
            <div class="text">初级</div>
        </div>
        <div class="level level-2">
            <div class="text">中级</div>
        </div>
        <div class="level level-3">
            <div class="text">高级</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Pyramid",
};
</script>

<style scoped>
.pyramid {
    position: relative;
    width: 100px;
    height: 100px;
}

.level {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
}

.level-1 {
    border-bottom: 50px solid #f3f3f3; /* 金字塔底色 */
    bottom: 0;
}

.level-2 {
    border-bottom: 35px solid #f3f3f3; /* 金字塔第二层颜色 */
    bottom: 15px;
}

.level-3 {
    border-bottom: 20px solid #f3f3f3; /* 金字塔顶层颜色 */
    bottom: 35px;
}

.text {
    position: absolute;
    bottom: -30px;
    left: -25px;
    width: 50px;
    text-align: center;
}
</style>
