import axios from 'axios'

const DB_URL=import.meta.env.VITE_DB_URL        // for vite, import.meta.env. is used to fetch .env data

export const axiosInstance=axios.create({
    baseURL:DB_URL,         // will be applied before URL in axiosInstance.post('URL',{})
    withCredentials:true,   // transfers cookies
    headers:{               // headerss store info about requests
        'Content-Type':'application/json',      // tells that data is in json format
    }
})