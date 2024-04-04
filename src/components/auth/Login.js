import Axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForm.scss";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";

function Login() {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    try {
      await Axios.post("http://localhost:5000/auth/login", loginData);
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
      <h2>Iniciar Sesión</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className="form" onSubmit={login}>
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

        <button className="btn-submit" type="submit">
          Iniciar Sesión
        </button>
      </form>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Registrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;
