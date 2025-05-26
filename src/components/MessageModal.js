import { useEffect, useRef } from 'react';

// Mapping message types to Bootstrap contextual classes
const typeStyles = {
  error: {
    headerClass: 'bg-danger text-white',
    borderClass: 'border-danger',
    defaultTitle: '❌ Error',
  },
  warning: {
    headerClass: 'bg-warning text-dark',
    borderClass: 'border-warning',
    defaultTitle: '⚠️ Warning',
  },
  info: {
    headerClass: 'bg-info text-white',
    borderClass: 'border-info',
    defaultTitle: 'ℹ️ Tip',
  },
};

const MessageModal = ({ title, message, show, onClose, type = 'warning' }) => {
  const modalRef = useRef(null);

  // Ensure fallback to 'warning' if unknown type
  const styles = typeStyles[type] || typeStyles.warning;

  useEffect(() => {
    if (show && modalRef.current) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();

      modalRef.current.addEventListener('hidden.bs.modal', onClose);

      return () => {
        modalRef.current.removeEventListener('hidden.bs.modal', onClose);
        modal.hide();
      };
    }
  }, [show, onClose]);

  return (
    <div className="modal fade" tabIndex="-1" ref={modalRef} aria-hidden="true">
      <div className="modal-dialog">
        <div className={`modal-content ${styles.borderClass}`}>
          <div className={`modal-header ${styles.headerClass}`}>
            <h5 className="modal-title">{title || styles.defaultTitle}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{message || 'Something went wrong.'}</p>
          </div>
          <div className="modal-footer">
            {/* <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
