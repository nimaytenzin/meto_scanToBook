<template>
  <div class="flex flex-col w-full">
    <div class="my-1  flex gap-1 text-sm mt-2">
      <div>
        <router-link
          to="/finance/"
          class="hover:bg-gray-200 px-2"
        >
          Home
        </router-link>
        <button
          class="hover:bg-gray-200 px-2"
          v-if="challanStatus.status !== 'VERIFIED'"
          @click="openMarkVerifiedModal"
        >
          Mark as Verified
        </button>
        <button class="hover:bg-gray-200 px-2" @click="downloadExcel">
          Download excel
        </button>

        <button
          class="hover:bg-gray-200 px-2"
          v-if="challanStatus.status === 'CREATED'"
          @click="refreshChallanData"
        >
          Refresh Data
        </button>
      </div>
    </div>
    <div class="w-full mx-auto bg-white overflow-x-scroll">
      <div id="header" class="px-8 py-6 bg-metoPrimary-800 text-gray-100">
        <div class="flex justify-start items-end">
          <div class="flex gap-4 items-center">
            <div class="bg-gray-100 w-16 h-16 rounded-full">
              <img src="/meto.png" class="w-20" alt="" />
            </div>
            <div>
              <h1 class="text-lg">༅༅། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།</h1>
              <h1 class="text-lg">Meto Transport Service</h1>
              <p class="text-xs">
                Ensuring Safety, Reliability and Comfort till your Destination
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-end mt-4">
          <h2 @click="selectDateModal = true">
            Accounts for {{ new Date(date).toDateString() }}
          </h2>

          <div>
            <p>www.metotransport.com</p>
            <p>Date: {{ new Date().toDateString() }}</p>
          </div>
        </div>
        <div class="-mt-10">
          <h1 class="text-center text-3xl font-bold">MTS e-Accounts</h1>
        </div>
      </div>

      <div id="table" class="overflow-x-scroll">
        <div>
          <table class="table-auto w-full" id="example">
            <thead class="text-xs text-gray-100 bg-metoPrimary-500">
              <tr>
                <th class="whitespace-nowrap"></th>
                <th class="whitespace-nowrap" style="min-width: 70px">
                  <div class="font-semibold text-left">Bus</div>
                </th>

                <th class="whitespace-nowrap" style="min-width: 120px">
                  <div class="font-semibold text-left">From</div>
                </th>

                <th>
                  <table class="w-full" id="example">
                    <thead
                      class="text-xs text-gray-100 bg-metoPrimary-500"
                      style="width: 600px"
                    >
                      <th class="whitespace-nowrap" style="min-width: 120px">
                        <div class="font-semibold text-left">To</div>
                      </th>
                      <th class="whitespace-nowrap">
                        <div class="font-semibold text-left">Departure</div>
                      </th>
                      <th class="whitespace-nowrap" style="min-width: 60px">
                        <div class="font-semibold text-left">Fare</div>
                      </th>

                      <th class="whitespace-nowrap" style="min-width: 60px">
                        <div class="font-semibold text-left">Counter</div>
                      </th>
                      <th class="whitespace-nowrap" style="min-width: 60px">
                        <div class="font-semibold text-left">Online</div>
                      </th>
                      <th class="whitespace-nowrap" style="min-width: 60px">
                        <div class="font-semibold text-left">Total</div>
                      </th>
                      <th class="whitespace-nowrap" style="min-width: 70px">
                        <div class="font-semibold text-left">
                          Ticket <br />
                          Sale
                        </div>
                      </th>
                      <th class="whitespace-nowrap" style="min-width: 70px">
                        <div class="font-semibold text-center">
                          Service <br />
                          Charge
                        </div>
                      </th>
                    </thead>
                  </table>
                </th>

                <th class="p-2 whitespace-nowrap" style="min-width: 70px">
                  <div class="font-semibold text-center">Goods</div>
                </th>
                <th class="whitespace-nowrap" style="min-width: 70px">
                  <div class="font-semibold text-center">Local</div>
                </th>
                <th class="whitespace-nowrap" style="min-width: 60px">
                  <div class="font-semibold text-center">HSD <br />L</div>
                </th>
                <th class="whitespace-nowrap" style="min-width: 60px">
                  <div class="font-semibold text-center">HSD <br />Rate</div>
                </th>
                <th class="whitespace-nowrap" style="min-width: 70px">
                  <div class="font-semibold text-center">HSD <br />Amount</div>
                </th>
                <th class="p whitespace-nowrap" style="min-width: 70px">
                  <div class="font-semibold text-center">Expenses</div>
                </th>
                <th class="whitespace-nowrap" style="min-width: 70px">
                  <div class="font-semibold text-left">Net</div>
                </th>
                <th class="whitespace-nowrap" style="min-width: 120px">
                  <div class="font-semibold text-left">Remarks</div>
                </th>
              </tr>
            </thead>

            <tbody
              class="text-sm divide-y space-y-2 divide-gray-100"
              v-if="challans.length"
            >
              <tr v-for="challan in challans" :key="challan">
                <td class="p-2 whitespace-nowrap">
                  <div class="flex flex-col gap-2 item-center justify-center">
                    <div
                      class="
                        w-4
                        mr-2
                        transform
                        cursor-pointer
                        hover:text-purple-500 hover:scale-110
                      "
                      @click="openViewDetailsModal(challan)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div
                      class="
                        w-4
                        mr-2
                        transform
                        cursor-pointer
                        hover:text-purple-500 hover:scale-110
                      "
                      @click="openEditChallanModal(challan)"
                      v-if="challanStatus.status === 'CREATED'"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
                <td class="p-2 whitespace-nowrap" style="min-width: 70px">
                  <div class="flex justify-start items-start">
                    <div class="break-all text-gray-800" v-if="challan.busId">
                      {{ challan.bus.vechileNumber }}
                    </div>
                    <div v-else>NA</div>
                  </div>
                </td>

                <td class="p-2" style="min-width: 120px">
                  <div class="text-left flex justify-start items-start">
                    {{ challan.from }}
                  </div>
                </td>

                <td style="width: 720px" class="">
                  <table class="w-full" id="example">
                    <tbody class="text-sm divide-y divide-gray-100">
                      <tr
                        v-for="item in challan.challanItems"
                        :key="item"
                        style="width: 600px"
                      >
                        <td
                          class="p-2 whitespace-nowrap"
                          style="min-width: 120px"
                        >
                          <div class="text-left">
                            {{ item.to }}
                          </div>
                        </td>
                        <td class="p-2">
                          <div class="text-left">
                            {{ challan.departureTime }}
                          </div>
                        </td>
                        <td
                          class="p-2 whitespace-nowrap"
                          style="min-width: 60px"
                        >
                          <div class="text-left">
                            {{ item.fare }}
                          </div>
                        </td>

                        <td
                          class="p-2 whitespace-nowrap"
                          style="min-width: 60px"
                        >
                          <div class="text-left">
                            {{ item.counterPassengers }}
                          </div>
                        </td>
                        <td
                          class="p-2 whitespace-nowrap"
                          style="min-width: 60px"
                        >
                          <div class="text-left">
                            {{ item.onlinePassengers }}
                          </div>
                        </td>

                        <td
                          class="p-2 whitespace-nowrap"
                          style="min-width: 60px"
                        >
                          <div class="text-left">
                            {{ item.passengers }}
                          </div>
                        </td>
                        <td
                          class="p-2 whitespace-nowrap"
                          style="min-width: 70px"
                        >
                          <div class="text-left">
                            {{ item.ticketSale.toLocaleString("en-us") }}
                          </div>
                        </td>
                        <td
                          class="p-2 whitespace-nowrap"
                          style="min-width: 70px"
                        >
                          <div class="text-center">
                            {{ item.serviceCharge.toLocaleString("en-us") }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>

                <td class="p-2 whitespace-nowrap" style="min-width: 70px">
                  <div class="text-center">
                    {{ challan.goods.toLocaleString("en-us") }}
                  </div>
                </td>

                <td class="p-2 whitespace-nowrap" style="min-width: 70px">
                  <div class="text-center">
                    {{ challan.local.toLocaleString("en-us") }}
                  </div>
                </td>
                <td class="p-2 whitespace-nowrap" style="min-width: 70px">
                  <div class="text-center">
                    {{ challan.hsdLitre }}
                  </div>
                </td>
                <td class="p-2 whitespace-nowrap" style="min-width: 60px">
                  <div class="text-center">
                    {{ challan.hsdRate }}
                  </div>
                </td>
                <td class="p-2 whitespace-nowrap" style="min-width: 70px">
                  <div class="text-center">
                    {{ challan.hsdAmount.toLocaleString("en-us") }}
                  </div>
                </td>
                <td class="p-2 whitespace-nowrap" style="min-width: 70px">
                  <div class="text-center">
                    {{ challan.expenses.toLocaleString("en-us") }}
                  </div>
                </td>
                <td class="p-2 whitespace-nowrap" style="min-width: 70px">
                  <div class="text-md text-gray-800 font-semibold text-left">
                    {{ challan.netTotal.toLocaleString("en-us") }}
                  </div>
                </td>
                <td class="p-2" style="min-width: 120px">
                  <div class="text-xs text-left break-words">
                    {{ challan.remarks }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="!challans.length" class="flex w-full justify-center">
            <div class="flex flex-col items-center p-4 my-6">
              <img class="w-32" src="../../assets/emptystate.png" alt="" />
              <p class="text-center">
                No Bookings for <br />
                {{ new Date(dateSelected).toDateString() }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-4">
        <div
          v-if="challans.length && challanStatus.status === 'VERIFIED'"
          class="p-12"
        >
          <p class="flex gap-2 font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.2"
              stroke="currentColor"
              class="w-6 h-6 text-green-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>

            Accounts Verified
          </p>

          <img src="/signature.png" class="w-40" alt="" />
          <p>Tshering Lhaden</p>
          <p class="text-xs">Finance</p>
          <p class="text-xs">20/09/2022</p>

          <p class="mt-1 text-xs" v-if="challanStatus.remarks">
            Remarks: {{ challanStatus.remarks }}
          </p>
        </div>
        <div v-else></div>

        <div v-if="challans.length" class="p-12">
          <p class="text-lg">
            Net Income:
            <span class="font-bold"
              >Nu.{{ cumulativeStats.netTotal.toLocaleString("en-us") }}</span
            >
          </p>
          <p>
            Total Service Charge: Nu.{{
              cumulativeStats.totalServiceCharge.toLocaleString("en-us")
            }}
          </p>
          <p>
            Total Passengers:
            {{ cumulativeStats.totalPassengers.toLocaleString("en-us") }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <vue-final-modal
    v-model="editChallanModal"
    classes="modal-container"
    content-class="modal-content"
    class="w-max-screen"
  >
    <div class="max-w-3xl">
      <p class="text-lg text-center font-semibold mb-2 text-metoPrimary-700">
        Challan for {{ selectedChallan.from }} -
        {{
          selectedChallan.challanItems ? selectedChallan.challanItems[0].to : ""
        }}
        {{ new Date(selectedChallan.date).toDateString() }}
        {{ selectedChallan.departureTime }} Bus
      </p>

      <div>
        <div class="space-y-4">
          <!-- Card Number -->
          <div class="flex w-full text-metoPrimary-600">
            <div class="w-1/3 flex items-center">
              <hr class="w-full" />
            </div>
            <div class="w-1/3 text-center">Income</div>
            <div class="w-1/3 flex items-center">
              <hr class="w-full" />
            </div>
          </div>
          <div>
            <label class="block text-sm text-gray-800" for="card-nr"
              >TicketSale <small>(Nu)</small></label
            >
            <div
              id="card-nr"
              class="
                text-sm text-gray-800
                bg-white
                border
                rounded
                leading-5
                p-2
                px-3
                border-gray-200
                hover:border-gray-300
                focus:border-indigo-300
                shadow-sm
                placeholder-gray-400
                focus:ring-0
                w-full
                cursor-not-allowed
              "
            >
              {{ selectedChallan.totalTicketSale }}
            </div>
          </div>
          <div>
            <label class="block text-sm text-gray-800" for="card-nr"
              >Local <small>(Nu)</small></label
            >
            <input
              id="card-nr"
              class="
                text-sm text-gray-800
                bg-white
                border
                rounded
                leading-5
                p-2
                px-3
                border-gray-200
                hover:border-gray-300
                focus:border-indigo-300
                shadow-sm
                placeholder-gray-400
                focus:ring-0
                w-full
              "
              min="0"
              type="number"
              v-model="selectedChallan.local"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-800" for="card-nr"
              >Goods <small>(Nu)</small></label
            >
            <input
              id="card-nr"
              class="
                text-sm text-gray-800
                bg-white
                border
                rounded
                leading-5
                p-2
                px-3
                border-gray-200
                hover:border-gray-300
                focus:border-indigo-300
                shadow-sm
                placeholder-gray-400
                focus:ring-0
                w-full
              "
              min="0"
              type="number"
              v-model="selectedChallan.goods"
            />
          </div>

          <div class="flex w-full mt-2 text-metoPrimary-600">
            <div class="w-1/3 flex items-center">
              <hr class="w-full" />
            </div>
            <div class="w-1/3 text-center">Expenses</div>
            <div class="w-1/3 flex items-center">
              <hr class="w-full" />
            </div>
          </div>
          <div class="flex gap-2">
            <div class="w-1/3">
              <label class="block text-sm" for="card-nr"
                >HSD Litre <small>(L)</small></label
              >
              <input
                id="card-nr"
                class="
                  text-sm text-gray-800
                  bg-white
                  border
                  rounded
                  leading-5
                  p-2
                  px-3
                  border-gray-200
                  hover:border-gray-300
                  focus:border-indigo-300
                  shadow-sm
                  placeholder-gray-400
                  focus:ring-0
                  w-full
                "
                type="number"
                v-model="selectedChallan.hsdLitre"
              />
            </div>
            <div class="w-1/3">
              <label class="block text-sm text-gray-800" for="card-nr"
                >HSD Rate <small>(Nu)</small></label
              >
              <input
                id="card-nr"
                class="
                  text-sm text-gray-800
                  bg-white
                  border
                  rounded
                  leading-5
                  p-2
                  px-3
                  border-gray-200
                  hover:border-gray-300
                  focus:border-indigo-300
                  shadow-sm
                  placeholder-gray-400
                  focus:ring-0
                  w-full
                "
                type="number"
                v-model="selectedChallan.hsdRate"
              />
            </div>
            <div class="w-1/3">
              <label class="block text-sm text-gray-800" for="card-nr"
                >HSD Amount<small>(Nu)</small></label
              >
              <div
                id="card-nr"
                class="
                  text-sm text-gray-800
                  bg-white
                  border
                  rounded
                  leading-5
                  p-2
                  px-3
                  border-gray-200
                  hover:border-gray-300
                  focus:border-indigo-300
                  shadow-sm
                  placeholder-gray-400
                  focus:ring-0
                  w-full
                  cursor-not-allowed
                "
              >
                {{ selectedChallan.hsdLitre * selectedChallan.hsdRate }}
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm text-gray-800 mb-1" for="card-nr"
              >Misc Expenses <small>(Nu)</small></label
            >
            <input
              id="card-nr"
              class="
                text-sm text-gray-800
                bg-white
                border
                rounded
                leading-5
                p-2
                px-3
                border-gray-200
                hover:border-gray-300
                focus:border-indigo-300
                shadow-sm
                placeholder-gray-400
                focus:ring-0
                w-full
              "
              type="number"
              v-model="selectedChallan.expenses"
            />
          </div>

          <!-- //challand Ref and Bus -->
          <div class="flex w-full mt-2 text-metoPrimary-600">
            <div class="w-1/3 flex items-center">
              <hr class="w-full" />
            </div>
            <div class="w-1/3 text-center">Other Details</div>
            <div class="w-1/3 flex items-center">
              <hr class="w-full" />
            </div>
          </div>
          <div>
            <label class="block text-sm text-gray-800" for="card-nr"
              >Challan Ref#</label
            >
            <input
              id="card-nr"
              class="
                text-sm text-gray-800
                bg-white
                border
                rounded
                leading-5
                p-2
                px-3
                border-gray-200
                hover:border-gray-300
                focus:border-indigo-300
                shadow-sm
                placeholder-gray-400
                focus:ring-0
                w-full
              "
              type="number"
              v-model="selectedChallan.challanNo"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-800" for="card-email"
              >Bus No</label
            >
            <select
              id="card-email"
              class="
                text-sm text-gray-800
                bg-white
                border
                rounded
                leading-5
                p-2
                px-3
                border-gray-200
                hover:border-gray-300
                focus:border-indigo-300
                shadow-sm
                placeholder-gray-400
                focus:ring-0
                w-full
              "
              v-model="selectedChallan.busId"
            >
              <option v-for="bus in buses" :key="bus" :value="bus.id">
                {{ bus.vechileNumber }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm text-gray-800" for="card-nr"
              >Remarks</label
            >
            <textarea
              id="card-nr"
              class="
                text-sm text-gray-800
                bg-white
                border
                rounded
                leading-5
                p-2
                px-3
                border-gray-200
                hover:border-gray-300
                focus:border-indigo-300
                shadow-sm
                placeholder-gray-400
                focus:ring-0
                w-full
              "
              type="number"
              v-model="selectedChallan.remarks"
            ></textarea>
          </div>

          <div class="flex justify-end pt-2 text-metoPrimary-800">
            <div>
              <label class="block text-md font-medium" for="card-email"
                >Net Income</label
              >

              <p class="text-xl font-extrabold">
                Nu.
                {{
                  selectedChallan.totalTicketSale +
                  selectedChallan.local +
                  selectedChallan.goods -
                  selectedChallan.hsdLitre * selectedChallan.hsdRate -
                  selectedChallan.expenses
                }}
              </p>
            </div>
          </div>
        </div>
        <!-- Form footer -->
        <div class="flex justify-center mt-8">
          <button
            class="
              font-medium
              text-sm
              rounded-sm
              px-3
              p-2
              w-1/2
              bg-metoPrimary-700
              text-white
              focus:outline-none
              focus-visible:ring-2
            "
            @click="updateChallan"
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  </vue-final-modal>

  <vue-final-modal
    v-model="selectDateModal"
    classes="modal-container"
    class="w-max-screen"
  >
    <div class="max-w-3xl">
      <DatePicker
        v-model="date"
        @dayclick="onDayClick($event)"
        :attributes="attributes"
      />
    </div>
  </vue-final-modal>

  <vue-final-modal
    v-model="markVerifiedModal"
    classes="modal-container"
    content-class=""
    class=""
  >
    <div class="max-w-3xl bg-metoPrimary-700 p-6 text-gray-100 text-md">
      <p class="text-center">
        Are you sure? <br />
        It will be digital signed using your credential
      </p>

      <div class="my-6">
        <label class="block text-sm">Remarks</label>
        <textarea
          id="card-nr"
          class="
            text-sm text-gray-800
            bg-white
            border
            rounded
            leading-5
            p-2
            px-3
            border-gray-200
            hover:border-gray-300
            focus:border-indigo-300
            shadow-sm
            placeholder-gray-400
            focus:ring-0
            w-full
          "
          min="0"
          type="number"
          v-model="challanVerificationRemarks"
        ></textarea>
      </div>

      <div class="flex justify-center">
        <button
          @click="markChallanAsVerified"
          class="bg-green-400 px-4 py-2 rounded"
        >
          Mark as verified
        </button>
      </div>
    </div>
  </vue-final-modal>

  <vue-final-modal
    v-model="viewDetailsModal"
    classes="modal-container"
    content-class="modal-content"
    class="w-max-screen"
  >
    <div>
      <p class="text-lg text-center font-semibold mb-2 text-metoPrimary-700">
        ChallanDetails for {{ selectedChallan.from }} -
        {{
          selectedChallan.challanItems ? selectedChallan.challanItems[0].to : ""
        }}
        <br />
        {{ new Date(selectedChallan.date).toDateString() }}
        {{ selectedChallan.departureTime }} Bus
      </p>

      <table class="w-full table-auto divide-y">
        <thead>
          <tr class="text-xs text-gray-400 bg-gray-50">
            <td class="px-2">Booking ID</td>
            <td class="px-2">Mode</td>
            <td class="px-2">Seats</td>
            <td class="px-2">Fare (per seat)</td>
            <td class="px-2">Service Charge (per seat)</td>
            <td class="px-2">Amount</td>
          </tr>
        </thead>
        <tbody class="divide-y text-sm font-normal text-gray-700">
          <tr v-for="booking in bookings" :key="booking">
            <td class="px-4 flex items-start">
              {{ booking.id }}
            </td>
            <td class="px-2">
              <div v-if="booking.modality === 'ONLINE'">Online Booking</div>
              <div v-else class="text-sm">
                Counter Booking by {{ booking.user?.name }}
              </div>
            </td>
            <td class="px-2 w-1/6">
              <div class="flex flex-wrap items-start">
                {{ booking.passengers.length }}
              </div>
            </td>
            <td class="px-2">Nu.{{ booking.fare }}</td>
            <td class="px-2">
              <p v-if="booking.modality === 'ONLINE'">Nu.35</p>
              <p v-else>Nu.0</p>
            </td>
            <td class="px-2">Nu. {{ booking.amount }}</td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end text-metoPrimary-800 mt-6">
        <div>
          <label class="block text-md font-medium" for="card-email"
            >Net Income</label
          >

          <p class="text-xl font-extrabold">
            Nu.
            {{ selectedChallan.netTotal }}
          </p>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<style scoped>
.challan-header-container {
  background: #1f65a5;
}
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: scroll;
  min-width: 40vw;
  margin: 0 0rem;
  padding: 1rem 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.15rem;
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
import { Calendar, DatePicker } from "v-calendar";
import { getAllBuses } from "../../services/busServices";
import {
  createConsolidatedChallanByDate,
  getChallanStatusByDate,
  getConsolidatedChallanByDate,
  markChallanAsVerified,
  updateChallanData,
  updateConsolidateChallanByDate,
} from "../../services/challanServices";
import {
  getAllBookingsByScheduleHash,
  getSuccessfulbookingByscheduleHash,
} from "../../services/bookingServices";
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      //Modal toggle

      challans: [],
      selectedChallan: {},
      editChallanModal: false,
      selectDateModal: false,
      viewDetailsModal: false,
      markVerifiedModal: false,
      buses: [],
      dateSelected: null,
      attributes: [],
      date: "2022-09-18",
      createDateString: "",
      bookings: [],
      challanStatus: {},
      challanVerificationRemarks: "",
    };
  },

  created() {
    getConsolidatedChallanByDate(this.date).then((res) => {
      console.log(res.data);
      this.challans = res.data;
    });
    getChallanStatusByDate(this.date).then((res) => {
      if (res.data) {
        this.challanStatus = res.data;
      }
    });
    getAllBuses().then((res) => {
      this.buses = res.data;
    });
  },
  components: {
    Calendar,
    DatePicker,
  },
  computed: {
    cumulativeStats() {
      let total = 0;
      let serviceCharge = 0;
      let passengers = 0;
      this.challans.forEach((challan) => {
        total = Number(challan.netTotal) + total;
        serviceCharge = serviceCharge + challan.totalServiceCharge;
        passengers = passengers + challan.totalPassengers;
      });
      return {
        netTotal: total,
        totalServiceCharge: serviceCharge,
        totalPassengers: passengers,
      };
    },
    getUserDetails() {
      let token = sessionStorage.getItem("token");
      return VueJwtDecode.decode(token);
    },
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

    openEditChallanModal(challan) {
      this.selectedChallan = challan;
      this.editChallanModal = true;
    },
    createChallan() {
      console.log(this.createDateString);
      createConsolidatedChallanByDate({ date: this.createDateString }).then(
        (res) => {
          console.log(res);
        }
      );
    },
    updateChallan() {
      this.selectedChallan.netTotal = this.getChallanNetTotal(
        this.selectedChallan
      );
      this.selectedChallan.hsdAmount = this.getHsdAmonut(this.selectedChallan);

      updateChallanData(this.selectedChallan.id, this.selectedChallan).then(
        (res) => {
          console.log(res);
        }
      );
    },
    getChallanNetTotal(challan) {
      return (
        challan.totalTicketSale +
        challan.local +
        challan.goods -
        challan.hsdLitre * challan.hsdRate -
        challan.expenses
      );
    },
    getHsdAmonut(challan) {
      return challan.hsdLitre * challan.hsdRate;
    },
    onDayClick(event) {
      console.log(event.id);
      this.dateSelected = event.id;
      this.date = event.id;
      getConsolidatedChallanByDate(event.id).then((res) => {
        this.challans = res.data;
        this.$toast.show("Loaded challan for " + event.id, {
          position: "top",
        });
        getChallanStatusByDate(event.id).then((resp) => {
          if (resp.data) {
            this.challanStatus = resp.data;
          }
        });
        this.selectDateModal = false;
      });
    },

    downloadExcel() {
      console.log(this.challans);
      jsontoexcel.getXlsx(this.challans, "filename.csv");
    },
    openViewDetailsModal(challan) {
      this.selectedChallan = challan;
      getSuccessfulbookingByscheduleHash(
        this.selectedChallan.scheduleHash
      ).then((res) => {
        this.bookings = res.data;
        console.log(res.data);
        this.viewDetailsModal = true;
      });
    },
    openMarkVerifiedModal() {
      this.markVerifiedModal = true;
    },
    refreshChallanData() {
      console.log("REFRESHING FOR DATE", this.date);
      updateConsolidateChallanByDate({ date: this.date }).then((res) => {
        this.getChallanByDate(this.date);
      });
    },
    getChallanByDate(date) {
      getConsolidatedChallanByDate(date).then((res) => {
        this.challans = res.data;
        this.$toast.show("Loaded challan for " + date, {
          position: "top",
        });
        getChallanStatusByDate(date).then((resp) => {
          if (resp.data) {
            this.challanStatus = resp.data;
          }
        });
      });
    },
    markChallanAsVerified() {
      let data = {
        date: this.date,
        id: this.challanStatus.id,
        verifiedBy: this.getUserDetails.id,
        remarks: this.challanVerificationRemarks,
      };
      console.log(data);
      markChallanAsVerified(data).then((res) => {
        getChallanStatusByDate(this.date).then((resp) => {
          if (resp.data) {
            this.challanStatus = resp.data;
            this.markVerifiedModal = false;
          }
        });
      });
    },
  },
};
</script>