import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = "http://localhost:3000"


export async function addNewBooking(booking){
    return await axios.post(`${devUrl}/bookings`,booking)

}


