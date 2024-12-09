<template>
    <div class="guide-card">
        <div class="card-body">
            <svg :v-if="judge[0]" data-v-dbd322da="" class="guide-svg" width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" w="40" m="y-12"><circle data-v-dbd322da="" cx="80" cy="60" r="60" fill="var(--guide-c-0)"></circle><rect data-v-dbd322da="" x="47" y="55" width="66" height="46" rx="4" fill="#0077CE"></rect><path data-v-dbd322da="" d="M53 19C53 16.7909 54.7909 15 57 15H96L106.054 26.8815C106.665 27.6037 107 28.5191 107 29.4652V61C107 63.2091 105.209 65 103 65H57C54.7909 65 53 63.2091 53 61V19Z" fill="var(--guide-c-1)"></path><path data-v-dbd322da="" d="M47 64C47 61.7909 48.7909 60 51 60H92.0279C93.543 60 94.928 59.144 95.6056 57.7889L95.8944 57.2111C96.572 55.856 97.957 55 99.4721 55H109C111.209 55 113 56.7909 113 59V95C113 97.2091 111.209 99 109 99H51C48.7909 99 47 97.2091 47 95V64Z" fill="#20A0FF"></path><path data-v-dbd322da="" d="M63.0527 85H58.1719V75.9238H62.8477V76.9668H59.3438V79.873H62.5898V80.9102H59.3438V83.9629H63.0527V85ZM64.6172 85V75.4082H65.7656V85H64.6172ZM73.1016 82.0527H68.5664C68.5859 82.7441 68.7754 83.2793 69.1348 83.6582C69.4941 84.0332 69.9961 84.2207 70.6406 84.2207C71.3672 84.2207 72.0332 83.9883 72.6387 83.5234V84.5488C72.0684 84.9512 71.3125 85.1523 70.3711 85.1523C69.4336 85.1523 68.7012 84.8555 68.1738 84.2617C67.6504 83.668 67.3887 82.8438 67.3887 81.7891C67.3887 80.7969 67.6758 79.9785 68.25 79.334C68.8281 78.6895 69.5449 78.3672 70.4004 78.3672C71.248 78.3672 71.9102 78.6406 72.3867 79.1875C72.8633 79.7305 73.1016 80.4922 73.1016 81.4727V82.0527ZM71.9531 81.1328C71.9492 80.5469 71.8105 80.0938 71.5371 79.7734C71.2637 79.4531 70.8789 79.293 70.3828 79.293C69.9258 79.293 69.5293 79.4629 69.1934 79.8027C68.8613 80.1426 68.6523 80.5859 68.5664 81.1328H71.9531ZM83.959 85H82.8105V81.2793C82.8105 80.5762 82.7012 80.0742 82.4824 79.7734C82.2637 79.4688 81.9043 79.3164 81.4043 79.3164C80.9824 79.3164 80.6211 79.5137 80.3203 79.9082C80.0195 80.3027 79.8691 80.7695 79.8691 81.3086V85H78.7207V81.1621C78.7207 79.9316 78.2461 79.3164 77.2969 79.3164C76.8594 79.3164 76.4961 79.5039 76.207 79.8789C75.9219 80.2539 75.7793 80.7324 75.7793 81.3145V85H74.6309V78.5195H75.7793V79.5449H75.8027C76.2637 78.7598 76.9375 78.3672 77.8242 78.3672C78.2578 78.3672 78.6406 78.4863 78.9727 78.7246C79.3047 78.9629 79.5352 79.2852 79.6641 79.6914C80.1445 78.8086 80.8633 78.3672 81.8203 78.3672C83.2461 78.3672 83.959 79.2461 83.959 81.0039V85ZM91.1602 82.0527H86.625C86.6445 82.7441 86.834 83.2793 87.1934 83.6582C87.5527 84.0332 88.0547 84.2207 88.6992 84.2207C89.4258 84.2207 90.0918 83.9883 90.6973 83.5234V84.5488C90.127 84.9512 89.3711 85.1523 88.4297 85.1523C87.4922 85.1523 86.7598 84.8555 86.2324 84.2617C85.709 83.668 85.4473 82.8438 85.4473 81.7891C85.4473 80.7969 85.7344 79.9785 86.3086 79.334C86.8867 78.6895 87.6035 78.3672 88.459 78.3672C89.3066 78.3672 89.9688 78.6406 90.4453 79.1875C90.9219 79.7305 91.1602 80.4922 91.1602 81.4727V82.0527ZM90.0117 81.1328C90.0078 80.5469 89.8691 80.0938 89.5957 79.7734C89.3223 79.4531 88.9375 79.293 88.4414 79.293C87.9844 79.293 87.5879 79.4629 87.252 79.8027C86.9199 80.1426 86.7109 80.5859 86.625 81.1328H90.0117ZM98.168 85H97.0254V81.3145C97.0254 79.9824 96.5391 79.3164 95.5664 79.3164C95.0625 79.3164 94.6484 79.5039 94.3242 79.8789C94 80.2539 93.8379 80.7285 93.8379 81.3027V85H92.6895V78.5195H93.8379V79.5918H93.8613C94.3496 78.7754 95.0586 78.3672 95.9883 78.3672C96.6992 78.3672 97.2402 78.5957 97.6113 79.0527C97.9824 79.5059 98.168 80.168 98.168 81.0391V85ZM103.195 84.9355C102.945 85.0723 102.607 85.1406 102.182 85.1406C101.021 85.1406 100.441 84.498 100.441 83.2129V79.4688H99.3281V78.5195H100.441V76.9609L101.584 76.5977V78.5195H103.195V79.4688H101.584V83.0078C101.584 83.4336 101.656 83.7383 101.801 83.9219C101.945 84.1055 102.186 84.1973 102.521 84.1973C102.779 84.1973 103.004 84.125 103.195 83.9805V84.9355Z" fill="#0077CE"></path><rect data-v-dbd322da="" x="58" y="23" width="28" height="4" fill="#20A0FF"></rect><rect data-v-dbd322da="" x="58" y="46" width="24" height="4" fill="var(--guide-c-3)"></rect><rect data-v-dbd322da="" x="58" y="37" width="44" height="4" fill="var(--guide-c-3)"></rect><path data-v-dbd322da="" d="M123.142 15.4872L124.536 10.4687C124.808 9.49219 126.192 9.49219 126.464 10.4687L127.858 15.4872C127.947 15.8078 128.189 16.0631 128.505 16.1683L134.154 18.0513C135.066 18.3552 135.066 19.6448 134.154 19.9487L128.505 21.8317C128.189 21.9369 127.947 22.1922 127.858 22.5128L126.464 27.5313C126.192 28.5078 124.808 28.5078 124.536 27.5313L123.142 22.5128C123.053 22.1922 122.811 21.9369 122.495 21.8317L116.846 19.9487C115.934 19.6448 115.934 18.3552 116.846 18.0513L122.495 16.1683C122.811 16.0631 123.053 15.8078 123.142 15.4872Z" fill="#FFACAD"></path><path data-v-dbd322da="" d="M119.096 37.7612L120.443 34.3927C120.644 33.8898 121.356 33.8898 121.557 34.3927L122.905 37.7612C122.965 37.9136 123.086 38.0345 123.239 38.0954L126.607 39.4429C127.11 39.6441 127.11 40.3559 126.607 40.5571L123.239 41.9044C123.086 41.9654 122.965 42.0862 122.904 42.2387L121.557 45.6072C121.356 46.1101 120.644 46.1101 120.443 45.6072L119.096 42.2387C119.035 42.0862 118.914 41.9654 118.761 41.9044L115.393 40.5571C114.89 40.3559 114.89 39.6441 115.393 39.4429L118.761 38.0955C118.914 38.0345 119.035 37.9137 119.096 37.7612Z" fill="#FFD6D2"></path></svg>
            <svg :v-if="judge[1]" data-v-26636085="" class="component-svg" width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" w="40" m="y-12"><circle data-v-26636085="" cx="80" cy="60" r="60" fill="var(--component-c-0)"></circle><path data-v-26636085="" d="M37 23C37 20.7909 38.7909 19 41 19H101C103.209 19 105 20.7909 105 23V97C105 99.2091 103.209 101 101 101H45C40.5817 101 37 97.4183 37 93V23Z" fill="var(--component-c-1)"></path><path data-v-26636085="" d="M112.048 91H49.0484C49.8484 95.4 46.715 99.5 45.0484 101H107.548C114.348 100.6 113.382 94.1667 112.048 91Z" fill="var(--component-c-2)"></path><path data-v-26636085="" d="M121.5 5.5L114.883 19.2063C114.791 19.3981 115.022 19.5824 115.188 19.4494L127 10L121.5 5.5Z" fill="#FFACAD"></path><path data-v-26636085="" d="M121.68 21.3628L115.49 27.0342C115.145 27.3502 115.385 27.9246 115.852 27.9022L124.153 27.5051C124.496 27.4887 124.721 27.1389 124.593 26.8199L122.482 21.5456C122.352 21.2211 121.938 21.1266 121.68 21.3628Z" fill="#FFD6D2"></path><path data-v-26636085="" d="M37 22C37 19.7909 38.7909 18 41 18H101C103.209 18 105 19.7909 105 22V32H37V22Z" fill="#0077CE"></path><path data-v-26636085="" d="M37 22C37 19.7909 38.7909 18 41 18H101C103.209 18 105 19.7909 105 22V30H37V22Z" fill="#20A0FF"></path><circle data-v-26636085="" cx="44" cy="25" r="2" fill="#0077CE"></circle><circle data-v-26636085="" cx="51" cy="25" r="2" fill="#0077CE"></circle><circle data-v-26636085="" cx="60" cy="25" r="2" fill="#0077CE"></circle><rect data-v-26636085="" x="45" y="38" width="14" height="4" fill="var(--component-c-3)"></rect><rect data-v-26636085="" x="45" y="55" width="14" height="4" fill="var(--component-c-3)"></rect><rect data-v-26636085="" x="45" y="45" width="50" height="4" fill="var(--component-c-4)"></rect><rect data-v-26636085="" x="45" y="62" width="50" height="4" fill="var(--component-c-4)"></rect><rect data-v-26636085="" x="61" y="75" width="20" height="6" rx="3" fill="#20A0FF"></rect><path data-v-26636085="" fill-rule="evenodd" clip-rule="evenodd" d="M87 42C85.8954 42 85 42.8954 85 44V69C85 70.1046 85.8954 71 87 71H96.6154L98 75.5H100.5L99.15 71H132C133.105 71 134 70.1046 134 69V44C134 42.8954 133.105 42 132 42H87Z" fill="var(--component-c-5)"></path><path data-v-26636085="" fill-rule="evenodd" clip-rule="evenodd" d="M89 42C87.8954 42 87 42.8954 87 44V69C87 70.1046 87.8954 71 89 71H98.6154L100 75.5L104.154 71H134C135.105 71 136 70.1046 136 69V44C136 42.8954 135.105 42 134 42H89Z" fill="var(--component-c-6)"></path><path data-v-26636085="" d="M103.391 61.7402L94.2305 57.1895V56.4473L103.391 51.3984V53.0879L96.584 56.75V56.7988L103.391 60.0605V61.7402ZM114.943 47.873L107.688 65.5098H105.9L113.156 47.873H114.943ZM126.789 57.1699L117.629 61.7207V60.041L124.445 56.8086V56.7402L117.629 53.0781V51.3887L126.789 56.4277V57.1699Z" fill="var(--component-c-7)"></path></svg>
            <svg :v-if="judge[2]" data-v-bace5ef6="" class="resource-svg" width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" w="40" m="y-12"><circle data-v-bace5ef6="" cx="80" cy="60" r="60" fill="var(--resource-c-0)"></circle><rect data-v-bace5ef6="" x="32" y="14" width="96" height="73" rx="4" fill="var(--resource-c-1)"></rect><rect data-v-bace5ef6="" x="38" y="20" width="84" height="56" fill="var(--resource-c-2)"></rect><rect data-v-bace5ef6="" x="78" y="31" width="14" height="14" fill="var(--resource-c-3)"></rect><rect data-v-bace5ef6="" x="98" y="31" width="14" height="14" fill="#FF9EA4"></rect><rect data-v-bace5ef6="" x="78" y="51" width="14" height="14" fill="#FFCFC7"></rect><rect data-v-bace5ef6="" x="57" y="51" width="14" height="14" fill="var(--resource-c-3)"></rect><path data-v-bace5ef6="" d="M127.966 82H32.0339L25 95H136L127.966 82Z" fill="#20A0FF"></path><path data-v-bace5ef6="" d="M25 95H136V97C136 98.1046 135.105 99 134 99H27C25.8954 99 25 98.1046 25 97V95Z" fill="#0077CE"></path><circle data-v-bace5ef6="" cx="37" cy="41" r="15" fill="#20A0FF"></circle><path data-v-bace5ef6="" d="M41 35H33L29 39L37 48L45 39L41 35Z" fill="white"></path><rect data-v-bace5ef6="" x="6" y="39" width="12" height="4" rx="2" fill="#FFCFC7"></rect><rect data-v-bace5ef6="" x="11.8955" y="22" width="12" height="4" rx="2" transform="rotate(28.2865 11.8955 22)" fill="#FF9EA4"></rect><rect data-v-bace5ef6="" x="23.4775" y="11" width="12" height="4" rx="2" transform="rotate(60.3794 23.4775 11)" fill="#FFCFC7"></rect></svg>
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