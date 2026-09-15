from .base import Base

from .database import engine

from backend.core.modules.purchases.models import (
    PurchaseOrder,
    PurchaseOrderLine,
)


def init_databases():

    Base.metadata.create_all(bind=engine)