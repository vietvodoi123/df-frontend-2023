// modalSlice.js
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IModal {
  create: boolean
  del: boolean
  edit?: IBook
  update?: MeData
  changePass: boolean
}

const initialState: IModal = {
  create: false,
  del: false,
  edit: undefined,
  update: undefined,
  changePass: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setCreate: (state, action: PayloadAction<boolean>) => {
      state.create = action.payload
    },
    setDel: (state, action: PayloadAction<boolean>) => {
      state.del = action.payload
    },
    setEdit: (state, action: PayloadAction<IBook>) => {
      state.edit = action.payload
    },
    closeModal: (state) => {
      state.create = false
      state.del = false
      state.edit = undefined
      state.update = undefined
      state.changePass = false
    },
    setUpdate: (state, actions: PayloadAction<MeData>) => {
      state.update = actions.payload
    },
    changePass: (state) => {
      state.changePass = true
    },
  },
})

export const { setCreate, setDel, setEdit, closeModal, setUpdate, changePass } =
  modalSlice.actions

export default modalSlice.reducer
