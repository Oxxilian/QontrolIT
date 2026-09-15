from fastapi import APIRouter

from backend.core.apis import success
from backend.modules.projects.service import ProjectService


router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.get("")
def get_projects():

    projects = ProjectService().get_all()

    return success(
        [
            {
                "id": project.id,
                "project_number": project.project_number,
                "project_name": project.project_name,
                "customer": project.customer,
                "path": project.path,
                "active": project.active,
            }
            for project in projects
        ]
    )


@router.get("/status")
def status():

    return success(
        ProjectService.get_status()
    )


@router.get("/count")
def count():

    return success(
        {
            "projects": ProjectService.count()
        }
    )


@router.post("/scan")
def scan(project_path: str):

    return success(
        ProjectService().scan(
            project_path
        )
    )


@router.post("/import")
def import_project(project_path: str):

    return success(
        ProjectService().import_project(
            project_path
        )
    )


@router.get("/{project_number}")
def get_project(
    project_number: str,
):

    project = ProjectService().get(
        project_number,
    )

    if project is None:

        return success(None)

    return success(
        {
            "id": project.id,
            "project_number": project.project_number,
            "project_name": project.project_name,
            "customer": project.customer,
            "path": project.path,
            "active": project.active,
            "phases": [
                {
                    "id": phase.id,
                    "code": phase.code,
                    "name": phase.name,
                }
                for phase in project.phases
            ],
        }
    )