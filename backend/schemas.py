from pydantic import BaseModel

# Definição da classe ToDoCreate para criar novos To-Dos
class ToDoCreate(BaseModel):
    title: str
    description: str

# Definição da classe ToDo para representar um To-Do completo
class ToDo(BaseModel):
    id: int
    title: str
    description: str
    username: str

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: int
    username: str
