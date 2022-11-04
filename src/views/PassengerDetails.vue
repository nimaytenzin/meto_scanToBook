
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
          Your Journey starts with us.
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
    id="journeyDetailsDesktop"
    class="
      hidden
      w-full
      md:flex
      justify-center
      overflow-scroll
      text-gray-200
      mt-4
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
        border border-metoPrimary-900
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
            {{ originSelected?.name }}
          </p>

          <p class="px-2 pt-2 text-xs">Destination</p>
          <p class="px-2 py-1 bg-transparent w-full">
            {{ destinationSelected?.name }}
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

  <div class="w-full flex justify-center">
    <div
      id="journeyDetailsMobile"
      class="
        w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
        flex-col
        z-50
        bg-white
        rounded-lg
        items-center
        justify-center
      "
    >
      <div
        id="journeyDetailsMobile"
        class="md:hidden text-metoPrimary-900 mt-2 bg-gray-200 p-2 rounded-lg"
      >
        <p class="text-xs font-thin">Your Journey</p>
        <div class="flex justify-center font-bold text-xl w-full">
          {{ originSelected?.name }} - {{ destinationSelected?.name }}
        </div>
        <div class="flex justify-center text-sm">
          {{ formattedDepartureDate }}
        </div>
        <div class="flex justify-center text-sm">
          {{ selectedSchedule.departureTime }}
        </div>
        <div class="flex justify-center items-center gap-2 text-sm">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
              />
            </svg>
          </div>
          <p>
            {{ numberOfPassengers }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div id="seatBookingSection" class="w-full flex justify-center mt-4">
    <div
      class="
        w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
        flex flex-col
        md:flex-row
        min-h-screen
        gap-6
      "
    >
      <div id="passengerDetails" class="w-full md:w-1/2 flex flex-col">
        <p class="text-xl text-metoPrimary-700 my-1">Enter Passenger Details</p>
        <div class="w-full text-metoPrimary-900">
          <div
            class="flex flex-row gap-4 items-center w-full"
            v-for="(passenger, index) in passengers"
            :key="passenger"
          >
            <div class="w-full flex flex-col mt-4 border rounded-sm">
              <p
                class="bg-metoPrimary-600 text-gray-100 py-2 px-2 rounded-t-sm"
              >
                Passenger {{ index + 1 }}
              </p>
              <div class="p-2 flex flex-col">
                <p
                  v-if="passengers[index].name"
                  class="text-xs font-thin -mb-1 z-50"
                >
                  Name
                </p>
                <input
                  v-model="passengers[index].name"
                  placeholder="Name"
                  class="
                    appearance-none
                    w-full
                    py-2
                    leading-tight
                    z-0
                    focus:outline-none focus:shadow-outline
                  "
                />
                <hr />
                <p
                  v-if="passengers[index].contact"
                  class="text-xs font-thin -mb-1 z-50"
                >
                  Phone Number
                </p>
                <input
                  v-model="passengers[index].contact"
                  type="number"
                  placeholder="Contact"
                  class="
                    appearance-none
                    w-full
                    py-2
                    leading-tight
                    z-0
                    focus:outline-none focus:shadow-outline
                  "
                />
                <hr />
                <p
                  v-if="passengers[index].cid"
                  class="text-xs font-thin -mb-1 z-50"
                >
                  CID
                </p>
                <input
                  v-model="passengers[index].cid"
                  placeholder="CID/EID/WorkPermit"
                  class="
                    appearance-none
                    w-full
                    py-2
                    leading-tight
                    z-0
                    focus:outline-none focus:shadow-outline
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="billing" class="w-full md:w-1/2 flex flex-col md:pt-9">
        <div
          class="
            font-nunito
            text-gray-200 text-sm text-left
            bg-metoPrimary-800
            rounded
            shadow-md
            px-6
            py-3
            mt-4
          "
        >
          <div>
            <div class="p-2">
              <p class="text-xl mb-2">Billing</p>
              <table class="table-auto font-thin">
                <tr>
                  <td>Base Fare :</td>
                  <td>Nu {{ selectedSchedule.fare }}</td>
                </tr>
                <tr>
                  <td>Service Charge :</td>
                  <td>Nu {{ serviceCharge }}</td>
                </tr>
                <tr>
                  <td>Passengers :</td>
                  <td>{{ numberOfPassengers }}</td>
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
                    <p class="text-xl">
                      Nu.
                      {{
                        (selectedSchedule.fare + serviceCharge) *
                        numberOfPassengers
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

        <div class="flex gap-2">
          <button
            v-if="detailsFilled"
            class="
              px-1
              py-2
              md:my-4 md:px-2 md:py-3
              rounded
              text-gray-50
              bg-metoContrast bg-opacity-90
              text-md
              w-full
              md:text-xl
            "
            @click="showTermsAndConditionModal()"
          >
            Proceed to SeatSelection
          </button>
        </div>
      </div>
    </div>
  </div>

  <vue-final-modal
    v-model="termsAndConditionModal"
    classes="flex justify-center items-center"
    content-class="modal-content rounded-sm"
    class="w-max-screen"
  >
    <div>
      <div
        class="
          md:max-w-sm
          text-metoPrimary-800 text-justify
          bg-white
          rounded
          h-full
        "
      >
        <div class="flex items-end gap-2 border-b pb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <div class="text-xl">Terms & Condition</div>
        </div>

        <div class="p-1 md:p-4 text-xs md:text-sm">
          <p class="font-semibold">1. Data Privacy</p>
          <p class="px-2 leading-relaxed tracking-wide">
            The Passenger Details are collected solely for the purpose of
            the online booking service and wont be disclosed without the consent of the passenger. 
          </p>
          <p class="mt-2 font-semibold">2. Ticket Refund</p>
          <p class="px-2 font-semibold leading-relaxed tracking-wide">
            Tickets once purchased is not refundable!
          </p>

          <p class="mt-2 font-semibold">3. SMS Alerts</p>
          <p class="px-2 leading-relaxed tracking-wide">
            SMS confirmation will be sent to the number provided in the
            Passenger Details.
          </p>
        </div>
      </div>

      <div class="flex gap-2 justify-center mt-4">
        <div
          class="
            cursor-pointer
            flex
            justify-center
            items-center
            md:py-2
            py-1
            px-2
            border border-metoPrimary-800
            text-metoPrimary-800
          "
          @click="termsAndConditionModal = false"
        >
          <p>Decline</p>
        </div>

        <div class="cursor-pointer flex justify-center items-center">
          <button
            class="py-1 px-2 md:py-2 text-gray-100 bg-metoPrimary-800"
            @click="proceedToPayment()"
          >
            Agree & Proceed
          </button>
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
      this.numberOfPassengers = this.$store.state.numberOfPassengers;
      this.passengers = [];

      console.log(this.numberOfPassengers, this.passengers);
      for (let i = 1; i <= this.numberOfPassengers; i++) {
        this.passengers.push({});
      }
      getServiceCharge().then((res) => {
        this.serviceCharge = res.data.serviceCharge;
        this.$store.commit("addServiceCharge", res.data.serviceCharge);
      });

      this.$store.state.selectedSeats.forEach((seat) => {
        this.passengers.push({ seatNumber: seat.number });
      });
      this.destinationSelected = this.$store.state.destination;
      this.originSelected = this.$store.state.origin;
      this.formattedDepartureDate = this.$store.state.formattedDepartureDate;
      this.selectedSchedule = this.$store.state.selectedSchedule;
      this.total =
        this.numberOfPassengers *
        (this.serviceCharge + this.selectedSchedule.fare);
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
      numberOfPassengers: 0,
      termsAndConditionAgreed: false,
      termsAndConditionModal: false,
      detailsFilled: false,
      total: 0,
    };
  },
  computed: {
    detailsFilled() {
      let ok = false;
      this.passengers.forEach((passenger) => {
        if (passenger.name && passenger.cid && passenger.contact) {
          ok = true;
        } else {
          ok = false;
        }
      });
      return ok;
    },
  },
  methods: {
    showTermsAndConditionModal() {
      this.termsAndConditionModal = true;
    },
    proceedToPayment() {
      this.termsAndConditionAgreed = true;
      if (this.termsAndConditionAgreed === false) {
        this.$toast.show(
          "Please agree to the terms and Condition by clicking on Agree",
          {
            position: "top",
          }
        );
      } else {
        var booking = {};
        if (this.$store.state.selectedSchedule.parentRouteId) {
          booking = {
            booking: {
              routeId: this.$store.state.selectedSchedule.parentRouteId,
              subRouteId: this.$store.state.selectedSchedule.id,
              modality: "Online",
              fare: this.selectedSchedule.fare,
              amount:
                this.numberOfPassengers *
                (this.serviceCharge + this.selectedSchedule.fare),
              scheduleHash: this.$store.state.selectedScheduleHash,
              scheduleDate: this.$store.state.departureDate,
              operatorId: null,
              serviceCharge: this.serviceCharge * this.passengers.length,
              refundPercentage: 0,
            },
            passengers: this.passengers,
          };
        } else {
          booking = {
            booking: {
              routeId: this.$store.state.selectedSchedule.id,
              modality: "Online",
              fare: this.selectedSchedule.fare,
              amount:
                this.numberOfPassengers *
                (this.serviceCharge + this.selectedSchedule.fare),
              scheduleHash: this.$store.state.selectedScheduleHash,
              scheduleDate: this.$store.state.departureDate,
              operatorId: null,
              serviceCharge: this.serviceCharge * this.passengers.length,
              refundPercentage: 0,
            },
            passengers: this.passengers,
          };
        }

        addNewBooking(booking)
          .then((res) => {
            if (res.status === 201) {
              this.$store.commit("addScanBookingId", res.data.id);
              localStorage.setItem("bookingId", res.data.id);
              this.$router.push("/selectseats");
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