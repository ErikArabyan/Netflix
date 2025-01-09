import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://192.168.1.213:8000/",
});

let interceptorId = null;

export const setToken = () => {
    const cookies = document.cookie.split('; ')
    const tokenCookie = cookies.find(row => row.startsWith('token='))
    const token = tokenCookie ? tokenCookie.split('=')[1] : null

    if (interceptorId !== null) {
        axiosInstance.interceptors.request.eject(interceptorId);
        interceptorId = null;
    }

    if (token) {
        interceptorId = axiosInstance.interceptors.request.use(
            (config) => {
                config.headers["Authorization"] = `${token}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
};

setToken();
export default axiosInstance;
