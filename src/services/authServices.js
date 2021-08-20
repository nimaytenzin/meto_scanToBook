import axios from 'axios'

const devUrl = "http://www.meto-transport.com/bpi"



export async function login(data){
    return await axios.post(`${devUrl}/auth/login`,data)
}
