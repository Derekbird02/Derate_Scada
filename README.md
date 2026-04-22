import requests
import msal
from datetime import datetime, timedelta, timezone

# --- CONFIG ---
CLIENT_ID = "your-client-id"
CLIENT_SECRET = "your-client-secret"
TENANT_ID = "your-tenant-id"

AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
SCOPE = ["https://graph.microsoft.com/.default"]

# --- AUTH ---
app = msal.ConfidentialClientApplication(
    CLIENT_ID,
    authority=AUTHORITY,
    client_credential=CLIENT_SECRET,
)

token_response = app.acquire_token_for_client(scopes=SCOPE)

if "access_token" not in token_response:
    raise Exception("Failed to get token:", token_response)

access_token = token_response["access_token"]

# --- TIME FILTER (last 10 minutes) ---
ten_minutes_ago = datetime.now(timezone.utc) - timedelta(minutes=10)
time_filter = ten_minutes_ago.isoformat()

# --- GRAPH REQUEST ---
url = "https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages"

headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json"
}

params = {
    "$filter": f"receivedDateTime ge {time_filter}",
    "$orderby": "receivedDateTime DESC",
    "$top": 25
}

response = requests.get(url, headers=headers, params=params)

if response.status_code != 200:
    print(response.text)
    raise Exception("Graph API call failed")

emails = response.json().get("value", [])

# --- OUTPUT ---
for mail in emails:
    print("Subject:", mail["subject"])
    print("From:", mail["from"]["emailAddress"]["address"])
    print("Received:", mail["receivedDateTime"])
    print("-" * 50)
