from fastapi import FastAPI
from app.routers import register_routers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Studio")
# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_routers(app)
