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
      <DatePicker
        v-model="date"
        :min-date="new Date()"
        @dayclick="onDayClick($event)"
        :attributes="attributes"
      />

      <div class="flex flex-col justify-center mt-2">
        <h3 class="text-gray-700 font-medium">Bus Status</h3>
        <h2 class="flex gap-2 text-sm font-light items-center">
          <span class="block rounded-full h-1 w-3 bg-red-500"> </span>
          No Buses
        </h2>

        <h2 class="flex gap-2 text-sm font-light items-center">
          <span class="block rounded-full h-1 w-3 bg-blue-500"> </span>
          Available
        </h2>

        <h2 class="flex gap-2 text-sm font-light items-center">
          <span class="block rounded-full h-3 w-3 bg-blue-400"> </span>
          Selected date
        </h2>

        <p class="text-gray-600 italic font-light text-sm break-word">
          showing schedule status for next seven days.
        </p>
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
        @click="this.$router.push('/book/destination')"
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
import { getScheduleByDate } from "../../services/scheduleServices";
export default {
  components: {
    Calendar,
    DatePicker,
  },
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }

    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let day = date.getDay();

    console.log(year, month, day);

    getScheduleByDate(new Date().toLocaleString()).then((res) => {
      console.log(res);
    });
  },
  data() {
    return {
      attributes: [
        {
          bar: true,
          dates: [],
        },
        {
          bar: "red",
          dates: [],
        },
      ],
      date: new Date(),
      schedules: 0,
    };
  },

  methods: {
    onDayClick(e) {
      let formattedDate = e.id + " 00:00:00";
      console.log(formattedDate);
      getScheduleByDate(formattedDate).then((res) => {
        if (res.length === 0) {
          this.schedules = 0;
          this.$toast.show(`No Buses on ${e.ariaLabel}`, {
            position: "top",
            type: "error",
          });
        } else {
          this.schedules = res.length;
          this.$toast.show(`${res.length} Bus avialable on  ${e.ariaLabel}`, {
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
          this.$toast.show(
            `No Buses available on the selected date ..\n please select another date`,
            {
              position: "top",
              type: "error",
            }
          );
        }
      }
    },
  },
};
</script>