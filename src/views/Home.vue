<template>
 <div class="relative">
  <div class="w-full h-48 p-3 bg-gray-300 pt-16">
   <form @submit.prevent="searchParams">
    <search
     class="flex justify-center"
     name="search"
     v-model="searchQuery"
    ></search>
   </form>
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
     <!-- <photo
                        v-for="(photo, i) in maxPhotos"
                        :key="i"
                        :index="i"
                        :photo="photo"
                    ></photo> -->
     <grid :line-gap="200" :watch="maxPhotos">
      <grid-slot
       v-for="(photo, index) in maxPhotos"
       :width="500"
       :height="500"
       :order="index"
       :key="photo.id"
      >
       <photo :photo="photo"></photo>
      </grid-slot>
     </grid>
    </template>
   </div>
  </div>
 </div>
</template>
<script>
 import { mapMutations } from "vuex";
 export default {
  data() {
   return {
    loading: false,
    searchQuery: "",
    errorMessage: {},
    searchLoading: false
   };
  },
  beforeMount() {
   this.getPhotos();
  },
  methods: {
   ...mapMutations(["allPhotos"]),
   async getPhotos() {
    this.loading = true;

    await this.sendRequest("photos.allPhotos")
     .then((response) => {
      this.allPhotos(response.data.results);
     })
     .catch((error) => {
      this.errorMessage = error;
     });
    this.loading = false;
   }
  }
 };
</script>
