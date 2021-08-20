import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = "http://www.meto-transport.com/bpi"


export async function deleteRouteDaysbyRouteId(id){
   return await axios.delete(`${devUrl}/schedules/route/${id}`)
}

