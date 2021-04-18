import React, { useEffect } from "react";

const Modal = (props) => {
    useEffect(() => {
        setTimeout(() => {
            props.closeModal();
        }, 3000);
    });
    return (
        <div className="modal">
            <p>{props.content}</p>
        </div>
    );
};

export default Modal;
