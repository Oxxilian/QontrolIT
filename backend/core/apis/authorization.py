from fastapi import APIRouter

from backend.core.apis import success
from backend.core.services.authorization_service import (
    AuthorizationService,
)


router = APIRouter(
    prefix="/authorization",
    tags=["Authorization"],
)

service = AuthorizationService()


@router.get("/user/{user_id}/permissions")
def get_user_permissions(
    user_id: int,
):

    permissions = service.get_user_permissions(
        user_id,
    )

    return success(
        permissions
    )