<template>
  <div class="min-h-screen flex flex-col p-4">
    <h1 class="text-2xl font-bold text-center my-3">Today</h1>

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
                :to="todayStats.totalRevenueToday"
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
                    :to="todayStats.onlineRevenue"
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
                          :to="todayStats.mbobRevenue"
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
                          :to="todayStats.cashRevenue"
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
                :to="todayStats.totalBookingsToday"
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
                    :to="todayStats.onlineBooking"
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
                    :to="todayStats.counterBooking"
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
                :to="todayStats.cancellations"
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
    </div>

    <div>
      <div class="w-full flex justify-between text-gray-50">
        <div>
          <button
            class="
              bg-gray-600
              p-2
              hover:bg-gray-200 hover:text-gray-600
              rounded-l
            "
            @click="assignData('ALL')"
          >
            All Bookings
          </button>
          <button
            class="bg-gray-600 p-2 hover:bg-gray-200 hover:text-gray-600"
            @click="assignData('ONLINE')"
          >
            Online
          </button>
          <button
            class="bg-gray-600 p-2 hover:bg-gray-200 hover:text-gray-600"
            @click="assignData('CASH')"
          >
            Cash
          </button>
          <button
            class="bg-gray-600 p-2 hover:bg-gray-200 hover:text-gray-600"
            @click="assignData('MBOB')"
          >
            Mbob
          </button>
          <button
            class="
              bg-gray-600
              p-2
              hover:bg-gray-200 hover:text-gray-600
              rounded-r
            "
            @click="assignData('CANCELLED')"
          >
            Cancelled
          </button>
        </div>
      </div>

      <table
        class="min-w-full overflow-scroll divide-y divide-gray-200"
        ref="exportTable"
      >
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
              Seats Booked
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
              Origin
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
              Destination
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
              Departure
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
              Remarks
            </td>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 text-gray-600">
          <tr
            class="hover:bg-gray-200"
            v-for="booking in bookings.data"
            :key="booking"
          >
            <td class="px-6 my-1 whitespace-nowrap">{{ booking.id }}</td>
            <td class="px-6 my-1 whitespace-nowrap">Nu.{{ booking.amount }}</td>
            <td class="px-6 my-1 whitespace-nowrap">
              <div v-if="booking.modality === 'ONLINE'">Online Booking</div>
              <div v-else>Counter Booking</div>
            </td>
            <td class="px-6 py-1 whitespace-nowrap">
              {{ booking.modality }}
            </td>
            <td class="px-6 py-1 whitespace-nowrap">
              <div>{{ booking.bookedSeats.length }}</div>
            </td>
            <td class="px-6 py-1 whitespace-nowrap">
              <div>
                {{ booking.schedule.route.routepath.origin.name }}
              </div>
            </td>
            <td class="px-6 py-1 whitespace-nowrap">
              <div>
                {{ booking.schedule.route.routepath.destination.name }}
              </div>
            </td>
            <td class="px-6 py-1 whitespace-nowrap">
              {{ formatDepartureDate(booking.schedule.dateId) }} at
              {{ getDeptTime(booking.schedule.route.departureTime) }}
            </td>
            <td class="px-6 py-1 whitespace-wrap">
              <div v-if="booking.modality === 'MBOB' && booking.journalNumber">
                Journal Number: <br />
                {{ booking.journalNumber }}
              </div>
              <div
                v-if="booking.bookingStatus === 'CANCELLED'"
                class="bg-red-400 text-red-50 rounded p-1"
              >
                Status: {{ booking.bookingStatus }}
              </div>
              <div
                v-if="booking.bookingStatus === 'REFUNDED'"
                class="bg-green-400 text-green-50 rounded p-1"
              >
                Status: {{ booking.bookingStatus }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="border-t mt-6 pt-1 flex gap-4 items-end">
        <span class="text-xs xs:text-sm text-gray-900">
          Showing {{ bookings.limit }} entries| Page
          {{ bookings.currentPage + 1 }} of
          {{ bookings.lastPage + 1 }}
        </span>
        <div class="inline-flex">
          <button
            class="
              text-sm
              bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-semibold
              py-2
              px-4
              rounded-l
            "
            @click="getData(bookings.firstPage)"
          >
            First
          </button>
          <button
            class="text-sm text-gray-800 font-semibold py-2 px-4"
            :class="
              bookings.previousPage === null
                ? 'bg-gray-100 hover:bg-gray-100 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            "
            @click="getData(bookings.previousPage)"
          >
            Prev
          </button>
          <button
            class="text-sm text-gray-800 font-semibold py-2 px-4"
            :class="
              bookings.nextPage === null
                ? 'bg-gray-100 hover:bg-gray-100 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            "
            @click="getData(bookings.nextPage)"
          >
            Next
          </button>
          <button
            class="
              text-sm
              bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-semibold
              py-2
              px-4
              rounded-r
            "
            @click="getData(bookings.lastPage)"
          >
            Last
          </button>
        </div>
        <button
          @click="downloadData()"
          class="
            text-sm
            bg-gray-300
            hover:bg-gray-400
            text-gray-800
            font-semibold
            py-2
            px-4
            rounded-sm
          "
        >
          Dowload Data
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  todaysMbobData,
  todaysCashData,
  todaysOnlineData,
  todaysCancelledData,
  getTodayCashPaginated,
  getTodayMbobPaginated,
  getTodayOnlinePaginated,
  getTodayAllPaginated,
  getTodayCancelledPaginated,
  todaysAllData,
} from "../../services/TodaysDataService";
export default {
  data() {
    return {
      selectedBus: {},
      allBookings: [],
      cashBookings: [],
      mbobBookings: [],
      onlineBookings: [],
      allBookings: [],
      cancelledBookings: [],
      filename: "nima",
      selected: "ALL",
      bookings: {},
      todayStats: {
        totalBookingsToday: 0,
        onlineBooking: 0,
        counterBooking: 0,
        totalRevenueToday: 0,
        onlineRevenue: 0,
        counterRevenue: 0,
        cashRevenue: 0,
        mbobRevenue: 0,
        cancellations: 0,
      },
      fileName: "todaysBookingData",
    };
  },
  created() {
    getTodayAllPaginated(0).then((res) => {
      this.bookings = res.data;
      this.allBookings = res.data;
      this.todayStats.totalBookingsToday = res.data.count;
      this.todayStats.totalRevenueToday = res.data.amount;
    });

    getTodayCashPaginated(0).then((res) => {
      this.cashBookings = res.data;
      this.todayStats.cashRevenue = res.data.amount;
      this.todayStats.counterBooking = res.data.count;
    });

    getTodayMbobPaginated(0).then((res) => {
      this.mbobBookings = res.data;
      this.todayStats.mbobRevenue = res.data.amount;
      this.todayStats.mbobBookings = res.data.count;
    });

    getTodayOnlinePaginated(0).then((res) => {
      this.onlineBookings = res.data;
      this.todayStats.onlineBooking = res.data.count;
      this.todayStats.onlineRevenue = res.data.amount;
    });
    getTodayCancelledPaginated(0).then((res) => {
      this.cancelledBookings = res.data;
      this.todayStats.cancellations = res.data.count;
    });
  },
  methods: {
    theFormat(number) {
      return Math.floor(number);
    },
    formatDepartureDate(date) {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(date).toLocaleDateString("en-US", options);
    },
    getDeptTime: function (time) {
      let tissme = time.split(":");
      let hrs = parseInt(tissme[0]);
      let min = parseInt(tissme[1]).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      let ampm = "am";
      if (hrs > 12) {
        hrs = hrs - 12;
        ampm = "pm";
      }

      return `${hrs}:${min} ${ampm}`;
    },
    getData(pageNo) {
      if (pageNo !== null) {
        if (this.selected === "ALL") {
          getTodayAllPaginated(pageNo).then((res) => {
            this.bookings = res.data;
          });
        } else if (this.selected === "CASH") {
          getTodayCashPaginated(pageNo).then((res) => {
            this.bookings = res.data;
          });
        } else if (this.selected === "MBOB") {
          getTodayMbobPaginated(pageNo).then((res) => {
            this.bookings = res.data;
          });
        } else if (this.selected === "ONLINE") {
          getTodayOnlinePaginated(pageNo).then((res) => {
            this.bookings = res.data;
          });
        } else {
          getTodayCancelledPaginated(pageNo).then((res) => {
            this.bookings = res.data;
          });
        }
      }
    },
    assignData(type) {
      if (type === "ALL") {
        this.selected = "ALL";
        this.bookings = this.allBookings;
      } else if (type === "MBOB") {
        this.selected = "MBOB";
        this.bookings = this.mbobBookings;
      } else if (type === "ONLINE") {
        this.selected = "ONLINE";
        this.bookings = this.onlineBookings;
      } else if (type === "CANCELLED") {
        this.selected = "CANCELLED";
        this.bookings = this.cancelledBookings;
      } else if (type === "CASH") {
        this.selected = "CASH";
        this.bookings = this.cashBookings;
      }
    },
    jsonToXLS(data, fileName) {
      var data = XLSX.utils.json_to_sheet(data);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, fileName);
      XLSX.writeFile(wb, fileName);
    },
    downloadData() {
      let date = new Date()
        .toJSON()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("_");
      if (this.selected === "ALL") {
        todaysAllData().then((res) => {
          this.jsonToXLS(res.data, `${date}_all.xlsx`);
        });
      } else if (this.selected === "MBOB") {
        todaysMbobData().then((res) => {
          this.jsonToXLS(res.data, `${date}_mbob.xlsx`);
        });
      } else if (this.selected === "ONLINE") {
        todaysOnlineData().then((res) => {
          this.jsonToXLS(res.data, `${date}_online.xlsx`);
        });
      } else if (this.selected === "CASH") {
        todaysCashData().then((res) => {
          this.jsonToXLS(res.data, `${date}_cash.xlsx`);
        });
      } else {
        todaysCancelledData().then((res) => {
          this.jsonToXLS(res.data, `${date}_cancelled.xlsx`);
        });
      }
    },
  },
};
</script>
