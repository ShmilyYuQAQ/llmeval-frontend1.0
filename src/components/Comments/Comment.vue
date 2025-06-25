<template>
    <div class="comment" v-if="comment.status !== 'deleted'">
        <!-- 评论区 -->
        <div class="header">
            <el-avatar
                class="comment-avatar"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span class="user-name">{{ comment.userName }}</span>
            <div class="header-right">
                <button @click="toggleReply" class="reply-btn">回复</button>
                <button v-if="comment.userId === this.userId" class="delete-btn" @click="deleteComment(comment.commentId)">删除</button>
                <button v-if="comment.userId !== this.userId" class="delete-btn" @click="reportComment()">举报</button>
                <ReportWindow
                    v-if="showReportWindow"
                    :comment-id="comment.commentId"
                    :username="comment.userName"
                    @close="showReportWindow = false"
                />
                <span class="comment-time"
                    >{{
                        comment.createTime
                    }}&nbsp;&nbsp;&nbsp;&nbsp;</span
                >
            </div>
        </div>
        <div class="content">{{ comment.commentDetail }}</div>
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
        <!-- 子评论 -->
        <div v-if="comment.child && comment.child.length > 0" class="replies">
            <div
                v-for="(reply, index) in comment.child"
                :key="`child-${index}`"
            >
                <ChildComment
                    :comment="reply"
                    :depth="depth + 1"
                    :user_comment_map="user_comment_map_copy"
                    :modelId="modelId"
                    @comment-updated="$emit('comment-updated')"
                />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ChildComment from "./ChildComment.vue";
import ReportWindow from "./ReportWindow.vue"; 
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
    },
    components: {
        ChildComment,
        ReportWindow, 
    },
    data() {
        return {
            showReplies: false,
            showReportWindow: false, 
            replyContent: "",
            userId: null,
        };
    },
    mounted() {
        // 在组件加载时解析 token，获取 userId
        this.userId = getUserIdFromToken(localStorage.getItem('token'));
    },
    methods: {
        reportComment() {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("请先登录！");
                return;
            }
            this.showReportWindow = true; // 显示举报窗口
        },
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
                        deep: 1, // 普通评论
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
                    } else if(response.data.msg === "Token无效!!"){
                        alert("请先登录！");
                    }
                    else {
                        alert("发表评论失败：" + response.data.errorMsg);
                    }
                } catch (error) {
                    console.log("Error posting comment:", error);
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

.comment {
    border-bottom: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 10px;
    position: relative;
    padding-left: 80px;
    padding-top: 20px;
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
  margin: 6px 0 0 0;
  font-weight: bold;
}

.comment-time {
  width: 142px;
  height: 20px;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
  line-height: 20px;
}
.content {
    margin-top: 5px;
    max-width: 100%; /* 限制每行的最大宽度 */
    word-wrap: break-word; /* 自动换行 */
    word-break: break-word; /* 强制长单词换行 */
    line-height: 1.5; /* 调整行高，增加可读性 */
    white-space: normal; /* 允许文本换行 */
}
.comment-detail {
    margin-bottom: 10px;
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
    margin-right: 10px;
    margin-bottom: 3px;
    margin-right: 15px;
}

.delete-btn:hover {
    color: rgb(64, 158, 255);
}

.header {
    display: flex; /* 启用 Flexbox */
    justify-content: space-between; /* 左右两部分对齐 */
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
    margin-right: 15px;
    margin-bottom: 3px;
}
.reply-form {
    margin-top: 10px;
}
.text-wrapper_3 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  height: 83px;
  width: 100%;
  border: 1px solid #ddd;
}
.text-input {
  width: 80%; /* 占满父容器宽度 */
  height: 100%; /* 高度自适应父容器 */
  border: none; /* 去掉边框 */
  outline: none; /* 去掉聚焦时的边框 */
  resize: none; /* 禁止调整大小 */
  font-size: 14px;
  color: rgba(34, 34, 34, 1);
  background-color: transparent; /* 背景透明，与父容器一致 */
  margin: 10px 0 0 0px;
}
.header-right {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.reply-form textarea {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    padding: 5px;
    resize: vertical;
}

.reply-form button {
    /* 按钮样式 */
}
.comment-avatar {
    position: absolute;
    left: 20px;
    top: 22px;
    width: 44px;
    height: 44px;
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
</style>
