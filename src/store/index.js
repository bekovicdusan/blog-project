import { reactive } from 'vue'

const state = reactive({
    resources: [],
    showMore: 5,
    isLoaded: false
})

const methods = {
    fetchResources () {
        this.fetchPost()
        this.fetchComments()
        this.fetchUsers()
        state.isLoaded = true
        console.log(state.resources)
    },
    fetchPost () {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json().then((json) => state.resources["posts"] = json));
    }, 
    fetchComments () {
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json().then((json) => state.resources["comments"] = json));
    },
    fetchUsers () {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json().then((json) => {
            state.resources["users"] = json.reduce((acc, user) => {
                return {...acc, [user.id]:user}
            }, {})
        }));
    }
}

export default {
    state,
    methods
}