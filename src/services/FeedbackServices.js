import axios from 'axios'
const devUrl = process.env.VUE_APP_DEV_API


export async function sendFeedback(data) {
   return await axios.post(`${devUrl}/feedbacks`,data)
}

export async function getAll() {
    return await axios.get(`${devUrl}/feedbacks`,{headers:authHeader()})

}

export async function deleteFeedback(id) {
    return await axios.delete(`${devUrl}/feedbacks/${id}`,{headers:authHeader()})
}
export async function updateFeedback(id, data) {
    return await axios.put(`${devUrl}/feedbacks/${id}`, data,{headers:authHeader()})
}
