import React from 'react';
import './Modal.css';

const Modal: React.FC<{ isOpen: boolean, onClose: () => void, children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;