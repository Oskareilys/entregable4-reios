import { useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import "./styles/FormUser.css";
const FormUser = ({
  createUser,
  usersEdit,
  updateUsers,
  setUsersEdit,
  formIsClose,
  setFormIsClose,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset(usersEdit);
  }, [usersEdit]);

  const submit = (data) => {
    if (usersEdit) {
      updateUsers("/users/", usersEdit.id, data);
      setUsersEdit();
    } else {
      createUser("/users/", data);
    }
    setFormIsClose(true);
    reset({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
    });
  };

  const handleFormClose = () => {
    setFormIsClose(true);
    reset({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
    });
    setUsersEdit();
  };
  const validateBirthday = (value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!value || !regex.test(value)) {
      return true;
    }

    const today = new Date();
    const birthDate = new Date(value);

    if (birthDate >= today) {
      return "No puede agregar una fecha del futuro";
    }

    const minimumAge = 18;
    const ageDiffInMs = today.getTime() - birthDate.getTime();
    const ageInYears = Math.floor(ageDiffInMs / (1000 * 60 * 60 * 24 * 365));

    if (ageInYears < minimumAge) {
      return `La edad mínima es de ${minimumAge} años`;
    }

    return true;
  };

  const validateEmail = (value) => {
    const emailRegex = /^\w+@[a-zA-Z_\.]+\.[a-zA-Z]{2,}$/;

    if (!value || !emailRegex.test(value)) {
      return "El correo electrónico no tiene un formato válido.";
    } else {
      return true;
    }
  };

  return (
    <div className={`form-container ${formIsClose && "form__close"}`}>
      <form className="form" on onSubmit={handleSubmit(submit)}>
        <header className="form__header">
          <h2 className="form__title">Formulario de Usuario</h2>
          <div onClick={handleFormClose} className="form__exit">
            x
          </div>
        </header>
        <label className="form__label">
          <span className="form__field">Email</span>
          <input
            className="form__input"
            {...register("email", { validate: validateEmail })}
            type="email"
            required
            placeholder="direcciondecorreo@correo.com"
          />
          {errors.email && (
            <span className="form__error">{errors.email.message}</span>
          )}
        </label>
        <label className="form__label">
          <span className="form__field">Contraseña</span>
          <input
            className="form__input"
            {...register("password")}
            type="password"
            minLength="8"
            required
            placeholder="Ingrese su contraseña"
          />
        </label>
        <label className="form__label">
          <span className="form__field">Nombre</span>
          <input
            className="form__input"
            {...register("first_name")}
            type="text"
            maxLength="20"
            minLength="3"
            required
            placeholder="Ingrese su nombre"
          />
        </label>
        <label className="form__label">
          <span className="form__field">Apellido</span>
          <input
            className="form__input"
            {...register("last_name")}
            type="text"
            maxLength="20"
            minLength="3"
            requierd
            placeholder="Ingrese su apellido"
          />
        </label>
        <label className="form__label">
          <span className="form__field">Fecha de Nacimiento</span>
          <input
            className="form__input"
            {...register("birthday", { validate: validateBirthday })}
            type="date"
          />
          {errors.birthday && (
            <span className="form__error">{errors.birthday.message}</span>
          )}
        </label>
        <button className="form__btn">Guardar</button>
      </form>
    </div>
  );
};

export default FormUser;
