import requests
from requests.auth import HTTPBasicAuth
import json

def fetch_data():
    username = "geroc.roteam@ge.com"
    password = "R@Cdn$2030R@Cdn$2030"
    url = "https://api.ptp.energy/v1/markets/operations/endpoints/Outage-Summary/data?definitions=Ticket%20Item&begin=2025-02-21&end=2025-03-03"

    try:
        response = requests.get(url, auth=HTTPBasicAuth(username, password))
        response.raise_for_status()  # Raise an error for HTTP errors (4xx and 5xx)
        
        data = response.json()  # Get response as JSON
        
        # Save to a JSON file
        with open("response.json", "w") as json_file:
            json.dump(data, json_file, indent=4)
        
        return data
    except requests.exceptions.RequestException as e:
        print("Error fetching data:", e)
        return None

# Example usage
if __name__ == "__main__":
    data = fetch_data()
    print(data)
