<template>
  <div class="min-h-screen flex flex-col p-4">
    <h2 class="bg-gray-300 w-full text-gray-800 text-left p-4 rounded">
      Routes and Stop Management
    </h2>
    <div class="">
      <div class="flex">
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
        <button
          class="p-4 flex items-center gap-2"
          @click="addRoutePathModal = true"
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
          <p>Add New RoutePath</p>
        </button>

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
      </div>
      <div class="w-full overflow-y-scroll" style="height: 40vh">
        <table class="w-full divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Stop Details
            </td>
            <td class="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Routes
            </td>
          </tr>

          <tr v-for="stop in stops" :key="stop" class="w-full">
            <td
              class="
                px-6
                py-3
                text-left
                whitespace-nowrap
                flex flex-col
                justify-start
              "
            >
              {{ stop.name }} <br />
              <p class="text-sm">Managed by {{ stop.user?.name }}</p>

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
                Edit Stop
              </button>
            </td>
            <td class="px-6 py-3 text-left whitespace-nowrap">
              <div v-if="stop.routepaths.length" class="flex flex-col gap-1">
                <div
                  v-for="routepath in stop.routepaths"
                  :key="routepath"
                  class="flex justify-between hover:bg-gray-200"
                >
                  <div>
                    {{ routepath.origin.name }} -
                    {{ routepath.destination.name }}
                  </div>
                  <div>
                    <button
                      class="border p-2"
                      @click="loadSchedules(routepath)"
                    >
                      Load Schedules
                    </button>
                  </div>
                </div>
              </div>
              <div v-else>No Outgoing Routes</div>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <hr class="w-full my-3 border-2 border-gray-400" />
    <div>
      <div class="flex gap-2"></div>

      <div class="flex flex-wrap w-full gap-6 text-gray-700">
        <div class="border p-4 w-full">
          <p class="text-2xl text-center my-2" v-if="selectedRoutepath.origin">
            Showing Schedule for {{ selectedRoutepath.origin?.name }} -
            {{ selectedRoutepath.destination?.name }}
          </p>
          <div v-if="schedules.length">
            <table class="table-auto w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <td class="px-12 py-2 text-left text-gray-500">Day</td>
                  <td class="px-12 py-2 text-left text-gray-500">Details</td>

                  <td class="px-12 py-2 text-left text-gray-500">Actions</td>
                  <td class="px-12 py-2 text-left text-gray-500">SubRoutes</td>
                </tr>
              </thead>
              <tr
                v-for="schedule in schedules"
                :key="schedule"
                class="text-gray-500"
              >
                <td class="px-12 py-2 text-left text-gray-500">
                  {{ week[schedule.day - 1] }}
                </td>
                <td class="px-12 py-2 text-left text-gray-500">
                  Departure: {{ schedule.departureTime }}
                  <br />
                  Fare: Nu {{ schedule.fare }}

                  <p
                    v-if="!schedule.isActive"
                    class="text-red-800 text-md font-semibold"
                  >
                    Route Suspended
                  </p>
                  <p v-else class="text-green-800 text-md font-semibold">
                    Route Active
                  </p>

                  
                  <!-- Regular/Premium -->
                  <div class="mt-2">
                    <span
                      v-if="schedule.isPremium"
                      class="text-white text-md font-semibold  rounded-xl px-2 py-1 bg-blue-400"
                    >
                      Premium
                    </span>
                    <span v-else class="text-blue-800 text-md font-semibold">
                      Regular bus
                    </span>
                  </div>
                </td>
                <td class="px-12 py-2 text-left text-gray-500">
                  <div class="flex flex-col gap-2 justify-around">
                    <button
                      @click="createNewSubRoute(schedule)"
                      class="flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
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
                      Add Sub Route
                    </button>
                    <div @click="editRoute(schedule)" class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
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
                    </div>
                    <div
                      @click="showDeleteRouteModal(schedule)"
                      class="flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
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
                    </div>
                  </div>
                </td>
                <td>
                  <div v-if="schedule.subroutes?.length">
                    <table>
                      <thead class="bg-gray-50">
                        <tr>
                          <td class="px-6 py-2 text-left text-gray-500">
                            Destination
                          </td>
                          <td class="px-6 py-2 text-left text-gray-500">
                            Fare
                          </td>

                          <td class="px-6 py-2 text-left text-gray-500">
                            Departure
                          </td>
                          <td class="px-6 py-2 text-left text-gray-500">
                            Action
                          </td>
                        </tr>
                      </thead>

                      <tr
                        v-for="subroute in schedule.subroutes"
                        :key="subroute"
                      >
                        <td class="px-6 py-2 text-left text-gray-500">
                          {{ subroute.routepath.destination.name }}
                        </td>
                        <td class="px-6 py-2 text-left text-gray-500">
                          {{ subroute.fare }}
                        </td>
                        <td class="px-6 py-2 text-left text-gray-500">
                          {{ subroute.departureTime }}
                        </td>
                        <td>
                          <div
                            @click="editSubRoute(subroute)"
                            class="
                              flex
                              items-center
                              rounded-full
                              text-gray-500
                              p-1
                            "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4"
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
                          </div>
                          <div
                            @click="deleteSubRoute(subroute)"
                            class="
                              flex
                              items-center
                              rounded-full
                              text-gray-500
                              p-1
                            "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4"
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
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div v-else>No Subroutes</div>
                </td>
              </tr>
            </table>
          </div>
          <div v-if="!schedules.length">No Schedules</div>
        </div>
      </div>
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
              focus:outline-none focus:shadow-outline
            "
            type="text"
            v-model="newStop.name"
          />

          <label class="text-sm text-left text-gray-400 italic"
            >Focal Staff</label
          >

          <select
            name="hours"
            v-model="newStop.userId"
            class="bg-transparent outline-none"
          >
            <option :value="staff.id" v-for="staff in staffs" :key="staff">
              {{ staff.name }}
            </option>
          </select>
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
              focus:outline-none focus:shadow-outline
            "
            v-model="selectedStop.name"
          />

          <label class="text-sm text-left text-gray-400 italic"
            >Focal Staff</label
          >
          <select
            name="hours"
            v-model="selectedStop.userId"
            class="bg-transparent outline-none"
          >
            <option v-for="staff in staffs" :key="staff" :value="staff.id">
              {{ staff.name }}
            </option>
          </select>
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

      <!-- Add RoutePaths Modal -->
      <vue-final-modal
        v-model="addRoutePathModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div class="modal__content text-center mt-1 flex flex-col">
          <h3 class="text-xl mb-2">Add a RoutePath?</h3>
          <label class="text-sm text-left text-gray-400 italic">Origin</label>
          <select
            v-model="newRoutePath.originId"
            class="text-3xl p-5 bg-white text-blue-900"
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
            v-model="newRoutePath.destinationId"
            class="text-3xl p-5 bg-white text-blue-900"
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
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="addRoutePath()"
          >
            Add RoutePath
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="addRoutePathModal = false"
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
          <label class="text-sm text-left text-gray-400 italic"
            >Select Route Path</label
          >
          <select
            v-model="newRoute.routepathId"
            class="text-xl bg-white text-blue-900 p-2 border-2"
          >
            <option
              v-for="routepath in routepaths"
              :value="routepath.id"
              :key="routepath"
              class="bg-white"
            >
              {{ routepath.origin.name }} -{{ routepath.destination.name }}
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

          <div class="flex justify-center border-2">
            <div class="flex">
              <select
                name="hours"
                v-model="newDepartureTimeArr[0]"
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
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <span class="text-xl mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent text-xl appearance-none outline-none mr-4"
                v-model="newDepartureTimeArr[1]"
              >
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="30">45</option>
              </select>
              <select
                name="ampm"
                v-model="newDepartureTimeArr[2]"
                class="bg-transparent text-xl appearance-none outline-none"
              >
                <option value="AM" selected>AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <label class="text-sm text-left text-gray-400 italic mt-3 mb-1"
            >Regular or Premium?</label
          >
              <select
                name="isPremium"
                v-model="newRoute.isPremium"
                class="text-xl bg-white text-blue-900 p-2 border-2"
              >
                <option value="0" selected>Regular</option>
                <option value="1">Premium</option>
              </select>

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
              focus:outline-none focus:shadow-outline
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

          <p class="text-xl font-thin">
            {{ selectedRoutepath.origin?.name }} -
            {{ selectedRoutepath.destination?.name }}
          </p>

          <div class="flex justify-center items-center text-xl gap-2 my-1">
            Route Day : {{ week[selectedRoute.day - 1] }}
          </div>

          <div class="flex justify-center text-xl items-center gap-2 my-1">
            Route Status :
            <div
              :class="
                selectedRoute.isActive
                  ? 'bg-green-400 text-green-50 p-1 rounded'
                  : 'bg-red-400 text-red-50 p-1 rounded'
              "
            >
              <select
                name="hours"
                v-model="selectedRoute.isActive"
                class="bg-transparent outline-none"
              >
                <option value="1">Active</option>
                <option value="0">Suspended</option>
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
              focus:outline-none focus:shadow-outline
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

          <label class="text-sm text-left text-gray-400 italic mt-3 mb-1"
            >Regular or Premium?</label
          >
          <select
            name="isPremium"
            v-model="selectedRoute.isPremium"
            class="text-xl bg-white text-blue-900 p-2 border-2"
          >
            <option value="0">Regular</option>
            <option value="1">Premium</option>
          </select>

          <label class="text-sm text-left text-gray-400 italic mb-1 mt-3"
            >Departure time</label
          >
          <div class="flex justify-center border-2">
            <div class="flex">
              <select
                name="hours"
                v-model="selectedDepartureTimeArr[0]"
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
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <span class="text-xl mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent text-xl appearance-none outline-none mr-4"
                v-model="selectedDepartureTimeArr[1]"
              >
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="30">45</option>
              </select>
              <select
                name="ampm"
                class="bg-transparent text-xl appearance-none outline-none"
                v-model="selectedDepartureTimeArr[2]"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
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

      <!-- Delete Route Modal -->
      <vue-final-modal
        v-model="deleteRouteModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen text-gray-700"
      >
        <div
          class="modal__content text-center mt-1 flex flex-col"
          style="width: 30vw"
        >
          <h3 class="text-xl mb-2">Delete Route?</h3>
          <p class="text-red-500 my-2" v-if="pendingBookings.length !== 0">
            These bookings will be affected
          </p>
          <div class="flex flex-col gap-2 overflow-x-scroll">
            <div
              v-for="booking in pendingBookings"
              :key="booking"
              class="bg-gray-600 rounded text-gray-200"
            >
              <p>Booking ID: {{ booking.id }}</p>
              <p>
                {{ selectedRoutepath.origin.name }} -
                {{ selectedRoutepath.destination.name }}
              </p>
              <p>
                Departure Date : {{ parseDepartureDate(booking.scheduleDate) }}
              </p>
              <p>Departure Time : {{ selectedRoute.departureTime }}</p>
              <div>
                <table class="table-auto w-full">
                  <tr>
                    <td>Seat No</td>
                    <td>Name</td>
                    <td>Contact</td>
                  </tr>
                  <tr v-for="passenger in booking.passengers" :key="passenger">
                    <td>
                      {{ passenger.seatNumber }}
                    </td>
                    <td>
                      {{ passenger.name }}
                    </td>
                    <td>
                      {{ passenger.contact }}
                    </td>
                  </tr>
                </table>
                <button
                  class="bg-red-400 p-1 rounded my-3"
                  @click="confirmCancelBooking(booking)"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="confirmRouteDelete()"
          >
            Delete Route
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="deleteRouteModal = false"
          >
            Cancel
          </button>
        </div>
      </vue-final-modal>

      <!-- CONFLICTING BOOKINGS MODAL -->

      <vue-final-modal
        v-model="conflictingBookingsModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen text-gray-700"
      >
        <div class="modal__content text-center mt-1 flex flex-col" style="width:40vw">
          <p class="text-red-400 my-2">These Bookings will be affected</p>

          <div class="flex flex-col gap-2  overflow-y-scroll " style="height:40vh">
            <div
              v-for="booking in conflictingBookings"
              :key="booking"
              class="bg-gray-600 rounded text-gray-200"
            >
              <p>Booking ID: {{ booking.id }}</p>
              <p v-if="!booking.subRouteId">
                {{ selectedRoutepath.origin.name }} -
                {{ selectedRoutepath.destination.name }}
              </p>
              <p v-else>
                <span class="font-bold">SubRoute</span> <br />
                {{ booking.subroute.routepath?.origin.name }} -
                {{ booking.subroute.routepath?.destination.name }}
              </p>
              <p>
                Departure Date : {{ parseDepartureDate(booking.scheduleDate) }}
              </p>
              <p>Departure Time : {{ selectedRoute.departureTime }}</p>
              <div>
                <table class="table-auto w-full">
                  <tr>
                    <td>Seat No</td>
                    <td>Name</td>
                    <td>Contact</td>
                  </tr>
                  <tr v-for="passenger in booking.passengers" :key="passenger">
                    <td>
                      {{ passenger.seatNumber }}
                    </td>
                    <td>
                      {{ passenger.name }}
                    </td>
                    <td>
                      {{ passenger.contact }}
                    </td>
                  </tr>
                </table>
                <button
                  class="bg-red-400 p-1 rounded my-3"
                  @click="confirmCancelBooking(booking)"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>

          <div class="my-2 flex justify-center gap-4">
            <div>
              <button
                class="bg-gray-600 text-gray-100 mb-4 py-1 px-2 rounded-md"
                @click="conflictingBookingsModal = false"
              >
                Go back
              </button>
              
            </div>
            <div>
              <button @click="editRouteAnyway()"
               class="bg-red-500 text-red-100 mb-4 py-1 px-2 rounded-md"
              >
                Edit Route anyways
              </button>
            </div>
          </div>
        </div>
      </vue-final-modal>

      <!-- SUBROUTES MODAL -->

      <vue-final-modal
        v-model="addSubRoutesModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div
          class="
            modal__content
            text-center
            mt-1
            flex flex-col
            overflow-visible
            text-gray-800
          "
        >
          <h3 class="text-xl mb-5">Add Sub Route for</h3>

          <p>
            {{ selectedRoutepath.origin?.name }} -
            {{ selectedRoutepath.destination?.name }}
          </p>

          <p>
            {{ week[selectedRoute.day - 1] }}
          </p>
          <label class="text-sm text-left text-gray-400 italic"
            >Select Route Path</label
          >
          <select
            v-model="newSubRoute.routepathId"
            class="text-xl bg-white text-blue-900 p-2"
          >
            <option
              v-for="routepath in routepaths"
              :value="routepath.id"
              :key="routepath"
              class="bg-white"
            >
              {{ routepath.origin.name }} -{{ routepath.destination.name }}
            </option>
          </select>

          <label class="text-sm text-left text-gray-400 italic mb-1 mt-3"
            >Departure time</label
          >

          <div class="flex justify-center">
            <div class="flex">
              <select
                name="hours"
                v-model="newSubRouteDepartureTime[0]"
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
              <span class="text-xl mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent text-xl appearance-none outline-none mr-4"
                v-model="newSubRouteDepartureTime[1]"
              >
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="30">45</option>
              </select>
              <select
                name="ampm"
                v-model="newSubRouteDepartureTime[2]"
                class="bg-transparent text-xl appearance-none outline-none"
              >
                <option value="AM" selected>AM</option>
                <option value="PM">PM</option>
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
              focus:outline-none focus:shadow-outline
            "
          >
            <p class="text-gray-700 mr-1 py-2 px-3">Nu.</p>
            <input
              class="w-full py-2 px-3"
              type="number"
              placeholder="Fare"
              v-model="newSubRoute.fare"
            />
          </div>
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="addSubRoute()"
          >
            Add SubRoute
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="addSubRoutesModal = false"
          >
            Cancel
          </button>
        </div>
      </vue-final-modal>

      <!-- Edit SUBROUTE Modal -->
      <vue-final-modal
        v-model="editSubRouteModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen"
      >
        <div
          class="modal__content text-center mt-1 flex flex-col overflow-visible"
        >
          <h3 class="text-xl mb-5">Edit SubRoute?</h3>

          <p class="text-xl font-thin">
            {{ selectedSubRoute.routepath?.origin?.name }} -
            {{ selectedSubRoute.routepath?.destination?.name }}
          </p>

          <div class="flex justify-center text-xl items-center gap-2 my-1">
            Sub Route Status :
            <div
              :class="
                selectedSubRoute.isActive
                  ? 'bg-green-400 text-green-50 p-1 rounded'
                  : 'bg-red-400 text-red-50 p-1 rounded'
              "
            >
              <select
                name="hours"
                v-model="selectedSubRoute.isActive"
                class="bg-transparent outline-none"
              >
                <option value="1">Active</option>
                <option value="0">Suspended</option>
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
              focus:outline-none focus:shadow-outline
            "
          >
            <p class="text-gray-700 mr-1 py-2 px-3">Nu.</p>
            <input
              class="w-full py-2 px-3"
              type="number"
              placeholder="Fare"
              v-model="selectedSubRoute.fare"
            />
          </div>

          <label class="text-sm text-left text-gray-400 italic mb-1 mt-3"
            >Departure time</label
          >
          <div class="flex justify-center">
            <div class="flex">
              <select
                name="hours"
                v-model="selectedSubRouteDepartureTime[0]"
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
              <span class="text-xl mr-3">:</span>
              <select
                name="minutes"
                class="bg-transparent text-xl appearance-none outline-none mr-4"
                v-model="selectedSubRouteDepartureTime[1]"
              >
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="30">45</option>
              </select>
              <select
                name="ampm"
                class="bg-transparent text-xl appearance-none outline-none"
                v-model="selectedSubRouteDepartureTime[2]"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="confirmEditSubRoute()"
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

      <!-- Delete Route Modal -->
      <vue-final-modal
        v-model="deleteSubrouteModal"
        classes="modal-container"
        content-class="modal-content"
        class="w-max-screen text-gray-700"
      >
        <div class="modal__content text-center mt-1 flex flex-col">
          <h3 class="text-xl mb-2">Delete SubRoute?</h3>
        </div>

        <div class="modal__action">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="confirmSubRouteDelete()"
          >
            Delete Sub Route
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="deleteSubrouteModal = false"
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
  deleteRoute,
  getAllRoutePaths,
  createNewRoutePath,
  editRoute,
  findAllRoutesByRoutepath,
} from "../../services/routeServices";
import { getStaffs } from "../../services/authServices";
import {
  getPendingBookingsByRouteId,
  cancelBooking,
} from "../../services/bookingServices";

