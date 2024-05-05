import { useEffect, useState } from "react";

import "./App.css";
import useCrud from "./hooks/useCrud";
import FormUser from "./components/FormUser";
import UserInfo from "./components/UserInfo";

function App() {
  const [usersEdit, setUsersEdit] = useState();
  const [formIsClose, setFormIsClose] = useState(true);

  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);

  const BASEURL = "https://users-crud-sejr.onrender.com";
  //"https://users-crud.academlo.tech";

  const [users, getUsers, createUsers, deleteUsers, updateUsers] =
    useCrud(BASEURL);

  useEffect(() => {
    getUsers("/users/");
  }, []);

  const handleOpenForm = () => {
    setFormIsClose(false);
  };

  const handleOpenCreateModal = () => {
    setModalCreateIsOpen(true);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Usuarios</h1>
        <button onClick={handleOpenForm} className="form__btn">
          Crear Nuevo Usuario
        </button>
      </header>
      <FormUser
        createUser={createUsers}
        usersEdit={usersEdit}
        updateUsers={updateUsers}
        setUsersEdit={setUsersEdit}
        formIsClose={formIsClose}
        setFormIsClose={setFormIsClose}
      />
      <div className="user-container">
        {users?.map((user) => (
          <UserInfo
            key={user.id}
            user={user}
            deleteUsers={deleteUsers}
            setUsersEdit={setUsersEdit}
            handleOpenForm={handleOpenForm}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
