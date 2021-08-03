import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = "http://localhost:3000"

export async function getAllRoutes() {
    let routes = [];
    const response = await axios.get(`${devUrl}/routes`,{
        headers: authHeader()
      })
        .then(res => {
            routes = res.data
        })
        .catch(err => console.log(err))
    return routes
}

export async function addNewRoute(data){
    return await axios.post(`${devUrl}/routes`,data)

}

export async function deleteRoute(id){
   return await axios.delete(`${devUrl}/routes/${id}`)
}
export async function editBus(id,data){
    return await axios.put(`${devUrl}/buses/${id}`,data)
}
