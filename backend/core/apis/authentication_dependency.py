from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer

from backend.core.models.user import User
from backend.core.services.current_user_service import CurrentUserService


service = CurrentUserService()

security = HTTPBearer(
    auto_error=False,
)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(
        security
    ),
) -> User:

    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="Authenticatie vereist.",
        )

    if credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=401,
            detail="Ongeldige authenticatie.",
        )

    token = credentials.credentials.strip()

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Ongeldige authenticatie.",
        )

    user = service.get_user(token)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Ongeldige authenticatie.",
        )

    return user