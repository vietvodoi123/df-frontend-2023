import React from "react";
import { useBookContext } from "../../context/bookContext";

const DeleteModal = (props) => {
  const { nameBookDelete, removeBook } = useBookContext();
  return (
    <section id="delete-modal" className=" fixed modal border-2px-solid">
      <header className="flex space-between items-center">
        <h2>Delete book</h2>
        <span id="Capa_1" onClick={() => props.closeModal()}>
          X
        </span>
      </header>
      <main>
        <p className="text-center text-18">
          Do you want to delete
          <br />
          <span id="name-delete" className="font-bold">
            {nameBookDelete}
          </span>{" "}
          book?
        </p>
      </main>
      <footer className="flex flex-center items-center gap-40">
        <button
          onClick={() => {
            removeBook(nameBookDelete);
            props.closeModal();
          }}
          id="btn-delete-confirm"
          className="btn"
        >
          Delete
        </button>
        <button
          onClick={() => props.closeModal()}
          className="x-elm btn btn-red"
        >
          Cancel
        </button>
      </footer>
    </section>
  );
};

export default DeleteModal;
