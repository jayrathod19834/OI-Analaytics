from pydantic import BaseModel
from typing import Optional
from marshmallow import schema,fields

class company_pydantic(BaseModel):
    company_name:OPtional[str]
    country: Optional[str]
    state:Optional[str]
    city:Optional[str]
    pincode:Optional[str]
    department:Optional[str]
    branch:Optional[str]
    address:Optional[str]

class company_marsh(schema):
    company_name = fileds.String(required = True)
    country = fields.String(required = True)
    state = fields.String