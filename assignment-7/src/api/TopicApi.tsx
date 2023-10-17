import axiosClient from './Fetcher'

export const TopicApi = {
  getTopic(): Promise<ApiResponse<ITopic[]>> {
    return axiosClient.get('/topics')
  },
}
