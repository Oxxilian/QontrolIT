from sqlalchemy import JSON
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from backend.core.databases.base import Base


class Supplier(Base):
    """
    Leverancier binnen QontrolIT.

    Een leverancier kan meerdere categorieën
    leveren en kan actief of inactief zijn.
    """

    __tablename__ = "suppliers"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    name: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
    )

    categories: Mapped[list[str]] = mapped_column(
        JSON,
        default=list,
    )

    active: Mapped[bool] = mapped_column(
        default=True,
    )