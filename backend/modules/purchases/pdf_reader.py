from pathlib import Path

from pypdf import PdfReader


class PurchasePdfReader:
    """
    Leest tekst uit een inkooporder-PDF.

    Leest uitsluitend de PDF.
    Verandert niets aan het bestand.
    """

    @staticmethod
    def read(
        pdf_path: str | Path,
    ) -> str:

        reader = PdfReader(
            str(pdf_path),
        )

        pages = []

        for page in reader.pages:

            text = page.extract_text()

            if text:

                pages.append(
                    text,
                )

        return "\n".join(
            pages,
        )