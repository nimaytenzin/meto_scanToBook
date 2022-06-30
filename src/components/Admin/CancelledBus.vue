<template>
  <div class="min-h-screen flex flex-col p-4">
    <h2 class="bg-gray-300 w-full text-gray-800 text-left p-4 rounded">
      Cancelled Bus
    </h2>

    <div class="flex flex-col gap-2">

      <div v-for="cancelledBus in paginatedCancelledData.data " :key="cancelledBus" class="px-4 py-1 border text-sm">

        <p class="text-xl font-semibold">
          {{ cancelledBus.route?.routepath?.origin?.name }} - {{ cancelledBus.route?.routepath?.destination?.name }}
        </p>
        <p>
          Date: {{ getDateString(cancelledBus.date) }}
        </p>
        <p>
          Departure Time : {{ cancelledBus.route?.departureTime }}
        </p>
        <p>
          Fare : Nu. {{ cancelledBus.route?.fare }}
        </p>
        <!-- <button class="text-md px-2 py-1 bg-metoPrimary-900 text-gray-100 rounded my-2 text-xs" >
          Reopen Bus
        </button> -->


      </div>
       <div class="bg-white border-t flex items-end justify-center gap-6 w-full">
        <span class="text-xs xs:text-sm text-gray-900">
          Showing {{ paginatedCancelledData.limit }} entries| Page {{ paginatedCancelledData.currentPage + 1 }} of
          {{ paginatedCancelledData.lastPage + 1 }}
        </span>
        
        <div class="inline-flex mt-2 xs:mt-0">
          <button
            class="
              text-sm
              bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-semibold
              py-2
              px-4
              rounded-l
            "
            @click="getCancelledRouteData(paginatedCancelledData.firstPage)"
          >
            First
          </button>
          <button
            class="text-sm text-gray-800 font-semibold py-2 px-4"
            :class="
              paginatedCancelledData.previousPage === null
                ? 'bg-gray-100 hover:bg-gray-100 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            "
            @click="getCancelledRouteData(paginatedCancelledData.previousPage)"
          >
            Prev
          </button>
          <button
            class="text-sm text-gray-800 font-semibold py-2 px-4"
            :class="
              paginatedCancelledData.nextPage === null
                ? 'bg-gray-100 hover:bg-gray-100 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            "
            @click="getCancelledRouteData(paginatedCancelledData.nextPage)"
          >
            Next
          </button>
          <button
            class="
              text-sm
              bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-semibold
              py-2
              px-4
              rounded-r
            "
            @click="getCancelledRouteData(paginatedCancelledData.lastPage)"
          >
            Last
          </button>
        </div>
      </div>
    </div>


  </div>
</template>


<script>
import { getAllCancelledBus } from '../../services/cancelBusService';




export default {
  data() {
    return {
      paginatedCancelledData: {
        data: [],
        previousPage:null,
        nextPage:null,
        firstPage:null,
        lastPage:null,
        limit:null,
        count:0
      }
    };
  },
  created() {
    getAllCancelledBus(0).then(res => {
      this.paginatedCancelledData = res.data;
      console.log(res.data)
    })
  },

  methods: {
    getDateString(date) {
      return new Date(date).toDateString()
    },
    getCancelledRouteData(pageno){
      getAllCancelledBus(pageno).then(res => {
      this.paginatedCancelledData = res.data;
    }) 
    }
  }
};
</script>