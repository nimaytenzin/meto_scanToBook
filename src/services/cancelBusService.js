import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API


export async function getAllCancelledBus(pageno) {
    return await axios.get(`${devUrl}/cancelled-route-date/all/${pageno}`)
}


          
