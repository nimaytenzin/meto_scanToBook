import axios from 'axios'
import authHeader from './auth-HeaderServices';
const devUrl = process.env.VUE_APP_DEV_API






export async function confirmPayment(data) {
    return await axios.post(`${devUrl}/bookings/confirmbooking/`,data,{headers:authHeader()})
}
export async function editStop(id, data) {
    return await axios.put(`${devUrl}/stops/${id}`, data,{headers:authHeader()})
}
