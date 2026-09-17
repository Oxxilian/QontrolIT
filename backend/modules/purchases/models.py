from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from backend.core.databases.base import Base


class PurchaseOrder(Base):
    """
    Inkooporder.
    """

    __tablename__ = "purchase_orders"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    order_number: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
    )

    project_number: Mapped[str] = mapped_column(
        String(50),
        index=True,
    )

    phase_code: Mapped[str] = mapped_column(
        String(50),
        index=True,
    )

    project_name: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    phase_name: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    supplier: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    buyer: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    order_date: Mapped[str] = mapped_column(
        String(30),
        default="",
    )

    delivery_date: Mapped[str] = mapped_column(
        String(30),
        default="",
    )

    delivery_address: Mapped[str] = mapped_column(
        String(1000),
        default="",
    )

    pdf_path: Mapped[str] = mapped_column(
        String(1000),
        default="",
    )

    lines: Mapped[list["PurchaseOrderLine"]] = relationship(
        back_populates="purchase_order",
        cascade="all, delete-orphan",
    )

    receipts: Mapped[list["PurchaseReceipt"]] = relationship(
        back_populates="purchase_order",
        cascade="all, delete-orphan",
    )


class PurchaseOrderLine(Base):
    """
    Regel van een inkooporder.
    """

    __tablename__ = "purchase_order_lines"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    purchase_order_id: Mapped[int] = mapped_column(
        ForeignKey("purchase_orders.id"),
    )

    quantity: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    position_number: Mapped[str] = mapped_column(
        String(50),
        default="",
    )

    profile: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    quality: Mapped[str] = mapped_column(
        String(100),
        default="",
    )

    length_mm: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    weight: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    purchase_order: Mapped["PurchaseOrder"] = relationship(
        back_populates="lines",
    )

    receipts: Mapped[list["PurchaseReceipt"]] = relationship(
        back_populates="purchase_order_line",
        cascade="all, delete-orphan",
    )


class PurchaseReceipt(Base):
    """
    Ontvangst van een specifieke regel van een inkooporder.
    """

    __tablename__ = "purchase_receipts"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    purchase_order_id: Mapped[int] = mapped_column(
        ForeignKey("purchase_orders.id"),
        index=True,
    )

    purchase_order_line_id: Mapped[int] = mapped_column(
        ForeignKey("purchase_order_lines.id"),
        index=True,
    )

    quantity_received: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    purchase_order: Mapped["PurchaseOrder"] = relationship(
        back_populates="receipts",
    )

    purchase_order_line: Mapped["PurchaseOrderLine"] = relationship(
        back_populates="receipts",
    )