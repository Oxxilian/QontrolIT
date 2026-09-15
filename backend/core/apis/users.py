from fastapi import APIRouter
from pydantic import BaseModel

from backend.core.apis import success
from backend.core.services.user_service import UserService


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

service = UserService()


class UserRequest(BaseModel):

    name: str

    username: str

    active: bool = True


def serialize_user(
    user,
) -> dict:

    return {
        "id": user.id,
        "name": user.name,
        "username": user.username,
        "active": user.active,
    }


@router.get("")
def get_users():

    users = service.get_all()

    return success(
        [
            serialize_user(
                user
            )
            for user in users
        ]
    )


@router.get("/{user_id}")
def get_user(
    user_id: int,
):

    user = service.get(
        user_id,
    )

    if user is None:

        return success(
            None
        )

    return success(
        serialize_user(
            user
        )
    )


@router.post("")
def create_user(
    request: UserRequest,
):

    user = service.create(
        name=request.name,
        username=request.username,
        active=request.active,
    )

    return success(
        serialize_user(
            user
        )
    )


@router.put("/{user_id}")
def update_user(
    user_id: int,
    request: UserRequest,
):

    user = service.update(
        user_id=user_id,
        name=request.name,
        username=request.username,
        active=request.active,
    )

    if user is None:

        return success(
            None
        )

    return success(
        serialize_user(
            user
        )
    )