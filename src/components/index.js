import Vue from "vue";

Vue.component("search", () => import("./Search"));
Vue.component("modal", () => import("./Modal"));
Vue.component("skeleton-loader", () => import("./SkeletonLoader"));
Vue.component("search-icon", () => import("./SearchIcon"));
Vue.component("photo", () => import("./Photo"));
Vue.component("arrow-icon", () => import("./ArrowBack"));
Vue.component("grid", () => import("./Grid"));
Vue.component("grid-slot", () => import("./GridSlot"));