import{
    convert12hrsTo24hrsNumeric 
} from "../../services/sharedFunctions"
import {
  addNewSubRoute,
  editSubRoute,
  deleteSubRoute,
} from "../../services/subRoutesService";
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
      addRoutePathModal: false,
      deleteRouteModal: false,
      timezone: "",
      newRoutePath: {},
      routepaths: [],
      weekDays: [
        { value: 1, label: "Sunday" },
        { value: 2, label: "Monday" },
        { value: 3, label: "Tuesday" },
        { value: 4, label: "Wednesday" },
        { value: 5, label: "Thrusday" },
        { value: 6, label: "Friday" },
        { value: 7, label: "Saturday" },
      ],
      week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      weekdaysSelected: [],
      eta: {
        hrs: "0",
        min: "0",
      },
      departureTime: {
        hrs: "0",
        mins: "0",
        ampm: "am",
      },
      stops: [],
      routes: [],
      staffs: [],
      newStop: {},
      selectedStop: {},
      selectedUserID: null,
      newRoute: {},
      selectedRoute: {},
      selectedRoutepath: {},
      pendingBookings: [],
      selectedDepartureTimeArr: [],
      newDepartureTimeArr: ["07", "30", "AM"],
      newSubRouteDepartureTime: ["07", "30", "AM"],
      conflictingBookings: [],
      conflictingBookingsModal: false,
      addSubRoutesModal: false,
      newSubRoute: {},
      selectedSubRoute: {},
      editSubRouteModal: false,
      selectedSubRouteDepartureTime: ["06", "30", "PM"],
      deleteSubrouteModal: false,
      schedules: [],
    };
  },
  created() {
    this.fetchRouteData();
    this.fetchStopData();
    getStaffs().then((res) => {
      this.staffs = res.data;
    });
    console.log("\n converting 7 am to 24 hrs")
    console.log(convert12hrsTo24hrsNumeric("07:00:AM"))
     console.log("\n converting 5:30 pm to 24 hrs")
     console.log(convert12hrsTo24hrsNumeric("05:30:PM"))
  },

  methods: {
    fetchRouteData() {
      getAllRoutePaths().then((res) => {
        this.routepaths = res.data;
        this.routepaths.forEach((routepath) => {
          routepath.routes.forEach((route) => {
            this.routes.push(route);
          });
        });
      });
    },

    fetchStopData() {
      getAllStops()
        .then((res) => {
          this.stops = res.data;
        })
        .catch((err) => console.log(err));
    },

    searchIfRoutepathExists(originId, destinationId) {
      var matched = false;
      this.routepaths.forEach((routepath) => {
        if (
          originId === routepath.originId &&
          destinationId === routepath.destinationId
        ) {
          matched = true;
        }
      });
      return matched;
    },

    showDeleteRouteModal(route) {
      this.selectedRoute = route;
      getPendingBookingsByRouteId(route.id).then((res) => {
        this.pendingBookings = res.data;
        this.deleteRouteModal = true;
      });
    },
    confirmRouteDelete() {
      deleteRoute(this.selectedRoute.id).then((res) => {
        if (res.status === 200) {
          this.loadSchedules(this.selectedRoutepath);
          this.deleteRouteModal = false;
        } else {
          this.$toast.show("Cannot Delete", {
            position: "top",
            type: "error",
          });
        }
      });
    },
    confirmCancelBooking(booking) {
      let cancelBookingObject = {
        bookingId: booking.id,
        scheduleHash: booking.scheduleHash,
        seats: [],
      };

      booking.passengers.forEach((passenger) => {
        cancelBookingObject.seats.push(passenger.seatNumber);
      });
      if (confirm("Are you sure you want to cancel?") == true) {
        cancelBooking(booking.id, cancelBookingObject).then((res) => {
          if (res.status === 200) {
            getPendingBookingsByRouteId(this.selectedRoute.id).then((res) => {
              this.pendingBookings = res.data;
              this.conflictingBookings = res.data;
            });
          } else {
            this.$toast.show("Network Error Try again");
          }
        });
      }
    },

    addRoutePath() {
      if (
        this.searchIfRoutepathExists(
          this.newRoutePath.originId,
          this.newRoutePath.destinationId
        )
      ) {
        this.$toast.show(
          "Route path already Exists! Please Use exisiting one",
          {
            type: "error",
            position: "top",
          }
        );
      } else {
        createNewRoutePath(this.newRoutePath).then((res) => {
          if (res.status === 201) {
            this.fetchRouteData();
            this.$toast.show("Added", {
              position: "top",
              type: "successs",
            });
            this.addRoutePathModal = false;
          } else {
            this.$toast.show("Network Error", {
              position: "top",
              type: "error",
            });
          }
        });
      }
    },

    parseDepartureDate(date) {
      let d = new Date(date);
      return d.toDateString();
    },
    addStop() {
      if (this.newStop.name) {
        addNewStop(this.newStop).then((res) => {
          if (res.status === 201) {
            this.fetchStopData();
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
      editStop(this.selectedStop.id, this.selectedStop).then((res) => {
        if (res.status === 200) {
          this.fetchStopData();
          this.fetchRouteData();
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
    },

    deleteStop(e) {
      deleteStop(e.id).then((res) => {
        if (res.status === 200) {
          this.fetchStopData();
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

    addRoute() {
      this.newRoute.days = this.weekdaysSelected;
      this.newRoute.departureTime =
        this.newDepartureTimeArr[0] +
        ":" +
        this.newDepartureTimeArr[1] +
        ":" +
        this.newDepartureTimeArr[2];

      this.newRoute.departure_time = convert12hrsTo24hrsNumeric(this.newRoute.departureTime);
      addNewRoute(this.newRoute).then((res) => {
        if (res.status === 201) {
          this.fetchRouteData();
          this.$toast.show("New Bus Route Added", {
            position: "top",
            type: "success",
          });
          this.addRoutesModal = false;
        } else {
          this.$toast.show("NetorkError", {
            position: "top",
            type: "error",
          });
        }
      });
    },

    editRoute(selectedRoute) {
      this.selectedRoute = selectedRoute;
      this.editRouteModal = true;
      this.selectedDepartureTimeArr = selectedRoute.departureTime.split(":");
    },

    confirmRouteEdit() {
      this.selectedRoute.departureTime =
        this.selectedDepartureTimeArr[0] +
        ":" +
        this.selectedDepartureTimeArr[1] +
        ":" +
        this.selectedDepartureTimeArr[2];
      this.selectedRoute.departure_time = convert12hrsTo24hrsNumeric(this.selectedDepartureTimeArr);
      getPendingBookingsByRouteId(this.selectedRoute.id).then((res) => {
        if (res.data.length === 0) {
          editRoute(this.selectedRoute.id, this.selectedRoute).then(
            (response) => {
              this.selectedRoute.subroutes.forEach((item) => {
                editSubRoute(item.id, {
                  isActive: this.selectedRoute.isActive,
                }).then((resp) => {
                  if (resp.status === 200) {
                    this.loadSchedules(this.selectedRoutepath);
                  }
                });
              });
              if (response.status === 200) {
                this.loadSchedules(this.selectedRoutepath);
                this.editRouteModal = false;
                this.$toast.show("Route updated", {
                  position: "top",
                  type: "success",
                });
              } else {
                this.$toast.show("Network Error", {
                  position: "error",
                  type: "success",
                });
              }
            }
          );


        } else {
          this.conflictingBookings = res.data;
          this.conflictingBookingsModal = true;
        }
      });
    },
    editRouteAnyway(){
      editRoute(this.selectedRoute.id, this.selectedRoute).then(
            (response) => {
              this.selectedRoute.subroutes.forEach((item) => {
                editSubRoute(item.id, {
                  isActive: this.selectedRoute.isActive,
                }).then((resp) => {
                  if (resp.status === 200) {
                    this.loadSchedules(this.selectedRoutepath);
                  }
                });
              });
              if (response.status === 200) {
                this.loadSchedules(this.selectedRoutepath);
                this.editRouteModal = false;
                this.conflictingBookingsModal= false
                this.$toast.show("Route updated", {
                  position: "top",
                  type: "success",
                });
              } else {
                this.$toast.show("Network Error", {
                  position: "error",
                  type: "success",
                });
              }
            }
      )

    },

    createNewSubRoute(selectedRoute) {
      this.selectedRoute = selectedRoute;
      this.newSubRoute.day = selectedRoute.day;
      this.newSubRoute.parentRouteId = selectedRoute.id;
      this.newSubRoute.isActive = true;
      this.newSubRoute.isPremium = selectedRoute.isPremium;
      this.addSubRoutesModal = true;
    },
    addSubRoute() {
      this.newSubRoute.departureTime =
        this.newSubRouteDepartureTime[0] +
        ":" +
        this.newSubRouteDepartureTime[1] +
        ":" +
        this.newSubRouteDepartureTime[2];

      this.newSubRoute.departure_time = convert12hrsTo24hrsNumeric(this.newSubRoute.departureTime)
      addNewSubRoute(this.newSubRoute).then((res) => {
        if (res.status === 201) {
          this.loadSchedules(this.selectedRoutepath);
          this.addSubRoutesModal = false;
        }
      });
    },
    editSubRoute(subroute) {
      this.selectedSubRoute = subroute;
      this.selectedSubRouteDepartureTime = subroute.departureTime.split(":");
      this.editSubRouteModal = true;
    },
    confirmEditSubRoute() {
      this.selectedSubRoute.departureTime =
        this.selectedSubRouteDepartureTime[0] +
        ":" +
        this.selectedSubRouteDepartureTime[1] +
        ":" +
        this.selectedSubRouteDepartureTime[2];

      editSubRoute(this.selectedSubRoute.id, this.selectedSubRoute).then(
        (res) => {
          if (res.status === 200) {
            this.fetchRouteData();
            this.editSubRouteModal = false;
          }
        }
      );
    },
    deleteSubRoute(subroute) {
      this.selectedSubRoute = subroute;
      this.deleteSubrouteModal = true;
    },
    confirmSubRouteDelete() {
      deleteSubRoute(this.selectedSubRoute.id).then((res) => {
        if (res.status === 200) {
          console.log("REFERSHING DATA", this.selectedRoutepath);
          this.loadSchedules(this.selectedRoutepath);
          this.deleteSubrouteModal = false;
        }
      });
    },

    loadSchedules(routepath) {
      this.selectedRoutepath = routepath;
      console.log("SELECTION", this.selectedRoutepath);
      findAllRoutesByRoutepath(routepath.id).then((res) => {
        console.log(res.data);
        this.schedules = res.data;
      });
    },
  },
};
</script>