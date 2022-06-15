from fastapi import FastAPI
from .routes.auth import login

app = FastAPI()

app.include_router(login.router)

@app.get('/')
def root():
    return {'message': 'Hello, World'}
