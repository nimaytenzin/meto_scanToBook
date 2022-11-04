<template >
  <div id="spinner">
    <div
      class="
        flex flex-col
        text-blue-400
        font-thin
        text-xl
        justify-start
        items-center
      "
    >
      <img
        class="relative w-14 h-auto"
        src="/loading.gif"
        alt="loading..."
        width="200"
      />
      <p class="text-center">{{ message }}</p>
    </div>
  </div>
  <div
    class="
      min-h-screen
      overflow-hidden
      flex flex-col
      items-center
      justify-center
    "
  >
    <div v-if="bookingData.bookingStatus === 'PENDING'">
      <div class="flex flex-col items-center justify-center">
        <img src="../assets/meto.png" alt="" width="50" />

        <div>
          <h1 class="text-2xl text-gray-500 text-center">E Ticket</h1>
          <h1 class="text-2xl text-gray-500 text-center mt-3">ཤོག་འཟིན།</h1>
        </div>
        <div class="mt-3">
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
            @click="bookAgain()"
          >
            Book Again
          </button>
          <button
            class="
              bg-blue-600
              hover:bg-blue-400
              text-blue-50
              hover:text-white
              font-bold
              py-2
              px-4
              rounded-r
            "
            id="saveBtn"
            @click="saveImage()"
          >
            Save Ticket
          </button>
        </div>
      </div>

      <div
        class="
          p-6
          mx-auto
          bg-white
          rounded-xl
          shadow-lg
          min-w-content
          mt-1
          items-center
          space-x-4
        "
      >
        <div class="flex flex-col max-w-full p-3 m-3 bg-white" id="eTicket">
          <div class="flex flex-row justify-between p-3">
            <div>
              <h1 class="text-left text-sm text-gray-500">Meto Transport</h1>
              <h1 class="text-left text-sm text-gray-500">
                ༅༅ ། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།
              </h1>
            </div>

            <div>
              <img src="../assets/meto.png" alt="" class="h-10" />
            </div>
          </div>
          <hr class="border-dashed" />

          <div class="mt-6">
            <div class="flex flex-col">
              <div class="flex flex-row justify-around items-center">
                <div class="flex flex-col">
                  <p class="text-sm text-center text-gray-600">(origin)</p>
                  <h1 class="text-center text-3xl text-black font-bold">
                    {{ origin }}
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
                  <p class="text-center mt-4 text-gray-500 italic">-</p>
                </div>
                <div class="flex flex-col">
                  <p class="text-sm text-center text-gray-600">(destination)</p>
                  <h1 class="text-center text-3xl text-black font-bold">
                    {{ destination }}
                  </h1>
                </div>
              </div>
              <p
                class="text-center text-gray-700 mb-4"
                v-if="bookingData.subroute"
              >
                Via {{ bookingData.route?.routepath?.origin?.name }} -
                {{ bookingData.route?.routepath?.destination?.name }} Bus
              </p>

              <h2 class="text-center text-xl text-gray-700 my-1">
                Departure Date:
                <span class="font-bold">
                  {{ parseDepartureDate(departureDate) }}
                </span>
              </h2>
            </div>
            <div class="text-center gap-2">
              <p class="text-xl text-gray-700 my-1">
                Departure Time:
                <span class="font-bold"> {{ departureTime }}</span>
              </p>
            </div>
            <h2 class="text-center text-md text-red-800">
              Please report to the Bus Stop 30 minutes before Departure!
            </h2>
          </div>

          <div class="flex flex-row pt-3">
            <div class="flex-1 p-3 text-center">
              <p>Booked Seats</p>
              <div class="flex flex-row justify-center items-center">
                <div
                  v-for="item in bookingData.passengers"
                  :key="item"
                  class="m-1 p-1 rounded relative"
                >
                  <img src="../assets/seatUnavailable.png" width="50" alt="" />
                  <p
                    class="
                      absolute
                      top-1/2
                      left-1/2
                      bg-white bg-opacity-60
                      rounded-sm
                      pl-1
                      pr-1
                      transform
                      -translate-x-1/2 -translate-y-1/2
                    "
                  >
                    {{ item.seatNumber }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr class="border-dashed" />

          <hr class="border-dashed" />

          <div class="pt-4 pb-4 flex flex-row justify-between">
            <div class="p-2">
              <p>Passengers</p>
              <ol
                class="text-xs"
                v-for="(passenger, index) in bookingData.passengers"
                :key="passenger"
              >
                <li>
                  {{ index + 1 }}.{{ passenger.name }} (cid:
                  {{ passenger.cid }} )
                </li>
              </ol>
            </div>
            <div>
              <p>Fare Details</p>
              <div class="text-sm">
                <h2 class="text-blue-900">Fare: {{ fare }}</h2>
                <h2 class="text-blue-900">
                  Seats Booked: {{ bookingData.passengers?.length }}
                </h2>
                <h2 class="text-blue-900">
                  Total: Nu. {{ bookingData.amount }}
                </h2>
              </div>
            </div>
          </div>

          <hr class="mt-4 mb-4" />

          <h2 class="text-sm text-center mt-2">
            Call Meto Hotline 2233 for any assistance/query.
          </h2>

          <hr class="border-dashed" />
          <p class="text-center text-gray-500 text-sm mt-4 mb-4">
            Ensuring Safety, Reliability,Comfort till your destination.
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="
        bookingData.bookingStatus === 'CANCELLED' ||
        bookingData.bookingStatus === 'REFUNDED'
      "
      class="bg-gray-600 rounded-md flex flex-col justify-center"
    >
      <div class="flex flex-row justify-between p-3">
        <div>
          <h1 class="text-left text-sm text-gray-200">Meto Transport</h1>
          <h1 class="text-left text-sm text-gray-200">
            ༅༅ ། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།
          </h1>
        </div>

        <div class="bg-white rounded-full">
          <img src="../assets/meto.png" alt="" class="h-10" />
        </div>
      </div>
      <h2
        class="
          text-2xl
          font-nunito font-light
          text-gray-300
          p-10
          rounded-md
          text-center
        "
      >
        Booking Cancelled
      </h2>

      <div class="flex justify-center">
        <button
          class="
            bg-gray-100
            hover:bg-gray-400
            text-gray-500
            hover:text-white
            font-bold
            py-1
            rounded
            px-4
          "
          @click="bookAgain()"
        >
          Book Again
        </button>
      </div>

      <p class="text-center text-gray-200 text-xs px-3 m-4">
        Ensuring Safety, Reliability,Comfort till your destination.
      </p>
    </div>

    <div
      v-if="bookingData.bookingStatus === 'FULFILLED'"
      class="bg-gray-600 rounded-md flex flex-col justify-center"
    >
      <div class="flex flex-row justify-between p-3">
        <div>
          <h1 class="text-left text-sm text-gray-200">Meto Transport</h1>
          <h1 class="text-left text-sm text-gray-200">
            ༅༅ ། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།
          </h1>
        </div>

        <div class="bg-white rounded-full">
          <img src="../assets/meto.png" alt="" class="h-10" />
        </div>
      </div>
      <h2
        class="
          text-xl
          font-nunito font-light
          text-gray-300
          p-10
          rounded-md
          text-center
        "
      >
        Journey Succefully Completed! <br />
        Ticket Expired.
        <br />
        Thank you for choosing Meto Transport Service
      </h2>

      <div class="flex justify-center">
        <button
          class="
            bg-gray-100
            hover:bg-gray-400
            text-gray-500
            hover:text-white
            font-bold
            py-1
            rounded
            px-4
          "
          @click="bookAgain()"
        >
          Book Again
        </button>
      </div>

      <p class="text-center text-gray-200 text-xs px-3 m-4">
        Ensuring Safety, Reliability,Comfort till your destination.
      </p>
    </div>
  </div>
</template>

<style>
#spinner {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  transition: opacity 0.2s;
}
</style>

