'use client'

import React from 'react'
import { useBookContext } from '../context/bookContext'
import { useModal } from '../context/modalContext'

const MainHeader = () => {
  const { filterBooks } = useBookContext()
  const { openCreateModal } = useModal()
  const searchBooks = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterBooks(e.target.value)
  }

  return (
    <header className="flex justify-end items-center pt-p50 pb-p30 ">
      <input
        id="search-input"
        type="text"
        alt="Search books"
        onChange={searchBooks}
        placeholder="Search books"
        className="header-input border-2px-solid"
      />
      <button
        onClick={() => {
          openCreateModal()
        }}
        type="button"
        id="btn-add-book"
        className="btn btn-red ml-auto"
      >
        Add book
      </button>
    </header>
  )
}

export default MainHeader
