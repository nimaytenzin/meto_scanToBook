<template >
  <div
    class="
      min-h-screen
      overflow-hidden
      flex flex-col
      items-center
      justify-center
    "
  >
    <div>
      <img src="../../assets/meto.png" alt="" width="50" />
    </div>

    <div>
      <h1 class="text-2xl text-gray-500 text-center">E Ticket</h1>
      <h1 class="text-2xl text-gray-500 text-center mt-3">ཤོག་འཟིན།</h1>
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
            <img src="../../assets/meto.png" alt="" class="h-10" />
          </div>
        </div>
        <hr class="border-dashed" />

    

    
        <hr class="border-dashed" />

      

        <hr class="border-dashed" />

      



  
      </div>
    </div>

    <div class="inline-flex mt-8 mb-5">
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
          bg-gray-100
          hover:bg-gray-400
          text-gray-500
          hover:text-white
          font-bold
          py-2
          px-4
          rounded-l
        "
        id="saveBtn"
        @click="saveImage()"
      >
        Save Ticket
      </button>
    </div>
  </div>
</template>

<script>
import domtoimage from "dom-to-image";
import QRCodeVue3 from "qrcode-vue3";

import { getBookingDetail} from '../../services/bookingServices'


export default {
  created() {
    
      console.log('route', this.$router);

  
  
    this.qrDataString = JSON.stringify(this.qrData);

    this.checkBusRouteData = this.$router.resolve({
      name: "viewBusDetails",
      params: { id: this.$store.state.scanBookingId },
    });

    this.cancelTicketRouteData = this.$router.resolve({
      name: "cancelTicket",
      params: { bookingId: this.$store.state.scanBookingId },
    });
  },
  data() {
    return {
      eta: "7Hrs 30 mins",
      departureTime: "7:00 AM",
      qrData: {},
      qrDataString: "",
      seatNumbers: "",
      cancelTicketRouteData: "",
      checkBusRouteData: "",
      url: "localhost:8081",
    };
  },
  components: {
    QRCodeVue3,
  },
  mounted: function () {
    if (this.$store.state.origin !== "") {
      setTimeout(function () {
        const elem = document.getElementById("saveBtn");
        elem.click();
      }, 100);
    }
  },

  methods: {
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
    getETA(e) {
      let ok = e.split(":");
      let hrs = ok[0];
      let min = ok[1];

      return `${hrs} Hrs ${min} Mins`;
    },
    openBusDetails() {
      window.open(this.checkBusRouteData.href, "_blank");
    },
    cancelTicket() {
      window.open(this.cancelTicketRouteData.href, "_blank");
    },
    bookAgain() {
      this.$store.state.origin = "";
      this.$store.state.destination = "";
      this.$store.state.departureDate = "";
      this.$store.state.selectedBus = "";
      this.$store.state.selectedSeats = [];
      this.$store.state.total = 0;
      this.$store.state.bookedBy = {};

      this.$router.push("/book");
    },
  },
};
</script>