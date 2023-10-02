'use client'
import React from 'react'

interface BackdropProps {
  closeModal: () => void
}

const Backdrop: React.FC<BackdropProps> = ({ closeModal }) => {
  return (
    <button
      aria-label="back drop"
      id="backdrop"
      className="fixed w-full h-[100vh] bg-black opacity-40 z-[2] top-0"
      onClick={() => closeModal()}
    />
  )
}

export default Backdrop
