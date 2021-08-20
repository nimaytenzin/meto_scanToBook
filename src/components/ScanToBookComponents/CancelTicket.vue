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
          <div class="text-center font-light mt-4 mb-2">
            Ticket Details

            <p>Origin: {{ bookingData.schedule?.route?.origin.name }}</p>
            <p>
              Destination: {{ bookingData.schedule?.route?.destination.name }}
            </p>
            <p>
              Departure Date:
              {{ bookingData.schedule?.calendarDate?.Month_Name }}
              {{ bookingData.schedule?.calendarDate?.Calendar_Day }}
              {{ bookingData.schedule?.calendarDate?.Calendar_Year }}
            </p>
            <p>
              Departure Time: {{ bookingData.schedule?.route?.departureTime }}
            </p>

            <h2 class="text-xl">Refund Amount : Nu {{ bookingData.amount }}</h2>
          </div>

          <div class="text-center font-light mt-4 mb-2 rounded-lg border-white">
            <table>
              <tr>
                <td class="text-left">Bank Name</td>
                <td class="font-bold text-xl">
                  <input
                    class=""
                    type="text"
                    placeholder="Bank Name"
                    v-model="refundAccountDetails.bankName"
                  />
                </td>
              </tr>
              <tr>
                <td class="text-left">Account Number</td>
                <td class="font-bold text-xl">
                  <input
                    class=""
                    type="text"
                    placeholder="Account Number"
                    v-model="refundAccountDetails.accNo"
                  />
                </td>
              </tr>
              <tr>
                <td class="text-left">Account Name</td>
                <td class="font-bold text-xl">
                  <input
                    class=""
                    type="text"
                    placeholder="Account Name"
                    v-model="refundAccountDetails.accName"
                  />
                </td>
              </tr>
            </table>
          </div>

          <div class="flex justify-center">
            <button
              @click="cancelTicket()"
              v-if="!update"
              class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            >
              Cancel Ticket
            </button>
            <button
              v-else
              @click="updateDetails()"
              class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            >
              Update Details
            </button>
          </div>

          <p class="text-center text-gray-500 text-sm mt-4 mb-4">
            Refund may take few days depending on the refund requests recieved.
            <br />
            Ensuring Safety, Reliability,Comfort till your destination.
          </p>
        </div>

        <div
          v-else
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
          <h2 class="text-2xl text-center">Amount Refunded</h2>

          <p class="text-center text-blue-100 text-sm mt-4 mb-4">
            Thank you for choosing Meto Transport.Avail our services for your
            next ride. <br />
            Ensuring Safety, Reliability,Comfort till your destination.
          </p>
        </div>
      </div>
    </div>
    <vue-final-modal
      v-model="confirmDetailsModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center mt-5">
        <h3 class="text-xl">Confirm Details</h3>
        <div>
          <h2>Account Number: {{ refundAccountDetails.accNo }}</h2>
          <h2>Account Name: {{ refundAccountDetails.accName }}</h2>
        </div>
        <div
          class="
            flex flex-col
            m-auto
            bg-white
            text-gray-800
            p-6
            italic
            rounded-lg
            border-white
            mt-4
            flex-wrap
            break-words
            text-justify
          "
        >
          <span class="text-center">Cancellation and Refund Policy</span>

          <p>
            Cancellation shall be allowed
            <span class="text-md font-bold text-red-900">2hours before</span>
            from the departure time reflected on the ticket.
          </p>

          <p>
            The company shall not be responsible for wrong account details sent.
          </p>

          <p>
            The company wont disclose the personal details like CID,Account
            number and Name collected for purpose other than delivering its
            services.
          </p>

          <a
            href="/policy/privacy"
            target="_blank"
            class="text-blue-400 italic"
          >
            Our Privacy Policy
          </a>
          <a
            href="/policy/privacy"
            target="_blank"
            class="text-blue-400 italic"
          >
            Our Refund Policy
          </a>
        </div>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="confirmCancel()"
        >
          I have read the company policies and i agree
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="confirmDetailsModal = false"
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
  max-width: max-content;
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
  getBookingDetail,
  cancelBooking,
  updateBooking,
} from "../../services/bookingServices";
export default {
  data() {
    return {
      bookingId: null,
      bookingData: {},
      refunded: false,
      update: false,
      refundAccountDetails: {
        accNo: 0,
        accName: "",
        bankName: "",
        checkInStatus: "CANCELLED",
      },
      confirmDetailsModal: false,
      socketConn: null,
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
          console.log(res.data);
          if (res.data.accNo) {
            this.refundAccountDetails.bankName = res.data.bankName;
            this.refundAccountDetails.accNo = res.data.accNo;
            this.refundAccountDetails.accName = res.data.accName;
            this.update = true;
          }

          this.socketConn = new WebSocket(
            "ws://" + "www.meto-tranport.com" + "/ws/" + res.data.scheduleId
          );
          this.socketConn.onopen = (event) => {
            console.log("Successfully connected to the echo websocket server");
          };
          this.socketConn.onclose = (evt) => {
            console.log("WSS CONNECTION closed");
            console.log("RECONNECTING");
            this.conn = new WebSocket(
              "ws://" + "www.meto-tranport.com" + "/ws/" + roomId
            );
          };
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
    confirmCancel() {
      cancelBooking(this.bookingId, this.refundAccountDetails).then((res) => {
        if (res.status === 200) {
          this.bookingData.bookedSeats.forEach((element) => {
            this.socketConn.send(
              JSON.stringify({
                roomId: this.bookingData.scheduleId.toString(),
                messageType: "LOCK_LEAVE",
                seatId: element.seatNumber.toString(),
              })
            );
          });
          this.$toast.show("Successfull", {
            position: "top",
            type: "success",
          });
          this.$router.go();
        } else {
          this.$toast.show("Network Error", {
            position: "top",
            type: "error",
          });
        }
      });
    },
    updateDetails() {
      updateBooking(this.bookingData.id, {
        bankName: this.refundAccountDetails.bankName,
        accNo: this.refundAccountDetails.accNo,
        accName: this.refundAccountDetails.accName,
      }).then((res) => {
        if (res.status === 200) {
          this.$toast.show("Updated", {
            type: "success",
            position: "top",
          });
        }
      });
    },
    cancelTicket() {
      if (
        this.refundAccountDetails.accNo &&
        this.refundAccountDetails.bankName &&
        this.refundAccountDetails.accName
      ) {
        this.confirmDetailsModal = true;
      } else {
        this.$toast.show("Please enter your details", {
          position: "top",
          type: "error",
        });
      }
    },
  },
};
</script>