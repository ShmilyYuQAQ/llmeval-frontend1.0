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
                <span
                    >回复
                    <span class="reply-to-user">@{{ replyToUser }}</span>
                    :</span
                >
                {{ comment.commentDetail }}
            </div>
        </div>
        <div class="footer">
            <span class="comment-time">{{ comment.createTime }}</span>
            <button @click="toggleReply" class="reply-btn">回复</button>
        </div>
        <div class="reply-form" v-if="showReplies">
            <textarea
                v-model="replyContent"
                placeholder="写下你的回复..."
            ></textarea>
            <button @click="submitReply">提交</button>
        </div>
    </div>
    <!-- 子评论 -->
    <div v-if="comment.child && comment.child.length > 0" class="replies">
        <div v-for="(reply, index) in comment.child" :key="`child-${index}`">
            <comment
                :comment="reply"
                :depth="depth + 1"
                :user_comment_map="user_comment_map_copy"
            />
        </div>
    </div>
</template>

<script>
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
    },
    data() {
        return {
            showReplies: false,
            avaterSize: "default",
            replyToUser: "",
        };
    },
    created() {
        // console.log(this.user_comment_map)
    },
    methods: {
        toggleReply() {
            this.showReplies = !this.showReplies;
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
        replyToUser() {
            return this.user_comment_map.get(this.comment.answerId) || "";
        },
    },
};
</script>

<style scoped>
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
    color: #9499A0;
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
    margin-left:20px;
    color:#9499A0;
}
.reply-btn:hover{
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
