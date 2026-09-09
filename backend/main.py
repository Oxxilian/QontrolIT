from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config.settings import APP_NAME
from backend.config.settings import APP_VERSION
from backend.core.databases.init_db import init_databases
from backend.core.loggings import logger

from backend.modules.projects.router import router as project_router


app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)

#
# CORS
#

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