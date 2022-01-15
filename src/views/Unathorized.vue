<template>
  <div class="min-h-screen flex items-center justify-center bg-White">
    <div class="max-w-md w-full space-y-8">
      <div class="mt-8 space-y-6">
        <div
          class="
            rounded-md
            -space-y-px
            flex
            justify-center
            flex-col
            items-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd"
            />
          </svg>

          <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-800">
            Unathorized
          </h2>
          <hr class="border-gray-300 w-2/3 mt-12 mb-12 border-dashed" />
          <a @click="$router.go(-1)">

             <button class="text-gray-200 text-center p-1 my-2 bg-gray-800 rounded">
               Go Back
          </button>
          </a>
        
        </div>
        
        <div class="flex flex-col items-center">
          <h1 class="text-left text-sm text-gray-500">Meto Transport</h1>
          <h1 class="text-left text-sm text-gray-500">
            ༅༅ ། མེ ཏོག སྐྱེལ འདྲེན ཞབས ཏོག།
          </h1>
        </div>

        <div></div>
      </div>
    </div>
  </div>
</template>


<script>
import { login } from "../services/authServices";
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      login(this.user)
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          let role = VueJwtDecode.decode(res.data.token).role;

          if (role !== 0) {
            this.$router.push("/admin");
          } else {
            this.$router.push("/book");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

