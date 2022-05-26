<template>
  <nav
    id="navBar"
    class="
      z-50
      w-full
      flex flex-wrap
      items-center
      justify-between
      absolute
      top-0
      my-4 
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
       
      <div class="flex gap-2 items-center">
        <div>
          <img src="../../assets/meto.png" alt="" class="w-12 bg-white rounded-full">
        </div>
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
              font-bold
            "
            href="/"
            >Meto Transport</a
          >
          <p class="text-xs md:text-sm font-bold">
            ༅༅ ། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།
          </p>
        </div>
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

        <a href="tel:+97517766997">
         <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
         <p class="text-xs md:text-base">
            Contact
         </p>
         </div>
        </a>
        <div class="flex gap-1 items-center" @click="login()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="hidden md:block">
            Login
          </p>
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