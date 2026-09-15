from backend.core.repositories.permission_repository import PermissionRepository


class PermissionService:
    """
    Businesslogica voor permissions.

    Coördineert het aanmaken,
    ophalen en bijwerken van permissions.
    """

    def __init__(self) -> None:

        self.repository = PermissionRepository()

    def create(
        self,
        name: str,
        active: bool = True,
    ):

        return self.repository.create(
            name=name,
            active=active,
        )

    def get(
        self,
        permission_id: int,
    ):

        return self.repository.get(
            permission_id,
        )

    def get_all(
        self,
    ):

        return self.repository.get_all()

    def update(
        self,
        permission_id: int,
        name: str,
        active: bool,
    ):

        permission = self.repository.get(
            permission_id,
        )

        if permission is None:

            return None

        return self.repository.update(
            permission=permission,
            name=name,
            active=active,
        )

    def close(self) -> None:

        self.repository.close()