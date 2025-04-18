from pydantic import BaseModel
from typing import List, Optional


class CodeGenerationRequest(BaseModel):
    prompt_text: str
    uploaded_file_content: Optional[str] = None
    programming_language_id: int
    framework_id: int
    database_type_id: int
    frontend_language_id: int
    frontend_library_id: int
