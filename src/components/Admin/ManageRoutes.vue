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
                Focal Staff
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
              <td class="px-6 py-4 whitespace-nowrap">{{ stop.user?.name }}</td>
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
                <!-- <button @click="deleteStop(stop)" class="flex items-center">
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
                </button>-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <div class="flex gap-2">
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
              Routes
            </td>
            <!-- <td
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
            </td>-->
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="routepath in routepaths" :key="routepath.id" class="mt-2">
            <td class="text-md px-6 py-4 whitespace-nowrap">
              {{ routepath.origin.name }}
            </td>
            <td class="text-md px-6 py-4 whitespace-nowrap">
              {{ routepath.destination.name }}
            </td>
            <td class="px-6 whitespace-nowrap">
              <!-- <table class="w-full table-auto divide-y divide-gray-200">
                <tr class="bg-gray-50">
                  <td class="px-3 py-1 text-left font-medium text-gray-500">
                    Status
                  </td>
                  <td class="px-3 py-1 text-left font-medium text-gray-500">
                    Day
                  </td>
                  <td class="px-3 py-1 text-left font-medium text-gray-500">
                    departureTime
                  </td>
                  <td class="px-3 py-1 text-left font-medium text-gray-500">
                    Fare
                  </td>
                  <td
                    class="
                      px-3
                      py-1
                      text-left text-xs
                      font-medium
                      text-gray-500
                    "
                  >
                    Action
                  </td>
                </tr>
                <tr
                  v-for="route in routepath.routes"
                  :key="route"
                  class="text-gray-500"
                >
                  <td class="px-2 py-1">
                    <div
                      v-if="route.isActive"
                      class="text-center p-1 bg-green-400 text-green-50 rounded"
                    >
                      Active
                    </div>
                    <div
                      v-else
                      class="text-center bg-red-400 text-red-50 p-1 rounded"
                    >
                      Suspended
                    </div>
                  </td>
                  <td class="text-center px-2">{{ week[route.day - 1] }}</td>
                  <td class="px-2">{{ route.departureTime }}</td>
                  <td class="text-center px-2">Nu.{{ route.fare }}</td>
                  <td class="px-2">
                    <div class="flex gap-2">
                      <button @click="createNewSubRoute(routepath, route)">
                        Add Sub Route
                      </button>
                      <div
                        @click="editRoute(routepath, route)"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </div>
                      <div
                        @click="showDeleteRouteModal(route, routepath)"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </div>
                    </div>
                  </td>

                  <td>
                    <table>
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
                          Routes
                        </td>
                      </tr>
                      <tr v-for="subroute in route.subroutes" :key="subroute">
                        <td>
                          {{ week[subroute.day - 1] }}
                        </td>
                        <td>
                          {{ subroute.fare }}
                        </td>
                        <td>
                          {{ subroute.departureTime }}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table> -->

              <div class="flex flex-wrap gap-2 w-full my-2">
                <div
                  v-for="route in routepath.routes"
                  :key="route"
                  class="flex justify-between"
                >
                  <div
                    :class="
                      route.isActive
                        ? ' p-4 rounded bg-gray-100'
                        : 'p-4 rounded bg-red-100'
                    "
                  >
                    <div class="flex flex-col flex-wrap">
                      <p class="text-xl font-bold">
                        {{ week[route.day - 1] }}
                      </p>
                      <p v-if="!route.isActive" class="font-bold text-red-600">
                        Route Suspended
                      </p>

                      <div>Departure Time: {{ route.departureTime }}</div>
                      <div>Fare: Nu {{ route.fare }}</div>
                      <div class="flex gap-2 my-1 bg-gray-200 justify-around">
                        <button
                          @click="createNewSubRoute(routepath, route)"
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
                        <div
                          @click="editRoute(routepath, route)"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </div>
                        <div
                          @click="showDeleteRouteModal(route, routepath)"
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
                    </div>
                    <div
                      v-if="!route.subroutes || !route.subroutes.length"
                    ></div>

                    <div v-else>
                      <p class="font-semibold mt-3">Sub Route</p>
                      <p class="text-xs">
                        (Sub Routes will Share the same bus as the Main route)
                      </p>
                      <table class="table-auto">
                        <tr class="bg-gray-200 p-1">
                          <td class="px-2">Origin</td>
                          <td class="px-2">Destination</td>
                          <td class="px-2">Fare</td>
                          <td class="px-2">Departure Time</td>
                          <td class="px-2">Action</td>
                        </tr>
                        <tr
                          v-for="subroute in route.subroutes"
                          :key="subroute"
                          class="p-1"
                        >
                          <td class="px-2">
                            {{ subroute.routepath.origin.name }}
                          </td>
                          <td class="px-2">
                            {{ subroute.routepath.destination.name }}
                          </td>
                          <td class="px-2">Nu {{ subroute.fare }}</td>
                          <td class="px-2">
                            {{ subroute.departureTime }}
                          </td>
                          <td class="px-3 flex gap-2 items-center">
                            <div
                              @click="editSubRoute(subroute)"
                              class="
                                flex
                                items-center
                                rounded-full
                                bg-gray-800
                                text-gray-300
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
                            </div>
                            <div
                              @click="deleteSubRoute(subroute)"
                              class="
                                flex
                                items-center
                                rounded-full
                                bg-gray-800
                                text-gray-300
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
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
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

          <label class="text-sm text-left text-gray-400 italic mb-1 mt-3"
            >Departure time</label
          >
          <div class="flex justify-center">
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
                <option value="11">10</option>
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
        <div class="modal__content text-center mt-1 flex flex-col">
          <h3 class="text-xl mb-2">Delete Route?</h3>
          <p class="text-red-500 my-2" v-if="pendingBookings.length !== 0">
            Please resolve these pending Bookings before deleting the route
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

        <div class="modal__action" v-if="pendingBookings.length === 0">
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
        <div class="modal__content text-center mt-1 flex flex-col">
          <p class="text-red-400 my-2">
            Please resolve these pending Bookings before Editing the Route
          </p>
          <div>
            <button
              class="bg-gray-600 text-gray-100 mb-4 p-1 rounded-md"
              @click="conflictingBookingsModal = false"
            >
              Go back
            </button>
          </div>

          <div class="flex flex-col gap-2 overflow-x-scroll">
            <div
              v-for="booking in conflictingBookings"
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
            {{ week[selectedRoute.day] }}
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
            Delete Route
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
} from "../../services/routeServices";
import { getStaffs } from "../../services/authServices";
import {
  getPendingBookingsByRouteId,
  cancelBooking,
} from "../../services/bookingServices";

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
    };
  },
  created() {
    this.fetchRouteData();
    this.fetchStopData();
    getStaffs().then((res) => {
      this.staffs = res.data;
    });
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
          this.stops = res;
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

    showDeleteRouteModal(route, routepath) {
      this.selectedRoute = route;
      this.selectedRoutepath = routepath;
      getPendingBookingsByRouteId(route.id).then((res) => {
        this.pendingBookings = res.data;
        this.deleteRouteModal = true;
      });
    },
    confirmRouteDelete() {
      deleteRoute(this.selectedRoute.id).then((res) => {
        if (res.status === 200) {
          this.fetchRouteData();
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

    editRoute(selectedRoutepath, selectedRoute) {
      this.selectedRoutepath = selectedRoutepath;
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

      console.log("EDITING THIS ROUTE", this.selectedRoute);

      getPendingBookingsByRouteId(this.selectedRoute.id).then((res) => {
        if (this.selectedRoute.subroutes.length) {
          if (this.selectedRoute.isActive) {
            this.selectedRoute.subroutes.forEach((item) => {
              editSubRoute(item.id, {
                isActive: 0,
              }).then((res) => {
                if (res.status === 200) {
                  this.fetchRouteData();
                }
              });
            });
          } else {
            this.selectedRoute.subroutes.forEach((item) => {
              editSubRoute(item.id, {
                isActive: 0,
              }).then((res) => {
                if (res.status === 200) {
                  this.fetchRouteData();
                }
              });
            });
          }
        }

        if (res.data.length === 0) {
          editRoute(this.selectedRoute.id, this.selectedRoute).then((res) => {
            if (res.status === 200) {
              this.fetchRouteData();
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
          });
        } else {
          this.conflictingBookings = res.data;
          this.conflictingBookingsModal = true;
        }
      });
    },
    createNewSubRoute(selectedRoutepath, selectedRoute) {
      this.selectedRoutepath = selectedRoutepath;
      this.selectedRoute = selectedRoute;
      this.newSubRoute.day = selectedRoute.day;
      this.newSubRoute.parentRouteId = selectedRoute.id;
      this.newSubRoute.isActive = true;
      console.log(this.selectedRoute);
      this.addSubRoutesModal = true;
    },
    addSubRoute() {
      console.log("CREATING NEW SUB ROUTE", this.newSubRoute);
      this.newSubRoute.departureTime = "07:30:AM";
      this.newSubRoute.departureTime =
        this.newSubRouteDepartureTime[0] +
        ":" +
        this.newSubRouteDepartureTime[1] +
        ":" +
        this.newSubRouteDepartureTime[2];

      addNewSubRoute(this.newSubRoute).then((res) => {
        if (res.status === 201) {
          this.fetchRouteData();
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
          this.fetchRouteData();
          this.deleteSubrouteModal = false;
        }
      });
    },
  },
};
</script>