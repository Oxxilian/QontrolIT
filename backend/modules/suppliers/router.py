from fastapi import APIRouter
from fastapi import Depends
from pydantic import BaseModel

from backend.core.apis import success
from backend.core.apis.authorization_dependency import require_permission
from backend.core.models.user import User
from backend.modules.suppliers.service import SupplierService


router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"],
)

service = SupplierService()


class SupplierRequest(BaseModel):
    name: str
    categories: list[str]
    active: bool = True


def serialize_supplier(supplier) -> dict:
    return {
        "id": supplier.id,
        "name": supplier.name,
        "categories": supplier.categories,
        "active": supplier.active,
    }


@router.get("/status")
def status():
    return success(
        {
            "module": "Suppliers",
            "status": "ready",
        }
    )


@router.get("")
def get_suppliers():
    suppliers = service.get_all()

    return success(
        [
            serialize_supplier(supplier)
            for supplier in suppliers
        ]
    )


@router.get("/{supplier_id}")
def get_supplier(supplier_id: int):
    supplier = service.get(supplier_id)

    if supplier is None:
        return success(None)

    return success(
        serialize_supplier(supplier)
    )


@router.post("")
def create_supplier(
    request: SupplierRequest,
    current_user: User = Depends(
        require_permission("suppliers.manage")
    ),
):

    supplier = service.create(
        name=request.name,
        categories=request.categories,
        active=request.active,
    )

    return success(
        serialize_supplier(supplier)
    )


@router.put("/{supplier_id}")
def update_supplier(
    supplier_id: int,
    request: SupplierRequest,
    current_user: User = Depends(
        require_permission("suppliers.manage")
    ),
):

    supplier = service.update(
        supplier_id=supplier_id,
        name=request.name,
        categories=request.categories,
        active=request.active,
    )

    if supplier is None:
        return success(None)

    return success(
        serialize_supplier(supplier)
    )