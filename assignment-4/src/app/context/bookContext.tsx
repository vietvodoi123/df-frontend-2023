'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../function/localStorage'

const DATA: IBook[] = [
  {
    id: '1',
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '2',
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  { id: '3', name: 'The Phoenix Project', author: 'Gene Kim', topic: 'DevOps' },
]

export interface BookContextType {
  books: IBook[]
  addBook: (newBook: IBook) => void
  nameBookDelete: string
  setNameBookDelete: (name: string) => void
  removeBook: (bookName: string) => void
  filterBooks: (filterTerm: string) => void
  curentPage: number
  page: number
  setCurrentPage: (value: number) => void
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export function useBookContext(): BookContextType {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error('useBookContext must be used within a BookProvider')
  }
  return context
}

export function BookProvider({ children }: { children: React.ReactNode }) {
  const cnt = 5
  const router = useRouter()
  const [books, setBooks] = useState<IBook[]>(DATA)
  const [count, setCount] = useState(DATA.length)
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>(DATA)
  const [nameBookDelete, setNameBookDelete] = useState<string>('')
  const [curentPage, setCurrentPage] = useState<number>(1)
  const [page, setPage] = useState<number>(Math.floor(DATA.length / cnt) + 1)
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const sliceBooks = useCallback(
    (array: IBook[]) => {
      return array.slice((curentPage - 1) * cnt, curentPage * cnt)
    },
    [curentPage],
  )

  const calcPage = (length: number) => {
    if (length > cnt) {
      setPage(Math.floor(length / cnt) + 1)
    } else {
      setPage(1)
    }
  }

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được mount
    const storedBooks = getFromLocalStorage('books') as IBook[]
    if (storedBooks) {
      setBooks(storedBooks)
      setFilteredBooks(storedBooks)
      setCount(storedBooks.length)
      calcPage(storedBooks.length)
    } else {
      saveToLocalStorage('books', DATA)
    }
  }, [])

  useEffect(() => {
    // Lưu danh sách sách vào localStorage khi có sự thay đổi
    saveToLocalStorage('books', books)
    calcPage(books.length)
    setFilteredBooks(sliceBooks(books))
  }, [books, sliceBooks])

  const addBook = useCallback(
    (newBook: IBook) => {
      const id = count + 1
      newBook.id = id.toString()
      const updatedBooks = [newBook, ...books]
      setBooks(updatedBooks)
      setCount(count + 1)
    },
    [books, setCount, count],
  )

  const removeBook = useCallback(
    (bookName: string) => {
      const updatedBooks = books.filter((book) => book.name !== bookName)
      setBooks(updatedBooks)
    },
    [books],
  )

  const createQueryString = useCallback(
    (term: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(term, value)
      params.set('page', curentPage.toString())
      return params.toString()
    },
    [searchParams, curentPage],
  )

  const filterBooks = useCallback(
    (filterTerm: string) => {
      const filtered = books.filter((book) =>
        book.name.toLowerCase().includes(filterTerm.toLowerCase()),
      )
      calcPage(filtered.length)
      setFilteredBooks(sliceBooks(filtered))
      router.push(`${pathName}?${createQueryString('term', filterTerm || '')}`)
    },
    [books],
  )

  useEffect(() => {
    setFilteredBooks(sliceBooks(books))
    const term = searchParams.get('term')
    router.push(`${pathName}?${createQueryString('term', term || '')}`)
  }, [books, sliceBooks])

  // Sử dụng useMemo để tránh thay đổi giá trị của context mỗi lần render
  const contextValue = useMemo(
    () => ({
      books: filteredBooks,
      addBook,
      nameBookDelete,
      setNameBookDelete,
      removeBook,
      filterBooks,
      curentPage,
      page,
      setCurrentPage,
    }),
    [
      filteredBooks,
      addBook,
      nameBookDelete,
      removeBook,
      filterBooks,
      page,
      curentPage,
    ],
  )
  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  )
}
