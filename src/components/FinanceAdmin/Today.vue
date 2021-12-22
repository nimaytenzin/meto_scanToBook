<template>
  <div class="min-h-screen flex flex-col p-4">
    <h1 class="text-2xl font-semibold text-center my-3 text-gray-700">
      Kuzu Zangpo ! Here's your Statistics for todays
    </h1>
    <div
      class="
        bg-white
        border-t border-dotted
        pt-2
        flex
        items-start
        justify-center
        gap-6
        w-full
        mb-10
      "
    >
      <div class="bg-gray-800 text-gray-300 p-2 myrounded h-full">
        <div class="p-4 text-sm rounded-md shadow-lg">
          <div class="text-right">
            <p class="font-semibold text-3xl">
              Nu
              <number
                :from="0"
                :to="5"
                :format="theFormat"
                :duration="2"
                :delay="1"
                easing="Power1.easeOut"
              />
            </p>
            <span> Total Revenue</span>
          </div>
          <div>
            <hr class="border-dashed my-2" />
            <table class="w-full text-right">
              <tr>
                <td>Online staffData</td>
                <td>
                  Nu
                  <number
                    :from="0"
                    :to="3"
                    :format="theFormat"
                    :duration="2"
                    :delay="1"
                    easing="Power1.easeOut"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <hr class="w-full border-dashed border-gray-400" />
                </td>
                <td>
                  <hr class="w-full border-dashed border-gray-400" />
                </td>
              </tr>
              <tr>
                <td>Counter staffData</td>
                <td>
                  <table class="w-full text-right">
                    <tr>
                      <td>Mbob</td>
                      <td>
                        Nu
                        <number
                          :from="0"
                          :to="2"
                          :format="theFormat"
                          :duration="2"
                          :delay="1"
                          easing="Power1.easeOut"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Cash</td>
                      <td>
                        Nu
                        <number
                          :from="0"
                          :to="2"
                          :format="theFormat"
                          :duration="2"
                          :delay="1"
                          easing="Power1.easeOut"
                        />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

     

      <div class="bg-gray-800 text-gray-300 p-2 rounded h-full">
        <div class="p-4 text-sm rounded-md shadow-lg">
          <div class="text-right">
            <p class="font-semibold text-3xl"></p>
            <span>staffDatas</span>
          </div>
          <div>
            <hr class="border-dashed my-2" />
            <table class="w-full text-right">
              <tr>
                <td>Online staffData</td>
                <td></td>
              </tr>
              <tr>
                <td>Counter staffData</td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>


     <div >
        <table>
          <tr>
            <td>Modality</td>
            <td>Tickets Sold</td>
            <td>Revenue</td>
          </tr>
          <tr v-for="data in statsToday" :key="data">
            <td>
              {{ data.modality }}
            </td>
             <td>
              {{ data.ticketsSold? data.ticketsSold :0 }}
            </td>
             <td>
              Nu {{ data.amount?data.amount:0 }}
            </td>
          </tr>
        </table>
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
                <td > {{ staffData.ticketsSold ? staffData.ticketsSold : 0 }}</td>
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
                <td>Cash </td>
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
      <div class="m-2" id="routewise data">Route Wise Bokings

       <div>
          <div v-for="routeData in routeStats" :key="routeData">
          {{ routeData.origin?.name }} - {{ routeData.destination?.name }}
          {{ routeData.route?.departureTime }}
          <br>
          {{ routeData.route.id }}
            <table class="table-auto">
              <tr>
                <td>Tickets Sold</td>
                <td > {{ routeData.ticketsSold ? routeData.ticketsSold : 0 }}</td>
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
                <td>Cash </td>
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
import { getStaffStatsToday,getRouteStatsToday,getStatsByModalityToday } from "../../services/bookingStatsService";

export default {
  data() {
    return {
      staffStats: [],
      routeStats:[],
      statsToday:[]
    };
  },
  created() {
    getStaffStatsToday().then((res) => {
      this.staffStats = res.data;
    });
    getRouteStatsToday().then(res =>{
      this.routeStats = res.data
    })
    getStatsByModalityToday().then(res =>{
      this.statsToday = res.data
    })
  },
  methods: {},
};
</script>
