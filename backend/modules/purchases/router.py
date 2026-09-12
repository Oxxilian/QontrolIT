from fastapi import APIRouter

from backend.core.apis import success
from backend.modules.purchases.service import PurchaseService


router = APIRouter(
    prefix="/purchases",
    tags=["Purchases"],
)

service = PurchaseService()


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