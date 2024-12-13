<template>
  <NavBar></NavBar>
  <div>
    <main>
      <!-- 模型信息区 -->
      <section id="model-info" class="model-info" v-if="modelData">
        <div class="header">
          <div class="title">
            <h1>{{ modelData.data.name }}</h1>
          </div>
        </div>

        <div class="description">
          <p style="line-height: 2.0;">{{ modelData.data.description }}</p>
        </div>

        <div class="tags">
          <span class="tag">发布机构：{{ modelData.data.institution }}</span>
          <span class="tag">{{ modelData.data.isOpenSource ? '开源' : '不开源' }}</span>
          <span class="tag" v-for="tag in tags" :key="tag.tagName" :style="tagStyles(tag.tagGrade)">
            {{ tag.tagName }}{{ tag.tagGrade }}
          </span>
        </div>

        <div class="stats">
          <p>{{ modelData.data.favoritesCount }}&nbsp;&nbsp;收藏 &nbsp;&nbsp;|&nbsp;&nbsp; {{ modelData.data.releaseDate }}&nbsp;&nbsp;发布</p>
        </div>

        <div class="actions">
          <button class="action-button" @click="toggleFavorite()">{{ isFavorited ? '取消收藏' : '收藏' }}</button>
          <button class="action-button">模型试用</button>
        </div>
      </section>
      <br>
      <br>
      <br>
      <!-- 评论区 -->
      <div class="comment-section">
        <h2 class="fixed-feedback">用户反馈</h2>
        <div class="comment-input">
          <textarea
            v-model="newComment"
            placeholder="说点什么吧..."
            class="input-box"
          ></textarea>
          <button class="submit-button" @click="postComment">发表评论</button>
        </div>
        <div class="comment-list" v-if="comments.length > 0">
          <div class="comment-item" v-for="comment in comments" :key="comment.commentId">
            <div class="comment-content">
              <span class="user-name">{{ comment.userName }}：</span>
              <span class="comment-text">{{ comment.commentDetail }}</span>
            </div>
            <div class="comment-footer">
              <span class="comment-date">{{ comment.createTime }}</span>
              <div class="comment-actions">
                <span class="likes"><view class="iconfont">&#xe648;</view> {{ comment.likes || 0 }}&nbsp;&nbsp;</span>
                <span class="likes"><view class="iconfont">&#xe64d;</view> {{ comment.dislikes || 0 }}&nbsp;&nbsp;</span>
                <span class="reply" @click="toggleReplyForm(comment.commentId)">回复</span>
              </div>
            </div>
            <div v-if="comment.showReplyForm" class="reply-form">
              <textarea
                v-model="comment.replyText"
                placeholder="写下你的回复..."
                class="input-box reply-input"
              ></textarea>
              <button class="submit-button" @click="postReply(comment.commentId, comment.deep, comment.userId)">回复</button>
            </div>
            <div class="child-comments" v-if="comment.child && comment.child.length > 0">
              <div class="comment-item" v-for="childComment in comment.child" :key="childComment.commentId">
                <div class="comment-content">
                  <br>
                  <span v-if="childComment.deep === 1" class="user-name">{{ childComment.userName }}：</span>
                  <span v-else-if="childComment.deep === 2" class="user-name">{{ childComment.userName }} 回复 @{{ childComment.answerUserName }}：</span>
                  <span class="comment-text">{{ childComment.commentDetail }}</span>
                </div>
                <div class="comment-footer">
                <span class="comment-date">{{ childComment.createTime }}</span>
                  <div class="comment-actions">
                    <span class="likes" @click="toggleLikeIcon(comment)">
                      <view class="iconfont">{{ comment.liked ? '&#xec8c;' : '&#xe648;' }}</view> {{ comment.likes || 0 }}&nbsp;&nbsp;
                    </span>
                    <span class="likes"><view class="iconfont">&#xe64d;</view> {{ childComment.dislikes || 0 }}&nbsp;&nbsp;</span>
                    <span class="reply" @click="toggleReplyForm(childComment.commentId)">回复</span>
                  </div>
                </div>
                  <div v-if="childComment.showReplyForm" class="reply-form">
                <textarea
                  v-model="childComment.replyText"
                  placeholder="写下你的回复..."
                  class="input-box reply-input"
                ></textarea>
                <button class="submit-button" @click="postReply(comment.commentId, comment.deep, comment.userId)">回复</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from './guidePage/NavBar.vue';

export default {
  props: ['modelId'], // 接收路由参数
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
      isFavorited: false // 存储收藏状态
    }
  },
  
  async created() {
    try {
      const modelResponse = await axios.get(`http://49.233.82.133:9091/model/modelId?modelId=${this.modelId}`);
      if (modelResponse.data) {
        this.modelData = modelResponse.data;
      }
      
      const modelTagResponse = await axios.get(`http://49.233.82.133:9091/tag/model?modelId=${this.modelId}`);
      if (modelTagResponse.data.success){
        this.tags = modelTagResponse.data.data;
      }
      
      // 检查用户是否已经收藏该模型
      const favoriteResponse = await axios.get(`http://49.233.82.133:9091/user/favorites/check?userId=${this.userId}&modelId=${this.modelId}`);
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
  components: { NavBar },
    computed: {
    tagStyles() {
      return (tagGrade) => {
        switch (tagGrade) {
          case '能力薄弱':
            return { backgroundColor: 'rgb(180,199,231)' };
          case '能力一般':
            return { backgroundColor: 'rgb(143,170,220)' };
          case '能力良好':
            return { backgroundColor: 'rgb(59,103,188)' };
          case '能力优秀':
            return { backgroundColor: 'rgb(47,85,151)' };
          case '能力卓越':
            return { backgroundColor: 'rgb(17,55,112)' };
          default:
            return {};
        }
      };
    }
  },
  methods: {
      async toggleFavorite() {
      try {
        const url = this.isFavorited
          ? `http://49.233.82.133:9091/user/favorites/delete?userId=${this.userId}&modelId=${this.modelId}`
          : `http://49.233.82.133:9091/user/favorites/add?userId=${this.userId}&modelId=${this.modelId}`
        
        // 立即更新按钮状态
        
        const response = this.isFavorited
          ? await axios.delete(url)
          : await axios.post(url)
        if (response.data.success) {
          // 操作成功后，调用检查接口来确定收藏按钮的状态
          const checkResponse = await axios.get(`http://49.233.82.133:9091/user/favorites/check?userId=${this.userId}&modelId=${this.modelId}`);
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
        console.error('Error toggling favorite:', error);
        alert("操作失败，请稍后再试。");
        // 如果操作失败，恢复原来的状态
        this.isFavorited = !this.isFavorited;
      }
    },

    // 发���评论方法（逻辑可与后端对接）
    async postComment() {
      if (this.newComment.trim()) {
        try {
          const response = await axios.post('http://49.233.82.133:9091/model/comment/add', {
            commentDetail: this.newComment,
            modelId: this.modelId,
            userId: this.userId,
            deep: 0, // 普通评论
            answerId: this.answerId,
            status: this.status,
          });

          if (response.data.success) {
            const newComment = {
              commentId: response.data.data.commentId,
              userId: response.data.data.userId, // 可换成登录用户的名字
              commentDetail: response.data.data.commentDetail,
              createTime: response.data.data.createTime, // 当前时间
              likes: 0,
              dislikes: 0,
              showReplyForm: false,
              replyText: '',
              replies: []
            };
            this.comments.unshift(newComment);
            this.newComment = ""; // 清空输入框
          } else {
            alert("发表评论失败：" + response.data.errorMsg);
          }
        } catch (error) {
          console.error('Error posting comment:', error);
          alert("发表评论失败，请稍后再试。");
        }
      } else {
        alert("评论内容不能为空！");
      }
    },
    toggleLikeIcon(comment) {
      comment.liked = !comment.liked;
    },
    // 展开或收起回复输入框
    toggleReplyForm(commentId) {
      const toggleForm = (comments) => {
        for (let comment of comments) {
          if (comment.commentId === commentId) {
            comment.showReplyForm = !comment.showReplyForm;
            return true;
          }
          if (comment.child && toggleForm(comment.child)) {
            return true;
          }
        }
        return false;
      };

      if (!toggleForm(this.comments)) {
        console.error('Comment or reply not found:', commentId);
      }
    },
    // 回复评论方法（逻辑可与后端对接）
    async postReply(commentId, parentDeep, parentUserId) {
      const comment = this.comments.find((c) => c.commentId === commentId);
      const reply = this.comments.flatMap(c => c.replies).find(r => r.commentId === commentId);
      const nestedReply = this.comments.flatMap(c => c.replies).flatMap(r => r.replies).find(nr => nr.commentId === commentId);
      const target = comment || reply || nestedReply;
      if (target && target.replyText && target.replyText.trim()) {
        try {
          const response = await axios.post('http://49.233.82.133:9091/model/comment/add', {
            commentDetail: target.replyText,
            modelId: this.modelId,
            userId: this.userId,
            deep: parentDeep + 1, // 回复评论
            answerId: target.commentId,
            answerUserId: parentUserId,
            status: this.status,
          });

          if (response.data.success) {
            console.log('Reply commit success!');
            const newReply = {
              commentId: response.data.data.commentId,
              userId: response.data.data.userId, // 可换成登录用户的名字
              commentDetail: response.data.data.commentDetail,
              createTime: response.data.data.createTime, // 当前时间
              likes: 0,
              dislikes: 0,
              showReplyForm: false,
              replyText: '',
              answerUserId: parentUserId
            };
            if (comment) {
              comment.replies.push(newReply);
            } else if (reply) {
              reply.replies.push(newReply);
            } else if (nestedReply) {
              nestedReply.replies.push(newReply);
            }
            target.replyText = ""; // 清空回复框
            target.showReplyForm = false; // 隐藏回复框
          } else {
            alert("回复失败：" + response.data.errorMsg);
          }
        } catch (error) {
          console.error('Error posting reply:', error);
          alert("回复失败，请稍后再试。");
        }
      } else {
        console.error('Reply content is empty or comment not found');
        alert("回复内容不能为空！");
      }
    }
  }
}
</script>

<style scoped>
.model-info {
  width: 70%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9; /* 淡色背景 */
  border: 1px solid #ddd;    /* 边框颜色 */
  border-radius: 8px;        /* 边框圆角 */
  padding: 16px;             /* 内边距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
  align-items: center;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 16px;
}

.title {
  display: flex;
  align-items: center;
}

.title h1 {
  font-size: 24px;
  margin: 0;
}

.new-tag {
  background-color: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 8px;
  font-size: 12px;
}

.description {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.tag {
  background-color: #655e5e;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.fixed-feedback {
  position: absolute;
  top: -60px; /* 根据需要调整 */
  left: 10;
}

.stats {
  color: #999;
  font-size: 12px;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-button {
  background-color: #3f51b5;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.action-button:hover {
  background-color: #2c387e;
}

.comment-section {
  font-family: Arial, sans-serif;
  width: 70%;
  margin: 20px auto;
  border: 1px solid #ddd;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  align-items: center;
  position: relative
}

.comment-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.input-box {
  flex: 1;
  height: 40px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  font-size: 14px;
}

.submit-button {
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.comment-header {
  font-size: 14px;
  color: #888;
  margin-bottom: 15px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comment-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.comment-content {
  font-size: 16px;
  margin-bottom: 8px;
}

.user-name {
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

.comment-text {
  color: #555;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #999;
}

.comment-actions {
  display: flex;
  gap: 10px;
}

.likes,
.dislikes,
.reply {
  cursor: pointer;
}

.likes:hover,
.dislikes:hover,
.reply:hover {
  color: #007bff;
}

.dislikes {
  color: #e74c3c; /* 红色用于表示“差评” */
}

.replies {
  margin-left: 20px;
  margin-top: 10px;
  font-size: 14px;
}

.reply-item {
  margin-top: 8px;
  color: #666;
}

.reply-form {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.reply-input {
  flex: 1;
  height: 30px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  font-size: 14px;
}

.reply-content {
  margin-left: 20px; /* 向右移动 */
}

.reply-footer {
  margin-left: 20px; /* 向右移动 */
}

.nested-reply-item {
  margin-left: 40px; /* 向右移动更多 */
}

.nested-reply-content {
  margin-left: 20px; /* 向右移动 */
}

.nested-reply-footer {
  margin-left: 20px; /* 向右移动 */
}

.child-comments {
  margin-left: 20px;
  border-left: 2px solid #ccc;
  padding-left: 10px;
}
</style>