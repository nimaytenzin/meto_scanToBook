<template>
  <div>
    <navbar-component></navbar-component>

    <main>
      Refund Policy
    </main>
         
    <footer-component></footer-component>
  </div>
</template>
<script>
import NavbarComponent from "../components/Landing/Navbar.vue";
import FooterComponent from "../components/Landing/Footer.vue";

import { sendFeedback} from '../services/FeedbackServices'
export default {
  name: "landing-page",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      feedBack:{
        name:null,
        feedback:null
      },
      commented:false

    }
    
    },
  methods: {
    goToBooking() {
      this.$router.push("/book");
    },
    theFormat(number) {
      return Math.floor(number);
    },

    send() {
      if(this.feedBack.feedback){
        sendFeedback(this.feedBack).then(res =>{
          if(res.status === 201){
            this.commented = true
            this.$toast.show("Thank you for your comment",{
              position:"top",
              type:"success"
            })
          }
        })
      }else{
        this.$toast.show("Please type something",{
          position:"top",
          type:"error"
        })
      }
    },
  },
};
</script>