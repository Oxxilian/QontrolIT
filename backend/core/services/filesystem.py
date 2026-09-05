from pathlib import Path


class FileSystem:
    """
    Generieke bestandssysteem functies.

    Bevat GEEN bedrijfslogica.
    """

    @staticmethod
    def exists(path: str) -> bool:

        return Path(path).exists()

    @staticmethod
    def is_directory(path: str) -> bool:

        return Path(path).is_dir()

    @staticmethod
    def name(path: str) -> str:

        return Path(path).name

    @staticmethod
    def folders(path: str) -> list[dict]:

        directory = Path(path)

        if not directory.exists():
            return []

        folders = []

        for item in sorted(directory.iterdir()):

            if not item.is_dir():
                continue

            folders.append(
                {
                    "name": item.name,
                    "path": str(item),
                }
            )

        return folders

    @staticmethod
    def files(path: str) -> list[dict]:

        directory = Path(path)

        if not directory.exists():
            return []

        files = []

        for item in sorted(directory.iterdir()):

            if not item.is_file():
                continue

            files.append(
                {
                    "name": item.name,
                    "path": str(item),
                }
            )

        return files