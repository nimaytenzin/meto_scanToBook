<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <!-- <div>
      <img src="../../assets/meto.png" alt="" width="100" />
    </div> -->
    <div>
      <h1 class="text-3xl text-gray-500 text-center">Buses</h1>
      <h1 class="text-3xl text-gray-500 text-center mt-3">
        འགྲུལ་འཁོར་ གདམ་ཁ་རྐྱབ་གནང་།
      </h1>
    </div>
    <div
      class="
        p-6
        mx-auto
        bg-white
        rounded-xl
        shadow-md
        min-w-6/12
        mt-7
        items-center
        space-x-4
      "
    >
      <div class="flex flex-col">
        <div class="flex flex-row justify-around items-center">
          <div class="flex flex-col">
            <p class="text-sm text-center text-gray-600">(origin)</p>
            <h1 class="text-center text-3xl text-blue-300">
              {{ this.$store.state.origin.name }}
            </h1>
            <!-- <p class="text-md text-center">
              ({{ this.$store.state.origin.dzo }})
            </p> -->
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
            <h1 class="text-center text-3xl text-blue-300">
              {{ this.$store.state.destination.name }}
            </h1>
            <!-- <p class="text-md text-center">
              ({{ this.$store.state.destination.dzo }})
            </p> -->
          </div>
        </div>
        <p class="text-center mt-4 text-gray-500 italic">on</p>
        <h2 class="text-center text-2xl text-gray-500">
          {{ departureDate }}
        </h2>
      </div>

      <div class="mt-4">
        <table class="table min-w-full rounded">
          <thead class="bg-blue-100 p-3 rounded h-10">
            <tr class="text-left font-light text-sm">
              <th class="pl-3 ml-2 mr-4">Departure Time</th>

              <th class="pl-3 ml-5 mr-5">Fare</th>
              <th class="pr-3 ml-4 mr-4">Journey Time</th>
              <th></th>
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
              @click="commitToStore({ schedule })"
              :class="tableRowColor(schedule)"
            >
              <td class="pl-3 mr-2 border-r border-gray-100">
                {{ getdepTime(schedule.route?.departureTime) }}
              </td>
              <td class="pl-3 ml-5 mr-5">Nu. {{ schedule.route?.fare }}</td>

              <td class="pr-3 ml-5 mr-2 border-l border-gray-100">
                {{ getETA(schedule.route?.ETA) }}
              </td>
              <td>
                <div v-if="displayIcon(schedule)">
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
                </div>
              </td>
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
          rounded-l
        "
        @click="this.$router.push('/destination')"
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

    <!-- <p>{{ this.$store.state }}</p> -->
  </div>
</template>

<script>
import { getDetailsByDate } from "../../services/scheduleServices";
export default {
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
   getDetailsByDate(this.$store.state.selectedDate).then(res =>{
     this.schedules = res
   })
  },
  data() {
    return {
      schedules: [],
      date: new Date(),
      ok: false,
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
        return "bg-gray-100";
      }
      return "bg-white";
    },
    seatSelection() {
      if (Object.keys(this.selectedSchedule).length !== 0) {
        this.$router.push("/book/seats");
      } else {
        this.$toast.show("Select a departure time", {
          position: "top",
          type: "error",
        });
      }
    },

    getETA(e) {
      let ok = e.split(":");
      let hrs = ok[0];
      let min = ok[1];

      return `${hrs}Hrs : ${min}Mins`;
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
      this.ok = true;
      this.selectedSchedule = e.schedule;
      console.log(e);
      this.$store.commit("addBus", e.schedule);
    },
  },
};
</script>