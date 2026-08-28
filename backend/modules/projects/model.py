from sqlalchemy import Boolean, Column, Date, DateTime, Integer, String
from sqlalchemy.sql import func

from backend.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    project_number = Column(String(50), unique=True, nullable=False, index=True)
    project_name = Column(String(255), nullable=False)

    customer = Column(String(255), nullable=True)

    project_path = Column(String(500), nullable=False)

    current_phase = Column(String(50), nullable=False, default="Werkvoorbereiding")

    phase_completed = Column(Boolean, nullable=False, default=False)

    expected_return_date = Column(Date, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )