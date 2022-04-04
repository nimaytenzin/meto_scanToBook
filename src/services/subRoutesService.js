import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API



export async function addNewSubRoute(data){
    console.log("DATA PASSED", data)
    return await axios.post(`${devUrl}/sub-routes`,data,{headers:authHeader()})

}
export async function editSubRoute(id,data){
    return await axios.patch(`${devUrl}/sub-routes/${id}`,data,{headers:authHeader()})
}
export async function deleteSubRoute(id){
    return await axios.delete(`${devUrl}/sub-routes/${id}`,{headers:authHeader()})
 }



