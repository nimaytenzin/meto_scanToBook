<template>
  
   <div>
       <router-view></router-view>

   </div>
</template>

<script>

    
    import Origin from '@/components/ScanToBookComponents/Origin.vue'
    export default {
      name: 'Home',
      components: {
        Origin
        
      }
    }
</script>

