<template>
  <div
    class="min-h-screen flex flex-col items-center justify-start w-full"
  >
    <h1 class="text-3xl text-center text-gray-500 font-nunito mx-4 my-6">
        Feedbacks
      </h1>
    <div class="mt-5 w-11/12"> 
      <table class="min-w-full divide-y divide-gray-200 table-auto">
        <thead class="bg-gray-50">
          <tr>
            <td
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              Name
            </td>
            <td
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              Feedback
            </td>
            <td
              class="
                px-6
                py-3
                text-left text-xs
                font-medium
                text-gray-500
                uppercase
                tracking-wider
              "
            >
              Action
            </td>
           
           
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="feedback in feedbacks"
            :key="feedback"
            class="hover:bg-gray-200"
          >
            <td class="px-6 py-4  font-light text-sm">
              {{ feedback.name }}
              
            </td>
            <td class="px-6 py-4 font-light text-sm break-words">
             {{ feedback.feedback }}
            </td>
           
            <td class="flex gap-2">
              <button
                @click="deleteF(feedback)"
                class="
                  p-1
                  bg-gray-600
                  text-gray-100
                  rounded-sm
                  m-2
                "
              >
                Delete
              </button>
              
            </td>
          </tr>
        </tbody>
      </table>


     
    </div>


    

  </div>

  
</template>

<script>
import {
  getAll,
  deleteFeedback,
  updateFeedback
}from '../../services/FeedbackServices'
export default {
  created() {
    getAll().then((res)=>{
        console.log(res)
        this.feedbacks = res.data
    })
  },
  data() {
    return {
     feedbacks:[]
    };
  },
  methods: {
    openConfirmModal(booking) {
      this.bookingSelected = booking;
      this.confirmModal = true
    },

    dismiss(e){
      updateFeedback(e.id,{
        dismissed:true
      }).then(res =>{
        if(res.status === 200){
          this.$toast.show("Success",{
            position:"top",
            type:"info"
          })
          this.refreshData()
        }
      })
    },

    deleteF(e){
      deleteFeedback(e.id).then(res =>{
        console.log(res)
        if(res.status === 200){
          this.$toast.show("Success",{
            position:"top",
            type:"info"
          })
          this.refreshData()
        }
      })
    },
    refreshData() {
      getAll().then((res) => {
        this.feedbacks = res.data;
      });
    },
  },
};
</script>