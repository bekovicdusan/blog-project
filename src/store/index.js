import { reactive } from 'vue'

const state = reactive({
    postList: []
})

const methods = {
    fetchPost () {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json().then((json) => state.postList = json));
        console.log(state.postList)
    }, 
    createPost () {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
                name: 'Milorad Stanojevic',
                id: 222
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            state.postList.push(json);   
        })
    }
}

export default {
    state,
    methods
}