import axios from 'axios'

const devUrl = process.env.VUE_APP_DEV_API

import  authHeader  from './auth-HeaderServices' 



export async function login(data){
    return await axios.post(`${devUrl}/auth/login`,data)
}

export async function getStaffs(){
    return await axios.get(`${devUrl}/auth/staffs`,{headers:authHeader()})
}
