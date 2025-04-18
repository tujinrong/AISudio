# app/controllers/gemini_controller.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.schemas.code_generation_request import CodeGenerationRequest
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from app.core.config import settings

router = APIRouter()

GOOGLE_API_KEY = settings.GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)

generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

# safety_settings = [
#     {
#         "category": HarmCategory.HARASSMENT,
#         "threshold": HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
#     },
#     {
#         "category": HarmCategory.HATE_SPEECH,
#         "threshold": HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
#     },
#     {
#         "category": HarmCategory.SEXUALLY_EXPLICIT,
#         "threshold": HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
#     },
#     {
#         "category": HarmCategory.DANGEROUS_CONTENT,
#         "threshold": HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
#     },
# ]


@router.post("/generate-code")
async def generate_code(request: CodeGenerationRequest, db: Session = Depends(get_db)):
    try:
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=generation_config,
            # safety_settings=safety_settings,
        )

        prompt = f"""
        根据以下需求和文件内容，生成 {request.programming_language_id} {request.framework_id} 代码，数据库类型为 {request.database_type_id}，
        前端使用 {request.frontend_language_id} {request.frontend_library_id}。

        需求:
        {request.prompt_text}

        文件内容:
        {request.uploaded_file_content}
        """

        response = model.generate_content(prompt)
        return {"generated_code": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
