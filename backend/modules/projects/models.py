from sqlalchemy.orm import Mapped, mapped_column

from backend.core.databases.base import Base


class Project(Base):

    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(default="")
    path: Mapped[str] = mapped_column(default="")