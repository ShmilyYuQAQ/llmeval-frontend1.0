<template>
    <a :href="sponsor.url" target="_blank" class="sponsor-card">
        <img :src="sponsor.logo" alt="" width="45">
        <div>
            <p class="sponsor-name">{{ sponsor.name }}</p>
            <p>{{ sponsor.description }}</p>
        </div>
    </a>
</template>

<script>
export default {
    name: 'SponsorCard',
    props:['sponsor']
}
</script>

<style scoped>
.sponsor-card {
    margin: 0 20px 10px;
    height: calc(220px / 2);
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.375rem;
    display: flex;
    font-weight: 500;
    text-decoration: inherit;
    color: #409eff;
}
img{
    margin-right: 16px;
    max-width: 100%;
}
.sponsor-card>div{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
p{
    margin: 0;
    line-height: 1.8;
    color: #606266;
    font-size: 12px;
}
.sponsor-name{
    font-weight: 700;
    color: #303133;
    font-size: 14px;
}
</style>