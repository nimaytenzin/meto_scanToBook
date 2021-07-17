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
      id="eTicket"
    >
      <div class="flex flex-col">
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
          <div class="flex flex-row justify-around">
            <div class="flex flex-col">
              <p class="text-sm text-center text-gray-600">(origin)</p>
              <h1 class="text-center text-3xl text-blue-900">
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
              <h1 class="text-center text-3xl text-blue-900">
                {{ this.$store.state.destination.eng }}
              </h1>
              <p class="text-md text-center">
                ({{ this.$store.state.destination.dzo }})
              </p>
            </div>
          </div>
          <h2 class="text-center text-gray-500">July 12, 2021</h2>
        </div>

        <div class="flex flex-row pt-3">
          <div class="flex-1 p-3">
            <p>Bus Service</p>
            <h2 class="text-blue-900">BP-2-C3324</h2>
          </div>
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
                    transform
                    -translate-x-1/2 -translate-y-1/2
                  "
                >
                  {{ item }}
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
              {{
                this.$store.state.origin.eng +
                " ( " +
                this.$store.state.origin.dzo +
                " )"
              }}
            </h2>
            <h3 class="text-gray-500">9:00 AM</h3>
          </div>
          <div class="flex-1 p-3">
            <p>Drop</p>
            <h2 class="text-blue-900">
              {{
                this.$store.state.destination.eng +
                " (" +
                this.$store.state.destination.dzo +
                " )"
              }}
            </h2>
            <h3 class="text-gray-500">ETA 12:00 PM</h3>
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
          <img src="../../assets/qr.svg" class="h-40" />
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

export default {
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
  },
  data() {
    return {};
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
    bookAgain(){
    

      this.$store.state.origin = "";
      this.$store.state.destination ="";
      this.$store.state.departureDate ="";
      this.$store.state.selectedBus ="";
      this.$store.state.selectedSeats = [];
      this.$store.state.total = 0;
      this.$store.state.bookedBy = {};

      this.$router.push("/book")


    }
  },
};
</script>