import hvac
import os

client = hvac.Client(
    url=os.environ.get("VAULT_ADDR", "http://127.0.0.1:8200"),
    token=os.environ.get("VAULT_TOKEN")
)

# Note: path="ls_connection" (not "secrets/ls_connection")
secret = client.secrets.kv.read_secret_version(
    path="ls_connection", mount_point="secrets"
)

user = secret["data"]["data"]["user"]
print("DB User:", user)