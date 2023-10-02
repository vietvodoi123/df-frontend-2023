'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

interface Modal {
  create: boolean
  del: boolean
  closeModal: () => void
  openCreateModal: () => void
  openDeleteModal: () => void
}

const ModalContext = createContext<Modal | undefined>(undefined)

export function useModal(): Modal {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalContext')
  }
  return context
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [create, setCreate] = useState(false)
  const [del, setDel] = useState(false)

  const closeModal = useCallback(() => {
    setDel(false)
    setCreate(false)
  }, [setDel, setCreate])

  const openCreateModal = useCallback(() => {
    setCreate(true)
  }, [setCreate])
  const openDeleteModal = useCallback(() => {
    setDel(true)
  }, [setDel])

  const memoizedValue: Modal = useMemo(
    () => ({
      create,
      del,
      closeModal,
      openCreateModal,
      openDeleteModal,
    }),
    [create, del, closeModal, openCreateModal, openDeleteModal],
  )
  return (
    <ModalContext.Provider value={memoizedValue}>
      {children}
    </ModalContext.Provider>
  )
}
