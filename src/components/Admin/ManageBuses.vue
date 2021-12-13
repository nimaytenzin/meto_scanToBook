<template>
  <div class="min-h-screen flex flex-col p-4">
    <h2 class="bg-gray-300 w-full text-gray-800 text-left p-4 rounded">
      Bus Type and Bus Management
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
          <div class="text-lg">Buses</div>
          <div class="text-4xl text-white font-bold">{{ buses.count }}</div>
        </div>
        <div class="my-auto">
          <div class="text-lg">Bus Types</div>
          <div class="text-4xl text-white font-bold">{{ busTypes.length }}</div>
        </div>
      </div>

      <div class="space-y-2 flex-1">
        <button
          class="p-4 flex items-center gap-2"
          @click="addBusTypeModal = true"
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
          <p>Add Bus Type</p>
        </button>

        <table class="min-w-full divide-y divide-gray-200 table-auto">
          <thead class="bg-gray-50">
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
                Make
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
                Type
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
                Model
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
                Capacity
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
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="type in busTypes" :key="type" class="hover:bg-gray-200">
              <td class="px-6 py-4 whitespace-nowrap">{{ type.type }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ type.make }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ type.model }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ type.capacity }}</td>
              <td class="px-6 py-4 whitespace-nowrap flex gap-4">
                <button
                  @click="showEditBusTypeModal(type)"
                  class="flex items-center"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>

                  Edit
                </button>
                <button class="flex items-center" @click="deleteBusType(type)">
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
            <tr>
              <td></td>
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
        <p>Add Buses</p>
      </button>

      <div class="bg-white border-t flex items-end justify-center gap-6 w-full">
        <span class="text-xs xs:text-sm text-gray-900">
          Showing {{ buses.limit }} entries| Page {{ buses.currentPage + 1 }} of
          {{ buses.lastPage + 1 }}
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          <button
            class="
              text-sm
              bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-semibold
              py-2
              px-4
              rounded-l
            "
            @click="getBusData(buses.firstPage)"
          >
            First
          </button>
          <button
            class="text-sm text-gray-800 font-semibold py-2 px-4"
            :class="
              buses.previousPage === null
                ? 'bg-gray-100 hover:bg-gray-100 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            "
            @click="getBusData(buses.previousPage)"
          >
            Prev
          </button>
          <button
            class="text-sm text-gray-800 font-semibold py-2 px-4"
            :class="
              buses.nextPage === null
                ? 'bg-gray-100 hover:bg-gray-100 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            "
            @click="getBusData(buses.nextPage)"
          >
            Next
          </button>
          <button
            class="
              text-sm
              bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-semibold
              py-2
              px-4
              rounded-r
            "
            @click="getBusData(buses.lastPage)"
          >
            Last
          </button>
        </div>
      </div>
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
              Bus Number
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
              Bus Model
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
              Class Type
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
          <tr v-for="bus in buses.data" :key="bus" class="hover:bg-gray-200">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ bus.vechileNumber }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ bus.busType?.make ? bus.busType.make : "-" }}
              {{ bus.busType?.model ? bus.busType.model : "-" }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ bus.busType?.type ? bus.busType.type : "" }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap flex gap-4">
              <button @click="showEditBusDialog(bus)" class="flex items-center">
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

              <button class="flex items-center" @click="deleteBus(bus)">
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
      <!-- Add bus Modal -->
      <vue-final-modal
        v-model="showModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div class="modal__content text-center mt-1 flex flex-col gap-2">
          <h3 class="text-xl">Add Bus?</h3>
          <label class="text-sm text-left text-gray-400 italic"
            >1) Vehicle Number</label
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
              focus:outline-none focus:shadow-outline
            "
            type="text"
            placeholder="Bus Number"
            v-model="newBus.vehicleNumber"
          />

          <hr />
          <label class="text-sm text-left text-gray-400 italic"
            >2)Select Bus Type Defined in the bus types</label
          >
          <select
            v-model="newBus.type"
            class="text-xl bg-white text-blue-900"
            placeholder="Select Bus Types"
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
            @click="addBus()"
          >
            Add Bus
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="showModal = false"
          >
            cancel
          </button>
        </div>
      </vue-final-modal>

      <!-- Edit BUS Modal -->
      <vue-final-modal
        v-model="editBusModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div class="modal__content text-center mt-1 flex flex-col gap-2">
          <h3 class="text-xl">Edit Bus??</h3>
          <label class="text-sm text-left text-gray-400 italic"
            >1) Vehicle Number</label
          >
          <input
            type="text"
            placeholder="Bus Number"
            v-model="selectedBus.vechileNumber"
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
              focus:outline-none focus:shadow-outline
            "
          />
          <label class="text-sm text-left text-gray-400 italic"
            >2)Select Bus Type Defined in the bus types</label
          >
          <hr />

          <select
            v-model="selectedBus.busType"
            class="text-xl bg-white text-blue-900"
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
            @click="editBus()"
          >
            confirm Edit
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="editBusModal = false"
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
        <div class="modal__content text-center mt-1 flex flex-col gap-3">
          <h3 class="text-xl">Add Bus Type?</h3>
          <label class="text-sm text-left text-gray-400 italic">
            1) Make: Vehicle Maufacture Brand</label
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
              focus:outline-none focus:shadow-outline
            "
            type="text"
            placeholder="Make"
            v-model="newBusType.make"
          />
          <hr />
          <label class="text-sm text-left text-gray-400 italic"
            >2) Model : Vehicle Model Type</label
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
              focus:outline-none focus:shadow-outline
            "
            type="text"
            placeholder="Model"
            v-model="newBusType.model"
          />
          <hr />
          <label class="text-sm text-left text-gray-400 italic"
            >3)Type : Regular or Premium Type?</label
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
              focus:outline-none focus:shadow-outline
            "
            type="text"
            placeholder="Type"
            v-model="newBusType.type"
          />
          <hr />
          <label class="text-sm text-left text-gray-400 italic"
            >4)Capacity : Seating Capacity</label
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
              focus:outline-none focus:shadow-outline
            "
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

      <!-- Edit Bus Type Modal -->
      <vue-final-modal
        v-model="editBusTypeModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div class="modal__content text-center mt-1 flex flex-col">
          <h3 class="text-xl">Edit Bus Type?</h3>
          <label class="text-sm text-left text-gray-400 italic">
            1) Make: Vehicle Maufacture Brand</label
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
              focus:outline-none focus:shadow-outline
            "
            type="text"
            placeholder="Make"
            v-model="selectedBusType.make"
          />
          <hr />
          <label class="text-sm text-left text-gray-400 italic"
            >2) Model : Vehicle Model Type</label
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
              focus:outline-none focus:shadow-outline
            "
            type="text"
            placeholder="Model"
            v-model="selectedBusType.model"
          />
          <hr />
          <label class="text-sm text-left text-gray-400 italic"
            >3)Type : Regular or Premium Type?</label
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
              focus:outline-none focus:shadow-outline
            "
            type="text"
            placeholder="Type"
            v-model="selectedBusType.type"
          />
          <hr />
          <label class="text-sm text-left text-gray-400 italic"
            >4)Capacity : Seating Capacity</label
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
              focus:outline-none focus:shadow-outline
            "
            type="number"
            placeholder="Capacity"
            v-model="selectedBusType.capacity"
          />
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="editBusType()"
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
import {
  getAllBusTypes,
  addNewBusType,
  deleteBusType,
  editBusType,
} from "../../services/busTypesServices";

