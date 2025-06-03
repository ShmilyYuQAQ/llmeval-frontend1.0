<template>
    <div class="html-embed">
        <iframe
            ref="iframe"
            :src="htmlPath"
            frameborder="0"
            width="100%"
            height="100%"
            style="display: block;"
        ></iframe>
    </div>
</template>

<script>
export default {
    name: "HtmlPage",
    data() {
        return {
            htmlPath: "html/adjust/index.html", // 替换为实际路径
        };
    },
    mounted() {
        // 可以在这里监听iframe加载完成事件
        this.$refs.iframe.onload = () => {
            console.log("HTML页面加载完成");
        };
    },
};
</script>

<style scoped>
.html-embed {
    width: 100%;
    height: 100vh;
}
</style>
