import axios from "axios"



export const democracyApi = axios.create({
    baseURL: 'https://democrazy-backend-production.up.railway.app/api'
})
