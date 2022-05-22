import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API


export async function getScheduleByDate(date) {
    let schedules = [];
    const response = await axios.get(`${devUrl}/schedules/date/${date}`,{
        headers: authHeader()
      })
        .then(res => {
            schedules = res.data
        })
        .catch(err => console.log(err))
    return schedules
}

export async function getPassengerDataBySchedule(scheduleId){
    return await axios.get(`${devUrl}/schedules/schedule-passenger/${scheduleId}`)
}

export async function getDetailsByDate(date) {
    let schedules = [];
    const response = await axios.get(`${devUrl}/schedules/details/${date}`,{
        headers: authHeader()
      })
        .then(res => {
            schedules = res.data
        })
        .catch(err => console.log(err))
    return schedules
}

export async function addNewSchedule(data){
    return await axios.post(`${devUrl}/schedules`,data,{headers:authHeader()})

}

export async function getPassengerData(scheduleId){
    return await axios.get(`${devUrl}/schedules/${scheduleId}`)
}

export async function getScheduleByRouteAndDate(routeId,date){
    return await axios.get(`${devUrl}/schedules/get-rid-date/${routeId}/${date}`)
}

export async function getSchedulesBetween(from,to){
    return await axios.get(`${devUrl}/schedules/between/${from}/${to}`)
}

export async function getMiniDetailsById(scheduleId){
    return await axios.get(`${devUrl}/schedules/mini/${scheduleId}`)
}

export async function deleteScheduleByRouteId(id){
   return await axios.delete(`${devUrl}/schedules/route/${id}`,{headers:authHeader()})
}
export async function assignBus(id,data){
    return await axios.put(`${devUrl}/schedules/${id}`,data,{headers:authHeader()})
}

export async function getBusNumber(bookingId){
    return await axios.get(`${devUrl}/schedules/busdetails/${bookingId}`)        
} 

export async function updateSchedule(scheduleId,data){
    return await axios.put(`${devUrl}/schedules/${scheduleId}`,data,{headers:authHeader()})
}

export async function getScheduleDetailsById(scheduleId){
    return await axios.get(`${devUrl}/schedules/${scheduleId}`)
}


export async function getPassengersByScheduleHash(hash){

    return await axios.get(`${devUrl}/passenger/psch/${hash}`)
}
