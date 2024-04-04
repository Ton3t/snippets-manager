import Axios from "axios";
import React from "react";
import "./Snippet.scss";

function Snippet({ snippet, getSnippets, editSnippet }) {
  async function deleteSnippet() {
    if (window.confirm("¿Seguro que quieres borrar el mensaje?")) {
      await Axios.delete(`http://localhost:5000/snippet/${snippet._id}`);
      getSnippets();
    }
  }

  return (
    <div className="snippet">
      {snippet.title && <h2 className="title">{snippet.title}</h2>}
      {snippet.description && (
        <p className="description">{snippet.description}</p>
      )}
      {snippet.code && (
        <pre className="code">
          <code>{snippet.code}</code>
        </pre>
      )}
      <button className="btn-edit" onClick={() => editSnippet(snippet)}>
        Editar
      </button>
      <button className="btn-delete" onClick={deleteSnippet}>
        Borrar
      </button>
    </div>
  );
}

export default Snippet;
