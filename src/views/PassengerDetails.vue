
<template>
  <div class="relative flex justify-center items-center" id="heroSection3">
    <div
      class="absolute top-0 w-full h-full bg-center bg-cover z-0"
      :style="{
        'background-image': 'url(' + require('../assets/bg.jpeg') + ')',
      }"
    >
      <span
        id="blackOverlay"
        class="
          w-full
          h-full
          absolute
          bg-gradient-to-r
          from-black
          via-metoPrimary-900
          to-transparent
          opacity-80
          z-0
        "
      ></span>
    </div>

    <div
      class="
        w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
        z-0
        flex
        justify-start
        overflow-scroll
        text-gray-200
      "
    >
      <div class="w-full md:w-1/2 flex-col">
        <h1 class="font-semibold text-xl md:text-5xl">
          Your Journey starts with us. {{ total  }}
        </h1>
        <div class="flex flex-col text-sm mt-4">
          <div class="flex text-sm md:text-xl gap-2 items-center">
            Ensuring Safety, Reliability and Comfort till your Destination
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    id="scheduleRouteDetails"
    class="
      hidden
      w-full
      md:flex
      justify-center
      overflow-scroll
      text-gray-200
      -mt-10
      rounded-lg
    "
  >
    <div
      class="
        w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
        flex-col
        z-50
        bg-white
        rounded-lg
      "
    >
      <div class="flex place-content-stretch text-metoPrimary-900 rounded-lg">
        <div
          class="
            w-1/3
            flex flex-col
            text-xl
            rounded-l-lg
            items-start
            justify-center
            px-2
            py-1
            bg-metoPrimary-800
            text-gray-100
          "
        >
          <p class="px-2 text-xs">Origin</p>
          <p class="px-2 py-1 bg-transparent w-full">
            {{ originSelected.name }}
          </p>

          <p class="px-2 pt-2 text-xs">Destination</p>
          <p class="px-2 py-1 bg-transparent w-full">
            {{ destinationSelected.name }}
          </p>
        </div>
        <div
          class="
            w-1/3
            flex flex-col
            text-xl
            border-b border-metoPrimary-800
            items-start
            justify-center
            px-2
            py-1
          "
        >
          <p class="px-2 text-xs">Departure Date</p>
          <p class="px-2 py-1 bg-transparent w-full">
            {{ formattedDepartureDate }}
          </p>

          <p class="px-2 text-xs pt-2">Departure Time</p>
          <p class="px-2 py-1 bg-transparent w-full">
            {{ selectedSchedule.departureTime }}
          </p>
        </div>
        <div
          class="
            w-1/3
            flex flex-col
            text-xl
            bg-metoPrimary-800
            text-gray-100
            items-start
            justify-center
            px-2
            py-1
          "
        >
          <p class="px-2 text-xs">Fare(Per Seat)</p>
          <p class="px-2 py-1 bg-transparent w-full">
            Nu. {{ selectedSchedule.fare }}
          </p>

          <p class="px-2 text-xs pt-2">Service Charge (Per Seat)</p>
          <p class="px-2 py-1 bg-transparent w-full">Nu. {{ serviceCharge }}</p>
        </div>
      </div>
    </div>
  </div>

  <div id="seatBookingSection" class="w-full flex justify-center my-4">
    <div
      class="
        w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
        flex flex-col
        md:flex-row
        min-h-screen
      "
    >
      <div id="passengerDetails" class="w-full md:w-7/12 flex flex-col">
        <div class="p-6 w-full">
          <p class="text-md text-metoPrimary-900">
            Enter Passenger Details | {{ bookedSeats.length }} Passengers
          </p>
          <div
            class="flex flex-row gap-4 items-center w-full"
            v-for="(item, index) in bookedSeats"
            :key="item"
          >
            <div class="p-1 rounded relative">
              <img src="../assets/yourseats.png" class="w-16 h-auto" alt="" />
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
            <div class="w-full flex flex-col mt-4">
              <p class="my-1 text-gray-800 font-thin">
                Passenger {{ index + 1 }}
              </p>
              <input
                v-model="passengers[index].name"
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
                v-model="passengers[index].contact"
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
                v-model="passengers[index].cid"
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
      <div id="billing" class="w-full md:w-5/12 flex flex-col">
        <div
          class="
            font-nunito
            text-gray-200 text-sm text-left
            bg-metoPrimary-800
            rounded
            shadow-md
            px-6
            py-3
          "
        >
          <div>
            <div class="p-2">
              <p class="text-xl mb-2">Billing</p>
              <table class="table-auto text-xl font-thin">
                <tr>
                  <td>Base Fare :</td>
                  <td>Nu {{ selectedSchedule.fare }}</td>
                </tr>
                <tr>
                  <td>Service Charge :</td>
                  <td>Nu {{ serviceCharge }}</td>
                </tr>
                <tr>
                  <td>Seats Booked :</td>
                  <td>{{ bookedSeats.length }}</td>
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
                    <p class="text-xl font-semibold">
                      Nu.
                      {{
                        (selectedSchedule.fare + serviceCharge) *
                        bookedSeats.length
                      }}
                    </p>
                  </td>
                </tr>
              </table>
              <p class="text-xs break-words">
                (Base Fare + Service Charge) x Booked Seats
              </p>
            </div>
          </div>
        </div>

        <div
          class="hidden md:flex flex-col gap-2 px-6 py-3 shadow-lg rounded-lg"
        >
          <p class="text-xl mb-2 text-metoPrimary-900">Your Seats</p>

          <div class="flex justify-start flex-wrap" v-if="bookedSeats.length">
            <div v-for="item in bookedSeats" :key="item" class="m-1 p-1">
              <div class="relative">
                <img
                  src="../assets/yourseats.png"
                  width="60"
                  alt=""
                  rel="preload"
                />
                <p
                  class="
                    absolute
                    top-1/2
                    left-1/2
                    rounded-sm
                    text-white
                    font-bold
                    transform
                    -translate-x-1/2 -translate-y-1/2
                  "
                >
                  {{ item.number }}
                </p>
              </div>
            </div>
          </div>

          <div v-else class="text-metoPrimary-800">
            <p>No Seats Selected</p>
            <p>Please click on any avaialable seat to book.</p>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            v-if="bookedSeats.length"
            class="
              px-1
              py-2
              my-4
              md:px-2 md:py-3
              rounded
              text-white
              bg-metoContrast
              font-semibold
              text-md
              w-full
              md:text-xl
            "
            @click="showTermsAndConditionModal()"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  </div>

  <vue-final-modal
    v-model="termsAndConditionModal"
    classes="flex justify-center items-center"
    content-class="modal-content rounded-lg"
    class="w-max-screen"
  >
    <div>
      <div
        class="
          my-4
          text-metoPrimary-800 text-justify
          bg-white
          p-4
          rounded
          h-full
        "
      >
        <p class="text-xl">Terms & Condition</p>

        <div class="p-1 md:p-4 text-xs md:text-sm">
          <p class="px-2 pt-2">
            The Passenger Details are collected solely for the purpose of
            ensuring that the SMS Ticket confirmation is received by the
            passenger.
          </p>
          <p class="px-2">
            Ticket can be cancelled at any time but the refund percentage will
            be based on the regulations laid out by RSTA as follows:
          </p>

          <table class="table-auto">
            <tr>
              <td class="px-2 py-1 border-b font-semibold">Period</td>
              <td class="px-2 py-1 border-b font-semibold">Refund %</td>
            </tr>
            <tr>
              <td class="px-2 py-1 border-b">
                24 Hours or Earlier before Departure
              </td>
              <td class="px-2 py-1 border-b">100% Refund</td>
            </tr>
            <tr>
              <td class="px-2 py-1 border-b">12- 24 hrs before Departure</td>
              <td class="px-2 py-1 border-b">95% Refund</td>
            </tr>
            <tr>
              <td class="px-2 py-1 border-b">5-12 Hrs before Departure</td>
              <td class="px-2 py-1 border-b">90% refund</td>
            </tr>
            <tr>
              <td class="px-2 py-1 border-b">1-5 Hrs before Departure</td>
              <td class="px-2 py-1 border-b">80% refund</td>
            </tr>
            <tr>
              <td class="px-2 py-1 border-b">
                1 hr - 30 mins before Departure
              </td>
              <td class="px-2 py-1 border-b">75% refund</td>
            </tr>
            <tr>
              <td class="px-2 py-1 border-b">Within 30 mins of Departure</td>
              <td class="px-2 py-1 border-b">No Refund</td>
            </tr>
          </table>
          <p class="px-2 pt-2 italic">(RSTA, RGOB)</p>
          <p class="px-2 pt-2">
            The refund may take two to three working days.
          </p>
        </div>
      </div>

      <div class="flex gap-2 w-full p-1 md:p-6 items-center justify-center">
        <div
          class="w-8 h-8 md:w-10 md:h-10 border border-metoPrimary-900 rounded"
          @click="agreeToTAndC"
        >
          <svg
            v-if="termsAndConditionAgreed"
            xmlns="http://www.w3.org/2000/svg"
            class="h-full w-full fill-current text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="w-max px-2 rounded-md flex">
          <div v-if="!termsAndConditionAgreed">
            <p class="p-1 rounded px-2 md:p-2 text-white bg-metoContrast">
              Click on the Box to agree
            </p>
          </div>

          <div v-else class="flex">
            <button
              class="p-1 rounded px-2 md:p-2 text-white bg-metoPrimary-800"
              @click="proceedToPayment()"
            >
              I Agree & Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<style>
