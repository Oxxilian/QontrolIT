from backend.core.scanners import Scanner, ScannerContext
from backend.modules.projects.definitions import PRODUCTION_TYPES


class ProductionScanner(Scanner):
    """
    Herkent productieonderdelen binnen iedere fase.
    """

    @staticmethod
    def contains_keyword(name: str, keywords: list[str]) -> bool:

        name = name.lower()

        return any(
            keyword.lower() in name
            for keyword in keywords
        )

    def scan(self, context: ScannerContext) -> None:

        context.production.clear()

        for phase in context.phases:

            found = []

            phase_path = phase["path"]

            for folder in phase_path.rglob("*"):

                if not folder.is_dir():
                    continue

                folder_name = folder.name.lower()

                for definition in PRODUCTION_TYPES.values():

                    if self.contains_keyword(
                        folder_name,
                        definition["keywords"],
                    ):

                        found.append(
                            definition["label"]
                        )

            context.production[
                phase["name"]
            ] = sorted(
                set(found)
            )