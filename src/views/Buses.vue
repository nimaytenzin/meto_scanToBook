<template>
  <main>
    <div
      class="relative z-1 flex justify-center items-center"
      id="heroSection2"
    >
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
          "
        ></span>
      </div>

      <div
        class="
          w-11/12
          lg:w-10/12
          xl:w-8/12
          2xl:w-1/2
          z-50
          flex
          justify-start
          overflow-scroll
          text-gray-200
        "
      >
        <div class="w-full md:w-1/2 flex-col">
          <h1 class="font-semibold text-xl md:text-5xl">
           Meto Transport Service 
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
      class="hidden w-full md:flex justify-center overflow-scroll text-gray-200"
    >
      <div class="w-11/12 lg:w-10/12 xl:w-8/12 2xl:w-1/2 flex-col">
        <div class="flex p-6 place-content-stretch text-metoPrimary-900">
          <div
            class="
              w-1/4
              flex flex-col
              text-xl
              border
              rounded-l-lg
              items-start
              justify-center
              px-2
              py-1
              bg-metoPrimary-800
              text-gray-100
            "
          >
            <p class="px-2 text-sm">Your</p>
            <p class="px-2 py-1 bg-transparent w-full">Journey</p>
          </div>
          <div
            class="
              w-1/4
              flex flex-col
              text-xl
              border
              items-start
              justify-center
              px-2
              py-1
            "
          >
            <p class="text-sm">origin</p>
            <p class="px-2 py-1 bg-transparent w-full">
              {{ originSelected?.name }}
            </p>
          </div>
          <div
            class="
              w-1/4
              flex flex-col
              text-xl
              border
              items-start
              justify-center
              px-2
              py-1
            "
          >
            <p class="text-sm">Destination</p>
            <p class="px-2 py-1 bg-transparent w-full">
              {{ destinationSelected?.name }}
            </p>
          </div>
          <div
            class="
              w-1/4
              flex flex-col
              text-xl
              border
              rounded-l-lg
              items-start
              justify-center
              px-2
              py-1
            "
          >
            <p class="text-sm">Departure</p>
            <p class="px-2 py-1 bg-transparent w-full">
              {{ formattedDepartureDate }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-center">
      <div
        class="
          flex flex-col
          px-6
          md:p-6
          h-screen
          items-center
          w-11/12
          lg:w-10/12
          xl:w-8/12
          2xl:w-1/2
          z-50
        "
      >
        <div
          class="
            flex
            gap-2
            text-sm
            items-start
            justify-center
            md:text-2xl
            text-metoPrimary-900
            md:text-left
            w-full
            mt-4
            text-center
          "
        >
          <div>
            <p class="text-xs text-gray-700">From</p>
            <p class="font-bold text-2xl">
              {{ originSelected?.name }}
            </p>
          </div>
          <div class="flex justify-center h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mb-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p class="text-xs text-gray-700">To</p>
            <p class="text-2xl font-bold">
              {{ destinationSelected?.name }}
            </p>
          </div>
        </div>

        <div class="flex flex-col items-center my-2">
          <p class="text-xs text-gray-700">Departure</p>
          <p
            class="
              text-xl
              font-semibold
              text-metoPrimary-900
              w-full
              text-center
              md:text-left
            "
          >
            {{ formattedDepartureDate }}
          </p>
        </div>
        <div class="flex mb-2 flex-col items-end justify-start">
          <p class="text-xs text-gray-700">Passengers</p>

          <p
            class="
              text-xl
              font-semibold
              text-metoPrimary-900
              w-full
              text-center
              md:text-left
            "
          >
            {{ numberOfPassengers }}
          </p>
        </div>
        <div class="flex flex-col gap-4 w-full">
          <div
            class="
              w-full
              bg-gray-100
              py-6
              px-10
              rounded-md
              flex flex-col
              md:flex-row
            "
            v-for="route in matchedRoutes"
            :key="route"
          >
            <div class="w-full md:w-1/3 flex flex-col justify-between">
              <div class="my-2">
                <p
                  v-if="!route.isCancelled"
                  class="text-xl md:text-3xl font-bold text-metoPrimary-900"
                >
                  {{ route.departureTime }}
                </p>

                <p
                  v-else
                  class="
                    text-xl
                    md:text-3xl
                    font-bold
                    text-metoPrimary-900
                    line-through
                  "
                >
                  {{ route.departureTime }}
                </p>
                <p class="text-metoPrimary-800 text-xs md:text-sm">
                  (Departure from {{ originSelected?.name }})
                </p>
              </div>
            </div>
            <div class="w-full md:w-1/3 flex flex-col justify-between">
              <div class="my-2" v-if="!route.isCancelled">
                <p class="text-xl font-bold text-metoPrimary-900">
                  {{ 19 - route.passengers < 0 ? 0 : 19 - route.passengers }}
                </p>
                <p class="text-metoPrimary-800 text-sm">(Seats Available)</p>
              </div>
              <div class="text-left border-b py-2 text-xl text-metoPrimary-900">
                <p
                  class="text-3xl font-bold text-metoPrimary-900"
                  v-if="!route.isCancelled"
                >
                  Nu.{{ route.fare }}
                </p>
                <p
                  v-else
                  class="text-3xl font-bold text-metoPrimary-900 line-through"
                >
                  Nu.{{ route.fare }}
                </p>
                <p class="text-metoPrimary-800 text-sm">(Fare)</p>
              </div>
            </div>

            <div class="flex flex-col gap-4 w-full md:w-1/3 justify-between">
              <div v-if="!route.isCancelled">
                <button
                  class="
                    w-full
                    px-2
                    py-2
                    md:px-2 md:py-3
                    rounded
                    text-white
                    bg-metoContrast
                    text-md
                    md:text-xl
                    flex
                    gap-2
                    md:gap-4
                    justify-center
                    items-center
                  "
                  @click="proceedToSeatSelection(route)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    x="0px"
                    y="0px"
                    class="h-6 w-auto fill-current"
                    viewBox="0 0 31.93 31.93"
                    style="enable-background: new 0 0 31.93 31.93"
                    xml:space="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M29.797,6.968c-0.361,0-0.654,0.293-0.654,0.655v3.916c0,0.361,0.293,0.655,0.654,0.655h1.477    c0.361,0,0.656-0.293,0.656-0.655V7.551c0-0.322-0.262-0.584-0.584-0.584V6.921l-0.021-1.014c0.006-0.048,0.025-1.192-0.782-2.115    c-0.575-0.654-1.05-1.025-2.675-1.096c0-0.463-0.375-0.838-0.84-0.838H5.141c-0.467,0-0.846,0.379-0.846,0.846    c0,0,0.02,0,0.016,0.001C2.795,2.793,2.389,3.156,1.834,3.789C1.031,4.704,0.928,5.831,0.928,5.831v1.136h-0.05    C0.393,6.968,0,7.361,0,7.846v3.469c0,0.485,0.393,0.878,0.878,0.878h0.914c0.485,0,0.878-0.393,0.878-0.878V7.622    c0-0.361-0.293-0.655-0.655-0.655L2.05,5.795C2.049,5.789,2.111,5.057,2.601,4.498C2.929,4.125,3.558,3.882,4.34,3.79    L4.296,13.933H3.94c-0.573,0-1.038,0.464-1.038,1.037v10.931c0,0.572,0.465,1.037,1.038,1.037h1.052v-0.062v2.158    c0,0.573,0.465,1.037,1.038,1.037h2.22c0.573,0,1.038-0.464,1.038-1.037v-2.158v0.062h13.353v-0.062v2.158    c0,0.573,0.465,1.037,1.039,1.037h2.104c0.573,0,1.038-0.464,1.038-1.037v-2.158v0.062h1.4c0.57,0,1.035-0.465,1.035-1.037V14.97    c0-0.573-0.465-1.037-1.035-1.037h-0.356V3.769c0.813,0.082,1.442,0.319,1.788,0.705c0.498,0.557,0.535,1.285,0.535,1.358v1.136    H29.797z M8.299,13.933c-0.608,0-1.101-0.493-1.101-1.101V8.065c0-0.607,0.491-1.099,1.097-1.101l15.678-0.05    c0.293-0.001,0.574,0.115,0.781,0.32c0.207,0.207,0.324,0.488,0.324,0.78v4.817c0,0.608-0.493,1.101-1.102,1.101L8.299,13.933    L8.299,13.933z M23.105,20.437H9.288v-1.51h13.817V20.437L23.105,20.437z M23.105,17.998H9.288v-1.51h13.817V17.998L23.105,17.998    z M4.992,22.898c0-0.462,0.374-0.837,0.836-0.837h1.231c0.461,0,0.836,0.375,0.836,0.837v0.069c0,0.463-0.374,0.836-0.836,0.836    H5.828c-0.461,0-0.836-0.373-0.836-0.836V22.898z M7.895,19.948c0,0.462-0.374,0.836-0.836,0.836h-1.23    c-0.461,0-0.836-0.374-0.836-0.836v-2.624c0-0.462,0.374-0.836,0.836-0.836h1.23c0.461,0,0.836,0.374,0.836,0.836V19.948z     M8.708,3.965c0-0.329,0.267-0.596,0.597-0.596h13.552c0.33,0,0.598,0.267,0.598,0.596v0.897c0,0.329-0.268,0.596-0.598,0.596    H9.304c-0.33,0-0.597-0.267-0.597-0.596L8.708,3.965L8.708,3.965z M9.288,22.873v-1.507h13.817v1.507H9.288z M27.285,22.968    c0,0.463-0.374,0.836-0.836,0.836h-1.232c-0.461,0-0.836-0.373-0.836-0.836V22.9c0-0.464,0.374-0.839,0.836-0.839h1.232    c0.461,0,0.836,0.375,0.836,0.839V22.968z M27.285,19.948c0,0.462-0.374,0.836-0.836,0.836h-1.232    c-0.461,0-0.836-0.374-0.836-0.836v-2.624c0-0.462,0.374-0.836,0.836-0.836h1.232c0.461,0,0.836,0.374,0.836,0.836V19.948z"
                        />
                      </g>
                    </g>
                  </svg>
                  Book Seats
                </button>
              </div>
              <div v-else>
                <button
                  class="
                    w-full
                    px-2
                    py-2
                    md:px-2 md:py-3
                    rounded
                    text-metoContrast
                    bg-white
                    font-semibold
                    text-md
                    md:text-xl
                    flex
                    gap-2
                    md:gap-4
                    justify-center
                    items-center
                  "
                >
                  Bus Cancelled
                </button>
              </div>
              <div v-if="route.parentRouteId">
                <p class="text-xs md:text-xl font-bold text-metoPrimary-900">
                  *SubRoute
                </p>
                <p class="text-metoPrimary-800 text-xs md:text-sm">
                  You will be travelling in {{ originSelected?.name }} -
                  {{ route.parentRoute?.routepath?.destination?.name }} Bus
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style>
#heroSection2 {
  height: 20vh;
}
</style>

