from sqlalchemy.orm import Session

from .models import Project
from .models import ProjectPhase


class PhaseRepository:
    """
    Repository voor alle projectfases.

    Verantwoordelijk voor het opslaan,
    bijwerken en verwijderen van fases.
    """

    def __init__(
        self,
        db: Session,
    ) -> None:

        self.db = db

    def save(
        self,
        project: Project,
        phases: list[dict],
    ) -> None:
        """
        Slaat alle fases van een project op.

        Bij een herimport worden de bestaande
        fases volledig vervangen.
        """

        project.phases.clear()

        self.db.flush()

        for phase in phases:

            phase_model = ProjectPhase(
                project=project,
                code=phase.get(
                    "code",
                    "",
                ),
                name=phase.get(
                    "name",
                    "",
                ),
            )

            self.db.add(
                phase_model,
            )

        self.db.flush()

    def get_all(
        self,
        project: Project,
    ) -> list[ProjectPhase]:
        """
        Geeft alle fases van een project terug.
        """

        return list(
            project.phases
        )

    def delete_all(
        self,
        project: Project,
    ) -> None:
        """
        Verwijdert alle fases van een project.
        """

        project.phases.clear()

        self.db.flush()