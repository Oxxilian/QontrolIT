from backend.modules.projects.analyzers.project_analyzer import ProjectAnalyzer
from backend.modules.projects.scanners.project_scanner import ProjectScanner
from backend.modules.projects.schemas import ProjectStatus


class ProjectService:
    """
    Businesslogica van de Projects module.
    """

    @staticmethod
    def get_status():

        return ProjectStatus(
            module="Projects",
            status="ready",
        )

    @staticmethod
    def count():

        return 0

    @staticmethod
    def scan(project_path: str):

        project = ProjectScanner.scan(project_path)

        return ProjectAnalyzer.analyze(project)