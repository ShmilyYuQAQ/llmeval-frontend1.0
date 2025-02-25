<template>
    <div class="comment" v-if="comment.status !== 'deleted'">
        <!-- 评论区 -->
        <!-- <div class="comment-content">
            <div class="comment-header">
                <span class="user-name">{{ comment.userName }}</span>
                <span class="comment-time">{{ comment.createTime }}</span>
            </div>
            <div class="comment-detail">{{ comment.commentDetail }}</div>
            <button @click="toggleReply">回复</button>
            <div class="reply-form" v-if="showReplies">
                <textarea
                    v-model="replyContent"
                    placeholder="写下你的回复..."
                ></textarea>
                <button @click="submitReply">提交</button>
            </div>
        </div> -->
        <div class="main">
            <div class="user-info">
                <el-avatar
                    class="comment-avatar"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
                <span class="user-name">{{ comment.userName }}</span>
            </div>
            <div class="comment-content">
                <span v-if="!isGrandChild">：</span>
                <span v-else-if="isGrandChild"
                    >回复&nbsp;&nbsp;
                    <span class="reply-to-user">@{{ replyToUser }}</span>
                    :</span
                >
                {{ comment.commentDetail }}
            </div>
        </div>
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
            ></textarea>
            <button @click="submitReply(comment.commentId)">提交</button>
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
    color: #9499a0;
    margin-right: 10px;
    margin-bottom: 3px;
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
}
.user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.user-name {
    font-weight: bold;
    margin-left: 10px;
}
.comment-content {
    margin-left: 20px;
    font-size: 15px;
}
.reply-to-user {
    color: rgb(64, 158, 255);
    cursor: pointer;
}
.footer {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    align-items: center;
}
.comment-avatar {
    position: relative;
    width: 35px;
    height: 35px;
}
.comment-time {
    color: #9499a0;
    font-size: 12px;
    margin-left: 45px;
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
    margin-bottom: 3px;
}
.reply-btn:hover {
    color: rgb(64, 158, 255);
}
.comment-detail {
    margin-bottom: 10px;
}

.replies {
    /* margin-left: 30px; */
    /* border-left: 2px solid #e0e0e0; */
    /* padding-left: 15px; */
}

.reply-form {
    margin-top: 10px;
}

.reply-form textarea {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    padding: 5px;
    resize: vertical;
}
</style>
