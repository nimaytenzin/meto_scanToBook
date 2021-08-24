import { integer } from '@vuelidate/validators';
import { createStore } from 'vuex'

export default createStore({
  state: {
    origin:"",
    scanBookingId:null,
    destination:"",
    departureDate:'',
    selectedBus:'',
    selectedSeats:[],
    selectedDate:"",
    total:0,
    bookedBy:{},
    authToken:'',
    schedules:[],
    customerBooking:{
      schedule:{},
      total:0,
      seats:[],
      customer:{
        customerName:'',
        cutomerContact:0,
        customerCid:''
      }
    }
  },
  mutations: {
    addOrigin(state,origin){
      state.origin = origin;
    },
    addDestination(state,destination){
      state.destination = destination
    },
    addDepartureDate(state,date){
      state.departureDate = date
    },
    addBus(state,bus){
      state.selectedBus = bus
    },
    addSeats(state,seats){
     state.selectedSeats.push(seats);
    },
    removeSeat(state,selectedSeat){
      state.selectedSeats.forEach((seat,index) =>{
        if(selectedSeat.id === seat.id){
            state.selectedSeats.splice(index,1)
        }
      })
    },
    resetSeats(state){
      state.selectedSeats =[]
    },
    addTotal(state,total){
      state.total = total
    },
    addBookedBy(state, data){
      state.bookedBy = data
    },
    addAuthorizationToken(state, authToken){
      state.authToken = authToken
    },
    addSchedules(state, schedules){
      state.schedules = schedules
    },
    addScanBookingId(state, id){
      state.scanBookingId = id
    },

    //book from the frontend
    commitSchedule(state,schedule){
      state.customerBooking.schedule = schedule
    },
    commitCustomerTotal(state,total){
      state.customerBooking.total = total
    },
    commitCustomerSeats(state,seats){
      state.customerBooking.seats = state.customerBooking.seats.concat(seats);
    },
    commitCustomerDetails(state, details){
      state.customerBooking.customer = details
    },

    commitSelectedDate(state,data){
      state.selectedDate = data
    },
    
    commitRemoveCustomerSeat(state,selectedSeat){
      state.customerBooking.seats.forEach((seat,index) =>{
        if(selectedSeat.id === seat.id){
            state.customerBooking.seats.splice(index,1)
        }
      })
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    origin: state => {
      return state.origin
    }
  }
})
