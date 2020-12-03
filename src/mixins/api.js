import Vue from "vue";
import axios from "axios";

Vue.prototype.$http = axios;
Vue.prototype.$baseurl = "https://api.unsplash.com";

Vue.mixin({
    data() {
        return {
            apiRequests: {
                photos: {
                    async allPhotos(config = {}) {
                        return await this.$http({
                            url: `${this.$baseurl}/search/photos?query=african`,
                            method: 'GET',
                            headers: {
                                ...this.headers,
                                "Content-Type": "application/json",
                            },
                            ...config,
                        });
                    },
                    async search(query, config = {}) {
                        return await this.$http({
                            url: `${this.$baseurl}/search/photos?query=${query}`,
                            method: 'GET',
                            headers: {
                                ...this.headers,
                                "Content-Type": "application/json",
                            },
                            ...config,
                        });
                    },
                },
            },
        };
    },
    computed: {
        headers() {
            return {
                Authorization: `${this.$store.state.clientID}`,
            };
        },
    },
    methods: {
        async sendRequest(path = "", ...params) {
            var fullPath = path.split(".");
            var request;

            try {
                request = fullPath.reduce(
                    (last, current) => last[current],
                    this.apiRequests
                );
            } catch (e) {
                console.warn(e);
            }

            if (!request || request.constructor !== Function) {
                throw new Error(
                    `Invaliid Request ${path}; Request Not Registered In /src/mixins/api.js`
                );
            }

            return await request.apply(this, [...params]);
        },
    },
});