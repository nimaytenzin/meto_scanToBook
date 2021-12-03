import axios from 'axios'
import authHeader from './auth-HeaderServices'

const devUrl = process.env.VUE_APP_DEV_API


export async function getDailyStatistics() {
     return await axios.get(`${devUrl}/daily-statistics`,{headers:authHeader()})
}

