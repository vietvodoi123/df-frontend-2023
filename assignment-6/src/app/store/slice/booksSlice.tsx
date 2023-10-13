import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IBooksSlice {
  nameBookDelete?: IBook
  currentPage: number
  reload: number
  topic?: ITopic[]
  pageSize: number
  query?: string
}

const initialState: IBooksSlice = {
  nameBookDelete: undefined,
  reload: 0,
  currentPage: 1,
  pageSize: 5,
  query: undefined,
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setNameBookDelete: (state, action: PayloadAction<IBook>) => {
      state.nameBookDelete = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setTopic: (state, actions: PayloadAction<ITopic[]>) => {
      state.topic = actions.payload
    },
    setQuery: (state, actions: PayloadAction<string>) => {
      state.query = actions.payload
    },
    setReload: (state) => {
      state.reload++
    },
  },
})

export const {
  setNameBookDelete,
  setCurrentPage,
  setQuery,
  setTopic,
  setReload,
} = booksSlice.actions

export default booksSlice.reducer
