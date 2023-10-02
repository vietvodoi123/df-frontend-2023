'use client'

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
      className="fixed top-[10%] left-[calc(50%-225px)] px-p20 py-p30 rounded-[10px] animate-fadeInOut w-[450px] h-[500px] z-[3] border-2px-solid"
      onSubmit={onSubmitHandler}
    >
      <header className="flex justify-between items-center mb-m40">
        <h2 className=" text-[28px] font-bold">Add book</h2>
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
          <label className="font-bold flex flex-col" htmlFor="name">
            Name
            <input
              type="text"
              alt="Name"
              name="name"
              ref={nameRef}
              id="name"
              placeholder="Enter Name"
              className=" text-text p-p10 mb-m20 border-2px-solid font-normal"
            />
          </label>

          {error.name && (
            <p id="name-err-msg" className="error-msg">
              Name invalid!
            </p>
          )}
        </div>
        <div className="relative flex flex-col">
          <label className="font-bold flex flex-col" htmlFor="author">
            Author
            <input
              ref={authorRef}
              type="text"
              alt="Author"
              name="author"
              id="author"
              placeholder="Enter Author"
              className=" text-text p-p10 mb-m20 border-2px-solid font-normal"
            />
          </label>
          {error.author && (
            <p id="author-err-msg" className="error-msg">
              Author invalid!
            </p>
          )}
        </div>
        <label className="font-bold flex flex-col" htmlFor="select">
          Topic
          <select
            ref={topicRef}
            name="select"
            id="select"
            className=" text-text p-p10 mb-m20 border-2px-solid font-normal"
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
