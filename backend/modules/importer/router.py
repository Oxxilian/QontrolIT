from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.core.database import get_db

from .schema import ImportProjectRequest
from .service import import_project

router = APIRouter(
    prefix="/import",
    tags=["Importer"],
)


@router.post("/")
def import_project_route(
    request: ImportProjectRequest,
    db: Session = Depends(get_db),
):

    try:

        return import_project(
            request.project_path,
            db,
        )

    except FileNotFoundError as exc:

        raise HTTPException(
            status_code=404,
            detail=str(exc),
        )