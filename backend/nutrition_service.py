import os
import requests
from dotenv import load_dotenv

load_dotenv()

USDA_API_KEY = os.getenv("USDA_API_KEY")


def search_food(food_name):
    url = "https://api.nal.usda.gov/fdc/v1/foods/search"

    # Clean up food name for better USDA search
    cleaned_name = (
        food_name.replace("/", " ")
        .replace("-", " ")
        .strip()
    )

    params = {
        "query": cleaned_name,
        "api_key": USDA_API_KEY,
        "pageSize": 1,
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()

        data = response.json()

        if not data.get("foods"):
            print(f"No USDA results found for: {cleaned_name}")
            return None

        return data["foods"][0]

    except requests.exceptions.RequestException as e:
        print(f"USDA API Error: {e}")
        return None


def calculate_nutrition(food_name, weight_g):
    food = search_food(food_name)

    if not food:
        return {
            "name": food_name,
            "estimated_weight_g": weight_g,
            "calories": 0,
            "protein_g": 0,
            "carbs_g": 0,
            "fat_g": 0,
        }

    nutrients = {
        "calories": 0,
        "protein": 0,
        "carbs": 0,
        "fat": 0,
    }

    for nutrient in food.get("foodNutrients", []):
        name = nutrient.get("nutrientName", "").lower()

        if "energy" in name:
            nutrients["calories"] = nutrient.get("value", 0)

        elif "protein" in name:
            nutrients["protein"] = nutrient.get("value", 0)

        elif "carbohydrate" in name:
            nutrients["carbs"] = nutrient.get("value", 0)

        elif "total lipid" in name or name == "fat":
            nutrients["fat"] = nutrient.get("value", 0)

    factor = weight_g / 100

    return {
        "name": food_name,
        "estimated_weight_g": weight_g,
        "calories": round(nutrients["calories"] * factor, 1),
        "protein_g": round(nutrients["protein"] * factor, 1),
        "carbs_g": round(nutrients["carbs"] * factor, 1),
        "fat_g": round(nutrients["fat"] * factor, 1),
    }