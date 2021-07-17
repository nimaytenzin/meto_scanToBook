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
              {{ this.$store.state.origin.eng }}
            </h1>
            <p class="text-md text-center">
              ({{ this.$store.state.origin.dzo }})
            </p>
          </div>
          <div class="flex flex-col justify-center">
            <h2>--</h2>
          </div>
          <div class="flex flex-col">
            <p class="text-sm text-center text-gray-600">(destination)</p>
            <h1 class="text-center text-3xl text-blue-300">
              {{ this.$store.state.destination.eng }}
            </h1>
            <p class="text-md text-center">
              ({{ this.$store.state.destination.dzo }})
            </p>
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
              <th class="pl-3">Departure</th>
              <th>Bus</th>
              <th>Type</th>
              <th class="pr-3">Fare</th>
            </tr>
          </thead>
          <tbody
            v-for="bus in buses"
            :value="bus.id"
            :key="bus.id"
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
              @click="alertSelection({ bus })"
              :class="busColor(bus)"
            >
              <td class="pl-3">{{ bus.dep_time }}</td>
              <td>{{ bus.number }}({{ bus.type }})</td>
              <td>{{ bus.type }}</td>
              <td class="pr-3">Nu.{{ bus.fare }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="
          flex flex-col
          justify-center
          items-center
          mt-10
          font-nunito
          text-xl
          font-semibold
          text-blue-400
        "
      >
        {{
          selectedBus.number
            ? "You Selected " + selectedBus.number
            : "Please select a Bus"
        }}
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
        @click="selectBus(bus)"
      >
        Seat Selection >
      </button>
    </div>

    <!-- <p>{{ this.$store.state }}</p> -->
  </div>
</template>

<script>
export default {
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
  },
  data() {
    return {
      buses: [
        {
          id: 1,
          number: "BP-1-C3344",
          dep_time: "9:00 AM",
          type: "Coaster",
          fare: 250,
        },
        {
          id: 2,
          number: "BP-1-D3344",
          dep_time: "4:00 PM",
          type: "Coaster/AC",
          fare: 300,
        },
        {
          id: 3,
          number: "BP-1-EC3344",
          dep_time: "6:00 PM",
          type: "Coaster",
          fare: 250,
        },
      ],
      date: new Date(),
      selectedBus: {},
    };
  },
  computed: {
    departureDate() {
      let d = new Date(this.$store.state.departureDate);
      return d.toDateString();
    },
  },

  methods: {
    busColor(e) {
      console.log(e, "cycling throuhh the table data");
      if (e.id === this.selectedBus.id) {
        return "bg-blue-200";
      }
      return "bg-white";
    },
    selectBus(e) {
      this.$store.commit("addBus", e);
      this.$router.push("/book/seats");
    },
    alertSelection(e) {
      console.log(e.bus.id);
      // alert(`You Selected ${e.bus.number} departing at ${e.bus.dep_time}`);
      this.selectedBus = e.bus;
      this.$store.commit("addBus", e.bus.id);
    },
  },
};
</script>