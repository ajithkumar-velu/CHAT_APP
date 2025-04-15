import axios from 'axios'
const axiosInstance = axios.create({
    // baseURL: ' http://localhost:3000',
    baseURL: 'https://chat-app-backend-la16.onrender.com',
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
})
export default axiosInstance