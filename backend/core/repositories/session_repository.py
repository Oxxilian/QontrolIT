from sqlalchemy import select

from backend.core.databases.session import SessionLocal
from backend.core.models.session import Session


class SessionRepository:
    """
    Repository voor authenticatiesessies.

    Verantwoordelijk voor het opslaan
    en ophalen van sessies.
    """

    def __init__(self) -> None:

        self.db = SessionLocal()

    def create(
        self,
        user_id: int,
        token: str,
        expires_at,
    ) -> Session:

        session = Session(
            user_id=user_id,
            token=token,
            expires_at=expires_at,
        )

        self.db.add(
            session,
        )

        self.db.commit()

        self.db.refresh(
            session,
        )

        return session

    def get_by_token(
        self,
        token: str,
    ) -> Session | None:

        return self.db.scalar(
            select(Session).where(
                Session.token == token
            )
        )

    def close(self) -> None:

        self.db.close()