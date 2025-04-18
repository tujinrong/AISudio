from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.schemas.masters import ProgrammingLanguageSchema, FrameworkSchema, DatabaseTypeSchema, FrontendLanguageSchema, FrontendLibrarySchema
from app.services.master_data_service import MasterDataService

router = APIRouter()


@router.get("/programming-languages", response_model=List[ProgrammingLanguageSchema])
def get_programming_languages(db: Session = Depends(get_db)):
    return MasterDataService.get_programming_languages(db)


@router.get("/frameworks/{language_id}", response_model=List[FrameworkSchema])
def get_frameworks_by_language(language_id: int, db: Session = Depends(get_db)):
    return MasterDataService.get_frameworks_by_language_id(db, language_id)


@router.get("/database-types", response_model=List[DatabaseTypeSchema])
def get_database_types(db: Session = Depends(get_db)):
    return MasterDataService.get_database_types(db)


@router.get("/frontend-languages", response_model=List[FrontendLanguageSchema])
def get_frontend_languages(db: Session = Depends(get_db)):
    return MasterDataService.get_frontend_languages(db)


@router.get("/frontend-libraries/{language_id}", response_model=List[FrontendLibrarySchema])
def get_frontend_libraries_by_language(language_id: int, db: Session = Depends(get_db)):
    return MasterDataService.get_frontend_libraries_by_language_id(db, language_id)
