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
        console.log("ROUTES WITH DAYS", res);
        this.routes = res.data.routes;
        this.$store.commit("commitAvailableRoute", this.routes);
        this.routes.forEach((route) => {
          this.days.push(route.day);
        });

        this.attributes = [
          {
            dot: "green",
            dates: { weekdays: this.days },
            popover: {
              label: "Bus Availble",
            },
          },
        ];
      })
      .catch((err) => console.log(err));

    this.$store.commit("addMatchedRoutes", this.routes);
  },
  data() {
    return {
      date: "",
      days: [],
      routes: [],
      attributes: [],
      dateClicked: false,
      daySelected: null,
    };
  },
  methods: {
    previous() {
      this.$router.push("/book/destination");
    },
    onDayClick(e) {
      console.log(e);
      this.dateClicked = true;
      this.daySelected = e.weekday;

      if (e.popovers[0] && e.popovers[0].label === "Bus Availble") {
        let formattedDate = e.id;
        this.$store.commit("commitSelectedDate", formattedDate);

        // this.$toast.show(` Bus Availble on  ${e.ariaLabel}`, {
        //   position: "top",
        //   type: "success",
        // });
      } else {
        this.$toast.show(`No Bus Availble`, {
          position: "top",
          type: "error",
        });
      }
    },
    addDepartureDate() {
      if (this.$store.getters.getDepartureDate) {
        let matchedRoutes = [];
        this.routes.forEach((route) => {
          if (route.day === this.daySelected) {
            matchedRoutes.push(route);
          }
        });
        console.log(matchedRoutes);
        // commitAvailableRoute
        this.$store.commit("commitAvailableRoute", matchedRoutes);
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