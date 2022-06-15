from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from database import database
from models import Users

oauth = OAuth2PasswordBearer('/login')

SECRET_KEY = "82541c5636f691e7d2871f9f316bff62f0d84101e4daf2d795dd128b27faf60d"


def current_user(token=Depends(oauth)):
    payload = jwt.decode(token, SECRET_KEY)
    email: str = payload.get('sub')
    if email is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    else:
        current_user = database.query(Users).filter(
            Users.email == email).first()
        if current_user:
            return current_user
        else:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)


# create_access_token