import re
from pathlib import Path

from backend.core.scanners import Scanner, ScannerContext


class PhaseScanner(Scanner):
    """
    Zoekt alle projectfases.
    """

    PHASE_PATTERN = re.compile(
        r"^P\d{8}(?:\.\d+)+"
    )

    @classmethod
    def is_phase(cls, folder: Path) -> bool:

        return bool(cls.PHASE_PATTERN.match(folder.name))

    def scan(self, context: ScannerContext) -> None:

        context.phases.clear()

        for folder in context.folders:

            if not self.is_phase(folder):
                continue

            context.phases.append(
                {
                    "name": folder.name,
                    "path": folder,
                }
            )

        context.phases.sort(
            key=lambda phase: phase["name"]
        )