<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center sm:ml2 sm:mr2"
  >
    <div>
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center font-nunito">
        Feedbacks
      </h1>

      <div
        class="
          flex flex-col
          m-auto
          bg-indigo-900
          text-blue-100
          p-6
          gap-8
          rounded-lg
          border-white
          mt-4
        "
      >
        <div class="flex justify-around">
          <div class="my-auto">
            <div class="text-lg">Feedbacks</div>
            <div class="text-4xl text-white font-bold text-center">
              {{ feedbacks.length }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5"> 
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
                @click="dismiss(feedback)"
                class="
                  h-10
                  px-5
                  text-indigo-100
                  transition-colors
                  duration-100
                  bg-blue-700
                  rounded-lg
                  focus:shadow-outline
                  hover:bg-indigo-800
                "
              >
                Dismiss
              </button>
              <button
                @click="dismiss(feedback)"
                class="
                  h-10
                  px-5
                  text-indigo-100
                  transition-colors
                  duration-100
                  bg-indigo-700
                  rounded-lg
                  focus:shadow-outline
                  hover:bg-indigo-800
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

    delete(e){
      deleteFeedback(e.id).then(res =>{
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