<template>
    <suspense>
        <template #default>
            <div class="single-post-wrapper">
                <SinglePost 
                    :id="id"
                    :comments="store.state.singleResource['postComments']"
                />
            </div>
        </template>
        <template #fallback>
            <div>
                Loading...
            </div>
        </template>
    </suspense>
</template>

<script>
import { defineAsyncComponent, inject, ref } from 'vue'

export default {
    setup () {
        const store = inject('store')

        let id = ref('')

        return {
            store,
            id
        }
    },
    created () {
        this.id = parseInt(this.$route.params.id)
        this.store.methods.fetchSinglePostResources(this.id)
    },
    components: {
        SinglePost: defineAsyncComponent(() => import('@/components/SinglePost.vue'))
    }
}
</script>

<style lang="scss">
    .single-post-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>