#heroSection3 {
  height: 29vh;
}
</style>


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
  width: auto;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  background: #fff;
  overflow-y: scroll;
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
import { addNewBooking } from "../services/bookingServices";
import { getServiceCharge } from "../services/paymentServices";
export default {
  created() {
    if (
      !this.$store.state.selectedSchedule &&
      !this.$store.state.selectedScheduleHash 
    ) {
      this.$router.push("/");
    } else {
      this.serviceCharge = this.$store.state.serviceCharge
      console.log("service Charge", this.serviceCharge)

      this.total = this.$store.state.selectedSeats.length * ( + this.$store.state.selectedSchedule.fare)
      console.log("TOTAL AMOUNT", this.total)
      this.$store.state.selectedSeats.forEach((seat) => {
        this.passengers.push({ seatNumber: seat.number });
      });
      this.destinationSelected = this.$store.state.destination;
      this.originSelected = this.$store.state.origin;
      this.formattedDepartureDate = this.$store.state.formattedDepartureDate;
      this.selectedSchedule = this.$store.state.selectedSchedule;
      this.bookedSeats =this.$store.state.selectedSeats;
       this.total = this.bookedSeats.length * (this.serviceCharge + this.selectedSchedule.fare)
      console.log("TOTAL AMOUNT", this.total)
    }
  },

  data() {
    return {
      destinationSelected: {},
      originSelected: {},
      formattedDepartureDate: "",
      selectedSchedule: {},
      serviceCharge: null,
      lockedSeats: [],
      roomId: null,
      passengers: [],
      termsAndConditionAgreed: false,
      termsAndConditionModal: false,
      detailsFilled: false,
      total:0,
      bookedSeats:[]
    };
  },
  computed: {
   
  },
  methods: {
    agreeToTAndC() {
      if (this.termsAndConditionAgreed === true) {
        this.termsAndConditionAgreed = false;
      } else {
        this.termsAndConditionAgreed = true;
      }
    },

    showTermsAndConditionModal() {
      this.passengers.forEach((passenger) => {
        if (passenger.name && passenger.cid && passenger.contact) {
          this.detailsFilled = true;
        } else {
          this.detailsFilled = false;
        }
      });
      if (this.detailsFilled) {
        this.termsAndConditionModal = true;
      } else {
        this.$toast.show("Please fill in all the details", {
          position: "top",
          type: "error",
        });
      }
    },
    proceedToPayment() {
      if (this.termsAndConditionAgreed === false) {
        this.$toast.show(
          "Please agree to the terms and Condition by clicking the tick mark",
          {
            position: "top",
          }
        );
      } else {

          
        let booking = {
            booking: {
              routeId: this.$store.state.selectedSchedule.id,
              modality: "Online",
              amount: this.total,
              scheduleHash: this.$store.state.selectedScheduleHash,
              scheduleDate: this.$store.state.departureDate,
              operatorId: null,
              serviceCharge:this.serviceCharge * this.passengers.length,
              refundPercentage:0
            },
            passengers: this.passengers,
          };
          
          console.log("CREATING BOOKING", booking)

        addNewBooking(booking)
            .then((res) => {
              console.log("CREATED NEW", res)
              if (res.status === 201) {
                this.$store.commit("addScanBookingId", res.data.id);
              
                 this.$router.push(`/loadPayment`);
              } else {
                this.$toast.show("Newtork Error..try again", {
                  position: "top",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              if (err.response.status === 409) {
                this.duplicateSeat = true;
                err.response.data.forEach((seat) => {
                  this.$toast.show(
                    `Seat Number ${seat.seatNumber} has been booked `,
                    {
                      position: "top",
                      type: "error",
                      duration: 10000,
                    }
                  );
                });
                this.$toast.show("Please Select another Seat", {
                  position: "top",
                  type: "info",
                });
              } else {
                this.$toast.show("Newtork Error..try again", {
                  position: "top",
                  type: "error",
                });
              }
            });
        
      }
    },
  },
};
</script>