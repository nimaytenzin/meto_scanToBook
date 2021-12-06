<template>
  <div class="min-h-screen flex flex-col p-4">
    <h2 class="bg-gray-300 w-full text-gray-800 text-left p-4 rounded">
      Routes and Stop Management
    </h2>
    <div class="flex flex-row gap-7">
      <div
        class="
          flex flex-row
          m-auto
          bg-indigo-900
          text-blue-100
          p-6
          gap-8
          rounded-lg
          border-white
        "
      >
        <div class="my-auto">
          <div class="text-lg">Routes</div>
          <div class="text-4xl text-white font-bold">{{ routes.length }}</div>
        </div>
        <div class="my-auto">
          <div class="text-lg">Stops</div>
          <div class="text-4xl text-white font-bold">{{ stops.length }}</div>
        </div>
      </div>

      <div class="space-y-2 flex-1">
        <button
          class="p-4 flex items-center gap-2"
          @click="addStopsModal = true"
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
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>Add Stops</p>
        </button>

        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 flex">
            <tr>
              <th
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
                Name
              </th>
               <th
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
                Contact
              </th>
              <th
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
                Edit
              </th>
            </tr>
          </thead>
          <tbody
            class="
              bg-white
              divide-y divide-gray-200
              overflow-y-scroll
              flex flex-col
            "
            style="height: 30vh"
          >
            <tr
              v-for="stop in stops"
              :key="stop"
              class="hover:bg-gray-200 flex flex-row items-stretch"
            >
              <td class="px-6 py-4 whitespace-nowrap">{{ stop.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ stop.contact }}</td>
              <td class="px-6 py-4 whitespace-nowrap flex gap-4">
                <button @click="editStop(stop)" class="flex items-center">
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>
                <button @click="deleteStop(stop)" class="flex items-center">
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <button
        class="p-4 flex items-center gap-2"
        @click="addRoutesModal = true"
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
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>Add Bus Routes</p>
      </button>

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
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
              Origin
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
              Destination
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
              Fare
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
              Days
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
              Departure Time
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
              Edit
            </td>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="route in routes" :key="route.id" class="hover:bg-gray-200">
            <td class="px-6 py-4 whitespace-nowrap">{{ route.routepath.origin.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ route.routepath.destination.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">Nu.{{ route.fare }}</td>
            <td class="flex flex-row justify-center">
              <p
                v-for="day in route.routeDays"
                :key="day"
                class="mr-2 text-center"
              >
                {{ getWeekDays(day.day) }}
              </p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ getdepTime(route.departureTime) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap flex gap-4">
              <button @click="editRoute(route)" class="flex items-center">
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </button>

              <button @click="deleteRoute(route)" class="flex items-center">
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <!-- Add Stops Modal -->
      <vue-final-modal
        v-model="addStopsModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div class="modal__content text-center mt-1 flex flex-col">
          <h3 class="text-xl mb-2">Add a Stop?</h3>
          <label class="text-sm text-left text-gray-400 italic"
            >Name of the stop</label
          >
          <input
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
            type="text"
            v-model="newStop.name"
          />

          <label class="text-sm text-left text-gray-400 italic"
            >Focal Contact Number</label
          >
          <input
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
            type="number"
            v-model="newStop.contact"
          />
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="addStop()"
          >
            Add Stop
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="addStopsModal = false"
          >
            Cancel
          </button>
        </div>
      </vue-final-modal>

      <!-- Edit Stop Modal -->
      <vue-final-modal
        v-model="editStopModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div class="modal__content text-center mt-1 flex flex-col">
          <h3 class="text-xl">Edit the Stop?</h3>

          <input
            type="text"
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
            v-model="selectedStop.name"
          />

          <label class="text-sm text-left text-gray-400 italic"
            >Focal Contact Number</label
          >
          <input
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
            type="number"
            v-model="selectedStop.contact"
          />
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="confirmStopEdit()"
          >
            Confirm Edit
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="editStopModal = false"
          >
            Cancel
          </button>
        </div>
      </vue-final-modal>

      <!-- Add Routes Modal -->
      <vue-final-modal
        v-model="addRoutesModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div
          class="modal__content text-center mt-1 flex flex-col overflow-visible"
        >
          <h3 class="text-xl mb-5">Add a Bus Route?</h3>
          <label class="text-sm text-left text-gray-400 italic">Origin</label>
          <select
            v-model="newRoute.originId"
            class="text-xl bg-white text-blue-900 p-2"
          >
            <option
              v-for="stop in stops"
              :value="stop.id"
              :key="stop"
              class="bg-white"
            >
              {{ stop.name }}
            </option>
          </select>
          <label class="text-sm text-left text-gray-400 italic"
            >Destination</label
          >
          <select
            v-model="newRoute.destinationId"
            class="text-xl bg-white text-blue-900 p-2"
          >
            <option
              v-for="stop in stops"
              :value="stop.id"
              :key="stop"
              class="bg-white"
            >
              {{ stop.name }}
            </option>
          </select>
          <label class="text-sm text-left text-gray-400 italic mt-3 mb-1"
            >Select Weekdays from the dropdown</label
          >

          <Multiselect
            v-model="weekdaysSelected"
            mode="tags"
            placeholder="Select active days for the route"
            :createTag="true"
            :options="weekDays"
          />

          <label class="text-sm text-left text-gray-400 italic mb-1 mt-3"
            >Departure time</label
          >

          <div class="flex justify-center">
            <div class="flex">
              <select
                name="hours"
                v-model="departureTime.hrs"
                class="bg-transparent text-xl appearance-none outline-none"
              >
                <option value="0" >0</option>
                <option value="1" >1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">10</option>
                <option value="12">12</option>
              </select>
              <span class="text-xl mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent text-xl appearance-none outline-none mr-4"
                v-model="departureTime.mins"
              >
                <option value="0">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="30">45</option>
              </select>
              <select
                name="ampm"
                v-model="departureTime.ampm"
                class="bg-transparent text-xl appearance-none outline-none"
              >
                <option value="am" selected>AM</option>
                <option value="pm">PM</option>
              </select>
            </div>
          </div>

          <label class="text-sm text-left text-gray-400 italic mt-3 mb-1"
            >Fare</label
          >
          <div
            class="
              flex
              justify-center
              items-end
              shadow
              appearance-none
              border
              rounded
              w-full
              text-gray-700
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
          >
            <p class="text-gray-700 mr-1 py-2 px-3">Nu.</p>
            <input
              class="w-full py-2 px-3"
              type="number"
              placeholder="Fare"
              v-model="newRoute.fare"
            />
          </div>
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="addRoute()"
          >
            Add Route
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="addRoutesModal = false"
          >
            Cancel
          </button>
        </div>
      </vue-final-modal>

      <!-- Edit Route Modal -->
      <vue-final-modal
        v-model="editRouteModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div
          class="modal__content text-center mt-1 flex flex-col overflow-visible"
        >
          <h3 class="text-xl mb-5">Edit Route?</h3>
          <label class="text-sm text-left text-gray-400 italic">Origin</label>
          <select
            v-model="selectedRoute.originId"
            class="text-xl bg-white text-blue-900 p-2"
          >
            <option
              v-for="stop in stops"
              :value="stop.id"
              :key="stop"
              class="bg-white"
            >
              {{ stop.name }}
            </option>
          </select>
          <label class="text-sm text-left text-gray-400 italic"
            >Destination</label
          >
          <select
            v-model="selectedRoute.destinationId"
            class="text-xl bg-white text-blue-900 p-2"
          >
            <option
              v-for="stop in stops"
              :value="stop.id"
              :key="stop"
              class="bg-white"
            >
              {{ stop.name }}
            </option>
          </select>
          <label class="text-sm text-left text-gray-400 italic mt-3 mb-1"
            >Select Weekdays from the dropdown</label
          >

          <Multiselect
            v-model="weekdaysSelected"
            mode="tags"
            placeholder="Select active days for the route"
            :createTag="true"
            :options="weekDays"
          />

          <label class="text-sm text-left text-gray-400 italic mb-1 mt-3"
            >Departure time</label
          >

          <div class="flex justify-center">
            <div class="flex">
              <select
                name="hours"
                v-model="selectedRoute.departureTime"
                class="bg-transparent text-xl appearance-none outline-none"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">10</option>
                <option value="12">12</option>
              </select>
              <span class="text-xl mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent text-xl appearance-none outline-none mr-4"
                v-model="departureTime.mins"
              >
                <option value="0">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="30">45</option>
              </select>
              <select
                name="ampm"
                v-model="departureTime.ampm"
                class="bg-transparent text-xl appearance-none outline-none"
              >
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>
          </div>

          <label class="text-sm text-left text-gray-400 italic mt-3 mb-1"
            >Fare</label
          >
          <div
            class="
              flex
              justify-center
              items-end
              shadow
              appearance-none
              border
              rounded
              w-full
              text-gray-700
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
          >
            <p class="text-gray-700 mr-1 py-2 px-3">Nu.</p>
            <input
              class="w-full py-2 px-3"
              type="number"
              placeholder="Fare"
              v-model="selectedRoute.fare"
            />
          </div>
          <label class="text-sm text-left text-gray-400 italic mb-1 mt-3"
            >Est. Travel Time</label
          >
          <div class="flex justify-center">
            <div class="flex">
              <div>
                <select
                  name="hours"
                  v-model="eta.hrs"
                  class="bg-transparent text-xl appearance-none outline-none"
                >
                  <option value="01">1</option>
                  <option value="02">2</option>
                  <option value="03">3</option>
                  <option value="04">4</option>
                  <option value="05">5</option>
                  <option value="06">6</option>
                  <option value="07">7</option>
                  <option value="08">8</option>
                  <option value="09">9</option>
                  <option value="10">10</option>
                  <option value="11">10</option>
                  <option value="12">12</option>
                </select>
                <p>Hours</p>
              </div>
              <span class="text-xl mr-3">:</span>
              <div>
                <select
                  name="minutes"
                  class="
                    bg-transparent
                    text-xl
                    appearance-none
                    outline-none
                    mr-4
                  "
                  v-model="eta.min"
                >
                  <option value="0">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="30">45</option>
                </select>
                <p>Minutes</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="confirmRouteEdit()"
          >
            Confirm Edit
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="editRouteModal = false"
          >
            Cancel
          </button>
        </div>
      </vue-final-modal>
    </div>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>

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
import Multiselect from "@vueform/multiselect";
import {
  getAllStops,
  addNewStop,
  deleteStop,
  editStop,
} from "../../services/stopServices";

import {
  addNewRoute,
  getAllRoutes,
  deleteRoute,
} from "../../services/routeServices";

import {
  addNewSchedule,
} from "../../services/scheduleServices";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      //Modal toggle
      addStopsModal: false,
      editStopModal: false,
      addRoutesModal: false,
      editRouteModal: false,
      timezone: "",
      weekDays: [
        { value: 0, label: "Monday" },
        { value: 1, label: "Tuesday" },
        { value: 2, label: "Wednesday" },
        { value: 3, label: "Thrusday" },
        { value: 4, label: "Friday" },
        { value: 5, label: "Saturday" },
        { value: 6, label: "Sunday" },
      ],
      week: ["Mon", "Tues", "Wed", "Thrus", "Fri", "Sat", "Sun"],
      weekdaysSelected: [],
      eta: {
        hrs:"0",
        min:'0'
      },
      departureTime: {
        hrs:"0",
        mins:"0",
        ampm:"am"
      },
      stops: [],
      routes: [],

      newStop: {},
      selectedStop: {},
      newRoute: {},
      selectedRoute: {},
    };
  },
  created() {
    getAllRoutes().then((res) => {
      console.log("rerer",res)
      this.routes = res;
    });

    getAllStops()
      .then((res) => {
        this.stops = res;
        this.newRoute.originId = res[0].id
        this.newRoute.destinationId = res[1].id

      })
      .catch((err) => console.log(err));
  },

  methods: {
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


    getWeekDays(dayNo) {
      switch (dayNo) {
        case 6:
          return "Sun";
          break;
        case 0:
          return "Mon";
          break;
        case 1:
          return "Tues";
          break;
        case 2:
          return "Wed";
          break;
        case 3:
          return "Thurs";
          break;
        case 4:
          return "Fri";
          break;
        case 5:
          return "Sat";
      }
    },
    addStop() {
      if (this.newStop.name) {
        addNewStop(this.newStop).then((res) => {
          if (res.status === 201) {
            this.reloadData();
            this.addStopsModal = false;
            this.$toast.show("New Stop Added", {
              position: "top",
              type: "success",
            });
            this.newStop = {};
          } else {
            this.addStopsModal = false;
            this.$toast.show("Error Adding..try again", {
              position: "top",
              type: "error",
            });
          }
        });
      } else {
        this.$toast.show("Please enter a stop", {
          position: "top",
          type: "error",
        });
      }
    },

    editStop(e) {
      this.selectedStop = e;
      this.editStopModal = true;
    },

    confirmStopEdit() {
      if (this.selectedStop.name === "") {
        this.$toast.show("Please enter a stop", {
          position: "top",
          type: "error",
        });
      } else {
        editStop(this.selectedStop.id, this.selectedStop).then((res) => {
          if (res.status === 200) {
            this.reloadData();
            this.editStopModal = false;
            this.$toast.show("Stop updated", {
              position: "top",
              type: "success",
            });
          } else {
            this.editStopModal = false;
            this.$toast.show("Error Updating..try again", {
              position: "top",
              type: "error",
            });
          }
        });


      }
    },

    deleteStop(e) {
      deleteStop(e.id).then((res) => {
        if (res.status === 200) {
          this.reloadData();
          this.$toast.show("Stop Deleted", {
            position: "top",
            type: "success",
          });
        } else {
          this.$toast.show("Delete Failed..try again", {
            position: "top",
            type: "error",
          });
        }
      });
    },

    parseDepartureTime(time) {
      if (time.ampm === "am") {
        return `${time.hrs}:${time.mins}:00`;
      } else {
        let hr = parseInt(time.hrs);
        hr += 12;
        time.hrs = hr;
        return `${time.hrs}:${time.mins}:00`;
      }
    },

    parseDate(e) {
      let fromDate = new Date(Date.parse(e));
      let toDate = new Date(Date.parse(e) + 86400000 * 6 * 30);

      return {
        fromDate: fromDate,
        toDate: toDate,
      };
    },
    addRoute() {
      this.newRoute.days = this.weekdaysSelected;
      let departureTime = this.parseDepartureTime(this.departureTime);
      this.newRoute.departureTime = departureTime;

      addNewRoute(this.newRoute)
        .then((res) => {
          console.log(res)
          let routeId = res.data[0].routeId;
          if (res.status === 201) {
            let date = this.parseDate(res.data[0].createdAt);
            let reqBody = {
              routeId: routeId,
              onDays: this.newRoute.days,
              fromDate: date.fromDate,
              toDate: date.toDate,
            };
            addNewSchedule(reqBody).then((res) => {
              if (res.status === 201) {
                this.reloadData();
                this.addRoutesModal = false;
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editRoute(e) {
      this.selectedRoute = e;
      this.editRouteModal = true;
      console.log(this.selectedRoute)
    },

    confirmRouteEdit() {
      if (
        this.selectedRoute.origin === "" ||
        this.selectedRoute.destination === "" ||
        this.selectedRoute.fare === "" ||
        this.selectedRoute.eta === "" ||
        this.selectedRoute.days === "" ||
        this.selectedRoute.departureTime === "" ||
        0
      ) {
        this.$toast.show("No empty field is permitted", {
          position: "top",
          type: "error",
        });
      } else {
        this.editRouteModal = false;
        this.$toast.show("Route updated", {
          position: "top",
          type: "success",
        });
      }
    },

    deleteRoute(e) {
      deleteRoute(e.id).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.reloadData();
          //delete on cascade
        }
      });
    },

    reloadData() {
      getAllStops()
        .then((res) => {
          this.stops = res;
        })
        .catch((err) => console.log(err));

      getAllRoutes().then((res) => {
        this.routes = res;
      });
    },

    decomposeDepTime(timeString){

    }
  },

};
</script>