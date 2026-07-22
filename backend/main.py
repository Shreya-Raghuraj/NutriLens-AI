from pathlib import Path

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from pydantic import BaseModel

from nutrition_service import calculate_nutrition
from openai_service import analyze_food_image, nutrition_coach

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

app = FastAPI(title="NutriLens AI")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://nutri-lens-ai-nu.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CoachRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {
        "message": "NutriLens AI Backend Running 🚀"
    }


@app.post("/analyze-meal")
async def analyze_meal(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    ai_result = analyze_food_image(str(file_path))

    foods = []
    total_calories = 0
    total_protein = 0
    total_carbs = 0
    total_fat = 0

    for item in ai_result["foods"]:
        nutrition = calculate_nutrition(
            item["name"],
            item["estimated_weight_g"]
        )

        if nutrition:
            foods.append(nutrition)

            total_calories += nutrition["calories"]
            total_protein += nutrition["protein_g"]
            total_carbs += nutrition["carbs_g"]
            total_fat += nutrition["fat_g"]

    return {
        "foods": foods,
        "total_calories": round(total_calories, 1),
        "total_protein_g": round(total_protein, 1),
        "total_carbs_g": round(total_carbs, 1),
        "total_fat_g": round(total_fat, 1),
        "health_score": ai_result.get("health_score", 0),
        "health_feedback": ai_result.get("health_feedback", []),
    }


@app.post("/coach")
async def coach(request: CoachRequest):
    try:
        reply = nutrition_coach(request.message)

        return {
            "reply": reply
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )