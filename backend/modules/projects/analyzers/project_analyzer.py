import re


class ProjectAnalyzer:
    """
    Analyseert de projectstructuur.

    Ontvangt de ruwe data van de scanner
    en bepaalt welke mappen fases zijn.
    """

    PHASE_PATTERN = re.compile(r"^P\d+\.\d+$")

    @classmethod
    def analyze(cls, project: dict) -> dict:

        phases = []

        for folder in project["folders"]:

            if cls.PHASE_PATTERN.match(folder["name"]):

                phases.append(
                    {
                        "phase": folder["name"],
                        "path": folder["path"],
                    }
                )

        return {
            "exists": project["exists"],
            "project": project["project"],
            "phase_count": len(phases),
            "phases": phases,
        }