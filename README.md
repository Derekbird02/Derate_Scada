import requests
import base64
import json
from datetime import datetime
import psycopg2
from psycopg2.extras import execute_values

def extract_value(dataPoints, key):
    for point in dataPoints:
        if point.get('keyName') == key:
            return point.get('values', [{}])[0].get('data', [{}])[0].get('value', '')
    return ''

def convert_to_timestamp(date_str):
    if not date_str:
        return None
    try:
        dt = datetime.strptime(date_str, "%m/%d/%Y %I:%M:%S %p")
        return dt.strftime("%Y-%m-%d %H:%M:%S")
    except ValueError:
        return None

def fetch_data():
    today = datetime.today().strftime('%Y-%m-%d')
    fetch_url = f"https://api.ptp.energy/v1/markets/operations/endpoints/Outage-Summary/data?definitions=Ticket%20Item&begin={today}&end={today}"

    username = "test"
    password = "test123456"
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

            formatted_data = []
            for item in filtered_data:
                dp = item.get("dataPoints", [])
                available_mw_value = extract_value(dp, "AvailableMWs")
                ticket_type = "Transmission" if available_mw_value == "" else "Derate"

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

            insert_data_to_db(formatted_data)

        else:
            print("Unexpected data format:", result)

    except requests.exceptions.RequestException as e:
        print("Error fetching data:", e)

def insert_data_to_db(data):
    conn = psycopg2.connect(
        host="localhost",
        database="your_database",
        user="your_user",
        password="your_password"
    )
    cur = conn.cursor()

    values = []
    identifiers = set()

    for item in data:
        identifiers.add(item["identifier"])
        values.append((
            item["identifier"],
            item["parent"],
            item["timezone"],
            item["status"],
            convert_to_timestamp(item["plannedStartTime"]),
            item["market"],
            convert_to_timestamp(item["plannedEndTime"]),
            convert_to_timestamp(item["actualStartTime"]),
            item["resourceID"],
            item["groupID"],
            item["outageID"],
            item["availableMWs"],
            item["tpsStatus"],
            item["tpsOutageID"],
            item["type"],
            item["ticketType"]
        ))

    insert_query = """
        INSERT INTO derate (
            identifier, parent, timezone, status, plannedstarttime,
            market, plannedendtime, actualstarttime, resourceid,
            groupid, outageid, availablemws, tpsstatus, tpsoutageid,
            type, tickettype
        )
        VALUES %s
        ON CONFLICT (identifier) DO UPDATE SET
            plannedendtime = EXCLUDED.plannedendtime,
            tpsstatus = EXCLUDED.tpsstatus,
            tpsoutageid = EXCLUDED.tpsoutageid,
            type = EXCLUDED.type
    """

    execute_values(cur, insert_query, values)
    print(f"{len(values)} records inserted/updated.")

    # Bulk delete entries no longer in current pull
    cur.execute("SELECT identifier FROM derate")
    existing_ids = {row[0] for row in cur.fetchall()}
    ids_to_delete = existing_ids - identifiers

    if ids_to_delete:
        cur.execute("DELETE FROM derate WHERE identifier = ANY(%s)", (list(ids_to_delete),))
        print(f"{len(ids_to_delete)} obsolete records deleted.")

    conn.commit()
    cur.close()
    conn.close()

# Run the script
fetch_data()