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
        <div class="flex flex-row justify-around">
          <div class="flex flex-col">
            <p class="text-sm text-center text-gray-600">(origin)</p>
            <h1 class="text-center text-3xl text-blue-300">
              {{ this.$store.state.origin.name }}
            </h1>
            <!-- <p class="text-md text-center">
              ({{ this.$store.state.origin.dzo }})
            </p> -->
          </div>
          <div class="flex flex-col justify-center">
            <h2>--</h2>
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

        <h2 class="text-center text-2xl mt-5 text-gray-500">
          {{ departureDate }}
        </h2>
      </div>

      <div class="mt-4">
        <table class="table min-w-full">
          <thead class="bg-blue-200 p-3 text-gray rounded h-14">
            <tr class="rounded-xl text-left">
              <th class="pl-3">Departure Time</th>

              <th class="pr-3">Fare</th>
              <th class="pr-3">ETA</th>
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
              <td class="pl-3">{{ schedule.route.departureTime }}</td>
              <td>Nu. {{ schedule.route.fare }}</td>

              <td class="pr-3">{{ schedule.route.ETA }}</td>
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
import { getScheduleByDate } from "../../services/scheduleServices";
export default {
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
    console.log(this.$store.state);

    let formattedDate = this.$store.state.departureDate + " 00:00:00";
    getScheduleByDate(formattedDate).then((res) => (this.schedules = res));
  },
  data() {
    return {
      schedules: [],
      date: new Date(),
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
    tableRowColor(e) {
      
      if (e.id === this.selectedSchedule.id) {
        return "bg-green-100";
      }
      return "bg-white";
    },
    seatSelection() {
      if (Object.keys(this.selectedSchedule).length !== 0) {
        this.$router.push('/book/seats')
      } else {
        this.$toast.show("Select a route", {
          position: "top",
          type: "error",
        });
      }
    },
    commitToStore(e) {
      this.selectedSchedule = e.schedule;
      this.$store.commit("addBus", e.schedule);
    },
  },
};
</script>