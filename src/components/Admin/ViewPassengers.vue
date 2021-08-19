<template>
  <div>
    <div
      class="min-h-screen flex flex-col items-center sm:ml2 sm:mr2"
      v-if="!scheduleStatus"
    >
      <div>
        <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
      </div>
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-3xl text-gray-500 text-center font-nunito">
          Schedule Details
        </h1>
      </div>

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
            <div class="text-lg">Available</div>
            <div class="text-4xl text-white font-bold">
              {{ seatsAvailable.length }}
            </div>
          </div>
          <div class="my-auto">
            <div class="text-lg">Booked</div>
            <div class="text-4xl text-white font-bold">
              {{ 19 - seatsAvailable.length }}
            </div>
          </div>
        </div>
        <div class="text-md">
          <p>Origin: {{ scheduleData.route.origin.name }}</p>
          <p>Destination: {{ scheduleData.route.destination.name }}</p>
          <p>
            Departure Date:
            {{
              scheduleData.calendarDate?.Month_Name
                ? scheduleData.calendarDate.Month_Name
                : ""
            }}
            {{
              scheduleData.calendarDate?.Calendar_Day
                ? scheduleData.calendarDate.Calendar_Day
                : ""
            }}
            {{
              scheduleData.calendarDate?.Calendar_Year
                ? scheduleData.calendarDate.Calendar_Year
                : ""
            }}
          </p>
          <p>
            Departure Time:
            {{
              getdepTime(
                scheduleData.route.departureTime
                  ? scheduleData.route.departureTime
                  : ""
              )
            }}
          </p>
          <p>Fare: Nu {{ scheduleData.route.fare }}</p>
          <p>
            Bus:
            {{
              scheduleData.bus?.vechileNumber
                ? scheduleData.bus.vechileNumber
                : "Bus Not assigned"
            }}
          </p>
          <hr class="border mt-2 mb-2" />
          Seats Available
          <p class="text-xl">
            {{ seatsAvailable }}
          </p>
        </div>

        <div class="inline-flex" role="group" aria-label="Button group">
          <button
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
            @click="cancelBus()"
          >
            Cancel Bus
          </button>
        </div>
      </div>

      <!--  -->

      <div class="mt-4" v-if="scheduleData.bookings.length">
        <h2 class="text-center text-xl font-semibold">Booking Details</h2>
        <table class="min-w-full divide-y divide-gray-200">
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
                Passenger Details
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
                Booked Seats
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
              v-for="booking in scheduleData.bookings"
              :key="booking"
              class="hover:bg-gray-200"
            >
              <td class="px-2 py-4 whitespace-nowrap">
                {{ booking.id }}
              </td>
              <td class="px-2 py-4 whitespace-nowrap">
                <tr>
                  <td>Name</td>
                  <td>{{ booking.customerName }}</td>
                </tr>
                <tr>
                  <td>CID</td>
                  <td>
                    {{ booking.customerCid }}
                  </td>
                </tr>
                <tr>
                  <td>Contact:</td>
                  <td>
                    {{ booking.customerContact }}
                  </td>
                </tr>
              </td>

              <td>
                <div class="flex flex-row justify-around">
                  <div
                    v-for="bookedSeat in booking.bookedSeats"
                    :key="bookedSeat"
                    class="m-1 p-1 rounded relative"
                  >
                    <img
                      src="../../assets/seatUnavailable.png"
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
                      {{ bookedSeat.seatNumber }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-2 py-4 whitespace-nowrap">
                <button
                  class="
                    bg-gray-300
                    hover:bg-gray-400
                    text-gray-800
                    font-bold
                    py-2
                    px-4
                    rounded-l
                  "
                  @click="openTransferBookingModal(booking)"
                >
                  Transfer
                </button>
                <button
                  class="
                    bg-gray-300
                    hover:bg-gray-400
                    text-gray-800
                    font-bold
                    py-2
                    px-4
                    rounded-r
                  "
                  @click="openCancelBookingModal(booking)"
                >
                  Cancel Booking
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
          "
          @click="addOrigin(originSelected)"
        >
          Schedules
        </button>
      </div>
    </div>

    <div
      class="
        min-h-screen
        flex flex-col
        items-center
        justify-center
        sm:ml2
        sm:mr2
      "
      v-else
    >
      <div>
        <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
      </div>
      <div class="flex flex-col justify-center items-center m-10 mb-10">
        <h1 class="text-3xl text-red-500 font-bold text-center font-nunito">
          Schedule Cancelled
        </h1>
      </div>

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
        <div class="text-md">
          Details
          <p>Origin: {{ scheduleData.route.origin.name }}</p>
          <p>Destination: {{ scheduleData.route.destination.name }}</p>
          <p>Departure Date and time: {{}}</p>
          <p>Fare: {{ scheduleData.route.fare }}</p>
          <p>
            Bus:
            {{
              scheduleData.bus?.vechileNumber
                ? scheduleData.bus.vechileNumber
                : "Bus Not assigned"
            }}
          </p>
        </div>
      </div>
    </div>

    <vue-final-modal
      v-model="transferSelectedModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
    >
      <div class="modal__content text-center mt-1 flex flex-col gap-3">
        <h3 class="text-xl">Transfer Booking</h3>
        <p>
          Passenger Name:
          <span class="font-bold text-xl"
            >{{ selectedBooking.customerName }}
          </span>
        </p>

        <p class="text-center">Booked Seats</p>
        <div class="flex flex-row justify-center">
          <div
            v-for="bookedSeat in selectedBooking.bookedSeats"
            :key="bookedSeat"
            class="m-1 p-1 rounded relative"
          >
            <img src="../../assets/seatUnavailable.png" width="50" alt="" />
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
              {{ bookedSeat.seatNumber }}
            </p>
          </div>
        </div>

        <hr class="border mt-2 mb-2" />

        <div class="flex">
          <label class="text-sm text-left text-gray-400 italic"> Origin</label>
          <select
            class="text-3xl p-5 bg-white text-blue-900"
            v-model="transferOrigin"
          >
            <option
              v-for="origin in stops"
              :value="origin"
              :key="origin"
              class="bg-white"
            >
              {{ origin.name }}
            </option>
          </select>

          <label class="text-sm text-left text-gray-400 italic">
            Destination</label
          >
          <select
            class="text-3xl p-5 bg-white text-blue-900"
            v-model="transferDestination"
          >
            <option
              v-for="destination in stops"
              :value="destination"
              :key="destination"
              class="bg-white"
            >
              {{ destination.name }}
            </option>
          </select>
        </div>
        <div class="flex justify-center">
          <button
            type="button"
            class="
              btn-outline-primary
              transition
              duration-300
              ease-in-out
              focus:outline-none
              focus:shadow-outline
              border border-purple-700
              hover:bg-purple-700
              text-purple-700
              hover:text-white
              font-normal
              py-2
              px-4
              rounded
            "
            @click="populateRouteDays()"
          >
            Search Buses
          </button>
        </div>

        <div class="flex flex-col items-center gap-3 justify-center">
          <DatePicker
            v-model="transferDate"
            :min-date="new Date()"
            @dayclick="onDayClick($event)"
            :attributes="attributes"
          />

          <button
            type="button"
            class="
              btn-outline-primary
              transition
              duration-300
              ease-in-out
              focus:outline-none
              focus:shadow-outline
              border border-purple-700
              hover:bg-purple-700
              text-purple-700
              hover:text-white
              font-normal
              py-2
              px-4
              rounded
            "
            @click="searchTransferSchedules()"
          >
            View Schedule
          </button>
        </div>

        <hr />

        <div v-if="showSchedulesTable" class="flex flex-col">
          <label class="text-sm text-center text-gray-400 italic"
            >Schedules</label
          >
          <table class="min-w-full divide-y divide-gray-200">
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
                  Departure Time
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
                  Fare
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
                  Select
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody
              v-for="schedule in matchedTransferSchedules"
              :key="schedule"
              class="bg-white divide-y divide-gray-200"
            >
              <tr class="hover:bg-gray-200">
                <td class="px-6 py-2 whitespace-nowrap">
                  {{ schedule.route.departureTime }}
                </td>
                <td class="px-6 py-2 whitespace-nowrap">
                  Nu {{ schedule.route.fare }}
                </td>
                <td class="px-6 py-2 whitespace-nowrap">
                  <button
                    @click="selectTransferSchedule(schedule)"
                    class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
                  >
                    Select Schedule
                  </button>
                </td>
                <td>
                  <div v-if="computeTableSelect(schedule)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr class="border mt-3 mb-3" />

          <div class="text-left ml-6" v-if="selectedTransferSchedule.id">
            <h2>
              New Schedule Time :
              <span class="text-xl font-semibold">
                {{
                  selectedTransferSchedule.route?.departureTime
                    ? selectedTransferSchedule.route.departureTime
                    : ""
                }}
              </span>
            </h2>

            <h2>
              New Schedule Date :
              <span class="text-xl font-semibold">
                {{ selectedDate }}
              </span>
            </h2>

            <div class="inline-flex mt-2">
              <button
                v-if="seatsToTransfer - transferSeats.length"
                class="
                  py-2
                  px-4
                  rounded
                  cursor-default
                  text-red-400
                  font-light
                  text-center
                "
              >
                Select {{ seatsToTransfer - transferSeats.length }} seats
              </button>
              <button
                class="
                  bg-gray-200
                  hover:bg-gray-400
                  text-gray-500
                  hover:text-white
                  font-bold
                  py-2
                  px-4
                  rounded-l
                "
                @click="showSelectSeats()"
              >
                Select Seats
              </button>
            </div>
            <h2 class=""></h2>

            <div
              v-if="transferSeats.length"
              class="flex flex-row justify-center items-center"
            >
              <div
                v-for="item in transferSeats"
                :key="item"
                class="m-1 p-1 rounded relative"
              >
                <img src="../../assets/seatUnavailable.png" width="50" alt="" />
                <p
                  class="
                    absolute
                    top-1/2
                    left-1/2
                    transform
                    -translate-x-1/2 -translate-y-1/2
                  "
                >
                  {{ item.number }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center" v-if="showSeats">
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
          @click="transferPassenger()"
        >
          Transfer Passenger to selected schedule
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="transferSelectedModal = false"
        >
          cancel
        </button>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="addSeatModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center mt-5">
        <h3 class="text-xl">Book?</h3>

        <h3 class="text-2xl">Seat No {{ selectedTransferSeat.number }}</h3>
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
      v-model="confirmTransferModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center mt-5">
        <h3 class="text-xl">Transfer?</h3>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="confirmPassengerTransfer()"
        >
          confirm
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="cancelPassengerTransfer()"
        >
          cancel
        </button>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="cancelBookingModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
    >
      <div class="modal__content text-center mt-1 flex flex-col gap-3">
        <h3 class="text-xl">Cancel Booking?</h3>

        <div>
          <h1>
            Passenger Name :
            {{ selectedBooking.customerName }}
          </h1>

          <div class="flex flex-row justify-center items-center">
            <div
              v-for="item in selectedBooking.bookedSeats"
              :key="item"
              class="m-1 p-1 rounded relative"
            >
              <img src="../../assets/seatUnavailable.png" width="50" alt="" />
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
                {{ item.seatNumber }}
              </p>
            </div>
          </div>

          <div></div>
        </div>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="cancelBooking()"
        >
          Ok
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="cancelBookingModal = false"
        >
          cancel
        </button>
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
  getPassengerData,
  updateSchedule,
} from "../../services/scheduleServices";
import { cancelBooking, updateBooking } from "../../services/bookingServices";
import { updateBookedSeat } from "../../services/bookedseatsService";
import { getAllStops } from "../../services/stopServices";
import { getScheduleByDate } from "../../services/scheduleServices";
import { getRoutesByOriginDestination } from "../../services/routeServices";
import { useLoading } from "vue3-loading-overlay";
import moment from "moment";
export default {
  data() {
    return {
      scheduleId: null,
      //check if schedule is cancelled or not
      scheduleStatus: 0,
      socketConnection: null,
      //modal
      cancelBookingModal: false,
      transferSelectedModal: false,
      confirmTransferModal: false,
      //transfer booking logic vars

      selectedBooking: {},
      seatsToTransfer: 0,

      //transfer schedule vars
      matchedRoutes: [],
      transferOrigin: {},
      transferDestination: {},
      transferDate: null,
      selectedTransferSchedule: {},
      transferSchedules: [],
      matchedTransferSchedules: [],
      transferSeats: [],
      selectedTransferSeat: {},
      //Seat state
      lockedSeats: [],
      addSeatModal: false,
      showSeats: false,
      showSchedulesTable: false,
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
      scheduleData: {
        route: {
          origin: {},
          destination: {},
        },
        calendarDate: {
          Month_Name: "",
          Calendar_Day: 0,
          Calendar_Year: 0,
        },
        bookings: [],
      },

      stops: [],
      routeDays: [],
    };
  },
  methods: {
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
    getSeats(number) {
      for (let i = 0; i < this.seats.length; i++) {
        if (this.seats[i].number === number) {
          return this.seats[i];
        }
      }
      return null;
    },
    matchBookedSeat(id) {
      // let bookedSeats = this.$store.state.selectedSeats;
      // console.log(bookedSeats);
      // for (let i = 0; i < bookedSeats.length; i++) {
      //   if (bookedSeats[i].number === id) {
      //     return bookedSeats[i];
      //   }
      // }
      // return null;
    },
    bindImage(seat) {
      if (seat.type === "seat") {
        switch (seat.status) {
          case "available":
            return require("../../assets/seatAvailable.png");
            break;
          case "booked":
            return require("../../assets/seatUnavailable.png");
            break;
          case "driver":
            return require("../../assets/steeringwheel.png");
            break;
          case "locked":
            return require("../../assets/seatSelected.png");
            break;
          default:
            return require("../../assets/seatAvailable.png");
            break;
        }
      } else {
        return require("../../assets/seatAvailable.png");
      }
    },
    changeSeatStatus() {
      this.lockedSeats.forEach((seatNum) => {
        let matchedSeat = this.getSeats(seatNum);
        if (matchedSeat.status !== "booked") {
          matchedSeat.status = "locked";
        }
      });

      // if (this.transferSeats.length) {
      //   this.lockedSeats.forEach((seatNumber) => {
      //     this.transferSeats.forEach((seat) => {
      //       if (seatNumber === seat.number) {
      //         this.getSeats(seatNumber).status = "booked";
      //       } else {
      //         this.getSeats(seatNumber).status = "locked";
      //       }
      //     });
      //   });
      // } else {
      //   this.lockedSeats.forEach((seatNumber) => {
      //     this.getSeats(seatNumber).status = "locked";
      //   });
      // }
    },
    cancelBus() {
      updateSchedule(this.scheduleId, {
        isFinished: 2,
      }).then((res) => {
        if (res.status === 200) {
          this.scheduleData.bookings.forEach((booking) => {
            cancelBooking(booking.bookingId, {
              checkInStatus: "CANCELLED",
            })
              .then((res) => {
                if (res.status === 200) {
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
          this.refreshData();
          this.$toast.show(
            "Bus Schedule Cancelled, SMS alert sent to passengers"
          );
        }
      });
    },

    openBookingsModal(booking, bookedSeat) {
      this.selectedBooking = booking;
      this.cancelBookingModal = true;
    },

    reverSeatStatus(arr) {
      arr.forEach((element) => {
        let matchedSeat = this.getSeats(parseInt(element));
        // let matchedBookedSeat = this.matchBookedSeat(parseInt(element));
        matchedSeat.status = "available";
      });
    },

    openCancelBookingModal(e) {
      this.selectedBooking = e;
      this.cancelBookingModal = true;
      this.socketConnection = new WebSocket(
        "ws://" + "localhost:8081" + "/ws/" + this.selectedBooking.scheduleId
      );
      this.socketConnection.onopen = (event) => {
        console.log("Successfully connected to the echo websocket server");
      };
      this.socketConnection.onclose = (evt) => {
        console.log("WSS CONNECTION closed");
        console.log("RECONNECTING");
        this.conn = new WebSocket("ws://" + "localhost:8081" + "/ws/" + roomId);
      };
    },

    cancelBooking() {
      let status = {
        checkInStatus: "CANCELLED",
      };
      cancelBooking(this.selectedBooking.id, status).then((res) => {
        if (res.status === 200) {
          this.refreshData();

          this.selectedBooking.bookedSeats.forEach((seat) => {
            this.socketConnection.send(
              JSON.stringify({
                roomId: this.selectedBooking.scheduleId.toString(),
                messageType: "LOCK_LEAVE",
                seatId: seat.seatNumber.toString(),
              })
            );
          });

          this.cancelBookingModal = false;
        }
      });
    },

    populateRouteDays() {
      this.routeDays = [];
      let loader = useLoading();
      loader.show();

      getRoutesByOriginDestination(
        this.transferOrigin.id,
        this.transferDestination.id
      )
        .then((res) => {
          res.data.forEach((element) => {
            this.matchedRoutes.push(element);
          });
        })
        .catch((err) => console.log(err));

      let days = [];
      let daysRequired = 14;

      for (let i = 1; i <= daysRequired; i++) {
        days.push(moment().add(i, "days").format("YYYY-MM-DD"));
      }

      days.forEach((day) => {
        let formattedDate = day + " 00:00:00";
        getScheduleByDate(formattedDate).then((res) => {
          let dattt = new Date(formattedDate);
          if (res.length) {
            res.forEach((ok) => {
              this.matchedRoutes.forEach((route) => {
                if (route.id === ok.routeId) {
                  let routeDay = {
                    dates: new Date(
                      dattt.getFullYear(),
                      dattt.getMonth(),
                      dattt.getDate()
                    ),
                    highlight: {
                      color: "green",
                      fillMode: "light",
                    },
                  };
                  this.routeDays.push(routeDay);
                }
              });
            });
          } else {
          }
        });
      });
      loader.hide();
      //finda all matched routes
    },

    // transferPassenger() {
    //   this.$router.push(`/admin/transfer-passengers/${this.scheduleId}`);
    // },
    transferSelectedPassenger(booking, bookedSeat) {
      this.selectedBookedSeat = bookedSeat;
      this.selectedBooking = booking;
      this.selectedBookedSeat.bookingDetails = booking;

      this.transferSelectedModal = true;
    },

    openTransferBookingModal(booking) {
      this.selectedBooking = booking;
      this.seatsToTransfer = this.selectedBooking.bookedSeats.length;

      this.transferSelectedModal = true;
    },
    transferPassenger() {
      this.confirmTransferModal = true;
      /***
       * get old booked seats id
       * update ->seat Number and schedule id to the newly selected one
       * get also the old seatId and schedule
       * {
       *  oldScehdule:{
       *      id: Oldid,
       *      booking:{
       *        id:id,
       *        scheduleId:oldScheduleId,
       *        bookedSears:[{
       *           id:same,
       *           seatNumber:OldSeatNumber
       *           scheduleId:OldScheduleId,
       *           bookingId:remainsSame
       *        }]
       *     }
       *  }
       * }
       */
    },

    cancelPassengerTransfer() {
      this.confirmTransferModal = false;
    },
    confirmPassengerTransfer() {
      let newScheduleId = this.selectedTransferSchedule.id;
      this.selectedBooking.bookedSeats.forEach((bookedSeat, index) => {
        updateBookedSeat(bookedSeat.id, {
          scheduleId: newScheduleId,
          seatNumber: this.transferSeats[index].number,
        });
      });
      updateBooking(this.selectedBooking.id, {
        scheduleId: newScheduleId,
      }).then((res) => {
        if (res.status === 200) {
          this.refreshData();
        }
      });

      this.confirmTransferModal = false;
      this.addSeatModal = false;
      this.transferSelectedModal = false;

      // console.log(this.selectedTransferSchedule)
    },

    checkBookedSeatsByScheduleAndBooking() {},
    cancelSelectedPassenger() {
      this.selectedPassengerBookings.forEach((ele) => {
        cancelBooking(ele.id).then((res) => {});
      });
    },

    //User clicks on a date and it triggers schedule search
    onDayClick(e) {
      this.transferSchedules = [];
      this.selectedDate = e.ariaLabel;
      let formattedDate = e.id + " 00:00:00";
      getScheduleByDate(formattedDate).then((res) => {
        this.transferSchedules = res;
      });
    },
    //but all the schedules dont match the route ID
    //so when we click seatch button we get the route
    // id of that origin and destination

    searchTransferSchedules() {
      if (
        this.transferOrigin.id &&
        this.transferDestination.id &&
        this.selectedDate
      ) {
        this.matchedTransferSchedules = [];
        this.matchedRoutes = [];
        getRoutesByOriginDestination(
          this.transferOrigin.id,
          this.transferDestination.id
        ).then((res) => {
          res.data.forEach((data) => {
            this.matchedRoutes.push(data);
          });
          this.transferSchedules.forEach((schedule) => {
            this.matchedRoutes.forEach((route) => {
              console.log(route, "MAtch route ID");
              if (route.id === schedule.route.id) {
                this.matchedTransferSchedules.push(schedule);
              }
            });
          });
        });
        this.showSchedulesTable = true;
      } else {
        this.$toast.show("Please select a departure Date", {
          position: "top",
          type: "error",
        });
      }
    },

    selectTransferSchedule(schedule) {
      this.selectedTransferSchedule = schedule;
      this.$toast.show("Schedule Selected", {
        position: "top",
        type: "success",
      });
    },

    //now click on select seats to trigger a wss connection
    showSelectSeats() {
      if (this.selectedTransferSchedule.id) {
        this.showSeats = true;
        //handle socket connection

        this.conn = new WebSocket(
          "ws://" + "localhost:8081" + "/ws/" + this.selectedTransferSchedule.id
        );
        this.conn.onopen = (event) => {
          console.log("Successfully connected to the echo websocket server");
        };
        this.conn.onclose = (evt) => {
          console.log("WSS CONNECTION closed");
          console.log("RECONNECTING");
          this.conn = new WebSocket(
            "ws://" +
              "localhost:8081" +
              "/ws/" +
              this.$store.state.selectedBus.id
          );
        };
        this.conn.onmessage = (evt) => {
          let messageJson = JSON.parse(evt.data);
          if (messageJson.messageType === "LOCK") {
            console.log("LOCK MESSAGE RECIEVED");
            this.lockedSeats = messageJson.lockedList;
            this.changeSeatStatus();
            console.log(messageJson);
          } else if (messageJson.messageType === "LOCK_LEAVE") {
            // console.log("LOCK LEAVE RECIEVED");
            console.log(messageJson);
            this.reverSeatStatus(messageJson.leaveList);
          } else if (messageJson.messageType === "LOCK_CONFIRM") {
          }
        };
      } else {
        this.$toast.show("Please select a schedule to transfer", {
          position: "top",
          type: "error",
        });
      }
    },
    addSeat(seat) {
      if (this.transferSeats.length < this.seatsToTransfer) {
        if (seat.type === "seat") {
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
                roomId: this.selectedTransferSchedule.id.toString(),
                messageType: "LOCK",
                seatId: seat.number.toString(),
              })
            );
            this.addSeatModal = true;
            this.selectedTransferSeat = seat;
          }
        }
      } else {
        this.$toast.show("Selection completed", {
          position: "top",
          type: "info",
        });
      }
    },
    confirmSeat() {
      this.transferSeats.push(this.selectedTransferSeat);
      this.addSeatModal = false;
    },
    cancelSeat() {
      this.conn.send(
        JSON.stringify({
          roomId: this.selectedTransferSchedule.id.toString(),
          messageType: "LOCK_LEAVE",
          seatId: this.selectedTransferSeat.number.toString(),
        })
      );
      this.addSeatModal = false;
    },
    computeTableSelect(schedule) {
      if (this.selectedTransferSchedule.id === schedule.id) {
        return true;
      } else {
        return false;
      }
    },
    refreshData() {
      getPassengerData(this.scheduleId).then((res) => {
        this.scheduleStatus = res.data.isFinished;
        this.scheduleData = res.data;
        res.data.bookings.forEach((booking, i) => {
          booking.bookedSeats.forEach((bookedSeat, i) => {
            this.seatsAvailable.forEach((seat, j) => {
              if (bookedSeat.seatNumber === this.seatsAvailable[j]) {
                this.seatsAvailable.splice(j, 1);
              }
            });
          });
        });
        this.selectedPassengerBookings = [];
      });
    },
  },
  computed: {
    depDate: () => {
      return this.getdepTime(this.scheduleData.route.departureTime);
    },

    depTime: () => {},
    attributes() {
      return [
        ...this.routeDays.map((routeDay) => ({
          dates: routeDay.dates,
          highlight: routeDay.highlight,
        })),
      ];
    },
  },

  created() {
    this.scheduleId = this.$route.params.scheduleId;

    this.seatsAvailable = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ];
    getAllStops().then((res) => {
      this.stops = res;
    });
    getPassengerData(this.scheduleId).then((res) => {
      this.scheduleStatus = res.data.isFinished;
      this.scheduleData = res.data;

      this.transferOrigin = res.data.route.origin;
      this.transferDestination = res.data.route.destination;

      res.data.bookings.forEach((booking, i) => {
        booking.bookedSeats.forEach((bookedSeat, i) => {
          this.seatsAvailable.forEach((seat, j) => {
            if (bookedSeat.seatNumber === this.seatsAvailable[j]) {
              this.seatsAvailable.splice(j, 1);
            }
          });
        });
      });
    });
  },
};
</script>