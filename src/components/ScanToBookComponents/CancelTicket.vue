<template >
  <div
    class="
      min-h-screen
      overflow-hidden
      flex flex-col
      items-center
      justify-center
    "
  >
    <div>
      <img src="../../assets/meto.png" alt="" width="50" />
    </div>

    <div>
      <h1 class="text-2xl text-gray-500 text-center">Cancel Ticket</h1>
      <h1 class="text-2xl text-gray-500 text-center mt-3">ཤོག་འཟིན།</h1>
    </div>
    <div
      class="
        p-6
        mx-auto
        bg-white
        rounded-xl
        shadow-lg
        min-w-content
        mt-1
        items-center
        space-x-4
      "
    >
      <div class="flex flex-col max-w-full p-3 m-3 bg-white">
        <div class="flex flex-row justify-between p-3">
          <div>
            <h1 class="text-left text-sm text-gray-500">Meto Transport</h1>
            <h1 class="text-left text-sm text-gray-500">
              ༅༅ ། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།
            </h1>
          </div>

          <div>
            <img src="../../assets/meto.png" alt="" class="h-10" />
          </div>
        </div>

      

        <div v-if="!refunded">
            <div
          class="
            flex flex-col
            m-auto
            bg-indigo-900
            text-blue-100
            p-6
            italic
            rounded-lg
            border-white
            mt-4
          "
        >
          <p class="text-center">Cancellation and Refund Policy</p>
          <p>
            Cancellation shall be allowed before 2hours from the departure time
            reflected on the ticket.
          </p>

          <p>
            You will be required to enter your account Number and Account name
            to avail refund.
          </p>
          <p>
            The company in any way shall not misuse the data collected for any
            other purpose than to ensure the customer gets the refund amount.
          </p>
          <p>
            The company shall not be responsible for wrong account details sent.
          </p>
        </div>
          <div class="text-center font-light text-2xl mt-4 mb-2">
            Ticket Details

            <p>Origin: {{ bookingData.schedule.route.origin.name }}</p>
            <p>
              Destination: {{ bookingData.schedule.route.destination.name }}
            </p>
            <p>
              Departure Date: {{ bookingData.schedule.calendarDate.Month_Name }}
              {{ bookingData.schedule.calendarDate.Calendar_Day }}
              {{ bookingData.schedule.calendarDate.Calendar_Year }}
            </p>
            <p>
              Departure Time: {{ bookingData.schedule.route.departureTime }}
            </p>
          </div>

          <div
            class="
              text-center
              font-semi-bold
              text-2xl
              mt-4
              mb-2
              rounded-lg
              border-white
            "
          >
            Refund Amount: Nu. {{ bookingData.amount }} <br />

            Account Details: <br />
            <input
              class=""
              type="text"
              placeholder="Bank Name"
              v-model="refundAccountDetails.bankName"
            /><br />
            <input
              class=""
              type="text"
              placeholder="Account Number"
              v-model="refundAccountDetails.accNo"
            /><br />
            <input
              class=""
              type="text"
              placeholder="Account Name"
              v-model="refundAccountDetails.accName"
            />
          </div>

          <div v-if="!refundAccountDetails.accNo">
            <button @click="cancelTicket()">Cancel Ticket</button>
          </div>
          <div v-else>
            <button @click="cancelTicket()">Update Details</button>
          </div>

          <p class="text-center text-gray-500 text-sm mt-4 mb-4">
            Refund may take few days depending on the refund requests recieved.
            <br />
            Ensuring Safety, Reliability,Comfort till your destination.
          </p>
        </div>

        <div v-else class="
            flex flex-col
            m-auto
            bg-indigo-900
            text-blue-100
            p-6
            italic
            rounded-lg
            border-white
            mt-4
          ">
          <h2 class="text-2xl text-center">
              Amount Refunded
          </h2>

          <p class="text-center text-blue-100 text-sm mt-4 mb-4">
Thank you for choosing Meto Transport.Avail our services for your next ride.            <br />
            Ensuring Safety, Reliability,Comfort till your destination.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBookingDetail,
  cancelBooking,
} from "../../services/bookingServices";
export default {
  data() {
    return {
      bookingId: null,
      bookingData: {},
      refunded: false,
      refundAccountDetails: {
        accNo: 0,
        accName: "",
        bankName: "",
        checkInStatus: "CANCELLED",
      },
    };
  },
  created() {
    this.bookingId = this.$route.params.bookingId;

    getBookingDetail(this.bookingId)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.checkInStatus === "REFUNDED") {
            this.refunded = true;
          }
          this.bookingData = res.data;
          this.refundAccountDetails.bankName = res.data.bankName;
          this.refundAccountDetails.accNo = res.data.accNo;
          this.refundAccountDetails.accName = res.data.accName;
        } else {
          this.$toast.show("network Error", {
            type: "error",
            position: "top",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    cancelTicket() {
      console.log(this.refundAccountDetails);
      cancelBooking(this.bookingId, this.refundAccountDetails).then((res) => {
        if (res.status === 200) {
          this.$toast.show("Successfull", {
            position: "top",
            type: "success",
          });
        }
      });
    },
  },
};
</script>