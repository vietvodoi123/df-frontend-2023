import { getFromLocalStorage } from "./localStorage";

const addBook = (book) => {
  const d = getFromLocalStorage("books");
  const data = [book, ...d];
  saveToLocalStorage("books", data);
  return data;
};
