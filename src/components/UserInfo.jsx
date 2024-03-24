import React, { useState } from "react";
import "./styles/UserInfo.css";
import "boxicons";
import ModalDelete from "./ModalDelete";

const UserInfo = ({ user, setUsersEdit, handleOpenForm, deleteUsers }) => {
  const [handleDeleteModal, setHandleDeleteModal] = useState(false);

  const handleEdit = () => {
    setUsersEdit(user);
    handleOpenForm();
  };

  const handleDelete = () => {
    setHandleDeleteModal(true);
  };

  return (
    <div>
      <article className="user-info">
        <div className="user-info__details">
          <h2 className="user-info__name">{`${user.first_name} ${user.last_name}`}</h2>
          <section className="user__hr">
            <hr className="user__hr-hr" />
          </section>
          <div className="user-info__actions">
            <p className="user-info__email">Email: {user.email}</p>
          </div>
          <ul>
            <li>
              <span className="user-info__content">Correo: </span>
              <span className="user-info__birthday">{user.email}</span>
            </li>
            <li>
              <span className="user-info__content">Cumpleaños: </span>
              <span className="user-info__email">
                <box-icon
                  className="user__icon"
                  name="gift"
                  type="solid"
                  animation="tada"
                ></box-icon>
                {user.birthday}
              </span>
            </li>
          </ul>
          <div className="user-info__buttons">
            <button className="button button--delete" onClick={handleDelete}>
              <box-icon
                className="user__icon"
                name="trash-alt"
                type="solid"
                animation="flashing"
              ></box-icon>
            </button>
            <button className="button button--edit" onClick={handleEdit}>
              <box-icon
                className="user__icon"
                name="edit-alt"
                type="solid"
                animation="fade-right"
              ></box-icon>
            </button>
          </div>
        </div>
      </article>
      <article className="delete_conteiner">
        {handleDeleteModal && (
          <ModalDelete
            user={user}
            handleDeleteModal={setHandleDeleteModal}
            deleteUsers={deleteUsers}
          />
        )}
      </article>
    </div>
  );
};

export default UserInfo;
