# app/services/quotation_service.py
from sqlalchemy.orm import Session
from app.models.quotation import Quotation
from app.schemas.quotation import QuotationCreate, QuotationUpdate
from fastapi import HTTPException


class QuotationService:
    @staticmethod
    def get_all(db: Session):
        return db.query(Quotation).all()

    @staticmethod
    def get_by_id(db: Session, quotation_id: int):
        return db.query(Quotation).filter(Quotation.id == quotation_id).first()

    @staticmethod
    def create(db: Session, data: QuotationCreate):
        quotation = Quotation(**data.dict())
        db.add(quotation)
        db.commit()
        db.refresh(quotation)
        return quotation

    @staticmethod
    def update(db: Session, quotation_id: int, data: QuotationUpdate):
        quotation = db.query(Quotation).filter(
            Quotation.id == quotation_id).first()
        if not quotation:
            raise HTTPException(status_code=404, detail="Quotation not found")
        for key, value in data.dict(exclude_unset=True).items():
            setattr(quotation, key, value)
        db.commit()
        db.refresh(quotation)
        return quotation

    @staticmethod
    def delete(db: Session, quotation_id: int):
        quotation = db.query(Quotation).filter(
            Quotation.id == quotation_id).first()
        if not quotation:
            raise HTTPException(status_code=404, detail="Quotation not found")
        db.delete(quotation)
        db.commit()
