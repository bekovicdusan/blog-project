<template>
    <div class="getPosts">
        <h1>posts list works</h1>
        <button class="send" @click="store.methods.fetchPost">Get Posts</button>
        <div class="posts">
            <div v-for="post in store.state.postList" :key="post.id">
                <h2>{{post.title}}</h2>   
                <p class="usertext">
                    {{post.body}}
                </p>          
                <router-link v-bind:to="{name: 'Post', params:{id: post.id}}" class="router-link">
                    <SinglePost
                        :name="post.name"
                    />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue'
import SinglePost from '@/components/SinglePost.vue'

export default {
    setup() {
        const store = inject('store')
        return {
            store
        }
    },
    components: {
        SinglePost
    }
}
</script>