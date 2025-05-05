import psycopg2
from datetime import datetime

# === Step 1: Define function to extract field values ===
def extract_value(dataPoints, keyName):
    for dp in dataPoints:
        if dp["keyName"] == keyName and dp["values"]:
            if dp["values"][0]["data"]:
                return dp["values"][0]["data"][0]["value"]
    return None

# === Step 2: Convert date to timestamp format ===
def convert_to_timestamp(date_str):
    if not date_str:
        return None
    try:
        dt = datetime.strptime(date_str, "%m/%d/%Y %I:%M:%S %p")
        return dt.strftime("%Y-%m-%d %H:%M:%S")
    except ValueError:
        return None

# === Step 3: Reformat your input data ===
def reformat_data(raw_data):
    formatted = []

    for item in raw_data:
        dataPoints = item.get("dataPoints", [])

        availableMWs = extract_value(dataPoints, "AvailableMWs")

        # Determine ticketType logic
        if availableMWs is None:
            ticketType = "Tr"
        elif extract_value(dataPoints, "AvailableMWs") is None:
            ticketType = "ou"
        else:
            ticketType = ""

        formatted.append({
            "identifier": item.get("identifier"),
            "parent": item.get("parent"),
            "timezone": extract_value(dataPoints, "TimeZone"),
            "status": extract_value(dataPoints, "Status"),
            "plannedStartTime": extract_value(dataPoints, "PlannedStartTime"),
            "market": extract_value(dataPoints, "Market"),
            "plannedEndTime": extract_value(dataPoints, "PlannedEndTime"),
            "actualStartTime": extract_value(dataPoints, "ActualStartTime"),
            "resourceID": extract_value(dataPoints, "ResourceID"),
            "groupID": extract_value(dataPoints, "GroupID"),
            "outageID": extract_value(dataPoints, "OutageID"),
            "availableMWs": availableMWs,
            "tpsStatus": extract_value(dataPoints, "TPSStatus"),
            "tpsOutageID": extract_value(dataPoints, "TPSOutageID"),
            "type": extract_value(dataPoints, "Type"),
            "ticketType": ticketType
        })

    return formatted

# === Step 4: Insert/update/delete in the database ===
def upsert_derate(formatted_data):
    conn = psycopg2.connect(
        dbname="your_db",
        user="your_user",
        password="your_password",
        host="your_host",
        port="your_port"
    )
    cur = conn.cursor()

    identifiers = [item['identifier'] for item in formatted_data if item['identifier']]

    for item in formatted_data:
        cur.execute("""
            INSERT INTO derate (
                identifier, parent, timezone, status, plannedstarttime, market,
                plannedendtime, actualstarttime, resourceid, groupid, outageid,
                availablemws, tpsstatus, tpsoutageid, type, tickettype
            )
            VALUES (
                %(identifier)s, %(parent)s, %(timezone)s, %(status)s, %(plannedstarttime)s, %(market)s,
                %(plannedendtime)s, %(actualstarttime)s, %(resourceid)s, %(groupid)s, %(outageid)s,
                %(availablemws)s, %(tpsstatus)s, %(tpsoutageid)s, %(type)s, %(tickettype)s
            )
            ON CONFLICT (identifier) DO UPDATE SET
                plannedendtime = EXCLUDED.plannedendtime,
                tpsstatus = EXCLUDED.tpsstatus,
                tpsoutageid = EXCLUDED.tpsoutageid,
                type = EXCLUDED.type
        """, {
            "identifier": item["identifier"],
            "parent": item.get("parent"),
            "timezone": item.get("timezone"),
            "status": item.get("status"),
            "plannedstarttime": convert_to_timestamp(item.get("plannedStartTime")),
            "market": item.get("market"),
            "plannedendtime": convert_to_timestamp(item.get("plannedEndTime")),
            "actualstarttime": convert_to_timestamp(item.get("actualStartTime")),
            "resourceid": item.get("resourceID"),
            "groupid": item.get("groupID"),
            "outageid": item.get("outageID"),
            "availablemws": item.get("availableMWs"),
            "tpsstatus": item.get("tpsStatus"),
            "tpsoutageid": item.get("tpsOutageID"),
            "type": item.get("type"),
            "tickettype": item.get("ticketType")
        })

    # Delete any identifiers not in the current data
    cur.execute("""
        DELETE FROM derate
        WHERE identifier NOT IN %s
    """, (tuple(identifiers),))

    conn.commit()
    cur.close()
    conn.close()
    print("Upsert and cleanup complete.")

# === Step 5: Main entry point ===
if __name__ == "__main__":
    # Replace this with your actual data pull
    from your_data_source import raw_data  # <-- replace this import with your source
    formatted = reformat_data(raw_data)
    upsert_derate(formatted)
