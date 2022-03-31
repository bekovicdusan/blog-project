import { reactive } from 'vue'
import axios from 'axios'

const state = reactive({
    resources: {
        posts: [],
        comments: [],
        users: []
    },
    showMore: 5
})

const methods = {
    async fetchResources () {
        const postsReq = axios.get('https://jsonplaceholder.typicode.com/posts')
        const commentsReq = axios.get('https://jsonplaceholder.typicode.com/comments')
        const usersReq = axios.get('https://jsonplaceholder.typicode.com/users')

        await axios.all([postsReq, commentsReq, usersReq])
        .then(axios.spread(function(posts, comments, users){
            state.resources["posts"] = posts.data
            state.resources["comments"] = comments.data
            state.resources["users"] = users.data.reduce((acc, user) => {
                return {...acc, [user.id]:user}
            }, {})
        }))
        console.log(state.resources)
    }
}

export default {
    state,
    methods
}