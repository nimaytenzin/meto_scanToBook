<template>
  <div class="min-h-screen flex flex-col items-center">
    <div class="flex flex-col justify-center items-center w-full">
      <h1 class="text-xl text-center text-gray-600 font-nunito mx-4 mt-5">
        Bookings
      </h1>

      <div class="flex gap-2 justify-around bg-gray-100 p-2 rounded">
        <input type="date" class="bg-gray-200" v-model="date" />
        <button @click="fetchTranscationDetailsByDate()">Load Bookings</button>
      </div>

      <div class="flex gap-2 justify-around bg-gray-200 p-2 rounded">
        <input type="number" class="rounded" v-model="searchBookingId" />
        <button @click="searchByBookingId()">Search by Booking ID</button>
      </div>

      <div class="text-sm p-2">
        <p>
          Definition of Booking Status
        </p>
        <p>
          PENDING: Ticket has been successfully booked and the person is waiting for his journey
        </p>
        <p>
          FULFILLED: The journey has been successfully completed.
        </p>
         <p>
          CANCELLED: Either the person or the admin has cancelled the booking
        </p>
        <p>
          REFUNDED: The finance section has refunded the cancellation request.
        </p>
      </div>

      <div class="w-11/12 p-2" v-if="bookings.length !== 0">
        <table class="divide-y divide-gray-200 table-auto w-full mt-6">
          <thead class="">
            <tr>
              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Booking ID
              </td>
              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Booking Details
              </td>
              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Passengers
              </td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in bookings" :key="booking">
              <td
                class="
                  px-6
                  py-3
                  whitespace-nowrap
                  break-words
                  font-light
                  text-sm text-left
                "
              >
                 
                 BookingID: {{ booking.id }}
                 <p class="text-sm font-semibold">
                   Status: {{booking.bookingStatus  }}
                </p>
              </td>
              <td
                class="
                  px-6
                  py-3
                  whitespace-nowrap
                  break-words
                  font-light
                  text-sm text-left
                "
              >
               
                <div v-if="booking.subroute">
                  <p>
                    {{ booking.subroute.routepath?.origin.name }} -
                    {{ booking.subroute.routepath?.destination.name }}
                  </p>
                  <p class="text-xs leading-tight">
                    * SubRoute <br />
                    Travelling in {{ booking.route.routepath?.origin.name }} -
                    {{ booking.route.routepath?.destination.name }} Bus
                  </p>
                </div>
                <div v-else>
                  {{ booking.route.routepath.origin.name }} -
                  {{ booking.route.routepath.destination.name }}
                </div>

                <p>
                  Amount: Nu. {{booking.amount  }}
                </p>
                <p>
                  Departure Date: {{booking.scheduleDate  }}
                </p>
                <p>
                  Departure Time: {{booking.route.departureTime  }}
                </p>
              </td>
              <td
                class="px-6 py-3 whitespace-nowrap font-light text-sm text-left flex"
              >
                <table class="w-full text-sm h-full">
                  <tr>
                    <td class="px-2">Name</td>
                    <td class="px-2">CID</td>
                    <td class="px-2">Contact</td>
                  </tr>
                  <tr v-for="passenger in booking.passengers" :key="passenger">
                    <td class="px-2">{{ passenger.name }}</td>
                    <td class="px-2">{{ passenger.cid }}</td>
                    <td class="px-2">{{ passenger.contact }}</td>
                  </tr>
                </table>
              </td>
              <td
                class="px-6 py-3 whitespace-nowrap font-light text-sm text-left"
              >
                <p class="text-sm text-left"></p>
              </td>
              <td
                class="px-6 py-3 whitespace-nowrap font-light text-sm text-left"
              >
                <p class="text-sm text-left"></p>
              </td>
              <td
                class="px-6 py-3 whitespace-nowrap font-light text-sm text-left"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="w-11/12">
        <p class="text-center my-10">No bookings for {{ date }}</p>
      </div>
    </div>
  </div>

  <vue-final-modal
    v-model="showBookingDetailsModal"
    classes="modal-container"
    content-class="modal-content"
    class="w-max-screen"
  >
    <div>
      <div
        class="
          font-nunito
          text-gray-200
          bg-gray-600
          rounded-t
          shadow-md
          p-3
          text-center
        "
      >
        <p class="text-gray-50">Booking id : {{ searchedBooking.id }}</p>
        <p class="text-gray-50">
          Booking Status :
          <span class="capitalize">{{ searchedBooking.bookingStatus }}</span>
        </p>

        <hr class="w-full border border-gray-500 my-1" />
        <p>
          <span class="text-2xl font-bold">
            {{ searchedBooking.route?.routepath?.origin.name }}</span
          >
          to
          <span class="text-2xl font-bold">
            {{ searchedBooking.route?.routepath?.destination.name }}
          </span>
        </p>
        <p>Departure Time: {{ searchedBooking.route.departureTime }}</p>
        <p>Deparute Date: {{ searchedBooking.scheduleDate }}</p>
      </div>

      <div>
        <h3 class="text-xl p-2 font-thin">Passengers</h3>

        <div class="overflow-y-scroll p-2">
          <table
            class="
              min-w-full
              divide-y divide-gray-200
              text-gray-900
              font-thin
              bg-white
            "
          >
            <thead>
              <tr>
                <td
                  class="sticky bg-gray-100 top-0 px-2 py-2 whitespace-nowrap"
                >
                  Name
                </td>
                <td
                  class="sticky bg-gray-100 top-0 px-2 py-2 whitespace-nowrap"
                >
                  Contact
                </td>
                <td
                  class="sticky bg-gray-100 top-0 px-2 py-2 whitespace-nowrap"
                >
                  CID
                </td>
              </tr>
            </thead>
            <tbody class="overflow-y-scroll p-2">
              <tr
                v-for="passenger in searchedBooking.passengers"
                :key="passenger"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ passenger.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ passenger.contact }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ passenger.cid }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </vue-final-modal>
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
import {
  getBookingsByBookingDate,
  getBookingDetail,
} from "../../services/bookingServices";

export default {
  created() {
    let date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    this.date = today;

    getBookingsByBookingDate(this.date).then((res) => {
      this.bookings = res.data;
      console.log(res.data);
    });
  },
  data() {
    return {
      bookings: [],
      date: new Date(),
      searchBookingId: null,
      showBookingDetailsModal: false,
      searchedBooking: {
        route: {},
        passengers: [],
        subroute: {},
      },
    };
  },
  methods: {
    fetchTranscationDetailsByDate() {
      getBookingsByBookingDate(this.date).then((res) => {
        this.bookings = res.data;
      });
    },
    searchByBookingId() {
      if (this.searchBookingId) {
        getBookingDetail(this.searchBookingId).then((res) => {          
          if (res.data) {
            this.searchedBooking = res.data;
            console.log("SEARCHED BOOKING", res.data);
            this.showBookingDetailsModal = true;
          } else {
            this.$toast.show(
              `No Booking with booking ID : ${this.searchBookingId}`,
              {
                position: "top",
              }
            );
          }
        });
      } else {
        this.$toast.show("Please enter a booking ID to search", {
          position: "top",
        });
      }
    },
  },
};
</script>