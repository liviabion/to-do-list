import { useEffect, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import styled from 'styled-components';
import Seta from '../assets/Seta.svg';
import User from '../assets/User.svg';
import NavLogo from '../assets/NavLogo.svg';
import Trash from '../assets/Trash.svg';
import SideLogo from '../assets/SideLogo.svg';

const Container = styled.div`
  display: flex;
  height: 100vh;
  margin: 0;
  background-color: #000000;
  color: #fff;
  font-family: 'Inter', sans-serif;
`;

const NavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #16161C;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  z-index: 100;
`;

const NavBarTitle = styled.h1`
  font-size: 2rem;
  color: #fff;
`;

const NavBarLogout = styled.button`
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
  padding-right: 90px;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #16161C;
  padding: 80px 20px 20px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const SidebarBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const UserName = styled.h1`
  font-size: 1.5rem;
  margin-top: 10px;
  text-align: center;
`;

const AppName = styled.h2`
  font-size: 1.2rem;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 5px;
`;

const AppDescription = styled.p`
  font-size: 0.9rem;
  color: #7A7A7A;
  text-align: center;
  margin-top: 5px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 100px 40px 40px; 
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: white;
`;

const AddButton = styled.button`
  background: linear-gradient(#F29682, #EE69AC, #CB4BCF);
  border: none;
  color: #FFFFFF;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ToDoList = styled.ul`
  margin-top: 20px;
`;

const ToDoItem = styled.li`
  background-color: #2e2e2e;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ToDoTitle = styled.h3`
  font-size: 1.2rem;
  color: #EE69AC;
`;

const ToDoDescription = styled.p`
  margin-top: 5px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff3b60;
  cursor: pointer;
  font-size: 1.2rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #2e2e2e;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

const ModalInput = styled.input`
  width: 90%;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #1e1e1e;
  border: 0;
  color: white;
  border-radius: 5px;
`;

const ModalTextarea = styled.textarea`
  width: 90%;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #1e1e1e;
  border: 0;
  color: white;
  border-radius: 5px;
`;

const ModalButton = styled.button`
  background: linear-gradient(#F29682, #EE69AC, #CB4BCF);
  border: none;
  color: #000000;
  padding: 15px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 15px;
  width: 30%;
`;

const CancelButton = styled(ModalButton)`
  background: #1e1e1e;
  width: 30%;
`;

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
    <Container>
      <NavBar>
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: "20px" }}>
          <Seta />
          <NavBarLogout onClick={handleLogout}>Sair</NavBarLogout>
        </div>
        <div style={{marginRight: '20px'}}>
          <NavLogo/>
        </div>
      </NavBar>
      <Sidebar>
        <SidebarTop>
          <UserProfile>
            <User />
            <UserName>Olá, {user.username}!</UserName>
          </UserProfile>
        </SidebarTop>
        <SidebarBottom>
          <SideLogo/>
          <div style={{alignItems: 'flex-start', display: 'flex', flexDirection: 'column', margin: '0'}}>
            <AppName>do it!</AppName>
            <AppDescription>seu to do app favorito :)</AppDescription>
          </div>
        </SidebarBottom>
      </Sidebar>
      <MainContent>
        <Header>
          <Title>Minhas tasks</Title>
          <AddButton onClick={() => setIsModalOpen(true)}>+</AddButton>
        </Header>

        <ToDoList>
          {todos.map(todo => (
            <ToDoItem key={todo.id}>
              <div>
                <ToDoTitle>{todo.title}</ToDoTitle>
                <ToDoDescription>{todo.description}</ToDoDescription>
              </div>
              <DeleteButton onClick={() => handleDeleteTodo(todo.id)}>
                <Trash/>
              </DeleteButton>
            </ToDoItem>
          ))}
        </ToDoList>

        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <h2>Adicionar nova tarefa</h2>
              <ModalInput
                type="text"
                placeholder="Título"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              />
              <ModalTextarea
                placeholder="Descrição"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              />
              <ModalButton onClick={handleCreateTodo}>Criar</ModalButton>
              <CancelButton onClick={() => setIsModalOpen(false)}>Cancelar</CancelButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainContent>
    </Container>
  );
};

export default HomePage;
