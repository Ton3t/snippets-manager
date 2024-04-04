import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import UserContext from "../../context/UserContext";
import axios from "axios";

function Navbar() {
  const { user, getUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function logOut() {
    await axios.get("http://localhost:5000/auth/logOut");
    await getUser();

    navigate("/");
  }

  return (
    <div className="navbar">
      <Link to="/">
        <h1>Snippet manager</h1>
      </Link>
      {user === null ? (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        user && (
          <button className="btn-logout" onClick={logOut}>
            Cerrar sesión
          </button>
        )
      )}
    </div>
  );
}

export default Navbar;
