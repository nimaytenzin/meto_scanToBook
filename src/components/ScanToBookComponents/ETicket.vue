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

        <div class="mt-6">
          <div class="flex flex-col">
            <div class="flex flex-row justify-around items-center">
              <div class="flex flex-col">
                <p class="text-sm text-center text-gray-600">(origin)</p>
                <h1 class="text-center text-3xl text-black font-bold">
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
                <h1 class="text-center text-3xl text-black font-bold">
                  {{ this.$store.state.destination.name }}
                </h1>
                <!-- <p class="text-md text-center">
              ({{ this.$store.state.destination.dzo }})
            </p> -->
              </div>
            </div>
            <p class="text-center mt-4 text-gray-500 italic">on</p>
            <h2 class="text-center text-2xl text-gray-500">
              {{ this.$store.state.departureDate }}
            </h2>
          </div>
          
        </div>

        <div class="flex flex-row pt-3">
          <div class="flex-1 p-3 text-center">
            <p>Booked Seats</p>
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
                    bg-white bg-opacity-60
                    rounded-sm
                    pl-1
                    pr-1
                    transform
                    -translate-x-1/2 -translate-y-1/2
                  "
                >
                  {{ item.number }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr class="border-dashed" />

        <div class="flex flex-row pt-3">
          <div class="flex-1 p-3">
            <p>Boarding</p>
            <h2 class="text-blue-900">
              {{ this.$store.state.origin.name }}
            </h2>
            <h3 class="text-gray-500">
              {{
                getdepTime(this.$store.state.schedules[0].route.departureTime)
              }}
            </h3>
            <p class="text-gray-500 text-sm">
              {{ this.$store.state.origin.contact }}(focal)
            </p>
          </div>
          <div class="flex-1 p-3">
            <p>Drop</p>
            <h2 class="text-blue-900">
              {{ this.$store.state.destination.name }}
            </h2>
            <h3 class="text-gray-500">
              ETA {{ getETA(this.$store.state.schedules[0].route.ETA) }}
            </h3>
            <p class="text-gray-500 text-sm">
              {{ this.$store.state.destination.contact }} (focal)
            </p>
          </div>
        </div>

        <hr class="border-dashed" />

        <div
          class="pt-3 mt-0 rounded-b-3xl flex flex-col"
          style="
            box-shadow: 0 6px 6px -6px #333;
            background-image: url(../../assets/meto.png);
          "
        >
          <div class="flex justify-center items-center">
            <QRCodeVue3
              :width="300"
              :height="300"
              v-bind:value="qrDataString"
              :qrOptions="{
                typeNumber: 0,
                mode: 'Byte',
                errorCorrectionLevel: 'H',
              }"
              :imageOptions="{
                crossOrigin: 'anonymous',
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 0,
              }"
              :dotsOptions="{
                type: 'square',
                color: '#6a1a4c',

                gradient: {
                  type: 'radial',
                  rotation: 0,
                  colorStops: [
                    { offset: 0, color: '#e27a93' },
                    { offset: 1, color: '#1d1b1c' },
                  ],
                },
              }"
              :backgroundOptions="{
                color: '#ffffff',
              }"
              :cornersSquareOptions="{ type: 'square', color: '#000000' }"
              :cornersDotOptions="{ type: undefined, color: '#000000' }"
              fileExt="png"
              :download="false"
              myclass="my-qur"
              image="/meto.png"
              imgclass="img-qr"
              downloadButton="my-button"
              :downloadOptions="{ name: 'vqr', extension: 'png' }"
            />
          </div>
          <p class="text-gray-500 text-center break-words p-3 text-sm">
            Please Show the QR Code while boarding
          </p>
        </div>

        <div class="pt-4 pb-4 flex flex-row justify-between">
          <div>
            <p>Booked By</p>
            <h2 class="text-blue-900 break-words">
              {{ this.$store.state.bookedBy.name }}
            </h2>
            <p class="text-gray-500 mt-1 text-sm">
              {{ this.$store.state.bookedBy.contact }}
            </p>
            <p class="text-gray-500 mt-1 text-sm">
              {{ this.$store.state.bookedBy.cid }}
            </p>
          </div>
          <div>
            <p>Fare Details</p>
            <h2 class="text-blue-900">Fare: Nu.250</h2>
            <h2 class="text-blue-900">
              Seats Booked: {{ this.$store.state.selectedSeats.length }}
            </h2>
            <h2 class="text-blue-900">
              Total: Nu. {{ this.$store.state.total }}
            </h2>
          </div>
        </div>

        <p>Your Bus Details will be uploaded 2 hours before departure <br /></p>
        <button
          @click="openBusDetails"
          class="text-black font-bold py-2 px-4 rounded"
        >
          Click here to check Details : <br />
          {{ url }}{{ checkBusRouteData.href }}
        </button>

        <button
          @click="cancelTicket()"
          class="text-black font-bold py-2 px-4 rounded"
        >
          Cancel Ticket: <br />
          {{ url }}{{ cancelTicketRouteData.href }}
        </button>

        <hr class="border-dashed" />
        <p class="text-center text-gray-500 text-sm mt-4 mb-4">
          Ensuring Safety, Reliability,Comfort till your destination.
        </p>
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

export default {
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
    this.$store.state.selectedSeats.forEach((element) => {
      this.seatNumbers += element.number;
      this.seatNumbers += " | ";
    });
    this.qrData = {
      origin: this.$store.state.origin.name,
      destination: this.$store.state.destination.name,
      departureTime: this.$store.state.selectedBus.route.departureTime
        ? this.$store.state.selectedBus.route.departureTime
        : "",
      departureDate: this.$store.state.departureDate,
      customerName: this.$store.state.bookedBy.name,
      customerContact: this.$store.state.bookedBy.contact,
      cusomerCid: this.$store.state.bookedBy.cid,
      seats: this.seatNumbers,
    };
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