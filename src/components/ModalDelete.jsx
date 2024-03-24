import React, { useState } from "react";
import "./styles/ModalExitos.css";

const ModalDelete = ({ user, handleDeleteModal, deleteUsers }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDeleteUsers = () => {
    setShowSuccessMessage(true);
  };

  const handleCancelDeleteUsers = () => {
    handleDeleteModal(false);
  };

  const handleExitoso = () => {
    handleDeleteModal(false);
    setShowSuccessMessage(false);
    deleteUsers("/users/", user.id);
  };

  return (
    <div className="modal">
      {showSuccessMessage && (
        <div className="modal-success">
          <h2 className="modal-title">¡Éxito!</h2>
          <p>
            El usuario {`${user.first_name} ${user.last_name}`} fue eliminado.
          </p>
          <button onClick={handleExitoso}>Cerrar</button>
        </div>
      )}
      <div className="modal-content">
        <h2>Eliminar usuario</h2>
        <p>
          ¿Estás seguro de que deseas eliminar al usuario{" "}
          {`${user.first_name} ${user.last_name}`}
        </p>
        <div className="modal-actions">
          <button className="modal-btn" onClick={handleCancelDeleteUsers}>
            Cancelar
          </button>
          <button className="modal-btn" onClick={handleDeleteUsers}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
