from fastapi import Depends
from fastapi import HTTPException

from backend.core.apis.authentication_dependency import get_current_user
from backend.core.models.user import User
from backend.core.services.authorization_service import AuthorizationService


service = AuthorizationService()


def require_permission(permission_name: str):

    def dependency(
        current_user: User = Depends(get_current_user),
    ) -> User:

        allowed = service.has_permission(
            user_id=current_user.id,
            permission_name=permission_name,
        )

        if not allowed:
            raise HTTPException(
                status_code=403,
                detail="Geen toestemming voor deze handeling.",
            )

        return current_user

    return dependency