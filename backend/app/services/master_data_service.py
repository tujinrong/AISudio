# app/services/master_data_service.py
from sqlalchemy.orm import Session
from app.models.masters import ProgrammingLanguage, Framework, DatabaseType, FrontendLanguage, FrontendLibrary


class MasterDataService:
    @staticmethod
    def get_programming_languages(db: Session):
        data = db.query(ProgrammingLanguage).all()
        return data

    @staticmethod
    def get_frameworks_by_language_id(db: Session, language_id: int):
        return db.query(Framework).filter(Framework.language_id == language_id).all()

    @staticmethod
    def get_database_types(db: Session):
        return db.query(DatabaseType).all()

    @staticmethod
    def get_frontend_languages(db: Session):
        return db.query(FrontendLanguage).all()

    @staticmethod
    def get_frontend_libraries_by_language_id(db: Session, language_id: int):
        return db.query(FrontendLibrary).filter(FrontendLibrary.language_id == language_id).all()
