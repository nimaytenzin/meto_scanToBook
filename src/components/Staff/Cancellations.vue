<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center sm:ml2 sm:mr2"
  >
    <div>
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center font-nunito">
        Cancellations
      </h1>
    </div>


    <div>
      <table>
        <thead>
          <tr>
            <td>
              Sl.No
            </td>
            <td>
              Name
            </td>
          </tr>
        </thead>
      </table>
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