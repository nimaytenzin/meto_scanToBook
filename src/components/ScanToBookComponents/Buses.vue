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
          v-for="schedule in schedules"
          :key="schedule"
        >
          <tr @click="commitToStore(schedule)" :class="tableRowColor(schedule)">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ getdepTime(schedule.route?.departureTime) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              Nu. {{ schedule.route?.fare }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                v-if="!displayIcon(schedule)"
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
                <div v-if="displayIcon(schedule)" class="flex items-center">
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
import {
  getScheduleByRouteAndDate,
} from "../../services/scheduleServices";
export default {
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
    this.routes = this.$store.state.selectedRoutes;
    this.routes.forEach((route) => {
      getScheduleByRouteAndDate(route.id, this.$store.state.departureDate).then(
        (res) => {
          if (res.data) {
            let schedule = res.data;
            schedule.route = route;
            this.schedules.push(schedule);
          }
        }
      );
    });
  },
  data() {
    return {
      schedules: [],
      routes: [],
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
      if (e.id === this.selectedSchedule.id) {
        return true;
      }
      return false;
    },
    tableRowColor(e) {
      if (e.id === this.selectedSchedule.id) {
        return "bg-gray-300 text-black ";
      }
      return "bg-white";
    },
    seatSelection() {
      console.log(this.selectedSchedule)
      if ( Object.keys( this.selectedSchedule).length && this.selected) {
        this.$router.push("/book/seats");
      } else {
        this.$toast.show("Please Select a departure time", {
          position: "top",
          type: "error",
        });
      }
    },
    getdepTime: function (time) {
      let tissme = time.split(":");
      let hrs = parseInt(tissme[0]);
      let min = parseInt(tissme[1]).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      let ampm = "am";
      if (hrs > 12) {
        hrs = hrs - 12;
        ampm = "pm";
      }

      return `${hrs}:${min} ${ampm}`;
    },
    commitToStore(e) {
      this.selected = true;
      this.selectedSchedule = e;
      console.log(e, "Selected Schedule");
      this.$store.commit("addSelectedSchedule", e);
    },
    prev() {
      this.$router.push("/book/destination");
    },
  },
};
</script>