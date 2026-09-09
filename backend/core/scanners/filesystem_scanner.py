from pathlib import Path

from backend.core.services import FileSystem


class FileSystemScanner:
    """
    Generieke scanner voor het bestandssysteem.

    Leest uitsluitend de inhoud van een map.
    Bevat geen bedrijfslogica.
    """

    @staticmethod
    def scan(path: str) -> dict:

        root = Path(path)

        return {
            "exists": FileSystem.exists(path),
            "name": FileSystem.name(path),
            "path": root,
            "folders": FileSystem.folders(path),
            "files": FileSystem.files(path),
            "folder_count": len(FileSystem.folders(path)),
            "file_count": len(FileSystem.files(path)),
        }