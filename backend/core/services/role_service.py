from backend.core.repositories.role_repository import RoleRepository


class RoleService:
    """
    Businesslogica voor rollen.

    Coördineert het aanmaken,
    ophalen en bijwerken van rollen.
    """

    def __init__(self) -> None:

        self.repository = RoleRepository()

    def create(
        self,
        name: str,
        active: bool = True,
    ):

        return self.repository.create(
            name=name,
            active=active,
        )

    def get(
        self,
        role_id: int,
    ):

        return self.repository.get(
            role_id,
        )

    def get_all(
        self,
    ):

        return self.repository.get_all()

    def update(
        self,
        role_id: int,
        name: str,
        active: bool,
    ):

        role = self.repository.get(
            role_id,
        )

        if role is None:

            return None

        return self.repository.update(
            role=role,
            name=name,
            active=active,
        )

    def close(self) -> None:

        self.repository.close()