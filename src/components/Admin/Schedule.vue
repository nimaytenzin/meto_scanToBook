<template>
  <div class="min-h-screen flex flex-col p-4 justify-center items-center">
    <h1>Schedule Bus</h1>

    <h2 class="text-xl m-2">Click on a date to view Schedule for that date</h2>

    <Calendar
      :min-date="new Date()"
      :columns="$screens({ default: 1, lg: 2 })"
      :rows="$screens({ default: 1, lg: 2 })"
      :is-expanded="$screens({ default: true, lg: false })"
      @dayclick="onDayClick($event)"
    />

    <vue-final-modal
      v-model="showScheduleByDayModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
    >
      <div class="modal__content text-center mt-1 flex flex-col gap-2">
        <div class="flex justify-between">
          <h3 class="text-xl text-indigo-800 font-light mb-3">
            <span class="text-sm text-gray-500">Schedule for</span>
            {{ selectedDate }}
          </h3>
          <button
            @click="showScheduleByDayModal = false"
            class="cursor-pointer text-red-600 font-bold"
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div v-if="schedules.length !== 0">
          <table class="min-w-full divide-y divide-gray-200 table-auto">
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
                  Estimated Arrival Time
                </td>
                <td>Passengers</td>
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
                  Add Bus
                </td>

                <td>Actions</td>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="schedule in schedules"
                :key="schedule"
                class="hover:bg-gray-200"
              >
                <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
                  {{ getdepTime(schedule?.route?.departureTime) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
                  {{ schedule.route?.origin?.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
                  {{ schedule?.route?.destination?.name }}
                </td>
                
                <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
                  Nu.{{ schedule?.route?.fare }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
                  {{ getETA(schedule?.route?.ETA) }}
                </td>
                <td>
                  <button @click="viewPassengers(schedule)">
                    View Passengers
                  </button>
                </td>
                <td>
                  <select
                    class="text-3xl p-5 bg-white text-blue-900"
                    v-model="schedule.busId"
                  >
                    <option
                      v-for="bus in buses"
                      :value="bus.id"
                      :key="bus"
                      class="bg-white"
                    >
                      {{ bus.vechileNumber }}
                    </option>
                  </select>
                </td>

                <td v-if="schedule.busId" class="bg-green-400">
                  <p>
                    {{ statusOk }}
                  </p>

                  <button
                    class="
                      bg-blue-500
                      hover:bg-blue-700
                      text-white
                      font-bold
                      py-2
                      px-4
                      rounded
                    "
                    @click="updateBus(schedule)"
                  >
                    Update Bus
                  </button>
                </td>
                <td v-else class="bg-red-400">
                  <p>
                    {{ statusNotOk }}
                  </p>

                  <button
                    class="
                      bg-blue-500
                      hover:bg-blue-700
                      text-white
                      font-bold
                      py-2
                      px-4
                      rounded
                    "
                    @click="updateBus(schedule)"
                  >
                    Assign Bus Bus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <h4 class="m-10 text-indigo-800 font text-2xl">
            --- No Schedules to show ---
          </h4>
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
import { getDetailsByDate } from "../../services/scheduleServices";
import { getAllBuses } from "../../services/busServices";
import { assignBus } from "../../services/scheduleServices";
export default {
  data() {
    return {
      status: "bus Set",
      date: new Date(),
      selectedDate: "",
      showScheduleByDayModal: false,
      schedules: [],
      buses: [],
      selectedBus: {},
      statusOk: "Bus Assigned",
      statusNotOk: "Bus Not Assigned",
    };
  },
  computed: {},
  created() {
    getAllBuses().then((res) => {
      this.buses = res;
    });
  },

  methods: {
    getdepTime: function (time) {
      if(time){
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
    p(e) {
      console.log(e);
    },

    getETA(e) {
      if (e) {
        let ok = e.split(":");
        let hrs = ok[0];
        let min = ok[1];

        return `${hrs} Hrs ${min} Mins`;
      }return ""
    },
    updateBus(e) {
      let updateData = {
        busId: e.busId,
      };
      console.log(updateData, e);
      assignBus(e.id, updateData).then((res) => {
        if (res.status === 200) {
          this.$toast.show("Bus Assigned", {
            type: "success",
            position: "top",
          });
        }
      });
    },
    onDayClick(e) {
      this.selectedDate = e.ariaLabel;
      let formattedDate = e.id + " 00:00:00";
      getDetailsByDate(formattedDate).then((res) => {
        this.schedules = res;
        console.log(this.schedules);
      });
      this.showScheduleByDayModal = true;
      //get schedule by date and asssign it ot he schedules
      this.$toast.show(`Showing Schedule for ${this.selectedDate}`, {
        type: "info",
        position: "top",
      });
      console.log(e);
    },

    viewPassengers(schedule) {
      this.$router.push(`/admin/view-passengers/${schedule.id}`);
    },
  },
};
</script>