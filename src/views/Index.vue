<template>
  <div>
    <navbar-component></navbar-component>
    <main class="z-0">
      <div
        class="relative z-1 flex justify-center items-center"
        id="heroSection"
      >
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover z-0"
          :style="{
            'background-image': 'url(' + require('../assets/bg.jpeg') + ')',
          }"
        >
          <span
            id="blackOverlay"
            class="
              w-full
              h-full
              absolute
              bg-gradient-to-r
              from-black
              via-metoPrimary-900
              to-transparent
              opacity-80
            "
          ></span>
          <span
            id="blackOverlay"
            class="
              w-full
              h-full
              absolute
              bg-gradient-to-l
              from-metoPrimary-900
              via-transparent
              to-transparent
              opacity-70
            "
          ></span>
        </div>

        <div
          class="
            w-11/12
            lg:w-10/12
            xl:w-8/12
            2xl:w-1/2
            z-50
            flex
            justify-start
            overflow-scroll
            text-gray-200
          "
        >
          <div class="w-full md:w-1/2 flex-col">
            <h1 class="font-semibold text-xl md:text-5xl">
              Your Journey starts with us.
            </h1>
            <div class="flex flex-col text-sm mt-4">
              <div class="flex text-sm md:text-xl gap-2 items-center">
                Ensuring Safety, Reliability and Comfort till your Destination
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="bookingsTab" class="flex flex-col items-center w-full z-50">
        <div
          class="
            w-full
            lg:w-10/12
            xl:w-8/12
            2xl:w-1/2
            -mt-20
            z-50
            bg-white
            rounded-lg
            border-t
            border-metoPrimary-600
            shadow-xl
          "
        >
          <ul class="flex cursor-pointer text-sm md:text-xl w-full h-12">
            <li
              class="
                md:py-1
                w-1/3
                md:px-6
                px-4
                border-r border-gray-100
                transition
                duration-500
                ease-in-out
                flex
                gap-2
                items-center
                rounded-tl-lg
              "
              :class="[
                bookTicketTabSelected
                  ? 'bg-white text-metoPrimary-900'
                  : 'bg-metoPrimary-800 text-white',
              ]"
              @click="openBookTicketTab"
            >
              <div class="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              Book Ticket
            </li>
            <li
              class="
                md:py-1
                w-1/3
                md:px-6
                px-4
                transition
                duration-500
                ease-in-out
                flex
                gap-2
                items-center
              "
              :class="[
                regenerateTicketTabSelected
                  ? 'bg-white text-metoPrimary-900'
                  : 'bg-metoPrimary-800 text-white',
              ]"
              @click="openRegenerateTicketTab"
            >
              <div class="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-5 w-auto"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path
                    d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
                  />
                </svg>
              </div>
              <p>Regenerate Ticket</p>
            </li>
            <li
              class="
                md:py-1
                w-1/3
                md:px-6
                px-4
                transition
                duration-500
                ease-in-out
                flex
                gap-2
                border-l border-gray-100
                items-center
                rounded-tr-lg
              "
              :class="[
                hireBusTabSelected
                  ? 'bg-white text-metoPrimary-900'
                  : 'bg-metoPrimary-800 text-white',
              ]"
              @click="openHireBusTab"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-auto "
                viewBox="0 0 35 35"
                fill="currentColor"
                stroke-width="1"
              >
                <g>
                  <g>
                    <path
                      d="M29.797,6.968c-0.361,0-0.654,0.293-0.654,0.655v3.916c0,0.361,0.293,0.655,0.654,0.655h1.477    c0.361,0,0.656-0.293,0.656-0.655V7.551c0-0.322-0.262-0.584-0.584-0.584V6.921l-0.021-1.014c0.006-0.048,0.025-1.192-0.782-2.115    c-0.575-0.654-1.05-1.025-2.675-1.096c0-0.463-0.375-0.838-0.84-0.838H5.141c-0.467,0-0.846,0.379-0.846,0.846    c0,0,0.02,0,0.016,0.001C2.795,2.793,2.389,3.156,1.834,3.789C1.031,4.704,0.928,5.831,0.928,5.831v1.136h-0.05    C0.393,6.968,0,7.361,0,7.846v3.469c0,0.485,0.393,0.878,0.878,0.878h0.914c0.485,0,0.878-0.393,0.878-0.878V7.622    c0-0.361-0.293-0.655-0.655-0.655L2.05,5.795C2.049,5.789,2.111,5.057,2.601,4.498C2.929,4.125,3.558,3.882,4.34,3.79    L4.296,13.933H3.94c-0.573,0-1.038,0.464-1.038,1.037v10.931c0,0.572,0.465,1.037,1.038,1.037h1.052v-0.062v2.158    c0,0.573,0.465,1.037,1.038,1.037h2.22c0.573,0,1.038-0.464,1.038-1.037v-2.158v0.062h13.353v-0.062v2.158    c0,0.573,0.465,1.037,1.039,1.037h2.104c0.573,0,1.038-0.464,1.038-1.037v-2.158v0.062h1.4c0.57,0,1.035-0.465,1.035-1.037V14.97    c0-0.573-0.465-1.037-1.035-1.037h-0.356V3.769c0.813,0.082,1.442,0.319,1.788,0.705c0.498,0.557,0.535,1.285,0.535,1.358v1.136    H29.797z M8.299,13.933c-0.608,0-1.101-0.493-1.101-1.101V8.065c0-0.607,0.491-1.099,1.097-1.101l15.678-0.05    c0.293-0.001,0.574,0.115,0.781,0.32c0.207,0.207,0.324,0.488,0.324,0.78v4.817c0,0.608-0.493,1.101-1.102,1.101L8.299,13.933    L8.299,13.933z M23.105,20.437H9.288v-1.51h13.817V20.437L23.105,20.437z M23.105,17.998H9.288v-1.51h13.817V17.998L23.105,17.998    z M4.992,22.898c0-0.462,0.374-0.837,0.836-0.837h1.231c0.461,0,0.836,0.375,0.836,0.837v0.069c0,0.463-0.374,0.836-0.836,0.836    H5.828c-0.461,0-0.836-0.373-0.836-0.836V22.898z M7.895,19.948c0,0.462-0.374,0.836-0.836,0.836h-1.23    c-0.461,0-0.836-0.374-0.836-0.836v-2.624c0-0.462,0.374-0.836,0.836-0.836h1.23c0.461,0,0.836,0.374,0.836,0.836V19.948z     M8.708,3.965c0-0.329,0.267-0.596,0.597-0.596h13.552c0.33,0,0.598,0.267,0.598,0.596v0.897c0,0.329-0.268,0.596-0.598,0.596    H9.304c-0.33,0-0.597-0.267-0.597-0.596L8.708,3.965L8.708,3.965z M9.288,22.873v-1.507h13.817v1.507H9.288z M27.285,22.968    c0,0.463-0.374,0.836-0.836,0.836h-1.232c-0.461,0-0.836-0.373-0.836-0.836V22.9c0-0.464,0.374-0.839,0.836-0.839h1.232    c0.461,0,0.836,0.375,0.836,0.839V22.968z M27.285,19.948c0,0.462-0.374,0.836-0.836,0.836h-1.232    c-0.461,0-0.836-0.374-0.836-0.836v-2.624c0-0.462,0.374-0.836,0.836-0.836h1.232c0.461,0,0.836,0.374,0.836,0.836V19.948z"
                    />
                  </g>
                </g>
              </svg>
              Hire Bus
            </li>
          </ul>

          <div style="min-height: 20vh" class="bg-white w-full rounded-b-lg">
            <div v-if="bookTicketTabSelected" class="w-full">
              <div
                class="
                  flex
                  text-sm
                  md:text-xl
                  mt-4
                  md:mt-0
                  flex-col
                  gap-2
                  md:gap-0 md:flex-row
                  p-2
                  md:p-6
                  place-content-stretch
                  text-metoPrimary-900
                "
              >
                <div
                  class="
                    w-full
                    md:w-1/3
                    flex flex-col
                    border
                    rounded-lg
                    md:rounded-none md:rounded-l-lg
                    items-start
                    justify-center
                    p-2
                  "
                >
                  <p class="text-sm">Travelling From</p>
                  <select
                    class="bg-transparent w-full p-1"
                    v-model="originSelected"
                    @change="onOriginSelect($event)"
                  >
                    <option
                      v-for="origin in origins"
                      :value="origin"
                      :key="origin"
                      class="bg-metoPrimary-400 w-full"
                    >
                      {{ origin.name }}
                    </option>
                  </select>
                </div>
                <div
                  class="
                    w-full
                    md:w-1/3
                    flex flex-col
                    rounded-lg
                    md:rounded-none
                    border
                    items-start
                    justify-center
                    p-2
                  "
                >
                  <p class="text-sm">Travelling To</p>
                  <select
                    class="bg-transparent w-full p-1"
                    v-model="destinationSelected"
                    @change="onDestinationChange"
                  >
                    <option
                      v-for="destination in destinations"
                      :value="destination"
                      :key="destination"
                      class="bg-blue-400 w-full"
                    >
                      {{ destination.name }}
                    </option>
                  </select>
                </div>
                <div
                  class="
                    w-full
                    md:w-1/3
                    flex flex-col
                    border
                    items-start
                    justify-center
                    p-2
                    rounded-lg
                    md:rounded-none md:rounded-r-lg
                  "
                >
                  <p class="text-sm">Travelling On</p>
                  <div
                    class="
                      cursor-pointer
                      w-full
                      p-1
                      flex
                      items-center
                      text-red-400
                      animate-pulse
                    "
                    @click="checkAvailableDates()"
                    v-if="!dateSelected"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Select Departure Date
                  </div>
                  <div
                    class="cursor-pointer w-full p-1"
                    v-else
                    @click="checkAvailableDates()"
                  >
                    {{ dateSelected }}
                  </div>
                </div>
              </div>
              <div class="flex p-6 text-sm md:text-xl justify-end">
                <button
                  class="
                    py-1
                    w-full
                    md:w-max
                    md:py-2
                    rounded
                    text-white
                    bg-red-500
                    px-2
                    md:px-6
                    flex
                    gap-2
                    md:gap-4
                    h-10
                    md:h-14
                    items-center
                  "
                  @click="goToBusViewPage"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    x="0px"
                    y="0px"
                    class="h-6 w-auto fill-current"
                    viewBox="0 0 31.93 31.93"
                    style="enable-background: new 0 0 31.93 31.93"
                    xml:space="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M29.797,6.968c-0.361,0-0.654,0.293-0.654,0.655v3.916c0,0.361,0.293,0.655,0.654,0.655h1.477    c0.361,0,0.656-0.293,0.656-0.655V7.551c0-0.322-0.262-0.584-0.584-0.584V6.921l-0.021-1.014c0.006-0.048,0.025-1.192-0.782-2.115    c-0.575-0.654-1.05-1.025-2.675-1.096c0-0.463-0.375-0.838-0.84-0.838H5.141c-0.467,0-0.846,0.379-0.846,0.846    c0,0,0.02,0,0.016,0.001C2.795,2.793,2.389,3.156,1.834,3.789C1.031,4.704,0.928,5.831,0.928,5.831v1.136h-0.05    C0.393,6.968,0,7.361,0,7.846v3.469c0,0.485,0.393,0.878,0.878,0.878h0.914c0.485,0,0.878-0.393,0.878-0.878V7.622    c0-0.361-0.293-0.655-0.655-0.655L2.05,5.795C2.049,5.789,2.111,5.057,2.601,4.498C2.929,4.125,3.558,3.882,4.34,3.79    L4.296,13.933H3.94c-0.573,0-1.038,0.464-1.038,1.037v10.931c0,0.572,0.465,1.037,1.038,1.037h1.052v-0.062v2.158    c0,0.573,0.465,1.037,1.038,1.037h2.22c0.573,0,1.038-0.464,1.038-1.037v-2.158v0.062h13.353v-0.062v2.158    c0,0.573,0.465,1.037,1.039,1.037h2.104c0.573,0,1.038-0.464,1.038-1.037v-2.158v0.062h1.4c0.57,0,1.035-0.465,1.035-1.037V14.97    c0-0.573-0.465-1.037-1.035-1.037h-0.356V3.769c0.813,0.082,1.442,0.319,1.788,0.705c0.498,0.557,0.535,1.285,0.535,1.358v1.136    H29.797z M8.299,13.933c-0.608,0-1.101-0.493-1.101-1.101V8.065c0-0.607,0.491-1.099,1.097-1.101l15.678-0.05    c0.293-0.001,0.574,0.115,0.781,0.32c0.207,0.207,0.324,0.488,0.324,0.78v4.817c0,0.608-0.493,1.101-1.102,1.101L8.299,13.933    L8.299,13.933z M23.105,20.437H9.288v-1.51h13.817V20.437L23.105,20.437z M23.105,17.998H9.288v-1.51h13.817V17.998L23.105,17.998    z M4.992,22.898c0-0.462,0.374-0.837,0.836-0.837h1.231c0.461,0,0.836,0.375,0.836,0.837v0.069c0,0.463-0.374,0.836-0.836,0.836    H5.828c-0.461,0-0.836-0.373-0.836-0.836V22.898z M7.895,19.948c0,0.462-0.374,0.836-0.836,0.836h-1.23    c-0.461,0-0.836-0.374-0.836-0.836v-2.624c0-0.462,0.374-0.836,0.836-0.836h1.23c0.461,0,0.836,0.374,0.836,0.836V19.948z     M8.708,3.965c0-0.329,0.267-0.596,0.597-0.596h13.552c0.33,0,0.598,0.267,0.598,0.596v0.897c0,0.329-0.268,0.596-0.598,0.596    H9.304c-0.33,0-0.597-0.267-0.597-0.596L8.708,3.965L8.708,3.965z M9.288,22.873v-1.507h13.817v1.507H9.288z M27.285,22.968    c0,0.463-0.374,0.836-0.836,0.836h-1.232c-0.461,0-0.836-0.373-0.836-0.836V22.9c0-0.464,0.374-0.839,0.836-0.839h1.232    c0.461,0,0.836,0.375,0.836,0.839V22.968z M27.285,19.948c0,0.462-0.374,0.836-0.836,0.836h-1.232    c-0.461,0-0.836-0.374-0.836-0.836v-2.624c0-0.462,0.374-0.836,0.836-0.836h1.232c0.461,0,0.836,0.374,0.836,0.836V19.948z"
                        />
                      </g>
                    </g>
                  </svg>
                  Show Buses
                </button>
              </div>
            </div>

            <div v-if="regenerateTicketTabSelected" class="w-full">
              <div
                class="
                  flex flex-col
                  gap-2
                  md:gap-0 md:flex-row
                  p-6
                  place-content-stretch
                  text-metoPrimary-900 text-sm
                  md:text-xl
                "
              >
                <div
                  class="
                    w-full
                    md:w-1/2
                    flex flex-col
                    border
                    rounded-lg
                    md:rounded-none md:rounded-l-lg
                    items-start
                    justify-center
                    p-2
                  "
                >
                  <p class="text-sm">Passenger Contact</p>
                  <input
                    class="px-2 py-1 bg-transparent w-full"
                    type="tel"
                    v-model="ticket.contact"
                  />
                </div>

                <div
                  class="
                    w-full
                    md:w-1/2
                    flex flex-col
                    border
                    rounded-lg
                    md:rounded-none md:rounded-r-lg
                    items-start
                    justify-center
                    p-2
                  "
                >
                  <p class="text-sm">Passenger CID</p>
                  <input
                    class="px-2 py-1 bg-transparent w-full"
                    type="text"
                    v-model="ticket.cid"
                  />
                </div>
              </div>

              <div
                class="
                  flex flex-col
                  gap-2
                  md:gap-0 md:flex-row
                  p-6
                  justify-between
                "
              >
                <p
                  class="
                    order-2
                    md:order-1
                    text-xs text-metoPrimary-800
                    w-full
                    md:w-1/3
                  "
                >
                  Lost your Eticket? Haven't received your SMS confirmation?
                  Dont worry! Just fill in the Passenger Details and regenerate
                  your Ticket.
                </p>
                <button
                  class="
                    order-1
                    md:order-2
                    py-1
                    md:py-2
                    rounded
                    text-white
                    bg-metoContrast
                    px-2
                    md:px-6
                    text-sm
                    md:text-xl
                    flex
                    gap-4
                    h-10
                    md:h-14
                    items-center
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Regenerate Ticket
                </button>
              </div>
            </div>

            <div v-if="hireBusTabSelected" class="w-full">
              <div
                class="
                  flex flex-col
                  md:flex-row
                  gap-2
                  md:gap-0
                  px-6
                  pt-6
                  pb-3
                  place-content-stretch
                  text-metoPrimary-900
                "
              >
                <div
                  class="
                    w-full
                    md:w-1/3
                    flex flex-col
                    text-sm
                    md:text-xl
                    border
                    rounded-lg
                    md:rounded-none md:rounded-l-lg
                    items-start
                    justify-center
                    p-2
                  "
                >
                  <p class="text-sm">Your Name</p>
                  <input
                    class="p-1 bg-transparent w-full"
                    type="tel"
                    v-model="busHireRequestData.name"
                  />
                </div>

                <div
                  class="
                    w-full
                    md:w-1/3
                    flex flex-col
                    text-sm
                    md:text-xl
                    border
                    rounded-lg
                    md:rounded-none
                    items-start
                    justify-center
                    p-2
                  "
                >
                  <p class="text-sm">Your Contact</p>
                  <input
                    class="p-1 bg-transparent w-full"
                    type="text"
                    v-model="busHireRequestData.contact"
                  />
                </div>
                <div
                  class="
                    w-full
                    md:w-1/3
                    flex flex-col
                    text-sm
                    md:text-xl
                    border
                    rounded-lg
                    md:rounded-none md:rounded-r-lg
                    items-start
                    justify-center
                    p-2
                  "
                >
                  <p class="text-sm">Number of Bus</p>
                  <input
                    class="p-1 bg-transparent w-full"
                    type="number"
                    v-model="busHireRequestData.noOfBus"
                  />
                </div>
              </div>
              <div
                class="
                  flex flex-col
                  md:flex-row
                  gap-2
                  md:gap-0
                  px-6
                  py-2
                  place-content-stretch
                  text-metoPrimary-900
                "
              >
                <div
                  class="
                    w-full
                    md:w-1/2
                    flex flex-col
                    text-sm
                    md:text-xl
                    border
                    rounded-lg
                    md:rounded-none md:rounded-l-lg
                    items-start
                    justify-center
                    p-2
                  "
                >
                  <p class="text-sm">From Origin</p>
                  <select
                    class="bg-transparent w-full p-1 text-sm md:text-xl"
                    v-model="busHireRequestData.origin"
                  >
                    <option
                      v-for="dzongkhag in dzongkhags"
                      :value="dzongkhag.name"
                      :key="dzongkhag"
                      class="bg-metoPrimary-400 w-full"
                    >
                      {{ dzongkhag.name }}
                    </option>
                  </select>
                </div>

                <div
                  class="
                    w-full
                    md:w-1/2
                    flex flex-col
                    text-sm
                    md:text-xl
                    border
                    items-start
                    rounded-lg
                    md:rounded-none md:rounded-r-lg
                    justify-center
                    p-2
                  "
                >
                  <p class="text-sm">To Destination</p>
                  <select
                    class="bg-transparent w-full p-1 text-sm md:text-xl"
                    v-model="busHireRequestData.destination"
                  >
                    <option
                      v-for="dzongkhag in dzongkhags"
                      :value="dzongkhag.name"
                      :key="dzongkhag"
                      class="bg-metoPrimary-400 w-full"
                    >
                      {{ dzongkhag.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div
                class="
                  flex flex-col
                  md:flex-row
                  gap-2
                  md:gap-0
                  px-6
                  py-2
                  place-content-stretch
                  text-metoPrimary-900
                "
              >
                <div
                  class="
                    w-full
                    md:w-1/2
                    flex flex-col
                    text-sm
                    md:text-xl
                    border
                    rounded-lg
                    md:rounded-none md:rounded-l-lg
                    items-start
                    justify-center
                    p-2
                  "
                >
                  <p class="text-sm">From Date</p>
                  <div
                    class="cursor-pointer w-full p-1"
                    @click="selectBusHiringFromDate()"
                    v-if="!busHireRequestData.fromDate"
                  >
                    From Date
                  </div>
                  <div
                    class="cursor-pointer w-full p-1"
                    v-else
                    @click="selectBusHiringFromDate()"
                  >
                    {{ busHireRequestData.fromDate }}
                  </div>
                </div>

                <div
                  class="
                    w-full
                    md:w-1/2
                    flex flex-col
                    text-sm
                    md:text-xl
                    border
                    rounded-lg
                    md:rounded-none md:rounded-r-lg
                    items-start
                    justify-center
                    p-2
                  "
                >
                  <p class="text-sm">To Date</p>
                  <div
                    class="cursor-pointer w-full p-1"
                    @click="selectToDateHiring()"
                    v-if="!busHireRequestData.toDate"
                  >
                    Till Date
                  </div>
                  <div
                    class="cursor-pointer w-full p-1"
                    v-else
                    @click="selectBusHiringToDate()"
                  >
                    {{ busHireRequestData.toDate }}
                  </div>
                </div>
              </div>

              <div class="flex flex-col md:flex-row p-6 justify-between">
                <p
                  class="
                    mt-4
                    md:mt-0
                    w-full
                    text-sm text-metoPrimary-800
                    md:w-1/3
                    order-2
                    md:order-1
                  "
                >
                  Submit your bus hire request and we will get back to you.
                </p>
                <button
                  class="
                    order-1
                    md:order-2
                    p-2
                    rounded
                    text-white
                    bg-metoContrast
                    px-6
                    text-xl
                    flex
                    gap-4
                    h-14
                    items-center
                  "
                  @click="requestBusHire()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Request Bus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  <div id="aboutMeto" class="w-full flex flex-col items-center my-20 z-50">
        <!-- <div class="w-full lg:w-10/12 xl:w-8/12 2xl:w-1/2">
          <marquee
            behavior=""
            direction=""
            class="text-metoPrimary-800 font-thin flex"
          >
            <div class="flex gap-6">
              <p>New Stop added from thimphu to Paro</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
                velit.
              </p>
            </div>
          </marquee>
        </div> -->

        <!-- <div
          class="
            w-11/12
            lg:w-10/12
            xl:w-8/12
            2xl:w-1/2
            bg-gradient-to-r
            from-gray-800
            via-metoPrimary-900
            to-gray-400
            rounded-lg
            shadow-lg
            my-10
          "
        >
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div
              class="col-span-1 flex flex-col items-center p-5 text-gray-100"
            >
              <div class="text-5xl font-bold">
                <number
                  :from="0"
                  :to="stopsCount"
                  :format="theFormat"
                  :duration="2"
                  :delay="1"
                  easing="Power1.easeOut"
                />
              </div>
              <div class="flex gap-2 items-center text-xl">
                Destinations
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xmlns:svgjs="http://svgjs.com/svgjs"
                  version="1.1"
                  x="0"
                  y="0"
                  viewBox="0 0 511 511.999"
                  style="enable-background: new 0 0 512 512"
                  xml:space="preserve"
                  class="inline-block h-4 w-4 fill-current"
                >
                  <g>
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="m226.429688 173.5625c0-27.734375-22.5625-50.296875-50.296876-50.296875-27.734374 0-50.296874 22.5625-50.296874 50.296875s22.5625 50.296875 50.296874 50.296875c27.734376 0 50.296876-22.5625 50.296876-50.296875zm0 0"
                      style=""
                      class=""
                    />
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="m315.375 278.425781c-64.394531 0-116.785156 52.390625-116.785156 116.785157 0 64.398437 52.390625 116.789062 116.785156 116.789062 64.398438 0 116.789062-52.390625 116.789062-116.789062 0-64.394532-52.390624-116.785157-116.789062-116.785157zm48.738281 101.976563-50.832031 50.832031c-.003906.003906-.003906.003906-.007812.003906-.585938.589844-1.21875 1.101563-1.875 1.570313-2.601563 1.875-5.664063 2.824218-8.730469 2.824218-3.839844 0-7.679688-1.464843-10.609375-4.394531l-25.417969-25.417969c-5.859375-5.859374-5.859375-15.359374 0-21.21875 5.859375-5.859374 15.359375-5.859374 21.21875 0l14.808594 14.8125 40.230469-40.230468c5.859374-5.859375 15.359374-5.859375 21.214843 0 5.859375 5.859375 5.859375 15.359375 0 21.21875zm0 0"
                      style=""
                      class=""
                    />
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="m315.375 248.839844c6.710938 0 13.3125.464844 19.785156 1.34375 10.878906-23.21875 16.601563-48.789063 16.601563-74.550782.003906-96.84375-78.785157-175.632812-175.628907-175.632812-96.847656 0-175.632812 78.789062-175.632812 175.632812 0 29.078126 7.292969 57.9375 21.089844 83.464844l132.625 239.871094c4.402344 7.972656 12.800781 12.925781 21.917968 12.925781 9.117188 0 17.515626-4.953125 21.914063-12.917969l5.328125-9.640624c-21.433594-25.46875-34.371094-58.3125-34.371094-94.121094 0-80.710938 65.664063-146.375 146.371094-146.375zm-219.546875-75.277344c0-44.277344 36.027344-80.300781 80.304687-80.300781 44.277344 0 80.300782 36.023437 80.300782 80.300781 0 44.28125-36.023438 80.304688-80.300782 80.304688-44.277343 0-80.304687-36.023438-80.304687-80.304688zm0 0"
                      style=""
                      class=""
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              class="col-span-1 flex flex-col items-center p-5 text-gray-100"
            >
              <div class="text-5xl font-bold">
                <number
                  :from="0"
                  :to="routesCount"
                  :format="theFormat"
                  :duration="2"
                  :delay="1"
                  easing="Power1.easeOut"
                />
              </div>
              <div class="flex gap-2 items-center text-xl">
                Routes
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="inline-block h-5 w-5 fill-current"
                  viewBox="0 0 480.543 480.543"
                  xml:space="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M225.278,278.426c0-48.641-39.572-88.213-88.214-88.213c-48.641,0-88.212,39.572-88.212,88.213    c0,14.254,3.401,27.727,9.431,39.654l78.781,162.463l78.795-162.488C221.88,306.133,225.278,292.669,225.278,278.426z     M137.064,327.243c-26.917,0-48.817-21.9-48.817-48.817s21.9-48.817,48.817-48.817c26.918,0,48.817,21.9,48.817,48.817    S163.982,327.243,137.064,327.243z"
                      />
                      <path
                        d="M387.021,0c-24.63,0-44.669,20.038-44.669,44.668c0,7.218,1.723,14.04,4.776,20.081l39.893,82.267l39.899-82.28    c3.049-6.037,4.77-12.855,4.77-20.067C431.69,20.038,411.65,0,387.021,0z M387.021,69.388c-13.631,0-24.72-11.089-24.72-24.72    c0-13.63,11.089-24.72,24.72-24.72c13.629,0,24.719,11.09,24.719,24.72C411.74,58.299,400.65,69.388,387.021,69.388z"
                      />
                      <path
                        d="M348.116,289.787c-1.812-8.523-4.166-16.875-7.131-25.075c-3.974-10.987-8.74-21.724-12.391-32.836    c-6.823-20.771,4.948-38.105,7.16-41.256c3.876-5.517,8.408-10.58,13.19-15.322c9.207-9.128,19.361-17.288,29.984-24.803    c-1.316-2.039-2.591-4.1-3.805-6.199c-15.279,5.99-93.854,33.452-91.938,94.121c0.384,12.162,5.083,23.737,7.979,35.526    c1.395,5.681,2.605,11.412,3.345,17.218c0.319,2.614,0.515,5.243,0.729,7.87c0.006-0.02,0.004-0.034-0.008-0.045    c0.007,0.076,0.202,8.326-0.164,11.9c-1.147,11.189-2.799,22.494-7.516,32.758c-4.387,9.543-11.006,17.842-19.193,24.402    c-18.716,14.994-43.514,20.988-66.913,23.398c-1.114,0.117-2.228,0.217-3.342,0.314l-41.779,86.152    c20.614-1.281,41.175-4.102,61.235-9.039c23.607-5.811,46.613-14.588,67.227-27.598c20.596-12.996,38.308-30.578,50.099-51.984    c12.335-22.391,17.277-48.038,16.225-73.452C350.752,307.156,349.928,298.307,348.116,289.787z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div
              class="col-span-1 flex flex-col items-center p-5 text-gray-100"
            >
              <div class="text-5xl font-bold">
                <number
                  :from="0"
                  :to="bookingsCount"
                  :format="theFormat"
                  :duration="2"
                  :delay="1"
                  easing="Power1.easeOut"
                />
              </div>
              <div class="flex gap-2 items-center text-xl">
                Happy Customers
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xmlns:svgjs="http://svgjs.com/svgjs"
                  version="1.1"
                  class="inline-block h-4 w-4 fill-current"
                  x="0"
                  y="0"
                  viewBox="0 0 240.235 240.235"
                  style="enable-background: new 0 0 512 512"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M211.744,6.089C208.081,2.163,203.03,0,197.52,0h-15.143c-11.16,0-21.811,8.942-23.74,19.934l-0.955,5.436  c-0.96,5.47,0.332,10.651,3.639,14.589c3.307,3.938,8.186,6.106,13.74,6.106h19.561c2.714,0,5.339-0.542,7.778-1.504l-2.079,17.761  c-2.001-0.841-4.198-1.289-6.507-1.289h-22.318c-9.561,0-18.952,7.609-20.936,16.961l-19.732,93.027l-93.099-6.69  c-5.031-0.36-9.231,1.345-11.835,4.693c-2.439,3.136-3.152,7.343-2.009,11.847l10.824,42.618  c2.345,9.233,12.004,16.746,21.53,16.746h78.049h1.191h39.729c9.653,0,18.336-7.811,19.354-17.411l15.272-143.981  c0.087-0.823,0.097-1.634,0.069-2.437l5.227-44.648c0.738-1.923,1.207-3.967,1.354-6.087l0.346-4.97  C217.214,15.205,215.407,10.016,211.744,6.089z"
                      style=""
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div> -->

        <p class="mt-10 text-2xl md:text-xl text-gray-600">
          Why
          <span class="text-metoPrimary-800 font-bold">Meto Transport?</span>
        </p>
        <div class="w-11/12 lg:w-10/12 xl:w-8/12 2xl:w-1/2 text-gray-100 my-10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full font-thin">
            <div
              class="
                col-span-1
                row-span-3
                p-6
                flex flex-col
                items-center
                text-center
                bg-metoPrimary-900
                rounded-lg
              "
            >
              <p class="font-thin text-justify">
                <span class="text-xl font-semibold">
                  Meto Transport Service
                </span>
                , initially known as Karma Transport Service was established in
                the 2003 with two unit of Japanese make Coaster Bus between
                Thimphu – Phuentsholing route. The late proponent/Managing
                Director (Late Mr. Pema Thinley), with his sheer hard work,
                dedication and commitment has enhanced the growth of the Company
                within the short period of time. By the year 2010, Meto
                Transport Service became as one of the biggest passenger bus
                transport company with best services as certified many a times
                by the Road Safety & Transport Authority. Another big milestone
                for Meto Transport Service was introduction of Bhutan Transport
                Service on Phuentsholing – Kolkata (India) route in the year
                2009. As of now,Meto Transport Service still stands big with one
                of the highest numbers of fleets operating to varied region
                throughout and beyond the country. Meto Transport Company aims
                to grow furthermore bigger with high quality buses, premium and
                professional services and customer care.
              </p>
            </div>
            <div
              class="
                col-span-1
                row-span-1
                p-4
                flex flex-col
                items-center
                text-center
                bg-metoPrimary-900
                rounded-lg
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                class="h-6 w-6 fill-current"
                viewBox="0 0 32 32"
                style="enable-background: new 0 0 32 32"
                xml:space="preserve"
              >
                <path
                  d="M29.6,5.2C29.3,5,29,4.9,28.7,5.1c-4.3,1.4-8.7,0.3-12-2.8c-0.4-0.4-1-0.4-1.4,0c-3.3,3.1-7.7,4.2-12,2.8  C3,4.9,2.7,5,2.4,5.2C2.2,5.4,2,5.7,2,6c0,15.7,6.9,20.9,13.6,23.9C15.7,30,15.9,30,16,30s0.3,0,0.4-0.1C23.1,26.9,30,21.7,30,6  C30,5.7,29.8,5.4,29.6,5.2z M21.7,13.7l-6,6C15.5,19.9,15.3,20,15,20s-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0  l2.3,2.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0S22.1,13.3,21.7,13.7z"
                />
              </svg>
              <h6 class="text-xl font-semibold">Safety</h6>
              <p class="mt-2 mb-4">
                We ensure that the bus service is reliable in terms of timing
                and operations.
              </p>
            </div>
            <div
              class="
                col-span-1
                row-span-1
                p-4
                flex flex-col
                items-center
                text-center
                bg-metoPrimary-900
                rounded-lg
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 fill-current"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                />
              </svg>
              <h6 class="text-xl font-semibold">Reliability</h6>
              <p class="mt-2 mb-4">
                We ensure that the bus service is reliable in terms of timing
                and operations.
              </p>
            </div>
            <div
              class="
                col-span-1
                row-span-1
                p-4
                flex flex-col
                items-center
                text-center
                bg-metoPrimary-900
                rounded-lg
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <h6 class="text-xl font-semibold">Comfort</h6>
              <p class="mt-2 mb-4">
                We ensure that the bus service is reliable in terms of timing
                and operations.
              </p>
            </div>
            <div
              class="
                col-span-1
                row-span-1
                p-4
                flex flex-col
                items-center
                text-center
                bg-metoPrimary-900
                rounded-lg
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Icons"
                x="0px"
                y="0px"
                viewBox="0 0 32 32"
                class="h-6 w-6 fill-current"
                style="enable-background: new 0 0 32 32"
                xml:space="preserve"
              >
                <g>
                  <path
                    d="M27,10H6c-1.1,0-2-0.9-2-2s0.9-2,2-2h4c0.6,0,1-0.4,1-1s-0.4-1-1-1H6C3.8,4,2,5.8,2,8v16c0,2.2,1.8,4,4,4h21   c1.7,0,3-1.3,3-3V13C30,11.3,28.7,10,27,10z M28,15.8v6.4c-0.3-0.1-0.6-0.2-1-0.2h-4c-1.7,0-3-1.3-3-3s1.3-3,3-3h4   C27.4,16,27.7,15.9,28,15.8z"
                  />
                  <path
                    d="M7,7C6.4,7,6,7.4,6,8s0.4,1,1,1h4c0,0,0,0,0,0s0,0,0,0h15c0.3,0,0.6-0.2,0.8-0.4c0.2-0.3,0.2-0.6,0.1-0.9l-2-5   c-0.2-0.5-0.8-0.8-1.3-0.6L10.8,7H7z"
                  />
                  <path
                    d="M25,18h-2c-0.6,0-1,0.4-1,1s0.4,1,1,1h2c0.6,0,1-0.4,1-1S25.6,18,25,18z"
                  />
                </g>
              </svg>
              <h6 class="text-xl font-semibold">Affordability</h6>
              <p class="mt-2 mb-4">
                We ensure that the bus service is reliable in terms of timing
                and operations.
              </p>
            </div>

            <div
              class="
                col-span-1
                row-span-1
                p-4
                flex flex-col
                items-center
                justify-center
                text-center
                bg-metoPrimary-900
                rounded-lg
              "
            >
              <img
                src="../assets/meto.png"
                alt=""
                class="h-12 w-12 bg-white bg-opacity-80 rounded-full"
              />
              <div class="w-full text-center">
                <p class="font-semibold text-xl">Meto Transport Service</p>
                <p>
                  Ensuring Safety, comfort, reliability till your destination
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <vue-final-modal
      v-model="availableDatesModal"
      classes="flex justify-center items-center"
      content-class="modal-content rounded-lg"
      class="w-max-screen"
    >
      <div
        class="
          modal__content
          text-center
          mt-1
          flex flex-col
          text-metoPrimary-700
        "
      >
        <div class="flex flex-col justify-center items-center text-xl">
          <p>
            {{ originSelected.name }}
          </p>
          <table class="w-full">
            <tr>
              <td class="w-1/3">
                <hr class="w-full border-dashed" />
              </td>
              <td class="w-1/3 text-sm">to</td>
              <td class="w-1/3">
                <hr class="w-full border-dashed" />
              </td>
            </tr>
          </table>
          <p>
            {{ destinationSelected.name }}
          </p>
        </div>
        <div class="flex flex-col gap-2 justify-center items-center">
          <p class="w-11/12 break-words">
            Bus Available on Monday, Tuesday, Wednesday
          </p>
          <div class="flex flex-col px-2 py-1">
            <div class="flex flex-col justify-center mt-2">
              <h2 class="flex gap-2 text-sm font-light items-center">
                <span class="block rounded-full h-2 w-2 bg-green-700"> </span>
                Bus available
              </h2>
            </div>
            <DatePicker
              v-model="date"
              :min-date="new Date()"
              @dayclick="onDayClick($event)"
              :attributes="attributes"
            />
          </div>
        </div>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="fromDateSelectModal"
      classes="flex justify-center items-center"
      class="w-max-screen"
    >
      <DatePicker
        v-model="busHireRequestData.fromDate"
        :min-date="new Date()"
        @dayclick="selectFromDateHiring($event)"
      />
    </vue-final-modal>

    <vue-final-modal
      v-model="toDateSelectModal"
      classes="flex justify-center items-center"
      class="w-max-screen"
    >
      <DatePicker
        v-model="busHireRequestData.toDate"
        :min-date="
          busHireRequestData.fromDate ? busHireRequestData.fromDate : new Date()
        "
        @dayclick="selectBusHiringToDate($event)"
      />
    </vue-final-modal>

    <vue-final-modal
      v-model="regenerateTicketModal"
      classes="modal-container"
      content-class="modal-content"
      class="w-max-screen"
    >
      <div class="modal__content text-center mt-1 flex flex-col">
        <h3 class="text-xl mb-2 text-gray-700">
          <span class="text-sm">
            Lost your Eticket? No worries! Please enter the contact details of
            any of the passengers.</span
          >
          <br />
          Regenerate Ticket?
        </h3>
        <div
          class="flex flex-col md:flex-row gap-2 justify-center items-center"
        >
          <input
            class="
              shadow-sm
              appearance-none
              rounded
              w-full
              md:w-1/2
              py-2
              px-3
              text-gray-700
              leading-tight
            "
            placeholder="Contact"
            type="tel"
            v-model="ticket.contact"
          />
          <input
            class="
              shadow-sm
              appearance-none
              rounded
              w-full
              md:w-1/2
              py-2
              px-3
              text-gray-700
              leading-tight
            "
            placeholder="CID/Work Permit"
            type="text"
            v-model="ticket.cid"
          />
        </div>
        <div class="mb-4">
          <button
            class="bg-gray-600 text-white mt-4 mr-5 p-2 rounded"
            @click="searchBookings"
          >
            Search Ticket
          </button>
          <button
            class="bg-gray-600 text-white mt-4 ml-5 p-2 rounded"
            @click="regenerateTicketModal = false"
          >
            Cancel
          </button>
        </div>

        <table v-if="validSearch" class="table-auto mt-4">
          <tr>
            <td class="text-xs font-medium text-gray-500">BookingID</td>
            <td class="text-xs font-medium text-gray-500">Route</td>
            <td class="text-xs font-medium text-gray-500">Departure Date</td>
            <td class="text-xs font-medium text-gray-500">Departure Time</td>
            <td class="text-xs font-medium text-gray-500">Action</td>
          </tr>
          <tr
            v-for="validbooking in searchedBookings"
            :key="validbooking"
            class="text-sm md:text-md border-b-2 text-gray-600"
          >
            <td>
              {{ validbooking.booking.id }}
            </td>
            <td>
              {{ validbooking.booking.route.routepath.origin.name }} to
              {{ validbooking.booking.route.routepath.destination.name }}
            </td>
            <td>
              {{ validbooking.booking.route.departureTime }}
            </td>
            <td>
              {{ formatDepartureDate(validbooking.booking.scheduleDate) }}
            </td>
            <td>
              <button
                @click="generateTicket(validbooking.booking.id)"
                class="
                  bg-gray-100
                  hover:bg-gray-400
                  text-gray-500
                  hover:text-white
                  font-bold
                  p-2
                  rounded-r
                "
              >
                Generate
              </button>
            </td>
          </tr>
        </table>
      </div>
    </vue-final-modal>
  </div>
</template>



<style>
#heroSection {
  height: 50vh;
}

@media (min-width: 768px) {
  heroSection {
    height: 80vh;
  }
}
</style>


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
  width: auto;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
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

a {
  text-decoration: none;
  color: #000;
}

.marquee {
  height: 35px;
  width: 300%;
  position: relative;
  padding: 8px 0 4px 0;
  border: none;
}

.marq {
  background-color: #e9e5fb;
}

.marquee span {
  float: left;
  width: 300px;
}

@keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    left: -150%;
  }
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
<script>
import NavbarComponent from "../components/Landing/Navbar.vue";
import {  regenerateTicket } from "../services/bookingServices";

