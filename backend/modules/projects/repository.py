from sqlalchemy.orm import Session

from .model import Project


class ProjectRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_by_project_number(self, project_number: str):

        return (
            self.db.query(Project)
            .filter(Project.project_number == project_number)
            .first()
        )

    def create(
        self,
        project_number: str,
        project_name: str,
        project_path: str,
        customer: str | None = None,
    ):

        project = Project(
            project_number=project_number,
            project_name=project_name,
            customer=customer,
            project_path=project_path,
        )

        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)

        return project

    def get_all(self):

        return (
            self.db.query(Project)
            .order_by(Project.project_number)
            .all()
        )