from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from backend.core.databases.base import Base


class Session(Base):
    """
    Actieve authenticatiesessie binnen QontrolIT.

    Een sessie hoort bij één gebruiker en bevat
    een unieke sessiesleutel en een verloopmoment.
    """

    __tablename__ = "sessions"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        index=True,
    )

    token: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
    )

    expires_at: Mapped[datetime] = mapped_column(
        DateTime,
    )