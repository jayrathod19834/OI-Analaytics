from fastapi import APIRouter, Depends, HTTPException, status
from database import get_db
from models import Users
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from werkzeug.security import check_password_hash
from ...helpers.tokens import create_access_token

router = APIRouter(
    tags=['Login']
)


@router.post('/login')
def auth(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.email == request.username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email Incorrect")
    password = check_password_hash(user.password, request.password)
    if not password:
        raise HTTPException(status_code=404, detail="Password Incorrect")
    access_token = create_access_token(data={'sub': user.email})
    return {"access_token": access_token, "token_type": "bearer"}
