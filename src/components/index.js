import Vue from "vue"

Vue.component("search", () => import("./Search.vue"))
Vue.component("modal", () => import("./Modal.vue"))
Vue.component('skeleton-loader', () => import('./SkeletonLoader.vue'))
Vue.component('search-icon', () => import('./SearchIcon.vue'))
Vue.component('photo', () => import('./Photo.vue'))
Vue.component('arrow-icon', () => import('./ArrowBack.vue'))
