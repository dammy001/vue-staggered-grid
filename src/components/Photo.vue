<template>
 <div>
  <div
   class="photo"
   :style="{ 'background-image': 'url(' + image + ')' }"
   @click="preview(photo)"
  >
   <div class="flex flex-col text-xs text-white ml-3 font-semibold">
    <p>{{ photo.user.name }}</p>
    <p class="font-normal">{{ photo.user.location }}</p>
   </div>
  </div>

  <modal className="w-11/12 md:w-5/12 flex flex-col" ref="details">
   <div
    class="w-full h-500px rounded-t-lg single"
    :style="{ 'background-image': 'url(' + previewImage + ')' }"
   ></div>
   <div class="bg-white h-20 rounded-b-lg pl-12 text-base w-full p-4">
    <p class="text-gray-800 tracking-wide font-semibold">
     {{ username }}
    </p>
    <p class="text-gray-800 mt-1 font-normal text-sm">
     {{ location }}
    </p>
   </div>
  </modal>
 </div>
</template>
<script>
 import { mapState } from "vuex";
 export default {
  props: {
   photo: {
    type: Object,
    default: () => {},
    required: true
   },
   index: {
    type: Number,
    default: null
   }
  },
  computed: {
   ...mapState(["previewData", "user"]),
   image() {
    return this.photo?.urls?.full;
   },
   previewImage() {
    return this.previewData?.full;
   },
   username() {
    return this.user?.name;
   },
   location() {
    return this.user?.location;
   }
  },
  methods: {
   preview({ urls, user }) {
    this.$store.commit("previewImage", { urls, user });
    this.$refs.details.open();
   }
  }
 };
</script>
