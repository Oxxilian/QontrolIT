from sqlalchemy.orm import Session

from backend.modules.materials.model import Material
from backend.modules.materials.schema import (
    MaterialCreate,
    MaterialUpdate,
)


def get_all(db: Session):
    return db.query(Material).order_by(Material.material_type).all()


def get_by_id(db: Session, material_id: int):
    return (
        db.query(Material)
        .filter(Material.id == material_id)
        .first()
    )


def create(db: Session, material: MaterialCreate):
    db_material = Material(**material.model_dump())

    db.add(db_material)
    db.commit()
    db.refresh(db_material)

    return db_material


def update(
    db: Session,
    material_id: int,
    material: MaterialUpdate,
):
    db_material = get_by_id(db, material_id)

    if not db_material:
        return None

    for key, value in material.model_dump().items():
        setattr(db_material, key, value)

    db.commit()
    db.refresh(db_material)

    return db_material


def delete(db: Session, material_id: int):
    db_material = get_by_id(db, material_id)

    if not db_material:
        return None

    db.delete(db_material)
    db.commit()

    return db_material