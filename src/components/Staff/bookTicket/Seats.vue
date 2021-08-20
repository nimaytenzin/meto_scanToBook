
<style>
.avialable {
  background-color: red;
}
</style>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center sm:ml2 sm:mr2"
  >
   
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center">Select Seats</h1>
    
    </div>

    <div class="flex mt-5 justify-evenly">
      <div class="text-center flex flex-col justify-center items-center m-2">
        <img src="../../../assets/seatAvailable.png" width="25" alt="" />
        <p class="text-sm text-gray-600">Available</p>
      </div>
      <div class="text-center flex flex-col justify-center items-center m-2">
        <img src="../../../assets/seatUnavailable.png" width="25" alt="" />
        <p class="text-sm text-gray-600">Booked</p>
      </div>

      <div class="text-center flex flex-col justify-center items-center m-2">
        <img src="../../../assets/seatSelected.png" width="25" alt="" />
        <p class="text-sm text-gray-600">Being Booked</p>
      </div>
    </div>

    <div class="mt-2 text-left bg-blue-100 p-2 rounded text-gray-800">
      <h4>Base Fare: Nu.{{ fare }}</h4>
      <h4>Total: Nu.{{ total }}</h4>
    </div>

    <div
      class="
        p-1
        mx-auto
        bg-white
        rounded-xl
        shadow-md
        mt-1
        items-center
        space-x-4
      "
    >
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
    <div class="roundexd mt-2">
      <div v-if="bookedSeats.length !== 0">
        <h5 class="text-center">Booked Seats</h5>
        <div class="flex flex-row justify-center items-center">
          <div
            v-for="item in bookedSeats"
            :key="item"
            class="m-1 p-1 rounded relative"
          >
            <img src="../../../assets/seatUnavailable.png" width="50" alt="" />
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

    <div>
      <vue-final-modal
        v-model="showModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
        :click-to-close="false"
      >
        <div class="modal__content text-center mt-5">
          <h3 class="text-xl">Book ?</h3>

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
        Customer Details
      </button>
    </div>
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
export default {
  created() {
    if(!Object.keys(this.$store.state.customerBooking.schedule).length){
      console.log('ok')
      this.$router.push("/staff/")
    }

    this.changeSeatStatus();
    this.fare = this.$store.state.customerBooking?.schedule?.route?.fare
      ? this.$store.state.customerBooking.schedule.route.fare
      : 0;

    this.roomId = this.$store.state.customerBooking.schedule.id
    this.conn = new WebSocket(
      "ws://" + "www.meto-tranport.com" + "/ws/" + this.roomId
    );

    this.conn.onopen = (event) => {
      console.log("Successfully connected to the echo websocket server");
      this.changeSeatStatus();
    };

    this.conn.onclose = (evt) => {
      console.log("connection closed");
      console.log(evt);
    };
    this.conn.onmessage = (evt) => {
      console.log("message recieved");
      let messageJson = JSON.parse(evt.data);
      this.lockedSeats = messageJson.lockedList;

      if (messageJson.messageType === "LOCK") {
        this.changeSeatStatus();
      } else if (messageJson.messageType === "LOCK_LEAVE") {
        this.reverSeatStatus(messageJson.leaveList);
      } else if (messageJson.messageType === "LOCK_CONFIRM") {
      }
    };
  },

  data() {
    return {
      fare: 0,
      total: 0,
      //schedule id = room id for the websocket
      msg: {},
      lockedSeats: [],
      roomId:0,
      conn: null,

      showModal: false,
      reverSeatModal: false,
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
      activeSeat: null,
      selectedSeat: {
        id: 0,
      },
      tempStatus: null,
    };
  },
  computed: {
    bookedSeats() {
      return this.$store.state.customerBooking.seats;
    },
  },
  methods: {
    show() {
      this.$modal.show("my-first-modal");
    },
    getSeats(id) {
      for (let i = 0; i < this.seats.length; i++) {
        if (this.seats[i].id === id) {
          return this.seats[i];
        }
      }
      return null;
    },
    matchBookedSeat(id) {
      let bookedSeats = this.$store.state.selectedSeats;
      console.log(bookedSeats);
      for (let i = 0; i < bookedSeats.length; i++) {
        if (bookedSeats[i].id === id) {
          return bookedSeats[i];
        }
      }
      return null;
    },
    previous() {
      this.$router.push("/staff/");
    },

    changeSeatStatus() {
      this.lockedSeats.forEach((element) => {
        if (this.$store.state.selectedSeats.length !== 0) {
          this.$store.state.selectedSeats.forEach((bookedSeat) => {
            let matchedSeat = this.getSeats(element);
            if (element === bookedSeat.id) {
              matchedSeat.status = "booked";
            } else {
              matchedSeat.status = "locked";
            }
          });
        } else {
          let matchedSeat = this.getSeats(element);
          matchedSeat.status = "locked";
        }
      });
    },

    reverSeatStatus(arr) {
      arr.forEach((element) => {
        let matchedSeat = this.getSeats(parseInt(element));
        let matchedBookedSeat = this.matchBookedSeat(parseInt(element));
        console.log("ATTENTION HERE");
        console.log(matchedBookedSeat, matchedSeat, "okfdfh");
        console.log("ATTENTION HERE");
        matchedSeat.status = "available";
      });
      this.showModal = false;
    },
    bindImage(e) {
      let seat = this.getSeats(e);
      if (seat !== null) {
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

    finalizeBooking() {
      if (this.bookedSeats.length !== 0) {
        this.$store.commit("commitCustomerTotal", this.total);
        this.$router.push("/staff/passenger");
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

      this.conn.send(
        JSON.stringify({
          roomId: this.roomId.toString(),
          messageType: "LOCK_CONFIRM",
          seatId: this.selectedSeat.id.toString(),
        })
      );
      this.activeSeat = null;
      this.$store.commit("commitCustomerSeats", [this.selectedSeat]);
      this.total += this.fare;
      this.selectedSeat = {};
    },
    cancelSeat() {
      this.conn.send(
        JSON.stringify({
          roomId: this.roomId.toString(),
          messageType: "LOCK_LEAVE",
          seatId: this.selectedSeat.id.toString(),
        })
      );
    },

    confirmRevert() {
      // add logic to remove seats fromthe seleceted sreats store

      this.conn.send(
        JSON.stringify({
          roomId: this.roomId.toString(),
          messageType: "LOCK_LEAVE",
          seatId: this.selectedSeat.id.toString(),
        })
      );
      this.selectedSeat.status = "available";
      this.$store.commit("commitRemoveCustomerSeat", this.selectedSeat);
      this.total -= this.fare;
      this.selectedSeat = {};
      this.reverSeatModal = false;
    },
    cancelRevert() {
      this.reverSeatModal = false;
    },

    addSeat(e) {
      let id = parseInt(e);
      this.selectedSeat = this.getSeats(id);

      console.log("selected seat", this.selectedSeat);

      if (this.selectedSeat.status === "locked") {
        this.$toast.show("The seat is being booked", {
          position: "top",
          type: "error",
        });
      } else if (this.selectedSeat.status === "booked") {
        this.reverSeatModal = true;
        // this.$toast.show("Lock leave?", {
        //   position: "top",
        //   type: "error",
        // });
      } else {
        this.conn.send(
          JSON.stringify({
            roomId: this.roomId.toString(),
            messageType: "LOCK",
            seatId: e.toString(),
          })
        );

        this.showModal = true;
      }
    },
  },
};
</script>