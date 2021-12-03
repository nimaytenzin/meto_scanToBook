import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API


export async function getAllBuses() {
    let buses = [];
    const response = await axios.get(`${devUrl}/buses`,{
        headers: authHeader()
      })
        .then(res => {
            buses = res.data
        })
        .catch(err => console.log(err))
    return buses
}

export async function getAllBusPaginated(pageNo) {
    return await axios.get(`${devUrl}/buses/get-all-paginated/${pageNo}`)
}

export async function addNewBus(data){
    return await axios.post(`${devUrl}/buses`,data)

}

export async function deleteBus(id){
   return await axios.delete(`${devUrl}/buses/${id}`)
}
export async function editBus(id,data){
    return await axios.put(`${devUrl}/buses/${id}`,data)
}

          
