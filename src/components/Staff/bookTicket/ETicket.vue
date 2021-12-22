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
    <div >
      <div class="flex flex-col items-center justify-center">
        <img src="/meto.png" alt="" width="50" />

        <div>
          <h1 class="text-2xl text-gray-500 text-center">E Ticket</h1>
          <h1 class="text-2xl text-gray-500 text-center mt-3">ཤོག་འཟིན།</h1>
        </div>
      
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
        <div class="flex flex-col max-w-full p-3 m-3 bg-white" id="eTicket">
          <div class="flex flex-row justify-between p-3">
            <div>
              <h1 class="text-left text-sm text-gray-500">Meto Transport</h1>
              <h1 class="text-left text-sm text-gray-500">
                ༅༅ ། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།
              </h1>
            </div>

            <div>
              <img src="/meto.png" alt="" class="h-10" />
            </div>
          </div>
          <hr class="border-dashed" />

          <div class="mt-6">
            <div class="flex flex-col">
              <div class="flex flex-row justify-around items-center">
                <div class="flex flex-col">
                  <p class="text-sm text-center text-gray-600">(origin)</p>
                  <h1 class="text-center text-3xl text-black font-bold">
                    {{ origin }}
                  </h1>
                </div>
                <div
                  class="
                    flex flex-col
                    mt-3
                    mr-7
                    ml-7
                    justify-center
                    items-center
                    justify-items-center
                  "
                >
                  <p class="text-center mt-4 text-gray-500 italic">to</p>
                </div>
                <div class="flex flex-col">
                  <p class="text-sm text-center text-gray-600">(destination)</p>
                  <h1 class="text-center text-3xl text-black font-bold">
                    {{ destination }}
                  </h1>
                </div>
              </div>
              <p class="text-center mt-4 text-gray-500 italic">on</p>
              <h2 class="text-center text-2xl text-gray-700">
                {{ parseDepartureDate(departureDate) }}
              </h2>
            </div>
          </div>

          <div class="flex flex-row pt-3">
            <div class="flex-1 p-3 text-center">
              <p>Booked Seats</p>
              <div class="flex flex-row justify-center items-center">
                <div
                  v-for="item in bookingData.bookedSeats"
                  :key="item"
                  class="m-1 p-1 rounded relative"
                >
                  <img
                    src="/seatUnavailable.png"
                    width="50"
                    alt=""
                  />
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
                    {{ item.seatNumber }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr class="border-dashed" />

          <div class="text-center gap-2">
            <p class="text-xl text-gray-700">
              Departure Time:
              <span class="font-bold">
                {{
                 departureTime
                }}</span
              >
            </p>
          </div>

          <hr class="border-dashed" />
      

          <div class="pt-4 pb-4 flex flex-row justify-between">
            <div class="p-2">
              <p>Passengers</p>
              <ol
                class="text-xs"
                v-for="(passenger, index) in bookingData.passengers"
                :key="passenger"
              >
                <li>
                  {{ index + 1 }}.{{ passenger.name }} (cid:
                  {{ passenger.cid }} )
                </li>
              </ol>
            </div>
            <div>
              <p>Fare Details</p>
              <div class="text-sm">
                <h2 class="text-blue-900">Fare: {{ fare }}</h2>
                <h2 class="text-blue-900">
                  Seats Booked: {{ bookingData.bookedSeats?.length }}
                </h2>
                <h2 class="text-blue-900">
                  Total: Nu. {{ bookingData.amount }}
                </h2>
              </div>
            </div>
          </div>
         

          <hr class="border-dashed" />
          <p class="text-center text-gray-500 text-sm mt-4 mb-4">
            Ensuring Safety, Reliability,Comfort till your destination.
          </p>
        </div>
      </div>
    </div>

  </div>
</template>


<script>


import { useRoute } from "vue-router";
import { getBookingDetail } from "../../../services/bookingServices";

export default {
  created() {
    const route = useRoute();
    const bookingId = route.params.bookingId;

    getBookingDetail(bookingId).then((res) => {
      if (res.status === 200) {
        this.qrDataString = res.data.checkSum;
        this.origin = res.data.route.routepath.origin.name;
        this.destination = res.data.route.routepath.destination.name;
        this.departureDate = res.data.scheduleDate;
        this.departureTime = res.data.route.departureTime;
        this.fare = res.data.route.fare;
        this.bookingData = res.data;
      } else {
        this.$router.push("/service-down");
      }
    });
  },
  data() {
    return {
      departureTime: null,
      departureDate:null,
      fare: 0,
      origin: null,
      destination: null,
      bookingData: {},
    };
  },


  methods: {
     parseDepartureDate(dd) {
      let d = new Date(dd);
      return d.toDateString();
    },
  },
};
</script>