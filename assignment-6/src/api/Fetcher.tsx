import store from '@/app/store/store'
import axios, { AxiosError } from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://develop-api.bookstore.dwarvesf.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(async (config) => {
  const state = store.getState()
  const token = state.user?.userCurrent?.accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error: AxiosError) {
    return Promise.reject(error.response?.data)
  },
)

export default axiosClient
