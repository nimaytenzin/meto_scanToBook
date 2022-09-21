<template>
  <div class="min-h-full w-full p-4">
    
      <div class="w-full">
        <div class="
                  flex
                  text-sm
                  md:text-xl
                  mt-4
                  md:mt-0
                  flex-col
                  gap-2
                  md:gap-0 md:flex-row
                  p-2
                  md:p-6
                  place-content-stretch
                  text-metoPrimary-900
                ">
          <div class="
                    w-full
                    md:w-1/4
                    flex flex-col
                    rounded-lg
                    md:rounded-none md:rounded-l-lg
                    items-start
                    justify-center
                    p-2
                  ">
            <p class="text-sm text-gray-500 mb-2">Origin</p>
            <select class="w-full bg-gray-100 rounded-sm p-2 border text-sm" v-model="originSelected"
              @change="onOriginSelect($event)">
              <option v-for="origin in origins" :value="origin" :key="origin" class="bg-metoPrimary-400 w-full">
                {{ origin.name }}
              </option>
            </select>
          </div>
          <div class="
                    w-full
                    md:w-1/4
                    flex flex-col
                    rounded-lg
                    md:rounded-none
                    items-start
                    justify-center
                    p-2
                  ">
            <p class="text-sm text-gray-500 mb-2">Destination</p>
            <select class="w-full bg-gray-100 rounded-sm p-2 border text-sm" v-model="destinationSelected"
              @change="onDestinationChange">
              <option v-for="destination in destinations" :value="destination" :key="destination"
                class="bg-blue-400 w-full">
                {{ destination.name }}
              </option>
            </select>
          </div>
          <div class="
                    w-full
                    md:w-1/4
                    flex flex-col
                    items-start
                    justify-center
                    p-2
                    rounded-lg
                    md:rounded-none md:rounded-r-lg
                  ">
            <p class="text-sm text-gray-500 mb-2">Departure Date</p>
            <div class="
                      cursor-pointer
                      w-full
                      p-2
                      flex
                      items-center
                      text-red-400
                      animate-pulse
                      bg-gray-100
                      border
                      text-sm
                    " @click="checkAvailableDates()" v-if="!dateSelected">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd" />
              </svg>
              Select Departure Date
            </div>
            <div class="w-full bg-gray-100 rounded-sm p-2 border text-sm" v-else @click="checkAvailableDates()">
              {{ dateSelected }}
            </div>
          </div>

          <!-- <div class="
                    w-full
                    md:w-1/4
                    flex flex-col
                    rounded-lg
                    md:rounded-none md:rounded-l-lg
                    items-start
                    justify-center
                    p-2
                  ">
            <p class="text-sm text-gray-500 mb-2">Number of Passengers</p>
            <input v-model="numberOfPassengers" class="w-full bg-gray-100 rounded-sm p-2 border text-sm"
              placeholder="Number of Passengers" type="number" min="1" max="19" step="1" />
          </div> -->
        </div>

        <div class="flex p-6 text-sm md:text-xl justify-end">
          <button class="
                    py-1
                    w-full
                    md:w-max md:py-2
                    rounded
                    text-white
                    bg-red-500
                    px-2
                    md:px-6
                    flex
                    gap-2
                    md:gap-4
                    h-10
                    md:h-14
                    items-center
                  " @click="searchBuses">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px"
              y="0px" class="h-6 w-auto fill-current" viewBox="0 0 31.93 31.93"
              style="enable-background: new 0 0 31.93 31.93" xml:space="preserve">
              <g>
                <g>
                  <path
                    d="M29.797,6.968c-0.361,0-0.654,0.293-0.654,0.655v3.916c0,0.361,0.293,0.655,0.654,0.655h1.477    c0.361,0,0.656-0.293,0.656-0.655V7.551c0-0.322-0.262-0.584-0.584-0.584V6.921l-0.021-1.014c0.006-0.048,0.025-1.192-0.782-2.115    c-0.575-0.654-1.05-1.025-2.675-1.096c0-0.463-0.375-0.838-0.84-0.838H5.141c-0.467,0-0.846,0.379-0.846,0.846    c0,0,0.02,0,0.016,0.001C2.795,2.793,2.389,3.156,1.834,3.789C1.031,4.704,0.928,5.831,0.928,5.831v1.136h-0.05    C0.393,6.968,0,7.361,0,7.846v3.469c0,0.485,0.393,0.878,0.878,0.878h0.914c0.485,0,0.878-0.393,0.878-0.878V7.622    c0-0.361-0.293-0.655-0.655-0.655L2.05,5.795C2.049,5.789,2.111,5.057,2.601,4.498C2.929,4.125,3.558,3.882,4.34,3.79    L4.296,13.933H3.94c-0.573,0-1.038,0.464-1.038,1.037v10.931c0,0.572,0.465,1.037,1.038,1.037h1.052v-0.062v2.158    c0,0.573,0.465,1.037,1.038,1.037h2.22c0.573,0,1.038-0.464,1.038-1.037v-2.158v0.062h13.353v-0.062v2.158    c0,0.573,0.465,1.037,1.039,1.037h2.104c0.573,0,1.038-0.464,1.038-1.037v-2.158v0.062h1.4c0.57,0,1.035-0.465,1.035-1.037V14.97    c0-0.573-0.465-1.037-1.035-1.037h-0.356V3.769c0.813,0.082,1.442,0.319,1.788,0.705c0.498,0.557,0.535,1.285,0.535,1.358v1.136    H29.797z M8.299,13.933c-0.608,0-1.101-0.493-1.101-1.101V8.065c0-0.607,0.491-1.099,1.097-1.101l15.678-0.05    c0.293-0.001,0.574,0.115,0.781,0.32c0.207,0.207,0.324,0.488,0.324,0.78v4.817c0,0.608-0.493,1.101-1.102,1.101L8.299,13.933    L8.299,13.933z M23.105,20.437H9.288v-1.51h13.817V20.437L23.105,20.437z M23.105,17.998H9.288v-1.51h13.817V17.998L23.105,17.998    z M4.992,22.898c0-0.462,0.374-0.837,0.836-0.837h1.231c0.461,0,0.836,0.375,0.836,0.837v0.069c0,0.463-0.374,0.836-0.836,0.836    H5.828c-0.461,0-0.836-0.373-0.836-0.836V22.898z M7.895,19.948c0,0.462-0.374,0.836-0.836,0.836h-1.23    c-0.461,0-0.836-0.374-0.836-0.836v-2.624c0-0.462,0.374-0.836,0.836-0.836h1.23c0.461,0,0.836,0.374,0.836,0.836V19.948z     M8.708,3.965c0-0.329,0.267-0.596,0.597-0.596h13.552c0.33,0,0.598,0.267,0.598,0.596v0.897c0,0.329-0.268,0.596-0.598,0.596    H9.304c-0.33,0-0.597-0.267-0.597-0.596L8.708,3.965L8.708,3.965z M9.288,22.873v-1.507h13.817v1.507H9.288z M27.285,22.968    c0,0.463-0.374,0.836-0.836,0.836h-1.232c-0.461,0-0.836-0.373-0.836-0.836V22.9c0-0.464,0.374-0.839,0.836-0.839h1.232    c0.461,0,0.836,0.375,0.836,0.839V22.968z M27.285,19.948c0,0.462-0.374,0.836-0.836,0.836h-1.232    c-0.461,0-0.836-0.374-0.836-0.836v-2.624c0-0.462,0.374-0.836,0.836-0.836h1.232c0.461,0,0.836,0.374,0.836,0.836V19.948z" />
                </g>
              </g>
            </svg>
            Search Buses
          </button>
        </div>
      </div>
  </div>
    <vue-final-modal
      v-model="availableDatesModal"
      classes="flex justify-center items-center"
      content-class="modal-content rounded-lg"
      class="w-max-screen"
    >
      <div
        class="
          modal__content
          text-center
          mt-1
          flex flex-col
          text-metoPrimary-700
        "
      >
        <div class="flex flex-col justify-center items-center text-xl">
          <p>
            {{ originSelected.name }}
          </p>
          <table class="w-full">
            <tr>
              <td class="w-1/3">
                <hr class="w-full border-dashed" />
              </td>
              <td class="w-1/3 text-sm">to</td>
              <td class="w-1/3">
                <hr class="w-full border-dashed" />
              </td>
            </tr>
          </table>

          <p>
            {{ destinationSelected.name }}
          </p>
        </div>

        <div
          v-if="errorMessage"
          class="
            flex
            gap-2
            items-center
            justify-center
            border
            px-2
            text-red-500
            mt-3
            animate-bounce
            rounded
            text-sm
            
          "
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p>
              {{ errorMessage }}
            </p>
          </div>
        </div>
        <p class="text-metoPrimary-800 text-xs" v-if="instructionMessage">
          {{ instructionMessage }}
        </p>
        <div class="flex flex-col gap-2 justify-center items-center">
          <div class="flex flex-col px-2 py-1">
            <div class="flex flex-col justify-center mt-2">
              <h2 class="flex gap-2 text-sm font-light items-center">
                <span class="block rounded-full h-2 w-2 bg-green-700"> </span>
                Bus available
              </h2>
            </div>
            <DatePicker
              v-model="date"
              :min-date="new Date()"
              @dayclick="onDayClick($event)"
              :attributes="attributes"
            />
          </div>
        </div>
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
  width: auto;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
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

