import axios from 'axios'
import authHeader from './auth-HeaderServices';
const devUrl = process.env.VUE_APP_DEV_API


export async function getAllStops() {
    return  await axios.get(`${devUrl}/stops`,{headers:authHeader()})
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

export async function getActiveStops() {
    return  await axios.get(`${devUrl}/route-path/active-stops`)
}
export async function getActiveDestinationByOrigin(originId){
    return  await axios.get(`${devUrl}/route-path/active/destination/${originId}`)
}


export let dzongkhags = [
    {name: "Thimphu"},
    {name: "Bumthang"},
    {name: "Chhukha"},
    {name: "Dagana"},
    {name: "Gasa"},
    {name: "Haa"},
    {name: "Lhuentse"},
    {name: "Mongar"},
    {name: "Paro"},
    {name: "PemaGatshel"},
    {name: "Punakha"},
    {name: "SamdrupJongkhar"},
    {name: "Samtse"},
    {name: "Sarpang"},
    {name: "Trashigang"},
    {name: "TrashiYangtse"},
    {name: "Tsirang"},
    {name: "WangduePhodrang"},
    {name: "Zhemgang"}
]