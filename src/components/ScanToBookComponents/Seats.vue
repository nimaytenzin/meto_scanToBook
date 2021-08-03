
<style>
.avialable {
  background-color: red;
}
</style>

<template>
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

    <div class="roundexd  mt-10">

      <div v-if="bookedSeats.length !== 0">
        <h5 class="text-center">Booked Seats</h5>
        <div class="flex flex-row justify-center items-center">
          <div
            v-for="item in bookedSeats"
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
              {{ item }}
            </p>
          </div>
        </div>
      </div>
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
        mt-2  
        items-center
        space-x-4
      "
    >
      <div class="bg-white grid grid-cols-4 gap-2 p-3 m-3 rounded border">
        <div
          v-for="item in seats"
          :key="item.status"
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
    <div class="flex mt-5 justify-evenly">
      <div class="text-center flex flex-col justify-center items-center">
        <img src="../../assets/seatAvailable.png" width="25" alt="" />
        <p class="text-sm text-gray-600">Available</p>
      </div>
      <div class="text-center flex flex-col justify-center items-center">
        <img src="../../assets/seatUnavailable.png" width="25" alt="" />
        <p class="text-sm text-gray-600">Booked</p>
      </div>
    </div>

    <div>
      <vue-final-modal
        v-model="showModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
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
          rounded-l
        "
        @click="this.$router.push('/buses')"
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
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }

  },

  data() {
    return {
      fare: this.$store.state.selectedBus.route.fare,
      total: 0,
      showModal: false,
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
      return this.$store.state.selectedSeats;
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
    bindImage(e) {
      let seat = this.getSeats(e);
      console.log("Binding triggered");
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
          case "active":
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
      if (this.bookedSeats.length !== 0) {
        this.$store.commit("addTotal", this.total);
        this.$router.push("/book/bookings");
      } else {
        alert("Please select seats");
      }
    },

    confirmSeat() {
      this.showModal = false;
      this.selectedSeat.status = "booked";
      this.activeSeat = null;
      this.$store.commit("addSeats", [this.selectedSeat.id]);
      this.total += this.fare;
      this.selectedSeat = {};
    },
    cancelSeat() {
      this.showModal = false;

      this.selectedSeat.status = this.tempStatus;
      this.activeSeat = null;
      this.selectedSeat = {
        id: "",
      };
    },
    wait(n) {
      for (let i = 0; i < n; i++) {}
    },

    addSeat(e) {
      let id = parseInt(e);
      this.selectedSeat = this.getSeats(id);
      this.tempStatus = this.selectedSeat.status;
      if (this.selectedSeat.status !== "booked") {
        this.selectedSeat.status = "active";
        this.activeSeat = id;
        console.log("click registered");
        console.log("bus seat no", id);
        this.wait(10000);
        this.showModal = true;
      } else {
        this.showModal = false;
        return;
      }
    },
  },
};
</script>