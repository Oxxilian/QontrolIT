from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import PurchaseReceipt


class PurchaseReceiptRepository:
    """
    Repository voor ontvangsten van inkoopregels.
    """

    def __init__(self, db: Session) -> None:
        self.db = db

    def create(
        self,
        purchase_order_id: int,
        purchase_order_line_id: int,
        quantity_received: float,
    ) -> PurchaseReceipt:

        receipt = PurchaseReceipt(
            purchase_order_id=purchase_order_id,
            purchase_order_line_id=purchase_order_line_id,
            quantity_received=quantity_received,
        )

        self.db.add(receipt)
        self.db.commit()
        self.db.refresh(receipt)

        return receipt

    def get_by_purchase_order(
        self,
        purchase_order_id: int,
    ) -> list[PurchaseReceipt]:

        return list(
            self.db.scalars(
                select(PurchaseReceipt)
                .where(
                    PurchaseReceipt.purchase_order_id
                    == purchase_order_id
                )
                .order_by(PurchaseReceipt.id)
            )
        )

    def get_by_purchase_order_line(
        self,
        purchase_order_line_id: int,
    ) -> list[PurchaseReceipt]:

        return list(
            self.db.scalars(
                select(PurchaseReceipt)
                .where(
                    PurchaseReceipt.purchase_order_line_id
                    == purchase_order_line_id
                )
                .order_by(PurchaseReceipt.id)
            )
        )

    def get_total_received(
        self,
        purchase_order_line_id: int,
    ) -> float:

        receipts = self.get_by_purchase_order_line(
            purchase_order_line_id
        )

        return sum(
            receipt.quantity_received
            for receipt in receipts
        )

    def create_adjustment(
        self,
        purchase_order_id: int,
        purchase_order_line_id: int,
        quantity_received: float,
    ) -> PurchaseReceipt:

        return self.create(
            purchase_order_id=purchase_order_id,
            purchase_order_line_id=purchase_order_line_id,
            quantity_received=quantity_received,
        )

    def update(
        self,
        receipt_id: int,
        purchase_order_id: int,
        quantity_received: float,
    ) -> PurchaseReceipt | None:

        receipt = self.db.scalar(
            select(PurchaseReceipt)
            .where(
                PurchaseReceipt.id == receipt_id,
                PurchaseReceipt.purchase_order_id
                == purchase_order_id,
            )
        )

        if receipt is None:
            return None

        receipt.quantity_received = quantity_received

        self.db.commit()
        self.db.refresh(receipt)

        return receipt