<template>
    <div class="comments-list">
        <comment
            v-for="(comment, index) in comments"
            :key="`root-${index}`"
            :comment="comment"
            :depth="0"
            :user_comment_map="user_comment_map"
        />
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
    props: [modelId],
    data() {
        return {
            comments: [],
            user_comment_map: new Map(),
        };
    },
    async created() {
        try {
            const commentsResponse = await axios.get(
                `http://49.233.82.133:9091/model/comment/tree?modelId=${this.modelId}`
            );
            if (commentsResponse.data.success) {
                this.comments = commentsResponse.data.data;
                // console.log(this.comments);
                this.user_comment_map = this.mapCommentIdsToUserNames(this.comments)
                // console.log(this.user_comment_map)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },
    methods: {
        mapCommentIdsToUserNames(comments) {
            const commentMap = new Map();

            function recurseComments(commentArray) {
                commentArray.forEach((comment) => {
                    commentMap.set(comment.commentId, comment.userName);
                    if (comment.child && comment.child.length > 0) {
                        recurseComments(comment.child);
                    }
                });
            }
            recurseComments(comments);
            return commentMap;
        },
    },
};
</script>

<style scoped>
.comments-list {
    margin: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    /* border: solid 1px red; */
}

.comment + .comment {
    margin-top: 15px;
}
</style>
