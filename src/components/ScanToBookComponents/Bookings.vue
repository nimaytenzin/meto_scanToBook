<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div>
      <img src="../../assets/meto.png" alt="" width="100" />
    </div>
    <div>
      <h1 class="text-3xl text-gray-500 text-center">Your Booking</h1>
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

        <div class="flex-1 text-center">
          <hr class="border-dashed mt-4 mb-4" />
          <h5>Booked Seats</h5>
          <div class="flex flex-row justify-center items-center">
            <div
              v-for="item in this.$store.state.selectedSeats"
              :key="item"
              class="m-1 p-1 rounded relative"
            >
              <img src="../../assets/seatUnavailable.png" width="50" alt="" />
              <p
                class="
                  absolute
                  top-1/2
                  left-1/2
                  transform
                  -translate-x-1/2 -translate-y-1/2
                "
              >
                {{ item }}
              </p>
            </div>
          </div>
        </div>

        <div class="font-nunito text-gray-800 text-left">
          <p class="text-xl">Base Fare: Nu 250</p>

          <h2 class="text-xl">Total = Nu. {{ this.$store.state.total }}</h2>
        </div>
      </div>
       <div class="flex flex-col ">

      <p>To be prompted</p>
 
      <input v-model="name" placeholder="Name" class="m-3 p-2" />
      <input v-model="contact" placeholder="Contact" class="m-3 p-2" />
      <input v-model="cid" placeholder="CID/EID" class="m-3 p-2" />
 

      
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
        @click="pay()"
      >
        Pay and Book >
      </button>
    </div>
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
      name: "",
      contact: "",
      cid:''
    };
  },

  methods: {
    pay() {
      this.addDetail();
      this.$router.push("/book/eticket");
    },
    addDetail() {
      let user = {
        name: this.name,
        contact: this.contact,
        cid:this.cid
      };
      this.$store.commit("addBookedBy", user);
    },
  },
};
</script>