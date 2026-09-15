from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from backend.core.databases.base import Base


class RolePermission(Base):
    """
    Koppeling tussen een rol en een permission.

    Een rol kan meerdere permissions hebben.
    Een permission kan aan meerdere rollen
    worden gekoppeld.
    """

    __tablename__ = "role_permissions"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    role_id: Mapped[int] = mapped_column(
        ForeignKey("roles.id"),
    )

    permission_id: Mapped[int] = mapped_column(
        ForeignKey("permissions.id"),
    )