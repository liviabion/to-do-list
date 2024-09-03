import { useEffect, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/home', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        Router.push('/');
      }
    };

    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/todos', { withCredentials: true });
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos', error);
      }
    };

    fetchUser();
    fetchTodos();
  }, []);

  if (!user) return <div>Carregando...</div>;

  const handleLogout = async () => {
    await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
    Router.push('/');
  };

  const handleCreateTodo = async () => {
    try {
      const response = await axios.post('http://localhost:8000/todos', newTodo, { withCredentials: true });
      setTodos([...todos, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating todo', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${todoId}`, { withCredentials: true });
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  return (
    <div>
      <h1>Bem-vindo, {user.username}!</h1>
      <button onClick={handleLogout}>Sair</button>

      <button onClick={() => setIsModalOpen(true)}>Adicionar To-Do</button>

      {isModalOpen && (
        <div>
          <h2>Adicionar novo To-Do</h2>
          <input
            type="text"
            placeholder="Título"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <textarea
            placeholder="Descrição"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          />
          <button onClick={handleCreateTodo}>Criar</button>
          <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
        </div>
      )}

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => handleDeleteTodo(todo.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
