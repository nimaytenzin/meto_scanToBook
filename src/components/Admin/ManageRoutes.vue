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
          <div class="text-4xl text-white font-bold">
            {{ schedules.length }}
          </div>
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
              :key="stop.id"
              class="hover:bg-gray-200 flex flex-row items-stretch"
            >
              <td class="px-6 py-4 whitespace-nowrap">{{ stop.name }}</td>
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
                <button class="flex items-center">
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
      <button class="p-4 flex items-center gap-2" @click="showModal = true">
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
        <p>Add BuRoutses</p>
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
              Est. Duration
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
          <tr
            v-for="schedule in schedules"
            :key="schedule"
            class="hover:bg-gray-200"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              {{ schedule.origin.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ schedule.destination.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">Nu.{{ schedule.fare }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ schedule.eta }} Hours
            </td>
            <td class="flex flex-row justify-center">
              <p v-for="day in schedule.days" :key="day" class="mr-2 text-center">
                {{ day }}  
              </p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ schedule.departure_time }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap flex gap-4">
              <button @click="editBus(bus)" class="flex items-center">
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

              <button class="flex items-center">
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
          <h3 class="text-xl">Add a Stop?</h3>

          <input
            type="text"
            placeholder="Name of the Stop"
            v-model="newStop.name"
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
            @click="showModal = false"
          >
            cancel
          </button>
        </div>
      </vue-final-modal>

      <!-- Add new Bus Type Modal -->
      <vue-final-modal
        v-model="addBusTypeModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div class="modal__content text-center mt-1 flex flex-col">
          <h3 class="text-xl">Add Bus Type?</h3>

          <input type="text" placeholder="Make" v-model="newBusType.make" />
          <input type="text" placeholder="Model" v-model="newBusType.model" />
          <input type="text" placeholder="Type" v-model="newBusType.type" />
          <input
            type="number"
            placeholder="Capacity"
            v-model="newBusType.capacity"
          />
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="addBusType"
          >
            Add Bus Type
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="addBusTypeModal = false"
          >
            cancel
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
            placeholder="Name of the Stop"
            v-model="selectedStop.name"
          />
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="confirmEdit()"
          >
            confirm Edit
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="editStopModal = false"
          >
            cancel
          </button>
        </div>
      </vue-final-modal>

      <!-- Edit Bus Modal -->
      <vue-final-modal
        v-model="editBusModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div class="modal__content text-center mt-1 flex flex-col">
          <h3 class="text-xl">Edit Bus?</h3>

          <input
            type="text"
            placeholder="Bus Number"
            v-model="selectedBus.vehicleNumber"
          />
          <label for="cars">Choose Type:</label>

          <select
            v-model="selectedBus.type"
            class="text-3xl p-5 bg-white text-blue-900"
          >
            <option
              v-for="type in busTypes"
              :value="type"
              :key="type"
              class="bg-white"
            >
              {{ type.make }} {{ type.model }}({{ type.type }})
            </option>
          </select>
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="confirmEdit()"
          >
            confirm Edit
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="editBusTypeModal = false"
          >
            cancel
          </button>
        </div>
      </vue-final-modal>
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
export default {
  data() {
    return {
      showModal: false,
      editBusModal: false,
      editStopModal: false,

      //
      addStopsModal: false,
      week: ["Mon", "Tues", "Wed", "Thrus", "Fri", "Sat", "Sun"],
      stops: [
        { id: 1, name: "Thimphu" },
        { id: 2, name: "Bumthang" },
        { id: 3, name: "Mongar" },
        { id: 4, name: "Chukha" },
        { id: 5, name: "Dagapela" },
        { id: 6, name: "Dagana" },
      ],

      schedules: [
        {
          id: 1,
          origin: { id: 1, name: "Thimphu" },
          destination: { id: 2, name: "Bumthang" },
          fare: 250,
          eta: 6,
          bus_id: null,
          days: ['Mon', 'Tues', 'Wed'],
          departure_time: "9:30 AM",
        },
        {
          id: 1,
          origin: { id: 2, name: "Bumthang" },
          destination: { id: 1, name: "Thimphu" },
          fare: 250,
          eta: 6,
          bus_id: null,
          days: ["Mon"],
          departure_time: "9:00 AM",
        },
      ],

      selectedBusType: {
        id: 0,
        type: "ok",
        make: "ok",
        model: "ok",
        capacity: 0,
      },
      selectedBus: {
        id: 0,
        type: {
          id: 0,
          type: "",
          make: "",
          model: "",
          capacity: 0,
        },
        vehicleNumber: "",
      },
      selectedStop: {},
      newBus: {},
      newBusType: {},

      newStop: {},
    };
  },
  methods: {
    addOrigin(val) {
      this.$store.commit("addOrigin", val);
      this.$router.push("/book/destination");
    },
    editBusType(e) {
      this.editBusTypeModal = true;
      this.selectedBusType = e;
      console.log(e);
    },
    addBus() {
      console.log("mimicing posting into buses", this.newBus);
      this.buses.push(this.newBus);
      this.newBus = {};
      this.showModal = false;
    },
    editBus(e) {
      this.selectedBus = e;
      this.editBusModal = true;
      console.log(e);
    },
    confirmEdit() {
      console.log("Updaing the edits", this.selectedBusType);
      this.editBusTypeModal = false;
    },
    addBusType() {
      console.log("Posting into busTypes", this.newBusType);
      this.busTypes.push(this.newBusType);
      this.newBusType = {};
    },
    editStop(e) {
      this.selectedStop = e;
      console.log("selected stop", e);
      this.editStopModal = true;
    },
    addStop() {
      this.newStop.id = this.stops.length + 1;
      this.stops.push(this.newStop);
      this.addStopsModal = false;
      this.newStop = {};
      console.log(this.stops);
    },
  },
};
</script>