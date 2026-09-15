from sqlalchemy import select

from backend.core.databases.session import SessionLocal
from backend.core.models.permission import Permission
from backend.core.models.role_permission import RolePermission
from backend.core.models.user_role import UserRole


class AuthorizationService:
    """
    Centrale autorisatieservice binnen QontrolIT.

    Bepaalt welke actieve permissions
    een gebruiker heeft en controleert
    of een gebruiker een specifiek recht heeft.
    """

    def __init__(self) -> None:

        self.db = SessionLocal()

    def get_user_permissions(
        self,
        user_id: int,
    ) -> list[str]:

        statement = (
            select(Permission.name)
            .join(
                RolePermission,
                RolePermission.permission_id == Permission.id,
            )
            .join(
                UserRole,
                UserRole.role_id == RolePermission.role_id,
            )
            .where(
                UserRole.user_id == user_id,
                Permission.active.is_(True),
            )
            .order_by(
                Permission.name
            )
        )

        return list(
            self.db.scalars(
                statement
            )
        )

    def has_permission(
        self,
        user_id: int,
        permission_name: str,
    ) -> bool:

        permissions = self.get_user_permissions(
            user_id,
        )

        return permission_name in permissions

    def close(self) -> None:

        self.db.close()