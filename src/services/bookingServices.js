import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API



export async function addNewBooking(booking){
    return await axios.post(`${devUrl}/bookings`,booking,{headers:authHeader()})

}

export async function getChecksum(bookingId){
    return await axios.get(`${devUrl}/bookings/checksum/${bookingId}`,{headers:authHeader()})
}

export async function getAllBookings(){
    return await axios.get(`${devUrl}/bookings`,{headers:authHeader()})
}

export async function getBookingDetail(id){
    return await axios.get(`${devUrl}/bookings/${id}`,{headers:authHeader()})
}

export async function cancelBooking(id,data){
    return await axios.put(`${devUrl}/bookings/cancel/${id}`,data,{headers:authHeader()})
}

export async function updateBooking(id,data){
    return await axios.put(`${devUrl}/bookings/${id}`,data,{headers:authHeader()})
}


export async function getAllCanelled(){
    return await axios.get(`${devUrl}/bookings/cancelled`,{headers:authHeader()})
}

export async function getBookingsByScheduleId(id){
    return await axios.get(`${devUrl}/bookings/scheduleId/${id}`)
}


export async function regenerateTicket(cid,contact){
    return await axios.get(`${devUrl}/bookings/regenerate/${contact}/${cid}`)
}


export async function getCancelCode(bookingId){
    return await axios.get(`${devUrl}/bookings/cancelcode/${bookingId}`)
}

export async function getBusbyBookingId(id){
    return await axios.get(`${devUrl}/bookings/get-bus/${id}`)
}



export async function getPassengersOnBus(routeId,departureDate){
    return await axios.get(`${devUrl}/bookings/get-route-date/${routeId}/${departureDate}`)
}
