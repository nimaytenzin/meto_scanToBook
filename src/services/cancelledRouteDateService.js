import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API


export async function getCancelledRoutesByRouteId(routeId) {
    return await axios.get(`${devUrl}/cancelled-route-date/route-id/${routeId}`)
}

export async function addNewCancelledRouteDate(data){
    return await axios.post(`${devUrl}/cancelled-route-date`,data,{headers:authHeader()})

}

export async function getCancelledRoutesByDate(date) {
    return await axios.get(`${devUrl}/cancelled-route-date/date/${date}`)
}

export async function deleteByDateAndRoute(data) {
    return await axios.post(`${devUrl}/cancelled-route-date/delete-by-routedate`,data,{headers:authHeader()})
}


          
