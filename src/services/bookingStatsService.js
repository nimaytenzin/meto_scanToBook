import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API


export async function getStaffStatsToday(){
    return await axios.get(`${devUrl}/booking-stat/today-staff`,{headers:authHeader()})
}

export async function getRouteStatsToday(){
    return await axios.get(`${devUrl}/booking-stat/today-routes`,{headers:authHeader()})
}

export async function getStatsByModalityToday(){
    return await axios.get(`${devUrl}/booking-stat/today-modality`,{headers:authHeader()})
}



