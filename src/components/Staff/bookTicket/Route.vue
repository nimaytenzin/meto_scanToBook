<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center font-nunito">
        Book Ticket
      </h1>
    </div>

    <div>
      <h2 class="text-xl mt-2">Route Details</h2>
      <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
        <div class="w-full px-2 md:w-1/2">
          <label class="block mb-1" for="formGridCode_name">Origin</label>

          <select
            class="
              w-full
              h-10
              px-3
              text-base
              placeholder-gray-600
              border
              rounded-lg
              focus:shadow-outline
            "
            v-model="originSelected"
          >
            <option
              v-for="stop in stops"
              :value="stop"
              :key="stop"
              class="bg-white"
            >
              {{ stop.name }}
            </option>
          </select>
        </div>
        <div class="w-full px-2 md:w-1/2">
          <label class="block mb-1" for="formGridCode_last">Destination</label>
          <select
            class="
              w-full
              h-10
              px-3
              text-base
              placeholder-gray-600
              border
              rounded-lg
              focus:shadow-outline
            "
            v-model="destinationSelected"
          >
            <option
              v-for="stop in stops"
              :value="stop"
              :key="stop"
              class="bg-white"
            >
              {{ stop.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-center mt-5 -mx-2 space-y-4 md:space-y-0">
        <DatePicker
          v-model="date"
          :min-date="new Date()"
          @dayclick="onDayClick($event)"
        />
      </div>

      <div class="flex flex-wrap mt-5" v-if="schedules.length">
        <p class="text-md italic">
          Showing buses going from
          <span class="text-xl font-semibold text-blue-700">{{
            originSelected.name
          }}</span>
          to
          <span class="text-xl font-semibold text-blue-700">{{
            destinationSelected.name
          }}</span>
          on
          <span class="text-xl font-semibold text-indigo-500">{{ date }}</span>
        </p>
        <table class="table min-w-full rounded">
          <thead class="bg-gray-100 p-3 text-gray-700 rounded h-10">
            <tr class="text-left font-light text-sm">
              <th class="pl-3 ml-2 mr-4">Departure Time</th>

              <th class="pl-3 ml-5 mr-5">Fare</th>
            </tr>
          </thead>
          <tbody
            v-for="schedule in schedules"
            :value="schedule"
            :key="schedule"
            class="text-left mt-4"
          >
            <tr
              class="
                hover:bg-blue-100
                cursor-pointer
                select-none
                h-14
                text-gray-700
              "
              @click="commitSchedule(schedule)"
            >
              <td class="pl-3 mr-2 border-r border-gray-100">
                {{ schedule.route.departureTime }}
              </td>
              <td class="pl-3 ml-5 mr-5">Nu. {{ schedule.route.fare }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
          rounded
          flex
        "
        @click="searchBus()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search Bus
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
        @click="next()"
      >
        Select Seats >
      </button>
    </div>
  </div>
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
  min-width: max-content;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
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
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>


<script>
import { Calendar, DatePicker } from "v-calendar";
import { getAllStops } from "../../../services/stopServices";
import { getScheduleByDate } from "../../../services/scheduleServices";
import { getRoutesByOriginDestination } from "../../../services/routeServices";

export default {
  data() {
    return {
      stops: [],
      originSelected: {},
      destinationSelected: {},
      date: "",
      schedules: [],
    };
  },
  created() {
    getAllStops()
      .then((res) => {
        this.stops = res;
      })
      .catch((err) => console.log(err));
  },
  components: {
    Calendar,
    DatePicker,
  },
  methods: {
    onDayClick(e) {
      this.date = e.id;
    },
    next() {
      this.$router.push("/staff/seats");
    },
    commitSchedule(e){
        this.$store.commit('commitSchedule', e)
        console.log(this.$store.state.customerBooking)
    },
    searchBus() {
      if (
        this.originSelected &&
        this.destinationSelected &&
        this.date
      ) {
        let formattedDate = this.date + +" 00:00:00";
        let matchedRouteIds = []
        console.log(this.originSelected, this.destinationSelected)
        getRoutesByOriginDestination(
          this.originSelected.id,
          this.destinationSelected.id
        ).then((res) => {
          res.data.forEach(element =>{
            matchedRouteIds.push(element.id)
          })
        });
        getScheduleByDate(formattedDate).then((res) => {
          let matchRouteSchedule =[]
          if (res.length) {
            console.log(matchedRouteIds)
            console.log(res)
            res.forEach(element =>{
              matchedRouteIds.forEach(route =>{
                if(route === element.routeId){
                  matchRouteSchedule.push(element)
                }
              })
            })
            this.schedules = matchRouteSchedule;
            
          } else {
            this.$toast.show("No buses on the selected day", {
              type: "error",
              position: "top",
            });
          }
        });
      } else {
        this.$toast.show("All fields are required", {
          type: "error",
          position: "top",
        });
      }
    },
  },
};
</script>