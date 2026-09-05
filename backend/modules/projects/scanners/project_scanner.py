from pathlib import Path

from backend.core.services import FileSystem


class ProjectScanner:
    """
    Leest uitsluitend de projectstructuur.

    Geen interpretatie.
    Geen bedrijfslogica.
    """

    @staticmethod
    def scan(project_path: str) -> dict:
        project = Path(project_path)

        if not FileSystem.exists(project_path):
            return {
                "exists": False,
                "project": None,
                "folders": [],
                "files": [],
            }

        folders = []
        files = []

        for item in project.iterdir():
            if item.is_dir():
                folders.append(item.name)
            elif item.is_file():
                files.append(item.name)

        folders.sort()
        files.sort()

        return {
            "exists": True,
            "project": project.name,
            "folders": folders,
            "files": files,
        }