'use client'

import { BookApi } from '@/api/BookApi'
import MainHeader from '@/app/component/MainHeader'
import Pagnation from '@/app/component/Pagnation'
import { setNameBookDelete } from '@/app/store/slice/booksSlice'
import { setDel, setEdit } from '@/app/store/slice/modalSlice'
import { IRootState } from '@/app/store/store'
import { notification } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Main() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<IBook[]>()
  const [totalPages, setTotalPage] = useState<number>()
  const books = useSelector((state: IRootState) => state.books)

  useEffect(() => {
    setLoading(true)
    BookApi.getBooks({
      page: books.currentPage,
      pageSize: 5,
      query: books.query,
    })
      .then((res: ApiResponse<IBook[]>) => {
        if ('data' in res) {
          setData(res.data)
        }
        if ('metadata' in res) {
          setTotalPage(res.metadata?.totalPages)
        }
        setLoading(false)
      })
      .catch((err: ErrorResponse) => {
        notification.error({
          message: err.code,
          description: err.message,
        })
        setLoading(false)
      })
  }, [books.reload, books.currentPage, books.query])
  return (
    <main className=" mt-m50">
      <div className=" w-[94%] mx-auto bg-white dark:bg-bgElm p-p30px rounded-md shadow-md">
        <MainHeader />
        <section className="flex flex-col h-[350px] justify-between">
          <table className=" w-full border-collapse">
            <thead>
              <tr>
                <th className=" w-[35%] border-border border-[2px] border-solid">
                  Name
                </th>
                <th className=" w-[20%] border-border border-[2px] border-solid">
                  Author
                </th>
                <th className=" w-[20%] border-border border-[2px] border-solid">
                  Topic
                </th>
                <th className="border-border border-[2px] border-solid">
                  Action
                </th>
              </tr>
            </thead>
            <tbody id="tbody">
              {!loading &&
                data &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td className="border-border border-[2px] border-solid">
                      {item.name}
                    </td>
                    <td className="border-border border-[2px] border-solid">
                      {item.author}
                    </td>
                    <td className="border-border border-[2px] border-solid">
                      {item.topic.name}
                    </td>
                    <td className="border-border border-[2px] border-solid">
                      <button
                        onClick={() => {
                          dispatch(setEdit(item))
                        }}
                        className=" underline cursor-pointer text-primary"
                      >
                        Edit
                      </button>
                      <button
                        className="relative before:absolute before:contents-[''] before:left-[-10px] before:w-[1px] before:h-full before:bg-primary ml-m20  underline cursor-pointer text-primary"
                        onClick={() => {
                          dispatch(setDel(true))
                          dispatch(setNameBookDelete(item))
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => router.push(`/home/books/${item.id}`)}
                        className="relative before:absolute before:contents-[''] before:left-[-10px] before:w-[1px] before:h-full before:bg-primary ml-m20  underline cursor-pointer text-primary"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {loading && <p>loading....</p>}
          {!data || !totalPages || data.length === 0 ? (
            <div className="flex justify-center items-center flex-col mt-m80 mb-auto">
              <svg
                width="100"
                height="64.0625"
                viewBox="0 0 64 41"
                className="mb-m10 fill-[var(--bgColor)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                  <ellipse
                    className="fill-[var(--bgColor)]"
                    cx="32"
                    cy="33"
                    rx="32"
                    ry="7"
                  />
                  <g fillRule="nonzero" stroke="#d9d9d9">
                    <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
                    <path
                      d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                      className="fill-[var(--bgColor)]"
                    />
                  </g>
                </g>
              </svg>
              <p>Not found</p>
            </div>
          ) : (
            <Pagnation totalPage={totalPages} />
          )}
        </section>
      </div>
    </main>
  )
}
export default Main
