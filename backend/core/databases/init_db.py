from .base import Base

from .database import engine

from backend.modules.purchases.models import (
    PurchaseOrder,
    PurchaseOrderLine,
)

from backend.modules.suppliers.models import (
    Supplier,
)

from backend.core.models.user import (
    User,
)

from backend.core.models.role import (
    Role,
)

from backend.core.models.user_role import (
    UserRole,
)

from backend.core.models.permission import (
    Permission,
)

from backend.core.models.role_permission import (
    RolePermission,
)

from backend.core.models.session import (
    Session,
)

from backend.core.models.user_credential import (
    UserCredential,
)


def init_databases():

    Base.metadata.create_all(
        bind=engine,
    )