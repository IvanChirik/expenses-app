import { API_URL } from "@/helpers/api";
import { useUserState } from "@/stores/user.store";
import axios from "axios";


export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});
$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});