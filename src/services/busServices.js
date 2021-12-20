import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API


export async function getAllBuses() {
    return await axios.get(`${devUrl}/buses`)
}

export async function getAllBusPaginated(pageNo) {
    return await axios.get(`${devUrl}/buses/get-all-paginated/${pageNo}`,{headers:authHeader()})
}

export async function addNewBus(data){
    return await axios.post(`${devUrl}/buses`,data,{headers:authHeader()})

}

export async function deleteBus(id){
   return await axios.delete(`${devUrl}/buses/${id}`,{headers:authHeader()})
}
export async function editBus(id,data){
    return await axios.put(`${devUrl}/buses/${id}`,data,{headers:authHeader()})
}

          
