
<template>
  <div class="relative flex justify-center items-center" id="heroSection3">
    <div
      class="absolute top-0 w-full h-full bg-center bg-cover z-0"
      :style="{
        'background-image': 'url(' + require('../assets/bg.jpeg') + ')',
      }"
    >
      <span
        id="blackOverlay"
        class="
          w-full
          h-full
          absolute
          bg-gradient-to-r
          from-black
          via-metoPrimary-900
          to-transparent
          opacity-80
          z-0
        "
      ></span>
    </div>

    <div
      class="
        w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
        z-0
        flex
        justify-start
        overflow-scroll
        text-gray-200
      "
    >
      <div class="w-full md:w-1/2 flex-col">
        <h1 class="font-semibold text-xl md:text-5xl">
          Your Journey starts with us.
        </h1>
        <div class="flex flex-col text-sm mt-4">
          <div class="flex text-sm md:text-xl gap-2 items-center">
            Ensuring Safety, Reliability and Comfort till your Destination
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    id="scheduleRouteDetails"
    class="
      w-full
      md:flex
      justify-center
      overflow-scroll

    "
  >
    <div
      class="
        p-6
        bg-white
        rounded-lg
      "
    >
      <p
        class="
          text-sm
          md:text-2xl
          font-thin
          text-metoPrimary-900 text-left
          w-full
          mt-4
        "
      >
        <span class="text-xl md:text-3xl font-semibold">
          {{ originSelected?.name }}
        </span>
        to
        <span class="text-xl md:text-3xl font-semibold">
          {{ destinationSelected?.name }}
        </span>
      </p>
      <p
        class="text-xl font-semibold text-metoPrimary-900 text-left w-full mb-4"
      >
        {{ formattedDepartureDate }}
      </p>
    </div>
  </div>
  <div
    id="scheduleRouteDetails"
    class="
      hidden
      w-full
      md:flex
      justify-center
      overflow-scroll
      text-gray-200
      -mt-10
      rounded-lg
    "
  >
    <div
      class="
        w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
        flex-col
        z-50
        bg-white
        rounded-lg
      "
    >
      <div class="flex place-content-stretch text-metoPrimary-900 rounded-lg">
        <div
          class="
            w-1/3
            flex flex-col
            text-xl
            rounded-l-lg
            items-start
            justify-center
            px-2
            py-1
            bg-metoPrimary-800
            text-gray-100
          "
        >
          <p class="px-2 text-xs">Origin</p>
          <p class="px-2 py-1 bg-transparent w-full">
            {{ originSelected.name }}
          </p>

          <p class="px-2 pt-2 text-xs">Destination</p>
          <p class="px-2 py-1 bg-transparent w-full">
            {{ destinationSelected.name }}
          </p>
        </div>
        <div
          class="
            w-1/3
            flex flex-col
            text-xl
            border-b border-metoPrimary-800
            items-start
            justify-center
            px-2
            py-1
          "
        >
          <p class="px-2 text-xs">Departure Date</p>
          <p class="px-2 py-1 bg-transparent w-full">
            {{ formattedDepartureDate }}
          </p>

          <p class="px-2 text-xs pt-2">Departure Time</p>
          <p class="px-2 py-1 bg-transparent w-full">
            {{ selectedSchedule.departureTime }}
          </p>
        </div>
        <div
          class="
            w-1/3
            flex flex-col
            text-xl
            bg-metoPrimary-800
            text-gray-100
            items-start
            justify-center
            px-2
            py-1
          "
        >
          <p class="px-2 text-xs">Fare(Per Seat)</p>
          <p class="px-2 py-1 bg-transparent w-full">
            Nu. {{ selectedSchedule.fare }}
          </p>

          <p class="px-2 text-xs pt-2">Service Charge (Per Seat)</p>
          <p class="px-2 py-1 bg-transparent w-full">Nu. {{ serviceCharge }}</p>
        </div>
      </div>
    </div>
  </div>

  <div id="seatBookingSection" class="w-full flex justify-center mb-4">
    <div
      class="w-11/12 lg:w-10/12 xl:w-8/12 2xl:w-1/2 flex flex-col md:flex-row"
    >
      <div id="seatLayout" class="w-full md:w-1/2">
        <div
          class="md:hidden flex flex-col gap-2 px-6 py-3 shadow-lg rounded-lg"
        >
          <p class="text-xl mb-2 text-metoPrimary-900">Your Seats</p>

          <div class="flex justify-start flex-wrap" v-if="bookedSeats.length">
            <div v-for="item in bookedSeats" :key="item" class="m-1 p-1">
              <div class="relative">
                <img
                  src="../assets/yourseats.png"
                  width="46"
                  alt=""
                  rel="preload"
                />
                <p
                  class="
                    absolute
                    top-1/2
                    left-1/2
                    rounded-sm
                    text-gray-50
                    transform
                    -translate-x-1/2 -translate-y-1/2
                  "
                >
                  {{ item.number }}
                </p>
              </div>
            </div>
          </div>

          <div v-else class="text-metoPrimary-800">
            <p class="text-red-400
                      animate-pulse">No Seats Selected</p>
            <p>Please click on any available seat to book.</p>
          </div>
        </div>

        <div class="flex flex-col items-center justify-start sm:ml2 sm:mr2">
          <p class="text-gray-600 text-sm hidden md:block">
            Click on any
            <span class="text-xl text-metoPrimary-800 animate-pulsate"
              >available seat</span
            >
            to book.
          </p>
          <div class="flex mt-5 justify-evenly">
            <div
              class="text-center flex flex-col justify-center items-center m-2"
            >
              <img src="../assets/seatAvailable.png" width="25" alt="" />
              <p class="text-sm text-gray-600">Available</p>
            </div>
            <div
              class="text-center flex flex-col justify-center items-center m-2"
            >
              <img src="../assets/seatUnavailable.png" width="25" alt="" />
              <p class="text-sm text-gray-600">Booked</p>
            </div>

            <div
              class="text-center flex flex-col justify-center items-center m-2"
            >
              <img src="../assets/yourseats.png" width="25" alt="" />
              <p class="text-sm text-gray-600">Your Bookings</p>
            </div>
          </div>

          <div
            class="
              p-1
              mx-auto
              bg-white
              rounded-md
              shadow-md
              mt-1
              items-center
              space-x-4
            "
          >
            <div
              class="bg-white grid grid-cols-4 gap-2 p-3 m-3"
              style="z-index: 99999"
            >
              <div
                v-for="item in seats"
                :key="item"
                class="rounded relative"
                @click="addSeat(item)"
              >
                <img
                  :src="bindImage(item)"
                  alt="Seat "
                  class="object-contain w-14 z-0 cursor-pointer"
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
      </div>
      <div id="billing" class="w-full md:w-1/2 flex flex-col">
        <div
          class="hidden md:flex flex-col gap-2 px-6 py-3 shadow-lg rounded-lg"
        >
          <p class="text-xl mb-2 text-metoPrimary-900">Your Seats</p>

          <div class="flex justify-start flex-wrap" v-if="bookedSeats.length">
            <div v-for="item in bookedSeats" :key="item" class="m-1 p-1">
              <div class="relative">
                <img
                  src="../assets/yourseats.png"
                  class="w-8 md:w-12"
                  alt=""
                  rel="preload"
                />
                <p
                  class="
                    absolute
                    top-1/2
                    left-1/2
                    rounded-sm
                    text-white
                    font-bold
                    transform
                    -translate-x-1/2 -translate-y-1/2
                  "
                >
                  {{ item.number }}
                </p>
              </div>
            </div>
          </div>

          <div v-else class="text-metoPrimary-800">
            <p class="text-xl animate-pulse text-metoContrast font-bold">
              No Seats Selected
            </p>
            <p class="text-xl">Please click on any avaialable seat to book.</p>
          </div>
        </div>
        <div
          class="
            font-nunito
            text-gray-200 text-sm text-left
            bg-metoPrimary-800
            rounded
            shadow-md
            px-6
            py-3
          "
        >
          <div>
            <div class="p-2">
              <p class="text-xl mb-2">Billing</p>
              <table class="table-auto text-xl font-thin">
                <tr>
                  <td>Base Fare :</td>
                  <td>Nu {{ fare }}</td>
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
              </table>
            </div>

            <div class="p-2">
              <table>
                <tr class="text-gray-100 text-xl">
                  <td>Total :</td>
                  <td>
                    <p class="text-xl font-semibold">
                      Nu. {{ (fare + serviceCharge) * bookedSeats.length }}
                    </p>
                  </td>
                </tr>
              </table>
              <p class="text-xs break-words">
                (Base Fare + Service Charge) x Booked Seats
              </p>
            </div>
          </div>
        </div>
        <button
          v-if="bookedSeats.length"
          class="
            l
            px-1
            py-2
            my-4
            md:px-2 md:py-3
            rounded
            text-white
            bg-metoContrast
            font-semibold
            text-md
            md:text-xl
          "
          @click="goToPassengerDetailsPage"
        >
          Confirm Seats
        </button>
      </div>
    </div>
  </div>

  <div>
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center mt-5">
        <h3 class="text-xl">Book?</h3>

        <h3 class="text-2xl">Seat No {{ selectedSeat.number }}</h3>
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
      v-model="errorModal"
      classes="modal-container2"
      :click-to-close="false"
    >
      <div
        class="
          flex flex-col
          text-blue-400
          font-thin
          text-xl
          justify-start
          items-center
        "
      >
        <img
          class="relative w-14 h-auto"
          src="/loading.gif"
          alt="loading..."
          width="200"
        />
        <p class="text-center">Connecting to Meto Web Services...</p>
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

        <h3 class="text-2xl">Seat No {{ selectedSeat.number }}</h3>
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
::v-deep .modal-container2 {
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  min-width: max-content;
  margin: 0 1rem;
  padding: 1rem;
  background: #fff;
}
::v-deep .modal-content2 {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  min-width: 100%;
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

<style>
#heroSection3 {
  height: 29vh;
}
</style>
<script>
import { getServiceCharge } from "../services/paymentServices";
export default {
  created() {
    this.fare = this.$store.state.selectedSchedule?.fare;
    this.roomId = this.$store.state.selectedScheduleHash;
    this.inactiveTimeOut = setTimeout(() => {
        window.location.reload();
    }, 90000);
    getServiceCharge().then((res) => {
      this.serviceCharge = res.data.serviceCharge;
      this.$store.commit('addServiceCharge', res.data.serviceCharge)
    });
    
    if (
      this.roomId &&
      this.$store.state.selectedSchedule &&
      this.$store.state.origin &&
      this.$store.state.destination
    ) {
      this.errorModal = true;

      this.connectWs();
    } else {
      this.$router.push("/");
    }
  },

  data() {
    return {
      fare: 0,
      total: 0,
      message: "Connecting to Meto Web Services...",

      destinationSelected: this.$store.state.destination,
      originSelected: this.$store.state.origin,
      formattedDepartureDate: this.$store.state.formattedDepartureDate,
      origin: this.$store.state.origin?.name,
      destination: this.$store.state.destination?.name,
      selectedSchedule: this.$store.state.selectedSchedule,
      serviceCharge: 35,
      departureTime: this.$store.state.selectedSchedule?.departureTime,
      isConnected: false,
      errorModal: true,
      connectionAttempt: 0,
      socketConnected: false,
      msg: {},
      lockedSeats: [],
      roomId: null,
      conn: null,
      showModal: false,
      reverSeatModal: false,
      inactiveTimeOut: null,
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
      activeSeat: null,
      selectedSeat: {
        id: 0,
      },
      tempStatus: null,
    };
  },
  computed: {
    bookedSeats() {
      return this.$store.state.selectedSeats;
    },
    departuredate() {
      let d = new Date(this.$store.state.departureDate);
      return d.toDateString();
    },
  },
  methods: {
    connectWs() {
      this.conn = new WebSocket(`${process.env.VUE_APP_WSS}/${this.roomId}`);
      this.conn.onopen = (event) => {
        this.isConnected = true;
        this.connectionAttempt = 0;
        // this.errorModal = false;
        console.log("CONNETCTED TO METO WEB SERVICEs");
        this.message = "Connecting to Meto Webservices ";
        this.errorModal = false;
        this.socketConnected = true;
      };
      this.conn.onclose = (evt) => {
        this.errorModal = true;
        this.connectionAttempt++;
        this.isConnected = false;
        if (!this.isConnected) {
          setTimeout(() => {
            if (this.connectionAttempt === 10) {
              this.errorModal = false;
              this.$router.push("/service-down");
            } else {
              this.connectWs();
            }
          }, 2000);
        }
      };
      this.conn.onmessage = (evt) => {
        let messageJson = JSON.parse(evt.data);
        if (messageJson.messageType === "LOCK") {
          console.log("locked Seats RECIEVED");
          this.lockedSeats = messageJson.lockedList;
          this.changeSeatStatus();
        } else if (messageJson.messageType === "LOCK_LEAVE") {
          console.log("LOCK LEAVE RECIEVED");
          this.reverSeatStatus(messageJson.leaveList);
        } else if (messageJson.messageType === "LOCK_ACK") {
          console.log("Lock Acknowledged by the server");
          this.selectedSeat.status = "locked";
          this.showModal = true;
        } else if (messageJson.messageType === "LOCK_FAIL") {
          console.log("Lock Acknowledge Failed");
          this.showModal = false;
          this.$toast.show(
            "Some one else is booking the seat! please select another seat",
            {
              position: "top",
              type: "error",
            }
          );
        }
      };
    },

    getSeats(id) {
      for (let i = 0; i < this.seats.length; i++) {
        if (this.seats[i].number === id) {
          return this.seats[i];
        }
      }
      return null;
    },
    matchBookedSeat(id) {
      let bookedSeats = this.$store.state.selectedSeats;
      for (let i = 0; i < bookedSeats.length; i++) {
        if (bookedSeats[i].number === id) {
          return bookedSeats[i];
        }
      }
      return null;
    },
    previous() {
      this.$router.push("/book/buses");
    },
    changeSeatStatus() {
      this.lockedSeats.forEach((seatNum) => {
        let matchedSeat = this.getSeats(seatNum);
        if (matchedSeat.status !== "booked") {
          matchedSeat.status = "locked";
        }
      });
      this.$store.state.selectedSeats.forEach((seat) => {
        let matchedSeat = this.getSeats(seat.number);
        matchedSeat.status = "booked";
      });
    },
    reverSeatStatus(arr) {
      arr.forEach((element) => {
        let matchedSeat = this.getSeats(parseInt(element));
        matchedSeat.status = "available";
      });
    },
    bindImage(seat) {
      if (seat.type === "seat") {
        switch (seat.status) {
          case "available":
            return require("../assets/seatAvailable.png");
            break;
          case "booked":
            return require("../assets/yourseats.png");
            break;
          case "driver":
            return require("../assets/steeringwheel.png");
            break;
          case "locked":
            return require("../assets/seatUnavailable.png");
            break;
          default:
            return require("../assets/seatAvailable.png");
            break;
        }
      } else {
        return require("../assets/seatAvailable.png");
      }
    },
    finalizeBooking() {
      if (this.$store.state.selectedSeats) {
        this.$store.commit("addTotal", this.total);
        this.$store.state.selectedSeats.forEach((seat) => {
          this.conn.send(
            JSON.stringify({
              scheduleHash: this.roomId.toString(),
              messageType: "LOCK_CONFIRM",
              seatId: seat.number.toString(),
            })
          );
        });

        clearTimeout(this.inactiveTimeOut);
        this.$router.push("/book/bookings");
      } else {
        this.$toast.show("Please select a seat", {
          position: "top",
          type: "error",
        });
      }
    },
    confirmSeat() {
      this.showModal = false;
      this.selectedSeat.status = "booked";

      this.activeSeat = null;
      this.$store.commit("addSeats", this.selectedSeat);
      this.total += this.fare;
    },
    cancelSeat() {
      this.conn.send(
        JSON.stringify({
          scheduleHash: this.roomId.toString(),
          messageType: "LOCK_LEAVE",
          seatId: this.selectedSeat.number.toString(),
        })
      );
      this.showModal = false;
    },
    confirmRevert() {
      this.conn.send(
        JSON.stringify({
          scheduleHash: this.roomId.toString(),
          messageType: "LOCK_LEAVE",
          seatId: this.selectedSeat.number.toString(),
        })
      );
      this.selectedSeat.status = "available";
      this.$store.commit("removeSeat", this.selectedSeat);
      this.total -= this.fare;
      this.selectedSeat = {};
      this.reverSeatModal = false;
    },
    cancelRevert() {
      this.reverSeatModal = false;
    },
    addSeat(seat) {
      console.log("CLICK ON A SEAT", seat);
      if (seat.type === "seat") {
        this.selectedSeat = seat;
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
              scheduleHash: this.roomId.toString(),
              messageType: "LOCK",
              seatId: this.selectedSeat.number.toString(),
            })
          );
          this.showModal = true;
        }
      }
    },

    goToPassengerDetailsPage() {
       if (this.$store.state.selectedSeats) {
        this.$store.state.selectedSeats.forEach((seat) => {
          this.conn.send(
            JSON.stringify({
              scheduleHash: this.roomId.toString(),
              messageType: "LOCK_CONFIRM",
              seatId: seat.number.toString(),
            })
          );
        });

        clearTimeout(this.inactiveTimeOut);
        this.$router.push("/passengerDetails");
      } else {
        this.$toast.show("Please select a seat", {
          position: "top",
          type: "error",
        });
      }
     
    },
  },
};
</script>