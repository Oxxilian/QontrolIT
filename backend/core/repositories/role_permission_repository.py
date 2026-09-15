from sqlalchemy import select

from backend.core.databases.session import SessionLocal

from backend.core.models.role_permission import RolePermission


class RolePermissionRepository:
    """
    Repository voor de koppeling tussen rollen
    en permissions.
    """

    def __init__(self) -> None:

        self.db = SessionLocal()

    def create(
        self,
        role_id: int,
        permission_id: int,
    ) -> RolePermission:

        role_permission = RolePermission(
            role_id=role_id,
            permission_id=permission_id,
        )

        self.db.add(
            role_permission,
        )

        self.db.commit()

        self.db.refresh(
            role_permission,
        )

        return role_permission

    def get_by_role(
        self,
        role_id: int,
    ) -> list[RolePermission]:

        return list(
            self.db.scalars(
                select(RolePermission).where(
                    RolePermission.role_id == role_id
                )
            )
        )

    def get_by_permission(
        self,
        permission_id: int,
    ) -> list[RolePermission]:

        return list(
            self.db.scalars(
                select(RolePermission).where(
                    RolePermission.permission_id == permission_id
                )
            )
        )

    def close(self) -> None:

        self.db.close()