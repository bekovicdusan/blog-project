<template>
<div class="allposts">
    <h1>Single Post</h1>
    <h3> {{ name }} </h3>
</div>
</template>

<script>
import { inject } from 'vue'

export default {
    props: {
        name: {
            required: false,
            type: String
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