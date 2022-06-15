from fastapi import APIRouter, Depends, HTTPException, status
from models import Users
from database import database
from function import addnew_user, check_role
from sqlalchemy.orm import Session
from database import get_db
from schemas import add_user_superadmin, show_user
from auth import current_user

router = APIRouter(
    tags=["Add USers"]

)


@router.post('/user_add')
def add_user(user: add_user_superadmin, db: Session = Depends(get_db), cur_user: show_user = Depends(current_user)):
    role_id = cur_user.role_id
    print(role_id)
    role = check_role.check_role(int(role_id))
    if role == 'Superadmin':
        check = db.query(Users).filter(Users.email == user.email).first()
        if check:
            return HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
            new_role = user.role_id
            if new_role in [0, 1, 2, 3]:
                addnew_user.new_user(user)
                return 'User Added Successfully'
            else:
                return 'GIVEN ROLE ID IS INVALID'
    elif role == 'Admin':
        check = db.query(Users).filter(Users.email == user.email).first()
        if check:
            return HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
            new_role = user.role_id
            if new_role in [1, 2, 3]:
                user.c_id = cur_user.c_id
                addnew_user.new_user(user)
                return 'User Added Successfully'
            else:
                return 'GIVEN ROLE ID IS INVALID'
    elif role == 'Supervisor':
        check = db.query(Users).filter(Users.email == user.email).first()
        if check:
            return HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
            new_role = user.role_id
            if new_role in [2, 3]:
                user.c_id = cur_user.c_id
                addnew_user.new_user(user)
                return 'User Added Successfully'
            else:
                return 'GIVEN ROLE ID IS INVALID'
