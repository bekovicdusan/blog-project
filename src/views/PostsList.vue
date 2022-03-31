<template>
    <input v-model="query"/>
    <suspense>
        <template #default>
            <div class="getPosts">
                <h1>All Posts</h1>
                <div class="posts">
                    <transition-group 
                        :css="false" 
                        @before-enter="methods.onBeforeEnter"
                        @enter="methods.onEnter"
                        @leave="methods.onLeave"
                    >
                        <PostPreview
                            v-for="(post, index) in computedQuery.slice(0, store.state.showMore)"
                            :key="post.id"
                            :data-index="index"
                            :title="post.title"
                            :body="post.body"
                            :id="post.id"
                            :userId="post.userId"
                        />
                    </transition-group>
                </div>
                <button @click="store.state.showMore = store.state.showMore + 5">
                    Load more
                </button>
            </div>
        </template>
        <template #fallback>
            <div class="posts">
                loading...
            </div>
        </template>
    </suspense>
</template>

<script>
import { defineAsyncComponent, inject, ref, computed } from 'vue'
import gsap from 'gsap'

export default {
    setup() {
        const store = inject('store')
        let query = ref('')

        const computedQuery = computed(() => {
            return store.state.resources['posts'].filter((post) => store.state.resources['users'][post.userId].name.toLowerCase().includes(query.value.toLowerCase()))
        })

        const methods = {
            onBeforeEnter(el) {
                el.style.opacity = 0
                el.style.height = 0
            },
            onEnter(el, done) {
                gsap.to(el, {
                    opacity: 1,
                    height: 'fit-content',
                    delay: el.dataset.index * 0.15,
                    onComplete: done
                })
            },
            onLeave(el, done) {
                gsap.to(el, {
                    opacity: 0,
                    height: 0,
                    delay: el.dataset.index * 0.15,
                    onComplete: done
                })
            }
        }

        return {
            store,
            methods,
            computedQuery,
            query
        }
    },
    mounted () {
        console.log(this.computedQuery)
    },
    created () {
        this.store.methods.fetchResources()
    },
    components: {
        PostPreview: defineAsyncComponent(() => import('@/components/PostPreview.vue'))
    }
}
</script>

<style lang="scss">
.posts {
    display: flex;
    flex-direction: column;
    justify-content: cleave;
    align-items: center;
    margin-top: 30px;
    .post-enter-from {
        opacity: 0;
    }
    .post-enter-to {
        opacity: 1;
    }
    .post-enter-active {
        transition: all 3s ease;
    }
    .post-leave-from {
        opacity: 0;
    }
    .post-leave-to {
        opacity: 1;
    }
    .post-leave-active {
        transition: all 3s ease;
    }
}
</style>