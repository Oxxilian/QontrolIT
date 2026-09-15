from backend.core.repositories.user_role_repository import UserRoleRepository


class UserRoleService:
    """
    Businesslogica voor de koppeling
    tussen gebruikers en rollen.
    """

    def __init__(self) -> None:

        self.repository = UserRoleRepository()

    def create(
        self,
        user_id: int,
        role_id: int,
    ):

        return self.repository.create(
            user_id=user_id,
            role_id=role_id,
        )

    def get_by_user(
        self,
        user_id: int,
    ):

        return self.repository.get_by_user(
            user_id,
        )

    def get_by_role(
        self,
        role_id: int,
    ):

        return self.repository.get_by_role(
            role_id,
        )

    def update(
        self,
        user_id: int,
        role_id: int,
    ):

        user_role = self.repository.get_by_user(
            user_id,
        )

        if user_role is None:

            return None

        return self.repository.update(
            user_role=user_role,
            role_id=role_id,
        )

    def close(self) -> None:

        self.repository.close()