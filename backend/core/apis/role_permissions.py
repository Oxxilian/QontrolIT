from fastapi import APIRouter
from pydantic import BaseModel

from backend.core.apis import success
from backend.core.services.role_permission_service import (
    RolePermissionService,
)


router = APIRouter(
    prefix="/role-permissions",
    tags=["Role Permissions"],
)

service = RolePermissionService()


class RolePermissionRequest(BaseModel):

    role_id: int

    permission_id: int


def serialize_role_permission(
    role_permission,
) -> dict:

    return {
        "id": role_permission.id,
        "role_id": role_permission.role_id,
        "permission_id": role_permission.permission_id,
    }


@router.get("/role/{role_id}")
def get_role_permissions(
    role_id: int,
):

    role_permissions = service.get_by_role(
        role_id,
    )

    return success(
        [
            serialize_role_permission(
                role_permission
            )
            for role_permission in role_permissions
        ]
    )


@router.get("/permission/{permission_id}")
def get_permission_roles(
    permission_id: int,
):

    role_permissions = service.get_by_permission(
        permission_id,
    )

    return success(
        [
            serialize_role_permission(
                role_permission
            )
            for role_permission in role_permissions
        ]
    )


@router.post("")
def create_role_permission(
    request: RolePermissionRequest,
):

    role_permission = service.create(
        role_id=request.role_id,
        permission_id=request.permission_id,
    )

    return success(
        serialize_role_permission(
            role_permission
        )
    )