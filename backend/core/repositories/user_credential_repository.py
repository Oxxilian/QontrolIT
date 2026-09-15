from sqlalchemy import select

from backend.core.databases.session import SessionLocal
from backend.core.models.user_credential import UserCredential


class UserCredentialRepository:
    """
    Repository voor authenticatiegegevens van gebruikers.
    """

    def __init__(self) -> None:
        self.db = SessionLocal()

    def create(
        self,
        user_id: int,
        password_hash: str,
    ) -> UserCredential:

        credential = UserCredential(
            user_id=user_id,
            password_hash=password_hash,
        )

        self.db.add(credential)
        self.db.commit()
        self.db.refresh(credential)

        return credential

    def get_by_user(
        self,
        user_id: int,
    ) -> UserCredential | None:

        return self.db.scalar(
            select(UserCredential).where(
                UserCredential.user_id == user_id
            )
        )

    def close(self) -> None:
        self.db.close()