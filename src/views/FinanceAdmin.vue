<template>
  <div class="antialiased w-full h-screen flex justify-center overflow-y-scroll " >
   <router-view> </router-view> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>
