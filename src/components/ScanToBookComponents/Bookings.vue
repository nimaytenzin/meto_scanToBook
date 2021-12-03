<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div>
      <img src="../../assets/meto.png" alt="" width="100" />
    </div>
    <div>
      <h1 class="text-3xl text-gray-500 text-center">Your Booking</h1>
    </div>
    <div
      class="
        p-6
        mx-auto
        bg-white
        rounded-xl
        shadow-md
        min-w-6/12
        mt-7
        items-center
        space-x-4
      "
    >
      <div class="flex flex-col">
        <div class="flex flex-col">
          <div class="flex flex-row justify-around items-center">
            <div class="flex flex-col">
              <p class="text-sm text-center text-gray-600">(origin)</p>
              <h1 class="text-center text-3xl text-blue-300">
                {{ this.$store.state.origin.name }}
              </h1>
              <!-- <p class="text-md text-center">
              ({{ this.$store.state.origin.dzo }})
            </p> -->
            </div>
            <div
              class="
                flex flex-col
                mt-3
                mr-7
                ml-7
                justify-center
                items-center
                justify-items-center
              "
            >
              <p class="text-center mt-4 text-gray-500 italic">to</p>
            </div>
            <div class="flex flex-col">
              <p class="text-sm text-center text-gray-600">(destination)</p>
              <h1 class="text-center text-3xl text-blue-300">
                {{ this.$store.state.destination.name }}
              </h1>
              <!-- <p class="text-md text-center">
              ({{ this.$store.state.destination.dzo }})
            </p> -->
            </div>
          </div>
          <p class="text-center mt-4 text-gray-500 italic">on</p>
          <h2 class="text-center text-2xl text-gray-500">
            {{ departureDate }}
          </h2>
        </div>

        <div class="flex-1 text-center">
          <hr class="border-dashed mt-4 mb-4" />
          <h5>Booked Seats</h5>
          <div class="flex flex-row justify-center items-center">
            <div
              v-for="item in this.$store.state.selectedSeats"
              :key="item"
              class="m-1 p-1 rounded relative"
            >
              <img src="../../assets/seatUnavailable.png" width="50" alt="" />
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
                {{ item.number }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="
            font-nunito
            text-white text-center
            bg-gray-400
            rounded
            shadow-md
            mt-4
          "
        >
          <p class="text-md">
            Base Fare: Nu
            {{
              this.$store.state.selectedBus?.route?.fare
                ? this.$store.state.selectedBus.route.fare
                : ""
            }}
          </p>

          <h2 class="text-md">Total = Nu. {{ this.$store.state.total }}</h2>
        </div>
      </div>
      <div class="flex flex-col mt-4">
        <h2 class="text-xl text-gray-500 italic">Enter your details</h2>
        <label class="block text-gray-700 text-sm font-bold mb-2"> Name </label>
        <input
          v-model="name"
          placeholder="Name"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none
            focus:shadow-outline
          "
        />
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input
          v-model="contact"
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
            text-gray-700
            leading-tight
            focus:outline-none
            focus:shadow-outline
          "
        />
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          CID/EID
        </label>
        <input
          v-model="cid"
          placeholder="CID/EID"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
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
          rounded-r
        "
        @click="pay()"
      >
        Pay and Book >
      </button>
    </div>
  </div>
</template>

<script>
import { addNewBooking } from "../../services/bookingServices";
export default {
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
    this.$store.state.selectedSeats.forEach((seat) => {
      this.seats.push(seat.number);
    });
  },
  data() {
    return {
      name: "",
      contact: "",
      cid: "",
      bookings: {},
      booking: {},
      bookingsWithSeats: {},
      seats: [],
    };
  },
  computed: {
    departureDate() {
      let d = new Date(this.$store.state.departureDate);
      return d.toDateString();
    },
  },

  methods: {
    previous() {
      this.$router.push("/book/seats");
    },
    pay() {
      if (this.name && this.contact && this.cid) {
        this.bookings = {
          scheduleId: this.$store.state.selectedBus.id,
          bookingTime: new Date(),
          customerName: this.name,
          customerContact: this.contact,
          customerCid: this.cid,
          amount: this.$store.state.total,
        };

        this.bookingsWithSeats = {
          booking: this.bookings,
          seats: this.seats,
        };

        addNewBooking(this.bookingsWithSeats).then((res) => {
          if (res.status === 201) {
            this.$store.commit("addScanBookingId", res.data.id);
            this.addDetail();
            this.$toast.show("loading RMA payment gateway", {
              position: "top",
              type: "info",
            });
            this.$router.push(`/book/loadPayment`);
          } else {
            this.$toast.show("Newtork Error..try again", {
              position: "top",
              type: "error",
            });
          }
        });
      } else {
        this.$toast.show("Enter your details", {
          position: "top",
          type: "error",
        });
      }
    },
    addDetail() {
      let user = {
        name: this.name,
        contact: this.contact,
        cid: this.cid,
      };
      this.$store.commit("addBookedBy", user);
    },
  },
};
</script>