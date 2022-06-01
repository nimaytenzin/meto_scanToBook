<template>
  <div class="min-h-screen flex flex-col p-4 justify-start items-center">
    <h2 class="text-xl m-2">Please Fill out the form below to load Challan</h2>

    <hr class="w-full my-2" />

    <div class="flex flex-wrap w-full text-metoPrimary-900">
      <div
        class="
          w-full
          md:w-1/6
          flex flex-col
          rounded-lg
          md:rounded-none md:rounded-l-lg
          items-start
          justify-center
          p-2
        "
      >
        <p class="text-sm text-gray-500 mb-2">Origin</p>
        <select
          class="w-full bg-gray-100 rounded-sm p-2 border text-sm"
          v-model="originSelected"
          @change="onOriginSelect($event)"
        >
          <option
            v-for="origin in origins"
            :value="origin"
            :key="origin"
            class="bg-metoPrimary-400 w-full"
          >
            {{ origin.name }}
          </option>
        </select>
      </div>
      <div
        class="
          w-full
          md:w-1/6
          flex flex-col
          rounded-lg
          md:rounded-none
          items-start
          justify-center
          p-2
        "
      >
        <p class="text-sm text-gray-500 mb-2">Destination</p>
        <select
          class="w-full bg-gray-100 rounded-sm p-2 border text-sm"
          v-model="destinationSelected"
          @change="onDestinationChange"
        >
          <option
            v-for="destination in destinations"
            :value="destination"
            :key="destination"
            class="bg-blue-400 w-full"
          >
            {{ destination.name }}
          </option>
        </select>
      </div>
      <div
        class="
          w-full
          md:w-2/6
          flex flex-col
          items-start
          justify-center
          p-2
          rounded-lg
          md:rounded-none md:rounded-r-lg
        "
      >
        <p class="text-sm text-gray-500 mb-2">Date</p>
        <div
          class="
            cursor-pointer
            w-full
            p-2
            flex
            items-center
            text-red-400
            animate-pulse
            bg-gray-100
            border
            text-sm
          "
          @click="checkAvailableDates()"
          v-if="!dateSelected"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          Select Date
        </div>
        <div
          class="w-full bg-gray-100 rounded-sm p-2 border text-sm"
          v-else
          @click="checkAvailableDates()"
        >
          {{ dateSelected }}
        </div>
      </div>

      <div
        class="
          w-full
          md:w-1/6
          flex flex-col
          rounded-lg
          md:rounded-none md:rounded-l-lg
          items-start
          justify-center
          p-2
        "
      >
        <p class="text-sm text-gray-500 mb-2">Select Departure Time</p>
        <select
          class="w-full bg-gray-100 rounded-sm p-2 border text-sm"
          v-model="selectedDepartureTime"
            @change="onDepartureTimeChange()"
        >
          <option
            v-for="route in matchedRoutes"
            :value="route"
            :key="route"
            class="bg-blue-400 w-full"
          >
            {{ route.departureTime }}
          </option>
        </select>
      </div>
      <div
        class="
          w-full
          md:w-1/6
          flex flex-col
          rounded-lg
          md:rounded-none md:rounded-l-lg
          items-center
          justify-end
          p-2
        "
      >
        <p class="text-sm text-gray-500 mb-2">Click to load Challan</p>
        <button
          class="
            py-1
            md:w-max
            rounded
            text-white
            bg-red-500
            px-2
            md:px-6
            flex
            gap-2
            md:gap-4
            items-center
          "
          @click="loadChallan"
        >
          Load Challan
        </button>
      </div>
    </div>

    <div class="flex w-full justify-end" v-if="routeDateBookings.length">
      <button @click="saveImage" class="p-1 bg-gray-400 text-gray-100 rounded">
        Download Challan
      </button>
    </div>
    <div
      id="challanDetails"
      class="w-full flex flex-col items-center mt-10 bg-white p-4"
      v-if="routeDateBookings.length"
    >
      <div class="w-2/3">
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
            <span class="text-2xl font-bold"> {{ originSelected?.name }}</span>
            to
            <span class="text-2xl font-bold">
              {{ destinationSelected?.name }}
            </span>
          </p>
          <p>Date: {{ formattedDate }}</p>
          <p>Time: {{ selectedDepartureTime.departureTime }}</p>
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

        <div class="">
          <div>
            <table class="w-full table-auto divide-y">
              <thead>
                <tr class="bg-gray-100 text-gray-700">
                  <td class="px-2">Booking ID</td>
                  <td class="px-2">Mode</td>
                  <td class="px-2">Seat Number</td>
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
                      <p>Booked by {{ booking.user?.name }}</p>
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
                  <td class="px-2 w-1/6">
                    <div class="flex flex-wrap items-start">
                      <div
                        v-for="(passenger, index) in booking.passengers"
                        :key="passenger"
                      >
                        <p v-if="index + 1 !== booking.passengers.length">
                          {{ passenger.seatNumber }}  ,
                        </p>
                        <p v-else>
                          {{ passenger.seatNumber }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-2">Nu.{{ selectedDepartureTime.fare }}</td>
                  <td class="px-2">
                    <p v-if="booking.modality === 'ONLINE'">Nu.35</p>
                    <p v-else>Nu.0</p>
                  </td>
                  <td class="px-2">Nu. {{ booking.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex justify-end mt-10 p-4 mb-6">
            <table class="text-md">
              <tr class="font-bold">
                <td>Total:</td>
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
                <td class="pl-6">Online/Mbob:</td>
                <td>Nu. {{ epaymentTotal + onlineTotal }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- <table class="border-l border-r divide-y divide-gray-200 table-auto">
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
    </table> -->
  </div>

  <!-- View passengers Modal -->
  <vue-final-modal
    v-model="passengerDetailsModal"
    classes="modal-container"
    content-class="modal-content2"
    class="w-max-screen"
  >
    <div></div>
  </vue-final-modal>

  <vue-final-modal
    v-model="availableDatesModal"
    classes="flex justify-center items-center"
    content-class="modal-content rounded-lg"
    class="w-max-screen"
  >
    <div
      class="modal__content text-center mt-1 flex flex-col text-metoPrimary-700"
    >
      

      

      <div class="flex flex-col gap-2 justify-center items-center">
        <div class="flex flex-col px-2 py-1">
          <div class="flex flex-col justify-center mt-2">
            <h2 class="flex gap-2 text-sm font-light items-center">
              <span class="block rounded-full h-2 w-2 bg-green-700"> </span>
              Bus available
            </h2>
          </div>
          <DatePicker
            v-model="date"
            @dayclick="onDayClick($event)"
            :attributes="attributes"
          />
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
import domtoimage from "dom-to-image";
import { getRoutesByOriginDestination } from "../../services/routeServices";

import {
  getActiveDestinationByOrigin,
  getActiveStops,
} from "../../services/stopServices";

export default {
  data() {
    return {
      date: new Date(),
      passengersInSchedule: [],
      seatsAvailable: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ],

      routeDateBookings: [],

      grandTotal: 0,
      cashTotal: 0,
      epaymentTotal: 0,
      onlineTotal: 0,

      //newChallanLoader
      origins: [],
      originSelected: {},
      destinationSelected: {},
      routes: [],
      subroutes: [],
      dateSelected: null,
      attributes: [],
      days: [],
      matchedRoutes: [],
      availableDatesModal: false,
      daySelected: 0,
      selectedDepartureTime: {},
      formattedDate: {},
    };
  },
  computed: {},
  created() {
    getAllBuses().then((res) => {
      this.buses = res.data;
    });
    getActiveStops().then((res) => {
      this.origins = res.data;
      // this.originSelected = res.data[0];
      // getActiveDestinationByOrigin(this.originSelected.id).then((res) => {
      //   this.destinations = res.data;
      //   this.destinationSelected = res.data[0];
      // });
    });
  },

  methods: {
    saveImage() {
      const scale = 3;
      const node = document.getElementById("challanDetails");
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

      var filename = new Date().toString().split(" ").join("");

      domtoimage.toPng(node, param).then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `report_${filename}.png`;
        link.href = dataUrl;
        link.click();
      });
    },
    onOriginSelect(e) {
      this.dateSelected = null;
      this.matchedRoutes= [] 
      this.routeDateBookings = []
      getActiveDestinationByOrigin(this.originSelected.id).then((res) => {
        this.destinations = res.data;
        this.destinationSelected = res.data[0];
      });
    },
    checkAvailableDates() {
      this.routes = [];
      this.subroutes = [];
      this.dateSelected = null;
      this.attributes = [];
      this.days = [];
      this.matchedRoutes = [];
      this.routeDateBookings = []
      getRoutesByOriginDestination(
        this.originSelected.id,
        this.destinationSelected.id
      )
        .then((res) => {
          if (res.data.routes) {
            this.routes = res.data.routes;
            this.routes.forEach((route) => {
              this.days.push(route.day);
            });
          }
          if (res.data.subroutes) {
            this.subroutes = res.data.subroutes;
            this.subroutes.forEach((subroute) => {
              this.days.push(subroute.day);
            });
          }
          this.attributes = [
            {
              dot: "green",
              dates: { weekdays: this.days },
              popover: {
                label: "Bus Availble",
              },
            },
          ];
        })
        .catch((err) => console.log(err));

      this.availableDatesModal = true;
    },

    onDayClick(e) {
      console.log(e);
      this.daySelected = e.weekday;

      if (
        e.popovers[0] &&
        e.popovers[0].label === "Bus Availble" &&
        !e.isDisabled
      ) {
        this.dateSelected = e.id;
        this.formattedDate = e.ariaLabel;
        this.matchedRoutes = [];
        this.routes.forEach((route) => {
          if (route.day === e.weekday) {
            this.matchedRoutes.push(route);
          }
        });
        this.subroutes.forEach((subroute) => {
          if (subroute.day === e.weekday) {
            this.matchedRoutes.push(subroute);
          }
        });
        console.log("MATCHED ROUTES", this.matchedRoutes);
        this.availableDatesModal = false;
      } else {
        this.dateSelected = null;
        this.matchedRoutes = [];
      }
    },
    loadChallan() {
      console.log("Load Challan");
      console.log(this.formattedDate, this.dateSelected);
     
      this.routeDateBookings = []
      this.seatsAvailable = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ];
      this.grandTotal = 0;
      this.epaymentTotal = 0;
      this.cashTotal = 0;
      this.onlineTotal = 0;
      getBookingsByRouteAndScheduleDate(
        this.selectedDepartureTime.id,
        this.dateSelected
      ).then((res) => {
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
            let searchIndex = this.seatsAvailable.indexOf(passenger.seatNumber);
            if (searchIndex !== -1) {
              console.log("Seat Booked", passenger);
              this.seatsAvailable.splice(searchIndex, 1);
            }
          });
        });
      });
    },
    onDepartureTimeChange(){
      this.routeDateBookings =[];
    },

    parseDepartureDate(date) {
      let d = new Date(date);
      return d.toDateString();
    },

    // onDayClick(e) {
    //   this.selectedDate = e.id;
    //   this.selectedWeekdate = e.weekday;
    //   this.schedules = [];
    //   this.storedDateClickEvent = e;
    //   getRoutesByWeekday(e.weekday).then((res) => {
    //     console.log("ROUTE WITH SUBROTES", res.data);
    //     res.data.forEach((route) => {
    //       let data = route;
    //       data.isCancelled = 0;
    //       getBusbyRouteAndDate(this.selectedDate, route.id).then((res) => {
    //         if (res.data) {
    //           data.bus = res.data.bus;
    //           data.busRosterId = res.data.id;
    //         }
    //         getCancelledRoutesByDate(this.selectedDate).then((res) => {
    //           res.data.forEach((item) => {
    //             if (item.routeId === route.id) {
    //               console.log("A ROUTE HAS BEEN CANCELLED", item, route);
    //               data.isCancelled = 1;
    //             }
    //           });
    //           this.schedules.push(data);
    //         });
    //       });
    //     });
    //     console.log(this.schedules);
    //   });
    //   this.$toast.show(`Showing Schedule for ${this.selectedDate}`, {
    //     type: "info",
    //     position: "top",
    //   });
    // },
    viewPassengers() {
      this.passengersInSchedule = [];
      this.passengerDetailsModal = true;
      this.seatsAvailable = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ];
      this.grandTotal = 0;
      this.epaymentTotal = 0;
      this.cashTotal = 0;
      this.onlineTotal = 0;
      console.log(
        "LOAD BOOKINGS FOR",
        this.selectedDepartureTime,
        this.dateSelected
      );
      getBookingsByRouteAndScheduleDate(
        this.selectedDepartureTime.id,
        this.dateSelected
      ).then((res) => {
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
            let searchIndex = this.seatsAvailable.indexOf(passenger.seatNumber);
            if (searchIndex !== -1) {
              console.log("Seat Booked", passenger);
              this.seatsAvailable.splice(searchIndex, 1);
            }
          });
        });
      });
    },
  },
};
</script>