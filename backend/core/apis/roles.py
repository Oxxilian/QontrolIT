from fastapi import APIRouter
from pydantic import BaseModel

from backend.core.apis import success
from backend.core.services.role_service import RoleService


router = APIRouter(
    prefix="/roles",
    tags=["Roles"],
)

service = RoleService()


class RoleRequest(BaseModel):

    name: str

    active: bool = True


def serialize_role(
    role,
) -> dict:

    return {
        "id": role.id,
        "name": role.name,
        "active": role.active,
    }


@router.get("")
def get_roles():

    roles = service.get_all()

    return success(
        [
            serialize_role(
                role
            )
            for role in roles
        ]
    )


@router.get("/{role_id}")
def get_role(
    role_id: int,
):

    role = service.get(
        role_id,
    )

    if role is None:

        return success(
            None
        )

    return success(
        serialize_role(
            role
        )
    )


@router.post("")
def create_role(
    request: RoleRequest,
):

    role = service.create(
        name=request.name,
        active=request.active,
    )

    return success(
        serialize_role(
            role
        )
    )


@router.put("/{role_id}")
def update_role(
    role_id: int,
    request: RoleRequest,
):

    role = service.update(
        role_id=role_id,
        name=request.name,
        active=request.active,
    )

    if role is None:

        return success(
            None
        )

    return success(
        serialize_role(
            role
        )
    )