from sqlalchemy import select

from backend.core.databases.session import SessionLocal

from backend.core.models.permission import Permission


class PermissionRepository:
    """
    Repository voor permissions.

    Verantwoordelijk voor het opslaan
    en ophalen van permissions.
    """

    def __init__(self) -> None:

        self.db = SessionLocal()

    def create(
        self,
        name: str,
        active: bool = True,
    ) -> Permission:

        permission = Permission(
            name=name,
            active=active,
        )

        self.db.add(
            permission,
        )

        self.db.commit()

        self.db.refresh(
            permission,
        )

        return permission

    def get(
        self,
        permission_id: int,
    ) -> Permission | None:

        return self.db.scalar(
            select(Permission).where(
                Permission.id == permission_id
            )
        )

    def get_all(
        self,
    ) -> list[Permission]:

        return list(
            self.db.scalars(
                select(Permission).order_by(
                    Permission.name
                )
            )
        )

    def update(
        self,
        permission: Permission,
        name: str,
        active: bool,
    ) -> Permission:

        permission.name = name
        permission.active = active

        self.db.commit()

        self.db.refresh(
            permission,
        )

        return permission

    def close(self) -> None:

        self.db.close()