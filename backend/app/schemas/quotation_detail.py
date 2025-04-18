# app/schemas/quotation_detail.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class QuotationDetailBase(BaseModel):
    quotation_table_id: int
    quotation_id: str
    quotation_branch_no: str
    quotation_detail_id: int
    quotation_type: str
    detail_type: str = '1'
    change_time: Optional[datetime] = None
    registration_time: Optional[datetime] = None
    product_id: Optional[str] = None
    product_name: Optional[str] = None
    unit_price: Optional[int] = None
    cost_price: Optional[int] = None
    rate_of_cost_price: Optional[int] = None
    rate_of_cost: Optional[int] = None
    quotation_price: Optional[int] = None
    total_cost_amount: Optional[int] = None
    process_type: Optional[str] = None
    quantity: Optional[int] = None
    reason_for_rejection: Optional[str] = None
    currency_classification_of_amount_provided: Optional[str] = None
    currency_classification_of_cost: Optional[str] = None
    counter1_for_confirmation: Optional[str] = None
    counter2_for_confirmation: Optional[str] = None
    compliance_check_remarks_column: Optional[str] = None
    intangible_flag: Optional[str] = None
    method_of_provision: Optional[str] = None
    contract_start_date: Optional[datetime] = None
    contract_end_date: Optional[datetime] = None
    purchase_request_approval_chk_flg: Optional[str] = None
    purchase_request_comments: Optional[str] = None
    shipping_method: Optional[str] = None
    fund_recognition_number: Optional[str] = None
    perform_id: Optional[str] = None
    cisco_vendor_support: Optional[str] = None
    arrangement_date: Optional[datetime] = None
    remarks: Optional[str] = None
    maker_model: Optional[str] = None
    quotation_date: Optional[datetime] = None
    zlifnr: str
    werks: Optional[str] = None
    supplier_quotation_expiration_date: Optional[datetime] = None
    statement_category: Optional[str] = None
    zdeal_id: str
    zdiscount: Optional[float] = None
    sales_date_plan: Optional[datetime] = None
    std_price: Optional[int] = None
    print_std_price: Optional[int] = None
    disc_rate: Optional[float] = None
    zmaker_product_code: Optional[str] = None
    service_std_id: Optional[str] = None
    zprf: Optional[float] = None


class QuotationDetailCreate(QuotationDetailBase):
    pass


class QuotationDetailUpdate(QuotationDetailBase):
    pass


class QuotationDetailOut(QuotationDetailBase):
    id: int

    class Config:
        from_attributes = True
