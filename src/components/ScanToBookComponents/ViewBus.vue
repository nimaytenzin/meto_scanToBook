<template >
  <div
    class="
      min-h-screen
      overflow-hidden
      flex flex-col
      items-center
      justify-center
    "
  >
    <div>
      <img src="../../assets/meto.png" alt="" width="50" />
    </div>

    <div>
      <h1 class="text-2xl text-gray-500 text-center">Your Bus Number</h1>
      <h1 class="text-2xl text-gray-500 text-center mt-3">ཤོག་འཟིན།</h1>
    </div>
    <div
      class="
        p-6
        mx-auto
        bg-white
        rounded-xl
        shadow-lg
        min-w-content
        mt-1
        items-center
        space-x-4
      "
    >
      <div class="flex flex-col max-w-full p-3 m-3 bg-white">
        <div class="flex flex-row justify-between p-3">
          <div>
            <h1 class="text-left text-sm text-gray-500">Meto Transport</h1>
            <h1 class="text-left text-sm text-gray-500">
              ༅༅ ། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།
            </h1>
          </div>

          <div>
            <img src="../../assets/meto.png" alt="" class="h-10" />
          </div>
        </div>

        <div class="text-center  mt-4 mb-2" v-if="bus">

            <p class="text-center text-gray-500">Your Bus Number: </p>
            <h2 class="text-gray-700 text-3xl">
            {{ bus.vechileNumber }}
            </h2>
        </div>
        <div v-else  class="text-center text-3xl mt-4 mb-2"> 
              <h2 class="text-gray-700" >
                  Bus Details not yet updated! 
              </h2>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
import { getBusByBookingId } from '../../services/routeServices';


export default {
  data() {
    return {
      bus:null
    };
  },
  created() {

    let bookingId = this.$route.params.id
    getBusByBookingId(bookingId).then(res =>{
      if(res.status === 200){
        this.bus = res.data.bus
      }
    }).catch(err =>{
      console.log(err)
    })
   
  },
 
  methods: {

  },
};

</script>