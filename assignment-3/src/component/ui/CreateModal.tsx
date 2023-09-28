import React, { useRef, useState } from 'react'
import { useBookContext } from '../../context/bookContext'

interface CreateModalProps {
  closeModal: () => void
}

const CreateModal: React.FC<CreateModalProps> = ({ closeModal }) => {
  const nameRef = useRef<HTMLInputElement | null>(null)
  const authorRef = useRef<HTMLInputElement | null>(null)
  const topicRef = useRef<HTMLSelectElement | null>(null)
  const { addBook } = useBookContext()
  const [error, setError] = useState({
    name: false,
    author: false,
  })

  const validate = (name: string, author: string) => {
    const er = {
      name: false,
      author: false,
    }
    if (name.trim() === '') {
      er.name = true
    }
    if (author.trim() === '') {
      er.author = true
    }
    setError(er)
    return er
  }

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    const name = nameRef.current?.value || ''
    const author = authorRef.current?.value || ''
    const topic = topicRef.current?.value || ''

    const check = validate(name, author)
    if (check.name || check.author) {
      console.log('name or author invalid')
    } else {
      addBook({ name, author, topic })
      closeModal()
    }
  }

  return (
    <form
      id="add-modal"
      className="fixed border-2px-solid modal"
      onSubmit={onSubmitHandler}
    >
      <header className="flex space-between items-center">
        <h2>Add book</h2>
        <button
          id="close-button"
          className="btn"
          onClick={closeModal}
          aria-label="Close"
        >
          X
        </button>
      </header>
      <main className="flex flex-col">
        <div className="relative flex flex-col">
          <label className="font-bold label-input flex flex-col" htmlFor="name">
            Name
            <input
              type="text"
              alt="Name"
              name="name"
              ref={nameRef}
              id="name"
              placeholder="Enter Name"
              className="add-input border-2px-solid"
            />
          </label>

          {error.name && (
            <p id="name-err-msg" className="error-msg">
              Name invalid!
            </p>
          )}
        </div>
        <div className="relative flex flex-col">
          <label
            className="font-bold label-input flex flex-col"
            htmlFor="author"
          >
            Author
            <input
              ref={authorRef}
              type="text"
              alt="Author"
              name="author"
              id="author"
              placeholder="Enter Author"
              className="add-input border-2px-solid"
            />
          </label>
          {error.author && (
            <p id="author-err-msg" className="error-msg">
              Author invalid!
            </p>
          )}
        </div>
        <label className="font-bold label-input flex flex-col" htmlFor="select">
          Topic
          <select
            ref={topicRef}
            name="select"
            id="select"
            className="select add-input border-2px-solid"
          >
            <option value="programming">Programming</option>
            <option value="database">Database</option>
            <option value="devOps">DevOps</option>
          </select>
        </label>
        <button id="btn-create" className="btn btn-red" type="submit">
          Create
        </button>
      </main>
    </form>
  )
}

export default CreateModal
