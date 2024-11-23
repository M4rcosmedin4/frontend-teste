import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);

  // Carregar os itens da API ao iniciar
  useEffect(() => {
    fetch('/api/items')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);


  // Função para adicionar item
  const addItem = async () => {
    if (input.trim() === '') return;

    const newItem = { text: input };
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    const data = await response.json();
    setItems([...items, data]);
    setInput('');
  };

  // Função para deletar item
  const deleteItem = async (id) => {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    setItems(items.filter(item => item._id !== id));
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite uma tarefa"
      />
      <button onClick={addItem}>Adicionar</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.text}
            <button onClick={() => deleteItem(item._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
