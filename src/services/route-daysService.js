import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = "http://localhost:3000"


export async function deleteRouteDaysbyRouteId(id){
   return await axios.delete(`${devUrl}/schedules/route/${id}`)
}

