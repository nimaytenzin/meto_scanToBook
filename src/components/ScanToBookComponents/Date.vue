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
        />
      </div>

      <div class="flex flex-col justify-center mt-2">
        <h2 class="flex gap-2 text-sm font-light items-center">
          <span class="block rounded-full h-2 w-2 bg-green-700"> </span>
          Bus available
        </h2>
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
        @click="addDepartureDate()"
      >
        Next
      </button>
    </div>

    <!-- <p> {{ this.$store.state }} </p> -->
  </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";
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
    getRoutesByOriginDestination(
      this.$store.state.origin.id,
      this.$store.state.destination.id
    )
      .then((res) => {
        res.data.forEach((routePath) => {
          routePath.routes.forEach((route) => {
            this.routes.push(route);
            route.routeDays.forEach((routeDay) => {
              this.routeDays.push({
                dates: { weekdays: this.routeHash[routeDay.day] },
              });
            });
          });
        });
      })
      .catch((err) => console.log(err));

    this.$store.commit("addMatchedRoutes",this.routes)

    console.log("Matching Routes", this.routes)
  },
  data() {
    return {
      date: "",
      routeDays: [],
      routes: [],
      dateClicked: false,
      routeHash: {
        0: 2, //monday
        1: 3, //tuesday
        2: 4, //wednesday
        3: 5, // thrus
        4: 6, //fri
        5: 7, //sat
        6: 1, // sun
      },
    };
  },
  computed: {
    attributes() {
      return [
        // Attributes for todos
        ...this.routeDays.map((routeDay) => ({
          dates: routeDay.dates,
          dot: {
            color: "green",
            class: "opacity-75",
          },
          popover: {
            label: "Bus Avaialble",
          },
        })),
      ];
    },
  },

  methods: {
    previous() {
      this.$router.push("/book/destination");
    },
    onDayClick(e) {
      this.dateClicked = true;
      if (e.popovers[0].label === "Bus Avaialble") {
        let formattedDate = e.id + " 00:00:00";
        this.$store.commit("commitSelectedDate", formattedDate);
        this.$toast.show(` Bus avialable on  ${e.ariaLabel}`, {
          position: "top",
          type: "success",
        });
      } else {
        this.$toast.show(`No Bus Avaialble`, {
          position: "top",
          type: "error",
        });
      }
    },
    addDepartureDate() {
      if (this.$store.getters.getDepartureDate) {
        this.$router.push("/book/buses");
      } else {
        if (this.dateClicked === true) {
          this.$toast.show(`No Bus Avaialble on selected Date`, {
            position: "top",
            type: "error",
          });
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