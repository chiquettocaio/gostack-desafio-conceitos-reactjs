import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepos(response.data)
    })
  }, [])

  async function handleAddRepository() {
    api.post('/repositories', {
      url: "https://github.com/chiquettocaio",
      title: "Desafio ReactJS Conceitos",
      techs: ["React", "Node.js"],
    })
    .then(reponse => {
      setRepos([ ...repos, reponse.data ])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const repoPosition = repos.findIndex(r => r.id === id)
      repos.splice(repoPosition, 1)
      setRepos([ ...repos ])
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
