import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API






export async function updateBookedSeat(id,data){
    return await axios.put(`${devUrl}/booked-seats/${id}`,data,{headers:authHeader()})
}
export async function getBookedSeatsByScheduleBookingId(bookingId,scheduleId){
    return await axios.get(`${devUrl}/booked-seats/bookingschedule/${bookingId}/${scheduleId}`,{headers:authHeader()})
}






