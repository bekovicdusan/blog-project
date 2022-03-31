<template>
    <div class="single-post-wrapper">
        <SinglePost :id="id"/>
    </div>
</template>

<script>
import SinglePost from '@/components/SinglePost.vue'

export default {
    props: {
        id: {
            required: false,
            type: Number
        }
    },
    components: {
        SinglePost
    }
}
</script>