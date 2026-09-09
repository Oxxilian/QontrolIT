import re

from backend.core.scanners import ScannerContext

from backend.modules.projects.definitions import (
    CONSERVATION_ITEMS,
    PRODUCTION_TYPES,
)


class ProjectBuilder:
    """
    Bouwt het uiteindelijke Project-object.
    """

    PHASE_PATTERN = re.compile(
        r"^P\d{8}\.(?P<code>[\d.]+)\s+(?P<name>.+)$"
    )

    @staticmethod
    def build_item(
        label: str,
        enabled: bool,
    ) -> dict:

        return {
            "label": label,
            "enabled": enabled,
            "status": "pending",
            "progress": 0,
        }

    @classmethod
    def build(
        cls,
        context: ScannerContext,
    ) -> dict:

        project = {
            "project_number": context.project.get("project_number"),
            "project_name": context.project.get("project_name"),
            "customer": context.project.get("customer"),
            "path": str(context.root),
            "phases": [],
        }

        for phase in context.phases:

            phase_name = phase["name"]

            code = ""
            name = phase_name

            match = cls.PHASE_PATTERN.match(
                phase_name,
            )

            if match:

                code = match.group("code")
                name = match.group("name").strip()

            #
            # Productie
            #

            production = {}

            found_production = context.production.get(
                phase_name,
                [],
            )

            for key, definition in PRODUCTION_TYPES.items():

                production[key] = cls.build_item(
                    definition["label"],
                    definition["label"] in found_production,
                )

            #
            # Conservering
            #

            conservation = {}

            found_conservation = context.conservation.get(
                phase_name,
                [],
            )

            for key, label in CONSERVATION_ITEMS.items():

                conservation[key] = cls.build_item(
                    label,
                    label in found_conservation,
                )

            project["phases"].append(
                {
                    "code": code,
                    "name": name,
                    "production": production,
                    "conservation": conservation,
                }
            )

        project["phases"].sort(
            key=lambda phase: [
                int(part)
                for part in phase["code"].split(".")
                if part
            ]
        )

        return project