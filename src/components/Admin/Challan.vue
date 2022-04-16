<template>
  <div class="min-h-screen flex flex-col p-4 justify-start items-center">
    <h2 class="text-xl m-2">Click on a date to view Schedules</h2>
    <Calendar :min-date="new Date()" @dayclick="onDayClick($event)" />
    <p class="font-normal text-center text-gray-500 my-1" v-if="selectedDate">
      Showing Schedules for
      <span class="text-gray-800 text-3xl font-semibold">{{
        parseDepartureDate(selectedDate)
      }}</span>
    </p>
    <hr class="w-full my-2" />
    <table class="border-l border-r divide-y divide-gray-200 table-auto">
      <thead class="">
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
            Route Details
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
            Subroute
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
            View Challan
          </td>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="schedule in schedules"
          :key="schedule"
          :class="
            schedule.isActive ? 'hover:bg-gray-200' : 'bg-red-100 line-through'
          "
        >
          <td
            :class="
              schedule.isCancelled
                ? 'px-6 py-3 bg-red-300 whitespace-nowrap font-light text-sm'
                : 'px-6 py-3 whitespace-nowrap font-light text-sm'
            "
          >
            <div v-if="schedule.isCancelled" class="font-bold">Cancelled</div>
            <div v-if="!schedule.isActive" class="font-bold">
              Route Suspended
            </div>
            {{ schedule.routepath?.origin.name }} -
            {{ schedule.routepath?.destination.name }}

            <br />
            Departure Time: {{ schedule.departureTime }}
            <br />
            Fare: Nu.{{ schedule.fare }}
          </td>
          <td
            :class="
              schedule.isCancelled
                ? 'px-6 py-3 bg-red-300 whitespace-nowrap font-light text-sm'
                : 'px-6 py-3 whitespace-nowrap font-light text-sm'
            "
          >
            <div
              class="flex flex-col w-full gap-2"
              v-if="schedule.subroutes.length"
            >
              Subroutes
              <div
                v-for="(subroute, index) in schedule.subroutes"
                :key="subroute"
              >
                <p>
                  {{ index + 1 }}.{{ subroute.routepath?.origin.name }} -
                  {{ subroute.routepath.destination?.name }}
                </p>
                Fare: Nu.{{ subroute.fare }}
              </div>
            </div>
            <div v-else>No Subroutes</div>
          </td>

          <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
            <div v-if="schedule.isActive">
              <button
                class="bg-gray-500 text-gray-50 p-1 rounded hover:bg-green-600"
                @click="viewPassengers(schedule)"
              >
                View Challan
              </button>
            </div>
            <div v-else>Suspended</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- View passengers Modal -->
  <vue-final-modal
    v-model="passengerDetailsModal"
    classes="modal-container"
    content-class="modal-content2"
    class="w-max-screen"
  >
    <div>
      <div
        class="
          font-nunito
          text-gray-200
          bg-gray-600
          rounded-t
          shadow-md
          p-6
          text-center
        "
      >
        <p class="text-gray-300">Challan for</p>
        <p>
          <span class="text-2xl font-bold">
            {{ selectedSchedule.routepath?.origin.name }}</span
          >
          to
          <span class="text-2xl font-bold">
            {{ selectedSchedule.routepath?.destination.name }}
          </span>
        </p>
        <p>Date: {{ parseDepartureDate(selectedDate) }}</p>
        <p>Time: {{ selectedSchedule.departureTime }}</p>
        <div class="text-xl mt-2">
          <p>Seats Remaining: {{ seatsAvailable.length }}</p>
          <div class="flex gap-2 justify-center">
            <p v-for="seat in seatsAvailable" :key="seat">
              {{ seat }}
            </p>
          </div>
          <p
            v-if="!routeDateBookings.length"
            class="m-4 text-2xl text-gray-100"
          >
            No Bookings
          </p>
        </div>
      </div>

      <div v-if="routeDateBookings.length" class="">
        <div>
          <table class="w-full table-auto divide-y">
            <thead>
              <tr class="bg-gray-100 text-gray-700 ">
                <td class="px-2">Booking ID</td>
                <td class="px-2">Mode</td>
                <td class="px-2">Seats Booked</td>
                <td class="px-2">Fare (per seat)</td>
                <td class="px-2">Service Charge (per seat)</td>
                <td class="px-2">Amount</td>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="booking in routeDateBookings" :key="booking">
                <td class="px-4 flex items-start">
                  {{ booking.id }}
                </td>
                <td class="px-2">
                  <div
                    v-if="booking.modality === 'ONLINE'"
                    class="font-semibold"
                  >
                    Online Booking
                  </div>
                  <div v-else class="text-sm">
                    <p class="font-semibold">Counter Booking</p>
                    <p>Booked by {{ booking.user.name }}</p>
                    <p class="font-semibold">
                      Payment:
                      {{ booking.modality === "CASH" ? "Cash" : "Epayment" }}
                    </p>
                    <div v-if="booking.modality === 'MBOB'" class="pl-6">
                      Journal Details
                      <br />
                      Bank: {{ booking.depositBank }}
                      <br />
                      Jrl No: {{ booking.depositJournal }}
                    </div>
                  </div>
                </td>
                <td class="px-2">
                  <div class="flex gap-4 flex-wrap w-full">
                    <p v-for="passenger in booking.passengers" :key="passenger">
                      {{ passenger.seatNumber }}
                    </p>
                  </div>
                </td>
                <td class="px-2">Nu.{{ selectedSchedule.fare }}</td>
                <td class="px-2">
                  <p v-if="booking.modality === 'ONLINE'">Nu.35</p>
                  <p v-else>Nu.0</p>
                </td>
                <td class="px-2">Nu. {{ booking.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-end mt-10 p-4">
          <table class="text-md">
            <tr class="font-bold">
              <td >Grand Total:</td>
              <td>Nu. {{ grandTotal }}</td>
            </tr>
            <tr>
              <td class="col-span-2"><hr class="w-full" /></td>
            </tr>
            <tr>
              <td class="pl-6">Cash:</td>
              <td>Nu. {{ cashTotal }}</td>
            </tr>
            <tr>
              <td class="pl-6">Epayment:</td>
              <td>Nu. {{ epaymentTotal }}</td>
            </tr>
            <tr>
              <td class="pl-6">Online:</td>
              <td>Nu. {{ onlineTotal }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>


<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  border-radius: 0.25rem;
  background: #fff;
}
::v-deep .modal-content2 {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0;
  padding: 0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>


<script>
import { getBookingsByRouteAndScheduleDate } from "../../services/bookingServices";
import { getAllBuses } from "../../services/busServices";

import {
  getBusbyRouteAndDate,
  getRoutesByWeekday,
} from "../../services/routeServices";

import { getCancelledRoutesByDate } from "../../services/cancelledRouteDateService";

export default {
  data() {
    return {
      status: "bus Set",
      date: new Date(),
      selectedDate: "",
      schedules: [],
      passengers: [],
      buses: [],
      selectedBus: {},
      assignBusModal: false,
      reassignBusModal: false,
      busSelected: null,
      selectedSchedule: {},
      selectedWeekdate: null,
      passengersInSchedule: [],
      seatsAvailable: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ],
      passengerDetailsModal: false,
      cancelledRoutes: [{ date: "2022-04-26", routeId: 63 }],
      conflictingBookingsModal: false,
      confirmCancelBusModal: false,
      conflictingBookings: [],
      routeDateBookings: [],
      storedDateClickEvent: {},
      grandTotal: 0,
      cashTotal: 0,
      epaymentTotal: 0,
      onlineTotal: 0,
    };
  },
  computed: {},
  created() {
    getAllBuses().then((res) => {
      this.buses = res.data;
    });
  },

  methods: {
    parseDepartureDate(date) {
      let d = new Date(date);
      return d.toDateString();
    },

    onDayClick(e) {
      this.selectedDate = e.id;
      this.selectedWeekdate = e.weekday;
      this.schedules = [];
      this.storedDateClickEvent = e;
      getRoutesByWeekday(e.weekday).then((res) => {
        console.log("ROUTE WITH SUBROTES", res.data);
        res.data.forEach((route) => {
          let data = route;
          data.isCancelled = 0;
          getBusbyRouteAndDate(this.selectedDate, route.id).then((res) => {
            if (res.data) {
              data.bus = res.data.bus;
              data.busRosterId = res.data.id;
            }
            getCancelledRoutesByDate(this.selectedDate).then((res) => {
              res.data.forEach((item) => {
                if (item.routeId === route.id) {
                  console.log("A ROUTE HAS BEEN CANCELLED", item, route);
                  data.isCancelled = 1;
                }
              });
              this.schedules.push(data);
            });
          });
        });
        console.log(this.schedules);
      });
      this.$toast.show(`Showing Schedule for ${this.selectedDate}`, {
        type: "info",
        position: "top",
      });
    },
    viewPassengers(schedule) {
      this.selectedSchedule = schedule;
      this.passengersInSchedule = [];
      this.passengerDetailsModal = true;
      this.seatsAvailable = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ];
      this.grandTotal = 0;
      this.epaymentTotal = 0;
      this.cashTotal = 0;
      this.onlineTotal = 0;
      getBookingsByRouteAndScheduleDate(schedule.id, this.selectedDate).then(
        (res) => {
          console.log("PAID Bookings", res.data);
          this.routeDateBookings = res.data;

          res.data.forEach((booking) => {
            this.grandTotal += booking.amount;
            if (booking.modality === "CASH") {
              this.cashTotal += booking.amount;
            }
            if (booking.modality === "MBOB") {
              this.epaymentTotal += booking.amount;
            }
            if (booking.modality === "ONLINE") {
              this.onlineTotal += booking.amount;
            }
            booking.passengers.forEach((passenger) => {
              let searchIndex = this.seatsAvailable.indexOf(
                passenger.seatNumber
              );
              if (searchIndex !== -1) {
                console.log("Seat Booked", passenger);
                this.seatsAvailable.splice(searchIndex, 1);
              }
            });
          });
        }
      );
    },
  },
};
</script>