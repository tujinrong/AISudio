# app/routers.py
from fastapi import FastAPI
from app.controllers import gemini_controller, master_data_controller, quotation_controller, quotation_detail_controller


def register_routers(app: FastAPI):
    app.include_router(quotation_controller.router,
                       prefix="/api/quotation", tags=["Quotation"])
    app.include_router(quotation_detail_controller.router,
                       prefix="/api/quotation-detail", tags=["Quotation-detail"])
    app.include_router(gemini_controller.router,
                       prefix="/api/gemini", tags=["gemini"])
    app.include_router(master_data_controller.router,
                       prefix="/api/master", tags=["master"])
