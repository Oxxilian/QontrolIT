from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.core.database import get_db
from backend.modules.materials import service
from backend.modules.materials.schema import (
    MaterialCreate,
    MaterialResponse,
    MaterialUpdate,
)

router = APIRouter(
    prefix="/materials",
    tags=["Materials"],
)


@router.get("/", response_model=list[MaterialResponse])
def get_materials(db: Session = Depends(get_db)):
    return service.get_all(db)


@router.get("/{material_id}", response_model=MaterialResponse)
def get_material(material_id: int, db: Session = Depends(get_db)):
    material = service.get_by_id(db, material_id)

    if material is None:
        raise HTTPException(status_code=404, detail="Material not found")

    return material


@router.post("/", response_model=MaterialResponse, status_code=201)
def create_material(material: MaterialCreate, db: Session = Depends(get_db)):
    return service.create(db, material)


@router.put("/{material_id}", response_model=MaterialResponse)
def update_material(
    material_id: int,
    material: MaterialUpdate,
    db: Session = Depends(get_db),
):
    updated = service.update(db, material_id, material)

    if updated is None:
        raise HTTPException(status_code=404, detail="Material not found")

    return updated


@router.delete("/{material_id}")
def delete_material(material_id: int, db: Session = Depends(get_db)):
    deleted = service.delete(db, material_id)

    if deleted is None:
        raise HTTPException(status_code=404, detail="Material not found")

    return {"message": "Material deleted"}