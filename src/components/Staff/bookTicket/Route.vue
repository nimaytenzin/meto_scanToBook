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

      <div class="flex flex-wrap mt-5" v-if="schedules.length">
        <table class="table min-w-full rounded">
          <thead class="bg-gray-100 p-3 text-gray-700 rounded h-10">
            <tr class="text-left font-light text-sm">
              <th class="pl-3 ml-2 mr-4">Departure Time</th>

              <th class="pl-3 ml-5 mr-5">Fare</th>
              <th class="pl-3 ml-5 mr-5">Select Seats</th>
            </tr>
          </thead>
          <tbody
            v-for="schedule in schedules"
            :value="schedule"
            :key="schedule"
            class="text-left mt-4"
          >
            <tr
              class="
                hover:bg-blue-100
                cursor-pointer
                select-none
                h-14
                text-gray-700
              "
              @click="commitSchedule(schedule)"
            >
              <td class="pl-3 mr-2 border-r border-gray-100">
                {{ schedule.route.departureTime }}
              </td>
              <td class="pl-3 ml-5 mr-5">Nu. {{ schedule.route.fare }}</td>
              <td class="pl-3 ml-5 mr-5">
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
                  @click="openSeatSelect(schedule)"
                >
                  Select Seats
                </button>
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
          Book
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
      <div class="modal__content text-center mt-5">
        <div class="flex flex-col mt-4">
          <h2 class="text-xl text-gray-500 italic">Enter passenger details</h2>

          <input
            v-model="customerName"
            placeholder="Name"
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              mt-1
              mb-1
              px-3
              text-gray-700
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
          />

          <input
            v-model="customerContact"
            type="number"
            placeholder="Contact"
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              mt-1
              mb-1
              text-gray-700
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
          />

          <input
            v-model="customerCid"
            placeholder="CID/EID"
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              mt-1
              mb-1
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
          />
        </div>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="confirmBooking()"
        >
          Book Ticket
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
import { Calendar, DatePicker } from "v-calendar";
import { getAllStops } from "../../../services/stopServices";
import {
  getScheduleByDate,
  getDetailsByDate,
} from "../../../services/scheduleServices";
import { getRoutesByOriginDestination } from "../../../services/routeServices";
import { useLoading } from "vue3-loading-overlay";
import moment from "moment";

import { addNewBooking } from "../../../services/bookingServices";
export default {
  data() {
    return {
      stops: [],
      originSelected: {},
      destinationSelected: {},
      date: "",
      schedules: [],
      seatSelectModal: false,
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
      customerName: null,
      customerContact: null,
      customerCid: null,
      total: 0,
      fare: 0,
      reverSeatModal: false,
      matchedRoutes: [],
      routeDays: [],
    };
  },
  created() {
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
      this.date = e.id;
    },
    next() {
      this.$router.push("/staff/seats");
    },
    commitSchedule(e) {
      this.$store.commit("commitSchedule", e);
      console.log(this.$store.state.customerBooking);
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
      this.routeDays = [];
      let loader = useLoading();
      loader.show();

      getRoutesByOriginDestination(
        this.originSelected.id,
        this.destinationSelected.id
      )
        .then((res) => {
          res.data.forEach((element) => {
            this.matchedRoutes.push(element);
          });
        })
        .catch((err) => console.log(err));

      let days = [];
      let daysRequired = 7;

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
        loader.hide();
      });
      //finda all matched routes

      //populate days
    },

    openSeatSelect(schedule) {
      this.scheduleId = schedule.id;
      this.fare = schedule.route.fare;

      console.log(this.scheduleId, "0okokokok");

      this.conn = new WebSocket(
        "ws://" + "www.meto-tranport.com" + "/ws/" + schedule.id
      );
      this.conn.onopen = (event) => {
        console.log("Successfully connected to the echo websocket server");
      };
      this.conn.onclose = (evt) => {
        console.log("WSS CONNECTION closed");
        console.log("RECONNECTING");
        this.$toast.show("Error Connecting to Socket", {
          type: "error",
          position: "top",
        });
        this.conn = new WebSocket(
          "ws://" + "www.meto-tranport.com" + "/ws/" + schedule.id
        );
      };
      this.conn.onmessage = (evt) => {
        let messageJson = JSON.parse(evt.data);
        if (messageJson.messageType === "LOCK") {
          console.log("LOCK MESSAGE RECIEVED");
          this.lockedSeats = messageJson.lockedList;
          this.changeSeatStatus();
        } else if (messageJson.messageType === "LOCK_LEAVE") {
          console.log("LOCK LEAVE RECIEVED");
          this.reverSeatStatus(messageJson.leaveList);
        } else if (messageJson.messageType === "LOCK_CONFIRM") {
        }
      };
      this.seatSelectModal = true;
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
        // let matchedBookedSeat = this.matchBookedSeat(parseInt(element));
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
      this.total += this.fare;
      this.confirmSeatModal = false;
    },
    cancelSeat() {
      this.conn.send(
        JSON.stringify({
          roomId: this.selectedTransferSchedule.id.toString(),
          messageType: "LOCK_LEAVE",
          seatId: this.selectedTransferSeat.number.toString(),
        })
      );
      this.total -= this.fare;
      this.confirmSeatModal = false;
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
      if (this.customerName && this.customerContact && this.customerCid) {
        let bookingDto = {
          booking: {
            scheduleId: this.scheduleId,
            bookingTime: new Date(),
            customerName: this.customerName,
            customerContact: this.customerContact,
            customerCid: this.customerCid,
            amount: this.total,
          },
          seats: [],
        };
        this.bookedSeats.forEach((seat) => {
          bookingDto.seats.push(seat.number);
        });
        addNewBooking(bookingDto).then((res) => {
          if (res.status === 201) {
            this.$toast.show("Successful", {
              position: "top",
              type: "success",
            });
            this.seatSelectModal = false;
            this.confirmSeatModal = false;
            this.addPassengerDetailsModal = false;
            this.$router.push(`/staff/ticket/${res.data.id}`)
          }
        });
      }else{
        this.$toast.show("All fields are mandatory",{
          position:"top",
          type:"error"
        })
      }
    },
    cancelBooking() {
      this.addPassengerDetailsModal = false;
    },
    closeSeatSelectModal() {
      this.schedules = [];
      this.seatSelected = {};
      this.bookedSeats = [];
      this.seatSelectModal = false;
    },

    viewSch() {
      if (this.originSelected && this.destinationSelected && this.date) {
        let formattedDate = this.date + +" 00:00:00";
        let matchedRouteIds = [];
        getRoutesByOriginDestination(
          this.originSelected.id,
          this.destinationSelected.id
        ).then((res) => {
          res.data.forEach((element) => {
            matchedRouteIds.push(element.id);
          });
        });
        getDetailsByDate(formattedDate).then((res) => {
          let matchRouteSchedule = [];
          if (res.length) {
            res.forEach((element) => {
              matchedRouteIds.forEach((route) => {
                if (route === element.routeId) {
                  matchRouteSchedule.push(element);
                }
              });
            });
            this.schedules = matchRouteSchedule;
          } else {
            this.$toast.show("No buses on the selected day", {
              type: "error",
              position: "top",
            });
          }
        });
      } else {
        this.$toast.show("All fields are required", {
          type: "error",
          position: "top",
        });
      }
    },
  },
  computed: {
    attributes() {
      return [
        // Attributes for todos
        ...this.routeDays.map((routeDay) => ({
          dates: routeDay.dates,
          highlight: routeDay.highlight,
        })),
      ];
    },
  },
};
</script>