from pydantic import BaseModel, ConfigDict


class MaterialBase(BaseModel):
    material_type: str
    dimension: str
    length: int | None = None
    quality: str = "S235"
    remark: str | None = None
    active: bool = True


class MaterialCreate(MaterialBase):
    pass


class MaterialUpdate(MaterialBase):
    pass


class MaterialResponse(MaterialBase):
    id: int

    model_config = ConfigDict(from_attributes=True)