import store from '@/app/store/store'
import axiosClient from './Fetcher'

interface ILoginBody {
  email: string
  password: string
}

export const UserApi = {
  login(payload: ILoginBody): Promise<ApiResponse<UserData>> {
    return axiosClient.post('/auth/login', payload)
  },
  signup(payload: IUserCreate): Promise<ApiResponse<Message>> {
    return axiosClient.post('/auth/signup', payload)
  },
  isLogin() {
    const { user } = store.getState()

    return user?.userCurrent?.accessToken
  },
  getUser(): Promise<ApiResponse<MeData>> {
    return axiosClient.get('/me')
  },
  updateMe(payload: FormData): Promise<ApiResponse<UserData>> {
    return axiosClient.put('/users', payload)
  },
  changePass(payload: FormData): Promise<ApiResponse<Message>> {
    return axiosClient.put('/users/password', payload)
  },
}
