import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
  const elem = document.createElement('div');
  useEffect(() => {
    const modalRoot = document.getElementById('modalRoot');

    modalRoot.appendChild(elem);
    return () => modalRoot.removeChild(elem);
  }, [elem]);
  return createPortal(children, elem);
};

export default Modal;
