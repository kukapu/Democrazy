import axios from "axios"



export const democracyApi = axios.create({
    baseURL: 'http://localhost:4000/api'
})
