import axios from 'axios'
import authHeader from './auth-HeaderServices';
const devUrl = "http://localhost:3000"

export async function getAllStops() {
    let stops = [];
    await axios.get(`${devUrl}/stops`,{headers:authHeader()})
        .then(res => {
            stops = res.data
        })
        .catch(err => console.log(err))
    return stops
}

export async function addNewStop(data) {
    return await axios.post(`${devUrl}/stops`, data, {headers:authHeader()})

}

export async function deleteStop(id) {
    return await axios.delete(`${devUrl}/stops/${id}`,{headers:authHeader()})
}
export async function editStop(id, data) {
    return await axios.put(`${devUrl}/stops/${id}`, data,{headers:authHeader()})
}
