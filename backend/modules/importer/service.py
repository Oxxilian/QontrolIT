from sqlalchemy.orm import Session

from backend.modules.projects.repository import ProjectRepository

from .analyzer import analyze_scan
from .scanner import scan_project_folder


def import_project(project_path: str, db: Session):

    # Scan de projectmap
    scan = scan_project_folder(project_path)

    # Analyseer de inhoud
    result = analyze_scan(scan)

    repository = ProjectRepository(db)

    # Bestaat het project al?
    existing = repository.get_by_project_number(
        result["project_number"]
    )

    if existing:

        result["database"] = "Project bestaat al."

        return result

    # Nieuw project opslaan
    project = repository.create(
        project_number=result["project_number"],
        project_name=result["project_name"],
        project_path=result["project_path"],
    )

    result["database"] = "Nieuw project opgeslagen."
    result["project_id"] = project.id

    return result