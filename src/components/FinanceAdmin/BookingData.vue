<template>
  <div class="min-h-screen flex flex-col p-4">
    <!-- <div
      class="
        bg-gray-300
        flex
        justify-between
        w-full
        text-gray-800 text-left
        p-4
        rounded
      "
    >
      <div>
        View for:
        <select v-model="year" class="text-xl p-3 border text-blue-900">
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
        <select v-model="month" class="text-xl p-3 border text-blue-900">
          <option value="January">January</option>
          <option value="Febrauray">Febrauray</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="Jan">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <button
          class="
            bg-gray-400
            px-5
            py-3
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            text-gray-100
            rounded
            hover:bg-gray-500
          "
        >
          Load Data
        </button>
      </div>

      <div>
        <button
          class="
            p-2
            pl-5
            pr-5
            bg-blue-500
            text-gray-100 text-lg
            rounded-lg
            focus:border-4
            border-blue-300
          "
        >
          Download Data
        </button>
      </div>
    </div>
   

    <div>
      <div>
        <div class="border">
          Filter by Origin
          <select
            v-model="originSelected"
            class="text-xl p-3 border text-blue-900"
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
          <button
            class="
              bg-gray-400
              px-5
              py-3
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              text-gray-100
              rounded
              hover:bg-gray-500
            "
          >
            Apply Filter
          </button>
        </div>

        <div class="border">
          Filter by Destination
          <select
            v-model="originSelected"
            class="text-xl p-3 border text-blue-900"
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
          <button
            class="
              bg-gray-400
              px-5
              py-3
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              text-gray-100
              rounded
              hover:bg-gray-500
            "
          >
            Apply Filter
          </button>
        </div>

        <div class="border">
          Filter by Route: Origin
          <select
            v-model="originSelected"
            class="text-xl p-3 border text-blue-900"
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

          Destination
          <select
            v-model="originSelected"
            class="text-xl p-3 border text-blue-900"
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
          <button
            class="
              bg-gray-400
              px-5
              py-3
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              text-gray-100
              rounded
              hover:bg-gray-500
            "
          >
            Apply Filter
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
              Booking ID
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
              Amount
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
              Booking Mode
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
              Payment Mode
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
              Booking Details
            </td>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr class="hover:bg-gray-200">
            <td class=" px-2 whitespace-nowrap">123</td>
            <td class=" px-2 whitespace-nowrap">Nu 255</td>
            <td class=" px-2 whitespace-nowrap">Online</td>
            <td class=" px-2 whitespace-nowrap">Online</td>
            <td class=" px-2 whitespace-nowrap">
              <div>
                Thimphu - Paro

              </div>
            </td>

            
            
          </tr>
        </tbody>
      </table>
    </div>
    <vue-excel-xlsx
      :data="data"
      :columns="columns"
      :filename="filename"
      :sheetname="'sheetname'"
    >
      Download
    </vue-excel-xlsx> -->
  </div>
</template>


<script>
import { getAllBusPaginated } from "../../services/busServices";
import { getAllStops } from "../../services/stopServices";

export default {
  data() {
    return {
      // buses: [],
      // selectedBus: {},
      // origins: [],
      // originSelected: {},
      // month: "December",
      // year: 2021,
      // columns: [
      //   {
      //     label: "Product",
      //     field: "product",
      //   },
      //   {
      //     label: "Price",
      //     field: "price",
      //     dataFormat: this.priceFormat,
      //   },
      //   {
      //     label: "Quantity",
      //     field: "quantity",
      //   },
      // ],
      // data: [
      //   {
      //     product: "Beverage",
      //     price: 10,
      //     quantity: 2,
      //   },
      //   {
      //     product: "Snack",
      //     price: 12,
      //     quantity: 6,
      //   },
      //   {
      //     product: "Beverage",
      //     price: 10,
      //     quantity: 5,
      //   },
      //   {
      //     product: "Snack",
      //     price: 12,
      //     quantity: 3,
      //   },
      // ],
      // filename:"nima"
    };
  },
  created() {
    // getAllBusPaginated(0).then((res) => {
    //   this.buses = res.data;
    // });
    // getAllStops().then((res) => {
    //   this.origins = res;
    //   this.originSelected = res[0];
    // });
  },
  methods: {
    // getBusData(pageNo) {
    //   getAllBusPaginated(pageNo).then((res) => {
    //     this.buses = res.data;
    //   });
    // },
    // priceFormat(value) {
    //   return "$ " + value;
    // },
  },
};
</script>
