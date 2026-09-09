from .scanner_context import ScannerContext
from .scanner import Scanner


class ScannerPipeline:
    """
    Voert een reeks scanners achter elkaar uit.
    """

    def __init__(self) -> None:
        self._scanners: list[Scanner] = []

    def add(self, scanner: Scanner) -> "ScannerPipeline":
        self._scanners.append(scanner)
        return self

    def run(self, context: ScannerContext) -> None:

        for scanner in self._scanners:
            scanner.scan(context)