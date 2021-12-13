<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center sm:ml2 sm:mr2"
  >
    <div>
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center font-nunito">
        Cancellations
      </h1>

      <div
        class="
          flex flex-col
          m-auto
          bg-indigo-900
          text-blue-100
          p-6
          gap-8
          rounded-lg
          border-white
          mt-4
        "
      >
        <div class="flex justify-around">
          <div class="my-auto">
            <div class="text-lg">Refunds Pending</div>
            <div class="text-4xl text-white font-bold text-center">
                kkk
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5"> 
      <table class="min-w-full divide-y divide-gray-200 table-auto">
        <thead class="bg-gray-50">
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
              Customer Details
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
              Ticket Details
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
              Refund Account Details
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
              Amount Refundable
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
              Actions
            </td>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="booking in cancelledBookings"
            :key="booking"
            class="hover:bg-gray-200"
          >
            <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
                Testing
            </td>
            <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
              <p>Origin: </p>
              <p>Destination: </p>
              <p>
                Departure Date:
              </p>
              <p>Departure Time :</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
              Nu {{ booking.amount }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
              <p>
                Bank: {{ booking.bankName }}
              </p>
              <p>
                Account Number: {{ booking.accNo }}
              </p>
              <p>
                Account Name: {{ booking.accName }}
              </p>
            </td>

            <td>
              <button
                @click="openConfirmModal(booking)"
                class="
                  h-10
                  px-5
                  text-indigo-100
                  transition-colors
                  duration-100
                  bg-indigo-700
                  rounded-lg
                  focus:shadow-outline
                  hover:bg-indigo-800
                "
              >
                Confirm Refund
              </button>
            </td>
          </tr>
        </tbody>
      </table>


     
    </div>


    

  </div>
    <vue-final-modal
        v-model="confirmModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div
          class="modal__content text-center mt-1 flex flex-col overflow-visible"
        >
          <h3 class="text-xl mb-5">Are you sure?</h3>

        </div>
          
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="confirmRefund()"
          >
            Confirm Refund          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="confirmModal = false"
          >
            Cancel
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
import { getAllCanelled } from "../../services/bookingServices";
import { cancelBooking } from "../../services/bookingServices";
export default {
  created() {
    getAllCanelled().then((res) => {
      this.cancelledBookings = res.data;
      console.log("CANCELLED",this.cancelledBookings)
      console.log(res.data);
    });
  },
  data() {
    return {
      cancelledBookings: [],
      bookingSelected: {},
      confirmModal: false,
    };
  },
  methods: {
    openConfirmModal(booking) {
      this.bookingSelected = booking;
      this.confirmModal = true
    },

    confirmRefund() {
      let data = {
        checkInStatus: "REFUNDED",
      };
      cancelBooking(this.bookingSelected.id, data).then((res) => {
        if (res.status === 200) {
          this.$toast.show("Amound Succefully Refunded", {
            type: "success",
            position: "top",
          });
          this.refreshData();
          this.confirmModal = false 
        }
      });
    },
    refreshData() {
      getAllCanelled().then((res) => {
        this.cancelledBookings = res.data;
      });
    },
  },
};
</script>