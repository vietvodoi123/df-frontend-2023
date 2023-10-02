'use client'

import React from 'react'
import Backdrop from './ui/Backdrop'
import CreateModal from './ui/CreateModal'
import DeleteModal from './ui/DeleteModal'
import { useModal } from '../context/modalContext'

type Props = {}

function ModalControl({}: Props) {
  const { create, del, openCreateModal, openDeleteModal, closeModal } =
    useModal()
  return (
    <>
      {(create || del) && <Backdrop closeModal={closeModal} />}
      {create && <CreateModal closeModal={closeModal} />}
      {del && <DeleteModal closeModal={closeModal} />}
    </>
  )
}

export default ModalControl
