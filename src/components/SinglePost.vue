<template>
    <div class="single-post-wrapper">
        <div class="go-back-wrapper">
            <router-link to="/posts" class="router-link">
                <span class="go-back">
                    Go Back
                </span>
            </router-link>
        </div>
        <div class="post-wrapper" id="post-wrapper">
            <div class="title-wrapper">
                <h2> {{ store.state.singleResource['post'].title }} </h2>
            </div>
            <div class="body-wrapper">
                <p> {{ store.state.singleResource['post'].body }} </p>
                <span> by <em style="font-weight: bold; color: #41b883;"> {{ store.state.singleResource['user'].name }} </em></span>
            </div>
            <hr>
            <div class="comment-wrapper">
                <h3>Comments</h3>
                <div class="comment-section">
                    <div v-for="comment in comments" :key="comment.id" class="individual-comment"> 
                        <h4> {{ comment.name }} <small class="commenter"> ({{ comment.email }}) </small> </h4>
                        <p class="comment">
                            {{ comment.body }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, onUnmounted } from 'vue'

export default {
    props: {
        id: {
            required: false,
            type: Number
        },
        comments: {
            required: false,
            type: Array
        }
    },
    setup() {
        const store = inject('store')

        onUnmounted(() => {
            store.state.singleResource = {
                        post: {},
                        postComments: [],
                        user: {}
                    }
        })

        return {
            store
        }
    },
}
</script>

<style lang="scss">
    .single-post-wrapper {
        .go-back-wrapper {
            margin-bottom: 20px;
        }
        .post-wrapper {
            background: white;
            border: 1px solid back;
            border-radius: 10px;
            box-shadow: 5px 8px 25px 0px #00000082;
            margin-bottom: 20px;
            .title-wrapper {
                background-color: #35495e;
                color: white;
                border-radius: 10px 10px 0 0;
                padding: 15px;
                text-transform: capitalize;
                h2 {
                    margin: 0;
                }
            }
            .body-wrapper {
                padding: 0 20px;
                p {
                    text-align: left;
                }
                span {
                    display: block;
                    text-align: right;
                }
            }
            .comment-wrapper {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                padding: 0 20px;
                h3 {
                    margin: 0
                }
                .comment-section {
                    margin-top: 10px;
                    .individual-comment {
                        background-color: aliceblue;
                        padding: 5px 5px 2px 10px;
                        text-align: left;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
</style>