from passlib.context import CryptContext
from fastapi import HTTPException, status
from models import fake_users_db, pwd_context

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(username: str, password: str):
    user = next((user for user in fake_users_db if user["username"] == username), None)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user
