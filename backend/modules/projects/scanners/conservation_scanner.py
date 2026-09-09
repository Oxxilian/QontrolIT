from backend.core.scanners import Scanner
from backend.core.scanners import ScannerContext

from backend.modules.projects.definitions import CONSERVATION_ITEMS


class ConservationScanner(Scanner):
    """
    Herkent conserveringen binnen iedere fase.

    De scanner levert per fase een vaste datastructuur op,
    vergelijkbaar met ProductionScanner.
    """

    def scan(
        self,
        context: ScannerContext,
    ) -> None:

        context.conservation.clear()

        for phase in context.phases:

            conservation = {
                key: False
                for key in CONSERVATION_ITEMS
            }

            for folder in phase["path"].rglob("*"):

                if not folder.is_dir():
                    continue

                folder_name = folder.name.lower()

                for key, label in CONSERVATION_ITEMS.items():

                    if label.lower() in folder_name:

                        conservation[key] = True

            context.conservation[
                phase["name"]
            ] = conservation