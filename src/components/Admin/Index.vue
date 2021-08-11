<template>
  <div
    class="min-h-screen flex flex-col items-center justify-start sm:ml2 sm:mr2"
  >
    <div>
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center font-nunito">
        Admin Dashboard
      </h1>
      <h1 class="text-3xl text-gray-500 text-center mt-3">
        ༅༅ ། མེ་ཏོག སྐྱེལ་འདྲེན ཞབས་ཏོག།
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
     <h2>
       Guide
     </h2>

     <p>
       isFinished Code <br>
        0 - No <br>
        1 - Yes <br>
        2 - Cancelled
     </p>

     <p>
       checkInStatus <br>
       CANCEL -- means Cancelled
       REFUND --- means refunded
     </p>
    </div>


    
  </div>

 
</template>

<script>
export default {
  data() {
    return {
      origins: [
        {
          dzo:"ཐིམ་ཕུ",
          eng:'Thimphu'
        },
        {
          dzo:'སྤ་རོ',
          eng:'Paro'
        }],
      originSelected: {
          dzo:"ཐིམ་ཕུ",
          eng:'Thimphu'
        },
    };
  },
  methods: {
    addOrigin(val) {

      this.$store.commit("addOrigin", val);
      this.$router.push('/book/destination')
    }
  },
};
</script>