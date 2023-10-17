'use client'

import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '@/app/store/slice/modalSlice'
import { IRootState } from '@/app/store/store'
import { BookApi } from '@/api/BookApi'
import { notification } from 'antd'
import { setReload } from '@/app/store/slice/booksSlice'
import ButtonPrimary from '../../ui/ButtonPrimary'

const DeleteModal = () => {
  const dispatch = useDispatch()
  const nameBookDelete = useSelector(
    (state: IRootState) => state.books.nameBookDelete,
  )
  return (
    <section
      id="delete-modal"
      className="modal top-[20%] bg-white dark:bg-bgElm px-p20px py-p30px rounded-md animate-fadeInOut"
    >
      <header className="flex justify-between items-center mb-m40">
        <h2 className=" text-[22px] font-bold text-center w-full">
          Delete book
        </h2>
        <button
          id="close-button"
          className="btn"
          onClick={() => dispatch(closeModal())}
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
            {nameBookDelete?.name}
          </span>{' '}
          book?
        </p>
      </main>
      <footer className="flex justify-center items-center gap-20 mt-m30">
        <button
          onClick={() => {
            if (nameBookDelete && nameBookDelete.id) {
              BookApi.deleteBook(parseInt(nameBookDelete?.id, 10))
                .then((res: ApiResponse<Message>) => {
                  if ('data' in res) {
                    notification.success({
                      message: res.data.message,
                    })
                    dispatch(setReload())
                  }
                })
                .catch((error: ErrorResponse) => {
                  notification.error({
                    message: error.code,
                    description: error.message,
                  })
                })
              dispatch(closeModal())
            }
          }}
          id="btn-delete-confirm"
          className=" font-bold text-[var(--border)] hover:text-primary hover:scale-110"
        >
          Delete
        </button>
        <ButtonPrimary text="Cancel" onClick={closeModal} width={100} />
      </footer>
    </section>
  )
}

export default DeleteModal
