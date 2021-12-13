import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API



export async function deleteRouteDaysbyRouteId(id){
   return await axios.delete(`${devUrl}/schedules/route/${id}`,{headers:authHeader()})
}

