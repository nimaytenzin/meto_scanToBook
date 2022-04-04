<template>
  <div class="relative min-h-screen md:flex">
    <!-- mobile menu bar -->
    <div class="bg-gray-800 text-gray-100 flex justify-between md:hidden">
      <!-- logo -->
      <a href="" class="block p-4 text-white font-bold">Meto Transport</a>

      <!-- moble menu button -->
      <button
        class="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
        @click="openSideBar()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Side bar--->
    <div
      class="
        side-bar
        bg-indigo-900
        text-blue-100
        w-64
        space-y-6
        px-2
        py-7
        absolute
        inset-y-0
        left-0
        transform
        -translate-x-full
        transistion
        duration-200
        ease-in-out
        md:relative
        md:translate-x-0
      "
    >
      <!-- logo -->

      <a href="#" class="text-white flex items-center space-x-2">
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span class="text-2xl font-extrabold"> Meto Transport </span>
      </a>

      <nav>
        <router-link to="/superadmin/">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              hover:bg-indigo-700
              hover:text-white
            "
          >
             Today
          </p>
        </router-link>

        

        <router-link to="/superadmin/manage-users">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              hover:bg-indigo-700
              hover:text-white
            "
          >
             Manage Users
          </p>
        </router-link>


         <router-link to="/superadmin/manage-routes">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              hover:bg-indigo-700
              hover:text-white
            "
          >
             Routes
          </p>
        </router-link>

        <router-link to="/superadmin/schedules">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              hover:bg-indigo-700
              hover:text-white
            "
          >
             Schedules
          </p>
        </router-link>
        
         <router-link to="/superadmin/statistics">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              hover:bg-indigo-700
              hover:text-white
            "
          >
             Statistics & Trends
          </p>
        </router-link>

        <router-link to="/superadmin/journals">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              hover:bg-indigo-700
              hover:text-white
            "
          >
             Transcation Journals
          </p>
        </router-link>
        

         <router-link to="/superadmin/cancellations">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              hover:bg-indigo-700
              hover:text-white
            "
          >
             Cancellations
          </p>
        </router-link>

        <a href="https://bfssecure.rma.org.bt/BFSSecure/login" target="_blank">

           <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              hover:bg-indigo-700
              hover:text-white
            "
          >
            RMA PG-Secure Transcations
          </p>
        </a>

         <router-link to="/superadmin/manage-buses">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              hover:bg-indigo-700
              hover:text-white
            "
          >
             Buses
          </p>
        </router-link>


         <router-link to="/superadmin/feedbacks">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              hover:bg-indigo-700
              hover:text-white
            "
          >
             Feedbacks
          </p>
        </router-link>
       
       
        <div>
          <p
            class="
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              hover:bg-indigo-700
              hover:text-white
              flex
              items-center
              gap-2
            "
            @click="logout()"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log Out
          </p>
        </div>
      </nav>
    </div>

    <!---- COntent -->

    <div class="flex-1">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openSideBar() {
      const sidebar = document.querySelector(".side-bar");
      sidebar.classList.toggle("-translate-x-full");
    },
    logout(){
      sessionStorage.removeItem('token')
      this.$router.push("/login")
    }
  },
};
</script>
