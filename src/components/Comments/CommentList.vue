<template>
    <div class="comment-section">
        <div class="image-text_1 flex-row justify-between">
            <img
                class="thumbnail_5"
                referrerpolicy="no-referrer"
                src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb484f54abc7a40151b124086f6b2e6a468b5915cb4223d4123b2e6a5eab530d3"
            />
            <span class="text-group_1">用户反馈（{{totalComments}}）</span>
        </div>
        <div class="score-tip-row" style="display: flex; align-items: center; margin-left: 20px; margin-bottom: 3px; margin-top: 6px;">
            <span style="font-size: 15px; color: #870066; margin-right: 10px;">请为该模型打分：</span>
            <el-rate v-model="newScore" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" style="font-size: 22px;"></el-rate>
            <span v-if="newScore" style="margin-left: 10px; color: #F7BA2A;">{{ newScore }} 分</span>
        </div>
        <div class="box_7 flex-row justify-between">
            <div class="text-wrapper_3 flex-col">
                <textarea 
                class="text-input" 
                placeholder="聊聊这个模型吧…" 
                rows="3"
                v-model="this.newComment"></textarea>
            </div>
            <div class="section_3 flex-row" @click="postComment">
                <div class="image-text_2 flex-col justify-between">
                <img
                    class="thumbnail_6"
                    referrerpolicy="no-referrer"
                    src="https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb77e0db108b48f17a326a3673294061f2b5805cce41074a119005e87e0b37d38"
                />
                <span class="text-group_2">发表评价</span>
                </div>
            </div>
        </div>
        <div class="comments-list" v-if="totalComments > 0">
            <comment
                v-for="(comment, index) in comments"
                :key="`root-${index}`"
                ref="commentRefs"
                :comment="comment"
                :depth="0"
                :user_comment_map="user_comment_map"
                :modelId="modelId"
                @comment-updated="fetchComments"
            />
        </div>
        <EmptyReview v-else />
    </div>
</template>

<script>
import axios from "axios";
import Comment from "./Comment.vue";
import EmptyReview from "../ModelDetailPage/EmptyReview.vue";

export default {
    name: "CommentsList",
    components: {
        Comment,
        EmptyReview
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
            userId: 7,
            newComment: "", // 存储输入的评论
            reviewCount: 0, // 评论数量
            newScore: 0,
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
                    console.log("评论：", this.comments);
                    this.user_comment_map = this.mapCommentIdsToUserNames(this.comments);
                } else {
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
                    console.log(comment.commentId);
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
            const token = localStorage.getItem('token');
            if (!token) {
                alert("请先登录！");
                return;
            }
            if (!this.newComment.trim()) {
                alert("评论内容不能为空！");
                return;
            }
            if (!this.newScore) {
                alert("请先为该模型打分！");
                return;
            }
            try {
                // 先提交评分
                const ratingRes = await axios.post(
                    'http://49.233.82.133:9091/model/rating/add',
                    {
                        modelId: this.modelId,
                        rating: this.newScore
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                if (!ratingRes.data.success) {
                    alert("评分提交失败：" + (ratingRes.data.errorMsg || '未知错误'));
                    return;
                }

                // 再提交评论
                const response = await axios.post(
                    'http://49.233.82.133:9091/model/comment/add',
                    {
                        commentDetail: this.newComment,
                        modelId: this.modelId,
                        deep: 0, // 普通评论
                        answerId: null,
                        status: true,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.data.success) {
                    this.newComment = ""; // 清空输入框
                    this.newScore = 0;    // 清空评分
                    this.showReplies = false; // 隐藏回复框
                    await this.fetchComments(); // 刷新评论列表
                    // 调用所有 Comment 子组件的 fetchUserRating
                    this.$nextTick(() => {
                        const refs = this.$refs.commentRefs;
                        if (Array.isArray(refs)) {
                            refs.forEach(ref => {
                                if (ref && typeof ref.fetchUserRating === 'function') {
                                    ref.fetchUserRating();
                                }
                            });
                        }
                    });
                    this.$emit('refresh-model-detail');
                    alert("评论和评分提交成功！");
                } else if (response.data.msg === "Token无效!!") {
                    alert("请先登录！");
                } else {
                    console.log(response.data);
                    alert("发表评论失败：" + response.data.errorMsg);
                }
            } catch (error) {
                console.error('Error posting comment or rating:', error);
                alert("发表评论或评分失败，请稍后再试。");
            }
        },

        countTotalComments(comments) {
            let total = 0;

            function recurse(commentArray) {
                commentArray.forEach((comment) => {
                    total += 1; // 计入当前评论
                    if (comment.child && comment.child.length > 0) {
                        recurse(comment.child); // 递归计入子评论
                    }
                });
            }

            recurse(comments);
            return total;
        }
    },
    computed: {
        totalComments() {
            this.reviewCount =  this.countTotalComments(this.comments);
            return this.reviewCount;
        },
    },
};
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

.box_7 {
  width: 1160px;
  height: 83px;
  margin: 8px 0 0 20px;
  display: flex; /* 启用 Flex 布局 */
  flex-direction: row; /* 确保子元素横向排列（默认值，可省略） */
}
.text-wrapper_3 {
  background-color: rgba(248, 249, 251, 1);
  border-radius: 8px;
  height: 83px;
  width: 100%;
  border: 1px solid #ddd;
}
.text-input {
  width: 98%; /* 占满父容器宽度 */
  height: 100%; /* 高度自适应父容器 */
  border: none; /* 去掉边框 */
  outline: none; /* 去掉聚焦时的边框 */
  resize: none; /* 禁止调整大小 */
  font-size: 14px;
  color: rgba(34, 34, 34, 1);
  background-color: transparent; /* 背景透明，与父容器一致 */
  margin: 10px 0 0 10px;
}

.section_3 {
  background-color: rgba(135, 0, 102, 1);
  border-radius: 8px;
  width: 82px;
  height: 83px;
  cursor: pointer;
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
  width: 1200px;
  margin: 15px auto;
  border: 1px solid #ddd;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  align-items: center;
  position: relative
}

.image-text_1 {
  display: flex;
  flex-direction: row;
  width: 130px;
  height: 22px;
  margin: 15px 0 0 15px;
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
  margin-left: 12px;
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
