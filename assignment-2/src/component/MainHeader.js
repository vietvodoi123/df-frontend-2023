import React from "react";
import { useBookContext } from "../context/bookContext";

const MainHeader = (props) => {
  const { filterBooks } = useBookContext();

  const searchBooks = (e) => {
    filterBooks(e.target.value);
  };

  return (
    <header className="flex flex-end items-center main-header">
      <input
        id="search-input"
        type="text"
        alt="Search books"
        onChange={searchBooks}
        placeholder="Search books"
        className="header-input border-2px-solid"
      />
      <button
        onClick={() => {
          console.log("open create");
          props.setOpenCreate(true);
        }}
        type="button"
        id="btn-add-book"
        className="btn btn-red ml-auto"
      >
        Add book
      </button>
    </header>
  );
};

export default MainHeader;
