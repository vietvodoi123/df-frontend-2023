'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import MainHeader from './component/MainHeader'
import { useBookContext } from './context/bookContext'
import Pagnation from './component/Pagnation'
import { useModal } from './context/modalContext'

export default function Home() {
  const router = useRouter()
  const { books, setNameBookDelete, curentPage, page, setCurrentPage } =
    useBookContext()
  const { openDeleteModal } = useModal()

  return (
    <main className="px-[50px]">
      <MainHeader />
      <section>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Topic</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {books.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.author}</td>
                <td>{item.topic}</td>
                <td className=" ">
                  <button
                    className=" btn underline cursor-pointer text-primary"
                    onClick={() => {
                      openDeleteModal()
                      setNameBookDelete(item.name)
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => router.push(`/books/${item.id}`)}
                    className=" relative before:absolute before:contents-[''] before:left-[-10px] before:w-[2px] before:h-full before:bg-primary ml-m20 btn underline cursor-pointer text-primary"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {page === 0 ? (
          <p className=" text-center p-p10 border-t-none border-2px-solid">
            Not found book
          </p>
        ) : (
          <Pagnation
            currentPage={curentPage}
            setCurrentPage={setCurrentPage}
            page={page}
          />
        )}
      </section>
    </main>
  )
}
