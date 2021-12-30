<template>
  <div
    class="min-h-screen flex flex-col items-center justify-start sm:ml2 sm:mr2 bg-white"
     id="report"
  >
   <button
        @click="saveImage"
        class="float-right p-1 bg-gray-400 text-gray-100 rounded"
      >
        Download Report
      </button>
    <h1 class="text-3xl font-semibold text-center my-4 text-gray-700 border-b-2">
      Statistics & Trends
    </h1>

    <div class="flex gap-6"> 
      <div class="mx-10">
        Top Routes
        <p v-for="route in topRoutes" :key="route"> {{ route.origin.name }} - {{ route.destination.name }} | {{ route.route.departureTime }} => tickets Sold {{ route.ticketsSold }} </p>
      </div>

      <div class="mx-10">
        Top Staffs
        <p v-for="staff in topStaffs" :key="staff"> {{ staff.user? staff.user.name : "Online Booking" }}  => tickets Sold {{ staff.ticketsSold }} </p>
      </div>


    </div>
    

    <div class="w-full">
      <line-chart
        prefix="Nu "
        :discrete="false"
        loading="Fetching Data..."
        :data="data"
        legend="bottom"
        :colors="['#d7e0ff', '#ffb3bf', '#302E80']"
      ></line-chart>
      <line-chart
        prefix="Nu "
        :discrete="true"
        loading="Fetching Data..."
        :data="data2"
        legend="bottom"
        :colors="['#302E80', '#CE8A33', '#E74A61']"
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


export default {

  created() {
    getLatestTicketsStats().then((res) => {
      this.data = res.data;
    });
    getLatestRevenueStats().then((res) => {
      this.data2 = res.data;
    });
    getTopMontlyRoutes().then(res =>{
      this.topRoutes = res.data
    })
    getTopStaffs().then(res =>{
      this.topStaffs= res.data
    })
  },
  data() {
    return {
      data: [],
      data2: [],
      topRoutes:[],
      topStaffs:[]
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