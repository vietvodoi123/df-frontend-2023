import React from 'react'

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
    <div className="flex flex-end items-center gap-10 mt-20">
      <button
        aria-label="Previous Page"
        className="arrow-left-button  btn flex flex-end items-center p-5 border-2px-solid "
        onClick={() => {
          if (currentPage < page) {
            setCurrentPage(currentPage + 1)
          }
        }}
      >
        <img src="/left-arrow.png" alt="left-arrow" height={27} />
      </button>

      {a.map((i: number) => (
        <button
          className={`btn page-btn border-2px-solid ${
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
        className="arrow-right-button btn flex flex-end items-center p-5 border-2px-solid"
        onClick={() => {
          if (currentPage < page) {
            setCurrentPage(currentPage + 1)
          }
        }}
      >
        <img src="/right-arrow.png" alt="left-arrow" height={27} />
      </button>
    </div>
  )
}

export default Pagination
