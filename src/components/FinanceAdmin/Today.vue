<template>
  <div class="min-h-screen flex flex-col p-4 bg-white">
   
    <div id="report" class="bg-white">
     

      <div
        class="
          bg-white
          border-t border-dotted
          flex
          items-center
          justify-center
          gap-6
          w-full
          mb-10
        "
      >
        <div
          class="
            flex
            justify-center
            items-center
            bg-gray-800
            text-gray-300
            rounded-tl-md rounded-br-md
          "
          style="height: 200px; width: 250px"
        >
          <div class="text-sm rounded-md shadow-lg">
            <div class="text-right">
              <p class="font-semibold text-3xl">
                Nu
                {{
                  statsToday.TOTAL?.amount
                    ? statsToday.TOTAL.amount.toFixed(1)
                    : 0
                }}
              </p>
              <span> Total Sale</span>
            </div>
            <div>
              <hr class="border-dashed my-2" />
              <table class="w-full text-right">
                <tr>
                  <td>Online</td>
                  <td>
                    Nu
                    {{
                      statsToday.ONLINE?.amount ? statsToday.ONLINE.amount : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Counter</td>
                  <td>
                    Nu
                    {{ statsToday.MBOB?.amount ? statsToday.MBOB.amount : 0 + statsToday.CASH?.amount ? statsToday.CASH.amount : 0  }}
                  </td>
                </tr>
               
              </table>
            </div>
          </div>
        </div>

        <div
          class="
            flex
            justify-center
            items-center
            bg-gray-800
            text-gray-300
            p-1
            rounded-tl-md rounded-br-md
          "
          style="height: 200px; width: 250px"
        >
          <div class="text-sm rounded-md shadow-lg p-1">
            <div class="text-right">
              <p class="font-semibold text-3xl">
                {{
                  statsToday.TOTAL?.ticketsSold
                    ? statsToday.TOTAL.ticketsSold
                    : 0
                }}
              </p>
              <span> Tickets Sold</span>
            </div>
            <div>
              <hr class="border-dashed my-2" />
              <table class="w-full text-right">
                <tr>
                  <td>Online</td>
                  <td>
                    {{
                      statsToday.ONLINE?.ticketsSold
                        ? statsToday.ONLINE.ticketsSold
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Counter </td>
                  <td>
                    {{
                      statsToday.CASH?.ticketsSold
                        ? statsToday.CASH.ticketsSold
                        : 0 + statsToday.MBOB?.ticketsSold
                        ? statsToday.MBOB.ticketsSold
                        : 0
                    }}
                  </td>
                </tr>
                
              </table>
            </div>
          </div>
        </div>
      </div>
 
  <div class="w-full gap-4 py-2 flex justify-between">
    <div class="w-1/2 bg-gray-50 p-4 rounded">
        <h1
        class="text-xl font-semibold text-center my-4 text-gray-700"
      >
        Revenue Chart
      </h1>
       <line-chart
        :prefix="Nu"
        :discrete="false"
        loading="Fetching Data..."
        :data="data2"
        legend="bottom"
        :colors="['#302E80', '#C9F2C7', '#F5E3E0']"
      ></line-chart>

    </div>
    <div class="w-1/2 bg-gray-50 p-4 rounded">
        <h1
        class="text-xl font-semibold text-center my-4 text-gray-700"
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

      <!-- <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="m-2" id="staffwise data">
          <div class="my-2">
            <h1 class="text-xl font-bold text-gray-700">
              StaffWise Statistics
            </h1>
            <table class="table-auto w-full text-sm">
              <thead class="bg-gray-200 border-b">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-3 text-left"
                  >
                    Staff
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-3 text-left py-2"
                  >
                    Tickets Sold
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-3 text-left"
                  >
                    Amount Sold
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="staffData in staffStats"
                  :key="staffData"
                  class="
                    bg-white
                    border-b
                    transition
                    duration-300
                    ease-in-out
                    hover:bg-gray-100
                  "
                >
                  <td class="text-gray-900 px-3 text-left" v-if="staffData.ticketsSold">
                    {{
                      staffData.user?.name ? staffData.user?.name : "Online "
                    }}
                  </td>
                  <td class="text-gray-900 px-3 text-left py-2" v-if="staffData.ticketsSold">
                  
                    <div >
                     {{
                        staffData.ticketsSold ? staffData.ticketsSold : 0 
                      }}
                     
                    </div>
                  
                  </td>
                  <td class="text-gray-900 px-3 text-left" v-if="staffData.ticketsSold">
                    <div>

                       Nu.{{ staffData.amountSold ? staffData.amountSold : 0  }}
                    </div>
                  </td>
                </tr>
                <tr
                  class="
                    bg-white
                    border-b
                    transition
                    duration-300
                    ease-in-out
                    hover:bg-gray-100
                  "
                >
                  <td
                    class="text-md text-gray-900 font-semibold px-3 text-left"
                  >
                    Total Revenue: Nu.
                    {{ statsToday.TOTAL?.amount ? statsToday.TOTAL.amount : 0 }}
                    <br />
                  </td>
                  <td
                    colspan="2"
                    class="text-md text-gray-900 font-semibold px-3 text-left"
                  >
                    Total Tickets Sold:
                    {{
                      statsToday.TOTAL?.ticketsSold
                        ? statsToday.TOTAL.ticketsSold
                        : 0
                    }}
                    <br />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="m-2" id="routewise data">
          <h1 class="text-xl font-bold text-gray-700">RouteWise Statistics</h1>
          <div>
            <table class="table-auto w-full text-sm">
              <thead class="bg-gray-200 border-b">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-3 text-left"
                  >
                    Route
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-3 text-left"
                  >
                    Tickets Sold
                  </th>

                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-3 text-left"
                  >
                    Amounts Sold
                  </th>
              
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="routeData in routeStats"
                  :key="routeData"
                  class="
                    bg-white
                    border-b
                    transition
                    duration-300
                    ease-in-out
                    hover:bg-gray-100
                  "
                >
                  <td class="text-gray-900 px-3 text-left my-2" v-if="routeData.ticketsSold">
                    {{ routeData.origin?.name }} -
                    {{ routeData.destination?.name }}
                    <br />
                    {{ routeData.route?.departureTime }}
                  </td>

                  <td class="text-gray-900 px-3 text-left my-2" v-if="routeData.ticketsSold">
                    <div>
                      {{
                        routeData.ticketsSold ? routeData.ticketsSold : 0 
                      }}
                    </div>
                  </td>
                  <td class="text-gray-900 px-3 text-left my-2" v-if="routeData.ticketsSold">
                    <div >
                      Nu.
                      {{routeData.amountSold ? routeData.amountSold : 0  }}
                    </div>
                   
                  </td>
                 

                </tr>
                <tr
                  class="
                    bg-white
                    border-b
                    transition
                    duration-300
                    ease-in-out
                    hover:bg-gray-100
                  "
                >
                  <td
                    class="
                      text-md text-gray-900
                      font-semibold
                      px-3
                      my-2
                      text-left
                    "
                  >
                    Total Revenue: Nu.
                    {{ statsToday.TOTAL?.amount ? statsToday.TOTAL.amount : 0 }}
                    <br />
                  </td>
                  <td
                    colspan="2"
                    class="
                      text-md text-gray-900
                      font-semibold
                      px-3
                      my-2
                      text-left
                    "
                  >
                    Total Tickets Sold:
                    {{
                      statsToday.TOTAL?.ticketsSold
                        ? statsToday.TOTAL.ticketsSold
                        : 0
                    }}
                    <br />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import {
  getStaffStatsToday,
  getRouteStatsToday,
  getStatsByModalityToday,
  getLatestTicketsStats,
  getLatestRevenueStats,
} from "../../services/bookingStatsService";

import domtoimage from "dom-to-image";

export default {
  data() {
    return {
      staffStats: [],
      routeStats: [],
      statsToday: {},
      data:[],
      data2:[]
    };
  },
  created() {
    getLatestTicketsStats().then((res) => {
      this.data = res.data;
    });
    getLatestRevenueStats().then((res) => {
      this.data2 = res.data;
      console.log(res.data)
    });
    getStaffStatsToday().then((res) => {
      console.log("STAFF STATS", res.data);
      this.staffStats = res.data;
    });
    getRouteStatsToday().then((res) => {
      this.routeStats = res.data;
      console.log("Route STats", this.routeStats);
    });
    getStatsByModalityToday().then((res) => {
      let ticketsSold = 0;
      let amount = 0;
      res.data.forEach((data) => {
        console.log(data);
        ticketsSold += Number(data.ticketsSold);
        amount += Number(data.amount);
        this.statsToday[data.modality] = data;
      });
      console.log(ticketsSold, amount);
      this.statsToday["TOTAL"] = { ticketsSold: ticketsSold, amount: amount };
      console.log("STATS TODAY", this.statsToday);
    });
  },
  computed: {
    today() {
      let d = new Date();
      return d.toDateString();
    },
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

      var filename = this.today.split(" ").join("");

      domtoimage.toPng(node, param).then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `report_${filename}.png`;
        link.href = dataUrl;
        link.click();
      });
    },
  },
};
</script>
