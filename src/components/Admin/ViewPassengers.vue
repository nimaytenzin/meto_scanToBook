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
          <p>Departure Date and time: 12th June 7:00 AM</p>
          <p>Fare: {{ scheduleData.route.fare }}</p>
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
              rounded-l-lg
              focus:shadow-outline
              hover:bg-indigo-800
            "
            @click="cancelBus()"
          >
            Cancel Bus
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
            @click="cancelBus()"
          >
            Transfer all
          </button>
        </div>

        <div class="flex flex-col items-center">
          Selected Seats
          <div class="flex gap-4">
            <p
              class="mb-2 text-xl"
              v-for="seat in selectedPassengerBookings"
              :key="seat"
            >
              {{ seat.seatNumber }}
            </p>
          </div>
          <div>
            <button
              class="
                h-10
                px-5
                text-indigo-100
                transition-colors
                duration-100
                rounded-l-lg
                bg-indigo-700
                focus:shadow-outline
                hover:bg-indigo-800
              "
              :disabled="!selectedPassengerBookings.length"
              @click="cancelSelectedTickets()"
            >
              Cancel Selected Tickets
            </button>
            <button
              class="
                h-10
                px-5
                text-indigo-100
                transition-colors
                duration-100
                rounded-r-lg
                bg-indigo-700
                focus:shadow-outline
                hover:bg-indigo-800
              "
              :disabled="!selectedPassengerBookings.length"
              @click="transferSelectedPassenger()"
            >
              Transfer Selected Passengers
            </button>
          </div>
        </div>
      </div>

      <div class="mt-4" v-if="scheduleData.bookedSeats.length">
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
                Select
              </td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="bookedSeat in scheduleData.bookedSeats"
              :key="bookedSeat"
              class="hover:bg-gray-200"
            >
              <td class="px-2 py-4 whitespace-nowrap">
                {{ bookedSeat.seatNumber }}
              </td>
              <td class="px-2 py-4 whitespace-nowrap">
                {{ bookedSeat.booking.customerName }}
              </td>
              <td class="px-2 py-4 whitespace-nowrap">
                {{ bookedSeat.booking.customerCid }}
              </td>
              <td class="px-2 py-4 whitespace-nowrap">
                {{ bookedSeat.booking.customerContact }}
              </td>
              <td class="px-2 py-4 whitespace-nowrap">
                <button @click="selectPassenger(bookedSeat)">
                  Select Passenger
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
          <p>Departure Date and time: 12th June 7:00 AM</p>
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
        <p>Seat Numbers</p>
        <div class="flex gap-2 justify-center">
          <p
            class="mb-2 text-xl"
            v-for="seat in selectedPassengerBookings"
            :key="seat"
          >
            {{ seat.seatNumber }}
          </p>
        </div>
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

        <label class="text-sm text-center text-gray-400 italic"
          >Schedules</label
        >

        Selected Schedule : {{ selectedTransferSchedule.route?.departureTime? selectedTransferSchedule.route.departureTime: ""}}
        <table>
          <thead>
            <tr>
              <td>Departure Time</td>
              <td>Fare</td>
              <td>Select</td>
            </tr>
          </thead>
          <tbody v-for="schedule in matchedTransferSchedules" :key="schedule">
            <tr>
              <td>
                {{ schedule.route.departureTime }}
              </td>
              <td>
                Nu {{ schedule.route.fare }}
              </td>
              <td>
                <button @click="selectTransferSchedule(schedule)">
                  Select Schedule
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
import { cancelBooking } from "../../services/bookingServices";
import { getAllStops } from "../../services/stopServices";
import { getScheduleByDate } from "../../services/scheduleServices";
import { getRoutesByOriginDestination } from "../../services/routeServices";
export default {
  data() {
    return {
      scheduleId: null,
      selectedPassengerBookings: [],
      scheduleStatus: 0,
      transferOrigin: {},
      transferDestination: {},
      transferDate: null,
      transferSchedules: [],
      matchedTransferSchedules: [],
      selectedTransferSchedule:{},
      scheduleData: {
        route: {
          origin: {},
          destination: {},
        },
        bookedSeats: [],
        seatsAvailable: [],
      },
      transferSelectedModal: false,
      origins: [],
    };
  },
  methods: {
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
    selectTransferSchedule(schedule){
      console.log(schedule)
      this.selectedTransferSchedule = schedule
    },
    cancelSelectedTickets() {
      console.log(this.selectedPassengerBookings);
      let status = {
        checkInStatus: "CANCELLED",
      };
      this.selectedPassengerBookings.forEach((booking) => {
        cancelBooking(booking.bookingId, status).then((res) => {
          console.log(res);
        });
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
    transferSelectedPassenger() {
      console.log("ok");
      this.transferSelectedModal = true;
    },
    confirmTransferSelected() {
      console.log(this.selectedTransferSchedule, "transfer to ")
      console.log(this.selectedPassengerBookings, " Seats")
      this.selectedPassengerBookings.forEach(booking =>{
          cancelBooking(booking.bookingId, {
            scheduleId: this.selectedTransferSchedule.id
          }).then(res=>console.log(res))
      })
      this.refreshData()

      
    },
    cancelSelectedPassenger() {},
    selectPassenger(e) {
      console.log(e);
      this.selectedPassengerBookings.push(e);
      console.log(this.selectedPassengerBookings);
    },
    searchTransferSchedules() {
      let matchedRoutes = [];
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
      console.log(this.matchedTransferSchedules)
    },
    refreshData() {
      getPassengerData(this.scheduleId).then((res) => {
        this.scheduleStatus = res.data.isFinished;
        this.scheduleData = res.data;
        console.log(res.data, "okokokokkokokk")
        console.log(res.data, "grab booking");
        res.data.bookedSeats.forEach((bookedSeat, i) => {
          this.seatsAvailable.forEach((seat, j) => {
            if (res.data.bookedSeats[i].seatNumber === this.seatsAvailable[j]) {
              this.seatsAvailable.splice(j, 1);
            }
          });
        });
      });
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
      console.log(res.data, "grab booking");
      res.data.bookedSeats.forEach((bookedSeat, i) => {
        this.seatsAvailable.forEach((seat, j) => {
          if (res.data.bookedSeats[i].seatNumber === this.seatsAvailable[j]) {
            this.seatsAvailable.splice(j, 1);
          }
        });
      });
    });
  },
};
</script>