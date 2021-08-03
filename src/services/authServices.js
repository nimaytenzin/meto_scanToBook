import axios from 'axios'

const devUrl = "http://localhost:3000"



export async function login(data){
    return await axios.post(`${devUrl}/auth/login`,data)
}
