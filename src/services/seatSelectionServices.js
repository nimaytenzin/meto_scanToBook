import axios from 'axios'
import authHeader from './auth-HeaderServices';
const devUrl = process.env.VUE_APP_DEV_API


export async function getSeatsStatus(scheduleHash, bookingId) {
    return  await axios.get(`${devUrl}/passenger/loadseatStatus/${scheduleHash}/${bookingId}`)
}



export async function getSeatsStatusadmin(scheduleHash) {
    return  await axios.get(`${devUrl}/passenger/getSeatStatusAdmin/${scheduleHash}`)
}

export async function lockSeat(data) {
    return  await axios.post(`${devUrl}/passenger/lockseat`,data)
}

export async function leaveSeat(data) {
    return  await axios.post(`${devUrl}/passenger/leaveseat`,data)
}


export async function confirmSeat(id) {
    return  await axios.post(`${devUrl}/passenger/confirmSeat/${id}`)
}
export async function confirmSeatUsingBookingId(id){
    return  await axios.post(`${devUrl}/passenger/confirmSeat/bookingId/${id}`) 
}
export async function updateSeatToInPaymentUsingBookingId(id){
    return  await axios.post(`${devUrl}/passenger/inpayment/bookingId/${id}`) 
}

export async function getSeatDetailsadmin(seatNumber,scheduleHash){
    return await axios.get(`${devUrl}/passenger/getSeatDetails/${scheduleHash}/${seatNumber}`,{headers:authHeader()})
}

export async function counterDeleteBookingWithPassenger(bookingId){
    return await axios.delete(`${devUrl}/passenger/deletebooking/${bookingId}`,{headers:authHeader()})
}