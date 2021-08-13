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

        <div class="flex flex-col items-center">
          <div class="flex mb-2">
            <button
              class="
                h-10
                px-5
                text-indigo-100
                transition-colors
                duration-100
                bg-indigo-800
                rounded-l-lg
                focus:shadow-outline
                cursor-default
              "
            >
              Actions
            </button>
            <button
              class="
                h-10
                px-5
                text-indigo-100
                transition-colors
                duration-100
                bg-indigo-700
                rounded-r-lg
                focus:shadow-outline
                hover:bg-indigo-800
              "
              @click="selectAllBookings()"
            >
              Cancel All Ticket
            </button>
          </div>
          <div class="flex gap-4">
            <p
              class="mb-2 text-xl"
              v-for="seat in selectedPassengerBookings"
              :key="seat"
            >
              {{ seat.seatNumber }}
            </p>
          </div>
        </div>
      </div>

      <!-- v-if="scheduleData.bookings.length" -->

      <div class="mt-4" >
        <h2 class="text-center text-xl font-semibold">Passenger Details</h2>
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
                Passenger Name
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
                Passenger CID
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
                Passenger Contact
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
                Seat Number
            
              </td>
              <!-- <td
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
              </td> -->
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="booking in scheduleData.bookings"
              :key="booking"
              class="hover:bg-gray-200"
            >
              
              <td class="px-2 py-4 whitespace-nowrap">
                {{ booking.customerName }}
              </td>
              <td class="px-2 py-4 whitespace-nowrap">
                {{ booking.customerCid }}
              </td>
              <td class="px-2 py-4 whitespace-nowrap">
                {{ booking.customerContact }}
              </td>

              <td>
                <tr v-for="bookedSeat in booking.bookedSeats" :key="bookedSeat">
                  <td class="px-2 py-4 whitespace-nowrap font-bold">
                      {{ bookedSeat.seatNumber}}
                  </td>
                  <td class="px-2 py-4 whitespace-nowrap">
                    <div class="inline-flex">
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
                    @click="transferSelectedPassenger(booking,bookedSeat)"
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
                    @click="openCancelSelectedTicketModa(bookedSeat)"
                  >
                    Cancel
                  </button>
                </div>

                  </td>
                </tr>
              </td>
              <!-- <td class="px-2 py-4 whitespace-nowrap">
                <div class="inline-flex">
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
                    @click="transferSelectedPassenger(bookedSeat)"
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
                    @click="openCancelSelectedTicketModa(bookedSeat)"
                  >
                    Cancel
                  </button>
                </div>
              </td> -->
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
        <h3 class="text-xl">Transfer Passenger</h3>
        <p>
          Seat :
          <span class="font-bold text-xl"
            >{{ selectedBookedSeat.seatNumber }}
          </span>
        </p>
        <p>
          Passenger Name:
          <span class="font-bold text-xl"
            >{{ selectedBookedSeat.bookingDetails.customerName }}
          </span>
        </p>

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
          <DatePicker
            v-model="transferDate"
            :min-date="new Date()"
            @dayclick="onDayClick($event)"
          />
        </div>

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
          Search Schedules
        </button>

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

          <div class="text-left ml-6">
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
          </div>
        </div>

        <div class="flex justify-center" v-if="showSeats" id="seatsLayout">
          <div class="bg-white grid grid-cols-4 gap-2 p-3 m-3 rounded border">
            <div
              v-for="item in seats"
              :key="item"
              class="rounded relative"
              @click="addSeat(item.id)"
            >
              <img
                :src="bindImage(item.id)"
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
                  transform
                  -translate-x-1/2 -translate-y-1/2
                  text-sm
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
          @click="confirmTransferSelected()"
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
      v-model="cancelSelectedTicketModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
    >
      <div class="modal__content text-center mt-1 flex flex-col gap-3">
        <h3 class="text-xl">Cancel Selected Ticket?</h3>

        <div>
          <h1>Seat Number : {{ selectedBookedSeat.seatNumber }}</h1>
          <h1>Passenger Name : {{ selectedBookedSeat.bookingDetails.customerName }}</h1>
        </div>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="cancelSelectedTickets()"
        >
          Ok
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="cancelSelectedTicketModal = false"
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
export default {
  data() {
    return {
      scheduleId: null,
      cancelSelectedTicketModal: false,


      selectedBookedSeat:{
        bookingDetails:{}
      },
      scheduleStatus: 0,
      transferOrigin: {},
      transferDestination: {},
      transferDate: null,
      transferSchedules: [],
      matchedTransferSchedules: [],
      selectedTransferSchedule: {},
      showSeats: false,
      showSchedulesTable: false,
      seats: [
        { id: 1, number: 1, type: "seat", status: "available" },
        { id: 2, type: "notSeat", status: "available" },
        { id: 3, type: "notSeat", status: "available" },
        { id: 4, type: "notseat", status: "available" },
        { id: 5, number: 2, type: "seat", status: "available" },
        { id: 6, type: "notSeat", status: "available" },
        { id: 7, number: 3, type: "seat", status: "available" },
        { id: 8, number: 4, type: "seat", status: "available" },
        { id: 9, type: "notSeat", status: "available" },
        { id: 10, type: "notSeat", status: "available" },
        { id: 11, number: 5, type: "seat", status: "available" },
        { id: 12, number: 6, type: "seat", status: "available" },
        { id: 13, number: 7, type: "seat", status: "available" },
        { id: 14, type: "notSeat", status: "available" },
        { id: 15, number: 8, type: "seat", status: "available" },
        { id: 16, number: 9, type: "seat", status: "available" },
        { id: 17, number: 10, type: "seat", status: "available" },
        { id: 18, type: "notSeat", status: "available" },
        { id: 19, number: 11, type: "seat", status: "available" },
        { id: 20, number: 12, type: "seat", status: "available" },
        { id: 21, number: 13, type: "seat", status: "available" },
        { id: 22, type: "notseat", status: "available" },
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
        bookings: []
      },
      transferSelectedModal: false,
      stops: [],
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
    getSeats(id) {
      for (let i = 0; i < this.seats.length; i++) {
        if (this.seats[i].id === id) {
          return this.seats[i];
        }
      }
      return null;
    },
    bindImage(e) {
      let seat = this.getSeats(e);
      if (seat !== null) {
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
    cancelBus() {
      updateSchedule(this.scheduleId, {
        isFinished: 2,
      }).then((res) => {
        if (res.status === 200) {
          this.scheduleData.bookedSeats.forEach((booking) => {
            cancelBooking(booking.bookingId, {
              checkInStatus: "CANCELLED",
            })
              .then((res) => {
                if (res.status === 200) {
                  console.log(12);
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

    selectTransferSchedule(schedule) {
      this.selectedTransferSchedule = schedule;
      this.showSeats = true;
    },
    openCancelSelectedTicketModa(booking) {
      this.selectedBooking = booking;
      this.cancelSelectedTicketModal = true;
    },
    cancelSelectedTickets() {
      let status = {
        checkInStatus: "CANCELLED",
      };
      cancelBooking(this.selectedBooking.id, status).then((res) => {
        if (res.status === 200) {
          this.refreshData();
        }
      });
    },
    onDayClick(e) {
      this.selectedDate = e.ariaLabel;
      let formattedDate = e.id + " 00:00:00";
      getScheduleByDate(formattedDate).then((res) => {
        this.transferSchedules = res;
      });
    },
    transferPassenger() {
      this.$router.push(`/admin/transfer-passengers/${this.scheduleId}`);
    },
    transferSelectedPassenger(booking,bookedSeat) {
      this.selectedBookedSeat=bookedSeat;
      this.selectedBookedSeat.bookingDetails = booking
      console.log(this.selectedBookedSeat)
      this.transferSelectedModal = true;
    },
    confirmTransferSelected() {
      updateBookedSeat(this.selectedBookedSeat.id, {
        scheduleId: this.selectedTransferSchedule.id,
      }).then((res) => {
        console.log(res);
        this.refreshData();
      });

      this.transferSelectedModal = false;
      this.refreshData();
      this.$toast.show("Transferred Selected Passenger", {
        type: "success",
        position: "top",
      });
    },
    cancelSelectedPassenger() {
      this.selectedPassengerBookings.forEach((ele) => {
        cancelBooking(ele.id).then((res) => {
          console.log(res);
        });
      });
    },
    selectPassenger(e) {
      console.log(e);
      this.selectedPassengerBookings.push(e);
      console.log(this.selectedPassengerBookings);
    },
    searchTransferSchedules() {
      let matchedRoutes = [];
      this.matchedTransferSchedules = [];
      getRoutesByOriginDestination(
        this.transferOrigin.id,
        this.transferDestination.id
      ).then((res) => {
        res.data.forEach((ele) => {
          matchedRoutes.push(ele.id);
          this.transferSchedules.forEach((schedule) => {
            matchedRoutes.forEach((routeId) => {
              if (routeId === schedule.routeId) {
                this.matchedTransferSchedules.push(schedule);
              }
            });
          });
        });
      });
      this.showSchedulesTable = true;
      console.log(this.matchedTransferSchedules);
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
        res.data.bookedSeats.forEach((bookedSeat, i) => {
          this.seatsAvailable.forEach((seat, j) => {
            if (res.data.bookedSeats[i].seatNumber === this.seatsAvailable[j]) {
              this.seatsAvailable.splice(j, 1);
            }
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
  },
  created() {
    this.scheduleId = this.$route.params.scheduleId;
    console.log(this.scheduleId)
    this.seatsAvailable = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ];
    getAllStops().then((res) => {
      this.stops = res;
    });
    getPassengerData(this.scheduleId).then((res) => {
      this.scheduleStatus = res.data.isFinished;
      this.scheduleData = res.data;
      console.log(res.data)
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