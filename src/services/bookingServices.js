import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API



export async function addNewBooking(booking){
    return await axios.post(`${devUrl}/bookings`,booking)

}

export async function getChecksum(bookingId){
    return await axios.get(`${devUrl}/bookings/checksum/${bookingId}`)
}


export async function getOverAllStats(){
    return await axios.get(`${devUrl}/bookings/stats`)
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


export async function getCancelledBooking(){
    return await axios.get(`${devUrl}/bookings/cancelledBookings`,{headers:authHeader()})
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


export async function getBookingsByRouteAndScheduleDate(routeId,departureDate){
    return await axios.get(`${devUrl}/bookings/get-route-date/${routeId}/${departureDate}`,{headers:authHeader()})
}


export async function getPassengerDetailsByScheduleHash(scheduleHash){
    return await axios.get(`${devUrl}/passenger/schedule/${scheduleHash}`,{headers:authHeader()})
}

export async function getPendingBookingsByRouteId(routeId){
    return await axios.get(`${devUrl}/bookings/pending-bookings-routeId/${routeId}`,{headers:authHeader()})
}
export async function getPendingBookingsByScheduleHash(scheduleHash){
    return await axios.get(`${devUrl}/bookings/pending-bookings-schedulehash/${scheduleHash}`,{
        headers:authHeader()
    })
}


export async function publishConfirmedSeats(data){
    return await axios.post(`${devUrl}/bookings/publishSeats`, data,{headers:authHeader()})
}

export async function deleteBookingwithPassengers(bookingID){
    return await axios.delete(`${devUrl}/bookings/${bookingID}`, {headers:authHeader()})
}

//counterbooking routes
export async function addNewCounterBooking(booking){
    return await axios.post(`${devUrl}/bookings/counter`,booking,{headers:authHeader()})

}

export async function counterConfirmPayment(bookingID,data){
    return await axios.post(`${devUrl}/bookings/counterconfirm/${bookingID}`,data, {headers:authHeader()})
}
