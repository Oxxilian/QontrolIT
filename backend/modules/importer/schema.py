from pydantic import BaseModel


class ImportProjectRequest(BaseModel):
    project_path: str


class FolderInfo(BaseModel):
    name: str
    known: bool
    type: str | None = None


class ScanResult(BaseModel):
    project_number: str
    project_name: str
    project_path: str

    folders: list[FolderInfo]
    files: list[str]