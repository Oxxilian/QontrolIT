from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from backend.core.databases.base import Base


class User(Base):
    """
    Gebruiker binnen QontrolIT.

    Een gebruiker heeft een naam,
    een gebruikersnaam en een actieve status.
    """

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    name: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    username: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        index=True,
    )

    active: Mapped[bool] = mapped_column(
        default=True,
    )