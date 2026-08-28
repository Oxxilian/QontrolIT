from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    # Applicatie
    APP_NAME: str = "QontrolIT"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Database type
    DATABASE_TYPE: str = "sqlite"

    # PostgreSQL instellingen
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "qontrolit"
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "postgres"

    @property
    def DATABASE_URL(self) -> str:

        if self.DATABASE_TYPE.lower() == "sqlite":
            return f"sqlite:///{BASE_DIR}/database/qontrolit.db"

        return (
            f"postgresql+psycopg://"
            f"{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}"
            f"/{self.DB_NAME}"
        )

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


settings = Settings()