from backend.core.repositories.user_repository import UserRepository
from backend.core.services.session_service import SessionService


class CurrentUserService:
    """
    Centrale service voor het bepalen van
    de huidige ingelogde gebruiker.
    """

    def __init__(self) -> None:
        self.session_service = SessionService()
        self.user_repository = UserRepository()

    def get_user(self, token: str):

        session = self.session_service.get_by_token(
            token
        )

        if session is None:
            return None

        user = self.user_repository.get(
            session.user_id
        )

        if user is None:
            return None

        if not user.active:
            return None

        return user

    def close(self) -> None:
        self.session_service.close()
        self.user_repository.close()