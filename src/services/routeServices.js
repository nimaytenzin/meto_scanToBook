import axios from 'axios'
import  authHeader  from './auth-HeaderServices' 
const devUrl = process.env.VUE_APP_DEV_API


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
    return await axios.post(`${devUrl}/routes`,data,{headers:authHeader()})

}

export async function deleteRoute(id){
   return await axios.delete(`${devUrl}/routes/${id}`,{headers:authHeader()})
}
export async function editBus(id,data){
    return await axios.put(`${devUrl}/buses/${id}`,data,{headers:authHeader()})
}

export async function getRoutesByOriginDestination(originId, destinationId){
    return await axios.get(`${devUrl}/route-path/${originId}/${destinationId}`)
}

export async function getAllRoutePaths(){
    return await axios.get(`${devUrl}/route-path`)
}

export async function createNewRoutePath(data){
    return await axios.post(`${devUrl}/route-path`,data)
}

export async function editRoute(id,data){
    return await axios.put(`${devUrl}/routes/${id}`,data,{headers:authHeader()})
}


export async function getRoutesByWeekday(weekday){
    return await axios.get(`${devUrl}/routes/routesby-weekday/${weekday}`,{headers:authHeader()})
 }
