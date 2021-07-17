<template>
   <div  class="grid justify-items-center home w-auto">

    <Seats/>
  </div>

</template>

<script>

    import Seats from '@/components/ScanToBookComponents/Seats.vue'

    export default {
      name: 'Home',
      components: {
        Seats
      }
    }
</script>