import requests
from app.config import FLAVORDB_API_KEY


BASE_URL = "https://api.flavordb.com"  # replace with actual endpoint


class FlavorDBService:

    @staticmethod
    def get_ingredient_flavor_profile(ingredient_name: str):

        url = f"{BASE_URL}/ingredient"

        headers = {
            "Authorization": f"Bearer {FLAVORDB_API_KEY}",
            "Content-Type": "application/json"
        }

        params = {
            "name": ingredient_name
        }

        try:
            response = requests.get(url, headers=headers, params=params, timeout=5)
            response.raise_for_status()
            return response.json()

        except requests.exceptions.RequestException as e:
            print("FlavorDB Error:", e)
            return {"error": "FlavorDB request failed"}
