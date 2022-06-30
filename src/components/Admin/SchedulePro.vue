<template>
  <div class="min-h-screen p-4">

    <p class="text-left text-sm text-gray-500">
      Please Select Origin, Desitination, Date and time and click on load Bookings
    </p>
    <div id="routeSelector" class="flex w-full">
      <div class="w-1/3">
        <div class="
          w-full
          flex flex-col
          rounded-lg
          md:rounded-none md:rounded-l-lg
          items-start
          justify-center
          p-2
        ">
          <p class="text-sm text-gray-500 mb-2">Origin</p>
          <select class="w-full bg-gray-100 rounded-sm p-2 border text-sm" v-model="originSelected"
            @change="onOriginSelect($event)">
            <option v-for="origin in origins" :value="origin" :key="origin" class="bg-metoPrimary-400 w-full">
              {{ origin.name }}
            </option>
          </select>
        </div>
        <div class="
          w-full
         
          flex flex-col
          rounded-lg
          md:rounded-none
          items-start
          justify-center
          p-2
        ">
          <p class="text-sm text-gray-500 mb-2">Destination</p>
          <select class="w-full bg-gray-100 rounded-sm p-2 border text-sm" v-model="destinationSelected"
            @change="onDestinationChange">
            <option v-for="destination in destinations" :value="destination" :key="destination"
              class="bg-blue-400 w-full">
              {{ destination.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-1/3">
        <div class="
          w-full
          
          flex flex-col
          items-start
          justify-center
          p-2
          rounded-lg
          md:rounded-none md:rounded-r-lg
        ">
          <p class="text-sm text-gray-500 mb-2">Departure Date</p>
          <div class="
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
          " @click="checkAvailableDates()" v-if="!dateSelected">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd" />
            </svg>
            Select Date
          </div>
          <div class="w-full bg-gray-100 rounded-sm p-2 border text-sm" v-else @click="checkAvailableDates()">
            {{ dateSelected }}
          </div>
        </div>

        <div class="
          w-full
          
          flex flex-col
          rounded-lg
          md:rounded-none md:rounded-l-lg
          items-start
          justify-center
          p-2
        ">
          <p class="text-sm text-gray-500 mb-2"> Departure Time</p>
          <select class="w-full bg-gray-100 rounded-sm p-2 border text-sm" v-model="selectedDepartureTime"
            @change="onDepartureTimeChange()">
            <option v-for="route in matchedRoutes" :value="route" :key="route" class="bg-blue-400 w-full">
              {{ route.departureTime }}
            </option>
          </select>
        </div>
      </div>

    </div>
    <div class="flex w-full justify-start">
      <div class="
         
          flex flex-col
          rounded-lg
          md:rounded-none md:rounded-l-lg
          items-center
          justify-end
          p-2
        ">
        <button class="
            py-1
            md:w-max
            rounded
            text-white
            bg-metoContrast
            bg-opacity-90
            px-2
            md:px-6
            flex
            gap-2
            md:gap-4
            items-center
          " @click="viewBookings">
          View Bookings
        </button>
      </div>
    </div>






    <div class="w-full flex justify-start gap-4 mt-6" v-if="bookingsSearched">
      <div id="bookingsTable" class="w-6/12">

        <div class="
          font-nunito
          bg-gray-100
          text-metoPrimary-600
          rounded-t
         
          p-6
          text-center
        ">
          <div v-if="isBusCancelled">
            <p class="text-metoContrast text-xl">
              This bus Has been Cancelled
            </p>
            <button class=" my-2 border border-metoPrimary-200 rounded px-4 bg-gray-100" @click="reopenBus">
              <div class="flex items-center gap-2 text-metoPrimary-800">

                <p>
                  Reopen Bus for Booking
                </p>
              </div>

            </button>

          </div>
          <p>
            <span class="text-2xl font-bold">
              {{ originSelected.name }}</span>
            to
            <span class="text-2xl font-bold">
              {{ destinationSelected.name }}
            </span>
          </p>
          <p>Date: {{ dateSelected }}</p>
          <p>Time: {{ selectedDepartureTime.departureTime }}</p>

          <div class="flex gap-2 justify-center flex-wrap">
            <button class=" my-2 border border-red-200 rounded px-4 bg-gray-100" @click="reloadData">
              <div class="flex items-center gap-2 text-metoPrimary-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clip-rule="evenodd" />
                </svg>
                <p>
                  Update Data
                </p>
              </div>

            </button>

            <button class=" my-2 border border-red-200 rounded px-4 bg-gray-100" @click="openCancelBusModal"
              v-if="!isBusCancelled">
              <div class="flex items-center gap-2 text-metoPrimary-800">

                <p>
                  Cancel Bus
                </p>
              </div>

            </button>
          </div>
        </div>


        <div>
          <div class="overflow-y-scroll ">
            <table class="
              min-w-full
              divide-y divide-gray-200
              text-gray-700
              
              bg-white
            ">
              <thead>
                <tr>
                  <td class="sticky bg-gray-100 top-0 px-4  py-2 whitespace-nowrap">
                    Booking Details
                  </td>
                  <td class="sticky bg-gray-100 top-0 px-4 py-2 whitespace-nowrap">
                    Passengers
                  </td>

                </tr>
              </thead>
              <tbody class="overflow-y-scroll p-2 divide-y text-sm">
                <tr v-for="booking in routeDateBookings" :key="booking">
                  <td class="whitespace-nowrap flex  px-4 flex-col my-6 ">
                    <div id="tags" class="flex flex-wrap gap-4">
                      <div
                        :class="booking.paymentStatus === 'PAID' ? 'bg-green-400 text-blue-50 lowercase px-2 rounded-sm' : 'bg-red-400  text-red-50 lowercase px-2 rounded-sm'">
                        {{ booking.paymentStatus }}
                      </div>
                    </div>

                    <div class="my-2">
                      <p>Booking Id: {{ booking.id }}</p>
                      <p>Amount: Nu.{{ booking.amount }}</p>

                    </div>

                    <div>
                      <div v-if="booking.modality !== 'ONLINE'">
                    
                        Booked by: {{ booking.user?.name }}/ {{ booking.user?.email }}
                      </div>
                      <div v-else>
                        Booked Online
                      </div>
                    </div>

                    <div class="my-1">
                      <button class="border border-red-300 text-gray-800 text-sm px-1 rounded"
                        @click="cancelBookingThreeFourthRefund(booking)">
                        Cancel Booking
                      </button>
                    </div>
                  </td>
                  <td class="whitespace-nowrap my-4  px-4">
                    <table class="w-full">
                      <tr>
                        <td class="px-2 border-b mt-2 border-gray-400">SeatNumber</td>
                        <td class="px-2 border-b mt-2 border-gray-400">Pasenger</td>
                      </tr>
                      <tr v-for="passenger in booking.passengers" :key="passenger">
                        <td class="px-2 my-2">
                          <p>
                            {{ passenger.seatNumber }} <span class="lowercase text-xs">({{ passenger.status }})</span>
                          </p>

                        </td>
                        <td class="px-2 text-sm my-2">
                          Name:{{ passenger.name }} <br />
                          Contact: {{ passenger.contact }}
                          <br />
                          CID: {{ passenger.cid }}
                        </td>

                      </tr>
                    </table>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="seatLayout" class=" max-w-xl">
        <p class="text-sm text-gray-400">
          Unblock a blocked seat by clicking on it
        </p>
        <div class="flex mt-5 justify-evenly">
          <div class="
                  text-center
                  flex flex-col
                  justify-center
                  items-center
                  m-2
                ">
            <img src="../../assets/inprogress.png" width="25" alt="" />
            <p class="text-sm text-gray-600">In Process</p>
          </div>
          <div class="
                  text-center
                  flex flex-col
                  justify-center
                  items-center
                  m-2
                ">
            <img src="../../assets/yourseats.png" width="25" alt="" />
            <p class="text-sm text-gray-600">In Payment</p>
          </div>
          <div class="
                  text-center
                  flex flex-col
                  justify-center
                  items-center
                  m-2
                ">
            <img src="../../assets/seatUnavailable.png" width="25" alt="" />
            <p class="text-sm text-gray-600">Booked</p>
          </div>

        </div>

        <div class="
                p-1
                mx-auto
                bg-white
               
                rounded-md
                shadow-md
                mt-1
                items-center
                space-x-4
              ">

          <div class="bg-white grid grid-cols-4 gap-2 p-3 m-3" style="z-index: 99999">
            <div v-for="item in seats" :key="item" class="rounded relative" @click="viewSeatDetails(item)">
              <img :src="bindImage(item)" alt="Seat " class="object-contain w-14 z-0 cursor-pointer"
                v-if="item.type == 'seat' || item.type === 'driver'" />
              <p class="
                      absolute
                      top-1/2
                      left-1/2
                      bg-white bg-opacity-60
                      rounded-sm
                      pl-1
                      pr-1
                      transform
                      -translate-x-1/2 -translate-y-1/2
                      cursor-pointer
                    ">
                {{ item.number ? item.number : "" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- View Seat Details Modal -->
  <vue-final-modal v-model="seatDetailsModal" classes="modal-container" content-class="modal-content"
    class="w-max-screen">
    <div class="max-w-sm p-4 text-metoPrimary-900">
      <p class="text-center">
        Details for Seat {{ selectedSeat.number }}
      </p>
      <p  class="text-center">
          Booking ID:{{ selectedSeatDetails.booking?.id }}
        </p>
      <div id="passengerDetails" class="text-sm my-2">
        <p>
          Name:{{ selectedSeatDetails.name }}
        </p>
        <p>
          Contact: {{ selectedSeatDetails.contact }}
        </p>
        <p>
          CID: {{ selectedSeatDetails.cid }}
        </p>
      </div>

      <div id="bookingDetails" class="text-sm my-1">
        
        <p>
          Seat Book Date {{ selectedSeatDetails.booking?.bookingDate }}
        </p>
        <p>
          Seat Book Time {{  getLocalTime(selectedSeatDetails.updatedAt)  }}
        </p>
        <p class="my-2">
           Seat Status: <span class="lowercase"> {{ selectedSeatDetails.status==='BOOKED'?'Paid & Booked':selectedSeatDetails.status }}</span>
        </p>
      </div>

      <div id="Seat Satus and actions" class="flex flex-col">
       

        <button v-if="!reconfirmUnblockSeat" class="border border-red-300 rounded my-2"
          @click="reconfirmUnblockSeat = true">
          Unblock Seat
        </button>

        <div v-if="reconfirmUnblockSeat">
          <p>
            Are you Sure? Unblock Seat {{ selectedSeat.number }}
          </p>
          <div id="Seat Satus and actions" class="flex flex-row gap-2 justify-center">
            <button class="border bg-red-400  text-gray-100 rounded my-2 px-4" @click="confirmUnblockSeat">
              Yes
            </button>
            <button class="border bg-green-400 text-gray-50 rounded my-2 px-4" @click="reconfirmUnblockSeat = false">
              No
            </button>
          </div>
        </div>
      </div>






    </div>
  </vue-final-modal>


  <!-- COnfirm Cancel Booking by date -->
  <vue-final-modal v-model="confirmCancelBusModal" classes="modal-container" content-class="modal-content"
    class="w-max-screen text-gray-700">
    <div>


      <div class="flex flex-col items-center p-4">
        <p class="text-gray-600 my-2 text-center">
          Are you sure you want to cancel the Bus? <br />
        </p>
        <button class="bg-gray-600 px-2 text-gray-200 rounded my-3" @click="confirmCancelBus()">
          Yes
        </button>
      </div>
    </div>
  </vue-final-modal>

  <vue-final-modal v-model="availableDatesModal" classes="flex justify-center items-center"
    content-class="modal-content rounded-lg" class="w-max-screen">
    <div class="modal__content text-center mt-1 flex flex-col text-metoPrimary-700">
      <div class="flex flex-col gap-2 justify-center items-center">
        <div class="flex flex-col px-2 py-1">
          <div class="flex flex-col justify-center mt-2">
            <h2 class="flex gap-2 text-sm font-light items-center">
              <span class="block rounded-full h-2 w-2 bg-green-700"> </span>
              Bus available
            </h2>
          </div>
          <DatePicker v-model="date" @dayclick="onDayClick($event)" :attributes="attributes" />
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
  min-width: max-content;
  border-radius: 0.25rem;
  background: #fff;
}

::v-deep .modal-content2 {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  min-width: max-content;
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
import {
  getBookingsByRouteAndScheduleDate,
  cancelBooking,
  getAllBookingsByScheduleHash,
} from "../../services/bookingServices";
import { getAllBuses } from "../../services/busServices";

import {
  getRoutesByOriginDestination,

} from "../../services/routeServices";

import {
  addNewCancelledRouteDate,
  deleteByDateAndRoute,
  deleteByDateAndSubRoute,
  getCancelledROutesbyRouteDate,
} from "../../services/cancelledRouteDateService";
import { getActiveDestinationByOrigin, getActiveStops } from '../../services/stopServices';
import crypto from "crypto";
import { getSeatDetailsadmin, getSeatsStatusadmin, leaveSeat } from '../../services/seatSelectionServices';

export default {
  data() {
    return {
      status: "bus Set",
      date: new Date(),
      selectedDate: "",
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

      //used
      origins: [],
      originSelected: {},
      destinations:[],
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
      grandTotal: 0,
      cashTotal: 0,
      epaymentTotal: 0,
      onlineTotal: 0,
      seats: [
        { id: 1, number: 1, type: "seat", status: "available" },
        { id: 2, number: 0, type: "notSeat", status: "available" },
        { id: 3, number: 0, type: "notSeat", status: "available" },
        { id: 4, number: 0, type: "driver", status: "driver" },
        { id: 5, number: 2, type: "seat", status: "available" },
        { id: 6, number: 0, type: "notSeat", status: "available" },
        { id: 7, number: 3, type: "seat", status: "available" },
        { id: 8, number: 4, type: "seat", status: "available" },
        { id: 9, number: 0, type: "notSeat", status: "available" },
        { id: 10, number: 0, type: "notSeat", status: "available" },
        { id: 11, number: 5, type: "seat", status: "available" },
        { id: 12, number: 6, type: "seat", status: "available" },
        { id: 13, number: 7, type: "seat", status: "available" },
        { id: 14, number: 0, type: "notSeat", status: "available" },
        { id: 15, number: 8, type: "seat", status: "available" },
        { id: 16, number: 9, type: "seat", status: "available" },
        { id: 17, number: 10, type: "seat", status: "available" },
        { id: 18, number: 0, type: "notSeat", status: "available" },
        { id: 19, number: 11, type: "seat", status: "available" },
        { id: 20, number: 12, type: "seat", status: "available" },
        { id: 21, number: 13, type: "seat", status: "available" },
        { id: 22, number: 0, type: "notseat", status: "available" },
        { id: 23, number: 14, type: "seat", status: "available" },
        { id: 24, number: 15, type: "seat", status: "available" },
        { id: 25, number: 16, type: "seat", status: "available" },
        { id: 26, number: 17, type: "seat", status: "available" },
        { id: 27, number: 18, type: "seat", status: "available" },
        { id: 28, number: 19, type: "seat", status: "available" },
      ],
      selectedScheduleHash: null,
      seatDetailsModal: false,
      selectedSeat: {},
      selectedSeatDetails: {},
      reconfirmUnblockSeat: false,
      isBusCancelled: false,
      bookingsSearched: false

    };
  },
  computed: {},
  created() {
    getActiveStops().then((res) => {
      this.origins = res.data;
      this.originSelected = res.data[0];
      getActiveDestinationByOrigin(this.originSelected.id).then((res) => {
        this.destinations = res.data;
        this.destinationSelected = res.data[0];
      });
    });
  },

  methods: {
    parseDepartureDate(date) {
      let d = new Date(date);
      return d.toDateString();
    },
    bindImage(seat) {
      if (seat.type === "seat" || seat.type === "driver") {
        switch (seat.status) {
          case "available":
            return require("../../assets/seatAvailable.png");
            break;
          case "entrance":
            return require("../../assets/entrance.png");
            break;
          case "BOOKED":
            return require("../../assets/seatUnavailable.png");
            break;
          case "driver":
            return require("../../assets/steeringwheel.png");
            break;
          case "INPAYMENT":
            return require("../../assets/yourseats.png");
            break;
          case "INPROGRESS":
            return require("../../assets/inprogress.png");
            break;
          default:
            return require("../../assets/seatAvailable.png");
            break;
        }
      } else {
        return require("../../assets/seatAvailable.png");
      }
    },

    onOriginSelect(e) {
      this.dateSelected = null;
      this.matchedRoutes = []
      this.routeDateBookings = []
      this.bookingsSearched = false
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
      this.bookingsSearched = false
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
        this.availableDatesModal = false;
      } else {
        this.dateSelected = null;
        this.matchedRoutes = [];
      }
    },

    onDepartureTimeChange() {
      this.bookingsSearched = false
      this.routeDateBookings = [];
    },

    viewBookings() {

      
      var plaintext = `${this.selectedDepartureTime.id}|${this.dateSelected}`;
      var hash = crypto.createHash("sha1");
      hash.update(plaintext);
      var scheduleHash = hash.digest("hex");
      this.selectedScheduleHash = scheduleHash;
      getCancelledROutesbyRouteDate(this.selectedDepartureTime.id, this.dateSelected).then(res => {
        if (res.data.id) {
          this.isBusCancelled = true;
        } else {
          this.isBusCancelled = false;
        }
      })
      getAllBookingsByScheduleHash(
        scheduleHash
      ).then((res) => {
        this.routeDateBookings = res.data;
        getSeatsStatusadmin(scheduleHash).then(res => {
          this.seats = res.data
          this.bookingsSearched = true;
        })
      });
    },

    reloadData() {
      getAllBookingsByScheduleHash(
        this.selectedScheduleHash
      ).then((res) => {
       
        this.routeDateBookings = res.data;
        getSeatsStatusadmin(this.selectedScheduleHash).then(res => {
          this.seats = res.data
        })
       
      });
    },
    viewSeatDetails(seat) {
      if (seat.status !== 'driver' && seat.status !== "available") {
        this.selectedSeat = seat;
        getSeatDetailsadmin(seat.number, this.selectedScheduleHash).then(res => {
          this.selectedSeatDetails = res.data;
        })
        this.seatDetailsModal = true
      }
    },
    confirmUnblockSeat() {

      leaveSeat({
        seatNumber: this.selectedSeat.number,
        bookingId: this.selectedSeatDetails.booking.id,
        scheduleHash: this.selectedScheduleHash
      }).then(res => {

        this.reloadData()
        this.seatDetailsModal = false;

      })
    },
    openCancelBusModal() {
      this.confirmCancelBusModal = true;
    },




    viewPassengers(schedule) {
      this.selectedSchedule = schedule;
      this.passengersInSchedule = [];
      this.passengerDetailsModal = true;
      this.seatsAvailable = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ];

      getBookingsByRouteAndScheduleDate(schedule.id, this.selectedDate).then(
        (res) => {
          console.log("PAID Bookings", res.data);
          this.routeDateBookings = res.data;

          res.data.forEach((booking) => {
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


    confirmCancelBus() {
     
      addNewCancelledRouteDate({
        routeId: this.selectedDepartureTime.id,
        date: this.dateSelected,
      }).then((res) => {
        if (res.status === 201) {
          this.confirmCancelBusModal = false;
          this.viewBookings()
        }
      });
    },

    reopenBus() {
      deleteByDateAndRoute({
        routeId: this.selectedDepartureTime.id,
        date: this.dateSelected,
      }).then((res) => {
        if (res.status === 201 || res.status === 200) {
           this.viewBookings()
          getCancelledROutesbyRouteDate(this.selectedDepartureTime.id, this.dateSelected).then(res => {
            if (res.data.id) {
              this.isBusCancelled = true;
             
            } else {
              this.isBusCancelled = false;
            }
          })
        }
      });
    },
    formatTimeElapsed(time) {
      let now = new Date()
      let elapsed = new Date(time) - now
     

    return new Date(time).toLocaleTimeString()


    },
    getLocalTime(time){
      return new Date(time).toLocaleTimeString() 
    }

  },
};
</script>