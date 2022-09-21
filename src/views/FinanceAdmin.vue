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
        bg-metoPrimary-900
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

      <span class="text-xl px-4">Finance Admin </span>

      <nav>
        <router-link to="/finance/">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              
              hover:bg-metoPrimary-700
              hover:text-white
            "
          >
             Today
          </p>
        </router-link>

  <router-link to="/finance/challan">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              
              hover:bg-metoPrimary-700
              hover:text-white
            "
          >
             Challan Closings
          </p>
        </router-link>
         <!-- <router-link to="/finance/statistics">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              
              hover:bg-metoPrimary-700
              hover:text-white
            "
          >
             Statistics & Trends
          </p>
        </router-link> -->

         <!-- <router-link to="/finance/journals">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              
              hover:bg-metoPrimary-700
              hover:text-white
            "
          >
             Transcation Journals
          </p>
        </router-link> -->
        

         <!-- <router-link to="/finance/cancellations">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              
              hover:bg-metoPrimary-700
              hover:text-white
            "
          >
             Cancellations
          </p>
        </router-link> -->
         <router-link to="/finance/bookings">
          <p
            class="
              block
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              
              hover:bg-metoPrimary-700
              hover:text-white
            "
          >
            Bookings
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
              
              hover:bg-metoPrimary-700
              hover:text-white
            "
          >
            RMA PG-Secure Transcations
          </p>
        </a>
       
       
        <div>
          <p
            class="
              py-2.5
              px-4
              rounded
              transistion
              duration-200
              
              hover:bg-metoPrimary-700
              hover:text-white
              flex
              items-center
              gap-2
            "
            @click="logout()"
          >
            Log Out
          </p>
        </div>
      </nav>
    </div>

    <!---- COntent -->

    <div class="flex-1 overflow-x-scroll">
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
