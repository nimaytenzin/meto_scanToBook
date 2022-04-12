<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center font-nunito font-bold">
        Book Ticket
      </h1>
    </div>

    <div class="mt-10 w-full">
      <h2 class="text-xl mt-2">Route Details</h2>
      <div class="flex flex-wrap">
        <div class="w-full px-2 md:w-1/2">
          <label class="block mb-1" for="formGridCode_name">Origin</label>

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
            v-model="originSelected"
            @change="resetState"
          >
            <option
              v-for="stop in stops"
              :value="stop"
              :key="stop"
              class="bg-white text-xl"
            >
              {{ stop.name }}
            </option>
          </select>
        </div>
        <div class="w-full px-2 md:w-1/2">
          <label class="block mb-1" for="formGridCode_last">Destination</label>
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
            v-model="destinationSelected"
            @change="resetState"
          >
            <option
              v-for="stop in stops"
              :value="stop"
              :key="stop"
              class="bg-white"
            >
              {{ stop.name }}
            </option>
          </select>
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
            flex
          "
          @click="searchBus()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search for bus
        </button>
      </div>

      <div
        class="flex justify-center mt-5 -mx-2 space-y-4 md:space-y-0"
      >
        <DatePicker
          v-model="date"
          :min-date="new Date()"
          @dayclick="onDayClick($event)"
          :attributes="attributes"
          :disabled-dates="disabledDates"
        />
      </div>

      <div >
        <h2 class="mb-4 flex gap-2 text-sm font-light items-center">
          <span class="block rounded-full h-2 w-2 bg-green-700"> </span>
          Bus available
        </h2>
      </div>

      <div class="flex flex-col" v-if="schedules.length !== 0">
        <div
          v-for="schedule in schedules"
          :key="schedule"
          class="flex w-full flex-col"
        >
          <div
            @click="commitSchedule(schedule)"
            class="border-2 bg-white p-2 rounded text-gray-800"
          >
            <p v-if="schedule.parentRouteId" class="font-bold">Subroute</p>

            <p>Departure Time: {{ schedule.departureTime }}</p>
            <p>Fare: Nu. {{ schedule.fare }}</p>

            <p v-if="schedule.parentRouteId">
              This is a subroute, you will in travelling in
              {{ schedule.parentRoute?.routepath?.origin.name }} -
              {{ schedule.parentRoute?.routepath?.destination.name }}
            </p>
            <div class="flex jusitify-between gap-2 mt-1">
              <button
                class="
                  rounded
                  py-1
                  px-2
                  font-medium
                  text-gray-900
                  bg-gray-200
                  hover:bg-gray-300 hover:text-gray-900
                  active:bg-grey-900
                "
                @click="openSeatSelect(schedule)"
              >
                Book Seat
              </button>
              <button
                class="
                  rounded
                  py-1
                  px-2
                  font-medium
                  text-gray-900
                  bg-gray-200
                  hover:bg-gray-300 hover:text-gray-900
                  active:bg-grey-900
                "
                @click="viewPassengers(schedule)"
              >
                View Passengers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <vue-final-modal
      v-model="seatSelectModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center mt-5">
        <h3 class="text-xl">Book?</h3>
        <p class="text-center">Booked Seats</p>

        <p v-if="total">Total: Nu {{ total }}</p>
        <div class="grid grid-cols-4 flex-wrap">
          <div
            v-for="bookedSeat in bookedSeats"
            :key="bookedSeat"
            class="m-1 p-1 rounded relative"
          >
            <img src="../../../assets/seatUnavailable.png" width="50" alt="" />
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
              {{ bookedSeat.number }}
            </p>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="bg-white grid grid-cols-4 gap-2 p-3 m-3 rounded border">
            <div
              v-for="item in seats"
              :key="item"
              class="rounded relative"
              @click="addSeat(item)"
            >
              <img
                :src="bindImage(item)"
                alt="Seat "
                class="object-contain w-12 z-0 cursor-pointer"
                rel="preload"
                v-if="item.type == 'seat' || item.type === 'driver'"
              />
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
                  cursor-pointer
                "
              >
                {{ item.number ? item.number : "" }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="addPassengerDetails()"
        >
          Add Passenger Details
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="closeSeatSelectModal()"
        >
          Cancel
        </button>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="confirmSeatModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center mt-5">
        <h3 class="text-xl">Book?</h3>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="confirmSeat()"
        >
          confirm
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="cancelSeat()"
        >
          cancel
        </button>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="addPassengerDetailsModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center">
        <div class="flex flex-col">
          <div class="flex-1 text-center">
            <p class="text-xl font-semibold text-gray-600">
              Enter Passenger Details
            </p>
            <p class="text-center font-thin text-sm">
              Please Ensure Phone Numbers are Correct
            </p>
            <div class="flex flex-col justify-center items-center">
              <div
                class="flex flex-row gap-2 items-center"
                v-for="(item, index) in bookedSeats"
                :key="item"
              >
                <div class="p-1 rounded relative">
                  <img
                    src="../../../assets/seatUnavailable.png"
                    width="50"
                    alt=""
                  />
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
                <div class="flex flex-col mt-4">
                  <p class="my-1 text-gray-800 font-thin">
                    Passenger {{ index + 1 }}
                  </p>
                  <!-- <select v-model="passengers[index].seatNumber">
                    <option
                     :value="item.number">{{ item.number }}</option>
                  </select> -->
                  <input
                    v-model="passengers[index].name"
                    placeholder="Name"
                    class="
                      appearance-none
                      border-b
                      rounded-sm
                      w-full
                      py-2
                      px-2
                      text-gray-700
                      leading-tight
                      focus:outline-none focus:shadow-outline
                    "
                  />
                  <input
                    v-model="passengers[index].contact"
                    type="number"
                    placeholder="Contact"
                    class="
                      appearance-none
                      border-b
                      rounded
                      w-full
                      py-2
                      px-2
                      text-gray-700
                      leading-tight
                      focus:outline-none focus:shadow-outline
                    "
                  />
                  <input
                    v-model="passengers[index].cid"
                    placeholder="CID/EID/WorkPermit"
                    class="
                      appearance-none
                      border-b
                      rounded
                      w-full
                      py-2
                      px-2
                      text-gray-700
                      leading-tight
                      focus:outline-none focus:shadow-outline
                    "
                  />
                </div>
              </div>
            </div>

            <hr class="w-full border-dotted border-1 border-gray-500 my-2" />

            <p class="text-xl my-1 font-semibold text-gray-600">
              Payment Details
            </p>
            <div
              class="
                font-nunito
                text-gray-200 text-left
                bg-gray-600
                rounded
                shadow-md
                p-2
              "
            >
              <p>Billing</p>

              <hr class="border-dashed w-full" />
              <table class="table-auto">
                <tr>
                  <td>Base Fare :</td>
                  <td>
                    Nu
                    {{ fare }}
                  </td>
                </tr>
                <tr>
                  <td>Seats Booked :</td>
                  <td>{{ bookedSeats.length }}</td>
                </tr>
                <tr>
                  <td>
                    <hr class="w-full border-dashed" />
                  </td>
                  <td></td>
                </tr>
                <tr class="text-gray-100 font-bold text-xl">
                  <td>Total :</td>
                  <td>
                    {{ total }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="confirmBooking()"
        >
          Confirm Booking
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="backToSeatSelection()"
        >
          Back
        </button>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="confirmPaymentModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center">
        <div class="flex flex-col">
          <div class="flex-1 text-center">
            <p class="text-xl font-semibold text-gray-600">
              Confirm Payment & Payment Details
            </p>

            <hr class="w-full border-dotted border-1 border-gray-500 my-2" />

            <p class="text-xl my-1 font-semibold text-gray-600">
              Payment Details
            </p>
            <div
              class="
                font-nunito
                text-gray-200 text-left
                bg-gray-600
                rounded
                shadow-md
                p-2
              "
            >
              <p>Billing</p>

              <hr class="border-dashed w-full" />
              <table class="table-auto">
                <tr>
                  <td>Base Fare :</td>
                  <td>
                    Nu
                    {{ fare }}
                  </td>
                </tr>
                <tr>
                  <td>Seats Booked :</td>
                  <td>{{ bookedSeats.length }}</td>
                </tr>
                <tr>
                  <td>
                    <hr class="w-full border-dashed" />
                  </td>
                  <td></td>
                </tr>
                <tr class="text-gray-100 font-bold text-xl">
                  <td>Total :</td>
                  <td>
                    {{ total }}
                  </td>
                </tr>
              </table>
            </div>
            <div class="mt-4">
              <p class="text-xl font-semibold text-gray-600">
                Select Payment Mode
              </p>
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
                v-model="modality"
              >
                <option value="MBOB" class="bg-white">MBoB</option>
                <option value="CASH" class="bg-white">Cash</option>
              </select>

              <div
                v-if="paymentMode"
                class="flex flex-col items-center justify-center"
              >
                <p class="text-xl font-semibold text-gray-600">Select Bank</p>
                <select
                  class="
                    w-full
                    block
                    h-10
                    px-3
                    text-base
                    placeholder-gray-600
                    border
                    rounded-lg
                    focus:shadow-outline
                  "
                  v-model="journalDetails.bankName"
                >
                  <option
                    v-for="bank in banks"
                    :key="bank"
                    :value="bank"
                    class="bg-white"
                  >
                    {{ bank }}
                  </option>
                </select>

                <input
                  v-model="journalDetails.journalNumber"
                  type="number"
                  placeholder="Journal Number"
                  class="
                    block
                    w-full
                    appearance-none
                    border-b
                    rounded-sm
                    py-2
                    px-2
                    text-gray-700
                    leading-tight
                    focus:outline-none focus:shadow-outline
                  "
                />
                <input
                  v-model="journalDetails.contactNumber"
                  type="number"
                  placeholder="Phone Number"
                  class="
                    block
                    w-full
                    appearance-none
                    border-b
                    rounded-sm
                    py-2
                    px-2
                    text-gray-700
                    leading-tight
                    focus:outline-none focus:shadow-outline
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="confirmPayment()"
        >
          Confirm Payment
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="deleteBooking()"
        >
          Cancel Booking
        </button>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="duplicateSeatsModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center">
        <div class="flex flex-col">
          <div class="flex-1 text-center">
            <p class="text-xl font-bold text-red-600">
              Duplicate Seat Number!!
            </p>

            <hr class="w-full border-dotted border-1 border-gray-500 my-2" />

            <p class="text-xl my-1 text-md font-semibold text-gray-500">
              The Following Seat Number has been Booked!
            </p>

            <div>
              <p
                v-for="seat in duplicateSeats"
                :key="seat"
                class="text-2xl font-bold text-gray-800"
              >
                {{ seat.seatNumber }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="backToSeatSelection()"
        >
          Back to Seat Selection
        </button>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="reverSeatModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="modal__content text-center mt-5">
        <h3 class="text-xl">Cancel Seat Booking?</h3>
      </div>
      <div class="modal__action">
        <button
          class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
          @click="confirmRevert()"
        >
          Remove Seats from booking
        </button>
        <button
          class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
          @click="cancelRevert()"
        >
          cancel
        </button>
      </div>
    </vue-final-modal>
    <vue-final-modal
      v-model="errorModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
      :click-to-close="false"
    >
      <div class="text-center mt-5">
        <h3 class="text-xl font-nunito font-thin">Connecting to Services</h3>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="passengerDetailsModal"
      classes="modal-container"
      content-class="modal-content2"
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
            p-6
            text-center
          "
        >
          <p>
            <span class="text-2xl font-bold">{{ originSelected.name }}</span> to
            <span class="text-2xl font-bold">{{
              destinationSelected.name
            }}</span>
          </p>
          <p>On</p>
          <p>{{ parseDepartureDate(departureDate) }} at</p>
          <p>{{ selectedSchedule.departureTime }}</p>
          <div class="text-xl">
            Fare: Nu.{{ selectedSchedule.fare }} <br />
            <p>Seats Remaining: {{ seatsAvailable.length }}</p>
            <div class="flex gap-2 justify-center">
              <p v-for="seat in seatsAvailable" :key="seat">
                {{ seat }}
              </p>
            </div>

            <p
              v-if="!passengersInSchedule.length"
              class="m-4 text-2xl text-gray-100"
            >
              No Bookings
            </p>
          </div>
        </div>
        <div v-if="passengersInSchedule.length">
          <h3 class="text-xl px-6 font-thin">Passengers</h3>

          <div class="p-2 flex overflow-scroll" style="height: 40vh">
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
                    class="sticky bg-gray-100 top-0 px-6 py-4 whitespace-nowrap"
                  >
                    Seat Number
                  </td>
                  <td
                    class="sticky bg-gray-100 top-0 px-6 py-4 whitespace-nowrap"
                  >
                    Name
                  </td>
                  <td
                    class="sticky bg-gray-100 top-0 px-6 py-4 whitespace-nowrap"
                  >
                    CID
                  </td>
                  <td
                    class="sticky bg-gray-100 top-0 px-6 py-4 whitespace-nowrap"
                  >
                    Contact
                  </td>
                </tr>
              </thead>
              <tbody class="overflow-y-scroll" style="50vh">
                <tr v-for="passenger in passengersInSchedule" :key="passenger">
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ passenger.seatNumber }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ passenger.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ passenger.cid }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ passenger.contact }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </vue-final-modal>
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
::v-deep .modal-content2 {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  min-width: max-content;
  margin: 0;
  padding: 0;
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
import VueJwtDecode from "vue-jwt-decode";

import { Calendar, DatePicker } from "v-calendar";
import { getAllStops } from "../../../services/stopServices";
import crypto from "crypto";
import {
  getRouteDetailsByID,
  getRoutesByOriginDestination,
} from "../../../services/routeServices";
import {
  addNewCounterBooking,
  counterConfirmPayment,
  deleteBookingwithPassengers,
  getPassengersOnBus,
} from "../../../services/bookingServices";
import { updateBookingStatUsingBookingId } from "../../../services/bookingStatsService";
import { getCancelledRoutesByRouteId, getCancelledRoutesBySubRouteId } from "../../../services/cancelledRouteDateService";

export default {
  data() {
    return {
      stops: [],
      banks: ["BOB", "BNB", "PNBL", "BDBL", "TBank"],
      originSelected: {},
      passengers: [],
      destinationSelected: {},
      passengerDetailsModal: false,
      date: "",
      schedules: [],
      seatSelectModal: false,
      seats: [
        { id: 1, number: 1, type: "seat", status: "available" },
        { id: 2, number: 0, type: "notSeat", status: "available" },
        { id: 3, number: 0, type: "notSeat", status: "available" },
        { id: 4, number: 0, type: "notseat", status: "available" },
        { id: 5, number: 2, type: "seat", status: "available" },
        { id: 6, number: 0, type: "notSeat", status: "available" },
        { id: 7, number: 3, type: "seat", status: "available" },
        { id: 8, number: 4, type: "seat", status: "available" },
        { id: 9, number: 0, type: "notSeat", status: "available" },
        { id: 10, number: 0, type: "notSeat", status: "available" },
        { id: 11, number: 5, type: "seat", status: "available" },
        { id: 12, number: 6, type: "seat", status: "available" },
        { id: 13, number: 7, type: "seat", status: "available" },
        { id: 14, number: 0, type: "notSeat", status: "available" },
        { id: 15, number: 8, type: "seat", status: "available" },
        { id: 16, number: 9, type: "seat", status: "available" },
        { id: 17, number: 10, type: "seat", status: "available" },
        { id: 18, number: 0, type: "notSeat", status: "available" },
        { id: 19, number: 11, type: "seat", status: "available" },
        { id: 20, number: 12, type: "seat", status: "available" },
        { id: 21, number: 13, type: "seat", status: "available" },
        { id: 22, number: 0, type: "notseat", status: "available" },
        { id: 23, number: 14, type: "seat", status: "available" },
        { id: 24, number: 15, type: "seat", status: "available" },
        { id: 25, number: 16, type: "seat", status: "available" },
        { id: 26, number: 17, type: "seat", status: "available" },
        { id: 27, number: 18, type: "seat", status: "available" },
        { id: 28, number: 19, type: "seat", status: "available" },
      ],
      bookedSeats: [],
      disabledDates: [],
      seatSelected: {},
      confirmSeatModal: false,
      addPassengerDetailsModal: false,
      total: 0,
      fare: 0,
      reverSeatModal: false,
      connectionAttempt: 0,
      errorModal: false,
      attributes: [],
      days: [],
      routes: [],
      subroutes: [],
      selectedSchedule: {},
      modality: "CASH",
      weekDay: null,
      passengersInSchedule: [],
      seatsAvailable: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ],
      busAvailable: false,
      roomID: null,
      routeId: 0,
      departureDate: "",
      journalDetails: {
        bankName: null,
        journalNumber: null,
        contactNumber: null,
      },
      confirmPaymentModal: false,
      newBookingId: null,
      duplicateSeatsModal: false,
      duplicateSeats: [],
      newBooking: {},
    };
  },
  computed: {
    paymentMode() {
      if (this.modality === "MBOB") {
        return true;
      } else {
        false;
      }
    },
  },
  created() {
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
  methods: {
    resetState() {
      this.schedules = [];
      this.attributes = [];
      this.date = "";
      this.seatSelected = {};
      this.bookedSeats = [];
    },
    onDayClick(e) {
      if (
        e.popovers[0] &&
        e.popovers[0].label === "Bus Availble" &&
        !e.isDisabled
      ) {
        this.schedules = [];
        this.weekDay = e.weekday;
        this.departureDate = e.id;
        this.busAvailable = true;
        this.viewSch();
      } else {
        this.busAvailable = false;
        this.schedules = [];

        if (e.isDisabled) {
          if (!e.attributes[0]) {
            this.$toast.show(`Date expired`, {
              position: "top",
              type: "error",
            });
          } else {
            this.$toast.show(`No Bus`, {
              position: "top",
              type: "info",
            });
          }
        } else {
          this.$toast.show(`No Bus Availble`, {
            position: "top",
            type: "error",
          });
        }
      }
    },
    next() {
      this.$router.push("/staff/seats");
    },
    commitSchedule(e) {
      this.selectedSchedule = e;
      this.$store.commit("commitSchedule", e);
    },
    changeSeatStatus() {
      this.lockedSeats.forEach((seatNum) => {
        let matchedSeat = this.getSeats(seatNum);
        if (matchedSeat.status !== "booked") {
          matchedSeat.status = "locked";
        }
      });
    },
    searchBus() {
      this.days = [];
      getRoutesByOriginDestination(
        this.originSelected.id,
        this.destinationSelected.id
      )
        .then((res) => {
          if (res.data && res.status === 200) {
            console.log("ROUTES Search", res.data);

            if (res.data.routes) {
              this.routes = res.data.routes;
              res.data.routes.forEach((route) => {
                getCancelledRoutesByRouteId(route.id).then((resp) => {
                  console.log(resp);
                  if (resp.data.length) {
                    resp.data.forEach((item) => {
                      this.disabledDates.push(item.date);
                    });
                  }
                });
                if (this.days.indexOf(route.day) === -1) {
                  this.days.push(route.day);
                }
              });
            }

            if (res.data.subroutes) {
              this.subroutes = res.data.subroutes;
              this.subroutes.forEach((subroute) => {
                getCancelledRoutesBySubRouteId(subroute.id).then((resp) => {
                  console.log(resp);
                  if (resp.data.length) {
                    resp.data.forEach((item) => {
                      this.disabledDates.push(item.date);
                    });
                  }
                });
                if (this.days.indexOf(subroute.day) === -1) {
                  this.days.push(subroute.day);
                }
              });
            }

            if (this.days) {
              setTimeout(() => {
                console.log(this.disabledDates);
                this.attributes = [
                  {
                    dot: "green",
                    dates: { weekdays: this.days },
                    popover: {
                      label: "Bus Availble",
                    },
                    excludeDates: this.disabledDates,
                  },
                  {
                    key: "cancelled",
                    dates: this.disabledDates,
                    customData: {
                      status: "cancelled",
                    },
                    status: 1,
                  },
                ];
              }, 10);
            } else {
              this.attributes = [
                {
                  dot: "green",
                  dates: [],
                  popover: {
                    label: "Bus Availble",
                  },
                },
              ];
            }
          } else {
            this.$toast.show(`No Bus Availble`, {
              position: "top",
              type: "error",
            });
          }
        })
        .catch((err) => console.log(err));
    },
    connectWs() {
      console.log(this.roomId);
      this.conn = new WebSocket(`${process.env.VUE_APP_WSS}/${this.roomId}`);
      this.conn.onopen = (event) => {
        this.isConnected = true;
        this.connectionAttempt = 0;
        this.errorModal = false;
        this.isLoader = false;
        console.log("Successfully connected to the echo websocket server");
      };

      this.conn.onclose = (evt) => {
        if (!this.isLoader) {
          this.errorModal = true;
          this.isLoader = true;
        }

        this.connectionAttempt++;
        console.log("WSS CONNECTION closed");
        console.log("RECONNECTING");
        this.isConnected = false;
        if (!this.isConnected) {
          setTimeout(() => {
            console.log("Connection Attempt", this.connectionAttempt);
            if (this.connectionAttempt === 7) {
              this.errorModal = false;
              this.isLoader = false;
              this.$router.push("/service-down");
            } else {
              this.connectWs();
            }
          }, 1000);
        }
      };
      this.conn.onmessage = (evt) => {
        let messageJson = JSON.parse(evt.data);
        if (messageJson.messageType === "LOCK") {
          this.lockedSeats = messageJson.lockedList;
          this.changeSeatStatus();
        } else if (messageJson.messageType === "LOCK_LEAVE") {
          this.reverSeatStatus(messageJson.leaveList);
        } else if (messageJson.messageType === "LOCK_CONFIRM") {
        }
      };
    },

    openSeatSelect(route) {
      console.log("INSERT CHECK FOR SUBROUTES", route);
      this.routeId = route.id;
      let parentRouteId;

      if (route.parentRouteId) {
        parentRouteId = route.parentRoute.id;
      } else {
        parentRouteId = route.id;
      }

      this.fare = route.fare;
      this.errorModal = true;
      this.isLoader = true;
      var plaintext = `${parentRouteId}|${this.departureDate}`;
      var hash = crypto.createHash("sha1");
      hash.update(plaintext);
      this.roomId = hash.digest("hex");
      this.connectWs();
      this.seatSelectModal = true;
    },
    viewPassengers(schedule) {
      this.passengersInSchedule = [];
      this.passengerDetailsModal = true;
      getPassengersOnBus(schedule.id, this.departureDate).then((res) => {
        res.data.forEach((booking) => {
          booking.passengers.forEach((passenger, index) => {
            passenger.seatNumber = booking.bookedSeats[index].seatNumber;
            this.passengersInSchedule.push(passenger);
            this.seatsAvailable.splice(
              this.seatsAvailable.indexOf(passenger.seatNumber),
              1
            );
          });
        });
      });
    },
    bindImage(seat) {
      if (seat.type === "seat") {
        switch (seat.status) {
          case "available":
            return require("../../../assets/seatAvailable.png");
            break;
          case "booked":
            return require("../../../assets/seatUnavailable.png");
            break;
          case "driver":
            return require("../../../assets/steeringwheel.png");
            break;
          case "locked":
            return require("../../../assets/seatSelected.png");
            break;
          default:
            return require("../../../assets/seatAvailable.png");
            break;
        }
      } else {
        return require("../../../assets/seatAvailable.png");
      }
    },
    addSeat(seat) {
      if (seat.type === "seat") {
        this.seatSelected = seat;
        if (seat.status === "locked") {
          this.$toast.show("The seat is being booked", {
            position: "top",
            type: "error",
          });
        } else if (seat.status === "booked") {
          this.reverSeatModal = true;
        } else {
          this.conn.send(
            JSON.stringify({
              scheduleHash: this.roomId.toString(),
              messageType: "LOCK",
              seatId: seat.number.toString(),
            })
          );
          this.confirmSeatModal = true;
        }
      }
    },

    reverSeatStatus(arr) {
      arr.forEach((element) => {
        let matchedSeat = this.getSeats(parseInt(element));
        matchedSeat.status = "available";
      });
    },

    getSeats(id) {
      for (let i = 0; i < this.seats.length; i++) {
        if (this.seats[i].number === id) {
          return this.seats[i];
        }
      }
      return null;
    },
    confirmRevert() {
      this.conn.send(
        JSON.stringify({
          scheduleHash: this.roomId.toString(),
          messageType: "LOCK_LEAVE",
          seatId: this.seatSelected.number.toString(),
        })
      );
      this.seatSelected.status = "available";
      this.bookedSeats.forEach((seat, index) => {
        if (this.seatSelected.id === seat.id) {
          this.bookedSeats.splice(index, 1);
        }
      });
      this.passengers.forEach((seat, index) => {
        if (this.seatSelected.number === seat.seatNumber) {
          this.passengers.splice(index, 1);
        }
      });
      this.total -= this.fare;
      this.seatSelected = {};
      this.reverSeatModal = false;
    },
    cancelRevert() {
      this.reverSeatModal = false;
    },
    confirmSeat() {
      this.bookedSeats.push(this.seatSelected);
      this.seatSelected.status = "booked";
      this.passengers.push({ seatNumber: this.seatSelected.number });
      this.total += this.fare;
      this.confirmSeatModal = false;
    },
    cancelSeat() {
      this.conn.send(
        JSON.stringify({
          scheduleHash: this.roomId.toString(),
          messageType: "LOCK_LEAVE",
          seatId: this.seatSelected.number.toString(),
        })
      );
      this.confirmSeatModal = false;
    },
    addPassengerDetails() {
      if (this.bookedSeats.length) {
        this.addPassengerDetailsModal = true;
      } else {
        this.$toast.show("Please select Seat", {
          type: "error",
          position: "top",
        });
      }
    },

    confirmBooking() {
      let detailsFilled = false;
      this.passengers.forEach((passenger) => {
        if (passenger.name && passenger.cid && passenger.contact) {
          detailsFilled = true;
        } else {
          detailsFilled = false;
        }
      });
      if (detailsFilled) {
        console.log("CREATING NEW BOOKING FOR SCHEDULE", this.selectedSchedule);
        if (this.selectedSchedule.parentRouteId) {
          let newBooking = {
            booking: {
              scheduleDate: this.departureDate,
              scheduleHash: this.roomId,
              amount: this.total,
              routeId: this.selectedSchedule.parentRouteId,
              subRouteId: this.routeId,
              refundPercentage: 0,
              paymentStatus: "UNPAID",
              serviceCharge: 0,
              operatorId: VueJwtDecode.decode(sessionStorage.getItem("token"))
                .id,
            },
            passengers: this.passengers,
          };
          this.newBooking = newBooking;
        } else {
          let newBooking = {
            booking: {
              scheduleDate: this.departureDate,
              scheduleHash: this.roomId,
              amount: this.total,
              refundPercentage: 0,
              routeId: this.routeId,
              paymentStatus: "UNPAID",
              serviceCharge: 0,
              operatorId: VueJwtDecode.decode(sessionStorage.getItem("token"))
                .id,
            },
            passengers: this.passengers,
          };
          this.newBooking = newBooking;
        }

        addNewCounterBooking(this.newBooking)
          .then((res) => {
            if (res.status === 201) {
              this.newBookingId = res.data.id;
              this.$toast.show("Please confirm payment", {
                position: "top",
                type: "success",
              });
              this.confirmPaymentModal = true;
            } else {
              this.$toast.show("Newtork Error..try again", {
                position: "top",
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.duplicateSeats = err.response.data;
            this.duplicateSeatsModal = true;
          });
      } else {
        this.$toast.show("Please fill in all the details", {
          position: "top",
          type: "error",
        });
      }
    },
    deleteBooking() {
      deleteBookingwithPassengers(this.newBookingId).then((res) => {
        if (res.status === 200) {
          this.resetState();
          this.confirmPaymentModal = false;
          this.addPassengerDetailsModal = false;
          this.reverSeatModal = false;
          this.seatSelectModal = false;
          this.$toast.show("Booking Cancelled", {
            position: "top",
            type: "error",
          });
        } else {
          this.$toast.show("Network Error");
        }
      });
    },
    confirmPayment() {
      let updateObject = {
        modality: this.modality,
        depositBank: this.journalDetails.bankName,
        depositJournal: this.journalDetails.journalNumber,
        depositContact: this.journalDetails.contactNumber,
        paymentStatus: "PAID",
      };
      counterConfirmPayment(this.newBookingId, updateObject).then((res) => {
        if (res.status === 200) {
          this.$toast.show("Booking Successful", {
            position: "top",
            type: "success",
          });
          this.$router.push(`/staff/ticket/${this.newBookingId}`);
        }
      });
    },
    backToSeatSelection() {
      this.duplicateSeatsModal = false;
      this.addPassengerDetailsModal = false;
    },
    closeSeatSelectModal() {
      this.bookedSeats.forEach((seat) => {
        this.getSeats(seat.number).status = "available";
        this.conn.send(
          JSON.stringify({
            roomId: this.roomId.toString(),
            messageType: "LOCK_LEAVE",
            seatId: seat.number.toString(),
          })
        );
      });
      this.total = 0;
      this.seatSelected = {};
      this.bookedSeats = [];
      this.seatSelectModal = false;
    },

    tableRowColor(e) {
      if (e.id === this.selectedSchedule.id) {
        return "bg-gray-300 text-black ";
      }
      return "bg-white";
    },

    parseDepartureDate(date) {
      let d = new Date(date);
      return d.toDateString();
    },

    viewSch() {
      this.schedules = [];
      this.routes.forEach((route) => {
        if (route.day === this.weekDay) {
          this.schedules.push(route);
        }
      });
      this.subroutes.forEach((subroute) => {
        if (subroute.day === this.weekDay) {
          getRouteDetailsByID(subroute.parentRouteId).then((resp) => {
            subroute.parentRoute = resp.data;
            this.schedules.push(subroute);
          });
        }
      });

      console.log("WITH PARENT ROUTES", this.schedules);
    },
  },
};
</script>