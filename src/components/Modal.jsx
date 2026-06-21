import React, { useState } from "react";

function Modal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", height: "100vh" }}>
      <h1>Modal Popup</h1>

      <button
        style={{ padding: "10px", cursor: "pointer" }}
        onClick={handleToggleModal}
      >
        Open Modal
      </button>

      {isOpenModal && (
        <div
          data-testid="modal-backdrop"
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "6px",
              minWidth: "300px",
            }}
          >
            <h1>Modal Header</h1>
            <p>This is the modal body</p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
