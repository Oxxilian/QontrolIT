from pathlib import Path

from .analyzer import PurchaseAnalyzer
from .pdf_reader import PurchasePdfReader
from .repository import PurchaseRepository
from .scanner import PurchaseScanner


class PurchaseService:
    """
    Businesslogica voor inkooporders.

    Coördineert het scannen,
    lezen, analyseren en opslaan
    van inkooporders.
    """

    def __init__(self) -> None:

        self.repository = PurchaseRepository()

    def import_pdf(
        self,
        pdf_path: str | Path,
    ):

        pdf_path = Path(
            pdf_path,
        )

        text = PurchasePdfReader.read(
            pdf_path,
        )

        purchase_order = (
            PurchaseAnalyzer.analyze(
                text,
            )
        )

        purchase_order["pdf_path"] = str(
            pdf_path,
        )

        return self.repository.save(
            purchase_order,
        )

    def import_project(
        self,
        project_path: str,
    ) -> list:

        scan_result = PurchaseScanner.scan(
            project_path,
        )

        if not scan_result["exists"]:

            return []

        orders = []

        for pdf_path in scan_result["files"]:

            order = self.import_pdf(
                pdf_path,
            )

            orders.append(
                order,
            )

        return orders

    def get(
        self,
        order_number: str,
    ):

        return self.repository.get(
            order_number,
        )

    def get_all(
        self,
    ):

        return self.repository.get_all()

    def exists(
        self,
        order_number: str,
    ) -> bool:

        return self.repository.exists(
            order_number,
        )

    def close(self) -> None:

        self.repository.close()