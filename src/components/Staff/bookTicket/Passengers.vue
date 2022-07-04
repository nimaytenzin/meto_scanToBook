<template>
  <div class="w-full flex justify-center">


    <div class="
          flex flex-col
          md:p-6
          h-screen
          items-center
          w-11/12
          
        ">
      <div id="journeyDetailsMobile" class="
           
            text-metoPrimary-900
            my-2
            bg-gray-200
            p-2
            rounded-lg
            w-full
          ">
        <p class="text-xs font-thin">Your Journey</p>
        <div class="flex justify-center font-bold text-xl w-full">
          {{ originSelected?.name }} - {{ destinationSelected?.name }}
        </div>
        <div class="flex justify-center text-sm">
          {{ formattedDepartureDate }}
        </div>


       <div class="flex justify-center">
         <button @click="this.$router.push('/staff')" class="border border-red-200 px-2 rounded my-2">
          Book ticket
        </button>
       </div>

      </div>


      <div class="flex flex-col gap-2 w-full">
        
        <div v-for="booking in bookings" :key="booking" class="border p-2 text-sm bg-metoPrimary-500 bg-opacity-20 text-gray-800">
          <div class="flex gap-2 w-full">
            <div class="w-1/2">
                <p :class="booking.modality==='ONLINE'?'text-green-500 font-semibold':'font-semibold'">
                  Mode: {{ booking.modality==='ONLINE'?'Online':'CounterBooking'  }}
                </p>
                <p class="break-all" v-if="booking.modality !== 'ONLINE'">
                  Booked by {{ booking.user?.name  }}
                </p>
            </div>
            <div class="w-1/2">
                Booking ID: {{booking.id  }}
            </div>
            
          </div>
          <div class="flex flex-col mt-1">
            <p class="my-1 text-xs">
              Seats Booked
            </p>
            <table class="table-auto w-full">
              <tr>
                <td class="px-1 bg-gray-300">
                  Seat Number
                </td>
                <td class="px-1 bg-gray-300">
                  Name
                </td>
                <td class="px-1 bg-gray-300">
                  CID
                </td>
                <td class="px-1 bg-gray-300">
                  Contact Number
                </td>
              </tr>
              <tr v-for="passenger in booking.passengers" :key="passenger" class="divide-x divide-x-4">
                <td class="px-1">
                  {{ passenger.seatNumber }}
                </td>
                <td class="px-1">
                  {{ passenger.name }}
                </td>
                <td class="px-1">
                  {{ passenger.cid }}
                </td>
                <td class="px-1">
                  {{ passenger.contact }}
                </td>

              </tr>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>



</template>  


<script>
import { getAllBookingsByScheduleHash } from '../../../services/bookingServices';


export default {
  data() {
    return {
      originSelected: {},
      destinationSelected: {},
      dateSelected: "",
      formattedDepartureDate: "",
      numberOfPassengers: 0,
      bookings: []
    };
  },

  created() {
    if(this.$store.state.departureDate &&
       this.$store.state.selectedScheduleHash &&
       this.$store.state.departureDate 
      ){
        this.originSelected = this.$store.state.origin;
    this.destinationSelected = this.$store.state.destination;
    this.dateSelected = this.$store.state.departureDate;
    this.formattedDepartureDate = this.$store.state.formattedDepartureDate;

    
    getAllBookingsByScheduleHash(this.$store.state.selectedScheduleHash).then(res => {
      this.bookings = res.data;
    })
      }else{
        this.$router.push("/staff")
      }
    
  },

  methods: {

  },
};
</script>