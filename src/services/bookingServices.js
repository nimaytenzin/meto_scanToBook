import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = "http://localhost:3000"


export async function addNewBooking(booking){
    return await axios.post(`${devUrl}/bookings`,booking)

}

export async function getBookingDetail(id){
    return await axios.get(`${devUrl}/bookings/${id}`)
}

export async function cancelBooking(id,data){
    return await axios.put(`${devUrl}/bookings/${id}`,data)
}

export async function getAllCanelled(){
    return await axios.get(`${devUrl}/bookings/cancelled`)
}



