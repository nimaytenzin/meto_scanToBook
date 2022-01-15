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
            Origin
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
            Destination
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
          <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
            {{ schedule.routepath?.origin.name }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
            {{ schedule.routepath?.destination.name }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
            {{ schedule.departureTime }}
          </td>
          <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
            Nu.{{ schedule.fare }}
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
            v-if="!passengersInSchedule.length"
            class="m-4 text-2xl text-gray-100"
          >
            No Bookings
          </p>
        </div>
      </div>
      <div v-if="passengersInSchedule.length">
        <h3 class="text-xl px-6 font-thin">Passengers</h3>

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
              <tr v-for="passenger in passengersInSchedule" :key="passenger">
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ passenger.seatNumber }}
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
  getPassengersOnBus,
} from "../../services/bookingServices";
import { getAllBuses } from "../../services/busServices";
import crypto from "crypto";

import {
  createNewBusRoster,
  getBusbyRouteAndDate,
  getRoutesByWeekday,
  updateBusRoster,
} from "../../services/routeServices";
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
      getRoutesByWeekday(e.weekday).then((res) => {
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
      ]

      var plaintext = `${this.selectedSchedule.id}|${this.selectedDate}`;
      var hash = crypto.createHash("sha1");
      hash.update(plaintext);
      var scheduleHash = hash.digest("hex");

      getPassengerDetailsByScheduleHash(scheduleHash).then((res) => {
        console.log(res.data)
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
  },
};
</script>