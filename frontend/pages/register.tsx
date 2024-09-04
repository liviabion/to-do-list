import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import styled from 'styled-components';
import Intro from '../assets/IntroLogo.svg';


const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #000000;
  color: white;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  gap: 250px;
  font-family: 'Inter', sans-serif;
`;

const RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  border-radius: 8px;
  width: 400px;
`;

const Title = styled.h1`
  font-size: 52px;
  margin-bottom: 20px;
  color: white;
`;

const Label = styled.h1`
  font-size: 20px;
  margin-bottom: 15px;
  color: white;
  font-family: 'Inter', sans-serif;
`;

const Input = styled.input`
  padding: 15px;
  margin-bottom: 20px;
  background-color: #1e1e1e;
  border: 0;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  width: 100%;
`;

const Button = styled.button`
  background: linear-gradient(#F29682, #EE69AC, #CB4BCF);
  border: none;
  color: #000000;
  padding: 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 15px;
  width: 105%;
  margin-bottom: 20px;
`;

const RedirectButton = styled.button`
  background: none;
  border: none;
  color: #ff3b60;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
`;

const CirclesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
`;


const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/register', { username, password });
      Router.push('/');
    } catch (error) {
      alert('Erro ao registrar usuário');
    }
  };

  return (
    <Container>
      <RegisterBox>
        <Title>do it!</Title>
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
          <div>
            <Label>Usuário</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={{paddingBottom: "15px"}}>
            <Label>Senha</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Registrar</Button>
        </form>
        <RedirectButton onClick={() => Router.push('/')}>
          Já tem uma conta? Faça login
        </RedirectButton>
      </RegisterBox>
      <CirclesContainer>
        <Intro/>
      </CirclesContainer>
    </Container>
  );
};

export default RegisterPage;
