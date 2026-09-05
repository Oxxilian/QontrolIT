from fastapi import FastAPI

from backend.config.settings import APP_NAME, APP_VERSION
from backend.core.databases.init_db import init_databases
from backend.core.loggings import logger

from backend.modules.projects.router import router as project_router


app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)


@app.on_event("startup")
def startup():

    init_databases()

    logger.info("QontrolIT gestart.")


app.include_router(project_router)


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