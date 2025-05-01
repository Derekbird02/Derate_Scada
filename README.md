import requests
from datetime import datetime
import base64
import json

def extract_value(dataPoints, key):
    for point in dataPoints:
        if point.get('keyName') == key:
            return point.get('values', [{}])[0].get('data', [{}])[0].get('value', '')
    return ''

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

            # Reformat data
            formatted_data = []
            for item in filtered_data:
                dp = item.get("dataPoints", [])

                available_mw_value = extract_value(dp, "AvailableMWs")
                ticket_type = "Tr" if available_mw_value == "" else "Ou"

                formatted_data.append({
                    "identifier": item.get("identifier", ""),
                    "parent": item.get("parent", ""),
                    "timezone": extract_value(dp, "TimeZone"),
                    "status": extract_value(dp, "Status"),
                    "plannedStartTime": extract_value(dp, "PlannedStartTime"),
                    "market": extract_value(dp, "Market"),
                    "plannedEndTime": extract_value(dp, "PlannedEndTime"),
                    "actualStartTime": extract_value(dp, "ActualStartTime"),
                    "resourceID": extract_value(dp, "ResourceID"),
                    "groupID": extract_value(dp, "GroupID"),
                    "outageID": extract_value(dp, "OutageID"),
                    "availableMWs": available_mw_value,
                    "tpsStatus": extract_value(dp, "TPSStatus"),
                    "tpsOutageID": extract_value(dp, "TPSOutageID"),
                    "type": extract_value(dp, "Type"),
                    "ticketType": ticket_type
                })

            # Save to JSON
            with open("flattened_data.json", "w") as f:
                json.dump(formatted_data, f, indent=2)
            print("Flattened data saved to flattened_data.json")

        else:
            print("Unexpected data format:", result)

    except requests.exceptions.RequestException as e:
        print("Error fetching data:", e)

fetch_data()