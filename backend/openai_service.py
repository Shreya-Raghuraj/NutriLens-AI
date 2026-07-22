import base64
import json
import os

from dotenv import load_dotenv
from openai import OpenAI
from prompts import FOOD_ANALYSIS_PROMPT

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def analyze_food_image(image_path: str):
    with open(image_path, "rb") as img:
        image_base64 = base64.b64encode(img.read()).decode("utf-8")

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "input_text",
                        "text": FOOD_ANALYSIS_PROMPT,
                    }
                ],
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_image",
                        "image_url": f"data:image/jpeg;base64,{image_base64}",
                    }
                ],
            },
        ],
    )

    try:
        result = json.loads(response.output_text)

        # Ensure required keys always exist
        result.setdefault("foods", [])
        result.setdefault("health_score", 0)
        result.setdefault("health_feedback", [])

        return result

    except json.JSONDecodeError:
        print("❌ Invalid JSON returned by OpenAI:")
        print(response.output_text)

        return {
            "foods": [],
            "health_score": 0,
            "health_feedback": [
                "Unable to generate AI recommendations."
            ],
        }
def nutrition_coach(message: str):
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "input_text",
                        "text": """
You are NutriLens AI, an expert nutrition coach.

Guidelines:
- Give concise answers (100-150 words).
- Be friendly and encouraging.
- Help with nutrition, calories, protein, weight gain, weight loss,
  healthy eating, meal planning and hydration.
- Provide practical tips whenever possible.
- Never diagnose diseases or replace medical advice.
"""
                    }
                ],
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": message,
                    }
                ],
            },
        ],
    )

    return response.output_text