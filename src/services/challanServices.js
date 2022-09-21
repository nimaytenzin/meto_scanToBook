import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API


export async function getConsolidatedChallanByDate(date) {
    return await axios.get(`${devUrl}/challan/date/${date}`)
}


export async function createConsolidatedChallanByDate(data) {
    return await axios.post(`${devUrl}/challan/date`,data)
}
export async function updateConsolidateChallanByDate(data) {
    return await axios.post(`${devUrl}/challan/refresh`,data)
}

export async function updateChallanData(id,data) {
    return await axios.patch(`${devUrl}/challan/${id}`,data)
}

export async function getChallanStatusByDate(date){
    return await axios.get(`${devUrl}/challan-verification/date/${date}`)
}

export async function markChallanAsVerified(data){
    return await axios.post(`${devUrl}/challan-verification/verify`, data)
}