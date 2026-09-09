import re

from backend.core.scanners import Scanner, ScannerContext


class MetadataScanner(Scanner):
    """
    Herkent projectmetadata.
    """

    PROJECT_PATTERN = re.compile(r"P\d{8}")

    def scan(self, context: ScannerContext) -> None:

        project = context.project

        name = project.get("name", "").strip()

        project["project_number"] = None
        project["customer"] = None
        project["project_name"] = None

        match = self.PROJECT_PATTERN.search(name)

        if not match:
            return

        project_number = match.group()

        project["project_number"] = project_number

        remainder = name.replace(project_number, "", 1).strip()

        if remainder.startswith("-"):
            remainder = remainder[1:].strip()

        parts = [part.strip() for part in remainder.split(" - ") if part.strip()]

        if len(parts) >= 2:
            project["customer"] = parts[-1]
            project["project_name"] = " - ".join(parts[:-1])
        elif len(parts) == 1:
            project["project_name"] = parts[0]