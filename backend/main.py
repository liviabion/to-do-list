from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.responses import RedirectResponse
from fastapi import FastAPI, Request, Response
from auth import authenticate_user, get_password_hash
from schemas import UserCreate, User
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from models import fake_users_db

app = FastAPI()

# CORS settings
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key="your_secret_key")

@app.post("/register", response_model=User)
def register(user: UserCreate):
    for db_user in fake_users_db:
        if db_user["username"] == user.username:
            raise HTTPException(status_code=400, detail="Username already registered")
    user_dict = {
        "id": len(fake_users_db) + 1,
        "username": user.username,
        "hashed_password": get_password_hash(user.password)
    }
    fake_users_db.append(user_dict)
    return {"id": user_dict["id"], "username": user_dict["username"]}

@app.post("/login")
def login(response: Response, user: UserCreate):
    authenticated_user = authenticate_user(user.username, user.password)
    if not authenticated_user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    # Set session
    response.set_cookie(key="session_id", value=authenticated_user["username"])
    return {"message": "Login successful"}

@app.get("/home", response_model=User)
def read_home(request: Request):
    session_id = request.cookies.get("session_id")
    if not session_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user = next((user for user in fake_users_db if user["username"] == session_id), None)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    return {"id": user["id"], "username": user["username"]}

@app.post("/logout")
def logout(response: Response):
    response.delete_cookie("session_id")
    return {"message": "Logout successful"}
