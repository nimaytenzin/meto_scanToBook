<template>
  <div class="min-h-screen flex flex-col items-center">
    <div class="flex flex-col justify-center items-center w-full">
      <h1 class="text-3xl text-center text-gray-500 font-nunito mx-4 my-6">
        Cancellations
      </h1>

      <div v-if="cancelledBookings.length" class="w-11/12">
        <table
          class="border-l border-r divide-y divide-gray-200 table-auto w-full"
        >
          <thead class="">
            <tr>
              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Booking Details
              </td>
              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Passengers
              </td>
              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Refund Amount
              </td>

             

              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Action
              </td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in cancelledBookings" :key="booking">
              <td
                class="
                  px-6
                  py-3
                  whitespace-nowrap
                  break-words
                  font-light
                  text-sm
                "
              >
                <p class="text-sm text-center">
                  BookingID: {{ booking.id }}
                </p>
                <p class="text-center">
                  
                  Thimphu - TrashiYangtse <br />
                  on {{ booking.scheduleDate }} <br />
                  <!-- at {{ booking.route.departureTime }} -->

                  <br>
                   Nu.{{ booking.amount }}
                </p>
                <p
                  v-if="booking.modality === 'ONLINE'"
                  class="text-center text-blue-600 font-semibold"
                >
                  Online Booking

                  
                </p>
                <p v-else class="text-center text-green-600 font-semibold">
                  Counter Booking
                </p>
                
              </td>
              <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
                <table class="w-full h-full">
                  <tr>
                    <td
                      class="
                        p-2
                        text-left text-xs
                        font-medium
                        rounded-l
                      "
                    >
                      Name
                    </td>
                    <td
                      class="
                        p-2
                        text-left text-xs
                        font-medium
                       
                        rounded-r
                      "
                    >
                      Contact
                    </td>
                    <td
                      class="
                        p-2
                        text-left text-xs
                        font-medium
                       
                        rounded-r
                      "
                    >
                      CID
                    </td>
                  </tr>
                  <tr v-for="passenger in booking.passengers" :key="passenger">
                    <td class="pl-2">{{ passenger.name }}</td>
                    <td class="pl-2">{{ passenger.contact }}</td>
                      <td class="pl-2">{{ passenger.cid }}</td>
                  </tr>
                </table>
              </td>
              <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
               Booking Amount: Nu. {{booking.amount  }} <br>
               Eligible for {{booking.refundPercentage  }} % refund <br>
               Refund Amount: Nu. {{ Math.round(booking.amount * (booking.refundPercentage/100))  }}
              </td>

              <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
                <button
                  @click="showRefundModal(booking.id)"
                  class="p-2 bg-gray-600 text-gray-100 rounded-sm"
                >
                  Confirm Refund
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="w-full">
        <div class="text-gray-700 flex gap-2 items-center px-10 text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Hurray!! No Cancelled Tickets
        </div>
      </div>
    </div>
  </div>

  <vue-final-modal
    v-model="refundBookingModal"
    classes="modal-container"
    content-class="modal-content"
    class="w-max-screen"
  >
    <div class="modal__content text-center mt-1 flex flex-col gap-2">
      <h3 class="text-xl">Confirm Refund?</h3>
    </div>
    <div class="modal__action">
      <button
        class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
        @click="confirmRefund()"
      >
        Confirm
      </button>
      <button
        class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
        @click="refundBookingModal = false"
      >
        cancel
      </button>
    </div>
  </vue-final-modal>
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
::v-deep .modal-content2 {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  min-width: max-content;
  margin: 0;
  padding: 0;
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
  getCancelledBooking,
  updateBooking,
} from "../../services/bookingServices";

export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      cancelledBookings: [],
      refundBookingModal: false,
      selectedBookingId: null,
    };
  },
  methods: {
    fetchData() {
      getCancelledBooking().then((res) => {
        this.cancelledBookings = res.data;
        console.log(res.data)
      });
    },
    showRefundModal(bookingId) {
      this.selectedBookingId = bookingId;
      this.refundBookingModal = true;
    },
    parseDepartureDate(date) {
      let d = new Date(date);
      return d.toDateString();
    },
    confirmRefund() {
      updateBooking(this.selectedBookingId, {
        bookingStatus: "REFUNDED",
      }).then((res) => {
        if (res.status === 200) {
          this.$toast.show("Refund Successfull");
          this.refundBookingModal = false;
          this.fetchData();
        }
      });
    },
  },
};
</script>