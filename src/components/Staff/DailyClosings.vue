<template>
  <div
    class="
      min-h-screen
      flex flex-col
      items-center
      justify-start
      sm:ml2 sm:mr2
      w-full
      text-gray-600
    "
  >
    <p class="text-center">
      Welcome {{ userDetails.name }} <br />
      Here is your closing for {{ parseDate(date) }}
    </p>

    <div class="flex gap-2 justify-around bg-gray-200 p-2 rounded">
      <input type="date" class="bg-gray-200" v-model="date" />
      <button @click="fetchBookingsByDateByUser()">Load Bookings</button>
    </div>
    <p class="font-thin mt-6">Summary</p>
    <div class="flex p-4 gap-4">
      <div class="border p-2">
        <p>
          Cash Sale: <span class="font-semibold">Nu.{{ cashAmount }}</span>
        </p>
        <p>
          E Payment:
          <span class="font-semibold"> Nu. {{ ePaymentAmount }} </span>
        </p>
        <p class="border-t mt-1">
          Total Amount:

          <span class="font-semibold"> Nu. {{ totalAmount }} </span>
        </p>
      </div>

      <div class="border p-2">
        <p>
          Total CashBooking:
          <span class="font-semibold">{{ cashBookings }} </span>
        </p>
        <p>
          Total EpaymentBooking:
          <span class="font-semibold">{{ ePaymentBookings }}</span>
        </p>
        <p class="border-t mt-1">
          
          Total Bookings: {{ bookings.length }}</p>
      </div>
    </div>
    <p class="font-thin mt-2">Bookings</p>
    <div class="flex gap-2 flex-wrap justify-center">
      <div
        v-for="booking in bookings"
        :key="booking"
        class="
          p-3
          flex flex-col
          border
          w-5/6
          md:w-4/6
          lg:w-3/6
          text-sm
          md:text-md
        "
      >
        <p v-if="booking.bookingStatus === 'CANCELLED'" class="text-red-400">
          Booking Cancelled
        </p>
        <p class="font-semibold">
          Mode: {{ booking.modality === "CASH" ? "Cash" : "EPayment" }}
        </p>
        <p>BookingID: {{ booking.id }}</p>

        <p v-if="!booking.subRouteId">
          {{ booking.route.routepath?.origin.name }} -
          {{ booking.route.routepath?.destination.name }}
        </p>
        <p v-else>
          {{ booking.subroute?.routepath?.origin.name }} -
          {{ booking.subroute?.routepath?.destination.name }}
        </p>
        <p class="break-words">
          Departure on {{ parseDate(booking.scheduleDate) }} at
          {{ booking.route.departureTime }}
        </p>

        <p>Amount: Nu.{{ booking.amount }}</p>
        <p>Seat Numbers: {{ booking.passengers.length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import { getPaidBookingsByOperatorAndDate } from "../../services/bookingServices";

export default {
  created() {
    this.userDetails = VueJwtDecode.decode(this.userToken);
    console.log(this.userDetails);

    let date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    this.date = today;

    this.fetchBookingsByDateByUser();
  },
  data() {
    return {
      bookings: [],
      userToken: sessionStorage.getItem("token"),
      userDetails: {},
      date: "",
      cashBookings: 0,
      ePaymentBookings: 0,
      cashAmount: 0,
      ePaymentAmount: 0,
      totalAmount: 0,
    };
  },
  methods: {
    fetchBookingsByDateByUser() {
      this.bookings = [];
      this.cashBookings = 0;
      this.ePaymentBookings = 0;
      this.cashAmount = 0;
      this.ePaymentAmount = 0;
      this.totalAmount = 0;

      getPaidBookingsByOperatorAndDate(this.userDetails.id, this.date).then(
        (res) => {
          this.bookings = res.data;
          res.data.forEach((element) => {
            if (element.modality === "CASH") {
              this.cashAmount += element.amount;
              this.cashBookings++;
            } else {
              this.ePaymentAmount += element.amount;
              this.ePaymentBookings++;
            }
            this.totalAmount += element.amount;
          });
        }
      );
    },
    parseDate(datestring) {
      return new Date(datestring).toDateString();
    },
  },
};
</script>