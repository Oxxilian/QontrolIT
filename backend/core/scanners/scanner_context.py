from pathlib import Path


class ScannerContext:
    """
    Gedeelde context voor alle scanners.

    De volledige projectstructuur wordt één keer ingelezen.
    Alle scanners werken vervolgens met dezelfde context.
    """

    def __init__(self, project_path: str):

        self.root = Path(project_path)

        self.folders = [
            folder
            for folder in self.root.rglob("*")
            if folder.is_dir()
        ]

        self.files = [
            file
            for file in self.root.rglob("*")
            if file.is_file()
        ]

        #
        # Gevonden informatie
        #

        self.project = {}

        self.phases = []

        self.production = {}

        self.conservation = {}

        self.drawings = {}

        self.metadata = {}