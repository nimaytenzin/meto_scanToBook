<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div class="flex flex-col items-center">
        <img src="../assets/meto.png" alt="Meto Transport" width="100" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in
        </h2>
      </div>
      <div class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label class="sr-only">User Name</label>
            <input
              type="text"
              v-model="user.email"
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="UserName"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="user.password"
              type="password"
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-b-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            "
            @click="login()"
          >
            Sign in
          </button>
        </div>
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
          if (role === 1) {
            this.$router.push("/admin");
          }else if(role === 2){
            this.$router.push("/finance");
          }else if(role === 3){
            this.$router.push("/staff");

          }else {
            this.$router.push("/book");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

