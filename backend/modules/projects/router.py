from fastapi import APIRouter

from backend.core.apis import success
from backend.modules.projects.service import ProjectService


router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
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


@router.get("/scan")
def scan(path: str):

    return success(
        ProjectService.scan(path)
    )