<template>
  <div class="min-h-screen flex flex-col p-4">
    <h1 class="text-2xl font-semibold text-center my-3 text-gray-700">
      Kuzu Zangpo ! Here's your Statistics for todays
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
              Nu {{ statsToday.TOTAL?.amount? statsToday.TOTAL.amount :0  }}
            </p>
            <span> Total Sale</span>
          </div>
          <div>
            <hr class="border-dashed my-2" />
            <table class="w-full text-right">
              <tr>
                <td>Online</td>
                <td>
                  Nu {{ statsToday.ONLINE?.amount?statsToday.ONLINE.amount :0 }}
                </td>
              </tr>
              <tr>
                <td>Counter | Mbob</td>
                <td>
                  Nu {{ statsToday.MBOB?.amount? statsToday.MBOB.amount : 0 }}
                </td>
              </tr>
              <tr>
                <td>Counter | Cash</td>
                <td>
                  Nu {{ statsToday.CASH?.amount? statsToday.CASH.amount : 0 }}
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
             {{ statsToday.TOTAL?.ticketsSold? statsToday.TOTAL.ticketsSold:0 }}
            </p>
            <span> Tickets Sold</span>
          </div>
          <div>
            <hr class="border-dashed my-2" />
            <table class="w-full text-right">
              <tr>
                <td>Online</td>
                <td>
                 {{ statsToday.ONLINE?.ticketsSold ? statsToday.ONLINE.ticketsSold: 0 }}
                </td>
              </tr>
              <tr>
                <td>Counter | Cash</td>
                <td>
                 {{ statsToday.CASH?.ticketsSold ? statsToday.CASH.ticketsSold : 0 }}
                </td>
              </tr>
              <tr>
                <td>Counter | Mbob</td>
                <td>
                  {{ statsToday.MBOB?.ticketsSold ? statsToday.MBOB.ticketsSold : 0 }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2">
      <div class="m-2" id="staffwise data">
        Staff Wise Data
        <div v-for="staffData in staffStats" :key="staffData">
          <div v-if="!staffData.operatorId" class="my-2">
            <h1 class="text-md text-gray-700">Online Bookings</h1>
            <table class="table-auto">
              <tr>
                <td>Tickets Sold</td>
                <td>{{ staffData.ticketsSold ? staffData.ticketsSold : 0 }}</td>
              </tr>
              <tr>
                <td>Cash Payments</td>
                <td>{{ staffData.cashTickets ? staffData.cashTickets : 0 }}</td>
              </tr>
              <tr>
                <td>E Payments</td>
                <td>{{ staffData.scanTickets ? staffData.scanTickets : 0 }}</td>
              </tr>
            </table>
            <p>Revenue Generated</p>
            <table>
              <tr>
                <td>Total Amount</td>
                <td>{{ staffData.amountSold ? staffData.amountSold : 0 }}</td>
              </tr>
              <tr>
                <td>Cash</td>
                <td>{{ staffData.cashAmount ? staffData.cashAmount : 0 }}</td>
              </tr>
              <tr>
                <td>E Payments</td>
                <td>{{ staffData.scanAmount ? staffData.scanAmount : 0 }}</td>
              </tr>
            </table>
          </div>

          <div v-else class="my-2">
            Staff: {{ staffData.user?.name }}
            <br />
            <p>
              Total Bookings
              {{ staffData.totalBookings ? staffData.totalBookings : 0 }}
            </p>
            <hr />
            <p>
              Total Tickets Sold
              {{ staffData.ticketsSold ? staffData.ticketsSold : 0 }}
            </p>
            <p>
              Total Tickets Sold via Cash
              {{ staffData.cashTickets ? staffData.cashTickets : 0 }}
            </p>
            <p>
              Total Tickets Sold via Epayment
              {{ staffData.scanTickets ? staffData.scanTickets : 0 }}
            </p>
            <hr />

            <p>
              Total Amount Nu
              {{ staffData.amountSold ? staffData.amountSold : 0 }}
            </p>
            <p>
              Total Amount via Cash Nu
              {{ staffData.cashAmount ? staffData.cashAmount : 0 }}
            </p>
            <p>
              Total Amount via Epaymnet Nu
              {{ staffData.scanAmount ? staffData.scanAmount : 0 }}
            </p>
          </div>
        </div>
      </div>
      <div class="m-2" id="routewise data">
        Route Wise Bokings

        <div>
          <div v-for="routeData in routeStats" :key="routeData">
            {{ routeData.origin?.name }} - {{ routeData.destination?.name }}
            {{ routeData.route?.departureTime }}
            <br />
            {{ routeData.route.id }}
            <table class="table-auto">
              <tr>
                <td>Tickets Sold</td>
                <td>{{ routeData.ticketsSold ? routeData.ticketsSold : 0 }}</td>
              </tr>
              <tr>
                <td>Cash Payments</td>
                <td>{{ routeData.cashTickets ? routeData.cashTickets : 0 }}</td>
              </tr>
              <tr>
                <td>E Payments</td>
                <td>{{ routeData.scanTickets ? routeData.scanTickets : 0 }}</td>
              </tr>
            </table>

            <p>Revenue Generated</p>
            <table>
              <tr>
                <td>Total Amount</td>
                <td>{{ routeData.amountSold ? routeData.amountSold : 0 }}</td>
              </tr>
              <tr>
                <td>Cash</td>
                <td>{{ routeData.cashAmount ? routeData.cashAmount : 0 }}</td>
              </tr>
              <tr>
                <td>E Payments</td>
                <td>{{ routeData.scanAmount ? routeData.scanAmount : 0 }}</td>
              </tr>
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

export default {
  data() {
    return {
      staffStats: [],
      routeStats: [],
      statsToday:{}
    };
  },
  created() {
    getStaffStatsToday().then((res) => {
      this.staffStats = res.data;
    });
    getRouteStatsToday().then((res) => {
      this.routeStats = res.data;
    });
    getStatsByModalityToday().then((res) => {
      let ticketsSold = 0;
      let amount = 0;
      res.data.forEach(data => {
        ticketsSold += parseInt(data.ticketsSold);
        amount += parseInt(data.amount);

        this.statsToday[data.modality] = data
      });
      this.statsToday["TOTAL"] = {ticketsSold:ticketsSold, amount:amount}
      console.log(this.statsToday)
    });
   
  },
  methods: {},
};
</script>
