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
              <p v-if="user.role === 4" class="text-md text-red-700 font-semibold">
                {{ roleObject[user.role] }}
              </p>
              <p v-else-if="user.role === 2" class="text-md text-blue-700 font-semibold ">
                {{ roleObject[user.role] }}
              </p>
               <p v-else-if="user.role === 1" class="text-md text-green-800  font-semibold ">
                {{ roleObject[user.role] }}
              </p>
              <p v-else>
                {{ roleObject[user.role] }}

              </p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap flex gap-4">
              <button
                @click="showEditUserModal(user)"
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

              <button
                @click="showEditPasswordModal(user)"
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
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                Change Password
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

          <label class="text-sm text-left text-gray-400 italic">Login ID</label>
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

          <label class="text-sm text-left text-gray-400 italic">PassWord</label>
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
            type="text"
            placeholder="Confirm Password"
            v-model="newUser.confirmPassword"
          />

          <p class="bg-red-400 text-red-50 p-1 rounded" v-if="passwordError">
            ** {{ passwordError }}
          </p>
           <p
            class="bg-red-400 text-red-50 p-1 rounded"
            v-if="passwordLengthError"
          >
            ** {{ passwordLengthError }}
          </p>

          <hr />
          <label class="text-sm text-left text-gray-400 italic">2)Role</label>
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
          <h3 class="text-xl">Edit User: {{ selectedUser.name }}</h3>

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
            v-model="selectedUser.name"
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
            v-model="selectedUser.contact"
          />

          <label class="text-sm text-left text-gray-400 italic">Login ID</label>
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
            v-model="selectedUser.email"
          />

          <hr />
          <label class="text-sm text-left text-gray-400 italic">2)Role</label>
          <select
            v-model="selectedUser.role"
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
            @click="editUser()"
          >
            confirm Edit
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="editUserModal = false"
          >
            cancel
          </button>
        </div>
      </vue-final-modal>

      <!-- Edit Password Modal -->
      <vue-final-modal
        v-model="newPasswordModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div class="modal__content text-center mt-1 flex flex-col gap-2">
          <h3 class="text-xl">Edit User: {{ selectedUser.name }}</h3>

          <label class="text-sm text-center text-gray-700 font-bold"
            >Set New Password</label
          >
          <label class="text-sm text-left text-gray-400 italic"
            >New password</label
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
            placeholder="New Password"
            v-model="selectedUser.newPassword"
          />
          <label class="text-sm text-left text-gray-400 italic"
            >Confirm New password</label
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
            placeholder="Confirm Password"
            v-model="selectedUser.newPasswordConfirm"
          />
          <p class="bg-red-400 text-red-50 p-1 rounded" v-if="newPasswordError">
            ** {{ newPasswordError }}
          </p>

          <p
            class="bg-red-400 text-red-50 p-1 rounded"
            v-if="passwordLengthError"
          >
            ** {{ passwordLengthError }}
          </p>
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="editPassword()"
          >
            confirm Edit
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="newPasswordModal = false"
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
import {
  changeUserPassword,
  createNewUser,
  getAllUsers,
  updateUser,
} from "../../services/authServices";

export default {
  data() {
    return {

      //starts from here
      newUser: {},
      passwordError: null,
      roles: [
        { id: 1, name: "Schedule Admin" },
        { id: 2, name: "Finance Admin" },
        { id: 3, name: "Counter Staff" },
        { id: 4, name: "Super Admin" },
      ],
      roleObject: {
        1: "Schedule Admin",
        2: "Finance Admin",
        3: "Counter Staff",
        4: "Super Admin",
      },
      users: [],
      selectedUser: {},
      editUserModal: false,
      addUserModal: false,
      newPasswordError: null,
      newPasswordModal: false,
      passwordLengthError: null,
    };
  },
  created() {
  this.fetchData()
  },
  methods: {
    addNewUser() {
      if (
        this.newUser.name &&
        this.newUser.email &&
        this.newUser.contact &&
        this.newUser.password &&
        this.newUser.role
      ) {
        if (this.newUser.password !== this.newUser.confirmPassword) {
          this.passwordError = "Password Doesnot Match";
          this.$toast.show("Password doesnot match", {
            position: "top",
            type: "error",
          });
        } else {
          this.passwordError = null
          if (this.newUser.password.length >= 8) {
            this.passwordError = null;
            createNewUser(this.newUser).then((res) => {
              if(res.status === 201){
                this.$toast.show("Successful");
                this.fetchData()
                this.addUserModal = false;
              }
            });
          } else {
            this.passwordLengthError = "Password Must be 8 Characters Long";
          }
        }
      } else {
        this.$toast.show("Please fill in all details");
      }
    },
    showEditUserModal(user) {
      this.passwordLengthError = null;
      this.passwordError = null;
      this.editUserModal = true;
      this.selectedUser = user;
    },

    deleteUser(user) {
      alert("DELET USER PROMPT CONFIRMATION");
    },

    editUser() {
      if (
        this.selectedUser.name &&
        this.selectedUser.contact &&
        this.selectedUser.role
      ) {
        updateUser(this.selectedUser.id, this.selectedUser).then((res) => {
          if (res.status === 200) {
            this.editUserModal = false;
          } else {
            this.$toast.show("Network Error");
          }
        });
      }else{
        this.$toast.show("One or more fields blank..please fill all details",{
          position:"top",
          type:"error"
        })
      }
    },

    showEditPasswordModal(e) {
      this.newPasswordError = null;
      this.passwordLengthError = null;
      this.selectedUser = e;
      this.newPasswordModal = true;
    },

    editPassword() {
      if (
        this.selectedUser.newPassword === this.selectedUser.newPasswordConfirm
      ) {
        this.newPasswordError=null
        if (this.selectedUser.newPassword.length >= 8) {
          changeUserPassword(this.selectedUser.id, this.selectedUser).then(
            (res) => {
              if (res.status === 200) {
                this.$toast.show("Password Changed Susccessfully");
                this.newPasswordModal = false;
              }
            }
          );
        } else {
          this.passwordLengthError = "Password must be 8 Characters long";
        }
      } else {
        this.newPasswordError = " New Password Doesnot Match";
      }
    },
   fetchData(){
       getAllUsers().then((res) => {
      this.users = res.data;
    });
   }
  },
};
</script>