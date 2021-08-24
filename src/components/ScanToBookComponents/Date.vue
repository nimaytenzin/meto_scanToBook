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
        flex flex-col
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
      <div class="text-md italic text-gray-500 mb-2">
        Showing bus schedules for the next 14 days
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
          <span class="block rounded-full h-3 w-3 bg-green-400"> </span>
          Bus available
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
import moment from "moment";

import {
  getScheduleByDate,
  getSchedulesBetween,
} from "../../services/scheduleServices";

import { useLoading } from "vue3-loading-overlay";
// Import stylesheet
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
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

    // let loader = useLoading();
    // loader.show();

  
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

    let days = [];
    let daysRequired = 7;

    for (let i = 1; i <= daysRequired; i++) {
      days.push(moment().add(i, "days").format("YYYY-MM-DD"));
    }

    days.forEach((day) => {
      let formattedDate = day + " 00:00:00";

      getScheduleByDate(formattedDate).then((res) => {
        let dattt = new Date(formattedDate);
        if (res.length) {
          res.forEach((ok) => {
            this.matchedRoutes.forEach((route) => {
              if (route.id === ok.routeId) {
                let routeDay = {
                  dates: new Date(
                    dattt.getFullYear(),
                    dattt.getMonth(),
                    dattt.getDate()
                  ),
                  highlight: {
                    color: "green",
                    fillMode: "light",
                  },
                };
                this.routeDays.push(routeDay);
              }
            });
          });
        }
        // loader.hide();
      });
    });
  },
  data() {
    return {
      date: "",
      schedules: 0,
      matchedRoutes: [],
      routeDays: [],
    };
  },
  computed: {
    attributes() {
      return [
        // Attributes for todos
        ...this.routeDays.map((routeDay) => ({
          dates: routeDay.dates,
          highlight: routeDay.highlight,
        })),
      ];
    },
  },

  methods: {
    previous() {
      this.$router.push("/book/destination");
    },
    onDayClick(e) {
      let formattedDate = e.id + " 00:00:00";
      this.$store.commit("commitSelectedDate", formattedDate)
      getScheduleByDate(formattedDate).then((res) => {
        this.schedules = res.length;
        let matchedSchedule = [];
        res.forEach((element) => {
          this.matchedRoutes.forEach((route) => {
            if (element.routeId === route.id) {
              matchedSchedule.push(element);
            }
          });
        });
        this.schedules = matchedSchedule.length;
        this.$store.commit("addSchedules", matchedSchedule);
        if (this.schedules) {
          this.$toast.show(
            `${matchedSchedule.length} Bus avialable on  ${e.ariaLabel}`,
            {
              position: "top",
              type: "success",
            }
          );
        }else{
          this.$toast.show(
            `No Buses on that day`,
            {
              position: "top",
              type: "error",
            }
          );
        }
      });
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