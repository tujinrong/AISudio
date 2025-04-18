# app/schemas/schemas.py
from pydantic import BaseModel
from typing import List, Optional


class ProgrammingLanguageSchema(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


class FrameworkSchema(BaseModel):
    id: int
    language_id: int
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


class DatabaseTypeSchema(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


class FrontendLanguageSchema(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


class FrontendLibrarySchema(BaseModel):
    id: int
    language_id: int
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


class CodeGenerationRequest(BaseModel):
    prompt_text: str
    uploaded_file_content: Optional[str] = None
    programming_language_id: int
    framework_id: int
    database_type_id: int
    frontend_language_id: int
    frontend_library_id: int
