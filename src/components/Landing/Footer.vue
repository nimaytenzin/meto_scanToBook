<template>
  <footer class="relative bg-gray-300 ">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 px-4">
          <div class="mt-6">
            <a href="https://www.facebook.com/Meto-Transport-101487815054950">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                viewBox="0 0 24 24"
                width="48px"
                height="48px"
              >
                <path
                  d="M 12 2 C 6.477 2 2 6.477 2 12 C 2 17.523 6.477 22 12 22 C 17.523 22 22 17.523 22 12 C 22 6.477 17.523 2 12 2 z M 12 4 C 16.418 4 20 7.582 20 12 C 20 15.934398 17.156174 19.198143 13.414062 19.867188 L 13.414062 15.035156 L 15.779297 15.035156 L 16.130859 12.310547 L 13.429688 12.310547 L 13.429688 10.574219 C 13.429687 9.7862188 13.649297 9.2539062 14.779297 9.2539062 L 16.207031 9.2539062 L 16.207031 6.8222656 C 15.512031 6.7512656 14.814234 6.71675 14.115234 6.71875 C 12.041234 6.71875 10.621094 7.9845938 10.621094 10.308594 L 10.621094 12.314453 L 8.2773438 12.314453 L 8.2773438 15.039062 L 10.621094 15.039062 L 10.621094 19.873047 C 6.861695 19.218214 4 15.946666 4 12 C 4 7.582 7.582 4 12 4 z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="flex flex-wrap items-top mb-6">
            <div class="w-full lg:w-4/12 px-4 ml-auto">
              <span
                class="block uppercase text-gray-600 text-sm font-semibold mb-2"
                >Contact Us</span
              >
              <ul class="list-unstyled">
                <li>Contact : +975 17766997</li>

                <!-- <li>
                  <a
                    class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                    href="https://www.creative-tim.com/bootstrap-themes/free"
                    >Free Products</a
                  >
                </li> -->
              </ul>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <span
                class="block uppercase text-gray-600 text-sm font-semibold mb-2"
                >Policies</span
              >
              <ul class="list-unstyled">
                <!-- <li>
                  <a
                    class="
                      text-gray-700
                      hover:text-gray-900
                      font-semibold
                      block
                      pb-2
                      text-sm
                    "
                    href="/policy/refund"
                    >Refund Policy</a
                  >
                </li> -->
                <li>
                  <a
                    class="
                      text-gray-700
                      hover:text-gray-900
                      font-semibold
                      block
                      pb-2
                      text-sm
                    "
                    href="/policy/privacy"
                    >Privacy Policy</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
     
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-gray-600 font-semibold py-1">
            Copyright © {{ date }} Meto Transport Service.
           
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>