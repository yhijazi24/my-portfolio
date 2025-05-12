import axios from 'axios';

const BASE_URL = "https://portfolio-backend-upzy.onrender.com";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user ? JSON.parse(user).currentUser : null;
const TOKEN = currentUser?.accessToken || "";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token:`Bearer ${TOKEN}`},
});

 
publicRequest.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.error('Error Response:', error);
        return Promise.reject(error);
    }
);

