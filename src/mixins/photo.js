import Vue from "vue";

import { mapState } from "vuex";
Vue.mixin({
	computed: {
		...mapState(["photos", "results"]),
		maxPhotos() {
			return this.photos.slice(0, 7);
		},
		searchResultsLength() {
			return this.results?.length > 0;
		},
		emptySearchResults() {
			return this.results?.length === 0;
		},
		error() {
			if (
				this.errorMessage
					?.toString()
					.match(/Error: Network Error|net::ERR_NAME_NOT_RESOLVED/i)
			) {
				return "Please check your internet connection";
			}
			if (this.errorMessage?.response?.data?.message) {
				return this.errorMessage?.response?.data?.message;
			}
			return null;
		},
	},
	methods: {
		searchParams() {
			this.$router.push({
				name: "SearchResult",
				query: { query: `${this.searchQuery}` },
			});
		},
		goBack(name) {
			return this.$router.push({
				name: name,
			});
		},
	},
});