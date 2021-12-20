<template>
  <div class="min-h-screen flex flex-col p-4 justify-start items-center">
    <h2 class="text-xl m-2">Click on a date to view Schedule for that date</h2>

    <Calendar
      :min-date="new Date()"
      @dayclick="onDayClick($event)"
    />
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
                 {{ schedule.departureTime }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
                  {{ schedule.routepathId }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
                  {{ schedule.routepathId }}
                </td>
                
                <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
                  Nu.{{ schedule.fare }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-light text-sm">
                 {{ schedule.isActive }}
                </td>
                <td>
                  <button @click="viewPassengers(schedule)">
                    View Passengers
                  </button>
                </td>
                <td>
                  <button>Add Bus</button>
                </td>

                <td v-if="schedule.busId" class="bg-green-400">
                  <p>
                    No bus
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
                    pklsokds
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
import { getRoutesByWeekday } from '../../services/routeServices';
export default {
  data() {
    return {
      status: "bus Set",
      date: new Date(),
      selectedDate: "",
      schedules: [],
      buses: [],
      selectedBus: {}
    };
  },
  computed: {},
  created() {
    getAllBuses().then((res) => {
      this.buses = res;
      console.log("BUSES,",res)
    });
  },

  methods: {
    updateBus(e) {
      let updateData = {
        busId: e.busId,
      };
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
      getRoutesByWeekday(e.weekday).then(res =>{
        console.log(res)
        this.schedules = res.data
      })      
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