from pydantic import BaseModel


class ProjectStatus(BaseModel):

    module: str

    status: str


class ProductionItem(BaseModel):

    label: str

    enabled: bool

    status: str

    progress: int


class ConservationItem(BaseModel):

    label: str

    enabled: bool

    status: str

    progress: int


class Phase(BaseModel):

    code: str

    name: str

    production: dict[
        str,
        ProductionItem,
    ]

    conservation: dict[
        str,
        ConservationItem,
    ]


class Project(BaseModel):

    project_number: str

    project_name: str

    customer: str

    path: str

    phases: list[Phase]


class ProjectInfo(BaseModel):

    project_number: str

    project_name: str

    customer: str

    path: str


class ScanRequest(BaseModel):

    project_path: str


class ImportRequest(BaseModel):

    project_path: str


class DeleteResponse(BaseModel):

    deleted: bool


class StatisticsResponse(BaseModel):

    projects: int