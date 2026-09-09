from backend.core.scanners import (
    FileSystemScanner,
    ScannerContext,
    ScannerPipeline,
)

from backend.modules.projects.builders import ProjectBuilder
from backend.modules.projects.scanners import PROJECT_SCANNERS


class ProjectScanner:
    """
    Centrale scanner van de Projects-module.

    Deze klasse:

    - controleert of het project bestaat;
    - maakt de ScannerContext;
    - voert alle scanners uit;
    - bouwt het uiteindelijke Project-object.
    """

    @staticmethod
    def scan(
        project_path: str,
    ) -> dict:

        project = FileSystemScanner.scan(
            project_path,
        )

        if not project.get("exists"):

            return project

        context = ScannerContext(
            project_path,
        )

        context.project = project

        pipeline = ScannerPipeline()

        for scanner in PROJECT_SCANNERS:

            pipeline.add(
                scanner(),
            )

        pipeline.run(
            context,
        )

        project = ProjectBuilder.build(
            context,
        )

        project["exists"] = True

        return project