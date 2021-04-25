import { useEffect } from 'react';

const Modal = ({ isVisible = false, title, content, footer, onClose }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-dialog bg-gray-100 sm:w-full lg:max-w-md xl:max-w-md "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex  justify-between items-center py-2 px-4 border-b-4 border-primary">
          <span
            className="modal-close text-2xl font-semibold cursor-pointer"
            onClick={onClose}
          >
            &times;
          </span>
          <h3 className="modal-title w-full text-center text-2xl font-semibold">
            {title}
          </h3>
        </div>
        <div className="modal-body w-full p-4 flex-grow overflow-x-hidden">
          <div className="modal-content h-full flex w-full">{content}</div>
        </div>
        {footer && (
          <div className="modal-footer py-4 px-16 text-center">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
