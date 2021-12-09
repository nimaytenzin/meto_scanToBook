<template>
  <div class="min-h-screen flex flex-col items-center sm:ml2 sm:mr2">
    <div class="mt-10">
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div class="flex flex-col justify-center items-center bg-red-500 p-4 rounded-2xl mt-4 shadow-2xl">
      <h1 class="text-2xl text-white text-center font-nunito">SORRY YOUR PAYMENT FAILED FOR BOOKING NUMBER: <span class="font-bold">{{bookingId}}</span> </h1>
    </div>
    <div class="flex flex-col justify-center items-center mt-9 w-3/4">
        <h1 class="text-2xl text-gray-500 text-justify font-nunito">Something went wrong while processing your payment. You can try again by clicking below or cancel your booking. </h1>
        <div class="flex space-x-4 mt-9">
            <button class="bg-blue-500 text-white font-bold p-3 rounded-2xl" @click="loadPayment()"> Try again</button>
            <button class="bg-red-500 text-white font-bold p-3 rounded-2xl"> Cancel booking</button>
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
      this.$store.commit("addOrigin","failed")
      this.$store.commit("addScanBookingId",this.bookingId)
  },
  data() {
    return {
      bookingId:null,
    };
  },
  methods: {
      loadPayment(){
          if(!isNaN(this.bookingId)){
            this.$router.push(`/book/loadPayment`);
          }else{
            this.$toast.show("Booking id error. This is not supposed to happen.", {
                position: "top",
                type: "error",
            });
          }
      }
  }
};
</script>