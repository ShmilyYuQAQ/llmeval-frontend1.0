<template>
  <NavBar></NavBar>
  <div class="page flex-col">
    <div class="box_1 flex-row">
      <div class="section_1 flex-col">
      <div class="box_6 flex-col">
        <span class="text_7">模型详情</span>
        <div class="text-wrapper_2">
          <span class="text_8" @click="goToHome">主页&nbsp;/</span>
          <span class="text_9" @click="refreshPage">模型详情</span>
        </div>
      </div>
      <div class="box_15 flex-row">
        <div class="group_1 flex-row">
          <div class="box_16 flex-col">
            <img 
              :src="getModelImageUrl(modelData.data.model_image_path)" 
              alt="模型形象图片" 
              class="model-image"
              @error="onImageError"
            />
          </div>
          <div class="box_17 flex-col justify-between">
            <div class="box_18 flex-row justify-between">
              <span class="text_41">{{ modelData.data.name }}</span>
              <div class="favorite-container" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
                <img
                  class="label_8"
                  @click="toggleFavorite()"
                  referrerpolicy="no-referrer"
                  :src="isFavorited 
                    ? 'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3cc872b4bf49ad002ddcbd8f1e744719404a37750157a05f0929e1c1b5e386fc' 
                    : 'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngab621b6efaf7d0824226ba1762b16f7dbcc30d0e400c533159bdcefd3732cde0'"
                  alt="收藏状态"
                />
                <div v-if="showTooltip" class="text-wrapper_52 flex-col">
                  <span class="text_96">{{ isFavorited ? '取消收藏' : '收藏模型' }}</span>
                </div>
              </div>
              <div class="group_2 flex-row justify-between" v-if="!modelData.data.isOpenSource">
                <img
                  class="thumbnail_11"
                  referrerpolicy="no-referrer"
                  src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPng8dbd2b6f2cee1a4a1b75a8f4e568b2ea3cf6426e0be1c2c7e518c69f21923744"
                />
                <span class="text_42">不开源</span>
              </div>
              <div class="group_3 flex-row justify-between" v-if="modelData.data.isOpenSource">
                <img
                  class="thumbnail_12"
                  referrerpolicy="no-referrer"
                  src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPng1b8cd4b5b4b34458a62e854cea507e549acfe3dd9e5862c88595473eb3d3be9d"
                />
                <span class="text_43">开源</span>
              </div>
            </div>
            <div class="box_19 flex-row">
              <img
                class="thumbnail_13"
                referrerpolicy="no-referrer"
                src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPng03d5cb3b1c3c9a06e9d51b1869c6e27f9d428a133060bd5c4c2328c0816aeb47"
              />
              <span class="text_44"
                >{{ modelData.data.description }}</span
              >
            </div>
          </div>
          <div class="text-wrapper_100 flex-col justify-between">
            <div class="block score-row">
                <el-rate
                    v-model="value2"
                    :colors="colors"
                    :disabled="true"
                    style="font-size:20px;"
                ></el-rate>
                <span v-if="value2" class="score-text">{{ value2 }}分</span>
            </div>
            <span class="text_100">总评分</span>
          </div>
          <div class="text-wrapper_7 flex-col justify-between">
            <span class="text_45">{{ modelData.data.institution }}</span>
            <span class="text_46">发布机构</span>
          </div>
          <div class="text-wrapper_8 flex-col justify-between">
            <span class="text_47">{{ modelData.data.releaseDate }}</span>
            <span class="text_48">发布时间</span>
          </div>
          <div class="text-wrapper_9 flex-col" @click="openModelLink">
            <span class="text_49">模型试用</span>
          </div>
        </div>
        <img
          class="image_5"
          referrerpolicy="no-referrer"
          src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPng37f956792f11a6fcb3dbabde47cafdb68f75a42243075563f119ecaccf221fc5"
        />
        <ShowTag :tags="tags" :highlightKeyword="highlightKeyword"></ShowTag>

      </div>
      <!-- 在 box_15 后面，加一个新 div 包住评论区 -->
      <div class="comment-wrapper">
        <CommentList 
          :modelId="modelData.data.modelId" 
          @refresh-model-detail="refreshModelDetail" 
        />
      </div>
    </div>
  </div> 
