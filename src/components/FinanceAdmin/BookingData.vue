<template>
  <div class="min-h-screen flex flex-col p-4">
    <h2 class="bg-gray-300 w-full text-gray-800 text-left p-4 rounded">
      Montly Booking Data
    </h2>

    <div>
      <div class="bg-white border-t flex items-end justify-center gap-6 w-full">
        <span class="text-xs xs:text-sm text-gray-900">
          Showing {{ buses.limit }} entries| Page {{ buses.currentPage + 1 }} of
          {{ buses.lastPage + 1 }}
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
            @click="getBusData(buses.firstPage)"
          >
            First
          </button>
          <button
            class="text-sm text-gray-800 font-semibold py-2 px-4"
            :class="
              buses.previousPage === null
                ? 'bg-gray-100 hover:bg-gray-100 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            "
            @click="getBusData(buses.previousPage)"
          >
            Prev
          </button>
          <button
            class="text-sm text-gray-800 font-semibold py-2 px-4"
            :class="
              buses.nextPage === null
                ? 'bg-gray-100 hover:bg-gray-100 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            "
            @click="getBusData(buses.nextPage)"
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
            @click="getBusData(buses.lastPage)"
          >
            Last
          </button>
        </div>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <td
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              Bus Number
            </td>
            <td
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              Bus Model
            </td>
            <td
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              Class Type
            </td>
            <td
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              Edit
            </td>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="bus in buses.data" :key="bus" class="hover:bg-gray-200">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ bus.vechileNumber }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ bus.busType?.make ? bus.busType.make : "-" }}
              {{ bus.busType?.model ? bus.busType.model : "-" }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ bus.busType?.type ? bus.busType.type : "" }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap flex gap-4">
              <button @click="showEditBusDialog(bus)" class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </button>

              <button class="flex items-center" @click="deleteBus(bus)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import {
  getAllBusPaginated,
} from "../../services/busServices";

export default {
  data() {
    return {
      buses: [],
      selectedBus: {}
    };
  },
  created() {
    getAllBusPaginated(0).then((res) => {
      console.log("Sfsafsdfdsfdsf", res);
      this.buses = res.data;
    });
  },
  methods: {
    getBusData(pageNo) {
      getAllBusPaginated(pageNo).then((res) => {
        this.buses = res.data;
      });
    }
  },
};
</script>