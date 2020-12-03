import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        photos: [],
        clientID: "Client-ID JaEAWufwYGffGe2P7OjIw2GyjxLg_3QN8aFVZnbIaz4",
        previewData: {},
        user: {},
        results: [],
    },
    mutations: {
        allPhotos(state, payload) {
            state.photos = payload;
        },
        previewImage(state, { urls, user }) {
            state.previewData = urls;
            state.user = user;
        },
        searchResults(state, payload) {
            state.results = payload;
        },
    },
    actions: {},
    modules: {},
});