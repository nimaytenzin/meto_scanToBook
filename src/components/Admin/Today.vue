<template>
  <div class="min-h-screen flex flex-col p-4 bg-white">
    <div>
      <button
        @click="saveImage"
        class="float-right p-1 bg-gray-400 text-gray-100 rounded"
      >
        Download Report
      </button>
    </div>
    <div id="report" class="bg-white">
      <h1 class="text-2xl font-semibold text-center my-3 text-gray-700">
        Kuzu Zangpo ! Here's your Statistics for today | {{ today }}
      </h1>

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
                  <td>Counter | Mbob</td>
                  <td>
                    Nu
                    {{ statsToday.MBOB?.amount ? statsToday.MBOB.amount : 0 }}
                  </td>
                </tr>
                <tr>
                  <td>Counter | Cash</td>
                  <td>
                    Nu
                    {{ statsToday.CASH?.amount ? statsToday.CASH.amount : 0 }}
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
                  <td>Counter | Cash</td>
                  <td>
                    {{
                      statsToday.CASH?.ticketsSold
                        ? statsToday.CASH.ticketsSold
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Counter | Mbob</td>
                  <td>
                    {{
                      statsToday.MBOB?.ticketsSold
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

      <div class="grid grid-cols-1 md:grid-cols-2">
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
                    Counter Cash
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-3 text-left"
                  >
                    Counter Epayment
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
                  <td class="text-gray-900 px-3 text-left">
                    {{
                      staffData.user?.name ? staffData.user?.name : "Online "
                    }}
                  </td>
                  <td class="text-gray-900 px-3 text-left py-2">
                    <div v-if="staffData.cashTickets">
                      Bookings:{{
                        staffData.cashTickets ? staffData.cashTickets : 0
                      }}
                      <br />
                      Amount: Nu.
                      {{ staffData.cashAmount ? staffData.cashAmount : 0 }}
                    </div>
                    <div v-else>

                    </div>
                  </td>
                  <td class="text-gray-900 px-3 text-left">
                    <div>
                      Bookings:{{
                        staffData.scanTickets ? staffData.scanTickets : 0
                      }}
                      <br />
                      Amount: Nu.
                      {{ staffData.scanAmount ? staffData.scanAmount : 0 }}
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
                    Total
                  </th>

                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-3 text-left"
                  >
                    Online
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-3 text-left"
                  >
                    Counter Cash
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-3 text-left"
                  >
                    Counter Epayment
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
                  <td class="text-gray-900 px-3 text-left my-2">
                    {{ routeData.origin?.name }} -
                    {{ routeData.destination?.name }}
                    <br />
                    {{ routeData.route?.departureTime }}
                  </td>

                  <td class="text-gray-900 px-3 text-left my-2">
                    <div>
                      Bookings:
                      {{
                        routeData.ticketsSold ? routeData.ticketsSold : 0
                      }}
                      <br />
                      Amount:
                      {{ routeData.amountSold ? routeData.amountSold : 0 }}
                    </div>
                  </td>
                  <td class="text-gray-900 px-3 text-left my-2">
                    <div v-if="routeData.onlineTickets">
                      Bookings:
                      {{
                        routeData.onlineTickets ? routeData.onlineTickets : 0
                      }}
                      <br />
                      Amount:
                      {{ routeData.onlineAmount ? routeData.onlineAmount : 0 }}
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                  <td class="text-gray-900 px-3 text-left py-2">
                    <div v-if="routeData.cashTickets">
                      Bookings:{{
                        routeData.cashTickets ? routeData.cashTickets : 0
                      }}
                      <br />
                      Amount: Nu.
                      {{ routeData.cashAmount ? routeData.cashAmount : 0 }}
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                  <td class="text-gray-900 px-3 text-left my-2">
                    <div v-if="routeData.scanTickets">
                      Bookings:{{
                        routeData.scanTickets ? routeData.scanTickets : 0
                      }}
                      <br />
                      Amount: Nu.
                      {{ routeData.scanAmount ? routeData.scanAmount : 0 }}
                    </div>
                    <div v-else>
                      -
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
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStaffStatsToday,
  getRouteStatsToday,
  getStatsByModalityToday,
} from "../../services/bookingStatsService";

import domtoimage from "dom-to-image";

export default {
  data() {
    return {
      staffStats: [],
      routeStats: [],
      statsToday: {},
    };
  },
  created() {
    getStaffStatsToday().then((res) => {
      console.log("STAFF STATS", res.data);
      this.staffStats = res.data;
    });
    getRouteStatsToday().then((res) => {
      this.routeStats = res.data;
      console.log(this.routeStats);
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
