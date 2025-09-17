import hvac
import os


urlVA=os.environ.get("VAULT_ADDR")
tokenVT=os.environ.get("VAULT_TOKEN")

client = hvac.Client(url=urlVA, token=tokenVT)

read = client.read("secret/data/lsdb/creds")
user = read["data"]["data"]["user"]
print("DB User:", user)
