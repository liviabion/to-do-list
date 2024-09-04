# do it - To-Do List Application

**Repositório**: [https://github.com/liviabion/to-do-list](https://github.com/liviabion/to-do-list)  
**API**: **FastAPI** - Backend para gerenciar operações de lista de tarefas (To-Do List).

## Índice

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Pré-requisitos](#pré-requisitos)
5. [Como Rodar o Projeto](#como-rodar-o-projeto)
6. [Rotas da API](#rotas-da-api)

---

## Sobre o Projeto

O **"do it"** é uma aplicação web para gerenciamento de tarefas (To-Do List). A aplicação permite que os usuários façam o registro e login para criar, listar, editar e excluir tarefas. O projeto foi desenvolvido utilizando **Next.js** no frontend e **FastAPI** no backend.

O foco do projeto é proporcionar uma experiência simples e eficiente para gerenciar tarefas pessoais.

## Funcionalidades

- Cadastro e login de usuários.
- Autenticação de usuários usando cookies de sessão.
- Criação de tarefas com título e descrição.
- Listagem das tarefas do usuário logado.
- Exclusão de tarefas.
- Interface moderna e responsiva utilizando Next.js e styled-components.

## Tecnologias Utilizadas

- **Frontend**: Next.js, React.js, styled-components, Axios.
- **Backend**: FastAPI, Pydantic.
- **Gerenciamento de Estado**: Sessões via cookies.
- **Banco de dados**: Simulação com listas em memória.

## Pré-requisitos

Antes de começar, certifique-se de que você atendeu aos seguintes requisitos:

- Ter o **Node.js** instalado em sua máquina (versão recomendada: 14.x ou superior).
- Ter o **Python 3.8** ou superior instalado para rodar o backend com FastAPI.
- (Opcional) Uma chave de API do [NewsAPI](https://newsapi.org/) se você quiser conectar a funcionalidade de notícias.

## Como Rodar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clonando o Repositório

Primeiro, clone o repositório do projeto:

```bash
git clone https://github.com/liviabion/to-do-list.git
```

### 2. Instalando as Dependências

#### Frontend:

Navegue até o diretório do frontend e instale as dependências:

```bash
cd frontend
npm install
```

#### Backend:

Navegue até o diretório do backend e instale as dependências:

```bash
cd backend
npm install
```
### 3. Executando o Projeto

```bash
cd frontend
npm run dev
```

### 4. Acessando a Aplicação

Acesse o frontend no navegador: http://localhost:3000.
O backend pode ser visualizado em: http://localhost:8000.


## Rotas da API

O backend gerencia as operações de autenticação e manipulação de tarefas (CRUD) através das seguintes rotas:

### Registro de Usuário:
- **POST /register**  
  Cadastra um novo usuário.

### Login de Usuário:
- **POST /login**  
  Autentica o usuário e cria uma sessão.

### Logout de Usuário:
- **POST /logout**  
  Remove a sessão do usuário.

### Listar Tarefas:
- **GET /todos**  
  Retorna todas as tarefas do usuário logado.

### Criar Tarefa:
- **POST /todos**  
  Cria uma nova tarefa com título e descrição.

### Excluir Tarefa:
- **DELETE /todos/{todo_id}**  
  Exclui uma tarefa específica.
