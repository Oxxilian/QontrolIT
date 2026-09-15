from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config.settings import APP_NAME
from backend.config.settings import APP_VERSION
from backend.core.databases.init_db import init_databases
from backend.core.loggings import logger

from backend.modules.projects.router import router as project_router
from backend.modules.purchases.router import router as purchase_router
from backend.modules.suppliers.router import router as supplier_router

from backend.core.apis.users import router as user_router
from backend.core.apis.roles import router as role_router
from backend.core.apis.user_roles import router as user_role_router
from backend.core.apis.permissions import router as permission_router
from backend.core.apis.role_permissions import router as role_permission_router
from backend.core.apis.authorization import router as authorization_router
from backend.core.apis.permission_check import router as permission_check_router
from backend.core.apis.sessions import router as session_router
from backend.core.apis.authentication import router as authentication_router


app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)

print(">>> MAIN.PY UITGEVOERD <<<")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    init_databases()
    logger.info("QontrolIT gestart.")


app.include_router(project_router)
app.include_router(purchase_router)
app.include_router(supplier_router)
app.include_router(user_router)
app.include_router(role_router)
app.include_router(user_role_router)
app.include_router(permission_router)
app.include_router(role_permission_router)
app.include_router(authorization_router)
app.include_router(permission_check_router)
app.include_router(session_router)
app.include_router(authentication_router)


@app.get("/")
def root():
    return {
        "application": APP_NAME,
        "version": APP_VERSION,
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }