<template>
    <div class="comment" v-if="comment.status !== 'deleted'">
        <div class="main">
            <div class="user-info">
                <el-avatar
                    class="comment-avatar"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
                <span class="user-name">{{ comment.userName }}</span>
                <span v-if="!isGrandChild" class="comment-text">：</span>
                <span v-else class="comment-text">
                    &nbsp;&nbsp;回复&nbsp;&nbsp; <span class="reply-to-user">@{{ replyToUser }}</span>：
                </span>
                <div v-if="!isGrandChild" class="short-comment-content">
                    <span class="comment-text">{{ comment.commentDetail }}</span>
                </div>
                <div v-if="isGrandChild" class="long-comment-content">
                    <span class="comment-text">{{ comment.commentDetail }}</span>
                </div>
            </div>
            <div class="main-right">
                <button @click="toggleReply" class="reply-btn">回复</button>
                <button v-if="comment.userId === this.userId" class="delete-btn" @click="deleteComment(comment.commentId)">删除</button>
                <span class="comment-time"
                    >{{
                        comment.createTime
                    }}&nbsp;&nbsp;&nbsp;&nbsp;</span
                >
            </div>
        </div>
        <div class="reply-form" v-if="showReplies">
            <div class="text-wrapper_3 flex-col">
                <textarea 
                class="text-input" 
                placeholder="请填写您的回复…" 
                rows="3"
                v-model="replyContent"></textarea>
            </div>
            <div class="button-container flex-row">
                <div class="text-wrapper_5 flex-col" @click="submitReply(comment.commentId)">
                    <span class="text_29">提交</span>
                </div>
                <div class="text-wrapper_6 flex-col" @click="toggleCancel">
                    <span class="text_30">取消</span>
                </div>
            </div>
        </div>
    </div>
    <!-- 子评论 -->
    <div v-if="comment.child && comment.child.length > 0" class="replies">
        <div v-for="(reply, index) in comment.child" :key="`child-${index}`">
            <comment
                :comment="reply"
                :depth="depth + 1"
                :user_comment_map="user_comment_map_copy"
                :modelId="modelId"
                :isGrandChild="true"
                @comment-updated="$emit('comment-updated')"
            />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { getUserIdFromToken } from '@/utils/token'; // 导入工具函数

export default {
    name: "Comment",
    props: {
        comment: {
            type: Object,
            required: true,
        },
        depth: {
            type: Number,
            default: 0,
        },
        user_comment_map: {
            default: new Map(),
        },
        modelId: {
            type: [String, Number],
            required: true,
        },
        isGrandChild:{
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showReplies: false,
            replyContent: "",
            replyToUser: "",
            userId: null,
        };
    },
    created() {
        // console.log(this.user_comment_map)
        this.replyToUser = this.user_comment_map.get(
            this.comment.answerId
        );
    },
    mounted() {
        // 在组件加载时解析 token，获取 userId
        this.userId = getUserIdFromToken(localStorage.getItem('token'));
    },
    methods: {
        toggleReply() {
            this.showReplies = !this.showReplies;
        },
        toggleCancel() {
            this.showReplies = false;
        },
        async submitReply(commentId) {
            if (this.replyContent.trim()) {
                try {
                    console.log(
                        "请求参数：" +
                            this.replyContent +
                            " " +
                            this.modelId +
                            " " +
                            this.userId +
                            " " +
                            commentId
                    );
                    const token = localStorage.getItem('token');
                    const response = await axios.post('http://49.233.82.133:9091/model/comment/add', {
                        commentDetail: this.replyContent,
                        modelId: this.modelId,
                        deep: 2, // 普通评论
                        answerId: commentId,
                        status: true,
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.data.success) {
                        this.replyContent = ""; // 清空输入框
                        this.showReplies = false; // 隐藏回复框
                        this.$emit("comment-updated"); // 触发自定义事件，通知父组件
                    }  else if(response.data.msg === "Token无效!!"){
                        alert("请先登录！")
                    }
                    else {
                        alert("发表评论失败：" + response.data.errorMsg);
                    }
                } catch (error) {
                    console.error("Error posting comment:", error);
                    alert("发表评论失败，请稍后再试。");
                }
            } else {
                alert("评论内容不能为空！");
            }
        },
        async deleteComment(commentId) {
            const confirmed = window.confirm("确认要删除这条评论吗？");

            if (confirmed) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.delete(`http://49.233.82.133:9091/model/comment/delete/?commentId=${commentId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });  
                    if (response.data.success) {
                        alert('评论删除成功');
                        this.$emit("comment-updated");
                    } else if(response.data.msg === "Token无效!!"){
                        alert("请先登录！");
                    }
                    else {
                        console.log(response.data);
                        alert("删除评论失败：" + response.data.errorMsg);
                    }
                } catch (error) {
                    console.error('删除失败', error);
                    alert("删除评论失败，请稍后再试");
                }
            }
        },
    },
    computed: {
        avaterSize() {
            if (this.depth === 0) {
                return "default";
            } else {
                return "small";
            }
        },
        user_comment_map_copy() {
            return this.user_comment_map;
        },
    },
};
</script>

<style scoped>
.iconfont {
    font-size: 13px;
    color: #9499a0;
}

.likes {
    font-size: 13px;
    color: #9499a0;
}

.dislikes {
    font-size: 13px;
    color: #9499a0;
}

.reply {
    cursor: pointer;
}

.delete-btn {
    position: relative;
    outline: none;
    border: none;
    background: transparent;
    font-size: 13px;
    cursor: pointer;
    margin-left: 10px;
    color: rgba(135, 0, 102, 1);
    margin-right: 5px;
    margin-right: 10px;
    margin-bottom: 3px;
    margin-right: 15px;
}

.delete-btn:hover {
    color: rgb(64, 158, 255);
}

.likes:hover {
    color: #007bff;
    cursor: pointer;
}
.dislikes:hover {
    color: #007bff;
    cursor: pointer;
}

.reply:hover {
    color: #007bff;
}

.comment {
    /* border: 1px solid #e0e0e0; */
    /* border: 1px solid red; */
    border-radius: 4px;
    margin-bottom: 10px;
    position: relative;
    padding-top: 22px;
    display: flex;
    flex-direction: column;
}
.main {
    display: flex;
    flex-direction: row;
    /* border: solid 1px red; */
    align-items: center;
    justify-content: space-between; /* 左右两部分对齐 */
    background-color: rgba(248, 249, 251, 1);
    padding: 10px 15px; /* 增加内边距，上下 10px，左右 15px */
}
.user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.user-name {
  width: auto;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 0 0 0 10px;
  font-weight: bold;
}
.short-comment-content {
    margin-left: 5px;
    font-size: 15px;
    display: inline-block; /* 保证内容紧接在前面的用户名后面 */
    max-width: 500px; /* 限制每行的最大宽度 */
    word-wrap: break-word; /* 自动换行 */
    word-break: break-word; /* 强制长单词换行 */
    line-height: 1.5; /* 调整行高，增加可读性 */
    white-space: normal; /* 允许文本换行 */
    vertical-align: middle; /* 保持与用户名对齐 */
}
.long-comment-content {
    margin-left: 5px;
    font-size: 15px;
    display: inline-block; /* 保证内容紧接在前面的用户名后面 */
    max-width: 320px; /* 限制每行的最大宽度 */
    word-wrap: break-word; /* 自动换行 */
    word-break: break-word; /* 强制长单词换行 */
    line-height: 1.5; /* 调整行高，增加可读性 */
    white-space: normal; /* 允许文本换行 */
    vertical-align: middle; /* 保持与用户名对齐 */
}
.comment-content span {
    display: inline; /* 确保前面的标点或文字与评论内容在同一行 */
    vertical-align: middle; /* 保持垂直对齐 */
}
.comment-text {
    display: inline-block;
    vertical-align: top;

}
.reply-to-user {
    color: rgba(135, 0, 102, 1);
    cursor: pointer;
}
.main-right {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.comment-avatar {
    position: relative;
    width: 35px;
    height: 35px;
}
.comment-time {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 12px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
    margin-left: 20px;
}
.reply-btn {
    position: relative;
    outline: none;
    border: none;
    background: transparent;
    font-size: 13px;
    cursor: pointer;
    margin-left: 20px;
    color: rgba(135, 0, 102, 1);
    margin-right: 9px;
    margin-bottom: 3px;
}
.reply-btn:hover {
    color: rgb(64, 158, 255);
}
.comment-detail {
    margin-bottom: 10px;
}

.button-container {
  display: flex; /* 启用 Flexbox */
  flex-direction: row; /* 水平排列子元素 */
  gap: 10px; /* 设置按钮之间的间距 */
  justify-content: flex-start; /* 子元素靠左对齐 */
  align-items: center; /* 子元素垂直居中 */
  margin-top: 8px;
}

.text-wrapper_5 {
  background-color: rgba(135, 0, 102, 1);
  border-radius: 8px;
  height: 32px;
  width: 60px;
  cursor: pointer;
  display: flex; /* 启用 Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.text_29 {
  width: 28px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 18px;
}

.text-wrapper_6 {
  background-color: rgba(237, 239, 242, 1);
  border-radius: 8px;
  height: 32px;
  width: 60px;
  cursor: pointer;
  display: flex; /* 启用 Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.text_30 {
  width: 28px;
  height: 18px;
  overflow-wrap: break-word;
  color: rgba(30, 36, 55, 1);
  font-size: 14px;
  font-family: OPPOSans-R;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 18px;
}

.replies {
    /* margin-left: 30px; */
    /* border-left: 2px solid #e0e0e0; */
    /* padding-left: 15px; */
}

.reply-form {
    margin-top: 10px;
}

.text-wrapper_3 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  height: 83px;
  width: 934px;
  border: 1px solid #ddd;
}
.text-input {
  width: 100%; /* 占满父容器宽度 */
  height: 100%; /* 高度自适应父容器 */
  border: none; /* 去掉边框 */
  outline: none; /* 去掉聚焦时的边框 */
  resize: none; /* 禁止调整大小 */
  font-size: 14px;
  color: rgba(34, 34, 34, 1);
  background-color: transparent; /* 背景透明，与父容器一致 */
  margin: 10px 0 0 10px;
}

.reply-form textarea {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    padding: 5px;
    resize: vertical;
}
</style>
