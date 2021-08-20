import axios from 'axios'

const devUrl = process.env.VUE_APP_DEV_API




export async function login(data){
    return await axios.post(`${devUrl}/auth/login`,data)
}
