from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.core.database import get_db

from .repository import ProjectRepository

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.get("/")
def get_projects(
    db: Session = Depends(get_db),
):

    repository = ProjectRepository(db)

    projects = repository.get_all()

    return projects