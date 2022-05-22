import axios from 'axios'
const devUrl = process.env.VUE_APP_DEV_API


export async function postBusHireRequest(data) {
    return  await axios.post(`https://www.meto-transport.com/bpi/hire`,data)
}


