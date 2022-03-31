import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/PostsList.vue')
  },
  {
    path: '/post/:id',
    name: 'Post',
    props: route => ({ ...route.params, id: route.params.id }),
    component: () => import(/* webpackChunkName: "Post" */ '../views/SinglePostView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
