from datetime import datetime

from fastapi import APIRouter
from fastapi import HTTPException
from pydantic import BaseModel

from backend.core.apis import success
from backend.core.services.session_service import SessionService


router = APIRouter(
    prefix="/sessions",
    tags=["Sessions"],
)

service = SessionService()


class SessionRequest(BaseModel):
    user_id: int
    expires_at: datetime


def serialize_session(session, include_token: bool = False) -> dict:
    data = {
        "id": session.id,
        "user_id": session.user_id,
        "expires_at": session.expires_at,
    }

    if include_token:
        data["token"] = session.token

    return data


@router.get("/{token}")
def get_session(token: str):

    session = service.get_by_token(token)

    if session is None:
        return success(None)

    return success(
        serialize_session(session)
    )


@router.post("")
def create_session(request: SessionRequest):

    session = service.create(
        user_id=request.user_id,
        expires_at=request.expires_at,
    )

    if session is None:
        raise HTTPException(
            status_code=400,
            detail="Gebruiker bestaat niet of is niet actief.",
        )

    return success(
        serialize_session(
            session,
            include_token=True,
        )
    )