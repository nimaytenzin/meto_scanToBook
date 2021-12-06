<template>
  <div
    class="min-h-screen flex flex-col items-center justify-start sm:ml2 sm:mr2"
  >
    <div class="flex w-full gap-6 flex-wrap justify-center">
      <div class="w-4/6 md:w-1/6 p-4 text-sm rounded-md shadow-lg">
        <div class="text-right">
          <p class="font-semibold text-3xl">Nu 16000</p>
          <span> Total Daily Revenue</span>
        </div>
        <div>
          <hr class="border-dashed my-2">
          <table class="w-full text-right">
            <tr>
              <td>Ebooking</td>
              <td>52%</td>
            </tr>
            <tr>
              <td>Counter Sale</td>
              <td>
                <table class="w-full text-right"> 
                  <tr>
                    <td>Mbob</td>
                    <td>43%</td>
                  </tr>
                  <tr>
                    <td>Cash</td>
                    <td>9%</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
        <!-- <pie-chart
          prefix="Nu "
          :colors="['#d7e0ff', '#ffb3bf', '#302E80']"
          :data="[
            ['online', 44],
            ['counter', 23],
          ]"
        ></pie-chart>

        <pie-chart
          prefix="Nu "
          :colors="['#d7e0ff', '#ffb3bf', '#302E80']"
          :data="[
            ['Ticket', 50],
            ['ServiceCharge', 12],
          ]"
        ></pie-chart> -->
      </div>

      <div class="w-4/6 md:w-1/6 p-4 text-sm rounded-md shadow-lg">
        <div class="text-right">
          <p class="font-semibold text-3xl">256</p>
          <span> Total Daily Bookings</span>
        </div>
        <div>
          <hr class="border-dashed my-2">
          <table class="w-full text-right">
            <tr>
              <td>Top Destinations</td>
              <td>
                <table>
                  <tr>
                    <td>Thimphu</td> <td>100</td>
                  </tr>
                  <tr>
                    <td>Punakha</td> <td>80</td>
                  </tr>
                  <tr>
                    <td>Bumthang</td> <td>40</td>
                  </tr>
                  <tr>
                    <td>Paro</td> <td>20</td>
                  </tr>
                </table>
              </td>
            </tr>
           
          </table>
        </div>
      </div>
      <div class="w-4/6 md:w-1/6 p-4 text-sm rounded-md shadow-lg">
        <div class="text-right">
          <p class="font-semibold text-3xl">45.6%</p>
          <span>Booking Rate</span>
        </div>
        <div class="text-right">
          <p class="font-semibold text-3xl">12</p>
          <span>Cancellations</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 w-full my-10">
      <div class="col-span-12 md:col-span-6">
        <p class="text-center font-thin text-xl">Weekly Ticket Sale(Nu)</p>
        <line-chart
          prefix="Nu "
          :discrete="true"
          loading="Fetching Data..."
          :data="data"
          legend="bottom"
          :colors="['#d7e0ff', '#ffb3bf', '#302E80']"
        ></line-chart>
      </div>
      <div class="col-span-12 md:col-span-6">
        <p class="text-center font-thin text-xl">Weekly Bookings</p>
        <line-chart
          :data="weekly_bookingUrl"
          legend="bottom"
          :colors="['#d7e0ff', '#ffb3bf', '#302E80']"
        ></line-chart>
      </div>
    </div>
    <div class="grid grid-cols-12 w-full my-10">
      <div class="col-span-12 md:col-span-6 mx-2">
        <p class="text-center font-thin text-xl">Weekly BookingRate (%)</p>
        <line-chart
          suffix=" %"
          :discrete="true"
          loading="Fetching Data..."
          :data="weekly_bookrateUrl"
          legend="bottom"
          :colors="['#d7e0ff', '#ffb3bf', '#302E80']"
        ></line-chart>
      </div>
      <div class="col-span-12 md:col-span-6 mx-2">
        <p class="text-center font-thin text-xl">Weekly Cancellations</p>
        <line-chart
          :data="weekly_cancellationUrl"
          legend="bottom"
          :colors="['#d7e0ff', '#ffb3bf', '#302E80']"
        ></line-chart>
      </div>
    </div>

    <div class="w-full"></div>
  </div>
</template>

<script>
import { getDailyStatistics } from "../../services/AnalyticsService";
const devUrl = process.env.VUE_APP_DEV_API;

export default {
  beforeCreate() {
    getDailyStatistics().then((res) => {
      res.data.forEach((row) => {
        this.chartData[0].data[row.date] = row.online_sale;
        this.chartData[1].data[row.date] = row.counter_sale;
        this.chartData[2].data[row.date] = row.total_sale;
      });
    });
  },
  data() {
    return {
      weekly_saleUrl: `${devUrl}/daily-statistics/weekly-sale`,
      weekly_bookingUrl: `${devUrl}/daily-statistics/weekly-bookings`,
      weekly_bookrateUrl: `${devUrl}/daily-statistics/weekly-bookrate`,
      weekly_cancellationUrl: `${devUrl}/daily-statistics/weekly-cancellations`,
      chartData: [
        {
          name: "Online Sale",
          data: {},
        },
        {
          name: "Counter Sale",
          data: {},
        },
        {
          name: "Total Sale",
          data: {},
        },
      ],
      data: [
        {
          name: "Ebooking",
          data: {
            "2017-01-01": 3,
            "2017-01-02": 4,
            "2017-01-03": 5,
            "2017-01-04": 2,
            "2017-01-05": 3,
            "2017-01-06": 4,
            "2017-01-07": 5,
          },
        },
        {
          name: "Mbob",
          data: {
            "2017-01-01": 5,
            "2017-01-02": 3,
            "2017-01-03": 6,
            "2017-01-04": 5,
            "2017-01-05": 6,
            "2017-01-06": 7,
            "2017-01-07": 9,
          },
        },
        {
          name: "Cash",
          data: {
            "2017-01-01": 8,
            "2017-01-02": 7,
            "2017-01-03": 11,
            "2017-01-04": 7,
            "2017-01-05": 9,
            "2017-01-06": 11,
            "2017-01-07": 14,
          },
        },
        {
          name: "Total",
          data: {
            "2017-01-01": 16,
            "2017-01-02": 14,
            "2017-01-03": 22,
            "2017-01-04": 14,
            "2017-01-05": 18,
            "2017-01-06": 22,
            "2017-01-07": 28,
          },
        },
      ],
      origins: [
        {
          dzo: "ཐིམ་ཕུ",
          eng: "Thimphu",
        },
        {
          dzo: "སྤ་རོ",
          eng: "Paro",
        },
      ],
      originSelected: {
        dzo: "ཐིམ་ཕུ",
        eng: "Thimphu",
      },
    };
  },
  methods: {
    addOrigin(val) {
      this.$store.commit("addOrigin", val);
      this.$router.push("/book/destination");
    },
  },
};
</script>