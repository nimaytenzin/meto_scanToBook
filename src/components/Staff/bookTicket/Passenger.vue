<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center font-nunito">
        Passenger Details and Payment
      </h1>
    </div>

    <div>
      <h2 class="text-xl mt-2">Passenger Details</h2>
      <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
        <div class="w-full px-2 md:w-1/2">
          <label class="block mb-1" for="formGridCode_name">Name</label>
          <input
            class="
              w-full
              h-10
              px-3
              text-base
              placeholder-gray-600
              border
              rounded-lg
              focus:shadow-outline
            "
            v-model="customer.customerName"
          />
        </div>
        <div class="w-full px-2 md:w-1/2">
          <label class="block mb-1" for="formGridCode_name">Contact</label>
          <input
            class="
              w-full
              h-10
              px-3
              text-base
              placeholder-gray-600
              border
              rounded-lg
              focus:shadow-outline
            "
            v-model="customer.customerContact"
          />
        </div>
        <div class="w-full px-2 md:w-1/2">
          <label class="block mb-1" for="formGridCode_name">CID/EID</label>
          <input
            class="
              w-full
              h-10
              px-3
              text-base
              placeholder-gray-600
              border
              rounded-lg
              focus:shadow-outline
            "
            v-model="customer.customerCid"
          />
        </div>
      </div>

      <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
        <div class="w-full px-2 md:w-1/2">
          <label class="block mb-1" for="formGridCode_name">Payment Mode</label>
          <select
            class="
              w-full
              h-10
              px-3
              text-base
              placeholder-gray-600
              border
              rounded-lg
              focus:shadow-outline
            "
            v-model="modeSelected"
          >
            <option
              v-for="mode in paymentModes"
              :value="mode"
              :key="mode"
              class="bg-white"
            >
              {{ mode }}
            </option>
          </select>
        </div>
        <div class="w-full px-2 md:w-1/2" v-if="paymentMode">
          <label class="block mb-1" for="formGridCode_name">Journal No</label>
          <input
            class="
              w-full
              h-10
              px-3
              text-base
              placeholder-gray-600
              border
              rounded-lg
              focus:shadow-outline
            "
            v-model="customer.journalNumber"
          />
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-full">
          <h2 class="text-xl">Ticket Details</h2>
          <p>
            Origin:
            {{
              customerBooking.schedule?.route?.origin.name
                ? customerBooking.schedule.route.origin.name
                : ""
            }}
          </p>
          <p>
            Destination:
            {{
              customerBooking.schedule?.route?.destination.name
                ? customerBooking.schedule.route.origin.name
                : ""
            }}
          </p>

          <p>Departure Date: 12 July 2021</p>
          <p>
            Departure Time: {{ customerBooking.schedule.route.departureTime }}
          </p>

          <p>Seats booked: {{ customerBooking.seats }}</p>
          <p>Base fare : {{ customerBooking.schedule.route.fare }}</p>
          <p>Total: {{ customerBooking.total }}</p>
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
            rounded
          "
          @click="searchBus()"
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
            rounded
          "
          @click="bookTicket()"
        >
          Confim and Book Ticket
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  min-width: max-content;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>


<script>
import { Calendar, DatePicker } from "v-calendar";
import { getAllStops } from "../../../services/stopServices";
import { getScheduleByDate } from "../../../services/scheduleServices";
import { getRoutesByOriginDestination } from "../../../services/routeServices";

export default {
  data() {
    return {
      modeSelected: "",
      paymentModes: ["Scan and Pay", "Cash"],
      originSelected: {},
      destinationSelected: {},
      customer: {
        customerName: "",
        customerContact: "",
        customerCid: "",
        paymentMode:"",
        journalNumber:null
      },
    };
  },
  created() {
    if (!Object.keys(this.$store.state.customerBooking.schedule).length) {
      console.log("ok");
      this.$router.push("/staff/");
    }
    this.customerBooking = this.$store.state.customerBooking;

    getAllStops()
      .then((res) => {
        this.stops = res;
      })
      .catch((err) => console.log(err));
  },
  components: {
    Calendar,
    DatePicker,
  },
  computed: {
    paymentMode() {
      if (this.modeSelected === "Scan and Pay") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    onDayClick(e) {
      this.date = e.id;
    },
    bookTicket() {
      if (
        this.customer.customerName &&
        this.customer.customerContact &&
        this.customer.customerContact
      ) {
        console.log(this.customer);
        this.customer.paymentMode = this.modeSelected
        this.$store.commit("commitCustomerDetails", this.customer);
        console.log(this.$store.state.customerBooking)
        this.$toast.show(
          "Searching bus on the day and listing it below on the table",
          {
            type: "info",
            position: "top",
          }
        );
      } else {
        this.$toast.show("All fields are required", {
          type: "error",
          position: "top",
        });
      }
    },
  },
};
</script>