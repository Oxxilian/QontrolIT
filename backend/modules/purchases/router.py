from fastapi import APIRouter
from pydantic import BaseModel

from backend.core.apis import success
from backend.core.databases.session import SessionLocal
from backend.modules.purchases.service import PurchaseService
from backend.modules.purchases.receipt_repository import (
    PurchaseReceiptRepository,
)


router = APIRouter(
    prefix="/purchases",
    tags=["Purchases"],
)

service = PurchaseService()


class PurchaseReceiptRequest(BaseModel):
    purchase_order_line_id: int
    quantity_received: float


class PurchaseReceiptUpdateRequest(BaseModel):
    quantity_received: float


def serialize_purchase(
    purchase_order,
) -> dict:

    return {
        "id": purchase_order.id,
        "order_number": purchase_order.order_number,
        "project_number": purchase_order.project_number,
        "project_name": purchase_order.project_name,
        "phase_code": purchase_order.phase_code,
        "phase_name": purchase_order.phase_name,
        "supplier": purchase_order.supplier,
        "buyer": purchase_order.buyer,
        "order_date": purchase_order.order_date,
        "delivery_date": purchase_order.delivery_date,
        "delivery_address": purchase_order.delivery_address,
        "pdf_path": purchase_order.pdf_path,
        "lines": [
            {
                "id": line.id,
                "quantity": line.quantity,
                "position_number": line.position_number,
                "profile": line.profile,
                "quality": line.quality,
                "length_mm": line.length_mm,
                "weight": line.weight,
            }
            for line in purchase_order.lines
        ],
    }


def serialize_receipt(
    receipt,
) -> dict:

    return {
        "id": receipt.id,
        "purchase_order_id": receipt.purchase_order_id,
        "purchase_order_line_id":
            receipt.purchase_order_line_id,
        "quantity_received":
            receipt.quantity_received,
    }


@router.get("/status")
def status():

    return success(
        {
            "module": "Purchases",
            "status": "ready",
        }
    )


@router.get("")
def get_purchases():

    purchases = service.get_all()

    return success(
        [
            serialize_purchase(
                purchase
            )
            for purchase in purchases
        ]
    )


@router.get("/{order_number}")
def get_purchase(
    order_number: str,
):

    purchase = service.get(
        order_number
    )

    if purchase is None:

        return success(
            None
        )

    return success(
        serialize_purchase(
            purchase
        )
    )


@router.post("/import")
def import_project(
    project_path: str,
):

    return success(
        service.import_project(
            project_path
        )
    )


@router.post("/{purchase_order_id}/receipts")
def create_receipt(
    purchase_order_id: int,
    request: PurchaseReceiptRequest,
):

    db = SessionLocal()

    try:

        repository = PurchaseReceiptRepository(
            db
        )

        receipt = repository.create(
            purchase_order_id=purchase_order_id,
            purchase_order_line_id=
                request.purchase_order_line_id,
            quantity_received=
                request.quantity_received,
        )

        return success(
            serialize_receipt(
                receipt
            )
        )

    finally:

        db.close()


@router.put(
    "/{purchase_order_id}/receipts/{receipt_id}"
)
def update_receipt(
    purchase_order_id: int,
    receipt_id: int,
    request: PurchaseReceiptUpdateRequest,
):

    db = SessionLocal()

    try:

        repository = PurchaseReceiptRepository(
            db
        )

        receipt = repository.update(
            receipt_id=receipt_id,
            purchase_order_id=purchase_order_id,
            quantity_received=
                request.quantity_received,
        )

        if receipt is None:

            return success(
                None
            )

        return success(
            serialize_receipt(
                receipt
            )
        )

    finally:

        db.close()


@router.get("/{purchase_order_id}/receipts")
def get_receipts(
    purchase_order_id: int,
):

    db = SessionLocal()

    try:

        repository = PurchaseReceiptRepository(
            db
        )

        receipts = repository.get_by_purchase_order(
            purchase_order_id
        )

        return success(
            [
                serialize_receipt(
                    receipt
                )
                for receipt in receipts
            ]
        )

    finally:

        db.close()