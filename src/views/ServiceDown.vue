<template>
  <div class="min-h-screen flex items-center justify-center bg-White">
    <div class="max-w-md w-full space-y-8">
      <div class="flex flex-col items-center">
       
      </div>
      <div class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md  -space-y-px flex justify-center flex-col items-center">
          <img
            style="
              -webkit-user-select: none;
              margin: auto;
              background-color: hsl(0, 0%, 90%);
              transition: background-color 300ms;
            "
            src="https://cdn.dribbble.com/users/485324/screenshots/2514828/service_down_page.gif"
            width="762"
            height="571"
            rel="preload"
          />

           <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-800">
          Serivce Down
        </h2>
        <p class="text-gray-500 text-center">
          Our Developers are fixing the issues. <br>
          Thank you for your patience
        </p>
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

