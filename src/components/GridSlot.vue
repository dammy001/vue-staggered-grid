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
   //set props
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
   moveClass: {
    default: ""
   }
  },
  methods: {
   notify: function() {
    this.$parent.$emit("reflow", this); //emit reflow function from parent component
   },
   getMeta: function() {
    //getMeta function that return object data
    return {
     vm: this,
     node: this.$el, //The root DOM element that the Vue instance is managing.
     order: this.order,
     width: this.width,
     height: this.height,
     moveClass: this.customClass
    };
   }
  },
  created() {
   (this.rect = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
   }),
    this.$watch(() => (this.width, this.height), this.notify);
   //watch width and height and there's any changes, render notify function
  },
  mounted() {
   this.$parent.$once("reflowed", () => {
    //listen for reflowed event once on parent component
    this.show = true;
   });
   this.notify();
  },
  destroyed() {
   this.notify();
  }
 };
</script>