<script>
import { getCancelledROutesbyRouteDate } from "../services/cancelledRouteDateService";
import { getPassengersByScheduleHash } from "../services/scheduleServices";
import crypto from "crypto";
import { getRouteDetailsByID } from "../services/routeServices";
export default {
  created() {
    this.matchedRoutes = this.$store.state.indexMatchedRoutes;
    if (this.matchedRoutes.length === 0) {
      this.$router.push("/");
      // this.$store.commit("resetStoreState")
    }
    this.originSelected = this.$store.state.origin;
    this.destinationSelected = this.$store.state.destination;
    this.dateSelected = this.$store.state.departureDate;
    this.formattedDepartureDate = this.$store.state.formattedDepartureDate;
    this.numberOfPassengers = this.$store.state.numberOfPassengers;
    this.matchedRoutes.forEach((route) => {
      route.isCancelled = 0;
      route.passengers = 0;
      var plaintext = `${route.id}|${this.dateSelected}`;
      var hash = crypto.createHash("sha1");
      hash.update(plaintext);
      var scheduleHash = hash.digest("hex");
      route.scheduleHash = scheduleHash;
      if (route.parentRouteId) {
        getRouteDetailsByID(route.parentRouteId).then((res) => {
          var plaintextParent = `${res.data.id}|${this.dateSelected}`;
          var parentHash = crypto.createHash("sha1");
          parentHash.update(plaintextParent);
          var parentScheduleHash = parentHash.digest("hex");
          route.parentRoute = res.data;
          route.parentRoute.scheduleHash = parentScheduleHash;
          getPassengersByScheduleHash(parentScheduleHash).then((res) => {
            route.passengers = res.data.length;
          });
        });
      } else {
        getPassengersByScheduleHash(scheduleHash).then((res) => {
          route.passengers = res.data.length;
        });
        getCancelledROutesbyRouteDate(route.id, this.dateSelected).then(
          (res) => {
            if (res.data.length !== 0) {
              route.isCancelled = 1;
            }
          }
        );
      }
    });
  },
  data() {
    return {
      matchedRoutes: [],
      originSelected: {},
      destinationSelected: {},
      dateSelected: "",
      formattedDepartureDate: "",
      numberOfPassengers: 0,
    };
  },
  computed: {
    departureDate() {},
  },
  methods: {
    proceedToSeatSelection(route) {
     if( this.numberOfPassengers <= (19-route.passengers) ){
       this.$store.commit("addSelectedSchedule", route);
      if (route.parentRouteId) {
        console.log("SUB ROUTE HASH-Parent Route", route.parentRoute);
        this.$store.commit(
          "commitSelectedScheduleHash",
          route.parentRoute.scheduleHash
        );
      } else {
        console.log("COMMITTIN  ROUTE HASH", route);
        this.$store.commit("commitSelectedScheduleHash", route.scheduleHash);
      }

      this.$router.push("/selectseats");
     } else{
       this.$toast.show(`Sorry! Only ${19 - route.passengers} Seats available`,{
         position:"top"
       })
     }
    },
  },
};
</script>