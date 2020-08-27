import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const newRepository = {
    title: "Test Repository",
    url: "www.github.com",
    techs: ["ReactJS", "NodeJS"]
  }
  const initialState = [];
  const [repositories, setRepositories] = useState(initialState)
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    api.post('/repositories', newRepository).then(newRepository => {
      setRepositories([...repositories, newRepository.data]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">

      {repositories.map(repository => (
        <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
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
