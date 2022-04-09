<template>
  <div class="min-h-screen flex flex-col p-4 justify-start items-center">
    <h2 class="text-xl m-2">Click on a date to view Schedule</h2>

    <Calendar :min-date="new Date()" @dayclick="onDayClick($event)" />

    <p
      class="text-3xl font-normal text-center text-gray-500"
      v-if="selectedDate"
    >
      Showing Schedules for
      <span class="text-gray-800">{{ parseDepartureDate(selectedDate) }}</span>
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
            Passengers
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
            Bus
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
            Suspend Route
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

           <div v-if="schedule.isCancelled" class="font-bold">
              Cancelled
            </div>
            <div v-if="!schedule.isActive" class="font-bold">
              Route Suspended
            </div>
            {{ schedule.routepath?.origin.name }} <br />
            - <br />
            {{ schedule.routepath?.destination.name }}

            <br>
            Departure Time:   {{ schedule.departureTime }}
            <br>
            Fare:   Nu.{{ schedule.fare }}

           
          </td>
          <td>
            <p v-for="subroute in schedule.subroutes" :key="subroute">
              {{subroute.routepath?.origin.name  }} - {{subroute.routepath.destination?.name  }}
            </p>
          </td>
          
          <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
            <div v-if="schedule.isActive">
              <button
                class="bg-gray-500 text-gray-50 p-1 rounded hover:bg-green-600"
                @click="viewPassengers(schedule)"
              >
                View Passengers
              </button>
            </div>
            <div v-else>Suspended</div>
          </td>
          <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
            <div v-if="schedule.isActive">
              <div v-if="schedule.bus">
                <div class="text-gray-800 rounded">
                  <p class="text-xs">Bus Assigned</p>
                  <p class="text-md font-semibold">
                    {{ schedule.bus.vechileNumber }}
                  </p>
                  <p
                    class="underline text-blue-700 cursor-pointer"
                    @click="reassignBus(schedule)"
                  >
                    reassign
                  </p>
                </div>
              </div>
              <div v-else>
                <button
                  class="
                    bg-gray-500
                    p-1
                    text-gray-50
                    rounded
                    hover:bg-green-600
                  "
                  @click="openAssignBusModal(schedule)"
                >
                  Assign Bus
                </button>
              </div>
            </div>
            <div v-else>Suspended</div>
          </td>
          <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
            <div>
              <div v-if="schedule.isActive">
                <button
                  class="
                    bg-gray-500
                    text-gray-50
                    p-1
                    rounded
                    hover:bg-green-600
                  "
                  @click="cancelSpecificRoute(schedule)"
                  v-if="!schedule.isCancelled"
                >
                  Cancel Bus
                </button>
                <button
                  class="
                    bg-gray-500
                    text-gray-50
                    p-1
                    rounded
                    hover:bg-green-600
                  "
                  v-else
                  @click="reopenSchedule(schedule)"
                >
                  Reopen Bus
                </button>
              </div>
              <div v-else>Suspended</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <vue-final-modal
    v-model="assignBusModal"
    classes="modal-container"
    content-class="modal-content"
    class="w-max-screen"
  >
    <div class="modal__content text-center mt-1 flex flex-col">
      <h3 class="text-xl">Assign Bus</h3>
      <p class="text-center text-sm text-gray-600">(for)</p>
      <p>
        <span class="text-xl font-semibold text-gray-700">
          {{ selectedSchedule.routepath?.origin.name }}</span
        >
        -
        <span class="text-xl font-semibold text-gray-700">
          {{ selectedSchedule.routepath?.destination.name }}
        </span>
      </p>
      <p>
        Departure Time:
        <span class="text-xl font-semibold text-gray-700"
          >{{ selectedSchedule.departureTime }}
        </span>
      </p>
      <p>
        Departure Date:
        <span class="text-xl font-semibold text-gray-700">{{
          parseDepartureDate(selectedDate)
        }}</span>
      </p>
      <hr class="my-2" />

      <label class="text-sm text-left text-gray-400 italic"
        >Select Bus to assign</label
      >
      <select v-model="busSelected" class="text-2xl p-2 bg-white text-gray-900">
        <option
          v-for="bus in buses"
          :value="bus.id"
          :key="bus"
          class="bg-white"
        >
          {{ bus.vechileNumber }}
        </option>
      </select>
    </div>
    <div class="modal__action">
      <button
        class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
        @click="assignBus()"
      >
        Assign Bus
      </button>
      <button
        class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
        @click="assignBusModal = false"
      >
        cancel
      </button>
    </div>
  </vue-final-modal>

  <vue-final-modal
    v-model="reassignBusModal"
    classes="modal-container"
    content-class="modal-content"
    class="w-max-screen"
  >
    <div class="modal__content text-center mt-1 flex flex-col">
      <h3 class="text-xl">Re-assign Bus</h3>
      <p class="text-center text-sm text-gray-600">(for)</p>
      <p>
        <span class="text-xl font-semibold text-gray-700">
          {{ selectedSchedule.routepath?.origin.name }}</span
        >
        -
        <span class="text-xl font-semibold text-gray-700">
          {{ selectedSchedule.routepath?.destination.name }}
        </span>
      </p>
      <p>
        Departure Time:
        <span class="text-xl font-semibold text-gray-700"
          >{{ selectedSchedule.departureTime }}
        </span>
      </p>
      <p>
        Departure Date:
        <span class="text-xl font-semibold text-gray-700">{{
          parseDepartureDate(selectedDate)
        }}</span>
      </p>
      <hr class="my-2" />
      <p class="p-1 rounded bg-green-100 text-green-900">
        Current Bus:
        <span class="text-xl font-semibold leading-relaxed">
          {{ selectedSchedule.bus?.vechileNumber }}
        </span>
      </p>

      <label class="text-sm mt-2 text-left text-gray-400"
        >Select a new Bus to reassign</label
      >
      <select v-model="busSelected" class="text-2xl p-2 bg-white text-gray-900">
        <option
          v-for="bus in buses"
          :value="bus.id"
          :key="bus"
          class="bg-white"
        >
          {{ bus.vechileNumber }}
        </option>
      </select>
    </div>
    <div class="modal__action">
      <button
        class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
        @click="confirmReassignBus()"
      >
        Assign New Bus
      </button>
      <button
        class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
        @click="reassignBusModal = false"
      >
        cancel
      </button>
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
          <span class="text-2xl font-bold">
            {{ selectedSchedule.routepath?.origin.name }}</span
          >
          to
          <span class="text-2xl font-bold">
            {{ selectedSchedule.routepath?.destination.name }}
          </span>
        </p>
        <p>On</p>
        <p>{{ parseDepartureDate(selectedDate) }} at</p>
        <p>{{ selectedSchedule.departureTime }}</p>
        <div class="text-xl">
          Fare: Nu.{{ selectedSchedule.fare }} <br />
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


      <div v-if="routeDateBookings.length">
        <h3 class="text-xl px-6 font-thin">Bookings</h3>

        <div class="p-2 flex overflow-scroll" style="height: 40vh">
          <table
            class="
              min-w-full
              divide-y divide-gray-200
              text-gray-900
              font-thin
              bg-white
            "
          >
            <thead>
              <tr>
                <td
                  class="sticky bg-gray-100 top-0 px-6 py-4 whitespace-nowrap"
                >
                  Seat Number
                </td>
                <td
                  class="sticky bg-gray-100 top-0 px-6 py-4 whitespace-nowrap"
                >
                  Name
                </td>
                <td
                  class="sticky bg-gray-100 top-0 px-6 py-4 whitespace-nowrap"
                >
                  CID
                </td>
                <td
                  class="sticky bg-gray-100 top-0 px-6 py-4 whitespace-nowrap"
                >
                  Contact
                </td>
              </tr>
            </thead>
            <tbody class="overflow-y-scroll" style="50vh">
              <tr v-for="booking in routeDateBookings" :key="booking">
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ booking.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  Nu {{ booking.amount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ booking.passengers[0].name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  Cancel Booking
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </vue-final-modal>

  <!-- cancelBus booking conflict??? -->
  <vue-final-modal
    v-model="conflictingBookingsModal"
    classes="modal-container"
    content-class="modal-content"
    class="w-max-screen text-gray-700"
  >
    <div class="modal__content text-center mt-1 flex flex-col">
      <p class="text-center font-semibold">
        {{ selectedSchedule.routepath?.origin.name }} -
        {{ selectedSchedule.routepath?.destination.name }} Bus
      </p>
      <p class="text-center font-semibold">
        Departs at {{ selectedSchedule.departureTime }} on <br />
        {{ selectedDate }}
      </p>

      <div
        class="flex flex-col gap-2 overflow-x-scroll"
        v-if="conflictingBookings.length"
      >
        <p class="text-red-700 my-2">
          Please resolve these pending Bookings before Cancelling the bus
        </p>
        <div
          v-for="booking in conflictingBookings"
          :key="booking"
          class="bg-gray-200 rounded text-gray-700"
        >
          <p>Booking ID: {{ booking.id }}</p>
          <p>Amount Paid: Nu {{ booking.amount }}</p>

          <div>
            <table class="table-auto w-full">
              <tr>
                <td>Seat No</td>
                <td>Name</td>
                <td>Contact</td>
              </tr>
              <tr v-for="passenger in booking.passengers" :key="passenger">
                <td>
                  {{ passenger.seatNumber }}
                </td>
                <td>
                  {{ passenger.name }}
                </td>
                <td>
                  {{ passenger.contact }}
                </td>
              </tr>
            </table>
            <button
              class="bg-red-200 p-1 rounded my-3"
              @click="confirmCancelBooking(booking)"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-green-700 my-2">
          You are safe to cancel the bus now! Note it will disabled for the
          customer
        </p>
        <button class="bg-red-200 p-1 rounded my-3" @click="confirmCancelBus()">
          Cancel Bus
        </button>
      </div>
    </div>
  </vue-final-modal>

  <!-- COnfirm Cancel Booking by date -->
  <vue-final-modal
    v-model="confirmCancelBusModal"
    classes="modal-container"
    content-class="modal-content"
    class="w-max-screen text-gray-700"
  >
    <div class="modal__content text-center mt-1 flex flex-col">
      <p class="text-center font-semibold">
        {{ selectedSchedule.routepath?.origin.name }} -
        {{ selectedSchedule.routepath?.destination.name }} Bus
      </p>
      <p class="text-center font-semibold">
        Departs at {{ selectedSchedule.departureTime }} on <br />
        {{ selectedDate }}
      </p>

      <p class="text-red-700 my-2">
        Are you sure you want to cancel the Bus? <br />
        The above schedule will be disabled on customer bookings page
      </p>

      <button class="bg-red-200 p-1 rounded my-3" @click="confirmCancelBus()">
        Cancel Bus
      </button>
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
import {
  getPassengerDetailsByScheduleHash,
  getBookingsByRouteAndScheduleDate,
  cancelBooking,
} from "../../services/bookingServices";
import { getAllBuses } from "../../services/busServices";
import crypto from "crypto";

import {
  createNewBusRoster,
  getBusbyRouteAndDate,
  getRoutesByWeekday,
  updateBusRoster,
} from "../../services/routeServices";

import {
  addNewCancelledRouteDate,
  deleteByDateAndRoute,
  getCancelledRoutesByDate,
} from "../../services/cancelledRouteDateService";

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
      routeDateBookings:[],
      storedDateClickEvent:{}
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
    assignBus() {
      let busRoster = {
        routeId: this.selectedSchedule.id,
        date: this.selectedDate,
        busId: this.busSelected,
      };
      createNewBusRoster(busRoster).then((res) => {
        if (res.status === 201) {
          this.schedules = [];
          getRoutesByWeekday(this.selectedWeekdate).then((res) => {
            res.data.forEach((route) => {
              let data = route;
              getBusbyRouteAndDate(this.selectedDate, route.id).then((res) => {
                if (res.data) {
                  data.bus = res.data.bus;
                  data.busRosterId = res.data.id;
                }
                this.schedules.push(data);
              });
            });
          });
          this.assignBusModal = false;
        }
      });
    },
    openAssignBusModal(schedule) {
      this.assignBusModal = true;
      this.selectedSchedule = schedule;
    },
    onDayClick(e) {
      this.selectedDate = e.id;
      this.selectedWeekdate = e.weekday;
      this.schedules = [];
      this.storedDateClickEvent =e;
      getRoutesByWeekday(e.weekday).then((res) => {
        console.log("ROUTE WITH SUBROTES", res.data)
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
      var plaintext = `${this.selectedSchedule.id}|${this.selectedDate}`;
      var hash = crypto.createHash("sha1");
      hash.update(plaintext);
      var scheduleHash = hash.digest("hex");

      getBookingsByRouteAndScheduleDate(schedule.id,this.selectedDate).then(res=>{
        console.log("PAID Bookings", res.data)
        this.routeDateBookings = res.data
      })

      getPassengerDetailsByScheduleHash(scheduleHash).then((res) => {
        console.log(res.data);
        this.passengersInSchedule = res.data;
        res.data.forEach((passenger) => {
          this.seatsAvailable.splice(
            this.seatsAvailable.indexOf(passenger.seatNumber),
            1
          );
        });
      });
    },
    reassignBus(schedule) {
      this.reassignBusModal = true;
      this.selectedSchedule = schedule;
    },
    confirmReassignBus() {
      updateBusRoster(this.selectedSchedule.busRosterId, {
        busId: this.busSelected,
      }).then((res) => {
        if (res.status === 200) {
          this.schedules = [];
          getRoutesByWeekday(this.selectedWeekdate).then((res) => {
            res.data.forEach((route) => {
              let data = route;
              getBusbyRouteAndDate(this.selectedDate, route.id).then((res) => {
                if (res.data) {
                  data.bus = res.data.bus;
                  data.busRosterId = res.data.id;
                }
                this.schedules.push(data);
              });
            });
          });
          this.reassignBusModal = false;
        }
      });
    },
    cancelSpecificRoute(schedule) {
      this.selectedSchedule = schedule;

      getBookingsByRouteAndScheduleDate(schedule.id, this.selectedDate).then(
        (res) => {
          if (res.data.length) {
            this.conflictingBookings = res.data;
            this.conflictingBookingsModal = true;
            console.log("CONFLICTS", res.data);
          } else {
            this.confirmCancelBusModal = true;
            console.log("NO CONFLICTS SAFE TO CANCEL");
          }
        }
      );
    },

    confirmCancelBooking(booking) {
      console.log("CANCEL THIS BOOKING", booking);
      let cancelBookingObject = {
        bookingId: booking.id,
        scheduleHash: booking.scheduleHash,
        seats: [],
      };
      booking.passengers.forEach((passenger) => {
        cancelBookingObject.seats.push(passenger.seatNumber);
      });
      if (confirm("Are you sure you want to cancel?") == true) {
        cancelBooking(booking.id, cancelBookingObject).then((res) => {
          if (res.status === 200) {
            getBookingsByRouteAndScheduleDate(
              this.selectedSchedule.id,
              this.selectedDate
            ).then((res) => {
              console.log(res);
              if (res.data) {
                this.conflictingBookings = res.data;
                console.log("CONFLICTS", res.data);
              }
            });
          } else {
            this.$toast.show("Network Error Try again");
          }
        });
      }
    },

    confirmCancelBus() {
      addNewCancelledRouteDate({
        routeId: this.selectedSchedule.id,
        date: this.selectedDate,
      }).then((res) => {
        console.log("OK", res);
        this.confirmCancelBusModal = false;
        this.onDayClick(this.storedDateClickEvent)

      });
    },

    reopenSchedule(schedule) {
      console.log(schedule);
      deleteByDateAndRoute({
        routeId: schedule.id,
        date: this.selectedDate,
      }).then((res) => {
        console.log("REOPEN",res)
          if(res.status === 201){
            this.onDayClick(this.storedDateClickEvent)
          }
      });
    },
    refreshData(date) {
      console.log(date);
    },
  },
};
</script>