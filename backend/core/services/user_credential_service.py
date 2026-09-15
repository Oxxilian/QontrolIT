from backend.core.repositories.user_credential_repository import (
    UserCredentialRepository,
)
from backend.core.services.password_service import PasswordService


class UserCredentialService:
    """
    Service voor de authenticatiegegevens van gebruikers.
    """

    def __init__(self) -> None:
        self.repository = UserCredentialRepository()

    def create(
        self,
        user_id: int,
        password: str,
    ):

        password_hash = PasswordService.hash_password(
            password
        )

        return self.repository.create(
            user_id=user_id,
            password_hash=password_hash,
        )

    def get_by_user(
        self,
        user_id: int,
    ):

        return self.repository.get_by_user(
            user_id
        )

    def verify(
        self,
        user_id: int,
        password: str,
    ) -> bool:

        credential = self.repository.get_by_user(
            user_id
        )

        if credential is None:
            return False

        return PasswordService.verify_password(
            password=password,
            password_hash=credential.password_hash,
        )

    def close(self) -> None:
        self.repository.close()