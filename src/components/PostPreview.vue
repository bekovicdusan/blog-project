<template>
    <div class="post-preview-wrapper">
        <router-link :to="{name: 'Post', params:{id: id}}" class="router-link">
            <h2> {{ title }} </h2>
        </router-link>  
        <p> {{ body }} </p>
        <span> by <em style="font-weight: bold"> {{ store.state.resources['users'] ? store.state.resources['users'][userId].name : 'unknown' }} </em></span>
        <hr>
        <div class="comment-wrapper">
            <h3>Comments</h3>
            <div v-if="store.state.resources['comments']">
                <div v-for="comment in store.state.resources['comments']" :key="comment.id"> 
                    <div v-if="comment.postId === id">
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
import { inject } from 'vue'

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

        return {
            store
        }
    }
}
</script>

<style lang="scss">
.post-preview-wrapper {
    border: 1px solid gray;
    border-radius: 10px;
    width: 40vw;
    margin-bottom: 20px;
    padding: 25px;
    .comment-wrapper {
        text-align: left;
        h4 {
            margin: 0;
            margin-bottom: 10px;
        }
        .comment {
            margin: 0;
            margin-bottom: 20px;
        }
        .commenter {
            margin-left: 5px;
            opacity: 80%;
        }
    }
}
</style>