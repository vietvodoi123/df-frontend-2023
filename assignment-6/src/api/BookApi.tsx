import axiosClient from './Fetcher'

interface IGetBooks {
  page?: number
  pageSize?: number
  sort?: string
  query?: string
  topicId?: number
  id?: number
}

export const BookApi = {
  createBook(payload: ICreateBook): Promise<ApiResponse<IBook>> {
    return axiosClient.post('/books', payload)
  },
  getBooks(params: Partial<IGetBooks>): Promise<ApiResponse<IBook[]>> {
    return axiosClient.get('/books', { params })
  },
  updateBooks(id: number, payload: ICreateBook): Promise<ApiResponse<IBook>> {
    return axiosClient.put(`/books/${id}`, payload)
  },
  deleteBook(id: number): Promise<ApiResponse<SuccessResponse>> {
    return axiosClient.delete(`/books/${id}`)
  },
  getBookById(id: number): Promise<ApiResponse<IBook>> {
    return axiosClient.get(`/books/${id}`)
  },
  getAll(): Promise<ApiResponse<IBook[]>> {
    return axiosClient.get('/books')
  },
}
