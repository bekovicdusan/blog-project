<template>
    <div class="post-preview-wrapper" :class="showComments ? 'show-comments' : null">
        <div class="title-wrapper">
            <router-link :to="`/post/${id}`" class="router-link">
                <h2 class="post-title"> {{ title }} </h2>
            </router-link>  
        </div>
        <div class="body-wrapper">
            <p> {{ body }} </p>
            <span class="author">
                 by <em style="font-weight: bold; color: #41b883;"> {{ store.state.resources['users'] ? store.state.resources['users'][userId].name : 'unknown' }} </em>
            </span>
        </div>
        <hr>
        <div class="comment-wrapper">
            <h3 style="color: #2B193D">Comments</h3>
            <div class="comment-section">
                <div v-for="comment in store.state.resources['comments']" :key="comment.id"> 
                    <div v-if="comment.postId === id" class="individual-comment">
                        <h4> {{ comment.name }} <small class="commenter"> ({{ comment.email }}) </small> </h4>
                        <p class="comment">
                            {{ comment.body }}
                        </p>
                    </div> 
                </div>
            </div>
            <span 
                class="see-more" 
                :class="showComments ? 'active' : null"
                @click="showComments = !showComments"
            > 
                {{ !showComments ? 'see more...' : 'see less...' }}
            </span>
        </div>

    </div>
</template>

<script>
import { inject, ref } from 'vue'

export default {
    props: {
        title: {
            required: true,
            type: String
        },
        body: {
            required: true,
            type: String
        },
        id: {
            required: true,
            type: Number
        },
        userId: {
            required: true,
            type: Number
        }
    },
    setup() {
        const store = inject('store')
        const showComments = ref(false)

        return {
            store,
            showComments
        }
    }
}
</script>

<style lang="scss">
.post-preview-wrapper.show-comments {
    .comment-section {
        display: block;
        margin-top: 10px;
    }
}
.post-preview-wrapper {
    background-color: white;
    border: 1px solid gray;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 0;
    transition: all .3s;
    box-shadow: 5px 8px 25px 0px #00000082;
    .title-wrapper {
        background-color:#35495e;
        border-radius: 10px 10px 0 0;
        .router-link {
            text-decoration: none;
            color: white;
            text-transform: capitalize;
            &:visited,
            &:focus,
            &:active {
                text-decoration: none;
                color: white;
            }
            .post-title {
                margin: 0;
                padding: 15px;
                text-decoration-style: unset;
            }
        }
    }
    .body-wrapper {
        padding: 0 20px;
        p {
            text-align: left;
            font-size: 17px;
            line-height: 1.4;
        }
    }
    .comment-section {
        display: none;
        transition: display .3s;
        .comment {
            margin: 0;
            margin-bottom: 20px;
        }
        .commenter {
            margin-left: 5px;
            opacity: 80%;
        }
        h4 {
            margin: 0;
            margin-bottom: 5px;
            text-transform: capitalize;
            font-weight: bold;
        }
        .individual-comment {
            background-color: aliceblue;
            padding: 5px 5px 2px 10px;
            text-align: left;
            margin-bottom: 10px;
        }
    }
    .author {
        display: block;
        text-align: right;
    }
    .comment-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0px 20px 20px 20px;
        .see-more {
            cursor: pointer;
        }
        .see-more.active {
            margin-bottom: 15px;
        }
        h3 {
            margin: 0;
            margin-bottom: 5px;
        }
    }
}
</style>