import { createStore } from 'vuex'

export default createStore({
  state: {
    origin:"",
    destination:"",
    departureDate:'',
    selectedBus:'',
    selectedSeats:[],
    total:0,
    bookedBy:{}
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
      state.selectedSeats = state.selectedSeats.concat(seats);
    },
    addTotal(state,total){
      state.total = total
    },
    addBookedBy(state, data){
      state.bookedBy = data
    }
  },
  actions: {
  },
  modules: {
  }
})
