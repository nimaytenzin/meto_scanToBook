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
                Nu {{ statsToday.TOTAL?.amount ? statsToday.TOTAL.amount : 0 }}
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

      <div class="grid grid-cols-2">
        <div class="m-2" id="staffwise data">
          <div class="my-2">
            <h1 class="text-xl font-bold text-gray-700">
              StaffWise Statistics
            </h1>
            <table class="table-auto w-full">
              <thead class="bg-gray-200 border-b">
                <tr>
                  <th
                    scope="col"
                    class="
                      text-sm
                      font-medium
                      text-gray-900
                      px-6
                      py-4
                      text-left
                    "
                  >
                    Staff
                  </th>
                  <th
                    scope="col"
                    class="
                      text-sm
                      font-medium
                      text-gray-900
                      px-6
                      py-4
                      text-left
                    "
                  >
                    Tickets Sold
                  </th>
                  <th
                    scope="col"
                    class="
                      text-sm
                      font-medium
                      text-gray-900
                      px-6
                      py-4
                      text-left
                    "
                  >
                    Total Revenue
                  </th>
                  <th
                    scope="col"
                    class="
                      text-sm
                      font-medium
                      text-gray-900
                      px-6
                      py-4
                      text-left
                    "
                  >
                    Journals for Mbob
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
                    mb-2
                    hover:bg-gray-100
                  "
                >
                  <td class="text-md text-gray-900 px-6 py-3 text-left">
                    {{
                      staffData.user?.name
                        ? staffData.user?.name
                        : "Online Booking"
                    }}
                  </td>
                  <td class="text-md text-gray-900 px-6 py-3 text-left">
                    <div class="text-md text-gray-900">
                      Total:
                      {{ staffData.ticketsSold ? staffData.ticketsSold : 0 }}
                      <br />
                      Cash:
                      {{ staffData.cashTickets ? staffData.cashTickets : 0 }}
                      <br />
                      Epayment:
                      {{ staffData.scanTickets ? staffData.scanTickets : 0 }}
                    </div>
                  </td>
                  <td class="text-md text-gray-900 px-6 py-3 text-left">
                    <div class="text-md text-gray-900">
                      Total: Nu
                      {{ staffData.amountSold ? staffData.amountSold : 0 }}
                      <br />
                      Cash: Nu
                      {{ staffData.cashAmount ? staffData.cashAmount : 0 }}
                      <br />
                      Epayment: Nu
                      {{ staffData.scanAmount ? staffData.scanAmount : 0 }}
                    </div>
                  </td>
                  <td class="text-md text-gray-900 px-6 py-3 text-left">
                    <table v-if="staffData.journals?.length">
                      <thead>
                        <tr>
                          <td>Jrn No</td>
                          <td>Bank</td>
                          <td>Contact</td>
                          <td>Amount</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="journal in staffData.journals"
                          :key="journal"
                        >
                          <td>{{ journal.depositJournal }}</td>
                          <td>{{ journal.depositBank }}</td>
                          <td>{{ journal.depositContact }}</td>
                          <td>Nu {{ journal.amount }}</td>
                        </tr>
                      </tbody>
                    </table>
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
                  <td class="text-md text-gray-900 px-6 py-4 text-left">
                    Total Revenue: Nu.
                    {{ statsToday.TOTAL?.amount ? statsToday.TOTAL.amount : 0 }}
                    <br />
                  </td>
                  <td
                    colspan="2"
                    class="text-md text-gray-900 px-6 py-4 text-left"
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
            <table class="table-auto w-full">
              <thead class="bg-gray-200 border-b">
                <tr>
                  <th
                    scope="col"
                    class="
                      text-sm
                      font-medium
                      text-gray-900
                      px-6
                      py-4
                      text-left
                    "
                  >
                    Route
                  </th>
                  <th
                    scope="col"
                    class="
                      text-sm
                      font-medium
                      text-gray-900
                      px-6
                      py-4
                      text-left
                    "
                  >
                    Tickets Sold
                  </th>
                  <th
                    scope="col"
                    class="
                      text-sm
                      font-medium
                      text-gray-900
                      px-6
                      py-4
                      text-left
                    "
                  >
                    Total Revenue
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
                    mb-2
                    hover:bg-gray-100
                  "
                >
                  <td class="text-md text-gray-900 px-6 py-3 text-left">
                    {{ routeData.origin?.name }} -
                    {{ routeData.destination?.name }}
                    <br />
                    {{ routeData.route?.departureTime }}
                  </td>

                  <td class="text-md text-gray-900 px-6 py-3 text-left">
                    <div>
                      Total:
                      {{ routeData.ticketsSold ? routeData.ticketsSold : 0 }}
                      <br />
                      Cash:
                      {{ routeData.cashTickets ? routeData.cashTickets : 0 }}
                      <br />
                      Epayment:
                      {{ routeData.scanTickets ? routeData.scanTickets : 0 }}
                    </div>
                  </td>
                  <td class="text-md text-gray-900 px-6 py-3 text-left">
                    <div>
                      Total: Nu
                      {{ routeData.amountSold ? routeData.amountSold : 0 }}
                      <br />
                      Cash:Nu
                      {{ routeData.cashAmount ? routeData.cashAmount : 0 }}
                      <br />
                      Epayment:Nu
                      {{ routeData.scanAmount ? routeData.scanAmount : 0 }}
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
                  <td class="text-md text-gray-900 px-6 py-4 text-left">
                    Total Revenue: Nu.
                    {{ statsToday.TOTAL?.amount ? statsToday.TOTAL.amount : 0 }}
                    <br />
                  </td>
                  <td
                    colspan="2"
                    class="text-md text-gray-900 px-6 py-4 text-left"
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
  getJournalDetailsbyStaff,
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
      res.data.forEach((staff) => {
        let data = staff;
        getJournalDetailsbyStaff(staff.operatorId).then((res) => {
          data.journals = res.data;
        });
        this.staffStats.push(data);
      });
    });
    getRouteStatsToday().then((res) => {
      this.routeStats = res.data;
    });
    getStatsByModalityToday().then((res) => {
      let ticketsSold = 0;
      let amount = 0;
      res.data.forEach((data) => {
        console.log(data)
        ticketsSold += parseInt(data.ticketsSold);
        amount += parseInt(data.amount);
        this.statsToday[data.modality] = data;
      });
      console.log(ticketsSold, amount)
      this.statsToday["TOTAL"] = { ticketsSold: ticketsSold, amount: amount };
      console.log(this.statsToday)
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
