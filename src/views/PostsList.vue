<template>
    <div class="getPosts">
        <h1>All Posts</h1>
        <div v-if="store.state.resources['posts']" class="posts">
            <div v-for="post in store.state.resources['posts'].slice(0, store.state.showMore)" :key="post.id">
                <PostPreview
                    :title="post.title ? post.title : 'unknown'"
                    :body="post.body ? post.body : 'unknown'"
                    :id="post.id ? post.id : 'unknown'"
                />
            </div>
        </div>
        <div v-else class="posts">
            loading...
        </div>
        <button @click="store.state.showMore = store.state.showMore + 5">
            Load more
        </button>
    </div>
</template>

<script>
import { inject } from 'vue'
import PostPreview from '@/components/PostPreview.vue'

export default {
    setup() {
        const store = inject('store')

        return {
            store
        }
     },
    created () {
        this.store.methods.fetchResources()
    },
    components: {
        PostPreview
    }
}
</script>

<style lang="scss">
.posts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}
</style>