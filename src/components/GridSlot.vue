<template>
 <div class="grid-slot" v-if="show">
  <slot></slot>
 </div>
</template>
<script>
 export default {
  data: () => ({
   show: false
  }),
  props: {
   width: {
    required: true,
    validator: (val) => val >= 0
   },
   height: {
    required: true,
    validator: (val) => val >= 0
   },
   order: {
    default: 0
   },
   customClass: {
    default: ""
   }
  },
  methods: {
   notify: function() {
    this.$parent.$emit("reflow", this);
   },
   getData: function() {
    return {
     vm: this,
     node: this.$el,
     order: this.order,
     width: this.width,
     height: this.height,
     customClass: this.customClass
    };
   }
  },
  created() {
      this.rect = {
          top: 0,
          left: 0,
          width: 0,
          height: 0
      },
      this.$watch(() => {
        this.width,
        this.height,
      }, this.notify())
  },
  mounted() {
      this.$parent.$once('reflowed', () => {
      this.show = true
    })
    this.notify()
  },
  destroyed() {
    this.notify()
  }
 };
</script>
