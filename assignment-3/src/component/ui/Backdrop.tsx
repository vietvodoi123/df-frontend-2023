import React from 'react'

interface BackdropProps {
  closeModal: () => void
}

const Backdrop: React.FC<BackdropProps> = ({ closeModal }) => {
  return (
    <button
      aria-label="back drop"
      id="backdrop"
      className="fixed"
      onClick={() => closeModal()}
    />
  )
}

export default Backdrop
