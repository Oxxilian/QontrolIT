from backend.core.services import FileSystem


class FileSystemScanner:
    """
    Generieke scanner voor het bestandssysteem.

    Leest uitsluitend de inhoud van een map.
    Bevat geen bedrijfslogica.
    """

    @staticmethod
    def scan(path: str) -> dict:

        return {
            "exists": FileSystem.exists(path),
            "name": FileSystem.name(path),
            "folders": FileSystem.folders(path),
            "files": FileSystem.files(path),
        }