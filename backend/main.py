from contextlib import asynccontextmanager

from fastapi import FastAPI
from sqlalchemy import text

from backend.core.database import Base, engine

# Routers
from backend.modules.materials.router import router as materials_router
from backend.modules.projects.router import router as projects_router
from backend.modules.importer.router import router as importer_router

# Models (nodig voor het aanmaken van tabellen)
from backend.modules.materials import model as materials_model
from backend.modules.projects import model as projects_model


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        # Maak alle database-tabellen aan
        Base.metadata.create_all(bind=engine)

        # Test de databaseverbinding
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        print("✅ Database verbonden")

    except Exception as e:
        print(f"❌ Databasefout: {e}")

    yield


app = FastAPI(
    title="QontrolIT",
    version="1.0.0",
    lifespan=lifespan,
)

# Modules
app.include_router(materials_router)
app.include_router(projects_router)
app.include_router(importer_router)


@app.get("/")
def root():
    return {
        "application": "QontrolIT",
        "version": "1.0.0",
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }