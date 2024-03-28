interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
  onClose: () => void
}

function Modal({ isOpen, children, onClose }: ModalProps) {
  if (!isOpen) return null

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
      onClick={handleOutsideClick}
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-end">
          <button id="ok-btn" className="text-white" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="mt-3 text-center">
          {children}
          <div className="items-center px-4 py-3"></div>
        </div>
      </div>
    </div>
  )
}

export default Modal
