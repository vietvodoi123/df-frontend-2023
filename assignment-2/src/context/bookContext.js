import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../function/localStorage";

const DATA = [
  { name: "Refactoring", author: "Martin Fowler", topic: "Programming" },
  {
    name: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "Database",
  },
  { name: "The Phoenix Project", author: "Gene Kim", topic: "DevOps" },
];

const BookContext = createContext();

export function useBookContext() {
  return useContext(BookContext);
}

export function BookProvider({ children }) {
  const [books, setBooks] = useState(DATA);
  const [filteredBooks, setFilteredBooks] = useState(DATA);
  const [nameBookDelete, setNameBookDelete] = useState("");

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được mount
    const storedBooks = getFromLocalStorage("books");
    if (storedBooks) {
      setBooks(storedBooks);
      setFilteredBooks(storedBooks);
    } else {
      saveToLocalStorage("books", DATA);
    }
  }, []);

  useEffect(() => {
    // Lưu danh sách sách vào localStorage khi có sự thay đổi
    saveToLocalStorage("books", books);
  }, [books]);

  const addBook = (newBook) => {
    const updatedBooks = [newBook, ...books];
    setBooks(updatedBooks);
    // Cập nhật cả filteredBooks
    setFilteredBooks(updatedBooks);
  };

  const removeBook = (bookName) => {
    const updatedBooks = books.filter((book) => book.name !== bookName);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  const filterBooks = (filterTerm) => {
    const filtered = books.filter((book) =>
      book.name.toLowerCase().includes(filterTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <BookContext.Provider
      value={{
        books: filteredBooks,
        addBook,
        nameBookDelete,
        setNameBookDelete,
        removeBook,
        filterBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
