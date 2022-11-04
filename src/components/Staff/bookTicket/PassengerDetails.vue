<template>
  <div class="w-full flex justify-center">
    
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
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <p>
            {{ numberOfPassengers }}
          </p>
        </div>
      </div>



    </div>
  </div>

  <div id="seatBookingSection" class="w-full flex justify-center  mt-4">
    <div class="
        w-11/12
        lg:w-10/12
        xl:w-8/12
        2xl:w-1/2
        flex flex-col
        md:flex-row
        min-h-screen
        gap-6
      ">
      <div id="passengerDetails" class="w-full md:w-1/2 flex flex-col">
        <p class="text-xl text-metoPrimary-700 my-1">
          Enter Passenger Details
        </p>
        <div class=" w-full text-metoPrimary-900">
          <div class="flex flex-row gap-4 items-center w-full" v-for="(passenger, index) in passengers"
            :key="passenger">
            <div class="w-full flex flex-col mt-4 border rounded-sm ">
              <p class=" bg-metoPrimary-600 text-gray-100 py-1 px-2 rounded-t-sm">
                Passenger {{ index + 1 }}
              </p>
              <div class="p-2 flex flex-col">
                <p v-if="passengers[index].name" class="text-xs font-thin -mb-1 z-50">
                  Name
                </p>
                <input v-model="passengers[index].name" placeholder="Name" class="
                  appearance-none
                  w-full
                  py-2
                  leading-tight
                  z-0
                  focus:outline-none focus:shadow-outline
                " />
                <hr>
                <p v-if="passengers[index].contact" class="text-xs font-thin -mb-1 z-50">
                  Phone Number
                </p>
                <input v-model="passengers[index].contact" type="number" placeholder="Contact" class="
                  appearance-none
                  w-full
                  py-2
                  leading-tight
                  z-0
                  focus:outline-none focus:shadow-outline
                " />
                <hr>
                <p v-if="passengers[index].cid" class="text-xs font-thin -mb-1 z-50">
                  CID
                </p>
                <input v-model="passengers[index].cid" placeholder="CID/EID/WorkPermit" class="
                  appearance-none
                  w-full
                  py-2
                  leading-tight
                  z-0
                  focus:outline-none focus:shadow-outline
                " />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="billing" class="w-full md:w-1/2 flex flex-col md:pt-9">
        <div class="flex gap-2">
          <button v-if="detailsFilled" class="
              px-1
              py-2
              md:my-4
              md:px-2 md:py-3
              rounded
              text-gray-50
              bg-metoContrast
              bg-opacity-90
              text-md
              w-full
              md:text-xl
            " @click="proceedToSeatSelection()">
            Proceed to SeatSelection
          </button>
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
          ">
          <div>
            <div class="p-2">
              <p class="text-xl mb-2">Billing</p>
              <table class="table-auto  font-thin">
                <tr>
                  <td>Base Fare :</td>
                  <td>Nu {{ selectedSchedule.fare }}</td>
                </tr>
                <tr>
                  <td>Seats :</td>
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
                    <p class="text-xl ">
                      Nu.
                      {{
                          selectedSchedule.fare  *
                          numberOfPassengers
                      }}
                    </p>
                  </td>
                </tr>
              </table>
              <p class="text-xs break-words">
                Base Fare x Booked Seats
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  

 </template>  


<script>
import { addNewBooking } from "../../../services/bookingServices";
import VueJwtDecode from "vue-jwt-decode";


export default {
  created() {
    if (
      !this.$store.state.selectedSchedule &&
      !this.$store.state.selectedScheduleHash
    ) {
      this.$router.push("/staff");
    } else {
      this.numberOfPassengers = this.$store.state.numberOfPassengers;
      for (let i = 1; i <= this.numberOfPassengers; i++) {
        this.passengers.push(
          {

          }
        )
      }
     

      this.destinationSelected = this.$store.state.destination;
      this.originSelected = this.$store.state.origin;
      this.formattedDepartureDate = this.$store.state.formattedDepartureDate;
      this.selectedSchedule = this.$store.state.selectedSchedule;
      this.total = this.numberOfPassengers *  this.selectedSchedule.fare;
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
      total: 0
    };
  },
  computed: {
    detailsFilled() {
      let ok = false;
      this.passengers.forEach((passenger) => {
        if (passenger.name && passenger.cid && passenger.contact) {
          ok = true
        } else {
          ok = false;
        }
      });
      return ok;
    }

  },
  methods: {
    proceedToSeatSelection() {
        var booking={}
        if (this.$store.state.selectedSchedule.parentRouteId) {
         booking = {
            booking: {
              routeId: this.$store.state.selectedSchedule.parentRouteId,
              subRouteId:this.$store.state.selectedSchedule.id,
              amount: this.total,
              scheduleHash: this.$store.state.selectedScheduleHash,
              scheduleDate: this.$store.state.departureDate,
             operatorId: VueJwtDecode.decode(sessionStorage.getItem("token"))
                .id,
              serviceCharge:0 ,
              refundPercentage: 0
            },
            passengers: this.passengers,
          };
        }else{
           booking = {
            booking: {
              routeId: this.$store.state.selectedSchedule.id,
              amount: this.total,
              scheduleHash: this.$store.state.selectedScheduleHash,
              scheduleDate: this.$store.state.departureDate,
              operatorId: VueJwtDecode.decode(sessionStorage.getItem("token"))
                .id,
              serviceCharge: 0,
              refundPercentage: 0
            },
            passengers: this.passengers,
          };
        }
        addNewBooking(booking)
          .then((res) => {
            console.log("ok",res)
            if (res.status === 201) {
              this.$store.commit("addScanBookingId", res.data.id);
              //sessionStorage.setItem("bookingId", res.data.id)
              localStorage.setItem('bookingId',res.data.id);
              this.$router.push("/staff/seatSelection");
            } else {
              this.$toast.show("Newtork Error..try again", {
                position: "top",
                type: "error",
              });
            }
          })
         
    },
  },
};
</script>