from sqlalchemy import select

from backend.core.databases.session import SessionLocal
from backend.core.models.user import User


class UserRepository:
    """
    Repository voor gebruikers.

    Verantwoordelijk voor het opslaan
    en ophalen van gebruikers.
    """

    def __init__(self) -> None:
        self.db = SessionLocal()

    def create(
        self,
        name: str,
        username: str,
        active: bool = True,
    ) -> User:

        user = User(
            name=name,
            username=username,
            active=active,
        )

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user

    def get(
        self,
        user_id: int,
    ) -> User | None:

        return self.db.scalar(
            select(User).where(
                User.id == user_id
            )
        )

    def get_by_username(
        self,
        username: str,
    ) -> User | None:

        return self.db.scalar(
            select(User).where(
                User.username == username
            )
        )

    def get_all(self) -> list[User]:

        return list(
            self.db.scalars(
                select(User).order_by(User.name)
            )
        )

    def update(
        self,
        user: User,
        name: str,
        username: str,
        active: bool,
    ) -> User:

        user.name = name
        user.username = username
        user.active = active

        self.db.commit()
        self.db.refresh(user)

        return user

    def close(self) -> None:
        self.db.close()