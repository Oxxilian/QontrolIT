from datetime import datetime

from fastapi import APIRouter
from fastapi import HTTPException
from pydantic import BaseModel

from backend.core.apis import success
from backend.core.services.authentication_service import (
    AuthenticationService,
)


router = APIRouter(
    prefix="/authentication",
    tags=["Authentication"],
)

service = AuthenticationService()


class LoginRequest(BaseModel):
    username: str
    password: str
    expires_at: datetime


def serialize_session(session) -> dict:
    return {
        "id": session.id,
        "user_id": session.user_id,
        "token": session.token,
        "expires_at": session.expires_at,
    }


@router.post("/login")
def login(request: LoginRequest):

    session = service.login(
        username=request.username,
        password=request.password,
        expires_at=request.expires_at,
    )

    if session is None:
        raise HTTPException(
            status_code=401,
            detail="Ongeldige gebruikersnaam of wachtwoord.",
        )

    return success(
        serialize_session(session)
    )