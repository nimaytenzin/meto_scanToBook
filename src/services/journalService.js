import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API


export async function getAllJournalsToday() {
    return await axios.get(`${devUrl}/booking-stat/journals-today`,{headers:authHeader()})
}

export async function getJournalsByDate(date) {
    return await axios.get(`${devUrl}/booking-stat/journal/date/${date}`,{headers:authHeader()})
}
