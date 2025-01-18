import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
	baseURL: 'http://192.168.1.213:8000/',
})

let interceptorId: number | null = null

export const setToken = (): void => {
	const cookies = document.cookie.split('; ')
	const tokenCookie = cookies.find(row => row.startsWith('token='))
	const token = tokenCookie ? tokenCookie.split('=')[1] : null

	if (interceptorId !== null) {
		axiosInstance.interceptors.request.eject(interceptorId)
		interceptorId = null
	}

	if (token) {
		interceptorId = axiosInstance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				if (config.headers) {
					config.headers['Authorization'] = `${token}`
				}
				return config
			},
			error => {
				return Promise.reject(error)
			}
		)
	}
}

setToken()

export default axiosInstance
