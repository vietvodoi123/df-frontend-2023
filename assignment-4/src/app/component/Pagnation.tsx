import React from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

interface PaginationProps {
  currentPage: number
  page: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  page,
  setCurrentPage,
}) => {
  const a: number[] = []

  for (let i: number = 1; i <= page; i++) {
    a.push(i)
  }

  return (
    <div className="flex justify-end items-center gap-g10 mt-m20">
      <button
        aria-label="Previous Page"
        className="page-button  flex flex-end items-center p-p5 border-2px-solid "
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
          }
        }}
      >
        <AiOutlineLeft />
      </button>

      {a.map((i: number) => (
        <button
          className={` page-button py-p5 px-p10 border-2px-solid text-[17px] ${
            currentPage === i ? 'active' : ''
          }`}
          key={i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      ))}

      <button
        aria-label="Next Page"
        className="page-button  flex flex-end items-center p-p5 border-2px-solid"
        onClick={() => {
          if (currentPage < page) {
            setCurrentPage(currentPage + 1)
          }
        }}
      >
        <AiOutlineRight />
      </button>
    </div>
  )
}

export default Pagination
