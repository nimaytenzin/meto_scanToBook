<template>
  <nav
    class="
      top-0
      absolute
      z-50
      w-full
      flex flex-wrap
      items-center
      justify-between
      px-2
      py-3
    "
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="
          w-full
          relative
          flex
          justify-between
          lg:w-auto
          lg:static
          lg:block
          lg:justify-start
        "
      >
        <a
          class="
            text-sm
            font-bold
            leading-relaxed
            inline-block
            mr-4
            py-1
            whitespace-nowrap
            uppercase
            text-white
            
          "
          href="#"
          >Meto Transport</a
        >
          <p class="text-sm text-white font-light ">
                   ༅༅ ། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།
                </p>
        <button
          class="
            cursor-pointer
            text-xl
            leading-none
            px-3
            py-1
            border border-solid border-transparent
            rounded
            bg-transparent
            block
            lg:hidden
            outline-none
            focus:outline-none
          "
          type="button"
          v-on:click="toggleNavbar()"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div
        class="
          lg:flex
          flex-grow
          items-center
          bg-white
          lg:bg-transparent
          lg:shadow-none
        "
        v-bind:class="{ hidden: !showMenu, block: showMenu }"
      >
    
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <a
              class="
                lg:text-white
                lg:hover:text-gray-300
                text-gray-800
                px-3
                py-4
                lg:py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
              "
              href="/policy/privacy"
              ><i
                class="
                  lg:text-gray-300
                  text-gray-500
                  fab
                  fa-facebook
                  text-lg
                  leading-lg
                "
              ></i
              ><span class="lg:hidden inline-block ml-2">Privacy Policy</span></a
            >
          </li>
          <li class="flex items-center">
            <a
              class="
                lg:text-white
                lg:hover:text-gray-300
                text-gray-800
                px-3
                py-4
                lg:py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
              "
              href="/policy/refund"
              ><i
                class="
                  lg:text-gray-300
                  text-gray-500
                  fab
                  fa-twitter
                  text-lg
                  leading-lg
                "
              ></i
              ><span class="lg:hidden inline-block ml-2">Refund Policy</span></a
            >
          </li>
        
          <li class="flex items-center">
            <button
              class="
                bg-white
                text-gray-800
                active:bg-gray-100
                text-xs
                font-bold
                uppercase
                px-4
                py-2
                rounded
                shadow
                hover:shadow-md
                outline-none
                focus:outline-none
                lg:mr-1
                lg:mb-0
                ml-3
                mb-3
              "
              type="button"
              style="transition: all 0.15s ease 0s"
              @click="login()"
            >
              <i class="fas fa-arrow-alt-circle-down"></i> Login
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
    },
    login(){
        this.$router.push('/login')
    }
  },
};
</script>