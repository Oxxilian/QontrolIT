from sqlalchemy import select

from backend.core.databases.session import SessionLocal

from backend.core.models.role import Role


class RoleRepository:
    """
    Repository voor rollen.

    Verantwoordelijk voor het opslaan
    en ophalen van rollen.
    """

    def __init__(self) -> None:

        self.db = SessionLocal()

    def create(
        self,
        name: str,
        active: bool = True,
    ) -> Role:

        role = Role(
            name=name,
            active=active,
        )

        self.db.add(
            role,
        )

        self.db.commit()

        self.db.refresh(
            role,
        )

        return role

    def get(
        self,
        role_id: int,
    ) -> Role | None:

        return self.db.scalar(
            select(Role).where(
                Role.id == role_id
            )
        )

    def get_all(
        self,
    ) -> list[Role]:

        return list(
            self.db.scalars(
                select(Role).order_by(
                    Role.name
                )
            )
        )

    def update(
        self,
        role: Role,
        name: str,
        active: bool,
    ) -> Role:

        role.name = name
        role.active = active

        self.db.commit()

        self.db.refresh(
            role,
        )

        return role

    def close(self) -> None:

        self.db.close()