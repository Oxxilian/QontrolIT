class ImportReport:

    def __init__(self):

        self.messages = []
        self.warnings = []
        self.errors = []

    def info(self, message: str):

        self.messages.append(message)

    def warning(self, message: str):

        self.warnings.append(message)

    def error(self, message: str):

        self.errors.append(message)

    def to_dict(self):

        return {
            "messages": self.messages,
            "warnings": self.warnings,
            "errors": self.errors,
        }