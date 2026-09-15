from sqlalchemy import select

from backend.core.databases.session import SessionLocal

from .models import Supplier


class SupplierRepository:
    """
    Repository voor leveranciers.

    Verantwoordelijk voor het opslaan,
    bijwerken en ophalen van leveranciers.
    """

    def __init__(self) -> None:

        self.db = SessionLocal()

    def create(
        self,
        name: str,
        categories: list[str],
        active: bool = True,
    ) -> Supplier:

        supplier = Supplier(
            name=name,
            categories=categories,
            active=active,
        )

        self.db.add(
            supplier,
        )

        self.db.commit()

        self.db.refresh(
            supplier,
        )

        return supplier

    def get(
        self,
        supplier_id: int,
    ) -> Supplier | None:

        return self.db.scalar(
            select(Supplier).where(
                Supplier.id == supplier_id
            )
        )

    def get_all(
        self,
    ) -> list[Supplier]:

        return list(
            self.db.scalars(
                select(Supplier).order_by(
                    Supplier.name
                )
            )
        )

    def update(
        self,
        supplier: Supplier,
        name: str,
        categories: list[str],
        active: bool,
    ) -> Supplier:

        supplier.name = name
        supplier.categories = categories
        supplier.active = active

        self.db.commit()

        self.db.refresh(
            supplier,
        )

        return supplier

    def close(self) -> None:

        self.db.close()