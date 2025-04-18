# run.py
from app.main import app
from dotenv import load_dotenv
import os

env = os.getenv("ENV", "local")
dotenv_file = f".env_{env}"
load_dotenv(dotenv_file)
