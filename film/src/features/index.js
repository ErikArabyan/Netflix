import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
});

let interceptorId = null;

export const setToken = () => {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString).token : null;

    if (interceptorId !== null) {
        axiosInstance.interceptors.request.eject(interceptorId);
        interceptorId = null;
    }

    if (token) {
        interceptorId = axiosInstance.interceptors.request.use(
            (config) => {
                config.headers["Authorization"] = `Token ${token}`;
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
