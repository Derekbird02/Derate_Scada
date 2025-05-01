import requests
from datetime import datetime
import base64
import json

def fetch_data():
    today = datetime.today().strftime('%Y-%m-%d')
    fetch_url = f"https://api.ptp.energy/v1/markets/operations/endpoints/Outage-Summary/data?definitions=Ticket%20Item&begin={today}&end={today}"
    print("Fetching URL:", fetch_url)

    username = "test@test.com"
    password = "test123"
    credentials = f"{username}:{password}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()

    headers = {
        "Authorization": f"Basic {encoded_credentials}"
    }

    try:
        response = requests.get(fetch_url, headers=headers)
        response.raise_for_status()
        result = response.json()
        print("API Response:", json.dumps(result, indent=2))

        if isinstance(result.get('data'), list):
            filtered_data = [
                item for item in result['data']
                if isinstance(item.get('dataPoints'), list) and
                not any(
                    (point.get('keyName') == "TPSStatus" and point.get('values', [{}])[0].get('data', [{}])[0].get('value') == "Completed") or
                    (point.get('keyName') == "ResourceType" and point.get('values', [{}])[0].get('data', [{}])[0].get('value') in ["Transmission", "Storage"])
                    for point in item['dataPoints']
                )
            ]
            print("Filtered Data:", json.dumps(filtered_data, indent=2))
        else:
            print("Unexpected data format:", result)
    except requests.exceptions.RequestException as e:
        print("Error fetching data:", e)

fetch_data()