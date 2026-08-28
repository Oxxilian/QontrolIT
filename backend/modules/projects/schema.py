from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ProjectBase(BaseModel):
    project_number: str
    project_name: str
    customer: Optional[str] = None
    project_path: str
    current_phase: str = "Werkvoorbereiding"
    phase_completed: bool = False
    expected_return_date: Optional[date] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)