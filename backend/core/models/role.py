from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from backend.core.databases.base import Base


class Role(Base):
    """
    Rol binnen QontrolIT.

    Een rol beschrijft de functie en
    verantwoordelijkheid van een gebruiker.
    """

    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        index=True,
    )

    active: Mapped[bool] = mapped_column(
        default=True,
    )