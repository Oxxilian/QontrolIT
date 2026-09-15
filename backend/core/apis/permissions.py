from fastapi import APIRouter
from pydantic import BaseModel

from backend.core.apis import success
from backend.core.services.permission_service import PermissionService


router = APIRouter(
    prefix="/permissions",
    tags=["Permissions"],
)

service = PermissionService()


class PermissionRequest(BaseModel):

    name: str

    active: bool = True


def serialize_permission(
    permission,
) -> dict:

    return {
        "id": permission.id,
        "name": permission.name,
        "active": permission.active,
    }


@router.get("")
def get_permissions():

    permissions = service.get_all()

    return success(
        [
            serialize_permission(
                permission
            )
            for permission in permissions
        ]
    )


@router.get("/{permission_id}")
def get_permission(
    permission_id: int,
):

    permission = service.get(
        permission_id,
    )

    if permission is None:

        return success(
            None
        )

    return success(
        serialize_permission(
            permission
        )
    )


@router.post("")
def create_permission(
    request: PermissionRequest,
):

    permission = service.create(
        name=request.name,
        active=request.active,
    )

    return success(
        serialize_permission(
            permission
        )
    )


@router.put("/{permission_id}")
def update_permission(
    permission_id: int,
    request: PermissionRequest,
):

    permission = service.update(
        permission_id=permission_id,
        name=request.name,
        active=request.active,
    )

    if permission is None:

        return success(
            None
        )

    return success(
        serialize_permission(
            permission
        )
    )