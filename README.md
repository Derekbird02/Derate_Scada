import hvac
import os

client = hvac.Client(
    url=os.environ.get("VAULT_ADDR", "http://127.0.0.1:8200"),
    token=os.environ.get("VAULT_TOKEN")
)

secret = client.secrets.kv.read_secret_version(
    path="dbschema", mount_point="secrets"
)

schema = secret["data"]["data"]["schema"]
print("Schema:", schema)
