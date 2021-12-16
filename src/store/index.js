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
    stops:null,
    serviceCharge:null,
    selectedSchedule:null,
    avaialableRoutes:[],
    bookedBy:{},
    authToken:'',
    selectedRoutes:[],
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
    resetStoreState(state){
      state.selectedSeats =[]
      state.origin = ""
      state.destination= ""
      state.selectedSchedule =""
      
    },
    addOrigin(state,origin){
      state.origin = origin;
    },  //used
    commitStops(state,stopData){
      state.stops  = stopData
    }, //used
    addDestination(state,destination){
      state.destination = destination
    },  //used
    addDepartureDate(state,date){
      state.departureDate = date
    },
    addSelectedSchedule(state,data){
      state.selectedSchedule = data
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
    commitAvailableRoute(state,routes){
      state.avaialableRoutes = routes
    },
    addServiceCharge(state,serviccharge){
      state.serviceCharge = serviccharge
    }, //used
    addMatchedRoutes(state, data){
      state.selectedRoutes = data
    }, //used
    addTotal(state,total){
      state.total = total
    }, //used
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
    commitSelectedDate(state,data){
      state.departureDate = data
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
    },
    getDepartureDate: state =>{
      return state.departureDate
    },
    getSelectedSchedule:state =>{
      return state.selectedSchedule
    }

  }
})
