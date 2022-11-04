
import { createStore } from 'vuex'

export default createStore({
  state: {
    origin:"",
    destination:"",
    departureDate:'',
    indexMatchedRoutes:[],
    formattedDepartureDate:"",
    selectedSchedule:null,
    selectedScheduleHash:null,
    counterCreateBookingId:null,

    // unused
    scanBookingId:null,
    selectedBus:'',
    selectedSeats:[],
    selectedDate:"",
    total:0,
    stops:null,
    scanRoomID:null,
    serviceCharge:null,
   
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
    },
    tokenVerified:false,
    numberOfPassengers:null,

  },
  mutations: {

    //Matched Routes == on day click ..if day.weekday == route/subroute.weekday = push to mattchedroutes
    commitIndexMatchedRoutes(state,matchedRoutes){
      state.indexMatchedRoutes = matchedRoutes
    },
    commitSelectedDate(state,data){
      state.departureDate = data
    },  
    commitFormattedDepartureDate(state,date){
      state.formattedDepartureDate = date
    },
    addOrigin(state,origin){
      state.origin = origin;
    }, 
    addDestination(state,destination){
      state.destination = destination
    }, 

    clearStoreMatchedRoutes(state){
      console.log("CLEARED STORE MATCHED ROUTES")
      state.indexMatchedRoutes = []
      console.log(state.indexMatchedRoutes)
    },
    resetStoreState(state){
      console.log("STore REsET - Proceed for newBooking Meto-webService")
      state.indexMatchedRoutes =[]
      state.origin = ""
      state.destination= ""
      state.indexMatchedRoutes =[]
      state.departureDate = '';
      state.formattedDepartureDate =''
      state.selectedSchedule = null
      state.selectedScheduleHash = null
      state.selectedSeats = []
    },
    resetSelectedSeats(state){
      state.selectedSeats = [];
    },

    //reset when going back from the seat selection
    resetStorePartially(state){
      state.selectedSchedule=null,
      state.selectedScheduleHash =null
      state.selectedSeats=[]
      console.log("STORE STATE Partial RESET")
    },

    addSelectedSchedule(state,data){
      state.selectedSchedule = data
    },
    commitSelectedScheduleHash(state, data){
      state.selectedScheduleHash = data
    },

    addCounterCreateBookingID(state, id){
      state.counterCreateBookingId = id
      sessionStorage.setItem("bookingId",id)
    },

    addScanBookingId(state, id){
      state.scanBookingId = id
    },

    addNumberOfPassengers(state, data){
      state.numberOfPassengers = data;
    },


    // END OF USED COMMITS//


  


    addDepartureDate(state,date){
      state.departureDate = date
    },
   
    addServiceCharge(state,serviccharge){
      state.serviceCharge = serviccharge
    }, 
  


    //UNUsed


    
    
    commitStops(state,stopData){
      state.stops  = stopData
    }, //used
   
   
    addSeats(state,seats){
     state.selectedSeats.push(seats);
    },
    resetSelecteSeats(state){
      state.selectedSeats = []
    },
    commitScanRoomId(state,data){
      state.scanRoomID = data
    },
    removeSeat(state,selectedSeat){
      state.selectedSeats.forEach((seat,index) =>{
        if(selectedSeat.id === seat.id){
            state.selectedSeats.splice(index,1)
        }
      })
    },
    clearSelectedSeats(state){
      state.selectedSeats =[]
    },
    commitAvailableRoute(state,routes){
      state.avaialableRoutes = routes
    },
    //used
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
  

    //book from the frontend
    commitSchedule(state,schedule){
      state.customerBooking.schedule = schedule
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
