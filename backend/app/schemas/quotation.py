# app/schemas/quotation.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class QuotationBase(BaseModel):
    quotation_id: str
    quotation_branch_no: str
    quotation_sfid: str
    quotation_name: Optional[str] = None
    quotation_text: str
    expected_order_sfid: str
    sales_office: Optional[str] = None
    sales_office_name: Optional[str] = None
    sales_group: Optional[str] = None
    sales_group_name: Optional[str] = None
    sales_user_id: Optional[str] = None
    business_user_id: Optional[str] = None
    sales_organization: Optional[str] = None
    sales_organization_name: Optional[str] = None
    quotation_pattern: str
    opportunity_flg: Optional[str] = None
    currency_category: Optional[str] = None
    quotation_amount_jpy: Optional[int] = None
    quotation_amount_usd: Optional[float] = None
    machine_service_sales_date_plan: Optional[datetime] = None
    terms_contract_start_date: Optional[datetime] = None
    terms_contract_end_date: Optional[datetime] = None
    status_cpq_id: Optional[str] = None
    order_recipient_id: Optional[str] = None
    quotation_start_date: Optional[datetime] = None
    quotation_expiration_date: Optional[datetime] = None
    supplier_quotation_expiration_date: Optional[datetime] = None
    maintenance_contract_id: Optional[str] = None
    individual_contract_no: Optional[str] = None
    non_regulated_supplier: Optional[str] = None
    compliance_flg: Optional[str] = None
    profit_rate: Optional[float] = None
    machine_forecast_amount: Optional[int] = None
    contract_forecast_amount: Optional[int] = None
    quotation_type_010: Optional[str] = None
    quotation_type_020: Optional[str] = None
    quotation_type_030: Optional[str] = None
    quotation_type_040: Optional[str] = None
    quotation_type_050: Optional[str] = None
    quotation_type_060: Optional[str] = None
    quotation_type_070: Optional[str] = None
    quotation_type_080: Optional[str] = None
    quotation_type_090: Optional[str] = None
    quotation_type_100: Optional[str] = None
    quotation_type_110: Optional[str] = None
    quotation_type_120: Optional[str] = None
    seal_type_id: Optional[str] = None
    in_charge_name: Optional[str] = None
    maintenance_box_id: Optional[str] = None
    vbeln: Optional[str] = None
    contstart_date: Optional[datetime] = None
    contend_date: Optional[datetime] = None
    quotation_id_from: Optional[str] = None
    quotation_branch_no_from: Optional[str] = None
    quotation_date: Optional[datetime] = None
    delivery_address_memo: Optional[str] = None
    billing_address_memo: Optional[str] = None
    sava_memo: Optional[str] = None
    special_remarks: Optional[str] = None
    profit_rate_ex_lease: Optional[float] = None
    machine_forecast_amount_ex_lease: Optional[int] = None
    contract_forecast_amount_ex_lease: Optional[int] = None
    invalid_flag: Optional[str] = None
    profit_rate_machine: Optional[float] = None
    profit_rate_period_ex_lease: Optional[float] = None
    bcntrctno: Optional[str] = None
    bill_cond: Optional[str] = None
    cntform: Optional[str] = None


class QuotationCreate(QuotationBase):
    pass


class QuotationUpdate(QuotationBase):
    pass


class QuotationOut(QuotationBase):
    id: int

    class Config:
        from_attributes = True
