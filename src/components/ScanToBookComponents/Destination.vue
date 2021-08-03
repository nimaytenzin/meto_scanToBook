<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div>
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div>
      <h1 class="text-3xl text-gray-500 text-center">
        Where do you want to go?
      </h1>
      <h1 class="text-3xl text-gray-500 text-center mt-3">
        ན་ག་སྟེ་བྱོན་ནི་སྨོ?
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
        v-model="destinationSelected"
        class="text-3xl p-5 bg-white text-blue-900"
      >
        <option
         v-for="destination in destinations"
          :value="destination" 
          :key="destination"
          :disabled="disableOption(destination)"
          >
          {{ destination.name }}
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
          rounded-l
        "
        @click="this.$router.push('/book')"
      >
        Prev
      </button>

      <button
        class="
          bg-gray-100
          hover:bg-gray-400
          text-gray-500
          hover:text-white
          font-bold
          py-2
          px-4
          rounded-r
          inline-flex
          items-center
        "
        @click="addDestination(destinationSelected)"
      >
        <span class="mr-2">Next</span>
       
      </button>
    </div>

  
  </div>
</template>

<script>
import {
  getAllStops
} from '../../services/stopServices'
export default {
  data() {
    return {
     destinations: [],
      destinationSelected:{}
    };
  },
  
  created() {


    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
    getAllStops().then(res => {
      this.destinations = res
      this.destinationSelected = res[0]
    })
  },
  methods: {
    addDestination(val) {
   
        this.$store.commit("addDestination", val);
        this.$router.push("/book/date");
      
    },
    disableOption(opt) {
      let origin = this.$store.state.origin;
      if(opt === origin){
        return true
      }
      return false;
    },
  },
};
</script>