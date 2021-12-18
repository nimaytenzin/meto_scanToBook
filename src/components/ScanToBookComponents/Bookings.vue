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
        p-4
        mx-auto
        bg-white
        rounded-xl
        shadow-md
        min-w-6/12
        mt-7
        items-center
        space-x-2
      "
    >
      <div class="flex flex-col">
        <div class="flex flex-col">
          <div class="flex flex-row justify-around items-center">
            <div class="flex flex-col">
              <p class="text-sm text-center text-gray-600">(origin)</p>
              <h1 class="text-center text-3xl text-blue-800">
                {{ this.$store.state.origin.name }}
              </h1>
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
              <h1 class="text-center text-3xl text-blue-800">
                {{ this.$store.state.destination.name }}
              </h1>
            </div>
          </div>
          <p class="text-center mt-4 text-gray-500 italic">on</p>
          <h2 class="text-center text-2xl text-gray-600">
            {{ departureDate }}
          </h2>
        </div>
        <br />

        <div
          class="
            font-nunito
            text-gray-200 text-left
            bg-gray-600
            rounded
            shadow-md
            p-2
          "
        >
          <p>Billing</p>
         
          <hr class="border-dashed w-full" />
          <table class="table-auto">
            <tr>
              <td>Base Fare :</td> 
              <td>
                Nu
                {{
                  this.$store.state.selectedSchedule?.fare
                    ? this.$store.state.selectedSchedule.fare
                    : ""
                }}
              </td>
            </tr>
            <tr>
              <td>Service Charge :</td>
              <td>Nu {{ serviceCharge }}</td>
            </tr>
            <tr>
              <td>Seats Booked :</td>
              <td>{{ this.$store.state.selectedSeats.length }}</td>
            </tr>
            <tr>
              <td>
                <hr class="w-full border-dashed" />
              </td>
              <td></td>
            </tr>
            <tr class="text-gray-100 font-bold text-xl">
              <td>Total :</td>
              <td>
                {{ total }}
              </td>
            </tr>
          </table>
           <p class="text-sm break-words"> 
          Fare Calculation <br>
          (Base Fare + Service Charge) x Booked Seats
          </p>
        </div>

        <div class="flex-1 text-center">
          <hr class="border-dashed mt-4 mb-4" />
          <p class="text-xl font-semibold text-gray-600">
            Enter Passenger Details
          </p>
          <p class="text-center font-thin text-sm">
            Please Ensure Phone Numbers are Correct
          </p>
          <div class="flex flex-col justify-center items-center">
            <div
              class="flex flex-row gap-2 items-center"
              v-for="(item, index) in this.$store.state.selectedSeats"
              :key="item"
            >
              <div class="p-1 rounded relative">
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
              <div class="flex flex-col mt-4">
                <p class="my-1 text-gray-800 font-thin">
                  Passenger {{ index + 1 }}
                </p>
                <input
                  v-model="this.passengers[index].name"
                  placeholder="Name"
                  class="
                    appearance-none
                    border-b
                    rounded-sm
                    w-full
                    py-2
                    px-2
                    text-gray-700
                    leading-tight
                    focus:outline-none focus:shadow-outline
                  "
                />
                <input
                  v-model="this.passengers[index].contact"
                  type="number"
                  placeholder="Contact"
                  class="
                    appearance-none
                    border-b
                    rounded
                    w-full
                    py-2
                    px-2
                    text-gray-700
                    leading-tight
                    focus:outline-none focus:shadow-outline
                  "
                />
                <input
                  v-model="this.passengers[index].cid"
                  placeholder="CID/EID/WorkPermit"
                  class="
                    appearance-none
                    border-b
                    rounded
                    w-full
                    py-2
                    px-2
                    text-gray-700
                    leading-tight
                    focus:outline-none focus:shadow-outline
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <p class="text-center break-words font-thin text-sm mt-3">
            Please Ensure Details are Correct. <br> The company wont be liable for any wrong details entered
          </p>
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

  <style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>


<script>
import { addNewBooking } from "../../services/bookingServices";
import { getServiceCharge } from "../../services/paymentServices";
export default {
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
    getServiceCharge().then((res) => {
      this.serviceCharge = res.data.serviceCharge;
      this.total = (this.$store.state.selectedSchedule.fare + this.serviceCharge) * this.$store.state.selectedSeats.length;
    });
    this.$store.state.selectedSeats.forEach((seat) => {
      this.passengers.push({seatNumber:seat.number});
    });
    
  },
  data() {
    return {
      name: "",
      contact: "",
      cid: "",
      newBooking: {},
      seats: [],
      passengers: [],
      serviceCharge: null,
      total: 0,
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
      let booking = {
        booking: {
          routeId: this.$store.state.selectedSchedule.id,
          modality: "Online",
          amount: this.total,
          scheduleHash:this.$store.state.scanRoomID,
          scheduleDate:this.$store.state.departureDate
        },
        passengers: this.passengers,
      };
      addNewBooking(booking).then((res) => {
        if (res.status === 201) {
          this.$store.commit("addScanBookingId", res.data.id);
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
    }
  },
};
</script>