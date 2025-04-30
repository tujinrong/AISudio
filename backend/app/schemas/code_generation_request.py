from pydantic import BaseModel
from typing import List, Optional


class CodeGenerationRequest(BaseModel):
    prompt_text: str
    uploaded_file_content: Optional[str] = None
    programming_language_id: Optional[str] = None
    framework_id: Optional[str] = None
    database_type_id: Optional[str] = None
    frontend_language_id: Optional[str] = None
    frontend_library_id: Optional[str] = None
