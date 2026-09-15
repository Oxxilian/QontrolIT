from backend.core.repositories.role_permission_repository import (
    RolePermissionRepository,
)


class RolePermissionService:
    """
    Businesslogica voor de koppeling
    tussen rollen en permissions.
    """

    def __init__(self) -> None:

        self.repository = RolePermissionRepository()

    def create(
        self,
        role_id: int,
        permission_id: int,
    ):

        return self.repository.create(
            role_id=role_id,
            permission_id=permission_id,
        )

    def get_by_role(
        self,
        role_id: int,
    ):

        return self.repository.get_by_role(
            role_id,
        )

    def get_by_permission(
        self,
        permission_id: int,
    ):

        return self.repository.get_by_permission(
            permission_id,
        )

    def close(self) -> None:

        self.repository.close()