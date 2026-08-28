from sqlalchemy.orm import Session

from .model import Project
from .schema import ProjectCreate


def get_all_projects(db: Session):
    return (
        db.query(Project)
        .order_by(Project.project_number)
        .all()
    )


def get_project_by_id(db: Session, project_id: int):
    return (
        db.query(Project)
        .filter(Project.id == project_id)
        .first()
    )


def create_project(db: Session, project: ProjectCreate):
    db_project = Project(**project.model_dump())

    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    return db_project