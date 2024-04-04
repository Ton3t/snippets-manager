import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForm.scss";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";

function Register() {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordVerify, setFormPasswordVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    const registerData = {
      email: formEmail,
      password: formPassword,
      passwordVerify: formPasswordVerify,
    };

    try {
      await Axios.post("http://localhost:5000/auth/", registerData);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          return setErrorMessage(err.response.data.errorMessage);
        }
      }
    }
    await getUser();
    navigate("/");
  }

  return (
    <div className="auth-form">
      <h2>Registra una nueva cuenta</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className="form" onSubmit={register}>
        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          type="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />

        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          type="password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />

        <label htmlFor="form-passwordVerify">Validar Password</label>
        <input
          id="form-passwordVerify"
          type="password"
          value={formPasswordVerify}
          onChange={(e) => setFormPasswordVerify(e.target.value)}
        />
        <button className="btn-submit" type="submit">
          Registrar
        </button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
}

export default Register;
