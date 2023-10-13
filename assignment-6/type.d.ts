interface IBook {
  id: string
  name: string
  author: string
  topic: ITopic
}
interface ICreateBook {
  name: string
  author: string
  topicID: number
}
type ThemeType = 'light' | 'dark'

interface UserData {
  id?: number
  email?: string
  accessToken?: string
}
interface MeData {
  id: number
  email: string
  avatar: string
  fullName: string
}
interface IUserCreate {
  avatar?: string
  email: string
  fullName: string
  password: string
}

type ApiResponse<T> = {
  data?: T
  code?: string
  error?: string
  errors?: Array<{ error: string; field: string }>
  traceId?: string
  metadata: Metadata
}
interface ITopic {
  code: string
  id: number
  name: string
}

// response
interface SuccessResponse {
  data: {
    message: string
  }
  metadata?: Metadata
}
interface ErrorResponse {
  code: string
  error: string
  message: string
  errors: Array<{
    error: string
    field: string
  }>
  traceId: string
}

interface Metadata {
  hasNext: boolean
  page: number
  pageSize: number
  sort: number
  totalPages: number
  totalRecords: number
}
