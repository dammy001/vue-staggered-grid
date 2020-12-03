<template>
	<div class="relative">
		<div class="w-full h-48 p-3 bg-gray-300 pt-16 inline-flex">
			<div
				@click="goBack('Index')"
				class="mt-3 ml-5 sm:ml-10 mr-3 sm:mt-4 cursor-pointer"
			>
				<arrow-icon></arrow-icon>
			</div>
			<template v-if="loading">
				<div
					class="font-medium text-2xl sm:text-3xl ml-2 sm:ml-16 text-gray-800"
				>
					Searching for
					<span class="text-gray-600">"{{ query }}"</span>
				</div>
			</template>
			<template v-else-if="searchResultsLength">
				<div
					class="font-medium text-2xl sm:text-3xl ml-2 sm:ml-16 text-gray-800"
				>
					Search Results for
					<span class="text-gray-600">"{{ query }}"</span>
				</div>
			</template>
			<template v-else>
				<div
					class="font-medium text-2xl sm:text-3xl ml-2 sm:ml-16 text-gray-800"
				>
					No Search Results for
					<span class="text-gray-600">"{{ query }}"</span>
				</div>
			</template>
		</div>
		<div class="flex justify-center mt-5" v-if="error">
			{{ error }}
		</div>
		<div class="md:px-48 -mt-8 flex justify-center mb-10">
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
				<template v-if="loading">
					<skeleton-loader
						height="200px"
						width="150px"
						v-for="index in 7"
						:key="index"
					>
						<div class="flex flex-col mt-40 ml-3">
							<skeleton-loader
								width="90px"
								height="8px"
								class="bg-gray-300"
							></skeleton-loader>
							<skeleton-loader
								width="50px"
								height="8px"
								class="mt-2 bg-gray-300"
							></skeleton-loader>
						</div>
					</skeleton-loader>
				</template>
				<template v-else>
					<photo
						v-for="(photo, i) in results"
						:key="i"
						:index="i"
						:photo="photo"
					></photo>
				</template>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			errorMessage: {},
			loading: false,
		};
	},
	computed: {
		query() {
			return this.$route.query.query;
		},
	},
	mounted() {
		this.searchParams();
	},
	methods: {
		async searchParams() {
			this.loading = true;
			await this.sendRequest("photos.search", this.query)
				.then((response) => {
					this.$store.commit("searchResults", response.data.results);
				})
				.catch((error) => {
					this.errorMessage = error;
				});
			this.loading = false;
		},
	},
};
</script>