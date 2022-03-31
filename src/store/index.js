import { reactive } from 'vue'
import axios from 'axios'

const state = reactive({
    resources: {
        posts: [],
        comments: [],
        users: []
    },
    singleResource: {
        post: {},
        postComments: [],
        user: {}
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
    },
    async fetchSinglePostResources (postId) {
        const postReq = axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        const commentReq = axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        const userReq = axios.get(`https://jsonplaceholder.typicode.com/users/${(await postReq).data.userId}`)

        await axios.all([postReq, commentReq, userReq])
        .then(axios.spread(function(post, comments, user){
            state.singleResource["post"] = post.data
            state.singleResource["postComments"] = comments.data
            state.singleResource["user"] = user.data
        }))
    }
}

export default {
    state,
    methods
}