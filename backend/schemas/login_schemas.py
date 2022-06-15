import imp

import pydantic
from marshmallow import fields, schemas
from pydantic import BaseModel
from typing import Optional


class loginPydantic(BaseModel):
    email: Optional[str]
    password: Optional[str]


class request_login(schema):
    email = fields.Email(requiredd= True)
    password = fields.string(required= True)
