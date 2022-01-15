<template>
  <div class="min-h-screen flex flex-col p-4">
    <h2 class="bg-gray-300 w-full text-gray-800 text-left p-4 rounded">
      User Management
    </h2>
    <div>
      <button class="p-4 flex items-center gap-2" @click="addUserModal = true">
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
        <p>Add Users</p>
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
             Name
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
              login Name
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
              User Type
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
          <tr v-for="user in users" :key="user" class="hover:bg-gray-200">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ user.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ roleObject[user.role] }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap flex gap-4">
              <button @click="showEditUserModal(user)" class="flex items-center">
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

              <button class="flex items-center" @click="deleteUser(user)">
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
      <!-- Add User Modal -->
      <vue-final-modal
        v-model="addUserModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div class="modal__content text-center mt-1 flex flex-col gap-2">
          <h3 class="text-xl">Add New User?</h3>
          <label class="text-sm text-left text-gray-400 italic"
            >1) Full Name</label
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
            placeholder="Full Name"
            v-model="newUser.name"
          />

           <label class="text-sm text-left text-gray-400 italic"
            >Contact Number</label
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
            placeholder="Contact Number"
            v-model="newUser.contact"
          />

          <label class="text-sm text-left text-gray-400 italic"
            >Login ID</label
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
            placeholder="Login ID"
            v-model="newUser.email"
          />


          <label class="text-sm text-left text-gray-400 italic"
            >PassWord</label
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
            type="password"
            placeholder="Password"
            v-model="newUser.password"
          />

          <label class="text-sm text-left text-gray-400 italic"
            >Confirm password</label
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
            type="password"
            placeholder="Confirm Password"
            v-model="newUser.confirmPassword"
          />

         <p class="bg-red-400 text-red-50 p-1 rounded" v-if="passwordError">
            ** {{ passwordError }}
         </p>

          <hr />
          <label class="text-sm text-left text-gray-400 italic"
            >2)Role</label
          >
          <select
            v-model="newUser.role"
            class="text-xl bg-white text-blue-900 p-2"
            placeholder="Select Role"
          >
            <option
              v-for="role in roles"
              :value="role.id"
              :key="role"
              class="bg-white"
            >
              {{ role.name }}
            </option>
          </select>
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="addNewUser()"
          >
            Add User
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="addUserModal = false"
          >
            cancel
          </button>
        </div>
      </vue-final-modal>

      <!-- Edit USer Modal -->
      <vue-final-modal
        v-model="editUserModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div class="modal__content text-center mt-1 flex flex-col gap-2">
          <h3 class="text-xl">Edit User: {{ selectedUser.name }} </h3>
          
          <label class="text-sm text-left text-gray-400 italic"
            >1) Full Name</label
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
            placeholder="Full Name"
            v-model="newUser.name"
          />

           <label class="text-sm text-left text-gray-400 italic"
            >Contact Number</label
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
            placeholder="Contact Number"
            v-model="newUser.contact"
          />

          <label class="text-sm text-left text-gray-400 italic"
            >Login ID</label
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
            placeholder="Login ID"
            v-model="newUser.email"
          />


          <label class="text-sm text-left text-gray-400 italic"
            >PassWord</label
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
            type="password"
            placeholder="Password"
            v-model="newUser.password"
          />

          <label class="text-sm text-left text-gray-400 italic"
            >Confirm password</label
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
            type="password"
            placeholder="Confirm Password"
            v-model="newUser.confirmPassword"
          />

         <p class="bg-red-400 text-red-50 p-1 rounded" v-if="passwordError">
            ** {{ passwordError }}
         </p>

          <hr />
          <label class="text-sm text-left text-gray-400 italic"
            >2)Role</label
          >
          <select
            v-model="newUser.role"
            class="text-xl bg-white text-blue-900 p-2"
            placeholder="Select Role"
          >
            <option
              v-for="role in roles"
              :value="role.id"
              :key="role"
              class="bg-white"
            >
              {{ role.name }}
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
  addNewBus,
  editBus,
  deleteBus,
  getAllBusPaginated,
} from "../../services/busServices";
import { createNewUser, getAllUsers } from '../../services/authServices';

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


      //starts from here
      newUser:{},
      passwordError:null,
      roles:[
        {id:1, name:"Schedule Admin"},
        {id:2, name:"Finance Admin"},
        {id:3, name:"Counter Staff"},
        {id:4, name:"Super Admin"}
      ],
      roleObject: {
        1: "Schedule Admin",
        2: "Finance Admin",
        3: "Counter Staff",
        4: "Super Admin"
      },
      users:[],
      selectedUser:{},
      editUserModal:false,
      addUserModal:false
    };
  },
  created() {
    getAllBusPaginated(0).then((res) => {
      this.buses = res.data;
    });

    getAllUsers().then(res =>{
      this.users = res.data;
      console.log("USERS", this.users)
    })
 
  },
  computed: {
    addBusBtn() {
      return false;
    },
    addBusDisabled() {
      return true;
    },
  },
  methods: {
    addNewUser(){

      //Add Data Validation

      if(this.newUser.password !== this.newUser.confirmPassword){
        this.passwordError = "Password Doesnot Match";
        this.$toast.show("Password doesnot match", {
          position:"top",
          type:"error"
        })
      }else{
        this.passwordError = null
        createNewUser(this.newUser).then(res =>{
          console.log("USER CREATE RESPONSE", res)
        })
      }
    },
    showEditUserModal(user){
      this.editUserModal = true
      this.selectedUser = user

    },

    deleteUser(user){
      alert("DELET USER PROMPT CONFIRMATION")
    },

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
    getAllBusPaginated(0).then((res) => {
      this.buses = res.data;
    });
    },
  },
};
</script>