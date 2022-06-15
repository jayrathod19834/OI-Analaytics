from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

SQL_DATABASE_URI = 'mysql+pymysql://root:0000@localhost/jayesh'

engine = create_engine(SQL_DATABASE_URI)

Base = declarative_base()

session = Session(bind=engine, expire_on_commit=False)


def get_db():
    db = session
    try:
        yield db
    finally:
        db.closer()
