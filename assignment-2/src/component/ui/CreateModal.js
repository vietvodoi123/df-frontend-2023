import React, { useRef, useState } from "react";
import { useBookContext } from "../../context/bookContext";

const CreateModal = (props) => {
  const nameRef = useRef(null);
  const authorRef = useRef(null);
  const topicRef = useRef(null);
  const { addBook } = useBookContext();
  const [error, setError] = useState({
    name: false,
    author: false,
  });

  const validate = (name, author) => {
    const er = {
      name: false,
      author: false,
    };
    if (name.trim() === "") {
      er.name = true;
    }
    if (author.trim() === "") {
      er.author = true;
    }
    setError(er);
    return er;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const author = authorRef.current.value;
    const topic = topicRef.current.value;

    const check = validate(name, author);
    if (check.name || check.author) {
      console.log("name or author invalid");
    } else {
      addBook({ name, author, topic });
      props.closeModal();
    }
  };

  return (
    <form
      id="add-modal"
      className=" fixed border-2px-solid modal"
      onSubmit={onSubmitHandler}
    >
      <header className="flex space-between items-center">
        <h2>Add book</h2>
        <span id="Capa_1" onClick={() => props.closeModal()}>
          X
        </span>
      </header>
      <main className="flex flex-col">
        <div className="relative flex flex-col">
          <label className="font-bold">Name</label>
          <input
            type="text"
            alt="Name"
            ref={nameRef}
            id="name-input"
            placeholder=""
            className="add-input border-2px-solid"
          />
          {error.name && (
            <p id="name-err-msg" className=" error-msg">
              Name invalid!
            </p>
          )}
        </div>
        <div className="relative flex flex-col">
          <label className="font-bold">Author</label>
          <input
            ref={authorRef}
            type="text"
            alt="Author"
            id="author-input"
            placeholder=""
            className="add-input border-2px-solid"
          />
          {error.author && (
            <p id="author-err-msg" className=" error-msg">
              Author invalid!
            </p>
          )}
        </div>
        <label className="font-bold">Topic</label>
        <select
          ref={topicRef}
          id="select-input"
          className="select add-input border-2px-solid"
        >
          <option value="programming">Programming</option>
          <option value="database">Database</option>
          <option value="devOps">DevOps</option>
        </select>
      </main>
      <footer className="flex flex-end">
        <button id="btn-create" className="btn btn-red" type="submit">
          Create
        </button>
      </footer>
    </form>
  );
};

export default CreateModal;
