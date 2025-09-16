import hvac
import os

client = hvac.Client(
    url=os.environ.get("VAULT_ADDR", "http://127.0.0.1:8200"),
    token=os.environ.get("VAULT_TOKEN")
)

# KV v1
secret = client.secrets.kv.read_secret(
    path="ls_connection",  # key name
    mount_point="secrets"  # your KV engine mount path
)

data = secret["data"]  # v1 stores data directly here
print(data)  # {'user': 'dbuser'}
print("DB User:", data['user'])