</div>
</template>

<script>
import axios from 'axios';
import NavBar from './guidePage/NavBar.vue';
import ShowTag from './ModelDetailPage/ShowTags.vue';
import ShowReviews from './ModelDetailPage/ShowReview.vue';
import CommentList from './Comments/CommentList.vue';
import Footer from './Footer.vue';
import { useRouter } from "vue-router";
export default{
  props: ['name','highlightKeyword'], // 接收路由参数
  data() {
    return {
      modelData: null,
      newComment: "", // 存储输入的评论
      comments: [],
      userId: 7,
      deep: 0,
      answerId: null,
      status: true,
      tags: [],
      isFavorited: false, // 存储收藏状态
      modelId: null,
      showTooltip: false, // 控制提示文本的显示
      value2:  null, // 新增
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // 新增
      highlightKeyword:""
    }
  },

  async created() {
    try {
      const modelResponse = await axios.get(`http://49.233.82.133:9091/model/name?name=${this.name}`);
      if (modelResponse.data) {
        console.log(modelResponse.data);
        this.modelData = modelResponse.data;
        this.modelId = modelResponse.data.data.modelId;
      }

      const modelScoreResponse = await axios.get(`http://49.233.82.133:9091/model/rating/stats?modelId=${this.modelId}`);
      if (modelScoreResponse.data.success) {
        this.value2 = modelScoreResponse.data.data.averageRating;
      }

      const modelTagResponse = await axios.get(`http://49.233.82.133:9091/tag/model?modelId=${this.modelId}`);
      if (modelTagResponse.data.success){
        this.tags = modelTagResponse.data.data;
      }
      const token = localStorage.getItem('token');
      // 检查用户是否已经收藏该模型
      const favoriteResponse = await axios.get(`http://49.233.82.133:9091/user/favorites/check?modelId=${this.modelId}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (favoriteResponse.data.success) {
        this.isFavorited = favoriteResponse.data.data.isFavorited;
      }

      const commentsResponse = await axios.get(`http://49.233.82.133:9091/model/comment/tree?modelId=${this.modelId}`);
      if(commentsResponse.data.success){
        this.comments = commentsResponse.data.data;
        console.log(this.comments);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  setup() {
    const router = useRouter();

    const goToHome = () => {
      router.push("/home"); // 跳转到主页
    };

    const refreshPage = () => {
      window.location.reload(); // 刷新当前页面
    };

    return {
      goToHome,
      refreshPage,
    };
  },
  components:{
    NavBar,
    ShowTag,
    ShowReviews,
    CommentList,
    Footer,
  },
  mounted() {
    this.highlightKeyword = this.$route.query.highlight || "";
    console.log("highlightKeyword:", this.highlightKeyword);
  },
  methods: {
    async refreshModelDetail() {
      this.fetchTotalRate(); // 重新拉取数据
    },

    fetchTotalRate() {
      axios.get(`http://49.233.82.133:9091/model/rating/stats?modelId=${this.modelId}`)
        .then(response => {
          if (response.data.success) {
            this.value2 = response.data.data.averageRating;
          }
        })
        .catch(error => {
          console.error('Error fetching total rating:', error);
        });
    },

    openModelLink() {
      if (this.modelData && this.modelData.data && this.modelData.data.model_link) {
        window.open(this.modelData.data.model_link, "_blank"); // 在新选项卡中打开链接
      } else {
        alert("模型链接不可用！");
      }
    },

    onImageError(event) {
      // 只在不是默认图片时才切换，避免死循环
      if (!event.target.src.includes('/images/logo1.png')) {
        event.target.src = '/images/logo1.png';
      }
    },

    getModelImageUrl(imagePath) {
      if (!imagePath) {
        return '/images/logo1.png';
      }
      const relativePath = imagePath.split('/images/')[1];
      if (!relativePath) {
        return '/images/logo1.png';
      }
      return `/images/${relativePath}`;
    },

    async toggleFavorite() {
      try {
        const url = this.isFavorited
          ? `http://49.233.82.133:9091/user/favorites/delete?modelId=${this.modelId}`
          : `http://49.233.82.133:9091/user/favorites/add?modelId=${this.modelId}`
        
        // 立即更新按钮状态
        const token = localStorage.getItem('token');
        const response = this.isFavorited
          ? await axios.delete(url, {headers: {'Authorization': `Bearer ${token}`}})
          : await axios.post(url, null, {headers: {'Authorization': `Bearer ${token}`}})
        if (response.data.success) {
          // 操作成功后，调用检查接口来确定收藏按钮的状态
          const checkResponse = await axios.get(`http://49.233.82.133:9091/user/favorites/check?modelId=${this.modelId}`,{headers: {'Authorization': `Bearer ${token}`}});
          if (checkResponse.data.success) {
            this.isFavorited = checkResponse.data.data.isFavorited;
            const modelResponse = await axios.get(`http://49.233.82.133:9091/model/modelId?modelId=${this.modelId}`);
            if (modelResponse.data) {
              this.modelData = modelResponse.data;
            }
          } else {
            alert("检查收藏状态失败：" + checkResponse.data.errorMsg);
          }
        } else {
          alert("操作失败：" + response.data.errorMsg);
          // 如果操作失败，恢复原来的状态
          this.isFavorited = !this.isFavorited;
        }
      } catch (error) {
        // 如果操作失败，恢复原来的状态
        alert("请先登录！")
      }
    },
  },

}

</script>

<style scoped>
.page {
  background-color: rgba(248, 249, 251, 1);
  position: relative;
  width: 100%;
  height: auto;
  overflow: visible;
}

.box_1 {
  width: 100%;
  height: auto;
}

.section_1 {
  width: 1600px;
  height: auto;
  display: flex;
  flex-direction: column;
}

.box_2 {
  box-shadow: inset 0px -1px 0px 0px rgba(231, 233, 241, 1);
  background-color: rgba(255, 255, 255, 1);
  height: 56px;
  width: 1440px;
}

.box_3 {
  width: 1392px;
  height: 38px;
  margin: 9px 0 0 20px;
}

.image_1 {
  width: 175px;
  height: 36px;
  margin-top: 1px;
}

.thumbnail_1 {
  width: 16px;
  height: 16px;
  margin: 11px 0 0 349px;
}

.text_1 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 9px 0 0 8px;
}

.thumbnail_2 {
  width: 16px;
  height: 16px;
  margin: 11px 0 0 39px;
}

.text_2 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(133, 147, 188, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 9px 0 0 8px;
}

.thumbnail_3 {
  width: 16px;
  height: 16px;
  margin: 11px 0 0 39px;
}

.text_3 {
  width: 28px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(133, 147, 188, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 9px 0 0 8px;
}

.thumbnail_4 {
  width: 16px;
  height: 16px;
  margin: 11px 0 0 39px;
}

.text_4 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(133, 147, 188, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 9px 0 0 8px;
}

.label_1 {
  width: 38px;
  height: 38px;
  margin-left: 357px;
}

.text-wrapper_1 {
  width: 112px;
  height: 37px;
  margin-left: 8px;
}

.text_5 {
  width: 112px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
}

.text_6 {
  width: 48px;
  height: 17px;
  overflow-wrap: break-word;
  color: rgba(133, 147, 188, 1);
  font-size: 12px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 17px;
}

.box_4 {
  width: 72px;
  height: 2px;
  margin: 7px 0 0 534px;
}

.box_5 {
  background-color: rgba(135, 0, 102, 1);
  width: 72px;
  height: 2px;
}

.box_6 {
  background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/d04fe58e7908474bac11499b05c126d2_mergeImage.png);
  width: 100%; /* 宽度与父容器一致 */
  max-width: 1600px; /* 设置最大宽度，防止过宽 */
  height: 240px; /* 高度保持不变 */
  background-size: cover; /* 确保背景图片覆盖整个容器 */
  background-position: center; /* 将背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  margin: 0 auto; /* 水平居中 */
  margin-bottom: auto; /* 保持原有的下边距 */
  display: flex; /* 如果需要在背景上添加内容，可以使用 flex 布局 */
  flex-direction: column; /* 设置为垂直排列 */
  position: relative; /* 使子元素可以绝对定位 */
}

.text_7 {
  width: 128px;
  height: 45px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: bold; /* 设置加粗 */
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 45px;
  margin: 58px 0 0 0; /* 移除固定的 margin-left */
  padding-left: 180px; /* 确保子元素的左边距一致 */
  display: block; /* 确保是块级元素 */
}

.text-wrapper_2 {
  width: 97px;
  height: 18px;
  overflow-wrap: break-word;
  font-size: 0;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 15px 0 106px 0; /* 移除固定的 margin-left */
  padding-left: 180px; /* 使用 padding-left 确保与父容器对齐 */
  display: block; /* 确保是块级元素 */
}

.text_8 {
  width: 97px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(116, 140, 154, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  cursor: pointer; /* 鼠标悬停时变为手指形状 */
}

.text_9 {
  width: 97px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  cursor: pointer; /* 鼠标悬停时变为手指形状 */
}


.image-text_1 {
  width: 130px;
  height: 22px;
  margin: 24px 0 0 20px;
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
}

.box_7 {
  width: 1160px;
  height: 83px;
  margin: 20px 0 0 20px;
}

.text-wrapper_3 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  height: 83px;
  width: 1066px;
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
  margin: 20px 0 0 20px;
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
  margin: 6px 0 0 4px;
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
  margin: 6px 0 0 772px;
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
  margin: 6px 0 0 20px;
}

.text_15 {
  width: 400px;
  height: auto;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  text-align-last: justify; /* 强制最后一行两端对齐 */
  line-height: 20px;
  margin: 10px 0 0 190px;
}

.box_9 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  width: 1068px;
  height: 76px;
  justify-content: flex-center;
  margin: 16px 0 0 114px;
}

.image-text_3 {
  width: 82px;
  height: 32px;
  margin: 12px 0 0 20px;
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
  margin-top: 6px;
}

.text_16 {
  width: 500px;
  height: 40px;
  overflow-wrap: break-word;
  color: rgba(102, 106, 117, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  line-height: 20px;
  margin-top: 18px;
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
  margin: 18px 0 0 20px;
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
  margin: 18px 20px 0 20px;
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
  width: 134px;
  height: 20px;
  overflow-wrap: break-word;
  font-size: 0;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin-top: 6px;
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
  margin: 18px 0 0 468px;
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
  margin: 18px 20px 0 20px;
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

.box_15 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 16px;

  top: 150px; /* 距离顶部 150px */
  width: 1200px; /* 固定宽度 */
  height: auto; /* 固定高度 */
  margin: -80px auto 0 auto; /* 👈 向上压 60px，其他保持不变 */
  left: 0; /* 确保居中时从页面左侧开始计算 */
  right: 0; /* 确保居中时从页面右侧结束计算 */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: flex-start; /* 子元素从顶部开始排列 */
  align-items: flex-start; /* 子元素靠左对齐 */
  padding: 20px 20px 30px 20px; /* 上、右、下、左内边距 */
  border: 1px solid #ddd;
  z-index: 2; /* 可选，确保它在上面 */
}

.group_1 {
  display: flex; /* 使用 flex 布局 */
  flex-direction: row; /* 水平排列子元素 */
  align-items: center; /* 子元素垂直居中 */
  justify-content: space-between; /* 子元素之间均匀分布 */
  width: 1160px;
  height: 64px;
  margin: 10px 0 0 20px; /* 调整外边距 */
}

.box_16 {
  width: 150px; /* 设置容器宽度 */
  height: 100px; /* 设置容器高度 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  overflow: hidden; /* 隐藏超出容器的部分 */
  border-radius: 8px; /* 可选：添加圆角 */
  background-color: #f5f5f5; /* 可选：添加背景色 */
}

.model-image {
  width: 100%; /* 图片宽度占满容器 */
  height: 100%; /* 图片高度占满容器 */
  object-fit: contain; /* 保持图片比例，完整显示图片 */
}

.box_17 {
  width: 415px;
  height: 62px;
  margin-left: 16px;
}

.box_18 {
  display: flex; /* 使用 flex 布局 */
  flex-direction: row; /* 子元素水平排列 */
  width: 415px;
  height: 33px;
}

.text_41 {
  width: auto;
  height: 33px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 33px;
}

.favorite-container {
  position: relative; /* 确保提示文本相对于容器定位 */
  display: inline-block;
}

.comment-wrapper {
  margin-top: 40px; /* 距离 box_15 的距离，可调整 */
}


.label_8 {
  width: 24px;
  height: 23px;
  margin: 5px 0 0 16px;
  cursor: pointer;
}

.group_2 {
  background-color: rgba(237, 239, 242, 1);;
  border-radius: 8px;
  width: 82px;
  height: 28px;
  margin: 3px 0 0 20px;
  display: flex; /* 使用 flex 布局 */
  flex-direction: row; /* 确保子元素水平排列 */
  align-items: center; /* 子元素垂直居中 */
}

.thumbnail_11 {
  width: 16px;
  height: 16px;
  margin: 0 0 0 12px;
}

.text_42 {
  width: 42px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  flex-direction: row; /* 确保子元素水平排列 */
  align-items: center; /* 子元素垂直居中 */
}

.group_3 {
  background-color: rgba(237, 240, 250, 1);
  border-radius: 8px;
  width: 70px;
  height: 28px;
  margin: 3px 0 0 20px;
  display: flex; /* 使用 flex 布局 */
  flex-direction: row; /* 确保子元素水平排列 */
  align-items: center; /* 子元素垂直居中 */
}

.thumbnail_12 {
  width: 16px;
  height: 16px;
  margin-left: 12px;
}

.text_43 {
  width: 28px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(77, 111, 208, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  flex-direction: row; /* 确保子元素水平排列 */
  align-items: center; /* 子元素垂直居中 */
}

.box_19 {
  position: relative;
  display: flex; /* 保持 flex 布局 */
  flex-direction: row; /* 子元素水平排列 */
  flex-wrap: wrap; /* 允许子元素换行 */
  align-items: flex-start; /* 子元素顶部对齐 */
  width: 900px;
  margin-top: 9px;
  gap: 8px; /* 添加子元素间距 */
  margin-left: -10px; /* 向左移动 10px */
}

.thumbnail_13 {
  width: 16px;
  height: 16px;
  margin-top: 6px;
}

.text_44 {
  max-width: 500px; /* 设置最大宽度 */
  height: auto; /* 自动调整高度 */
  overflow-wrap: break-word; /* 自动换行 */
  word-break: break-word; /* 防止长单词溢出 */
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: justify;
  white-space: normal; /* 允许换行 */
  line-height: 20px;
  margin-left: -10px; /* 向左移动 10px */
}

.text-wrapper_100{
    width: 64px;
    height: 54px;
    margin: 0 0 0 100px; /* 调整左边距 */
    display: flex; /* 使用 flex 布局 */
    flex-direction: column; /* 垂直排列子元素 */
    align-items: center; /* 子元素垂直居中 */
    justify-content: center; /* 子元素垂直居中 */
}

.score-row {
  display: flex;
  align-items: center;
  margin-left: 30px; /* 可根据需要调整 */
  margin-top: 1px;    /* 去掉原有的margin-top */
}

.score-text {
  display: inline-block;
  vertical-align: middle;
  margin-left: 3px;
  color: #F7BA2A;
  font-size: 16px;
  line-height: 1;
  /* 去掉宽高限制，确保内容水平排列 */
  width: auto;
  height: auto;
  white-space: nowrap; /* 关键：防止“5分”换行 */
  /* 去掉 margin-bottom，避免下沉 */
}

.text-wrapper_7 {
  width: 64px;
  height: 54px;
  margin: 5px 15px 0 90px;
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 子元素垂直居中 */
  justify-content: center; /* 子元素垂直居中 */
}

.text_45 {
  width: 64px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 22px;
  text-align: center; /* 水平居中对齐 */
}

.text_46 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 4px 0 0 0;
  text-align: center; /* 水平居中对齐 */
}

.text-wrapper_8 {
  width: auto;
  height: 54px;
  margin: 15px 0 0 25px;
}

.text_47 {
  width: 94px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 22px;
}

.text_48 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 12px 0 0 19px;
}

.text-wrapper_9 {
  background-color: rgba(135, 0, 102, 1);
  border-radius: 8px;
  height: 40px;
  width: 88px;
  margin: 0 0 0 ;
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  cursor: pointer;
}

.text_49 {
  width: auto; /* 自动适应文字宽度 */
  height: auto; /* 自动适应文字高度 */
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
}

.image_5 {
  width: 1160px;
  height: 1px;
  margin: 30px 0 0 20px;
}

.group_4 {
  width: 140px;
  height: 22px;
  margin: 16px 0 0 20px;
}

.thumbnail_14 {
  width: 16px;
  height: 16px;
  margin-top: 3px;
}

.text_50 {
  width: 116px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.text_51 {
  width: 35px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 12px 0 0 20px;
}

.text-wrapper_10 {
  width: 408px;
  height: 36px;
  margin: 19px 0 0 476px;
}

.paragraph_1 {
  width: 182px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
}

.paragraph_2 {
  width: 182px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
}

.group_5 {
  width: 1162px;
  height: 32px;
  margin: 1px 0 0 20px;
}

.text-wrapper_11 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 214px;
}

.text_52 {
  width: 182px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_12 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 242px;
}

.text_53 {
  width: 210px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_13 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 214px;
}

.text_54 {
  width: 182px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_14 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 130px;
}

.text_55 {
  width: 98px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_15 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_56 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_16 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 186px;
}

.text_57 {
  width: 154px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.group_6 {
  width: 456px;
  height: 32px;
  margin: 12px 0 0 20px;
}

.box_20 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  width: 130px;
  height: 32px;
}

.text-wrapper_17 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 158px;
}

.text_58 {
  width: 126px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_18 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_59 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.paragraph_3 {
  width: 98px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
  margin: -25px 0 0 36px;
}

.text_60 {
  width: 35px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 9px 0 0 20px;
}

.text-wrapper_19 {
  width: 424px;
  height: 36px;
  margin: 19px 0 0 674px;
}

.paragraph_4 {
  width: 112px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
}

.paragraph_5 {
  width: 112px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
}

.group_7 {
  width: 1136px;
  height: 32px;
  margin: 1px 0 0 20px;
}

.box_21 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  width: 186px;
  height: 32px;
}

.box_22 {
  width: 938px;
  height: 32px;
}

.text-wrapper_20 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 144px;
}

