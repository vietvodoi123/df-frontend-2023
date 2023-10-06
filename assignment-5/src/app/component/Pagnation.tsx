import React from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../store/store'
import { setCurrentPage } from '../store/slice/booksSlice'

const Pagination = () => {
  const dispatch = useDispatch()
  const books = useSelector((state: IRootState) => state.books)
  const a: number[] = []

  for (let i: number = 1; i <= books.totalPages; i++) {
    a.push(i)
  }

  return (
    <div className="flex justify-end items-center gap-g10 self-end justify-self-end">
      <button
        aria-label="Previous Page"
        className=" hover:bg-primary hover:text-white p-p10px rounded-md flex flex-end items-center shadow-md"
        onClick={() => {
          if (books.currentPage > 1) {
            dispatch(setCurrentPage(books.currentPage - 1))
          }
        }}
      >
        <AiOutlineLeft />
      </button>

      {a.map((i: number) => (
        <button
          className={`hover:bg-primary hover:text-white p-p4px rounded-md py-p5px px-p10px shadow-md text-[17px] ${
            books.currentPage === i ? 'bg-primary text-white' : ''
          }`}
          key={i}
          onClick={() => dispatch(setCurrentPage(i))}
        >
          {i}
        </button>
      ))}

      <button
        aria-label="Next Page"
        className="hover:bg-primary hover:text-white p-p10px rounded-md shadow-md flex flex-end items-center"
        onClick={() => {
          if (books.currentPage < books.totalPages) {
            dispatch(setCurrentPage(books.currentPage + 1))
          }
        }}
      >
        <AiOutlineRight />
      </button>
    </div>
  )
}

export default Pagination
