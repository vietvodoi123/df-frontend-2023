import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../function/localStorage'

const DATA: IBook[] = [
  { name: 'Refactoring', author: 'Martin Fowler', topic: 'Programming' },
  {
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  { name: 'The Phoenix Project', author: 'Gene Kim', topic: 'DevOps' },
]

export interface BookContextType {
  books: IBook[]
  addBook: (newBook: IBook) => void
  nameBookDelete: string
  setNameBookDelete: (name: string) => void
  removeBook: (bookName: string) => void
  filterBooks: (filterTerm: string) => void
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
  const [books, setBooks] = useState<IBook[]>(DATA)
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>(DATA)
  const [nameBookDelete, setNameBookDelete] = useState<string>('')

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được mount
    const storedBooks = getFromLocalStorage('books') as IBook[]
    if (storedBooks) {
      setBooks(storedBooks)
      setFilteredBooks(storedBooks)
    } else {
      saveToLocalStorage('books', DATA)
    }
  }, [])

  useEffect(() => {
    // Lưu danh sách sách vào localStorage khi có sự thay đổi
    saveToLocalStorage('books', books)
  }, [books])

  const addBook = useCallback(
    (newBook: IBook) => {
      const updatedBooks = [newBook, ...books]
      setBooks(updatedBooks)
      // Cập nhật cả filteredBooks
      setFilteredBooks(updatedBooks)
    },
    [books],
  )

  const removeBook = useCallback(
    (bookName: string) => {
      const updatedBooks = books.filter((book) => book.name !== bookName)
      setBooks(updatedBooks)
      setFilteredBooks(updatedBooks)
    },
    [books],
  )

  const filterBooks = useCallback(
    (filterTerm: string) => {
      const filtered = books.filter((book) =>
        book.name.toLowerCase().includes(filterTerm.toLowerCase()),
      )
      setFilteredBooks(filtered)
    },
    [books],
  )

  // Sử dụng useMemo để tránh thay đổi giá trị của context mỗi lần render
  const contextValue = useMemo(
    () => ({
      books: filteredBooks,
      addBook,
      nameBookDelete,
      setNameBookDelete,
      removeBook,
      filterBooks,
    }),
    [filteredBooks, addBook, nameBookDelete, removeBook, filterBooks],
  )
  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  )
}
