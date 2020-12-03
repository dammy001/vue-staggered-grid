<template>
	<div>
		<div class="search sm:w-9/12 lg:w-6/12">
			<span class="search-icon-class">
				<arrow-icon
					v-if="inputValue"
					@click="disable"
					class="mt-2 cursor-pointer"
				></arrow-icon>
				<search-icon v-else></search-icon>
			</span>
			<input
				type="text"
				:name="name"
				:placeholder="placeholder"
				class="border border-none border-l-0 ml-5 w-full text-sm text-gray-500 rounded rounded-l-none relative focus:outline-none"
				v-model="inputValue"
				@input="change"
			/>
		</div>
	</div>
</template>
<script>
export default {
	model: {
		prop: "value",
		event: "input",
	},
	props: {
		value: {
			type: String,
			default: "",
		},
		name: {
			type: String,
			default: null,
		},
		placeholder: {
			type: String,
			default: "Search for photo",
		},
	},
	data() {
		return {
			inputValue: "",
		};
	},
	watch: {
		value() {
			this.inputValue = this.value;
		},
	},
	mounted() {
		this.input = this.inputValue;
	},
	methods: {
		change(event) {
			console.log(event);
			this.$emit("input", this.inputValue);
		},
		focus() {
			this.isFocused = true;
		},
		disable() {
			this.inputValue = "";
			this.input = "";
			this.$emit("input", "");
		},
	},
};
</script>