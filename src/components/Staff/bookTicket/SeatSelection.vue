
<template>
  <div class="w-full flex justify-center">
    <div
      id="journeyDetailsMobile"
      class="
        w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
        flex-col
        bg-white
        rounded-lg
        items-center
        justify-center
      "
    >
      <div
        id="journeyDetailsMobile"
        class="md:hidden text-metoPrimary-900 mt-2 bg-gray-200 p-2 rounded-lg"
      >
        <p class="text-xs font-thin">Your Journey</p>
        <div class="flex justify-center font-bold text-xl w-full">
          {{ originSelected?.name }} - {{ destinationSelected?.name }}
        </div>
        <div class="flex justify-center text-sm">
          {{ formattedDepartureDate }}
        </div>
        <div class="flex justify-center text-sm">
          {{ selectedSchedule?.departureTime }}
        </div>
      </div>
    </div>
  </div>

  <div id="seatBookingSection" class="w-full flex justify-center md:my-4">
    <div
      class="
        w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
        flex flex-col
        md:flex-row md:justify-between
      "
    >
      <div id="seatLayout" class="w-full">
        <div
          class="md:hidden flex flex-col gap-2 px-6 py-3 shadow-lg rounded-lg"
        >
          <p
            class="mb-2 text-metoPrimary-900"
            v-if="Number(numberOfPassengers) !== Number(bookedSeats.length)"
          >
            Select
            <strong class="text-2xl"> {{ numberOfPassengers }} </strong> Seats
          </p>
          <div class="flex justify-between mb-2 text-metoPrimary-900" v-else>
            <p>Your Seats</p>
          </div>

          <div v-if="bookedSeats.length">
            <div class="flex justify-start flex-wrap">
              <div v-for="item in bookedSeats" :key="item" class="m-1 p-1">
                <div class="relative" @click="reselectSeats(item)">
                  <img
                    src="../../../assets/yourseats.png"
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
            <p class="text-sm text-metoPrimary-800">
              Click on the seat to reselect Seat
            </p>
          </div>

          <div v-else class="text-metoPrimary-800 text-xs">
            <p class="text-red-400 animate-pulse">No Seats Selected</p>
            <p>Please click on any available seat to book.</p>
          </div>
        </div>

        <div
          class="flex flex-col items-center justify-start sm:ml2 sm:mr2 w-full"
        >
          <div>
            <div class="flex mt-5 justify-evenly">
              <div
                class="
                  text-center
                  flex flex-col
                  justify-center
                  items-center
                  m-2
                "
              >
                <img
                  src="../../../assets/seatAvailable.png"
                  width="25"
                  alt=""
                />
                <p class="text-sm text-gray-600">Available</p>
              </div>
              <div
                class="
                  text-center
                  flex flex-col
                  justify-center
                  items-center
                  m-2
                "
              >
                <img
                  src="../../../assets/seatUnavailable.png"
                  width="25"
                  alt=""
                />
                <p class="text-sm text-gray-600">Booked</p>
              </div>

              <div
                class="
                  text-center
                  flex flex-col
                  justify-center
                  items-center
                  m-2
                "
              >
                <img src="../../../assets/yourseats.png" width="25" alt="" />
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
              <p class="text-xs text-metoPrimary-700">
                Click on any available seat to book
              </p>
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
          <div class="text-metoPrimary-800 hidden md:flex max-w-xl">
            <div
              class="
                hidden
                md:flex
                flex-col
                gap-2
                px-6
                py-3
                shadow-lg
                rounded-lg
              "
            >
              <p class="text-xl mb-2 text-metoPrimary-900">Your Seats</p>

              <div class="" v-if="bookedSeats.length">
                <div class="flex justify-start flex-wrap">
                  <div
                    v-for="item in bookedSeats"
                    :key="item"
                    class="m-1 p-1"
                    @click="reselectSeats(item)"
                  >
                    <div class="relative">
                      <img
                        src="../../../assets/yourseats.png"
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

                <p class="text-sm text-metoPrimary-800">
                  Click on the seat to reselect Seat
                </p>
              </div>

              <div v-else class="text-metoPrimary-800">
                <p class="text-xl animate-pulse text-metoContrast font-bold">
                  No Seats Selected
                </p>
                <p class="text-xl">
                  Please click on any avaialable seat to book.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="billing" class="w-full md:w-1/2 flex flex-col">
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
            <div class="p-2 text-md md:text-xl">
              <p class="mb-2">Billing</p>
              <table class="table-auto font-thin">
                <tr>
                  <td>Base Fare :</td>
                  <td>Nu {{ fare }}</td>
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
                      Nu. {{ fare * bookedSeats.length }}
                    </p>
                  </td>
                </tr>
              </table>
              <p class="text-xs break-words">Base Fare x Booked Seats</p>
            </div>
          </div>
        </div>
        <button
          class="
            l
            px-1
            py-2
            my-4
            md:px-2 md:py-3
            rounded
            text-white
            bg-metoContrast bg-opacity-90
            font-semibold
            text-md
            md:text-xl
          "
          @click="goToPaymentPage"
        >
          Payment
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
      <div class="modal__content text-center mt-5 text-metoPrimary-700">
        <h3 class="text-xl">Book?</h3>

        <h3 class="text-2xl">Seat No {{ selectedSeat.number }}</h3>
      </div>
      <div class="modal__action">
        <button
          class="bg-metoPrimary-600 text-white mt-4 mr-5 p-2 rounded"
          @click="confirmSeat()"
        >
          confirm
        </button>
        <button
          class="bg-metoPrimary-600 text-white mt-4 ml-5 p-2 rounded"
          @click="cancelSeat()"
        >
          cancel
        </button>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="seatsLoadingModal"
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
        <p class="text-center">Fetching Seats Data...</p>
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
  border-radius: 0.2rem;
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
  height: 20vh;
}
</style>
<script>
import {
  deleteBookingwithPassengers,
  updateBooking,
} from "../../../services/bookingServices";
import {
  counterLeaveSeat,
  counterLockSeat,
  getSeatsStatus,
  updateSeatToInPaymentUsingBookingId,
} from "../../../services/seatSelectionServices";
import VueJwtDecode from "vue-jwt-decode";

