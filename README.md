import requests
import msal
from datetime import datetime, timedelta, timezone

# --- CONFIG ---
CLIENT_ID = "your-client-id"
CLIENT_SECRET = "your-client-secret"
TENANT_ID = "your-tenant-id"
USER_EMAIL = "your-email@domain.com"

AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
SCOPE = ["https://graph.microsoft.com/.default"]

# --- AUTH ---
app = msal.ConfidentialClientApplication(
    CLIENT_ID,
    authority=AUTHORITY,
    client_credential=CLIENT_SECRET,
)

token = app.acquire_token_for_client(scopes=SCOPE)

if "access_token" not in token:
    raise Exception(token)

access_token = token["access_token"]

# --- TIME FILTER ---
ten_min_ago = datetime.now(timezone.utc) - timedelta(minutes=10)
time_filter = ten_min_ago.isoformat()

# --- REQUEST ---
url = f"https://graph.microsoft.com/v1.0/users/{USER_EMAIL}/mailFolders/inbox/messages"

headers = {
    "Authorization": f"Bearer {access_token}"
}

params = {
    "$filter": f"receivedDateTime ge {time_filter}",
    "$orderby": "receivedDateTime DESC",
    "$top": 25
}

res = requests.get(url, headers=headers, params=params)

if res.status_code != 200:
    print(res.text)
    raise Exception("Graph call failed")

emails = res.json().get("value", [])

# --- OUTPUT ---
for e in emails:
    print(e["subject"])
    print(e["from"]["emailAddress"]["address"])
    print(e["receivedDateTime"])
    print("-" * 40)
