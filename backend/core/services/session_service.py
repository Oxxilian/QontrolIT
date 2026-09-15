from datetime import datetime

import secrets

from backend.core.repositories.session_repository import SessionRepository
from backend.core.repositories.user_repository import UserRepository


class SessionService:
    def __init__(self) -> None:
        self.repository = SessionRepository()
        self.user_repository = UserRepository()

    def create(self, user_id: int, expires_at):

        user = self.user_repository.get(user_id)

        if user is None:
            return None

        if not user.active:
            return None

        token = secrets.token_urlsafe(32)

        return self.repository.create(
            user_id=user_id,
            token=token,
            expires_at=expires_at,
        )

    def get_by_token(self, token: str):

        session = self.repository.get_by_token(token)

        if session is None:
            return None

        if session.expires_at <= datetime.now():
            return None

        user = self.user_repository.get(session.user_id)

        if user is None:
            return None

        if not user.active:
            return None

        return session

    def close(self) -> None:
        self.repository.close()
        self.user_repository.close()