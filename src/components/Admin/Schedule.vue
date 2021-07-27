<template>
  <div class="min-h-screen flex flex-col p-4 justify-center items-center">
    <h1>
      Schedule Bus
    </h1>
    
    <h2 class="text-xl m-2">
       Click on a date to view Schedule for that date
    </h2>

   <Calendar
   :min-date='new Date()'
  :columns="$screens({ default: 1, lg: 2 })"
  :rows="$screens({ default: 1, lg: 2 })"
  :is-expanded="$screens({ default: true, lg: false })"
  @dayclick="onDayClick($event)"
  />
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      date: new Date(),
    };
  },
  methods:{
    p(e){
      console.log(e)
    },
    onDayClick(e){
      console.log(e)
    }
  }
};
</script>