<template>

  <div class="w-full flex flex-col items-center">
    <div id="journeyDetailsMobile" class="
        w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
        flex-col
        bg-white
        rounded-lg
        items-center
        justify-center
      ">
      <div id="journeyDetailsMobile" class="
            md:hidden
            text-metoPrimary-900
            mt-2  
            bg-gray-200
            p-2
            rounded-lg
          ">
        <p class="text-xs font-thin">Your Journey</p>
        <div class="flex justify-center font-bold text-xl w-full">
          {{ bookingDetails.route?.routepath?.origin?.name }} - {{ bookingDetails.route?.routepath?.destination?.name
          }}
        </div>
        <div class="flex justify-center text-sm">
          {{ bookingDetails.scheduleDate }}
        </div>
        <div class="flex justify-center text-sm">

          {{ bookingDetails.route?.departureTime }}

        </div>
        <div class="flex justify-center items-center gap-2 text-sm">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <p>
            {{ bookingDetails.passengers?.length }}
          </p>
        </div>
        <div class="text-sm my-3">
          <p>
            Passenger Details
          </p>
          <p v-for="(passenger, index) in bookingDetails.passengers" :key="passenger">
            {{ index + 1 }}. {{ passenger.name }} ({{ passenger.contact  }})
          </p>
        </div>
      </div>





    </div>
    <div class="
            font-nunito
            text-gray-200 text-sm text-left
            bg-metoPrimary-800
            rounded
            shadow-md
            px-6
            py-3
            mt-4
             w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
          ">
      <div>
        <div class="p-2">
          <p class="text-xl mb-2">Billing</p>
          <table class="table-auto  font-thin">
            <tr>
              <td>Fare :</td>
              <td>Nu. {{ bookingDetails.route?.fare }}</td>
            </tr>
            <tr>
              <td>Seats :</td>
              <td>{{ bookingDetails.passengers?.length }} </td>
            </tr>
            <tr>
              <td>
                <hr class="w-full border-dashed" />
              </td>
              <td></td>
            </tr>
          </table>
        </div>

        <div class="p-2">
          <table>
            <tr class="text-gray-100 text-xl">
              <td>Total :</td>
              <td>
                <p class="text-xl ">
                  Nu.
                  {{ bookingDetails.amount }}
                </p>
              </td>
            </tr>
          </table>
          <p class="text-xs break-words">
            Base Fare x Booked Seats
          </p>

          <p class="my-2">
            Amount Paid
          </p>
        </div>
      </div>
    </div>
    <div class="mt-4 w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2" v-if="!paymentConfirmed">
      <p class="text-xl font-semibold text-gray-600">
        Select Payment Mode
      </p>
      <select class="
                  w-full
                  h-10
                  px-3
                  text-base
                  placeholder-gray-600
                  border
                  rounded-lg
                  focus:shadow-outline
                " v-model="modality">
        <option value="MBOB" class="bg-white">MBoB</option>
        <option value="CASH" class="bg-white">Cash</option>
      </select>

      <div v-if="modality === 'MBOB'" class="flex flex-col items-center justify-center">
        <p class="text-xl font-semibold text-gray-600">Select Bank</p>
        <select class="
                    w-full
                    block
                    h-10
                    px-3
                    text-base
                    placeholder-gray-600
                    border
                    rounded-lg
                    focus:shadow-outline
                  " v-model="journalDetails.bankName">
          <option v-for="bank in banks" :key="bank" :value="bank" class="bg-white">
            {{ bank }}
          </option>
        </select>

        <input v-model="journalDetails.journalNumber" type="number" placeholder="Journal Number" class="
                    block
                    w-full
                    appearance-none
                    border-b
                    rounded-sm
                    py-2
                    px-2
                    text-gray-700
                    leading-tight
                    focus:outline-none focus:shadow-outline
                  " />
        <input v-model="journalDetails.contactNumber" type="number" placeholder="Phone Number" class="
                    block
                    w-full
                    appearance-none
                    border-b
                    rounded-sm
                    py-2
                    px-2
                    text-gray-700
                    leading-tight
                    focus:outline-none focus:shadow-outline
                  " />
      </div>

      <div class="flex justify-center gap-1  my-4">
        <button class="bg-metoContrast w-1/2 bg-opacity-90 text-red-50 px-4 py-1 rounded-sm" @click="confirmPayment">
          Confirm Payment
        </button>

        <button class="bg-metoContrast w-1/2 bg-opacity-90 text-red-50 px-4 py-1 rounded-sm" @click="confirmPayment">
          Cancel Booking
        </button>

      
      </div>
    </div>

      <button class="my-2 bg-metoPrimary-700 bg-opacity-90 text-red-50 px-4 py-1 rounded-sm" @click="this.$router.push('/staff')">
          Book again
        </button>
     
  </div>



</template>  


<script>
import { getBookingDetail, updateBooking } from '../../../services/bookingServices';
export default {
  data() {
    return {
      modality: '',
      journalDetails: {
        bankName: "",
        journalNumber: "",
        contactNumber: ""
      },
      banks: ["BOB", "BNB", "PNBL", "BDBL", "TBank"],
      bookingId: Number(sessionStorage.getItem("bookingId")),
      bookingDetails: {},
      paymentConfirmed: false
    };
  },

  created() {
    getBookingDetail(this.bookingId).then(res => {
      this.bookingDetails = res.data
      console.log(res.data)
      if (res.data.modality) {
        this.paymentConfirmed = true
      }
    })


  },

  methods: {
    goToSeatSelection() {
      this.$router.push("/staff/seatSelection")
    },
    confirmPayment() {
      let data;
      if (this.modality === "MBOB") {
        data = {
          modality: this.modality,
          depositBank: this.journalDetails.bankName,
          depositJournal: this.journalDetails.journalNumber,
          depositContact: this.journalDetails.contactNumber
        }
      } else {
        data = {
          modality: this.modality,
        }
      }
      updateBooking(this.bookingId, data).then(res => {
        if (res.status === 200) {
          this.paymentConfirmed = true
        }
      })
    }

  },
};
</script>