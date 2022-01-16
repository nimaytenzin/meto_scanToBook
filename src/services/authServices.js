import axios from 'axios'

const devUrl = process.env.VUE_APP_DEV_API

import  authHeader  from './auth-HeaderServices' 



export async function login(data){
    return await axios.post(`${devUrl}/auth/login`,data)
}

export async function getStaffs(){
    return await axios.get(`${devUrl}/auth/staffs`,{headers:authHeader()})
}

export async function createNewUser(data){
    return await axios.post(`${devUrl}/auth/signup`,data,{headers:authHeader()})
}

export async function getAllUsers(){
    return await axios.get(`${devUrl}/auth/users`,{headers:authHeader()})
}

export async function verfiyToken(){
    // let verified = false
    return await axios.get(`${devUrl}/auth/verify`,{headers:authHeader()})
                .then( res => {
                    return true
                }).catch(err=>{
                    return false
                });
    // return verified;
}

export async function updateUser(id,data){
    return await axios.put(`${devUrl}/auth/${id}`,data,{headers:authHeader()})
}

export async function changeUserPassword(id,data){
    return await axios.put(`${devUrl}/auth/password/${id}`,data,{headers:authHeader()})
}



