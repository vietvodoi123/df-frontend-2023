'use client'

import { BookApi } from '@/api/BookApi'
import NotFound from '@/app/not-found'
import { setNameBookDelete } from '@/app/store/slice/booksSlice'
import { setDel } from '@/app/store/slice/modalSlice'
import { notification } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

function Page({ params }: { params: { bookId: string } }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [data, setData] = useState<IBook>()

  useEffect(() => {
    BookApi.getBookById(parseInt(params.bookId, 10))
      .then((res: ApiResponse<IBook>) => {
        if ('data' in res) {
          setData(res.data)
        }
      })
      .catch((err: ErrorResponse) => {
        notification.error({ message: err.code, description: err.message })
      })
  }, [])

  if (!data) {
    return NotFound
  }

  function onDelete() {
    if (data) {
      dispatch(setDel(true))
      dispatch(setNameBookDelete(data))
      router.push('/home')
    }
  }

  return (
    <div className=" p-p50px mt-m50 leading-[1.5] w-[93%] mx-auto bg-[var(--backgroundElm)] rounded-md shadow-md">
      <Link
        href="/home"
        className=" text-primary font-bold flex  items-center mb-m30"
      >
        <AiOutlineLeft className="font-bold" /> <span className="">Back</span>
      </Link>
      <h1 className="text-[18px] mb-m20">
        <b>Name: {data.name}</b>
      </h1>
      <p className="text-[18px]">
        <b>Author:</b> {data.author}
      </p>
      <p className="text-[18px] mb-m30">
        <b>Topic:</b> {data.topic.name}
      </p>
      <button onClick={onDelete} className=" text-primary font-bold underline ">
        Delete
      </button>
    </div>
  )
}

export default Page
