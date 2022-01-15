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

export async function getJournalDetailsbyStaff(staffId){
    return await axios.get(`${devUrl}/booking-stat/journals/${staffId}`,{headers:authHeader()})
}


//Monthy stats
export async function getLatestRevenueStats(){
    return await axios.get(`${devUrl}/stats/latest-revenue`,{headers:authHeader()})
}

export async function getLatestTicketsStats(){
    return await axios.get(`${devUrl}/stats/latest-ticketsale`,{headers:authHeader()})
}

export async function getTopMontlyRoutes(){
    return await axios.get(`${devUrl}/booking-stat/top-routes`,{headers:authHeader()})
}
export async function getTopStaffs(){
    return await axios.get(`${devUrl}/booking-stat/top-staffs`,{headers:authHeader()})
}

export async function updateBookingStatUsingBookingId(bookingId, data){
    return await axios.put(`${devUrl}/booking-stat/booking/${bookingId}`,data,{headers:authHeader()})
}






