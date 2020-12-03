<template>
	<span :style="{ height, width: computedWidth }" class="skeleton">
		<slot></slot>
	</span>
</template>
<script>
export default {
	props: {
		maxWidth: {
			type: Number,
			default: 100,
		},
		minWidth: {
			type: Number,
			default: 80,
		},
		height: {
			type: String,
			default: "1em",
		},
		width: {
			type: String,
			default: null,
		},
	},
	computed: {
		computedWidth() {
			return (
				this.width ||
				`${Math.floor(
					Math.random() * (this.maxWidth - this.minWidth) +
						this.minWidth
				)}%`
			);
		},
	},
};
</script>