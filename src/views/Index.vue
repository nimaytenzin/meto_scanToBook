<template>
  <div>
    <navbar-component></navbar-component>
    <main>
      <div
        class="
          relative
          pt-16
          pb-32
          flex
          content-center
          items-center
          justify-center
        "
        style="min-height: 75vh"
      >
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          :style="{
            'background-image': 'url(' + require('../assets/hero.png') + ')',
          }"
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div class="p-4">
                <div class="flex justify-center">
                  <img
                    src="../assets/meto.png"
                    alt=""
                    class="w-14 bg-white rounded-full border-red-200"
                  />
                </div>

                <h1 class="text-white font-semibold text-5xl">
                  Your Journey starts with us.
                </h1>

                <p class="mt-4 text-lg text-gray-300">
                  Ensuring Safety, Reliability and Comfort till your destination
                </p>

                <div class="max-w-7xl mx-auto mt-4 mb-2">
                  <div
                    class="
                      p-8
                      bg-gray-800
                      text-gray-300
                      grid grid-cols-1
                      md:grid-cols-2
                      lg:grid-cols-4
                      gap-8
                      rounded
                      text-sm
                    "
                  >
                    <div class="space-y-1">
                      <!-- <div>Buses</div> -->
                      <div class="text-5xl font-thin text-white">
                        <number
                          :from="0"
                          :to="buses"
                          :format="theFormat"
                          :duration="2"
                          :delay="1"
                          easing="Power1.easeOut"
                        />
                      </div>
                      <div>
                        Buses
                        <svg
                          class="inline-block h-4 w-4 text-green-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="space-y-1">
                      <!-- <div>Buses</div> -->
                      <div class="text-5xl font-thin text-white">
                        <number
                          :from="0"
                          :to="stops"
                          :format="theFormat"
                          :duration="2"
                          :delay="1"
                          easing="Power1.easeOut"
                        />
                      </div>
                      <div>
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
                          class="inline-block h-4 w-4 text-green-400"
                        >
                          <g>
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="m226.429688 173.5625c0-27.734375-22.5625-50.296875-50.296876-50.296875-27.734374 0-50.296874 22.5625-50.296874 50.296875s22.5625 50.296875 50.296874 50.296875c27.734376 0 50.296876-22.5625 50.296876-50.296875zm0 0"
                              fill="#35d399"
                              data-original="#000000"
                              style=""
                              class=""
                            />
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="m315.375 278.425781c-64.394531 0-116.785156 52.390625-116.785156 116.785157 0 64.398437 52.390625 116.789062 116.785156 116.789062 64.398438 0 116.789062-52.390625 116.789062-116.789062 0-64.394532-52.390624-116.785157-116.789062-116.785157zm48.738281 101.976563-50.832031 50.832031c-.003906.003906-.003906.003906-.007812.003906-.585938.589844-1.21875 1.101563-1.875 1.570313-2.601563 1.875-5.664063 2.824218-8.730469 2.824218-3.839844 0-7.679688-1.464843-10.609375-4.394531l-25.417969-25.417969c-5.859375-5.859374-5.859375-15.359374 0-21.21875 5.859375-5.859374 15.359375-5.859374 21.21875 0l14.808594 14.8125 40.230469-40.230468c5.859374-5.859375 15.359374-5.859375 21.214843 0 5.859375 5.859375 5.859375 15.359375 0 21.21875zm0 0"
                              fill="#35d399"
                              data-original="#000000"
                              style=""
                              class=""
                            />
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="m315.375 248.839844c6.710938 0 13.3125.464844 19.785156 1.34375 10.878906-23.21875 16.601563-48.789063 16.601563-74.550782.003906-96.84375-78.785157-175.632812-175.628907-175.632812-96.847656 0-175.632812 78.789062-175.632812 175.632812 0 29.078126 7.292969 57.9375 21.089844 83.464844l132.625 239.871094c4.402344 7.972656 12.800781 12.925781 21.917968 12.925781 9.117188 0 17.515626-4.953125 21.914063-12.917969l5.328125-9.640624c-21.433594-25.46875-34.371094-58.3125-34.371094-94.121094 0-80.710938 65.664063-146.375 146.371094-146.375zm-219.546875-75.277344c0-44.277344 36.027344-80.300781 80.304687-80.300781 44.277344 0 80.300782 36.023437 80.300782 80.300781 0 44.28125-36.023438 80.304688-80.300782 80.304688-44.277343 0-80.304687-36.023438-80.304687-80.304688zm0 0"
                              fill="#35d399"
                              data-original="#000000"
                              style=""
                              class=""
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="space-y-1">
                      <!-- <div>Routes</div> -->
                      <div class="text-5xl font-thin text-white">
                        <number
                          :from="0"
                          :to="routes"
                          :format="theFormat"
                          :duration="2"
                          :delay="1"
                          easing="Power1.easeOut"
                        />
                      </div>
                      <div>
                        Routes

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          class="inline-block h-4 w-4 text-green-400"
                          viewBox="0 0 480.543 480.543"
                          xml:space="preserve"
                        >
                          <g>
                            <g>
                              <path
                                fill="#35d399"
                                d="M225.278,278.426c0-48.641-39.572-88.213-88.214-88.213c-48.641,0-88.212,39.572-88.212,88.213    c0,14.254,3.401,27.727,9.431,39.654l78.781,162.463l78.795-162.488C221.88,306.133,225.278,292.669,225.278,278.426z     M137.064,327.243c-26.917,0-48.817-21.9-48.817-48.817s21.9-48.817,48.817-48.817c26.918,0,48.817,21.9,48.817,48.817    S163.982,327.243,137.064,327.243z"
                              />
                              <path
                                fill="#35d399"
                                d="M387.021,0c-24.63,0-44.669,20.038-44.669,44.668c0,7.218,1.723,14.04,4.776,20.081l39.893,82.267l39.899-82.28    c3.049-6.037,4.77-12.855,4.77-20.067C431.69,20.038,411.65,0,387.021,0z M387.021,69.388c-13.631,0-24.72-11.089-24.72-24.72    c0-13.63,11.089-24.72,24.72-24.72c13.629,0,24.719,11.09,24.719,24.72C411.74,58.299,400.65,69.388,387.021,69.388z"
                              />
                              <path
                                fill="#35d399"
                                d="M348.116,289.787c-1.812-8.523-4.166-16.875-7.131-25.075c-3.974-10.987-8.74-21.724-12.391-32.836    c-6.823-20.771,4.948-38.105,7.16-41.256c3.876-5.517,8.408-10.58,13.19-15.322c9.207-9.128,19.361-17.288,29.984-24.803    c-1.316-2.039-2.591-4.1-3.805-6.199c-15.279,5.99-93.854,33.452-91.938,94.121c0.384,12.162,5.083,23.737,7.979,35.526    c1.395,5.681,2.605,11.412,3.345,17.218c0.319,2.614,0.515,5.243,0.729,7.87c0.006-0.02,0.004-0.034-0.008-0.045    c0.007,0.076,0.202,8.326-0.164,11.9c-1.147,11.189-2.799,22.494-7.516,32.758c-4.387,9.543-11.006,17.842-19.193,24.402    c-18.716,14.994-43.514,20.988-66.913,23.398c-1.114,0.117-2.228,0.217-3.342,0.314l-41.779,86.152    c20.614-1.281,41.175-4.102,61.235-9.039c23.607-5.811,46.613-14.588,67.227-27.598c20.596-12.996,38.308-30.578,50.099-51.984    c12.335-22.391,17.277-48.038,16.225-73.452C350.752,307.156,349.928,298.307,348.116,289.787z"
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="space-y-1">
                      <!-- <div>Passengers</div> -->
                      <div class="text-5xl font-thin text-white">
                        <number
                          :from="0"
                          :to="bookings"
                          :format="theFormat"
                          :duration="2"
                          :delay="1"
                          easing="Power1.easeOut"
                        />
                      </div>
                      <div>
                        Happy Customers
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          xmlns:svgjs="http://svgjs.com/svgjs"
                          version="1.1"
                          class="inline-block h-4 w-4 text-green-400"
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
                              fill="#35d399"
                              data-original="#000000"
                              style=""
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="
                    flex flex-col
                    md:flex-row
                    items-center
                    gap-2
                    justify-center
                  "
                >
                  <button
                    class="
                      bg-gray-200
                      p-2
                      rounded
                      text-xl
                      font-semibold
                      mt-2
                      hover:bg-gray-800 hover:text-gray-100
                      transition
                      hover:bg-opacity-50
                    "
                    @click="goToBooking()"
                  >
                    Book Your Next ride
                  </button>
                  <button
                    class="
                      bg-gray-200
                      p-2
                      rounded
                      text-xl
                      font-semibold
                      mt-2
                      hover:bg-gray-800 hover:text-gray-100
                      transition
                      hover:bg-opacity-50
                    "
                    @click="regenerateTicketModal = true"
                  >
                    Regenerate Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            top-auto
            bottom-0
            left-0
            right-0
            w-full
            absolute
            pointer-events-none
            overflow-hidden
          "
          style="height: 70px"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-white fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      <!-- //begin next section -->
      <section class="pb-20 bg-white -mt-28">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="pt-6 w-full md:w-3/12 px-4 text-center">
              <div
                class="
                  relative
                  flex flex-col
                  min-w-0
                  break-words
                  bg-white
                  w-full
                  mb-8
                  shadow-lg
                  rounded-lg
                "
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="
                      text-white
                      p-3
                      text-center
                      inline-flex
                      items-center
                      justify-center
                      w-12
                      h-12
                      mb-5
                      shadow-lg
                      rounded-full
                      bg-green-400
                    "
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
                        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                      />
                    </svg>
                  </div>
                  <h6 class="text-xl font-semibold">Reliability</h6>
                  <p class="mt-2 mb-4 text-gray-600">
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough. Keep you user engaged!
                  </p>
                </div>
              </div>
            </div>

            <div class="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center">
              <div
                class="
                  relative
                  flex flex-col
                  min-w-0
                  break-words
                  bg-white
                  w-full
                  mb-8
                  shadow-lg
                  rounded-lg
                "
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="
                      text-white
                      p-3
                      text-center
                      inline-flex
                      items-center
                      justify-center
                      w-12
                      h-12
                      mb-5
                      shadow-lg
                      rounded-full
                      bg-red-400
                    "
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
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h6 class="text-xl font-semibold">Safety</h6>
                  <p class="mt-2 mb-4 text-gray-600">
                    Our buses are maintained and services regularly to ensure
                    that you reach your destination safely.
                  </p>
                </div>
              </div>
            </div>

            <div class="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center">
              <div
                class="
                  relative
                  flex flex-col
                  min-w-0
                  break-words
                  bg-white
                  w-full
                  mb-8
                  shadow-lg
                  rounded-lg
                "
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="
                      text-white
                      p-3
                      text-center
                      inline-flex
                      items-center
                      justify-center
                      w-12
                      h-12
                      mb-5
                      shadow-lg
                      rounded-full
                      bg-red-400
                    "
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
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h6 class="text-xl font-semibold">Affordability</h6>
                  <p class="mt-2 mb-4 text-gray-600">
                    Affordable pricing for user and Reasonable rates for
                    transporters sustainability is important for continuity.
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-6 w-full md:w-3/12 px-4 text-center">
              <div
                class="
                  relative
                  flex flex-col
                  min-w-0
                  break-words
                  bg-white
                  w-full
                  mb-8
                  shadow-lg
                  rounded-lg
                "
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="
                      text-white
                      p-3
                      text-center
                      inline-flex
                      items-center
                      justify-center
                      w-12
                      h-12
                      mb-5
                      shadow-lg
                      rounded-full
                      bg-green-400
                    "
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h6 class="text-xl font-semibold">Efficiency</h6>
                  <p class="mt-2 mb-4 text-gray-600">
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough. Keep you user engaged!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="
              bottom-auto
              top-0
              left-0
              right-0
              w-full
              absolute
              pointer-events-none
              overflow-hidden
              -mt-20
            "
            style="height: 80px"
          >
            <svg
              class="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                class="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
          <!-- 
          <div class="container mx-auto px-4 mt-10">
            <div class="items-center flex flex-wrap">
              <div
                class="
                  flex
                  justify-center
                  items-center
                  w-full
                  p-6
                  md:w-3/12
                  ml-auto
                  mr-auto
                  px-4
                  bg-gray-800
                  rounded-lg
                  bg-opacity-40
                  text-white
                "
              >
                <div>
                  <h3 class="text-3xl font-semibold">Services</h3>
                  <p>
                    We are always innovating to provide our customers with the
                    most convinient way to access our services.
                  </p>
                </div>
              </div>
              <div class="w-full md:w-3/12 ml-auto mr-auto px-4 py-2 cursor-pointer" @click="scanToBook()">
                <img
                  alt="..."
                  class="max-w-full rounded-lg shadow-lg"
                  src="../assets/advert1.png"
                  v-tilt
                />
              </div>
              <div class="w-full md:w-3/12 ml-auto mr-auto px-4" v-tilt>
                <img
                  alt="..."
                  class="max-w-full rounded-lg shadow-lg"
                  src="../assets/advert2.png"
                  v-tilt
                />
              </div>
            </div>
          </div> -->

          <!-- //end company values  -->

          <div class="flex flex-wrap items-center my-32">
            <div class="w-full px-4 mr-auto ml-auto">
              <h3 class="text-3xl mb-2 font-semibold leading-normal">
                About Meto Transport
              </h3>
              <p
                class="
                  text-lg
                  font-light
                  text-justify
                  leading-relaxed
                  mt-4
                  mb-4
                  text-gray-700
                "
              >
                Meto Transport Service, initially popularly known as Karma
                Transport Service was established in the 2003 with two (2) unit
                of Japanese make Coaster Bus between Thimphu – Phuentsholing
                route. The late proponent/Managing Director (Late Mr. Pema
                Thinley), with his sheer hard work, dedication and commitment
                has enhanced the growth of the Company within the short period
                of time.
              </p>
              <p
                class="
                  text-lg
                  font-light
                  leading-relaxed
                  text-justify
                  mt-0
                  mb-4
                  text-gray-700
                "
              >
                By the year 2010, Meto Transport Service became as one of the
                biggest passenger bus transport company with best services as
                certified many a times by the Road Safety &amp; Transport
                Authority. Another big milestone for Meto Transport Service was
                introduction of Bhutan Transport Service on Phuentsholing –
                Kolkata (India) route in the year 2009. Indeed a big success and
                a proud moment for a private company “Meto Transport Service”
                for having being approved on the route beyond our border to one
                of the state India. As of 2021, Meto Transport Service still
                stands big with one of the highest numbers of fleets operating
                to varied region throughout and beyond the country. Meto
                Transport Company aims to grow furthermore bigger with high
                quality buses, premium and professional services and customer
                care.
              </p>
            </div>
            <!-- <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div
                class="
                  relative
                  flex flex-col
                  min-w-0
                  break-words
                  w-full
                  mb-6
                  shadow-lg
                  rounded-lg
                  bg-gray-800
                "
              >
                <img
                  alt="..."
                  src="https://scontent.fpbh1-1.fna.fbcdn.net/v/t1.6435-9/120569538_106350597902005_2203650303695778638_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=B5NCyxuBM1wAX8iv3Cd&_nc_ht=scontent.fpbh1-1.fna&oh=7d7e0740e5f8b3c116690a4371193b97&oe=61417291"
                  class="w-full align-middle rounded-t-lg"
                />
                <blockquote class="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    class="absolute left-0 w-full block"
                    style="height: 95px; top: -94px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      class="text-gray-800 fill-current"
                    ></polygon>
                  </svg>
                  <h4 class="text-xl font-bold text-white">Meto Transport</h4>
                  <p class="text-md font-light mt-2 text-white">
                    Progression: 80’s to 2020.
                  </p>
                </blockquote>
              </div>
            </div> -->
          </div>
        </div>
      </section>

      <!-- <section class="pt-20 pb-48">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center text-center mb-24">
            <div class="w-full lg:w-6/12 px-4">
              <h2 class="text-4xl font-semibold">Meto Transport</h2>
              <p class="text-lg leading-relaxed m-4 text-gray-600">
                According to the National Oceanic and Atmospheric
                Administration, Ted, Scambos, NSIDClead scentist, puts the
                potentially record maximum.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Karma</h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Proprietor
                  </p>
                  <div class="mt-6">
                    <button
                      class="
                        bg-blue-400
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-twitter"></i></button
                    ><button
                      class="
                        bg-blue-600
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-facebook-f"></i></button
                    ><button
                      class="
                        bg-pink-500
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-dribbble"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Karma</h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Marketing Specialist
                  </p>
                  <div class="mt-6">
                    <button
                      class="
                        bg-red-600
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-google"></i></button
                    ><button
                      class="
                        bg-blue-600
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Alexa Smith</h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    UI/UX Designer
                  </p>
                  <div class="mt-6">
                    <button
                      class="
                        bg-red-600
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-google"></i></button
                    ><button
                      class="
                        bg-blue-400
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-twitter"></i></button
                    ><button
                      class="
                        bg-gray-800
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Jenna Kardi</h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Founder and CEO
                  </p>
                  <div class="mt-6">
                    <button
                      class="
                        bg-pink-500
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-dribbble"></i></button
                    ><button
                      class="
                        bg-red-600
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-google"></i></button
                    ><button
                      class="
                        bg-blue-400
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-twitter"></i></button
                    ><button
                      class="
                        bg-gray-800
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                    >
                      <i class="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->
      <section class="pb-20 relative block bg-gray-900">
        <div
          class="
            bottom-auto
            top-0
            left-0
            right-0
            w-full
            absolute
            pointer-events-none
            overflow-hidden
            -mt-20
          "
          style="height: 80px"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-gray-900 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div class="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div class="flex flex-wrap text-center justify-center">
            <div class="w-full lg:w-6/12 px-4">
              <h2 class="text-4xl font-semibold text-white">
                We are always listening
              </h2>
              <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                Anything we could do yo imporve our services? <br />
                We would be grateful if you would tell us the issue in details.
              </p>
            </div>
          </div>
          <!-- <div class="flex flex-wrap mt-12 justify-center">
            <div class="w-full lg:w-3/12 px-4 text-center">
              <div
                class="
                  text-gray-900
                  p-3
                  w-12
                  h-12
                  shadow-lg
                  rounded-full
                  bg-white
                  inline-flex
                  items-center
                  justify-center
                "
              >
                <i class="fas fa-medal text-xl"></i>
              </div>
              <h6 class="text-xl mt-5 font-semibold text-white">
                Excelent Services
              </h6>
              <p class="mt-2 mb-4 text-gray-500">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div class="w-full lg:w-3/12 px-4 text-center">
              <div
                class="
                  text-gray-900
                  p-3
                  w-12
                  h-12
                  shadow-lg
                  rounded-full
                  bg-white
                  inline-flex
                  items-center
                  justify-center
                "
              >
                <i class="fas fa-poll text-xl"></i>
              </div>
              <h5 class="text-xl mt-5 font-semibold text-white">
                Grow your market
              </h5>
              <p class="mt-2 mb-4 text-gray-500">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div class="w-full lg:w-3/12 px-4 text-center">
              <div
                class="
                  text-gray-900
                  p-3
                  w-12
                  h-12
                  shadow-lg
                  rounded-full
                  bg-white
                  inline-flex
                  items-center
                  justify-center
                "
              >
                <i class="fas fa-lightbulb text-xl"></i>
              </div>
              <h5 class="text-xl mt-5 font-semibold text-white">Launch time</h5>
              <p class="mt-2 mb-4 text-gray-500">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div> -->
        </div>
      </section>
      <section class="relative block py-24 lg:pt-0 bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center lg:-mt-64 -mt-48">
            <div class="w-full lg:w-6/12 px-4">
              <div
                class="
                  relative
                  flex flex-col
                  min-w-0
                  break-words
                  w-full
                  mb-6
                  shadow-lg
                  rounded-lg
                  bg-gray-300
                "
              >
                <div class="flex-auto p-5 lg:p-10" v-if="!commented">
                  <h4 class="text-2xl font-semibold">
                    We value your feedbacks
                  </h4>
                  <div class="relative w-full mb-3 mt-8">
                    <label
                      class="
                        block
                        uppercase
                        text-gray-700 text-xs
                        font-bold
                        mb-2
                      "
                      for="full-name"
                      >Name (optional)</label
                    ><input
                      type="text"
                      class="
                        border-0
                        px-3
                        py-3
                        placeholder-gray-400
                        text-gray-700
                        bg-white
                        rounded
                        text-sm
                        shadow
                        focus:outline-none focus:ring
                        w-full
                      "
                      v-model="feedBack.name"
                      placeholder="Name"
                      style="transition: all 0.15s ease 0s"
                    />
                  </div>

                  <div class="relative w-full mb-3">
                    <label
                      class="
                        block
                        uppercase
                        text-gray-700 text-xs
                        font-bold
                        mb-2
                      "
                      for="message"
                      >Message</label
                    ><textarea
                      rows="4"
                      cols="80"
                      class="
                        border-0
                        px-3
                        py-3
                        placeholder-gray-400
                        text-gray-700
                        bg-white
                        rounded
                        text-sm
                        shadow
                        focus:outline-none focus:ring
                        w-full
                      "
                      placeholder="Type a message..."
                      v-model="feedBack.feedback"
                    ></textarea>
                  </div>
                  <div class="text-center mt-6">
                    <button
                      class="
                        bg-gray-900
                        text-white
                        active:bg-gray-700
                        text-sm
                        font-bold
                        uppercase
                        px-6
                        py-3
                        rounded
                        shadow
                        hover:shadow-lg
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                      style="transition: all 0.15s ease 0s"
                      @click="send()"
                    >
                      Send Message
                    </button>
                  </div>
                </div>

                <div
                  v-else
                  class="
                    relative
                    w-full
                    mb-3
                    mt-8
                    p-3
                    text-2xl
                    font-semibold
                    text-center
                  "
                >
                  Thank you for your feedback
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

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
        <div class="flex flex-col md:flex-row gap-2 justify-center items-center">
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
              {{ validbooking.booking.schedule.route.routepath.origin.name }} to
              {{
                validbooking.booking.schedule.route.routepath.destination.name
              }}
            </td>
            <td>
              {{ formatDepartureDate(validbooking.booking.schedule.dateId) }}
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
    <footer-component></footer-component>
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
  width: auto;
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
import NavbarComponent from "../components/Landing/Navbar.vue";
import FooterComponent from "../components/Landing/Footer.vue";
import { getAllBuses } from "../services/busServices";
import { getAllRoutes } from "../services/routeServices";
import { sendFeedback } from "../services/FeedbackServices";
import { getAllBookings, regenerateTicket } from "../services/bookingServices";
import { getAllStops } from "../services/stopServices";

export default {
  name: "landing-page",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      feedBack: {
        name: null,
        feedback: null,
      },
      commented: false,
      buses: 0,
      routes: 0,
      bookings: 0,
      stops: 0,
      regenerateTicketModal: false,
      ticket: {
        contact: null,
        cid: null,
      },
      searchedBookings: [],
      validSearch:false,
    };
  },

  created() {
    console.log("PROCESS ENV", process.env);

    getAllBuses().then((res) => {
      this.buses = res.length;
    });
    getAllRoutes().then((res) => {
      this.routes = res.length;
    });
    getAllBookings().then((res) => {
      this.bookings = res.data.length;
    });
    getAllStops().then((res) => {
      this.stops = res.length;
    });
  },
  methods: {
    goToBooking() {
      this.$router.push("/book");
    },
    theFormat(number) {
      return Math.floor(number);
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
        console.log(this.ticket.cid,this.ticket.contact)
        regenerateTicket(this.ticket.cid, this.ticket.contact).then((res) => {
          if (res.status === 200 && res.data.length !== 0) {
            this.searchedBookings = res.data;
            this.validSearch = true
          } else {
            this.validSearch = false
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
  },
};
</script>