import axios from 'axios'
import authHeader from './auth-HeaderServices'

const devUrl = process.env.VUE_APP_DEV_API


export async function getAllBusTypes() {
    let busTypes = [];
    const response = await axios.get(`${devUrl}/bus-types`,{headers:authHeader()})
        .then(res => {
            busTypes = res.data
        })
        .catch(err => console.log(err))
    return busTypes
}

export async function addNewBusType(data){
    return await axios.post(`${devUrl}/bus-types`,data,{headers:authHeader()})

}

export async function deleteBusType(id){
   return await axios.delete(`${devUrl}/bus-types/${id}`,{headers:authHeader()})
}
export async function editBusType(id,data){
    return await axios.put(`${devUrl}/bus-types/${id}`,data,{headers:authHeader()})
}
