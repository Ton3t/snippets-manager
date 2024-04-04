import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import "./Home.scss";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setSnippets([]); // ahora refrescamos los snippets al cerrar sesión
      return;
    }
    // recibir snippets
    getSnippets();
  }, [user]);

  async function getSnippets() {
    const snippetsRes = await Axios.get("http://localhost:5000/snippet/");
    setSnippets(snippetsRes.data);
    console.log(snippetsRes.data);
  }

  function editSnippet(snippetData) {
    setEditSnippetData(snippetData);
    setSnippetEditorOpen(true);
  }

  function renderSnippets() {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedSnippets.map((snippet, i) => {
      return (
        <Snippet
          key={i}
          snippet={snippet}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  }

  return (
    <div className="home">
      {!snippetEditorOpen && user && (
        <button
          className="btn-editor-toggle"
          onClick={() => setSnippetEditorOpen(true)}
        >
          Añadir Snippet
        </button>
      )}

      {snippetEditorOpen && (
        <SnippetEditor
          setSnippetEditorOpen={setSnippetEditorOpen}
          getSnippets={getSnippets}
          editSnippetData={editSnippetData}
        />
      )}
      {snippets.length > 0
        ? renderSnippets()
        : user && (
            <h3 className="no-snippets-msg">No has añadido ningún Snippet</h3>
          )}
      {user === null && (
        <div className="no-user-message">
          <h2>Bienvenido a Snippet Manager</h2>
          <Link to="/register">Registrate aquí</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
