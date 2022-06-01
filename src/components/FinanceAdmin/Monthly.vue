<template>
  <div
    class="
      min-h-screen
      flex flex-col
      items-center
      justify-start
      sm:ml2 sm:mr2
      bg-white
    "
    id="report"
  >
    <button
      @click="saveImage"
      class="float-right p-1 bg-gray-400 text-gray-100 rounded"
    >
      Download Report
    </button>
    <h1
      class="text-3xl font-semibold text-center my-4 text-gray-700 border-b-2"
    >
      Statistics & Trends
    </h1>

    <div class="flex gap-6 h-96 overflow-y-scroll">
      <div class="mx-10 ">
        <p class="text-gray-700 font-bold">
          Top Routes (Number of tickets Sold)
        </p>
        <table class="w-full">
          <tr>
            <td>Route</td>
            <td>No</td>
          </tr>
          <tr
            v-for="route in topRoutes"
            :key="route"
            class="text-gray-700 border-b"
          >
            <td>
              {{ route.routeId}}
              <p>{{ route?.origin?.name }} - {{ route?.destination?.name }}</p>
              <p class="text-sm">({{ route?.route?.departureTime }})</p>
            </td>
            <td>
              <p class="text-green-700 mx-4 font-bold">
                {{ route?.ticketsSold }}
              </p>
            </td>
          </tr>
        </table>
      </div>

      <div class="mx-10">
        <p class="text-gray-700 font-bold">
          Top Staffs (Number of Tickets Sold)
        </p>

        <table class="w-full">
          <tr>
            <td>Route</td>
            <td>No</td>
          </tr>
          <tr
            v-for="staff in topStaffs"
            :key="staff"
            class="text-gray-700 border-b"
          >
            <td>
              <p>{{ staff.user ? staff.user.name : "Online Booking" }}</p>
            </td>
            <td>
              <p class="text-green-700 mx-4 my-1 font-bold">
                {{ staff?.ticketsSold }}
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="w-full">
      <h1
        class="text-2xl font-semibold text-center my-4 text-gray-700"
      >
        Revenue Chart
      </h1>
       <line-chart
        prefix="Nu "
        :discrete="true"
        loading="Fetching Data..."
        :data="data2"
        legend="bottom"
        :colors="['#302E80', '#C9F2C7', '#F5E3E0', '#66CED6']"
      ></line-chart>

      <h1
        class="text-2xl mt-6 font-semibold text-center my-4 text-gray-700"
      >
        Tickets Sold Chart
      </h1>
    

       <line-chart
        :discrete="false"
        loading="Fetching Data..."
        :data="data"
        legend="bottom"
         :colors="['#302E80', '#C9F2C7', '#F5E3E0', '#66CED6']"
      ></line-chart>
    </div>
  </div>
</template>

<script>
import {
  getLatestRevenueStats,
  getLatestTicketsStats,
  getTopMontlyRoutes,
  getTopStaffs,
} from "../../services/bookingStatsService";
import domtoimage from "dom-to-image";
import Route from "../Staff/bookTicket/Route.vue";

export default {
  components: { Route },
  created() {
    getLatestTicketsStats().then((res) => {
      this.data = res.data;
    });
    getLatestRevenueStats().then((res) => {
      this.data2 = res.data;
    });
    getTopMontlyRoutes().then((res) => {
      this.topRoutes = res.data;
    });
    getTopStaffs().then((res) => {
      this.topStaffs = res.data;
    });
  },
  data() {
    return {
      data: [],
      data2: [],
      topRoutes: [],
      topStaffs: [],
    };
  },
  methods: {
    saveImage() {
      const scale = 3;
      const node = document.getElementById("report");
      const style = {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
        width: node.offsetWidth + "px",
        height: node.offsetHeight + "px",
      };

      const param = {
        height: node.offsetHeight * scale,
        width: node.offsetWidth * scale,
        quality: 1,
        style,
      };

      domtoimage.toPng(node, param).then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `report.png`;
        link.href = dataUrl;
        link.click();
      });
    },
  },
};
</script>