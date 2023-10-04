'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AiOutlineLeft } from 'react-icons/ai'
import { useBookContext } from '../../context/bookContext'
import { useModal } from '../../context/modalContext'

function Page({ params }: { params: { bookId: string } }) {
  const router = useRouter()
  const { books, setNameBookDelete } = useBookContext()
  const { openDeleteModal } = useModal()

  // Lấy id sách từ URL
  const id = params.bookId[0]

  // Kiểm tra xem bookId có tồn tại trong danh sách sách hay không
  const book = books.find((book) => book.id === id)
  if (!book) {
    return router.push('/')
  }

  function onDelete() {
    if (book) {
      openDeleteModal()
      setNameBookDelete(book.name)
    }
  }

  return (
    <div className=" px-p50 mt-m30 leading-[1.5]">
      <Link
        href="/"
        className=" text-primary font-bold flex  items-center mb-m30"
      >
        <AiOutlineLeft className="font-bold" /> <span className="">Back</span>
      </Link>
      <h1 className="text-[18px] mb-m20">
        <b>Name: {book.name}</b>
      </h1>
      <p className="text-[18px]">
        <b>Author:</b> {book.author}
      </p>
      <p className="text-[18px] mb-m30">
        <b>Topic:</b> {book.topic}
      </p>
      <button onClick={onDelete} className=" text-primary font-bold underline ">
        Delete
      </button>
    </div>
  )
}

export default Page
