from typing import Any

from sqlalchemy import func
from sqlalchemy import select

from backend.core.databases.session import SessionLocal

from .conservation_repository import ConservationRepository
from .models import Project
from .phase_repository import PhaseRepository
from .production_repository import ProductionRepository


class ProjectRepository:
    """
    Repository voor Projects.

    Verantwoordelijk voor de complete opslag
    van een project inclusief alle onderliggende data.
    """

    def __init__(self) -> None:

        self.db = SessionLocal()

        self.phase_repository = PhaseRepository(self.db)
        self.production_repository = ProductionRepository(self.db)
        self.conservation_repository = ConservationRepository(self.db)

    def save(
        self,
        project: dict,
    ) -> dict:

        project_model = self.db.scalar(
            select(Project).where(
                Project.project_number == project["project_number"]
            )
        )

        if project_model is None:

            project_model = Project(
                project_number=project["project_number"],
            )

            self.db.add(project_model)

            self.db.flush()

        project_model.project_name = project["project_name"]
        project_model.customer = project["customer"]
        project_model.path = project["path"]
        project_model.active = True

        self.phase_repository.save(
            project_model,
            project["phases"],
        )

        self.db.flush()

        for phase_model, phase_data in zip(
            project_model.phases,
            project["phases"],
        ):

            self.production_repository.save(
                phase_model,
                phase_data["production"],
            )

            self.conservation_repository.save(
                phase_model,
                phase_data["conservation"],
            )

        self.db.commit()

        return project

    def get(
        self,
        project_number: str,
    ) -> Project | None:

        return self.db.scalar(
            select(Project).where(
                Project.project_number == project_number
            )
        )

    def get_all(
        self,
    ) -> list[Project]:

        return list(
            self.db.scalars(
                select(Project).order_by(
                    Project.project_number
                )
            )
        )

    def update(
        self,
        project_number: str,
        project: dict,
    ) -> dict:

        existing = self.get(project_number)

        if existing is None:

            return project

        existing.project_name = project["project_name"]
        existing.customer = project["customer"]
        existing.path = project["path"]

        self.db.commit()

        return project

    def delete(
        self,
        project_number: str,
    ) -> bool:

        project = self.get(project_number)

        if project is None:

            return False

        self.db.delete(project)

        self.db.commit()

        return True

    def exists(
        self,
        project_number: str,
    ) -> bool:

        return (
            self.get(project_number)
            is not None
        )

    def search(
        self,
        text: str,
    ) -> list[Project]:

        return list(
            self.db.scalars(
                select(Project).where(
                    Project.project_name.contains(text)
                )
            )
        )

    def count(self) -> int:

        return (
            self.db.scalar(
                select(
                    func.count(Project.id)
                )
            )
            or 0
        )

    def statistics(
        self,
    ) -> dict[str, Any]:

        return {
            "projects": self.count(),
        }

    def close(self) -> None:

        self.db.close()