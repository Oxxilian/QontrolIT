from sqlalchemy.orm import Session

from .models import ConservationItem
from .models import ProjectPhase


class ConservationRepository:
    """
    Repository voor conserveringsonderdelen.

    Verantwoordelijk voor het opslaan van alle
    conserveringsgegevens van een projectfase.
    """

    def __init__(
        self,
        db: Session,
    ) -> None:

        self.db = db

    def save(
        self,
        phase: ProjectPhase,
        conservation: list[str],
    ) -> None:
        """
        Slaat alle conserveringsonderdelen
        van een fase op.
        """

        phase.conservation_items.clear()

        self.db.flush()

        for item in conservation:

            model = ConservationItem(
                phase=phase,
                item_type=item.lower().replace(
                    " ",
                    "_",
                ),
                label=item,
                enabled=True,
                status="pending",
                progress=0,
            )

            self.db.add(
                model,
            )

        self.db.flush()

    def get_all(
        self,
        phase: ProjectPhase,
    ) -> list[ConservationItem]:
        """
        Geeft alle conserveringsonderdelen
        van een fase terug.
        """

        return list(
            phase.conservation_items
        )

    def delete_all(
        self,
        phase: ProjectPhase,
    ) -> None:
        """
        Verwijdert alle conserveringsonderdelen
        van een fase.
        """

        phase.conservation_items.clear()

        self.db.flush()