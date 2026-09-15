from sqlalchemy import select

from backend.core.databases.session import SessionLocal

from backend.core.models.user_role import UserRole


class UserRoleRepository:
    """
    Repository voor de koppeling tussen gebruikers en rollen.
    """

    def __init__(self) -> None:

        self.db = SessionLocal()

    def create(
        self,
        user_id: int,
        role_id: int,
    ) -> UserRole:

        user_role = UserRole(
            user_id=user_id,
            role_id=role_id,
        )

        self.db.add(
            user_role,
        )

        self.db.commit()

        self.db.refresh(
            user_role,
        )

        return user_role

    def get_by_user(
        self,
        user_id: int,
    ) -> UserRole | None:

        return self.db.scalar(
            select(UserRole).where(
                UserRole.user_id == user_id
            )
        )

    def get_by_role(
        self,
        role_id: int,
    ) -> list[UserRole]:

        return list(
            self.db.scalars(
                select(UserRole).where(
                    UserRole.role_id == role_id
                )
            )
        )

    def update(
        self,
        user_role: UserRole,
        role_id: int,
    ) -> UserRole:

        user_role.role_id = role_id

        self.db.commit()

        self.db.refresh(
            user_role,
        )

        return user_role

    def close(self) -> None:

        self.db.close()