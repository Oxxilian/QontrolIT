from pathlib import Path


APP_NAME = "QontrolIT"
APP_VERSION = "1.0.0"

BASE_DIR = Path(__file__).resolve().parent.parent

DATABASE_NAME = "qontrolit.db"
DATABASE_PATH = BASE_DIR / DATABASE_NAME