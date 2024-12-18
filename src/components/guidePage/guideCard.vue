<template>
    <div class="guide-card">
        <div class="card-body">
            
            <h3>{{ cardData.title }}</h3>
            <p>{{ cardData.content }}</p>
        </div>
        <div class="card-footer">
            <a href="" class="card-a">查看详情</a>
        </div>
    </div>
</template>

<script>
export default {
    props:['cardData'],
    data(){
        return{
            judge:[false,false,false]
        }
    },
    created(){
        this.judge[this.cardData.icon] = true
    }
}
</script>

<style scoped>
.guide-card{
    background: #ffffff;
    border: 1px solid #dcdfe6;
    text-align: center;
    position: relative;
    transition: all .3s;
    display: flex;
    flex-direction: column;
    margin:10px;
}
.card-body{
    padding: 0;
    height: 100%;
}
.guide-svg {
    --guide-c-0: #eff5fd;
    --guide-c-1: white;
    --guide-c-2: #d9edfe;
    --guide-c-3: #eff5fd;
    margin-top: 3rem;
    margin-bottom: 3rem;
    width: 10rem;
}
.component-svg{
    --component-c-0: #eff5fd;
    --component-c-1: white;
    --component-c-2: #d9edfe;
    --component-c-3: var(--component-c-2);
    --component-c-4: var(--component-c-2);
    --component-c-5: #6496dc;
    --component-c-6: #80a8e1;
    --component-c-7: #dff2ff;
}
.resource-svg{
    --resource-c-0: #eff5fd;
    --resource-c-1: #d9edfe;
    --resource-c-2: white;
    --resource-c-3: #eff5fd;
}
h3{
    margin: 0;
    font-size: 18px;
    color: #303133;
    font-weight: 400;
}
p{
    font-size: 14px;
    color: #99a9bf;
    padding: 0 25px;
    line-height: 20px;
    margin: 16px 0;
}
.card-footer{
    bottom: 0;
    padding: 0;
    border-top: 1px solid #e4e7ed
}
.card-footer:hover{
    background-color:#409eff;
}
a{
    line-height: 52px;
    font-size: 14px;
    color: #409eff;
    text-align: center;
    border: 0;
    padding: 0;
    cursor: pointer;
    background-color: #ffffff;
    transition: all .3s;
    text-decoration: none;
    display: block;
}
.card-a:hover{
    background-color:#409eff;
    color:#ffffff;
}
</style>