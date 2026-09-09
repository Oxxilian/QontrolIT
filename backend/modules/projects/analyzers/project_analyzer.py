class ProjectAnalyzer:
    """
    Analyseert een project en bepaalt
    de status van iedere fase.
    """

    @classmethod
    def analyze(
        cls,
        project: dict,
    ) -> dict:

        for phase in project["phases"]:

            phase["warnings"] = cls.get_warnings(phase)
            phase["ready"] = len(
                phase["warnings"]
            ) == 0

        return project

    @staticmethod
    def get_warnings(
        phase: dict,
    ) -> list[str]:

        warnings = []

        production = phase["production"]

        if not production["production_drawings"]["enabled"]:
            warnings.append(
                "Productietekeningen ontbreken."
            )

        if (
            not production["plate_cutting"]["enabled"]
            and not production["profile_cutting"]["enabled"]
            and not production["sawing"]["enabled"]
        ):
            warnings.append(
                "Geen productie gevonden."
            )

        return warnings