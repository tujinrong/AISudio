# app/controllers/quotation_detail_controller.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.schemas.quotation_detail import QuotationDetailCreate, QuotationDetailUpdate, QuotationDetailOut
from app.services.quotation_detail_service import QuotationDetailService

router = APIRouter()


@router.get("/", response_model=list[QuotationDetailOut])
def get_all(db: Session = Depends(get_db)):
    return QuotationDetailService.get_all(db)


@router.get("/{quotation_detail_id}", response_model=QuotationDetailOut)
def get_by_id(quotation_detail_id: int, db: Session = Depends(get_db)):
    quotation_detail = QuotationDetailService.get_by_id(
        db, quotation_detail_id)
    if not quotation_detail:
        raise HTTPException(
            status_code=404, detail="QuotationDetail not found")
    return quotation_detail


@router.post("/", response_model=QuotationDetailOut)
def create(data: QuotationDetailCreate, db: Session = Depends(get_db)):
    return QuotationDetailService.create(db, data)


@router.put("/{quotation_detail_id}", response_model=QuotationDetailOut)
def update(quotation_detail_id: int, data: QuotationDetailUpdate, db: Session = Depends(get_db)):
    return QuotationDetailService.update(db, quotation_detail_id, data)


@router.delete("/{quotation_detail_id}")
def delete(quotation_detail_id: int, db: Session = Depends(get_db)):
    QuotationDetailService.delete(db, quotation_detail_id)
    return {"message": "Deleted"}
