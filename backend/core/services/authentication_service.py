from backend.core.repositories.user_repository import UserRepository
from backend.core.services.session_service import SessionService
from backend.core.services.user_credential_service import (
    UserCredentialService,
)


class AuthenticationService:
    """
    Centrale authenticatieservice binnen QontrolIT.

    Verantwoordelijk voor het controleren van
    gebruikersgegevens en het aanmaken van
    een geldige sessie.
    """

    def __init__(self) -> None:
        self.user_repository = UserRepository()
        self.credential_service = UserCredentialService()
        self.session_service = SessionService()

    def login(
        self,
        username: str,
        password: str,
        expires_at,
    ):

        user = self.user_repository.get_by_username(
            username
        )

        if user is None:
            return None

        if not user.active:
            return None

        if not self.credential_service.verify(
            user_id=user.id,
            password=password,
        ):
            return None

        return self.session_service.create(
            user_id=user.id,
            expires_at=expires_at,
        )

    def close(self) -> None:
        self.user_repository.close()
        self.credential_service.close()
        self.session_service.close()