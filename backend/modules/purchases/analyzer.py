import re


class PurchaseAnalyzer:
    """
    Analyseert de tekst van een inkooporder-PDF.

    Verantwoordelijk voor het herkennen van de
    gegevens van de inkooporder en de bijbehorende
    orderregels.

    Slaat niets op in de database.
    """

    @staticmethod
    def analyze(
        text: str,
    ) -> dict:

        result = {
            "order_number": "",
            "project_number": "",
            "phase_code": "",
            "project_name": "",
            "phase_name": "",
            "supplier": "",
            "buyer": "",
            "order_date": "",
            "delivery_date": "",
            "delivery_address": "",
            "lines": [],
        }

        text_lines = text.splitlines()

        for raw_line in text_lines:

            line = raw_line.strip()

            if not line:
                continue

            if line.startswith("Inkooporder"):

                value = line.split(":", 1)[1].strip()

                result["order_number"] = (
                    value.split(" - ", 1)[0].strip()
                )

            elif line.startswith("Leverancier"):

                result["supplier"] = (
                    line.split(":", 1)[1].strip()
                )

            elif line.startswith("Project"):

                value = line.split(":", 1)[1].strip()

                parts = value.split(" - ", 1)

                result["project_number"] = (
                    parts[0].strip()
                )

                if len(parts) > 1:

                    result["project_name"] = (
                        parts[1].strip()
                    )

            elif line.startswith("Fase"):

                value = line.split(":", 1)[1].strip()

                parts = value.split(" - ", 1)

                result["phase_code"] = (
                    parts[0].strip()
                )

                if len(parts) > 1:

                    result["phase_name"] = (
                        parts[1].strip()
                    )

            elif line.startswith("Inkoper"):

                result["buyer"] = (
                    line.split(":", 1)[1].strip()
                )

            elif line.startswith("Besteldatum"):

                result["order_date"] = (
                    line.split(":", 1)[1].strip()
                )

            elif line.startswith("Leverdatum"):

                result["delivery_date"] = (
                    line.split(":", 1)[1].strip()
                )

            elif line.startswith("Afleveradres"):

                result["delivery_address"] = (
                    line.split(":", 1)[1].strip()
                )

        result["lines"] = (
            PurchaseAnalyzer._parse_order_lines(
                text_lines,
            )
        )

        return result

    @staticmethod
    def _parse_order_lines(
        text_lines: list[str],
    ) -> list[dict]:

        order_lines = []

        table_type = None

        for raw_line in text_lines:

            line = raw_line.strip()

            if not line:
                continue

            if line.startswith(
                "Aantal Pos nr Profiel"
            ):

                table_type = "positioned"
                continue

            if line.startswith(
                "Aantal Profiel"
            ):

                table_type = "profile"
                continue

            if table_type is None:
                continue

            if line.startswith(
                (
                    "inclusief certificaten",
                    "Inclusief certificaten",
                    "Al het materiaal",
                    "Bij levering",
                    "Graag deze bestelling",
                    "Met vriendelijke groet",
                )
            ):

                break

            if table_type == "positioned":

                parsed = (
                    PurchaseAnalyzer._parse_positioned_line(
                        line,
                    )
                )

            else:

                parsed = (
                    PurchaseAnalyzer._parse_profile_line(
                        line,
                    )
                )

            if parsed is not None:

                order_lines.append(
                    parsed,
                )

        return order_lines

    @staticmethod
    def _parse_positioned_line(
        line: str,
    ) -> dict | None:

        match = re.match(
            r"^"
            r"(?P<quantity>\d+(?:,\d+)?)"
            r"\s+"
            r"(?P<position>\d+)"
            r"\s+"
            r"(?P<profile>.+?)"
            r"\s+"
            r"(?P<length>\d+(?:[.,]\d+)?)"
            r"\s+"
            r"(?P<weight>\d+(?:[.,]\d+)?)"
            r"\s+"
            r"(?P<quality>[A-Za-z0-9.]+)"
            r"$",
            line,
        )

        if not match:
            return None

        return {
            "quantity": (
                PurchaseAnalyzer._parse_number(
                    match.group("quantity"),
                )
            ),
            "position_number": (
                match.group("position").strip()
            ),
            "profile": (
                match.group("profile").strip()
            ),
            "quality": (
                match.group("quality").strip()
            ),
            "length_mm": (
                PurchaseAnalyzer._parse_number(
                    match.group("length"),
                )
            ),
            "weight": (
                PurchaseAnalyzer._parse_number(
                    match.group("weight"),
                )
            ),
        }

    @staticmethod
    def _parse_profile_line(
        line: str,
    ) -> dict | None:

        match = re.match(
            r"^"
            r"(?P<quantity>\d+(?:,\d+)?)"
            r"\s+"
            r"(?P<profile>[A-Za-z0-9Xx.-]+)"
            r"\s+"
            r"(?P<quality>[A-Za-z0-9.]+)"
            r"\s+"
            r"(?P<length>\d+(?:[.,]\d+)?)"
            r"\s+"
            r"(?P<weight>\d+(?:[.,]\d+)?)"
            r"$",
            line,
        )

        if not match:
            return None

        return {
            "quantity": (
                PurchaseAnalyzer._parse_number(
                    match.group("quantity"),
                )
            ),
            "position_number": "",
            "profile": (
                match.group("profile").strip()
            ),
            "quality": (
                match.group("quality").strip()
            ),
            "length_mm": (
                PurchaseAnalyzer._parse_number(
                    match.group("length"),
                )
            ),
            "weight": (
                PurchaseAnalyzer._parse_number(
                    match.group("weight"),
                )
            ),
        }

    @staticmethod
    def _parse_number(
        value: str,
    ) -> float:

        value = value.strip()

        value = value.replace(
            ".",
            "",
        )

        value = value.replace(
            ",",
            ".",
        )

        return float(value)