.text_61 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_21 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 158px;
}

.text_62 {
  width: 126px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_22 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_63 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_23 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_64 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_24 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 172px;
}

.text_65 {
  width: 140px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_25 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_66 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.paragraph_6 {
  width: 154px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
  margin: -25px 0 0 36px;
}

.group_8 {
  width: 1050px;
  height: 32px;
  margin: 1px 0 0 20px;
}

.text-wrapper_26 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 214px;
}

.text_67 {
  width: 182px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.section_4 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  width: 214px;
  height: 32px;
  margin-left: 12px;
}

.text-wrapper_27 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 158px;
}

.text_68 {
  width: 126px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_28 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_69 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_29 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_70 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_30 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_71 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.paragraph_7 {
  width: 182px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
  margin: -25px 0 0 262px;
}

.text_72 {
  width: 35px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 9px 0 0 20px;
}

.group_9 {
  width: 1124px;
  height: 32px;
  margin: 12px 0 0 20px;
}

.text-wrapper_31 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 144px;
}

.text_73 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_32 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_74 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.block_1 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  width: 144px;
  height: 32px;
  margin-left: 12px;
}

.text-wrapper_33 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_75 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_34 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_76 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_35 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_77 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_36 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_78 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_37 {
  background-color: rgba(255, 112, 9, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_79 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.paragraph_8 {
  width: 112px;
  height: 36px;
  overflow-wrap: break-word;
  color: rgba(255, 112, 9, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  line-height: 18px;
  margin: -25px 0 0 320px;
}

.text_80 {
  width: 35px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 9px 0 0 20px;
}

.group_10 {
  width: 498px;
  height: 32px;
  margin: 12px 0 0 20px;
}

.text-wrapper_38 {
  background-color: rgba(237, 239, 242, 1);
  border-radius: 8px;
  height: 32px;
  width: 144px;
}

.text_81 {
  width: 112px;
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

.text-wrapper_39 {
  background-color: rgba(237, 239, 242, 1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 186px;
}

.text_82 {
  width: 154px;
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

.text-wrapper_40 {
  background-color: rgba(237, 239, 242, 1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_83 {
  width: 112px;
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

.text_84 {
  width: 35px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 20px 0 0 20px;
}

.group_11 {
  width: 342px;
  height: 32px;
  margin: 12px 0 20px 20px;
}

.text-wrapper_41 {
  background-color: rgba(234, 75, 75, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 144px;
}

.text_85 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(234, 75, 75, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_42 {
  background-color: rgba(234, 75, 75, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 186px;
}

.text_86 {
  width: 154px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(234, 75, 75, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.group_12 {
  position: absolute;
  left: 20px;
  top: 186px;
  width: 1134px;
  height: 32px;
}

.text-wrapper_43 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 116px;
}

.text_87 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_44 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 130px;
}

.text_88 {
  width: 98px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_45 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 158px;
}

.text_89 {
  width: 126px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.box_23 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  width: 214px;
  height: 32px;
  margin-left: 12px;
}

.box_24 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  width: 214px;
  height: 32px;
  margin-left: 12px;
}

.text-wrapper_46 {
  background-color: rgba(135, 0, 102, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 242px;
}

.text_90 {
  width: 210px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(135, 0, 102, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.group_13 {
  position: absolute;
  left: 20px;
  top: 358px;
  width: 1094px;
  height: 32px;
}

.text-wrapper_47 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  width: 144px;
}

.text_91 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_48 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 186px;
}

.text_92 {
  width: 154px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_49 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_93 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.text-wrapper_50 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 116px;
}

.text_94 {
  width: 84px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.box_25 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  width: 144px;
  height: 32px;
  margin-left: 12px;
}

.text-wrapper_51 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  height: 32px;
  margin-left: 12px;
  width: 144px;
}

.text_95 {
  width: 112px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(23, 177, 13, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 7px 0 0 16px;
}

.box_26 {
  background-color: rgba(23, 177, 13, 0.1);
  border-radius: 8px;
  width: 144px;
  height: 32px;
  margin-left: 12px;
}

.text-wrapper_52 {
  height: 38px;
  background: url(https://lanhu-oss-2537-2.lanhuapp.com/SketchPnge6219e007b728b8e85b31c701e1c57a584415aaccfc9eb67906efbe87a37f511) -36px -27px
    no-repeat;
  background-size: 144px 108px;
  width: 72px;
  position: absolute;
  bottom: 90%; /* 向下偏移 */
  left: 70%; /* 向右偏移 */
  transform: translate(-50%, 10%); /* 修正水平居中并向下偏移 */
  z-index: 10; /* 确保在其他元素之上 */
}

.text_96 {
  width: 56px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 22px;
  margin: 5px 0 0 8px;
}

.section_2 {
background-color: rgba(255, 255, 255, 1);
border-radius: 16px;
width: 1240px;
height: 850px;
justify-content: flex-center;
margin: 960px 120px 0 -1338px;
position: absolute; /* 相对于最近的定位父容器 */
}

.text_100 {
  width: 56px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(143, 148, 164, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  text-align: center; /* 水平居中对齐 */
}
</style>
