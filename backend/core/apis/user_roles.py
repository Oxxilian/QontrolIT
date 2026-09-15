from fastapi import APIRouter
from pydantic import BaseModel

from backend.core.apis import success
from backend.core.services.user_role_service import UserRoleService


router = APIRouter(
    prefix="/user-roles",
    tags=["User Roles"],
)

service = UserRoleService()


class UserRoleRequest(BaseModel):

    user_id: int

    role_id: int


def serialize_user_role(
    user_role,
) -> dict:

    return {
        "id": user_role.id,
        "user_id": user_role.user_id,
        "role_id": user_role.role_id,
    }


@router.get("/user/{user_id}")
def get_user_role(
    user_id: int,
):

    user_role = service.get_by_user(
        user_id,
    )

    if user_role is None:

        return success(
            None
        )

    return success(
        serialize_user_role(
            user_role
        )
    )


@router.get("/role/{role_id}")
def get_role_users(
    role_id: int,
):

    user_roles = service.get_by_role(
        role_id,
    )

    return success(
        [
            serialize_user_role(
                user_role
            )
            for user_role in user_roles
        ]
    )


@router.post("")
def create_user_role(
    request: UserRoleRequest,
):

    user_role = service.create(
        user_id=request.user_id,
        role_id=request.role_id,
    )

    return success(
        serialize_user_role(
            user_role
        )
    )


@router.put("/user/{user_id}")
def update_user_role(
    user_id: int,
    request: UserRoleRequest,
):

    user_role = service.update(
        user_id=user_id,
        role_id=request.role_id,
    )

    if user_role is None:

        return success(
            None
        )

    return success(
        serialize_user_role(
            user_role
        )
    )