from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.schemas.quotation import QuotationCreate, QuotationUpdate, QuotationOut
from app.services.quotation_service import QuotationService

router = APIRouter()


@router.get("/", response_model=list[QuotationOut])
def get_all(db: Session = Depends(get_db)):
    return QuotationService.get_all(db)


@router.get("/{quotation_id}", response_model=QuotationOut)
def get_by_id(quotation_id: int, db: Session = Depends(get_db)):
    quotation = QuotationService.get_by_id(db, quotation_id)
    if not quotation:
        raise HTTPException(status_code=404, detail="Quotation not found")
    return quotation


@router.post("/", response_model=QuotationOut)
def create(data: QuotationCreate, db: Session = Depends(get_db)):
    return QuotationService.create(db, data)


@router.put("/{quotation_id}", response_model=QuotationOut)
def update(quotation_id: int, data: QuotationUpdate, db: Session = Depends(get_db)):
    return QuotationService.update(db, quotation_id, data)


@router.delete("/{quotation_id}")
def delete(quotation_id: int, db: Session = Depends(get_db)):
    QuotationService.delete(db, quotation_id)
    return {"message": "Deleted"}
