'use client'

import React from 'react'
import { useDispatch } from 'react-redux'
import ButtonPrimary from '../ui/ButtonPrimary'
import InputElm from '../ui/InputElm'
import { setCreate } from '../store/slice/modalSlice'
import { filteredBooks } from '../store/slice/booksSlice'

const MainHeader = () => {
  const dispatch = useDispatch()

  const searchBooks = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filteredBooks(e.target.value))
  }

  return (
    <header className="flex justify-between items-center mb-m30">
      <InputElm name="Search books" type="text" setData={searchBooks} />

      <ButtonPrimary
        text="Add book"
        onClick={() => dispatch(setCreate(true))}
        type="button"
        width={100}
      />
    </header>
  )
}

export default MainHeader
