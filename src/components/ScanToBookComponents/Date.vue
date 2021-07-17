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
        mt-7
        items-center
        space-x-4
      "
    >
      <DatePicker v-model="date" :min-date="new Date()" />
    </div>
    <div></div>
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

export default {
  components: {
    Calendar,
    DatePicker,
  },
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
  },
  data() {
    return {
      origins: ["Thimphu | ཐིམ་ཕུ", "Paro | སྤ་རོ་", "Punakha  | སྤུ་ན་ཁ་)"],
      destinationSelected: "Thimphu | ཐིམ་ཕུ",
      date: new Date(),
    };
  },

  methods: {
    addDepartureDate(val) {
      if (val === null) {
        alert("pls selet date");
      } else {
        this.$store.commit("addDepartureDate", val);
        this.$router.push("/book/buses");
      }
    },
  },
};
</script>