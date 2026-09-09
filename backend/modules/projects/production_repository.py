from sqlalchemy.orm import Session

from .models import ProductionItem
from .models import ProjectPhase


class ProductionRepository:
    """
    Repository voor productieonderdelen.

    Verantwoordelijk voor het opslaan van alle
    productiegegevens van een projectfase.
    """

    def __init__(
        self,
        db: Session,
    ) -> None:

        self.db = db

    def save(
        self,
        phase: ProjectPhase,
        production: dict,
    ) -> None:
        """
        Slaat alle productieonderdelen van een fase op.
        """

        phase.production_items.clear()

        self.db.flush()

        for item_type, item in production.items():

            model = ProductionItem(
                phase=phase,
                item_type=item_type,
                label=item.get(
                    "label",
                    "",
                ),
                enabled=item.get(
                    "enabled",
                    False,
                ),
                status=item.get(
                    "status",
                    "pending",
                ),
                progress=item.get(
                    "progress",
                    0,
                ),
            )

            self.db.add(
                model,
            )

        self.db.flush()

    def get_all(
        self,
        phase: ProjectPhase,
    ) -> list[ProductionItem]:
        """
        Geeft alle productieonderdelen
        van een fase terug.
        """

        return list(
            phase.production_items
        )

    def delete_all(
        self,
        phase: ProjectPhase,
    ) -> None:
        """
        Verwijdert alle productieonderdelen
        van een fase.
        """

        phase.production_items.clear()

        self.db.flush()