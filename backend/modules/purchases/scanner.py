from pathlib import Path


class PurchaseScanner:
    """
    Scanner voor inkoopopdrachten.

    Zoekt uitsluitend naar PDF-bestanden in:

    <projectmap>\\3. Inkoop\\3.2 Inkoopopdrachten

    Verandert niets aan het projectbestandssysteem.
    """

    @staticmethod
    def scan(
        project_path: str,
    ) -> dict:

        orders_path = (
            Path(project_path)
            / "3. Inkoop"
            / "3.2 Inkoopopdrachten"
        )

        if not orders_path.exists():

            return {
                "exists": False,
                "path": orders_path,
                "files": [],
            }

        files = sorted(
            file
            for file in orders_path.iterdir()
            if file.is_file()
            and file.suffix.lower() == ".pdf"
        )

        return {
            "exists": True,
            "path": orders_path,
            "files": files,
        }