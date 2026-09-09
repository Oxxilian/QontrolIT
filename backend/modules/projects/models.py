from sqlalchemy import Boolean
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from backend.core.databases.base import Base


class Project(Base):
    """
    Hoofdproject.
    """

    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    project_number: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        index=True,
    )

    project_name: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    customer: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    path: Mapped[str] = mapped_column(
        String(1000),
        default="",
    )

    active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    phases: Mapped[list["ProjectPhase"]] = relationship(
        back_populates="project",
        cascade="all, delete-orphan",
    )


class ProjectPhase(Base):
    """
    Projectfase.
    """

    __tablename__ = "project_phases"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    project_id: Mapped[int] = mapped_column(
        ForeignKey("projects.id"),
    )

    code: Mapped[str] = mapped_column(
        String(20),
    )

    name: Mapped[str] = mapped_column(
        String(255),
    )

    project: Mapped["Project"] = relationship(
        back_populates="phases",
    )

    production_items: Mapped[list["ProductionItem"]] = relationship(
        back_populates="phase",
        cascade="all, delete-orphan",
    )

    conservation_items: Mapped[list["ConservationItem"]] = relationship(
        back_populates="phase",
        cascade="all, delete-orphan",
    )


class ProductionItem(Base):
    """
    Productieonderdeel.
    """

    __tablename__ = "production_items"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    phase_id: Mapped[int] = mapped_column(
        ForeignKey("project_phases.id"),
    )

    item_type: Mapped[str] = mapped_column(
        String(50),
    )

    label: Mapped[str] = mapped_column(
        String(100),
    )

    enabled: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="pending",
    )

    progress: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    phase: Mapped["ProjectPhase"] = relationship(
        back_populates="production_items",
    )


class ConservationItem(Base):
    """
    Conserveringsonderdeel.
    """

    __tablename__ = "conservation_items"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    phase_id: Mapped[int] = mapped_column(
        ForeignKey("project_phases.id"),
    )

    item_type: Mapped[str] = mapped_column(
        String(50),
    )

    label: Mapped[str] = mapped_column(
        String(100),
    )

    enabled: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="pending",
    )

    progress: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    phase: Mapped["ProjectPhase"] = relationship(
        back_populates="conservation_items",
    )