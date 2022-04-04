<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div>
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div>
      <h1 class="text-3xl text-gray-500 text-center">Buses</h1>
      <h1 class="text-3xl text-gray-500 text-center mt-3">
        འགྲུལ་འཁོར་ གདམ་ཁ་རྐྱབ་གནང་།
      </h1>
    </div>
    <div
      class="mx-auto bg-white rounded-xl shadow-md min-w-6/12 mt-7 items-center"
    >
      <div class="flex p-3 flex-col">
        <div class="flex flex-row justify-around items-center">
          <div class="flex flex-col">
            <p class="text-sm text-center text-gray-600">(origin)</p>
            <h1 class="text-center text-3xl text-blue-900">
              {{ this.$store.state.origin.name }}
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
            <h1 class="text-center text-3xl text-blue-900">
              {{ this.$store.state.destination.name }}
            </h1>
          </div>
        </div>
        <p class="text-center mt-4 text-gray-500 italic">on</p>
        <h2 class="text-center text-2xl text-gray-500">
          {{ departureDate }}
        </h2>
      </div>

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
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
              Departure
            </th>
            <th
              scope="col"
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
              Fare
            </th>
            <th
              scope="col"
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
              Click to Select
            </th>
            
          </tr>
        </thead>
        <tbody
          class="bg-white divide-y divide-gray-200"
          v-for="route in routes"
          :key="route"
        >
          <tr @click="commitToStore(route)" :class="tableRowColor(route)">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ route.departureTime }}

              <p v-if="route.parentRouteId">
                This is a subroute, you will in  travelling in <br>
                {{route.parentRoute?.routepath?.origin.name  }} -
                {{route.parentRoute?.routepath?.destination.name  }}
                <br>
                Bus, please drop off at  {{ this.$store.state.destination.name }}

              </p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              Nu. {{ route.fare }}  
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                v-if="!displayIcon(route)"
                class="
                  rounded
                  w-full
                  py-1
                  px-2
                  font-medium
                  text-gray-900
                  bg-gray-200
                  hover:bg-gray-300 hover:text-gray-900
                  active:bg-grey-900
                "
              >
                Select Bus
              </button>
              <div v-else>
                <div v-if="displayIcon(route)" class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Bus Selected
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="inline-flex mt-8">
      <button
        class="
          bg-gray-100
          hover:bg-gray-400
          text-gray-500
          hover:text-white
          font-bold
          py-2
          px-4
          rounded-l
        "
        @click="prev()"
      >
        Prev
      </button>

      <button
        class="
          bg-gray-100
          hover:bg-gray-400
          text-gray-500
          hover:text-white
          font-bold
          py-2
          px-4
          rounded-r
        "
        @click="seatSelection()"
      >
        Seat Selection >
      </button>
    </div>
  </div>
</template>

<script>
import crypto from 'crypto';
import {
  getRouteDetailsByID
} from "../../services/routeServices"
export default {
  created() {
    console.log(this.$store.state.departureDate, "PKOKOKOKOK")
    if (this.$store.state.origin === "" && this.$store.state.avaialableRoutes.length === 0) {
      this.$router.push("/book");
    }
    this.routes = this.$store.state.avaialableRoutes;

    this.routes.forEach(route=>{
      if(route.parentRouteId){
        console.log("THIS ROUTE IS A SUBROUTE", route)
        getRouteDetailsByID(route.parentRouteId).then(res=>{
          console.log("Parent route", res.data)
          route.parentRoute = res.data
        })
      }
    })
  },
  data() {
    return {
      routes: [],
      selectedRoute:{},
      date: new Date(),
      selected: false,
      selectedSchedule: {},
    };
  },
  computed: {
    departureDate() {
      let d = new Date(this.$store.state.departureDate);
      return d.toDateString();
    },
  },
  methods: {
    displayIcon(e) {
      if (e.id === this.selectedRoute.id) {
        return true;
      }
      return false;
    },
    tableRowColor(e) {
      if (e.id === this.selectedRoute.id) {
        return "bg-gray-300 text-black ";
      }
      return "bg-white";
    },
    seatSelection() {
      let parentRouteId;
      if(this.selectedRoute.parentRouteId){
        parentRouteId = this.selectedRoute.parentRoute.id
      }else{
        parentRouteId = this.selectedRoute.id
      }
      var plaintext = `${parentRouteId}|${this.$store.state.departureDate}`
      var hash = crypto.createHash('sha1')
      hash.update(plaintext)

      var roomID = hash.digest('hex');
      this.$store.commit("commitSchedule",roomID);
      this.$store.commit("commitScanRoomId",roomID);

      if ( this.selected) {
        this.$router.push("/book/seats");
      } else {
        this.$toast.show("Please Select a departure time", {
          position: "top",
          type: "error",
        });
      }
    },

    commitToStore(e) {
      this.selected = true;
      this.selectedRoute = e;
      console.log(e, "Selected Schedule");
      this.$store.commit("addSelectedSchedule", e);
    },
    prev() {
      this.$router.push("/book/destination");
    },
  },
};
</script>