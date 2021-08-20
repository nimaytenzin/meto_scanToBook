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

export async function addNewSchedule(data){
    return await axios.post(`${devUrl}/schedules`,data)

}

export async function getPassengerData(scheduleId){
    return await axios.get(`${devUrl}/schedules/${scheduleId}`)
}

export async function getSchedulesBetween(from,to){
    return await axios.get(`${devUrl}/schedules/between/${from}/${to}`)
}

export async function deleteScheduleByRouteId(id){
   return await axios.delete(`${devUrl}/schedules/route/${id}`)
}
export async function assignBus(id,data){
    return await axios.put(`${devUrl}/schedules/${id}`,data)
}

export async function getBusNumber(bookingId){
    return await axios.get(`${devUrl}/schedules/busdetails/${bookingId}`)        
} 

export async function updateSchedule(scheduleId,data){
    return await axios.put(`${devUrl}/schedules/${scheduleId}`,data)
}
