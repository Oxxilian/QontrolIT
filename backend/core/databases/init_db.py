from .base import Base
from .database import engine


def init_databases():
    Base.metadata.create_all(bind=engine)