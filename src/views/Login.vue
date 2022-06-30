<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    
      <div class="w-10/12 md:w-2/12 mt-8 space-y-6">
         <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in
        </h2>
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
              bg-metoPrimary-600
              hover:bg-metoPrimary-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-metoPrimary-500
            "
            @click="login()"
          >
            Sign in
          </button>
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
          switch(role){
            case 1:
              this.$router.push("/admin");
              break;
            case 2:
              this.$router.push("/finance");
              break;
            case 3:
              this.$router.push("/staff");
              break;
            case 4:
              this.$router.push("/superadmin");
              break;
            default:
              this.$router.push("/login");
              break;
          }
  
        })
        .catch((err) => {
          this.$toast.show("Inavalid Credentials")
        });
    },
  },
};
</script>

