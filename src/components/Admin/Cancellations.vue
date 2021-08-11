<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center sm:ml2 sm:mr2"
  >
    <div>
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center font-nunito">
        Cancellations
      </h1>

      <div
        class="
          flex flex-col
          m-auto
          bg-indigo-900
          text-blue-100
          p-6
          gap-8
          rounded-lg
          border-white
          mt-4
        "
      >
        <div class="flex justify-around">
          <div class="my-auto">
            <div class="text-lg">Refunds Pending</div>
            <div class="text-4xl text-white font-bold text-center">
              {{ cancelledBookings.length }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5"> 
      <table class="min-w-full divide-y divide-gray-200 table-auto">
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
              Customer Details
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
              Ticket Details
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
              Refund Account Details
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
              Amount Refundable
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
              Actions
            </td>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="booking in cancelledBookings"
            :key="booking"
            class="hover:bg-gray-200"
          >
            <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
              <p>Name: {{ booking.customerName }}</p>
              <p>Contact: {{ booking.customerContact }}</p>
              <p>ID: {{ booking.customerCid }}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
              <p>Origin: {{ booking.schedule.route.origin.name }}</p>
              <p>Destination: {{ booking.schedule.route.destination.name }}</p>
              <p>
                Departure Date:
                {{
                  booking.schedule.calendarDate.Calendar_Day +
                  " " +
                  booking.schedule.calendarDate.Month_Name +
                  " " +
                  booking.schedule.calendarDate.Calendar_Year
                }}
              </p>

              <p>Departure Time : {{ booking.schedule.route.departureTime }}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
              Nu {{ booking.amount }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
              <p>
                Bank: {{ booking.bankName }}
              </p>
              <p>
                Account Number: {{ booking.accNo }}
              </p>
              <p>
                Account Name: {{ booking.accName }}
              </p>
            </td>

            <td>
              <button
                @click="confirmRefund(booking)"
                class="
                  h-10
                  px-5
                  text-indigo-100
                  transition-colors
                  duration-100
                  bg-indigo-700
                  rounded-lg
                  focus:shadow-outline
                  hover:bg-indigo-800
                "
              >
                Confirm Refund
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { getAllCanelled } from "../../services/bookingServices";
import { cancelBooking } from "../../services/bookingServices";
export default {
  created() {
    getAllCanelled().then((res) => {
      this.cancelledBookings = res.data;
      console.log(res.data);
    });
  },
  data() {
    return {
      cancelledBookings: [],
    };
  },
  methods: {
    confirmRefund(booking) {
      let data = {
        checkInStatus: "REFUNDED",
      };
      cancelBooking(booking.id, data).then((res) => {
        if (res.status === 200) {
          this.$toast.show("Amound Succefully Refunded", {
            type: "success",
            position: "top",
          });
          this.refreshData();
        }
      });
    },
    refreshData() {
      getAllCanelled().then((res) => {
        this.cancelledBookings = res.data;
      });
    },
  },
};
</script>