from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from backend.core.databases.base import Base


class UserRole(Base):
    """
    Koppeling tussen een gebruiker en een rol.

    Een gebruiker kan hiermee aan één rol
    worden gekoppeld.
    """

    __tablename__ = "user_roles"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        unique=True,
    )

    role_id: Mapped[int] = mapped_column(
        ForeignKey("roles.id"),
    )