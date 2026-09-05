from pydantic import BaseModel


class ProjectStatus(BaseModel):

    module: str
    status: str


class ProjectInfo(BaseModel):

    name: str
    path: str