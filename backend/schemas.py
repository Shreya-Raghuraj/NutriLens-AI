from pydantic import BaseModel

class FoodItem(BaseModel):
    name: str
    estimated_weight_g: float

class NutritionItem(BaseModel):
    name: str
    estimated_weight_g: float
    calories: float
    protein_g: float
    carbs_g: float
    fat_g: float

class MealAnalysis(BaseModel):
    foods: list[FoodItem]