import { useEffect } from 'react'

function Modal({ content, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3>{content.title}</h3>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{content.description}</p>
          {content.link && (
            <a
              href={content.link}
              className="btn btn-secondary mt-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Document
            </a>
          )}
          {!content.link && (
            <p className="text-muted mt-lg" style={{ fontStyle: 'italic', fontSize: '0.875rem' }}>
              Document placeholder. Actual certificate or proof will be linked upon request or after upload.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
