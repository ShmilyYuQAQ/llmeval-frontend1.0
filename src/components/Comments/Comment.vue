<template>
    <div class="comment" v-if="comment.status !== 'deleted'">
        <!-- 评论区 -->
        <div class="header">
            <el-avatar
                class="comment-avatar"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span class="user-name">{{ comment.userName }}</span>
        </div>
        <div class="content">{{ comment.commentDetail }}</div>
        <div class="footer">
            <span class="comment-time"
                >{{
                    comment.createTime
                }}&nbsp;&nbsp;&nbsp;&nbsp;</span
            >
            <button @click="toggleReply" class="reply-btn">回复</button>
            <button v-if="comment.userId === this.userId" class="delete-btn" @click="deleteComment(comment.commentId)">删除</button>
        </div>
        <div class="reply-form" v-if="showReplies">
            <textarea
                v-model="replyContent"
                placeholder="写下你的回复..."
                class="input-box"
            ></textarea>
            <button @click="submitReply(comment.commentId)">提交</button>
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
    },
    data() {
        return {
            showReplies: false,
            replyContent: "",
            userId: null,
        };
    },
    mounted() {
        // 在组件加载时解析 token，获取 userId
        this.userId = getUserIdFromToken(localStorage.getItem('token'));
    },
    methods: {
        toggleReply() {
            this.showReplies = !this.showReplies;
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
                        alert("请先登录！")
                        const currentUrl = window.location.href;
                        window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
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
                        alert("请先登录！")
                        const currentUrl = window.location.href;
                        window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
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

.comment {
    border-bottom: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 10px;
    position: relative;
    padding-left: 80px;
    padding-top: 22px;
}

.user-name {
    font-weight: bold;
}

.comment-time {
    color: #9499a0;
    font-size: 12px;
}
.content {
    margin-top: 10px;
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
    color: #9499a0;
    margin-right: 10px;
    margin-bottom: 3px;
}

.delete-btn:hover {
    color: rgb(64, 158, 255);
}

.reply-btn {
    position: relative;
    outline: none;
    border: none;
    background: transparent;
    font-size: 13px;
    cursor: pointer;
    margin-left: 20px;
    color: #9499a0;
    margin-right: 10px;
    margin-bottom: 3px;
}
.reply-btn:hover {
    color: rgb(64, 158, 255);
}
.reply-form {
    margin-top: 10px;
}
.footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
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
