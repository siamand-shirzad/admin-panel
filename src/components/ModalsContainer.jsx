import React from 'react';
import { createPortal } from 'react-dom';

const ModalsContainer = ({children}) => {
  return createPortal(
    <>
    {children}
    </>,
    document.getElementById('modal-root'))
};

export default ModalsContainer;