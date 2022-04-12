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
      <div>
        <DatePicker
          v-model="date"
          :min-date="new Date()"
          @dayclick="onDayClick($event)"
          :attributes="attributes"
          :disabled-dates="disabledDates"
        />
      </div>

      <div class="flex flex-col justify-center mt-2">
        <h2 class="flex gap-2 text-sm font-light items-center">
          <span class="block rounded-full h-2 w-2 bg-green-700"> </span>
          Bus available
        </h2>
      </div>

      <p v-if="dateSelected" class="text-gray-600 text-sm">
        Selected Date: {{ dateSelected }}
      </p>
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
        @click="addDepartureDate()"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import { getRoutesByOriginDestination } from "../../services/routeServices";
import {
  getCancelledRoutesByRouteId,
  getCancelledRoutesBySubRouteId,
} from "../../services/cancelledRouteDateService";

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
        console.log("ROUTES WITH DAYS", res);
        if (res.data.routes) {
          this.routes = res.data.routes;
          this.$store.commit("commitAvailableRoute", this.routes);
          this.routes.forEach((route) => {
            getCancelledRoutesByRouteId(route.id).then((resp) => {
              console.log(resp);
              if (resp.data.length) {
                resp.data.forEach((item) => {
                  this.disabledDates.push(item.date);
                });
              }
            });
            this.days.push(route.day);
          });
        }
        if (res.data.subroutes) {
          this.subroutes = res.data.subroutes;
          this.subroutes.forEach((subroute) => {
            getCancelledRoutesBySubRouteId(subroute.id).then((resp) => {
              console.log(resp);
              if (resp.data.length) {
                resp.data.forEach((item) => {
                  this.disabledDates.push(item.date);
                });
              }
            });

            this.days.push(subroute.day);
          });
        }

        setTimeout(() => {
          console.log(this.disabledDates);
          this.attributes = [
            {
              dot: "green",
              dates: { weekdays: this.days },
              popover: {
                label: "Bus Availble",
              },
              excludeDates: this.disabledDates,
            },
            {
              key: "cancelled",
              dates: this.disabledDates,
              customData: {
                status: "cancelled",
              },
              status: 1,
            },
          ];
        }, 1000);
      })
      .catch((err) => console.log(err));

    // this.$store.commit("addMatchedRoutes", this.routes);
    // console.log("SUb Routes array", this.subroutes)
  },
  data() {
    return {
      date: "",
      days: [],
      routes: [],
      attributes: [],
      dateClicked: false,
      daySelected: null,
      invalidDateClicked: false,
      dateSelected: null,
      subroutes: [],
      disabledDates: [],
    };
  },
  methods: {
    previous() {
      this.$router.push("/book/destination");
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
        this.$store.commit("commitSelectedDate", formattedDate);
        this.dateSelected = e.ariaLabel;
      } else {
        this.dateSelected = null;
        if (e.isDisabled) {
          if (!e.attributes[0]) {
            this.$toast.show(`Date expired`, {
              position: "top",
              type: "error",
            });
          } else {
            this.$toast.show(`No Bus`, {
              position: "top",
              type: "info",
            });
          }

          this.invalidDateClicked = true;
        } else {
          this.$toast.show(`No Bus Availble`, {
            position: "top",
            type: "error",
          });
        }
      }
    },
    addDepartureDate() {
      if (this.dateClicked && this.invalidDateClicked) {
        this.$toast.show(`Please select a valid date`, {
          position: "top",
          type: "error",
        });
      } else {
        if (this.$store.getters.getDepartureDate) {
          let matchedRoutes = [];
          if (this.routes.length !== 0) {
            this.routes.forEach((route) => {
              if (route.day === this.daySelected) {
                matchedRoutes.push(route);
              }
            });
          }
          if (this.subroutes.length !== 0) {
            this.subroutes.forEach((subroute) => {
              if (subroute.day === this.daySelected) {
                matchedRoutes.push(subroute);
              }
            });
          }

          this.$store.commit("commitAvailableRoute", matchedRoutes);
          this.$router.push("/book/buses");
        } else {
          this.$toast.show(`Please Select a Date `, {
            position: "top",
            type: "error",
          });
        }
      }
    },
  },
};
</script>