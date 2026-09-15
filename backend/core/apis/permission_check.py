from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from backend.core.apis import success
from backend.core.apis.authentication_dependency import get_current_user
from backend.core.models.user import User
from backend.core.services.authorization_service import AuthorizationService


router = APIRouter(
    prefix="/permission-check",
    tags=["Permission Check"],
)

service = AuthorizationService()


@router.get("/{permission_name}")
def check_permission(
    permission_name: str,
    current_user: User = Depends(get_current_user),
):

    allowed = service.has_permission(
        user_id=current_user.id,
        permission_name=permission_name,
    )

    if not allowed:
        raise HTTPException(
            status_code=403,
            detail="Geen toestemming voor deze handeling.",
        )

    return success(
        {
            "user_id": current_user.id,
            "permission": permission_name,
            "allowed": True,
        }
    )