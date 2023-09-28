import React from 'react'
import { useBookContext } from '../../context/bookContext'

interface DeleteModalProps {
  closeModal: () => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({ closeModal }) => {
  const { nameBookDelete, removeBook } = useBookContext()

  return (
    <section id="delete-modal" className="fixed modal border-2px-solid">
      <header className="flex space-between items-center">
        <h2>Delete book</h2>
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
        <p className="text-center text-18">
          Do you want to delete
          <br />
          <span id="name-delete" className="font-bold">
            {nameBookDelete}
          </span>{' '}
          book?
        </p>
      </main>
      <footer className="flex flex-center items-center gap-40">
        <button
          onClick={() => {
            removeBook(nameBookDelete)
            closeModal()
          }}
          id="btn-delete-confirm"
          className="btn"
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
