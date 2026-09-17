from backend.core.databases.session import SessionLocal

from .receipt_repository import PurchaseReceiptRepository


class PurchaseReceiptService:
    """
    Businesslogica voor ontvangsten van inkoopregels.
    """

    def create(
        self,
        purchase_order_id: int,
        purchase_order_line_id: int,
        quantity_received: float,
    ):

        db = SessionLocal()

        try:

            repository = PurchaseReceiptRepository(
                db
            )

            return repository.create(
                purchase_order_id=purchase_order_id,
                purchase_order_line_id=purchase_order_line_id,
                quantity_received=quantity_received,
            )

        finally:

            db.close()

    def get_by_purchase_order(
        self,
        purchase_order_id: int,
    ):

        db = SessionLocal()

        try:

            repository = PurchaseReceiptRepository(
                db
            )

            return repository.get_by_purchase_order(
                purchase_order_id=purchase_order_id,
            )

        finally:

            db.close()

    def get_by_purchase_order_line(
        self,
        purchase_order_line_id: int,
    ):

        db = SessionLocal()

        try:

            repository = PurchaseReceiptRepository(
                db
            )

            return repository.get_by_purchase_order_line(
                purchase_order_line_id=
                    purchase_order_line_id,
            )

        finally:

            db.close()