import {
  dzongkhags,
  getActiveDestinationByOrigin,
  getActiveStops,
} from "../services/stopServices";


import { Calendar, DatePicker } from "v-calendar";
import {
  getRoutesByOriginDestination,
} from "../services/routeServices";

import { postBusHireRequest } from "../services/busHiringServices";

export default {
  name: "landing-page",
  components: {
    NavbarComponent,
    DatePicker,
    Calendar,
  },
  data() {
    return {
      feedBack: {
        name: null,
        feedback: null,
      },
      commented: false,
      regenerateTicketModal: false,
      ticket: {
        contact: null,
        cid: null,
      },
      searchedBookings: [],
      validSearch: false,

      origins: [
        {
          name: "loading..",
          id: 0,
        },
      ],
      originSelected: {
        name: "loading.....",
        id: 0,
      },
      destinations: [{ name: "Select Destination", id: 0 }],
      destinationSelected: {
        name: "Select Destination",
        id: 0,
      },

      bookTicketTabSelected: true,
      regenerateTicketTabSelected: false,
      hireBusTabSelected: false,
      availableDatesPopulated: false,

      availableDatesModal: false,
      routes: [],
      subroutes: [],
      attributes: [],
      days: [],

      dateClicked: false,
      daySelected: null,
      invalidDateClicked: false,
      dateSelected: null,
      matchedRoutes: [],
      selectedRoute: {},

      busHireRequestData: {
        dismissed: 0,
      },
      fromDateSelectModal: false,
      toDateSelectModal: false,
      date: new Date(),
      dzongkhags: [],
    };
  },

  created() {
    // this.$store.commit("resetStoreState")
    this.dzongkhags = dzongkhags;
    // getOverAllStats().then((res) => {
    //   this.bookingsCount = Number(res.data.bookings);
    //   this.stopsCount = Number(res.data.stops);
    //   this.routesCount = Number(res.data.routes);
    // });

    getActiveStops().then((res) => {
      this.origins = res.data;
      this.originSelected = res.data[0];
      getActiveDestinationByOrigin(this.originSelected.id).then((res) => {
        this.destinations = res.data;
        this.destinationSelected = res.data[0];
      });
    });
  },
  methods: {
    // theFormat(number) {
    //   return Math.floor(number);
    // },

    onOriginSelect(e) {
      this.dateSelected = null;
      getActiveDestinationByOrigin(this.originSelected.id).then((res) => {
        this.destinations = res.data;
        this.destinationSelected = res.data[0];
      });
    },
    onDestinationChange() {
      this.dateSelected = null;
    },

    checkAvailableDates() {
      this.routes = [];
      this.subroutes = [];
      this.dateSelected = null;
      this.attributes = [];
      this.days = [];
      this.matchedRoutes = [];

      getRoutesByOriginDestination(
        this.originSelected.id,
        this.destinationSelected.id
      )
        .then((res) => {

          if (res.data.routes) {
            this.routes = res.data.routes;
            console.log("PARENT ROUTES", res.data.routes)
            this.routes.forEach((route) => {
              this.days.push(route.day);
            });
          }
          if (res.data.subroutes) {
            console.log("SUBROUTES", res.data.subroutes)
            this.subroutes = res.data.subroutes;
            this.subroutes.forEach((subroute) => {
              this.days.push(subroute.day);
            });
          }
          this.attributes = [
            {
              dot: "green",
              dates: { weekdays: this.days },
              popover: {
                label: "Bus Availble",
              },
              excludeDates: this.disabledDates,
            },
          ];
        })
        .catch((err) => console.log(err));

      this.availableDatesModal = true;
    },

    onDayClick(e) {
      this.invalidDateClicked = false;
      this.dateClicked = true;
      this.daySelected = e.weekday;

      if (
        e.popovers[0] &&
        e.popovers[0].label === "Bus Availble" &&
        !e.isDisabled
      ) {
        let formattedDate = e.id;
        this.dateSelected = e.ariaLabel;
        this.matchedRoutes = [];
        this.$store.commit("commitSelectedDate", formattedDate);
        this.$store.commit("commitFormattedDepartureDate", e.ariaLabel);
       
       this.routes.forEach((route) => {
          if (route.day === e.weekday) {
            this.matchedRoutes.push(route);
          }
        });
        this.subroutes.forEach((subroute) => {
          if (subroute.day === e.weekday) {
            this.matchedRoutes.push(subroute);
          }
        });
        this.$store.commit("commitIndexMatchedRoutes", this.matchedRoutes);
        this.availableDatesModal = false;
      } else {
        this.dateSelected = null;
        this.matchedRoutes = [];
        this.$store.commit("clearStoreMatchedRoutes");
        if (e.isDisabled) {
          this.$toast.show(`Date expired`, {
            position: "top",
            type: "error",
          });
          this.invalidDateClicked = true;
        } else {
          this.matchedRoutes = [];
           this.$store.commit("clearStoreMatchedRoutes");
          this.$toast.show(`No Bus Availble`, {
            position: "top",
            type: "error",
          });
        }
      }
    },
    goToBusViewPage() {
      if (
        this.originSelected &&
        this.destinationSelected &&
        this.dateSelected
      ) {
        this.$store.commit("addOrigin", this.originSelected);
        this.$store.commit("addDestination", this.destinationSelected);
        this.$router.push("/buses");
      } else {
        this.$toast.show("Please Select departure Date", {
          position: "top",
          type: "error",
        });
      }
    },

  

    openBookTicketTab() {
      this.bookTicketTabSelected = true;
      this.regenerateTicketTabSelected = false;
      this.hireBusTabSelected = false;
    },
    openRegenerateTicketTab() {
      this.bookTicketTabSelected = false;
      this.regenerateTicketTabSelected = true;
      this.hireBusTabSelected = false;
    },
    openHireBusTab() {
      this.bookTicketTabSelected = false;
      this.regenerateTicketTabSelected = false;
      this.hireBusTabSelected = true;
    },
    formatDepartureDate(date) {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(date).toLocaleDateString("en-US", options);
    },
    scanToBook() {
      this.$router.push("/book");
    },
    generateTicket(bookingId) {
      this.$router.push(`/book/eticket/${bookingId}`);
    },
    searchBookings() {
      if (this.ticket.cid && this.ticket.contact) {
        regenerateTicket(this.ticket.cid, this.ticket.contact).then((res) => {
          if (res.status === 200 && res.data.length !== 0) {
            this.searchedBookings = res.data;
            this.validSearch = true;
          } else {
            this.validSearch = false;
            this.$toast.show("No Matching Records", {
              position: "top",
              type: "error",
            });
          }
        });
      } else {
        this.$toast.show(
          "Please Enter the CID and Contact Number of a passenger",
          {
            position: "top",
            type: "error",
          }
        );
      }
    },

    requestBusHire() {
      if (
        this.busHireRequestData.name &&
        this.busHireRequestData.contact &&
        this.busHireRequestData.origin &&
        this.busHireRequestData.destination &&
        this.busHireRequestData.fromDate &&
        this.busHireRequestData.toDate
      ) {
        postBusHireRequest(this.busHireRequestData).then((res) => {
          if (res.status === 201) {
            this.$toast.show(
              "Bus Hiring Request has been sent! You will be contacted Shortly",
              {
                position: "top",
              }
            );
            this.busHireRequestData = {
              dismissed: 0,
            };
          }
        });
      } else {
        this.$toast.show("Please Enter all required fields!", {
          position: "top",
          type: "error",
        });
      }
    },
    send() {
      if (this.feedBack.feedback) {
        sendFeedback(this.feedBack).then((res) => {
          if (res.status === 201) {
            this.commented = true;
            this.$toast.show("Thank you for your comment", {
              position: "top",
              type: "success",
            });
          }
        });
      } else {
        this.$toast.show("Please type something", {
          position: "top",
          type: "error",
        });
      }
    },

    selectBusHiringFromDate() {
      this.fromDateSelectModal = true;
    },
    selectFromDateHiring(e) {
      this.busHireRequestData.fromDate = e.ariaLabel;
      this.fromDateSelectModal = false;
    },
    selectToDateHiring() {
      this.toDateSelectModal = true;
    },
    selectBusHiringToDate(e) {
      this.busHireRequestData.toDate = e.ariaLabel;
      this.toDateSelectModal = false;
    },

    // UNSED
  },
};
</script>