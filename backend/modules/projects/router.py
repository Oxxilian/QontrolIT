from fastapi import APIRouter

from backend.core.apis import success
from backend.modules.projects.service import ProjectService


router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)

service = ProjectService()


@router.get("/status")
def status():

    return success(
        {
            "module": "Projects",
            "status": "ready",
        }
    )


@router.get("")
def get_projects():

    return success(
        service.get_all()
    )


@router.get("/statistics")
def statistics():

    return success(
        service.statistics()
    )


@router.get("/{project_number}")
def get_project(
    project_number: str,
):

    return success(
        service.get(
            project_number
        )
    )


@router.post("/scan")
def scan(
    project_path: str,
):

    return success(
        service.scan(
            project_path
        )
    )


@router.post("/import")
def import_project(
    project_path: str,
):

    return success(
        service.import_project(
            project_path
        )
    )


@router.delete("/{project_number}")
def delete_project(
    project_number: str,
):

    deleted = service.delete(
        project_number
    )

    return success(
        {
            "deleted": deleted,
        }
    )