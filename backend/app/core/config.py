# app/core/config.py
import os
from dotenv import load_dotenv

env = os.getenv("ENV", "local")
dotenv_file = f".env_{env}"
load_dotenv(dotenv_file)


class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY")


settings = Settings()
