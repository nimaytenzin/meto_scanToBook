<template>
  <div class="min-h-screen flex flex-col items-center sm:ml2 sm:mr2">
    <div class="mt-10">
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div class="flex flex-col justify-center items-center bg-green-500 p-4 rounded-2xl mt-4 shadow-2xl">
      <h1 class="text-2xl text-white text-center font-nunito">Transaction Cancelled!!</h1>
    </div>
    <div class="flex flex-col justify-center items-center mt-6 w-3/4">
        <div class="flex space-x-4 mt-9">
            <button class="bg-blue-500 text-white font-bold p-3 rounded-2xl" @click="goBack()"> Go back to main page</button>
        </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  created() {
      const route = useRoute()
      this.bookingId = route.params.bookingId
  },
  data() {
    return {
      bookingId:null,
    };
  },
  methods: {
      goBack(){
          this.$router.push("/book")
      }
  }
};
</script>