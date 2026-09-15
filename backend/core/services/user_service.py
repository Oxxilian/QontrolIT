from backend.core.repositories.user_repository import UserRepository


class UserService:
    """
    Businesslogica voor gebruikers.

    Coördineert het aanmaken,
    ophalen en bijwerken van gebruikers.
    """

    def __init__(self) -> None:

        self.repository = UserRepository()

    def create(
        self,
        name: str,
        username: str,
        active: bool = True,
    ):

        return self.repository.create(
            name=name,
            username=username,
            active=active,
        )

    def get(
        self,
        user_id: int,
    ):

        return self.repository.get(
            user_id,
        )

    def get_all(
        self,
    ):

        return self.repository.get_all()

    def update(
        self,
        user_id: int,
        name: str,
        username: str,
        active: bool,
    ):

        user = self.repository.get(
            user_id,
        )

        if user is None:

            return None

        return self.repository.update(
            user=user,
            name=name,
            username=username,
            active=active,
        )

    def close(self) -> None:

        self.repository.close()