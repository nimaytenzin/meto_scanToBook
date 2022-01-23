
<template>
  <div id="spinner">
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
      <p class="text-center">{{ message }}</p>
    </div>
  </div>
  <div
    class="min-h-screen flex flex-col items-center justify-center sm:ml2 sm:mr2"
  >
    <div>
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center">Select Seats</h1>
      <h1 class="text-3xl text-gray-500 text-center mt-3">
        སྡོད་ཁྲི་གདམ་ཁ་རྐྱབ་གནང་།
      </h1>
    </div>

    <div class="flex mt-5 justify-evenly">
      <div class="text-center flex flex-col justify-center items-center m-2">
        <img src="../../assets/seatAvailable.png" width="25" alt="" />
        <p class="text-sm text-gray-600">Available</p>
      </div>
      <div class="text-center flex flex-col justify-center items-center m-2">
        <img src="../../assets/seatUnavailable.png" width="25" alt="" />
        <p class="text-sm text-gray-600">Booked</p>
      </div>

      <div class="text-center flex flex-col justify-center items-center m-2">
        <img src="../../assets/seatSelected.png" width="25" alt="" />
        <p class="text-sm text-gray-600">Being Booked</p>
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
        class="
          font-nunito
          text-gray-200 text-sm text-left
          bg-gray-600
          rounded
          shadow-md
        "
      >
        <div class="p-2">
          <div>
            <p class="text-center">{{ origin }} to {{ destination }}</p>
          </div>
          <div>
            <p class="text-center">
              Departure on {{ departuredate }} <br />
              {{ departureTime }}
            </p>
          </div>
        </div>
      </div>
      <div class="bg-white grid grid-cols-4 gap-2 p-3 m-3">
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
    <div
      v-if="bookedSeats.length !== 0"
      class="
        font-nunito
        text-gray-200 text-sm text-left
        bg-gray-600
        rounded
        shadow-md
      "
    >
      <div class="p-2">
        <table class="table-auto">
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

      <div>
        <h5 class="text-center">Booked Seats</h5>
        <div class="grid grid-cols-4 justify-items-center bg-white">
          <div
            v-for="item in bookedSeats"
            :key="item"
            class="m-1 p-1 rounded relative"
          >
            <img
              src="../../assets/seatUnavailable.png"
              width="46"
              alt=""
              rel="preload"
            />
            <p
              class="
                absolute
                top-1/2
                left-1/2
                bg-white bg-opacity-20
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
        </div>
      </div>
      <div class="p-2">
        <table>
          <tr class="text-gray-100 font-bold">
            <td>Total :</td>
            <td>
              {{ (total+serviceCharge) * bookedSeats.length }}
            </td>
          </tr>
        </table>
        <p class="text-xs break-words">
          (Base Fare + Service Charge) x Booked Seats
        </p>
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
          <p class="text-center">Connecting to Meto Web Services..</p>
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

    <div class="inline-flex mt-2">
      <button
        class="
          bg-gray-100
          hover:bg-gray-400
          text-gray-500
          hover:text-white
          font-bold
          py-2
          px-4
          rounded-l
        "
        @click="previous()"
      >
        Prev
      </button>

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
        @click="finalizeBooking()"
      >
        Next
      </button>
    </div>
  </div>
</template>
<style scoped>
#spinner {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  transition: opacity 0.2s;
}

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
<script>

export default {
  created() {

    if (
      this.$store.state.origin === ""
    ) {
      this.$router.push("/book");
    } else {
      this.fare = this.$store.state.selectedSchedule?.fare;
      this.roomId = this.$store.state.scanRoomID;
      if (this.$store.state.scanRoomID) {
        this.errorModal = true;
        this.isLoader = true;
        this.connectWs();
      } else {
        this.$router.push("/book");
      }
    }
  },
  mounted: function () {
    setTimeout(function () {
      this.document.getElementById("spinner").remove();
    }, 2000);
  },
  data() {
    return {
      fare: 0,
      total: 0,
      message: "Connecting to Meto Web Services...",
      origin: this.$store.state.origin?.name,
      destination: this.$store.state.destination?.name,
      serviceCharge: this.$store.state.serviceCharge,
      departureTime:this.$store.state.selectedSchedule?.departureTime,
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
      this.conn = new WebSocket(
        `${process.env.VUE_APP_WSS}/${this.roomId}`
      );
      this.conn.onopen = (event) => {
        this.isConnected = true;
        this.connectionAttempt = 0;
        this.errorModal = false;
        this.message = "Loading Seats...";
        console.log("Successfully connected to MetoSocket Server");
        this.socketConnected = true;
      };
      this.conn.onclose = (evt) => {
        this.errorModal = true;
        this.connectionAttempt++;
        console.log("Connection To Meto WSS closed");
        console.log("RECONNECTING");
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
    show() {
      this.$modal.show("my-first-modal");
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
       this.$store.state.selectedSeats.forEach(seat =>{
        let matchedSeat = this.getSeats(seat.number);
        matchedSeat.status = "booked"
      })
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
          this.showModal = true
        }
      }
    },
  },
};
</script>