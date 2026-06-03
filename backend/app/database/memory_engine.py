class MemoryEngine:
    """Store farmer history logs and AI session context."""

    def __init__(self):
        self.history = []

    def add_entry(self, entry: dict):
        self.history.append(entry)

    def get_history(self) -> list:
        return self.history
