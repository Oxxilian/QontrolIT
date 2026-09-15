from .repository import SupplierRepository


class SupplierService:
    """
    Businesslogica voor leveranciers.

    Coördineert het ophalen,
    toevoegen en bijwerken van leveranciers.
    """

    def __init__(self) -> None:

        self.repository = SupplierRepository()

    def create(
        self,
        name: str,
        categories: list[str],
        active: bool = True,
    ):

        return self.repository.create(
            name=name,
            categories=categories,
            active=active,
        )

    def get(
        self,
        supplier_id: int,
    ):

        return self.repository.get(
            supplier_id,
        )

    def get_all(
        self,
    ):

        return self.repository.get_all()

    def update(
        self,
        supplier_id: int,
        name: str,
        categories: list[str],
        active: bool,
    ):

        supplier = self.repository.get(
            supplier_id,
        )

        if supplier is None:

            return None

        return self.repository.update(
            supplier=supplier,
            name=name,
            categories=categories,
            active=active,
        )

    def close(self) -> None:

        self.repository.close()