<script>
import domtoimage from "dom-to-image";
import { getBookingDetail } from "../services/bookingServices";

export default {
  created() {
    this.$store.commit("resetStoreState");
    const bookingId = this.$route.params.bookingId;
    getBookingDetail(bookingId).then((res) => {
      if (res.status === 200) {
        this.originContact = res.data.route?.routepath?.origin?.user.contact;
        if (res.data.subroute) {
          this.origin = res.data.subroute.routepath.origin.name;
          this.destination = res.data.subroute.routepath.destination.name;
          this.fare = res.data.subroute.fare;
          this.departureTime = res.data.subroute.departureTime;
        } else {
          this.origin = res.data.route.routepath.origin.name;
          this.destination = res.data.route.routepath.destination.name;
          this.fare = res.data.route.fare;
          this.departureTime = res.data.route.departureTime;
        }
        this.departureDate = res.data.scheduleDate;
        this.bookingData = res.data;
      } else {
        this.$router.push("/service-down");
      }
    });
  },
  data() {
    return {
      departureTime: null,
      departureDate: null,
      qrData: {},
      fare: 0,
      busStatus: null,
      message: "Generating your Ticket! please wait",
      origin: null,
      dataLoaded: false,
      destination: null,
      bookingData: {},
      seatNumbers: "",
      cancelTicketRouteData: "",
      checkBusRouteData: "",
      seatsBooked: 0,
      url: process.env.VUE_APP_DEV_API,
      busDetails: {},
      originContact: null,
    };
  },

  mounted: function () {
    setTimeout(function () {
      this.document.getElementById("spinner").remove();
    }, 1000);
  },
  computed: {
    loadingClass() {
      if (this.dataLoaded) {
        return "hidden";
      } else {
        return "";
      }
    },
  },

  methods: {
    parseDepartureDate(dd) {
      let d = new Date(dd);
      return d.toDateString();
    },
    saveImage() {
      const scale = 3;
      const node = document.getElementById("eTicket");
      const style = {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
        width: node.offsetWidth + "px",
        height: node.offsetHeight + "px",
      };

      const param = {
        height: node.offsetHeight * scale,
        width: node.offsetWidth * scale,
        quality: 1,
        style,
      };

      domtoimage.toPng(node, param).then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "eTicket.png";
        link.href = dataUrl;
        link.click();
      });
    },
    getdepTime: function (time) {
      if (time) {
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
      }
    },
    bookAgain() {
      this.$store.commit("resetStoreState");
      this.$router.push("/");
    },
  },
  beforeRouteLeave(to, from, next) {
    if (from.path === "/etickets/384") {
      console.log("ok");
      next();
    }
  },
};
</script>