<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center sm:ml2 sm:mr2"
  >
    <div>
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center font-nunito">
        Where are you coming from?
      </h1>
      <h1 class="text-3xl text-gray-500 text-center mt-3">
        ན་བུ་ག་སྟེ་ལས་བྱོནམ་སྨོ?
      </h1>
        
  
    </div>

    <div
      class="
        p-3
        mx-auto
        bg-white
        rounded-xl
        shadow-md
        min-w-6/12
        mt-7
        items-center
        space-x-4
      "
    >
      <select
        v-model="originSelected"
        class="text-3xl p-5 bg-white text-blue-900"
      >
        <option
          v-for="origin in origins"
          :value="origin"
          :key="origin"
          class="bg-white"
        >
          {{ origin.name }}
        </option>
      </select>
    </div>

    <div class="inline-flex mt-8">
      <button
        class="
          bg-gray-100
          hover:bg-gray-400
          text-gray-500
          hover:text-white
          font-bold
          py-2
          px-4
          rounded
        "
        @click="addOrigin(originSelected)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { getAllStops } from "../../services/stopServices";

export default {
  data() {
    return {
      origins: [],
      originSelected: {},
    };
  },
  created() {
    getAllStops().then((res) => {
      this.origins = res;
      this.originSelected = res[0];
    });
    this.$store.commit('resetSeats')
    console.log(this.$store.origin)
    if(this.$store.state.origin){
      this.originSelected = this.$store.state.origin
    }
  },
 
  methods: {
    addOrigin(val) {
      this.$store.commit("addOrigin", val);
      this.$router.push("/book/destination");
    },
  },
};
</script>