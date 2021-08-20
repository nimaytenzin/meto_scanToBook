import axios from 'axios'
const devUrl = "http://www.meto-transport.com/bpi"

export async function sendFeedback(data) {
   return await axios.post(`${devUrl}/feedbacks`,data)
}

export async function getAll() {
    return await axios.get(`${devUrl}/feedbacks`)

}

export async function deleteFeedback(id) {
    return await axios.delete(`${devUrl}/feedbacks/${id}`)
}
export async function updateFeedback(id, data) {
    return await axios.put(`${devUrl}/feedbacks/${id}`, data)
}
