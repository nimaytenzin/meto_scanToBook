<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div>
      <img src="../../assets/meto.png" alt="" width="100" />
    </div>
    <div>
      <h1 class="text-3xl text-gray-500 text-center">RMA PAyment Gateway</h1>
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

      <table>
        <tr>
          <td>Schedule Id</td>
          <td>{{ bookings.scheduleId }}</td>
        </tr>

        <tr>
          <td>booking Time</td>
          <td>{{ bookings.bookingTime }}</td>
        </tr>

        <tr>
          <td>Customer Name</td>
          <td>{{ bookings.customerName }}</td>
        </tr>

        <tr>
          <td>customer Contact Id</td>
          <td>{{ bookings.customerContact }}</td>
        </tr>

        <tr>
          <td>Customer CID</td>
          <td>{{ bookings.customerCid }}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>{{ bookings.amount }}</td>
        </tr>
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
        @click="next()"
      >
        Confirm Payment >
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

    this.bookings = {
      scheduleId: this.$store.state.selectedBus.id,
      bookingTime: new Date(),
      customerName: this.$store.state.bookedBy.name,
      customerContact: this.$store.state.bookedBy.contact,
      customerCid: this.$store.state.bookedBy.cid,
      amount: this.$store.state.total,
    };

    this.bookingsWithSeats = {
      booking: this.bookings,
      seats: this.seats,
    };
  },
  data() {
    return {
      name: "",
      contact: "",
      cid: "",
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
      this.$router.push("/book/Bookings");
    },
    next() {
      addNewBooking(this.bookingsWithSeats).then((res) => {
        console.log(res)
        if (res.status === 201) {
          this.$store.commit('addScanBookingId',res.data.id)
          this.$router.push("/book/eticket");
        } else {
          this.$toast.show("Newtork Error..try again", {
            position: "top",
            type: "error",
          });
        }
      });
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