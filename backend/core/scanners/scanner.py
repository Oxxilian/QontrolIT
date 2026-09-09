from abc import ABC, abstractmethod

from .scanner_context import ScannerContext


class Scanner(ABC):
    """
    Basisklasse voor alle scanners.
    """

    @abstractmethod
    def scan(self, context: ScannerContext) -> None:
        """
        Voert de scanner uit.
        """
        raise NotImplementedError