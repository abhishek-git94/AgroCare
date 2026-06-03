class VectorDB:
    """Simple vector store placeholder for scheme retrieval."""

    def __init__(self):
        self.index = []

    def add(self, item: dict):
        self.index.append(item)

    def search(self, query: str) -> list:
        return [item for item in self.index if query.lower() in str(item).lower()]
