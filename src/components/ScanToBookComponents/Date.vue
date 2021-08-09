<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div>
      <img src="../../assets/meto.png" alt="" width="100" />
    </div>
    <div>
      <h1 class="text-3xl text-gray-500 text-center">
        When do you want to go?
      </h1>
      <h1 class="text-3xl text-gray-500 text-center mt-3">ནཱ་ནམ་འབྱོནམ་སྨོ?</h1>
    </div>

    <div
      class="
      flex 
      flex-col
        p-6
        mx-auto
        bg-white
        rounded-xl
        shadow-md
        min-w-6/12
        mt-1
        items-center
        space-x-4
      "
    >
    <div>
      Time Table
    </div>
     <div>
        <DatePicker
        v-model="date"
        :min-date="new Date()"
        @dayclick="onDayClick($event)"
        :attributes="attributes"
      />
     </div>

      <div class="flex flex-col justify-center mt-2">
        <!-- <h3 class="text-gray-700 font-medium">Bus Status</h3> -->
        <!-- <h2 class="flex gap-2 text-sm font-light items-center">
          <span class="block rounded-full h-1 w-3 bg-red-500"> </span>
          No Buses
        </h2>

        <h2 class="flex gap-2 text-sm font-light items-center">
          <span class="block rounded-full h-1 w-3 bg-blue-500"> </span>
          Available
        </h2> -->

        <h2 class="flex gap-2 text-sm font-light items-center">
          <span class="block rounded-full h-3 w-3 bg-blue-400"> </span>
          Selected date
        </h2>
        <!-- 
        <p class="text-gray-600 italic font-light text-sm break-word">
          showing schedule status for next seven days.
        </p> -->
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
          rounded-l
        "
        @click="previous()"
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
        @click="addDepartureDate(date)"
      >
        Next
      </button>
    </div>

    <!-- <p> {{ this.$store.state }} </p> -->
  </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";
import {
  getScheduleByDate,
  getSchedulesBetween,
} from "../../services/scheduleServices";

import { getRoutesByOriginDestination } from "../../services/routeServices";
export default {
  components: {
    Calendar,
    DatePicker,
  },
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
    getRoutesByOriginDestination(
      this.$store.state.origin.id,
      this.$store.state.destination.id
    )
      .then((res) => {
        res.data.forEach((element) => {
          this.matchedRoutes.push(element);
        });
      })
      .catch((err) => console.log(err));
  },
  data() {
    return {
      attributes: [
        {
          bar: true,
          dates: [],
        },
      ],
      date: "",
      schedules: 0,
      matchedRoutes: [],
    };
  },

  methods: {
    previous() {
      this.$router.push("/book/destination");
    },
    onDayClick(e) {
      let formattedDate = e.id + " 00:00:00";
      getScheduleByDate(formattedDate).then((res) => {
        if (res.length === 0) {
          this.schedules = 0;
          this.$toast.show(`No Buses on ${e.ariaLabel}`, {
            position: "top",
            type: "error",
          });
        } else {
          this.schedules = res.length;
          let matchedSchedule = [];
          res.forEach((element) => {
            this.matchedRoutes.forEach((route) => {
              if (element.routeId === route.id) {
                matchedSchedule.push(element);
              }
            });
          });
          this.schedules = matchedSchedule.length
          this.$store.commit("addSchedules",matchedSchedule)
          this.$toast.show(`${matchedSchedule.length} Bus avialable on  ${e.ariaLabel}`, {
            position: "top",
            type: "success",
          });
        }
      });

      this.$store.commit("addDepartureDate", e.id);
    },
    addDepartureDate(val) {
      if (this.$store.state.departureDate === null) {
        alert("pls selet date");
      } else {
        if (this.schedules) {
          this.$router.push("/book/buses");
        } else {
          this.$toast.show(`Select a Date by clciking on a date`, {
            position: "top",
            type: "error",
          });
        }
      }
    },
  },
};
</script>