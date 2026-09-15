from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from backend.core.databases.base import Base


class UserCredential(Base):
    """
    Authenticatiegegevens van een gebruiker.

    Het wachtwoord wordt uitsluitend als
    veilige hash opgeslagen.
    """

    __tablename__ = "user_credentials"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        unique=True,
        index=True,
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
    )