export default {
  beforeCreate() {
    this.seatsLoadingModal = false;
  },
  created() {
    if (
      this.$store.state.selectedSchedule &&
      this.$store.state.origin &&
      this.$store.state.destination &&
      this.$store.state.formattedDepartureDate &&
      this.$store.state.selectedSchedule
    ) {
      this.seatsLoadingModal = true;
    } else {
      this.$router.push("/staff");
    }

    this.fare = this.$store.state.selectedSchedule?.fare;
    this.roomId = this.$store.state.selectedScheduleHash;
    this.numberOfPassengers = this.$store.state.numberOfPassengers;
    sessionStorage.setItem(
      "scheduleHash",
      this.$store.state.selectedScheduleHash
    );
    this.inactiveTimeout = setTimeout(() => {
      window.location.reload();
    }, 220000);

    getSeatsStatus(
      this.$store.state.selectedScheduleHash,
      Number(sessionStorage.getItem("bookingId"))
    ).then((res) => {
      if (res.status === 200) {
        this.seats = res.data;
        setTimeout(() => {
          this.seatsLoadingModal = false;
        }, 1000);
      } else {
        this.seatsLoadingModal = true;
        this.$toast.show("Network error");
      }
    });
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
      departureTime: this.$store.state.selectedSchedule?.departureTime,
      isConnected: false,
      errorModal: true,
      connectionAttempt: 0,
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
      activeSeat: null,
      selectedSeat: {
        id: 0,
      },
      tempStatus: null,
      numberOfPassengers: 0,
      seatsLoadingModal: false,

      inProgressSeats: [],
      yourSeats: [],
      inactiveTimeout: null,
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

    changeSeatStatus(seatStatusData) {
      seatStatusData.bookedSeats.forEach((seat) => {
        let matchedSeat = this.getSeats(seat.seatNumber);
        matchedSeat.status = "booked";
      });
      seatStatusData.inProgressSeats.forEach((seat) => {
        let matchedSeat = this.getSeats(seat.seatNumber);
        matchedSeat.status = "inProgress";
      });
      seatStatusData.yourSeats.forEach((seat) => {
        if (seat.seatNumber) {
          let matchedSeat = this.getSeats(seat.seatNumber);
          matchedSeat.status = "inProgress";
        }
      });
    },

    reverSeatStatus(arr) {
      arr.forEach((element) => {
        let matchedSeat = this.getSeats(parseInt(element));
        matchedSeat.status = "available";
      });
    },
    bindImage(seat) {
      if (seat.type === "seat" || seat.type === "driver") {
        switch (seat.status) {
          case "available":
            return require("../../../assets/seatAvailable.png");
            break;
          case "entrance":
            return require("../../../assets/entrance.png");
            break;
          case "BOOKED":
            return require("../../../assets/seatUnavailable.png");
            break;
          case "driver":
            return require("../../../assets/steeringwheel.png");
            break;
          case "yourSeat":
            return require("../../../assets/yourseats.png");
            break;
          case "INPROGRESS":
            return require("../../../assets/inprogress.png");
            break;
          default:
            return require("../../../assets/seatAvailable.png");
            break;
        }
      } else {
        return require("../../../assets/seatAvailable.png");
      }
    },
    finalizeBooking() {
      if (this.$store.state.selectedSeats) {
        this.$store.commit("addTotal", this.total);
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
      console.log(
        this.selectedSeat,
        Number(sessionStorage.getItem("bookingId"))
      );
      counterLeaveSeat({
        seatNumber: this.selectedSeat.number,
        bookingId: Number(sessionStorage.getItem("bookingId")),
        scheduleHash: this.$store.state.selectedScheduleHash,
      }).then((res) => {
        getSeatsStatus(
          this.$store.state.selectedScheduleHash,
          Number(sessionStorage.getItem("bookingId"))
        ).then((resp) => {
          if (resp.status === 200) {
            this.seats = resp.data;
          }
        });
        // this.changeSeatStatus(res.data);
        this.showModal = false;
      });
    },
    confirmRevert() {
      console.log(
        this.selectedSeat,
        Number(sessionStorage.getItem("bookingId"))
      );
      this.$store.commit("removeSeat", this.selectedSeat);
      this.total -= this.fare;

      counterLeaveSeat({
        seatNumber: this.selectedSeat.number,
        bookingId: Number(sessionStorage.getItem("bookingId")),
        scheduleHash: this.$store.state.selectedScheduleHash,
      }).then((res) => {
        getSeatsStatus(
          this.$store.state.selectedScheduleHash,
          Number(sessionStorage.getItem("bookingId"))
        ).then((resp) => {
          if (resp.status === 200) {
            this.seats = resp.data;
          }
        });

        this.reverSeatModal = false;
      });
    },
    cancelRevert() {
      this.reverSeatModal = false;
    },
    addSeat(seat) {
      if (seat.type === "seat") {
        this.selectedSeat = seat;
        if (seat.status === "BOOKED") {
          this.$toast.show("The seat is already booked", {
            position: "top",
          });
        } else if (seat.status === "INPROGRESS") {
          this.$toast.show("Someone is booking this seat!", {
            position: "top",
          });
        } else if (seat.status === "yourSeat") {
          this.reverSeatModal = true;
        } else {
          counterLockSeat({
            seatNumber: this.selectedSeat.number,
            bookingId: Number(sessionStorage.getItem("bookingId")),
            scheduleHash: this.$store.state.selectedScheduleHash,
            operatorName:VueJwtDecode.decode(sessionStorage.getItem("token")).name
          })
            .then((res) => {
              getSeatsStatus(
                this.$store.state.selectedScheduleHash,
                Number(sessionStorage.getItem("bookingId"))
              ).then((resp) => {
                if (resp.status === 200) {
                  this.seats = resp.data;
                }
              });
              // this.changeSeatStatus(res.data);
              this.showModal = true;
            })
            .catch((error) => {
              console.log(error.message);
              if (this.selectedSeat.status === "BOOKED") {
                this.$toast.show("Sorry Seat already booked", {
                  position: "top",
                });
              } else {
                this.$toast.show("Some one is Booking the seat", {
                  position: "top",
                });
              }
              getSeatsStatus(
                this.$store.state.selectedScheduleHash,
                Number(sessionStorage.getItem("bookingId"))
              ).then((resp) => {
                if (resp.status === 200) {
                  this.seats = resp.data;
                }
              });
            });
        }
      }
    },

    reselectSeats(seat) {
      console.log("RESELECT SEAT", seat.number);
      this.total -= this.fare;

      counterLeaveSeat({
        seatNumber: seat.number,
        bookingId: Number(sessionStorage.getItem("bookingId")),
        scheduleHash: this.$store.state.selectedScheduleHash,
      }).then((res) => {
        getSeatsStatus(
          this.$store.state.selectedScheduleHash,
          Number(sessionStorage.getItem("bookingId"))
        ).then((resp) => {
          if (resp.status === 200) {
            this.seats = resp.data;
          }
        });
        this.$store.commit("removeSeat", seat);
      });
    },

    goToPaymentPage() {
      clearTimeout(this.inactiveTimeOut);
      updateSeatToInPaymentUsingBookingId(
        Number(sessionStorage.getItem("bookingId"))
      ).then((res) => {
        if (res.status === 200 || res.status === 201) {
          updateBooking(Number(sessionStorage.getItem("bookingId")), {
            amount: this.fare * this.bookedSeats.length,
          }).then((resp) => {
            console.log(resp);
            this.$router.push(`/staff/payment`);
          });
        }
      });
    },
    goBackToBusSelection() {
      clearTimeout(this.inactiveTimeOut);
      this.$store.commit("resetStorePartially");
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/staff/buses") {
      deleteBookingwithPassengers(
        Number(sessionStorage.getItem("bookingId"))
      ).then((res) => {
        if (res.status === 200 || res.status === 201) {
          this.goBackToBusSelection();
          next();
        }
      });
    } else {
      next();
    }
  },
};
</script>