'use client'

import React from 'react'
import { useBookContext } from '../../context/bookContext'

interface DeleteModalProps {
  closeModal: () => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({ closeModal }) => {
  const { nameBookDelete, removeBook } = useBookContext()

  return (
    <section
      id="delete-modal"
      className=" fixed top-[20%] left-[calc(50%-225px)] px-p20 py-p30 rounded-[10px] h-[270px] w-[450px] animate-fadeInOut z-[3] border-2px-solid"
    >
      <header className="flex justify-between items-center mb-m40">
        <h2 className=" text-[22px] font-bold text-center w-full">
          Delete book
        </h2>
        <button
          id="close-button"
          className="btn"
          onClick={closeModal}
          aria-label="Close"
        >
          X
        </button>
      </header>
      <main>
        <p className="text-center text-[18px]">
          Do you want to delete
          <br />
          <span id="name-delete" className="font-bold">
            {nameBookDelete}
          </span>{' '}
          book?
        </p>
      </main>
      <footer className="flex justify-center items-center gap-20 mt-m30">
        <button
          onClick={() => {
            removeBook(nameBookDelete)
            closeModal()
          }}
          id="btn-delete-confirm"
          className="btn "
        >
          Delete
        </button>
        <button onClick={closeModal} className="x-elm btn btn-red">
          Cancel
        </button>
      </footer>
    </section>
  )
}

export default DeleteModal
