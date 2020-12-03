import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
     component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/search-result',
    name: 'SearchResult',
     component: () => import(/* webpackChunkName: "result" */ '../views/SearchResult.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
