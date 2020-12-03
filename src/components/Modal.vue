<template>
	<div class="modal" :class="{ open: isOpen }" @click="clickedModal">
		<div class="modal-content" :class="className">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: ["className"],
	data() {
		return {
			isOpen: false,
		};
	},
	methods: {
		clickedModal(event) {
			if (event.target.matches(".modal")) {
				this.close();
			}
		},
		close() {
			this.isOpen = false;
			this.$emit("close");
		},
		open() {
			this.isOpen = true;
			this.$emit("open");
		},
	},
};
</script>