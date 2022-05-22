<template>
  <nav
    id="navBar"
    class="
      z-50
      w-full
      flex flex-wrap
      items-center
      justify-between
      px-2
      py-3
      fixed
      top-0
    "
  >
    <div
     class="container px-4 mx-auto flex  items-center justify-between"
    >
      <div
        class="
       
          relative
          flex
          justify-between
          gap-2
         
        "
      >
       
        <div class="text-white">
          <a
            class="
              text-xs
              md:text-sm
              leading-relaxed
              inline-block
              mr-4
              py-1
              whitespace-nowrap
              uppercase
              font-light
            "
            href="/"
            >Meto Transport</a
          >
          <p class="text-xs md:text-sm font-light">
            ༅༅ ། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།
          </p>
        </div>
       
      </div>

      <div
        class="
          text-white
          flex
          gap-4
          items-center
          text-xs
          md:text-sm
          leading-relaxed
          mr-4
          py-1
          whitespace-nowrap
          uppercase
          font-light
        "
      >
        <!-- <div class="hidden md:block">About Us</div>
        <div class="hidden md:block">Policies</div> -->
        <div class="flex gap-1 items-center" @click="login()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            />
          </svg>
          Login
        </div>
      </div>
    </div>
  </nav>
  
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
};
</script>