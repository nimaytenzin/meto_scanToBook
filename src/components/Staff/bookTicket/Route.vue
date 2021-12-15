<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center font-nunito">
        Book Ticket
      </h1>
    </div>

    <div>
      <h2 class="text-xl mt-2">Route Details</h2>
      <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
        <div class="w-full px-2 md:w-1/2">
          <label class="block mb-1" for="formGridCode_name">Origin</label>

          <select
            class="
              w-full
              h-10
              px-3
              text-base
              placeholder-gray-600
              border
              rounded-lg
              focus:shadow-outline
            "
            v-model="originSelected"
          >
            <option
              v-for="stop in stops"
              :value="stop"
              :key="stop"
              class="bg-white"
            >
              {{ stop.name }}
            </option>
          </select>
        </div>
        <div class="w-full px-2 md:w-1/2">
          <label class="block mb-1" for="formGridCode_last">Destination</label>
          <select
            class="
              w-full
              h-10
              px-3
              text-base
              placeholder-gray-600
              border
              rounded-lg
              focus:shadow-outline
            "
            v-model="destinationSelected"
          >
            <option
              v-for="stop in stops"
              :value="stop"
              :key="stop"
              class="bg-white"
            >
              {{ stop.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="inline-flex mt-8">
        <button
          class="
            bg-gray-100
            hover:bg-gray-400
            text-gray-500
            hover:text-white
            font-bold
            py-2
            px-4
            rounded
            flex
          "
          @click="searchBus()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search for bus
        </button>
      </div>

      <div class="flex justify-center mt-5 -mx-2 space-y-4 md:space-y-0">
        <DatePicker
          v-model="date"
          :min-date="new Date()"
          @dayclick="onDayClick($event)"
          :attributes="attributes"
        />
      </div>

      <div v-if="busAvailable">
        <h2 class="mb-4 flex gap-2 text-sm font-light items-center">
          <span class="block rounded-full h-2 w-2 bg-green-700"> </span>
          Bus available
        </h2>

        <button
          class="
            bg-gray-100
            hover:bg-gray-400
            text-gray-500
            hover:text-white
            font-bold
            py-2
            px-4
            rounded
            flex
          "
          @click="viewSch()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          View Schedules
        </button>
      </div>

      <div class="flex flex-wrap mt-5" v-if="schedules.length !== 0">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
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
              </th>
              <th
                scope="col"
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
                Fare
              </th>
              <th
                scope="col"
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
              </th>
            </tr>
          </thead>
          <tbody
            class="bg-white divide-y divide-gray-200"
            v-for="schedule in schedules"
            :key="schedule"
          >
            <tr
              @click="commitSchedule(schedule)"
              :class="tableRowColor(schedule)"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                {{ getdepTime(schedule.route?.departureTime) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                Nu. {{ schedule.route?.fare }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <button
                    class="
                      rounded-l
                      py-1
                      px-2
                      font-medium
                      text-gray-900
                      bg-gray-200
                      hover:bg-gray-300 hover:text-gray-900
                      active:bg-grey-900
                    "
                    @click="openSeatSelect(schedule)"
                  >
                    Book
                  </button>
                  <button
                    class="
                      rounded-r
                      py-1
                      px-2
                      font-medium
                      text-gray-900
                      bg-gray-200
                      hover:bg-gray-300 hover:text-gray-900
                      active:bg-grey-900
                    "
                    @click="viewPassengers(schedule)"
                  >
                    Passengers
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <vue-final-modal
      v-model="seatSelectModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center mt-5">
        <h3 class="text-xl">Book?</h3>
        <p class="text-center">Booked Seats</p>

        <p v-if="total">Total: Nu {{ total }}</p>
        <div class="flex flex-row justify-center">
          <div
            v-for="bookedSeat in bookedSeats"
            :key="bookedSeat"
            class="m-1 p-1 rounded relative"
          >
            <img src="../../../assets/seatUnavailable.png" width="50" alt="" />
            <p
              class="
                absolute
                top-1/2
                left-1/2
                bg-white bg-opacity-60
                rounded-sm
                pl-1
                pr-1
                transform
                -translate-x-1/2 -translate-y-1/2
              "
            >
              {{ bookedSeat.number }}
            </p>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="bg-white grid grid-cols-4 gap-2 p-3 m-3 rounded border">
            <div
              v-for="item in seats"
              :key="item"
              class="rounded relative"
              @click="addSeat(item)"
            >
              <img
                :src="bindImage(item)"
                alt="Seat "
                class="object-contain w-12 z-0 cursor-pointer"
                rel="preload"
                v-if="item.type == 'seat' || item.type === 'driver'"
              />
              <p
                class="
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
                "
              >
                {{ item.number ? item.number : "" }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="addPassengerDetails()"
        >
          Add Passenger Details
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="closeSeatSelectModal()"
        >
          Cancel
        </button>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="confirmSeatModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center mt-5">
        <h3 class="text-xl">Book?</h3>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="confirmSeat()"
        >
          confirm
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="cancelSeat()"
        >
          cancel
        </button>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="addPassengerDetailsModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center">
        <div class="flex flex-col">
          <div class="flex-1 text-center">
            <p class="text-xl font-semibold text-gray-600">
              Enter Passenger Details
            </p>
            <p class="text-center font-thin text-sm">
              Please Ensure Phone Numbers are Correct
            </p>
            <div class="flex flex-col justify-center items-center">
              <div
                class="flex flex-row gap-2 items-center"
                v-for="(item, index) in bookedSeats"
                :key="item"
              >
                <div class="p-1 rounded relative">
                  <img
                    src="../../../assets/seatUnavailable.png"
                    width="50"
                    alt=""
                  />
                  <p
                    class="
                      absolute
                      top-1/2
                      left-1/2
                      bg-white bg-opacity-60
                      rounded-sm
                      pl-1
                      pr-1
                      transform
                      -translate-x-1/2 -translate-y-1/2
                    "
                  >
                    {{ item.number }}
                  </p>
                </div>
                <div class="flex flex-col mt-4">
                  <p class="my-1 text-gray-800 font-thin">
                    Passenger {{ index + 1 }}
                  </p>
                  <!-- <select v-model="passengers[index].seatNumber">
                    <option
                     :value="item.number">{{ item.number }}</option>
                  </select> -->
                  <input
                    v-model="passengers[index].name"
                    placeholder="Name"
                    class="
                      appearance-none
                      border-b
                      rounded-sm
                      w-full
                      py-2
                      px-2
                      text-gray-700
                      leading-tight
                      focus:outline-none focus:shadow-outline
                    "
                  />
                  <input
                    v-model="passengers[index].contact"
                    type="number"
                    placeholder="Contact"
                    class="
                      appearance-none
                      border-b
                      rounded
                      w-full
                      py-2
                      px-2
                      text-gray-700
                      leading-tight
                      focus:outline-none focus:shadow-outline
                    "
                  />
                  <input
                    v-model="passengers[index].cid"
                    placeholder="CID/EID/WorkPermit"
                    class="
                      appearance-none
                      border-b
                      rounded
                      w-full
                      py-2
                      px-2
                      text-gray-700
                      leading-tight
                      focus:outline-none focus:shadow-outline
                    "
                  />
                </div>
              </div>
            </div>

            <hr class="w-full border-dotted border-1 border-gray-500 my-2" />

            <p class="text-xl my-1 font-semibold text-gray-600">
              Payment Details
            </p>
            <div
              class="
                font-nunito
                text-gray-200 text-left
                bg-gray-600
                rounded
                shadow-md
                p-2
              "
            >
              <p>Billing</p>

              <hr class="border-dashed w-full" />
              <table class="table-auto">
                <tr>
                  <td>Base Fare :</td>
                  <td>
                    Nu
                    {{ fare }}
                  </td>
                </tr>
                <tr>
                  <td>Service Charge :</td>
                  <td>Nu {{ serviceCharge }}</td>
                </tr>
                <tr>
                  <td>Seats Booked :</td>
                  <td>{{ bookedSeats.length }}</td>
                </tr>
                <tr>
                  <td>
                    <hr class="w-full border-dashed" />
                  </td>
                  <td></td>
                </tr>
                <tr class="text-gray-100 font-bold text-xl">
                  <td>Total :</td>
                  <td>
                    {{ total }}
                  </td>
                </tr>
              </table>
              <p class="text-sm break-words">
                Fare Calculation <br />
                (Base Fare + Service Charge) x Booked Seats
              </p>
            </div>

            <div class="mt-4">
              <p class="text-xl font-semibold text-gray-600">
                Select Payment Mode
              </p>
              <select
                class="
                  w-full
                  h-10
                  px-3
                  text-base
                  placeholder-gray-600
                  border
                  rounded-lg
                  focus:shadow-outline
                "
                v-model="modality"
              >
                <option value="MBOB" class="bg-white">MBoB</option>
                <option value="CASH" class="bg-white">Cash</option>
              </select>

              <input
                v-if="paymentMode"
                v-model="journalNumber"
                type="text"
                placeholder="Journal Number"
                class="
                  appearance-none
                  border-b
                  rounded-sm
                  w-full
                  py-2
                  px-2
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                "
              />
            </div>
          </div>
        </div>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="confirmBooking()"
        >
          Confirm Booking
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="cancelBooking()"
        >
          cancel
        </button>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="reverSeatModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center mt-5">
        <h3 class="text-xl">Cancel Seat Booking?</h3>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="confirmRevert()"
        >
          Remove Seats from booking
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="cancelRevert()"
        >
          cancel
        </button>
      </div>
    </vue-final-modal>
    <vue-final-modal
      v-model="errorModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="text-center mt-5">
        <h3 class="text-xl font-nunito font-thin">Connecting to Services</h3>
      </div>
    </vue-final-modal>

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
          <p>
            <span class="text-2xl font-bold">{{ originSelected.name }}</span> to
            <span class="text-2xl font-bold">{{
              destinationSelected.name
            }}</span>
          </p>
          <p>On</p>
          <p>{{ date }} at</p>
          <p>{{ selectedSchedule.route?.departureTime }}</p>
          <div class="text-xl">
            Fare: Nu.{{ selectedSchedule.route?.fare }} <br />
            <p>Seats Remaining: {{ seatsAvailable.length }}</p>
            <div class="flex gap-2 justify-center">
              <p v-for="seat in seatsAvailable" :key="seat">
                {{ seat }}
              </p>
            </div>
          </div>
        </div>
        <h3 class="text-xl px-6 font-thin">Passengers</h3>

 <thead>
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
                  Seat Number
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
                  Name
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
                  CID
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
                  Contact
                </td>
              </tr>
            </thead>

        <div class="p-2 flex overflow-scroll" style="height:40vh">
          <table
            class="
              min-w-full
              divide-y divide-gray-200
              text-gray-900
              font-thin
              bg-white
            "
            v-if="passengersInSchedule.length"
          >
           
            <tbody class="overflow-y-scroll" style="50vh">
              <tr v-for="passenger in passengersInSchedule" :key="passenger">
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ passenger.bookedSeat.seatNumber }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ passenger.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ passenger.cid }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ passenger.contact }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </vue-final-modal>
  </div>
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
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
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
import { Calendar, DatePicker } from "v-calendar";
import { getAllStops } from "../../../services/stopServices";
import {
  getPassengerDataBySchedule,
  getScheduleByRouteAndDate,
} from "../../../services/scheduleServices";
import { getRoutesByOriginDestination } from "../../../services/routeServices";
import { addNewBooking } from "../../../services/bookingServices";
import { getServiceCharge } from "../../../services/paymentServices";
export default {
  data() {
    return {
      stops: [],
      originSelected: {},
      passengers: [],
      destinationSelected: {},
      serviceCharge: 0,
      passengerDetailsModal: false,
      date: "",
      schedules: [],
      journalNumber: null,
      seatSelectModal: false,
      routeHash: {
        0: 2, //monday
        1: 3, //tuesday
        2: 4, //wednesday
        3: 5, // thrus
        4: 6, //fri
        5: 7, //sat
        6: 1, // sun
      },
      seats: [
        { id: 1, number: 1, type: "seat", status: "available" },
        { id: 2, number: 0, type: "notSeat", status: "available" },
        { id: 3, number: 0, type: "notSeat", status: "available" },
        { id: 4, number: 0, type: "notseat", status: "available" },
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
      bookedSeats: [],
      scheduleId: 0,
      seatSelected: {},
      confirmSeatModal: false,
      addPassengerDetailsModal: false,
      total: 0,
      fare: 0,
      reverSeatModal: false,
      matchedRoutes: [],
      routeDays: [],
      connectionAttempt: 0,
      errorModal: false,
      attributes: [],
      days: [],
      routes: [],
      selectedSchedule: {},
      modality: "CASH",
      passengersInSchedule: [],
      seatsAvailable: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ],
      busAvailable: false,
    };
  },
  computed: {
    paymentMode() {
      if (this.modality === "MBOB") {
        return true;
      } else {
        false;
      }
    },
  },
  created() {
    getServiceCharge().then((res) => {
      this.serviceCharge = res.data.serviceCharge;
    });
    getAllStops()
      .then((res) => {
        this.stops = res;
      })
      .catch((err) => console.log(err));
  },
  components: {
    Calendar,
    DatePicker,
  },
  methods: {
    onDayClick(e) {
      if (e.popovers[0] && e.popovers[0].label === "Bus Availble") {
        this.date = e.id + " 00:00:00";
        this.busAvailable = true;
      } else {
        this.busAvailable = false;
        this.schedules = [];
        this.$toast.show(`No Bus Availble`, {
          position: "top",
          type: "error",
        });
      }
    },
    next() {
      this.$router.push("/staff/seats");
    },
    commitSchedule(e) {
      this.selectedSchedule = e;
      this.$store.commit("commitSchedule", e);
    },
    changeSeatStatus() {
      this.lockedSeats.forEach((seatNum) => {
        let matchedSeat = this.getSeats(seatNum);
        if (matchedSeat.status !== "booked") {
          matchedSeat.status = "locked";
        }
      });
    },
    searchBus() {
      this.attributes = [];
      console.log(this.originSelected, this.destinationSelected);
      getRoutesByOriginDestination(
        this.originSelected.id,
        this.destinationSelected.id
      )
        .then((res) => {
          console.log("ROUTES DATA", res);
          if (res.data && res.status === 200) {
            res.data.forEach((routePath) => {
              routePath.routes.forEach((route) => {
                this.routes.push(route);
                route.routeDays.forEach((routeDay) => {
                  if (this.days.indexOf(this.routeHash[routeDay.day]) === -1) {
                    this.days.push(this.routeHash[routeDay.day]);
                  }
                });
              });
            });
            console.log("ROUTE DAYS", this.days);
            if (this.days) {
              this.attributes = [
                {
                  dot: "green",
                  dates: { weekdays: this.days },
                  popover: {
                    label: "Bus Availble",
                  },
                },
              ];
            } else {
              this.attributes = [];
            }
          } else {
            this.attributes = [
              {
                dot: "green",
                dates: { weekdays: [] },
                popover: {
                  label: "Bus Availble",
                },
              },
            ];
          }
        })
        .catch((err) => console.log(err));
    },
    connectWs() {
      this.conn = new WebSocket(
        `${process.env.VUE_APP_WSS}/${this.scheduleId}`
      );
      this.conn.onopen = (event) => {
        this.isConnected = true;
        this.connectionAttempt = 0;
        this.errorModal = false;
        this.isLoader = false;
        console.log("Successfully connected to the echo websocket server");
      };

      this.conn.onclose = (evt) => {
        if (!this.isLoader) {
          this.errorModal = true;
          this.isLoader = true;
        }

        this.connectionAttempt++;
        console.log("WSS CONNECTION closed");
        console.log("RECONNECTING");
        this.isConnected = false;
        if (!this.isConnected) {
          setTimeout(() => {
            console.log(this.connectionAttempt);
            if (this.connectionAttempt === 7) {
              this.errorModal = false;
              this.isLoader = false;
              this.$router.push("/service-down");
            } else {
              this.connectWs();
            }
          }, 1000);
        }
      };
      this.conn.onmessage = (evt) => {
        let messageJson = JSON.parse(evt.data);
        if (messageJson.messageType === "LOCK") {
          console.log("LOCK MESSAGE RECIEVED");
          this.lockedSeats = messageJson.lockedList;

          this.changeSeatStatus();
          console.log(messageJson);
        } else if (messageJson.messageType === "LOCK_LEAVE") {
          console.log("LOCK LEAVE RECIEVED");
          console.log(messageJson);
          this.reverSeatStatus(messageJson.leaveList);
        } else if (messageJson.messageType === "LOCK_CONFIRM") {
        }
      };
    },

    openSeatSelect(schedule) {
      this.scheduleId = schedule.id;
      this.fare = schedule.route.fare;
      this.errorModal = true;
      this.isLoader = true;
      this.connectWs();

      this.seatSelectModal = true;
    },
    viewPassengers(schedule) {
      this.passengerDetailsModal = true;
      getPassengerDataBySchedule(schedule.id).then((res) => {
        this.passengersInSchedule = res.data.passengers;
        console.log("PASSENGERS", res.data);
        this.passengersInSchedule.forEach((passenger) => {
          let index = this.seatsAvailable.indexOf(
            passenger.bookedSeat.seatNumber
          );
          if (index !== -1) {
            this.seatsAvailable.splice(index, 1);
          }
        });
      });
    },
    bindImage(seat) {
      if (seat.type === "seat") {
        switch (seat.status) {
          case "available":
            return require("../../../assets/seatAvailable.png");
            break;
          case "booked":
            return require("../../../assets/seatUnavailable.png");
            break;
          case "driver":
            return require("../../../assets/steeringwheel.png");
            break;
          case "locked":
            return require("../../../assets/seatSelected.png");
            break;
          default:
            return require("../../../assets/seatAvailable.png");
            break;
        }
      } else {
        return require("../../../assets/seatAvailable.png");
      }
    },
    addSeat(seat) {
      if (seat.type === "seat") {
        this.seatSelected = seat;
        if (seat.status === "locked") {
          this.$toast.show("The seat is being booked", {
            position: "top",
            type: "error",
          });
        } else if (seat.status === "booked") {
          this.reverSeatModal = true;
        } else {
          this.conn.send(
            JSON.stringify({
              roomId: this.scheduleId.toString(),
              messageType: "LOCK",
              seatId: seat.number.toString(),
            })
          );
          this.confirmSeatModal = true;
        }
      }
    },

    reverSeatStatus(arr) {
      arr.forEach((element) => {
        let matchedSeat = this.getSeats(parseInt(element));
        matchedSeat.status = "available";
      });
    },

    getSeats(id) {
      for (let i = 0; i < this.seats.length; i++) {
        if (this.seats[i].number === id) {
          return this.seats[i];
        }
      }
      return null;
    },
    confirmRevert() {
      this.conn.send(
        JSON.stringify({
          roomId: this.scheduleId.toString(),
          messageType: "LOCK_LEAVE",
          seatId: this.seatSelected.number.toString(),
        })
      );
      this.seatSelected.status = "available";
      this.bookedSeats.forEach((seat, index) => {
        if (this.seatSelected.id === seat.id) {
          this.bookedSeats.splice(index, 1);
        }
      });
      this.passengers.forEach((seat, index) => {
        if (this.seatSelected.number === seat.seatNumber) {
          this.passengers.splice(index, 1);
        }
      });

      this.total -= this.fare;
      this.seatSelected = {};
      this.reverSeatModal = false;
    },
    cancelRevert() {
      this.reverSeatModal = false;
    },
    confirmSeat() {
      this.bookedSeats.push(this.seatSelected);
      this.seatSelected.status = "booked";
      console.log("BOOKED SEATS", this.bookedSeats);
      this.passengers.push({ seatNumber: this.seatSelected.number });
      this.total += this.fare + this.serviceCharge;
      this.confirmSeatModal = false;
    },
    cancelSeat() {
      console.log(this.seatSelected);
      this.conn.send(
        JSON.stringify({
          roomId: this.scheduleId.toString(),
          messageType: "LOCK_LEAVE",
          seatId: this.seatSelected.number.toString(),
        })
      );
      this.confirmSeatModal = false;
    },
    getdepTime: function (time) {
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
    addPassengerDetails() {
      if (this.bookedSeats.length) {
        this.addPassengerDetailsModal = true;
      } else {
        this.$toast.show("Please select Seat", {
          type: "error",
          position: "top",
        });
      }
    },

    confirmBooking() {
      alert("Add Data Validation Here!");

      // let seats =[]
      // this.bookedSeats.forEach(seat =>{
      //   seats.push(seat.number)
      // })
      let newBooking = {
        booking: {
          scheduleId: this.scheduleId,
          modality: this.modality,
          amount: this.total,
          journalNumber: this.journalNumber,
        },
        // seats: seats,
        passengers: this.passengers,
      };
      console.log(newBooking);
      addNewBooking(newBooking).then((res) => {
        if (res.status === 201) {
          this.$toast.show("Successful", {
            position: "top",
            type: "success",
          });
          this.seatSelectModal = false;
          this.confirmSeatModal = false;
          this.addPassengerDetailsModal = false;
          this.$router.push(`/staff/ticket/${res.data.id}`);
        } else {
          this.$toast.show("Newtork Error..try again", {
            position: "top",
            type: "error",
          });
        }
      });
      // if (this.customerName && this.customerContact && this.customerCid) {
      //   let bookingDto = {
      //     booking: {
      //       scheduleId: this.scheduleId,
      //       bookingTime: new Date(),
      //       customerName: this.customerName,
      //       customerContact: this.customerContact,
      //       customerCid: this.customerCid,
      //       amount: this.total,
      //     },
      //     seats: [],
      //   };
      //   this.bookedSeats.forEach((seat) => {
      //     bookingDto.seats.push(seat.number);
      //   });
      //   addNewBooking(bookingDto).then((res) => {
      //     if (res.status === 201) {
      //       this.$toast.show("Successful", {
      //         position: "top",
      //         type: "success",
      //       });
      //       this.seatSelectModal = false;
      //       this.confirmSeatModal = false;
      //       this.addPassengerDetailsModal = false;
      //       this.$router.push(`/staff/ticket/${res.data.id}`);
      //     }
      //   });
      // } else {
      //   this.$toast.show("All fields are mandatory", {
      //     position: "top",
      //     type: "error",
      //   });
      // }
    },
    cancelBooking() {
      this.passengers = [{}];
      this.addPassengerDetailsModal = false;
    },
    closeSeatSelectModal() {
      this.bookedSeats.forEach((seat) => {
        this.getSeats(seat.number).status = "available";
        this.conn.send(
          JSON.stringify({
            roomId: this.scheduleId.toString(),
            messageType: "LOCK_LEAVE",
            seatId: seat.number.toString(),
          })
        );
      });
      this.total = 0;
      this.seatSelected = {};
      this.bookedSeats = [];
      this.seatSelectModal = false;
    },

    tableRowColor(e) {
      if (e.id === this.selectedSchedule.id) {
        return "bg-gray-300 text-black ";
      }
      return "bg-white";
    },

    viewSch() {
      this.schedules = [];
      this.routes.forEach((route) => {
        getScheduleByRouteAndDate(route.id, this.date).then((res) => {
          if (res.data) {
            let schedule = res.data;
            schedule.route = route;
            this.schedules.push(schedule);
            console.log("SCHEDULE FOR DATE", this.schedules);
          } else {
            this.$toast.show("No buses on the selected day", {
              type: "error",
              position: "top",
            });
          }
        });
      });
      // getScheduleByRouteAndDate()

      // if (this.originSelected && this.destinationSelected && this.date) {
      //   let formattedDate = this.date + +" 00:00:00";
      //   let matchedRouteIds = [];
      //   getRoutesByOriginDestination(
      //     this.originSelected.id,
      //     this.destinationSelected.id
      //   ).then((res) => {
      //     console.log(res)
      //     res.data.forEach((element) => {
      //       matchedRouteIds.push(element.id);
      //     });
      //   });
      //   getDetailsByDate(formattedDate).then((res) => {
      //     console.log("okokok")
      //     console.log(res)
      //     let matchRouteSchedule = [];
      //     if (res.length) {
      //       res.forEach((element) => {
      //         matchedRouteIds.forEach((route) => {
      //           if (route === element.routeId) {
      //             matchRouteSchedule.push(element);
      //           }
      //         });
      //       });
      //       this.schedules = matchRouteSchedule;
      //     } else {
      //       this.$toast.show("No buses on the selected day", {
      //         type: "error",
      //         position: "top",
      //       });
      //     }
      //   });
      // } else {
      //   this.$toast.show("Select Origin/Destination & Date", {
      //     type: "error",
      //     position: "top",
      //   });
      // }
    },
  },
};
</script>