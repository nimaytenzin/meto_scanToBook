import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = "http://www.meto-transport.com/bpi"





export async function updateBookedSeat(id,data){
    return await axios.put(`${devUrl}/booked-seats/${id}`,data)
}
export async function getBookedSeatsByScheduleBookingId(bookingId,scheduleId){
    return await axios.get(`${devUrl}/booked-seats/bookingschedule/${bookingId}/${scheduleId}`)
}






