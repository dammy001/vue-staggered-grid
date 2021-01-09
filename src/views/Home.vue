<template>
 <div class="h-screen">
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
  <div class="md:px-48 -mt-8 flex justify-center mb-10 w-full">
   <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5 w-full">
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
     <grid
      :line="line"
      :line-gap="200"
      :min-line-gap="180"
      :max-line-gap="220"
      :watch="items"
      @reflowed="reflowed"
      ref="waterfall"
     >
      <grid-slot
       v-for="(item, index) in items"
       :width="item.width"
       :height="item.height"
       :order="index"
       :key="item.index"
       move-class="item-move"
      >
       <div class="w-32 h-32" :style="item.style" :index="item.index"></div>
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
  data: () => ({
   loading: false,
   line: "h",
   isBusy: false,
   searchQuery: "",
   errorMessage: {},
   searchLoading: false,
   items: generateRandomItems(15)
  }),
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
   },
   addItems() {
    if (!this.isBusy && this.items.length < 20) {
     this.isBusy = true;
     //this.items = [...this.items, ...generateRandomItems(50)];
     this.items.push.apply(this.items, generateRandomItems(50));
    }
   },
   shuffle() {
    this.items.sort(function() {
     return Math.random() - 0.5;
    });
   },
   reflowed() {
    this.isBusy = false;
   }
  },
  mounted() {
   console.log(this.$el);
   document.body.addEventListener("click", () => {
    this.shuffle();
   });

   document.addEventListener("scroll", () => {
    const scrollTop =
     document.documentElement.scrollTop || document.body.scrollTop;
    console.log(scrollTop, window.innerHeight, document.body.clientHeight);
    if (scrollTop + window.innerHeight >= document.body.clientHeight) {
     this.addItems();
    }
   });
  }
 };

 var lastIndex = 0;
 const generateRandomItems = (count) => {
  var items = [],
   i;
  for (i = 0; i < count; i++) {
   items[i] = {
    index: lastIndex++,
    style: {
     background: getRandomColor()
    },
    width: 500 + ~~(Math.random() * 50),
    height: 500 + ~~(Math.random() * 50)
   };
  }
  return items;
 };

 const getRandomColor = () => {
  var colors = [
   "rgba(21,174,103,.5)",
   "rgba(245,163,59,.5)",
   "rgba(255,230,135,.5)",
   "rgba(194,217,78,.5)",
   "rgba(195,123,177,.5)",
   "rgba(125,205,244,.5)"
  ];
  return colors[~~(Math.random() * colors.length)];
 };
</script>
<style lang="sass" scoped>
 .item-move
   transition: all .5s cubic-bezier(.55,0,.1,1)
   -webkit-transition: all .5s cubic-bezier(.55,0,.1,1)
</style>
