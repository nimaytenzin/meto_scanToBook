<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-center p-2"
  >
    <div>
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div>
      <h1 class="text-3xl text-gray-500 text-center">Buses</h1>
      <h1 class="text-3xl text-gray-500 text-center mt-3">
        འགྲུལ་འཁོར་ གདམ་ཁ་རྐྱབ་གནང་།
      </h1>
    </div>
    <div class="mx-auto bg-white rounded-xl shadow-md mt-7 items-center p-1">
      <div class="flex flex-col">
        <div class="flex flex-row justify-center items-center">
          <div class="flex flex-col">
            <p class="text-sm text-center text-gray-600">(origin)</p>
            <h1 class="text-center text-3xl text-blue-900">
              {{ this.$store.state.origin.name }}
            </h1>
          </div>
          <div class="w-full flex justify-center">to</div>
          <div class="flex flex-col">
            <p class="text-sm text-center text-gray-600">(destination)</p>
            <h1 class="text-center text-3xl text-blue-900">
              {{ this.$store.state.destination.name }}
            </h1>
          </div>
        </div>
        <p class="text-center text-gray-500 italic">on</p>
        <h2 class="text-center text-2xl text-gray-500">
          {{ departureDate }}
        </h2>
      </div>

      <table class="divide-y divide-gray-200 w-full mt-4">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-2 py-2 text-left text-xs font-medium text-gray-500"
            >
              Departure
            </th>
            <th
              scope="col"
              class="px-2 text-left text-xs font-medium text-gray-500"
            >
              Fare
            </th>
            <th
              scope="col"
              class="px-2 text-left text-xs font-medium text-gray-500"
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
            <td :class="route.isCancelled ? 'px-2 py-2 line-through' : 'px-2 py-2'">
              {{ route.departureTime }}

              <p v-if="route.parentRouteId" class="text-xs">
                This is a subroute, you will in travelling in <br />
                <span class="font-semibold">
                  {{ route.parentRoute?.routepath?.origin.name }} -
                  {{ route.parentRoute?.routepath?.destination.name }}
                  bus
                </span>
              </p>
            </td>
            <td :class="route.isCancelled ? 'px-2 line-through' : 'px-2'">
              Nu. {{ route.fare }}
            </td>
            <td class="px-2 whitespace-nowrap">
              <div v-if="!route.isCancelled">
                <button
                  v-if="!displayIcon(route)"
                  class="
                    rounded
                    w-full
                    px-1
                    m-1
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
              </div>
              <div v-else>Bus Cancelled</div>
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
import crypto from "crypto";
import { getRouteDetailsByID } from "../../services/routeServices";
import {
  getCancelledROutesbyRouteDate,
  getCancelledRoutesBySubRouteDate,
} from "../../services/cancelledRouteDateService";
export default {
  created() {
    if (
      this.$store.state.origin === "" &&
      this.$store.state.avaialableRoutes.length === 0
    ) {
      this.$router.push("/book");
    }
    this.routes = this.$store.state.avaialableRoutes;
    this.routes.forEach((route) => {
      route.isCancelled = 0;
      if (route.parentRouteId) {
        getRouteDetailsByID(route.parentRouteId).then((res) => {
          route.parentRoute = res.data;
        });
        getCancelledRoutesBySubRouteDate(
          route.id,
          this.$store.state.departureDate
        ).then((resp) => {
          if (resp.data.length) {
            route.isCancelled = 1;
          }
        });
      } else {
        getCancelledROutesbyRouteDate(
          route.id,
          this.$store.state.departureDate
        ).then((resp) => {
          if (resp.data.length) {
            route.isCancelled = 1;
          }
        });
      }
    });
  },
  data() {
    return {
      routes: [],
      selectedRoute: {},
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
      if (this.selectedRoute.parentRouteId) {
        parentRouteId = this.selectedRoute.parentRoute.id;
      } else {
        parentRouteId = this.selectedRoute.id;
      }
      var plaintext = `${parentRouteId}|${this.$store.state.departureDate}`;
      var hash = crypto.createHash("sha1");
      hash.update(plaintext);

      var roomID = hash.digest("hex");
      this.$store.commit("commitSchedule", roomID);
      this.$store.commit("commitScanRoomId", roomID);

      if (this.selected) {
        this.$router.push("/book/seats");
      } else {
        this.$toast.show("Please Select a bus", {
          position: "top",
          type: "error",
        });
      }
    },

    commitToStore(e) {
      if (!e.isCancelled) {
        this.selected = true;
        this.selectedRoute = e;
        this.$store.commit("addSelectedSchedule", e);
      }
    },
    prev() {
      this.$router.push("/book/destination");
    },
  },
};
</script>