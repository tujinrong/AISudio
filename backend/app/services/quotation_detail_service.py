from sqlalchemy.orm import Session
from app.models.quotation_detail import QuotationDetail
from app.schemas.quotation_detail import QuotationDetailCreate, QuotationDetailUpdate
from fastapi import HTTPException


class QuotationDetailService:
    @staticmethod
    def get_all(db: Session):
        return db.query(QuotationDetail).all()

    @staticmethod
    def get_by_id(db: Session, quotation_detail_id: int):
        return db.query(QuotationDetail).filter(QuotationDetail.id == quotation_detail_id).first()

    @staticmethod
    def create(db: Session, data: QuotationDetailCreate):
        quotation_detail = QuotationDetail(**data.dict())
        db.add(quotation_detail)
        db.commit()
        db.refresh(quotation_detail)
        return quotation_detail

    @staticmethod
    def update(db: Session, quotation_detail_id: int, data: QuotationDetailUpdate):
        quotation_detail = db.query(QuotationDetail).filter(
            QuotationDetail.id == quotation_detail_id).first()
        if not quotation_detail:
            raise HTTPException(
                status_code=404, detail="QuotationDetail not found")
        for key, value in data.dict(exclude_unset=True).items():
            setattr(quotation_detail, key, value)
        db.commit()
        db.refresh(quotation_detail)
        return quotation_detail

    @staticmethod
    def delete(db: Session, quotation_detail_id: int):
        quotation_detail = db.query(QuotationDetail).filter(
            QuotationDetail.id == quotation_detail_id).first()
        if not quotation_detail:
            raise HTTPException(
                status_code=404, detail="QuotationDetail not found")
        db.delete(quotation_detail)
        db.commit()
