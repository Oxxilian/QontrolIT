from backend.modules.projects.analyzers.project_analyzer import (
    ProjectAnalyzer,
)
from backend.modules.projects.repository import ProjectRepository
from backend.modules.projects.scanners.project_scanner import (
    ProjectScanner,
)


class ProjectService:
    """
    Businesslogica voor Projects.
    """

    def __init__(self) -> None:

        self.repository = ProjectRepository()

    def scan(
        self,
        project_path: str,
    ) -> dict:

        project = ProjectScanner.scan(
            project_path,
        )

        project = ProjectAnalyzer.analyze(
            project,
        )

        return project

    def import_project(
        self,
        project_path: str,
    ) -> dict:

        project = self.scan(
            project_path,
        )

        if not project.get("exists"):
            return project

        return self.repository.save(
            project,
        )

    def get(
        self,
        project_number: str,
    ):

        return self.repository.get(
            project_number,
        )

    def get_all(
        self,
    ):

        return self.repository.get_all()

    def delete(
        self,
        project_number: str,
    ) -> bool:

        return self.repository.delete(
            project_number,
        )

    def statistics(
        self,
    ) -> dict:

        return self.repository.statistics()