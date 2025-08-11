import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: 'https://localhost:44321/',
    timeout: 1000
});