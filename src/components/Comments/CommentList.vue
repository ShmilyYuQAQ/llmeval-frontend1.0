<template>
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
        <div class="comments-list">
            <comment
                v-for="(comment, index) in comments"
                :key="`root-${index}`"
                :comment="comment"
                :depth="0"
                :user_comment_map="user_comment_map"
                :modelId="modelId"
                @comment-updated="fetchComments"
            />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Comment from "./Comment.vue";
export default {
    name: "CommentsList",
    components: {
        Comment,
    },
    props: {
        modelId: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            comments: [],
            user_comment_map: new Map(),
            userId:7,
            newComment: "", // 存储输入的评论
        };
    },
    async created() {
        await this.fetchComments();
    },

    methods: {
        async fetchComments() {
            try {
                const commentsResponse = await axios.get(
                `http://49.233.82.133:9091/model/comment/tree?modelId=${this.modelId}`
                );
                if (commentsResponse.data.success) {
                    this.comments = commentsResponse.data.data;
                    this.user_comment_map = this.mapCommentIdsToUserNames(this.comments);
                }
                else {
                    this.comments = [];
                    this.user_comment_map = new Map();
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        mapCommentIdsToUserNames(comments) {
            const commentMap = new Map();

            function recurseComments(commentArray) {
                commentArray.forEach((comment) => {
                    console.log(comment.commentId)
                    commentMap.set(comment.commentId, comment.userName);
                    if (comment.child && comment.child.length > 0) {
                        recurseComments(comment.child);
                    }
                });
            }
            recurseComments(comments);
            return commentMap;
        },

        async postComment() {
            if (this.newComment.trim()) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.post('http://49.233.82.133:9091/model/comment/add', {
                        commentDetail: this.newComment,
                        modelId: this.modelId,
                        deep: 0, // 普通评论
                        answerId: null,
                        status: true,
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.data.success) {
                        this.newComment = ""; // 清空输入框
                        this.showReplies = false; // 隐藏回复框
                        this.fetchComments(); // 刷新评论列表
                    } else if(response.data.msg === "Token无效!!"){
                        alert("请先登录！")
                        const currentUrl = window.location.href;
                        window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
                    }
                    else {
                        console.log(response.data);
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
        },


    }
</script>

<style scoped>
.comments-list {
    margin: 10px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    /* border: solid 1px red; */
    width: 90%;
}

.comment + .comment {
    margin-top: 15px;
}

.fixed-feedback {
  position: absolute;
  top: -60px; /* 根据需要调整 */
  left: 10;
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
</style>
