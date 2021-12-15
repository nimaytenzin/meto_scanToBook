<template>
  <div
    class="min-h-screen flex flex-col items-center justify-start sm:ml2 sm:mr2"
  >
    <h1 class="text-3xl font-semibold text-center my-4 text-gray-700">  Statistics for December 2021 </h1>

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
                :to="12550"
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
                <td>Online Booking</td>
                <td>
                  Nu
                  <number
                    :from="0"
                    :to="7450"
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
                <td>Counter Booking</td>
                <td>
                  <table class="w-full text-right">
                    <tr>
                      <td>Mbob</td>
                      <td>
                        Nu
                        <number
                          :from="0"
                          :to="4500"
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
                          :to="3000"
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
            <p class="font-semibold text-3xl">
              <number
                :from="0"
                :to="40"
                :format="theFormat"
                :duration="2"
                :delay="1"
                easing="Power1.easeOut"
              />
            </p>
            <span>Bookings</span>
          </div>
          <div>
            <hr class="border-dashed my-2" />
            <table class="w-full text-right">
              <tr>
                <td>Online Booking</td>
                <td>
                  <number
                    :from="0"
                    :to="32"
                    :format="theFormat"
                    :duration="2"
                    :delay="1"
                    easing="Power1.easeOut"
                  />
                </td>
              </tr>
              <tr>
                <td>Counter Booking</td>
                <td>
                  <number
                    :from="0"
                    :to="8"
                    :format="theFormat"
                    :duration="2"
                    :delay="1"
                    easing="Power1.easeOut"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      
      <div class="bg-gray-800 text-gray-300 p-2 rounded h-full">
        <div class="p-4 text-sm rounded-md shadow-lg">
          <div class="text-right">
            <p class="font-semibold text-3xl">
              <number
                :from="0"
                :to="12"
                :format="theFormat"
                :duration="2"
                :delay="1"
                easing="Power1.easeOut"
              />
            </p>
            <span>Cancellations</span>
          </div>
        </div>
      </div>

        <div class="bg-gray-800 text-gray-300 p-2 rounded h-full">
        <div class="p-4 text-sm rounded-md shadow-lg">
          <div class="text-right">
            <p class="font-semibold text-3xl">
                Top Routes
            </p>
            <p>
              Thimphu to Mongar <span>| 20 Bookings</span>
            </p>
            <p>
              Mongar to Thimphu <span>| 17 Bookings</span>
            </p>
            <p>
              Thimphu to Trashigang <span>| 10 Bookings</span>
            </p>
              <p>
              Trashigang to Trashigang <span>| 6 Bookings</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 w-full my-10">
      <div class="col-span-12 md:col-span-6">
        <p class="text-center font-thin text-xl">Daily Ticket Sale(Nu)</p>
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
        <p class="text-center font-thin text-xl">Daily Bookings</p>
        <line-chart
          :data="weekly_bookingUrl"
          legend="bottom"
          :colors="['#d7e0ff', '#ffb3bf', '#302E80']"
        ></line-chart>
      </div>
    </div>
    <div class="grid grid-cols-12 w-full my-10">
      <div class="col-span-12 md:col-span-6 mx-2">
        <p class="text-center font-thin text-xl">Daily Cancellations</p>
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