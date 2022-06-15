from werkzeug.security import generate_password_hash, check_password_hash

def hash(password: str):
    generate_password_hash(password)


def verify_hash(hashed_pass, plain_pass):
    check_password_hash(hashed_pass, plain_pass)