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
    <div
      class="mx-auto bg-white rounded-xl shadow-lg min-w-content items-center"
    >
      <div
        class="
          flex flex-col
          max-w-full
          font-nunito
          text-gray-200 text-left
          bg-gray-600
          rounded
          shadow-md
        "
      >
        <div class="flex flex-row justify-between p-3">
          <div>
            <h1 class="text-left text-sm text-gray-100">Meto Transport</h1>
            <h1 class="text-left text-sm text-gray-100">
              ༅༅ ། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།
            </h1>
          </div>
          <div class="rounded-full bg-white">
            <img src="../../assets/meto.png" alt="" class="h-10" />
          </div>
        </div>

        <!-- <div class="p-5 flex flex-col">
          <h1 class="text-2xl">Enter CancelCode Sent via SMS</h1>
          <input
            type="text"
            class="p-2 rounded text-gray-700"
            v-model="cancelcode"
          />
          <button
            @click="verifyCancelCode"
            class="bg-gray-100 text-gray-500 mt-4 p-2 rounded"
          >
            Submit
          </button>
        </div> -->

        <div>
          <div v-if="!refunded">
            <div class="text-center font-light mt-4 mb-2">
              Ticket Details
              <p>Origin: {{ origin }}</p>
              <p>Destination: {{ destination }}</p>
              <p>
                Departure Date: {{ scheduleDate}}
              </p>
              <p>
                Departure Time: {{ departureTime }}
              </p>
              <p>
                Seats: {{ seats }}
              </p>

              <h2 class="text-xl bg-white rounded-sm text-gray-500 my-2">
                Refund Amount : Nu {{ amount }}
              </h2>
            </div>

            <div class=" w-full mt-4 mb-2 rounded-sm bg-white">
             <div class="p-4 gap-2 flex flex-col">
               <h2 class="text-xl text-gray-500 my-2">
                Enter Bank Details
              </h2>
                <input
                class="p-1 rounded-r text-gray-800"
                type="text"
                placeholder="Bank Name"
                v-model="refundAccountDetails.refundBank"
              />

              <input
                class="p-1 rounded-r text-gray-800"
                type="number"
                placeholder="Account Number"
                v-model="refundAccountDetails.refundAcc"
              />

              <input
                class="p-1 rounded-r text-gray-800"
                type="text"
                placeholder="Account Name"
                v-model="refundAccountDetails.refundAccName"
              />
             </div>
            </div>

            <div class="flex justify-center">
              <button
                @click="cancelTicket()"
                v-if="!update"
                class="bg-gray-600  text-white mt-4 ml-5 p-2 rounded"
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

            <p class="text-center text-gray-200 text-sm my-4 px-2">
              Refund may take few days depending on the refund requests
              recieved.
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
          <h2>Account Number: {{ refundAccountDetails.refundAcc}}</h2>
          <h2>Account Name: {{ refundAccountDetails.refundAccName}}</h2>
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
            <span class="text-md font-bold text-red-900">30 minutes before</span>
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
      cancelAuthorized: false,
      origin: "",
      destintion: "",
      seatsBooked: "",
      departureTime: '',
      scheduleDate:"",
      amount:"",
      seats:"",
      refundAccountDetails: {
        refundAcc: "",
        refundBank: "",
        refundAccName: "",
        isAgreed:true,
        bookingStatus: "CANCELLED",
      },
      confirmDetailsModal: false,
      cancelcode: "",
      realCancelCode: "",
    };
  },
  created() {
    this.bookingId = this.$route.params.bookingId;
    getBookingDetail(this.bookingId)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          this.realCancelCode = res.data.cancelcode;
          if (res.data.checkInStatus === "REFUNDED") {
            this.refunded = true;
          }
          this.bookingData = res.data;
          this.origin = this.bookingData.route.routepath.origin.name;
          this.destination = this.bookingData.route.routepath.destination.name;
          this.departureTime = this.bookingData.route.departureTime;
          this.scheduleDate = this.bookingData.scheduleDate
          this.amount = this.bookingData.amount

          let occupiedSeats = []
          this.bookingData.passengers.forEach((x)=>{
            occupiedSeats.push(x.seatNumber)
          })
          this.seats = occupiedSeats.join(",")
          console.log("seats",occupiedSeats)

          if (res.data.refundAcc) {
            this.refundAccountDetails.refundBank= res.data.refundBank;
            this.refundAccountDetails.refundAcc= res.data.refundAcc;
            this.refundAccountDetails.refundAccName= res.data.refundAccName;
            this.update = true;
          }
          // this.socketConn = new WebSocket(
          //   "ws://" + "localhost:8081" + "/ws/" + res.data.scheduleId
          // );
          // this.socketConn.onopen = (event) => {
          //   console.log("Successfully connected to the echo websocket server");
          // };
          // this.socketConn.onclose = (evt) => {
          //   console.log("WSS CONNECTION closed");
          //   console.log("RECONNECTING");
          //   this.conn = new WebSocket(
          //     "ws://" + "localhost:8081" + "/ws/" + roomId
          //   );
          // };
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
    verifyCancelCode() {
      if (this.cancelcode === this.realCancelCode) {
        this.cancelAuthorized = true;
      } else {
        this.cancelAuthorized = false;
        this.$toast.show("CancelCode Doesnot Match, Unathorized", {
          position: "top",
          type: "error",
        });
      }
    },
    confirmCancel() {
      cancelBooking(this.bookingId, this.refundAccountDetails).then((res) => {
        if (res.status === 200) {
          this.$toast.show("Successfull", {
            position: "top",
            type: "success",
          });
          this.$router.go();
        }else if (res.status === 204){
          this.$toast.show("Not eligible for Cancellation. Time limit exceeded.", {
            position: "top",
            type: "error",
          });
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
        bankName: this.refundAccountDetails.refundBank,
        accNo: this.refundAccountDetails.refundAcc,
        accName: this.refundAccountDetails.refundAccName,
        bookingStatus: "CANCELLED",
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
        this.refundAccountDetails.refundAcc&&
        this.refundAccountDetails.refundAccName&&
        this.refundAccountDetails.refundBank
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