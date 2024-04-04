import React from "react";
import "./style/index.scss";
import Axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import Router from "./Router";



Axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <Router />
      </div>
    </UserContextProvider>
  );
}

export default App;
