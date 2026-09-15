from sqlalchemy import select

from backend.core.databases.session import SessionLocal

from .models import PurchaseOrder
from .models import PurchaseOrderLine


class PurchaseRepository:
    """
    Repository voor inkooporders.

    Verantwoordelijk voor het opslaan,
    bijwerken en ophalen van inkooporders.
    """

    def __init__(self) -> None:

        self.db = SessionLocal()

    def save(
        self,
        purchase_order: dict,
    ) -> PurchaseOrder:

        purchase_order_model = self.db.scalar(
            select(PurchaseOrder).where(
                PurchaseOrder.order_number
                == purchase_order["order_number"]
            )
        )

        if purchase_order_model is None:

            purchase_order_model = PurchaseOrder(
                order_number=purchase_order[
                    "order_number"
                ],
            )

            self.db.add(
                purchase_order_model,
            )

        purchase_order_model.project_number = (
            purchase_order["project_number"]
        )

        purchase_order_model.phase_code = (
            purchase_order["phase_code"]
        )

        purchase_order_model.project_name = (
            purchase_order["project_name"]
        )

        purchase_order_model.phase_name = (
            purchase_order["phase_name"]
        )

        purchase_order_model.supplier = (
            purchase_order["supplier"]
        )

        purchase_order_model.buyer = (
            purchase_order["buyer"]
        )

        purchase_order_model.order_date = (
            purchase_order["order_date"]
        )

        purchase_order_model.delivery_date = (
            purchase_order["delivery_date"]
        )

        purchase_order_model.delivery_address = (
            purchase_order["delivery_address"]
        )

        purchase_order_model.pdf_path = (
            purchase_order.get(
                "pdf_path",
                "",
            )
        )

        purchase_order_model.lines.clear()

        self.db.flush()

        for line in purchase_order["lines"]:

            line_model = PurchaseOrderLine(
                purchase_order=purchase_order_model,
                quantity=line["quantity"],
                position_number=line[
                    "position_number"
                ],
                profile=line["profile"],
                quality=line["quality"],
                length_mm=line["length_mm"],
                weight=line["weight"],
            )

            self.db.add(
                line_model,
            )

        self.db.commit()

        self.db.refresh(
            purchase_order_model,
        )

        return purchase_order_model

    def get(
        self,
        order_number: str,
    ) -> PurchaseOrder | None:

        return self.db.scalar(
            select(PurchaseOrder).where(
                PurchaseOrder.order_number
                == order_number
            )
        )

    def get_all(
        self,
    ) -> list[PurchaseOrder]:

        return list(
            self.db.scalars(
                select(PurchaseOrder).order_by(
                    PurchaseOrder.order_number
                )
            )
        )

    def exists(
        self,
        order_number: str,
    ) -> bool:

        return (
            self.get(order_number)
            is not None
        )

    def close(self) -> None:

        self.db.close()