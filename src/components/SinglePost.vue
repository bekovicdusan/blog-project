<template>
    <div class="allposts">
        <div class="go-back-wrapper">
            <router-link to="/posts">
                <button class="go-back">
                    Go Back
                </button>
            </router-link>
        </div>
        <div class="post-preview-wrapper">
            <!-- <h2> {{ title }} </h2>
            <p> {{ body }} </p> -->
            <!-- <span> by <em style="font-weight: bold"> {{ store.state.resources[2][id].name }} </em></span> -->
            <hr>
            <!-- <div class="comment-wrapper">
                <h3>Comments</h3>
                <div v-for="comment in store.state.resources[1]" :key="comment.id"> 
                    <div v-if="comment.postId === id">
                        <h4> {{ comment.name }} <small class="commenter"> ({{ comment.email }}) </small> </h4>
                        <p class="comment">
                            {{ comment.body }}
                        </p>
                    </div> 
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { inject } from 'vue'

export default {
    props: {
        id: {
            required: false,
            type: Number
        }
    },
    setup() {
        const store = inject('store')
        return {
            store
        }
    },
}
</script>