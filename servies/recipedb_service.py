import requests
from config import API_KEY   

BASE_URL = "http://cosylab.iiitd.edu/recipe2-api"


class RecipeService:

    @staticmethod
    def get_recipe_of_the_day():

        url = f"{{baseUrl}}/recipe2-api/recipe/recipeofday"

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }

        try:
            response = requests.get(url, headers=headers, timeout=5)
            response.raise_for_status()
            return response.json()

        except requests.exceptions.RequestException as e:
            print("API Error:", e)
            return {"error": "Request failed"}
