import axios from 'axios'
import authHeader from './auth-HeaderServices'

const devUrl = process.env.VUE_APP_DEV_API


export async function todaysAllData() {
     return await axios.get(`${devUrl}/bookings/today-all`,{headers:authHeader()})
}

export async function getTodayAllPaginated(pageNo) {
     return await axios.get(`${devUrl}/bookings/today-all-paginated/${pageNo}`)
 }

export async function todaysMbobData() {
     return await axios.get(`${devUrl}/bookings/today-mbob`,{headers:authHeader()})
}
export async function todaysCashData() {
     return await axios.get(`${devUrl}/bookings/today-cash`,{headers:authHeader()})
}
export async function todaysOnlineData() {
     return await axios.get(`${devUrl}/bookings/today-online`,{headers:authHeader()})
}

export async function todaysCancelledData() {
     return await axios.get(`${devUrl}/bookings/today-cancelled`,{headers:authHeader()})
}

export async function getTodayMbobPaginated(pageNo) {
     return await axios.get(`${devUrl}/bookings/today-mbob-paginated/${pageNo}`)
 }

 export async function getTodayOnlinePaginated(pageNo) {
     return await axios.get(`${devUrl}/bookings/today-online-paginated/${pageNo}`)
 }
 export async function getTodayCashPaginated(pageNo) {
     return await axios.get(`${devUrl}/bookings/today-cash-paginated/${pageNo}`)
 }

//  today-cancelled-paginated

export async function getTodayCancelledPaginated(pageNo) {
     return await axios.get(`${devUrl}/bookings/today-cancelled-paginated/${pageNo}`)
 }
