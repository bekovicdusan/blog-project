<template>
    <suspense>
        <template #default>
            <div class="getPosts">
                <h1>Posts</h1>
                <label class="search-label">Search posts
                    <input placeholder="Start typing the user's name" class="filter-input" v-model="query"/>
                </label>
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
                <div class="show-more-wrapper">
                    <button v-if="computedQuery.length > store.state.showMore" @click="store.state.showMore = store.state.showMore + 5">
                        Show more
                    </button>
                    <button v-else @click="store.state.showMore = store.state.showMore - 5">
                        Show Less
                    </button>
                </div>
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
    justify-content: center;
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
.show-more-wrapper {
    margin-bottom: 30px;
    button {
        cursor: pointer;
        font-size: 18px;
        font-weight: 700;
        padding: 10px 15px;
        text-decoration: none;
        outline: none;
        background-color: transparent;
        border: 2px solid transparent;
        &:hover,
        &:focus,
        &:active {
            outline: none;
            box-shadow: none;
        }
        &:hover {
            border: 2px solid #35495e;
        }

    }
}
.search-label {
    font-weight: bold;
    .filter-input {
        margin-left: 10px;
        padding: 5px;
        border-radius: 5px;
        border: 2px solid #2c3e50;
    }
}
</style>