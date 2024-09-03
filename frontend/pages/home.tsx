import { useEffect, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/home', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        Router.push('/');
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Carregando...</div>;

  const handleLogout = async () => {
    await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
    Router.push('/');
  };

  return (
    <div>
      <h1>Bem-vindo, {user.username}!</h1>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default HomePage;