import {
  getAllBuses,
  addNewBus,
  editBus,
  deleteBus,
  getAllBusPaginated,
} from "../../services/busServices";

export default {
  data() {
    return {
      showModal: false,
      editBusModal: false,
      addBusTypeModal: false,
      editBusTypeModal: false,
      busTypes: [],
      buses: [],
      selectedBusType: {},
      selectedBus: {},
      newBus: {},
      newBusType: {},
    };
  },
  created() {
    getAllBusPaginated(0).then((res) => {
      console.log("Sfsafsdfdsfdsf", res);
      this.buses = res.data;
    });
    getAllBusTypes().then((res) => {
      this.busTypes = res;
    });
  },
  computed: {
    addBusBtn() {
      return false;
    },
    //validtion logic
    addBusDisabled() {
      return true;
    },
  },
  methods: {
    //methods for BUs TYPE crud
    showEditBusTypeModal(e) {
      this.editBusTypeModal = true;
      this.selectedBusType = e;
    },
    addBusType() {
      if (
        this.newBusType.make &&
        this.newBusType.type &&
        this.newBusType.model &&
        this.newBusType.capacity
      ) {
        addNewBusType(this.newBusType)
          .then((res) => {
            if (res.status === 201) {
              this.refreshData();
              this.addBusTypeModal = false;
              this.showToast(
                `${this.newBusType.make} ${this.newBusType.model} added`,
                "top",
                "success"
              );

              this.newBusType = {};
            } else {
              this.addBusTypeModal = false;

              this.showToast(
                "Error Deleting..\n please try again",
                "top",
                "error"
              );
            }
          })
          .catch((err) => console.log(err));
      } else {
        this.showToast("All the Fields are required", "top", "error");
      }
    },
    getBusData(pageNo) {
      getAllBusPaginated(pageNo).then((res) => {
        this.buses = res.data;
      });
    },
    editBusType() {
      if (
        this.selectedBusType.make !== "" &&
        this.selectedBusType.type !== "" &&
        this.selectedBusType.model !== "" &&
        this.selectedBusType.capacity !== ""
      ) {
        editBusType(this.selectedBusType.id, this.selectedBusType)
          .then((res) => {
            if (res.status === 200) {
              this.refreshData();
              this.editBusTypeModal = false;
              this.showToast("Bus Type Updated", "top", "success");
            } else {
            }
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.show(`Fields cannot be empty`, {
          position: "top",
          type: "error",
        });
      }
    },
    deleteBusType(e) {
      deleteBusType(e.id)
        .then((res) => {
          if (res.status === 200) {
            this.showToast("Bus Type Removed", "top", "success");
            this.refreshData();
          } else {
            this.showToast(
              "Error Deleting..\n please try again",
              "top",
              "error"
            );
          }
        })
        .catch((err) => console.log(err));
    },

    //methods for Bus CRUD
    addBus() {
      if (this.newBus.vehicleNumber && this.newBus.type) {
        let data = {
          vechileNumber: this.newBus.vehicleNumber,
          typeId: this.newBus.type.id,
        };

        addNewBus(data).then((res) => {
          if (res.status === 201) {
            this.showToast("Bus Addedd Successfully", "top", "success");
            this.refreshData();
            this.showModal = false;
            this.newBus = {};
          } else {
            this.showModal = false;
            this.showToast("Error Adding..\n please try again", "top", "error");
          }
        });
      } else {
        this.showToast("All the fields are required", "top", "error");
      }
    },
    showEditBusDialog(e) {
      this.selectedBus = e;
      this.editBusModal = true;
    },
    editBus() {
      if (this.selectedBus.vechileNumber !== "") {
        let data = {
          vechileNumber: this.selectedBus.vechileNumber,
          typeId: this.selectedBus.busType.id,
        };

        editBus(this.selectedBus.id, data)
          .then((res) => {
            if (res.status === 200) {
              this.showToast("Bus Edited Successfully", "top", "success");
              this.refreshData();
              this.editBusModal = false;
            } else {
            }
          })
          .catch((err) => console.log(err));
      } else {
        this.showToast("Enter Vehicle Number", "top", "error");
      }
    },
    deleteBus(e) {
      deleteBus(e.id).then((res) => {
        if (res.status === 200) {
          this.refreshData();
          this.showToast("Bus Deleted Successfully", "top", "info");
        } else {
          this.showToast("Error Deleting..try again", "top", "error");
        }
      });
    },

    showToast(msg, position, type) {
      this.$toast.show(msg, {
        position: position,
        type: type,
      });
    },

    refreshData() {
      getAllBusTypes().then((res) => {
        this.busTypes = res;
      });
      getAllBuses().then((res) => {
        this.buses = res;
      });
    },
  },
};
</script>