a {
  text-decoration: none;
  color: #000;
}

.marquee {
  height: 35px;
  width: 300%;
  position: relative;
  padding: 8px 0 4px 0;
  border: none;
}

.marq {
  background-color: #e9e5fb;
}

.marquee span {
  float: left;
  width: 300px;
}

@keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    left: -150%;
  }
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>


<script>
import { getRoutesByOriginDestination } from '../../../services/routeServices';

import { getActiveDestinationByOrigin, getActiveStops, getAllStops } from "../../../services/stopServices";


export default {
  data() {
    return {
     dateSelected:null,
     errorMessage:null,
     instructionMessage:null,

     origins:[],
     originSelected:{},
     destinations:[],
     destinationSelected:{},


     routes:[],
     subroutes:[],
     attributes:[],
     days:[],
     matchedRoutes:[],
    
      //modals
      availableDatesModal:false,
      numberOfPassengers:1,
      date:new Date()
    };
  },
 

  created() {
     getActiveStops().then((res) => {
      this.origins = res.data;
    });

    this.$store.commit("resetStoreState")

  },
 
  methods: {
    
    onOriginSelect(e) {
      this.dateSelected = null;
      this.errorMessage = null;
      getActiveDestinationByOrigin(this.originSelected.id).then((res) => {
        this.destinations = res.data;
        this.destinationSelected = res.data[0];
      });
    },
    onDestinationChange() {
      this.dateSelected = null;
    },

    checkAvailableDates() {
      this.routes = [];
      this.subroutes = [];
      this.dateSelected = null;
      this.attributes = [];
      this.days = [];
      this.matchedRoutes = [];

      getRoutesByOriginDestination(
        this.originSelected.id,
        this.destinationSelected.id
      )
        .then((res) => {
          if (res.data.routes) {
            this.routes = res.data.routes;
            console.log("PARENT ROUTES", res.data.routes);
            this.routes.forEach((route) => {
              this.days.push(route.day);
            });
          }
          if (res.data.subroutes) {
            this.subroutes = res.data.subroutes;
            console.log("SUB ROUTES", res.data.subroutes);
            this.subroutes.forEach((subroute) => {
              this.days.push(subroute.day);
            });
          }
          this.attributes = [
            {
              dot: "green",
              dates: { weekdays: this.days },
              popover: {
                label: "Bus Availble",
              },
              excludeDates: this.disabledDates,
            },
          ];
        })
        .catch((err) => console.log(err));

      this.availableDatesModal = true;
    },

    onDayClick(e) {
      this.invalidDateClicked = false;
      this.dateClicked = true;
      this.daySelected = e.weekday;

      if (
        e.popovers[0] &&
        e.popovers[0].label === "Bus Availble" &&
        !e.isDisabled
      ) {
        let formattedDate = e.id;
        this.dateSelected = e.ariaLabel;
        this.matchedRoutes = [];
        this.$store.commit("commitSelectedDate", formattedDate);
        this.$store.commit("commitFormattedDepartureDate", e.ariaLabel);

        this.routes.forEach((route) => {
          if (route.day === e.weekday) {
            this.matchedRoutes.push(route);
          }
        });
        this.subroutes.forEach((subroute) => {
          if (subroute.day === e.weekday) {
            this.matchedRoutes.push(subroute);
          }
        });
        this.$store.commit("commitIndexMatchedRoutes", this.matchedRoutes);
        this.availableDatesModal = false;
        this.errorMessage = null;
        this.instructionMessage = null;
        console.log("MATCHED ROUTE WITH DAY SELECTED", this.matchedRoutes)
      } else {
        this.dateSelected = null;
        this.matchedRoutes = [];
        this.$store.commit("clearStoreMatchedRoutes");
        if (e.isDisabled) {
          this.errorMessage = "Please select a valid Date";
          this.instructionMessage = null;
  
          this.invalidDateClicked = true;
        } else {
          this.matchedRoutes = [];
          this.$store.commit("clearStoreMatchedRoutes");
          this.errorMessage = `No Bus on ${e.ariaLabel}`;
          this.instructionMessage =
            "Buses are available on days marked with green dots below.";
        }
      }
    },
    searchBuses(){
      if (
        this.originSelected &&
        this.destinationSelected &&
        this.dateSelected
        // this.numberOfPassengers
      ) {
        this.$store.commit("addOrigin", this.originSelected);
        this.$store.commit("addDestination", this.destinationSelected);
        this.$router.push("/staff/buses");
      } else {
        this.$toast.show("Please Select departure Date", {
          position: "top",
          type: "error",
        });
      }
    }
  },
};
</script>