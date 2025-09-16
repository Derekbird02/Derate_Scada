vault_addr="http://127.0.0.1:8200"
vault_token="fff"

client = hvac.Client(
    url=os.environ.get("VAULT_ADDR", "http://127.0.0.1:8200"),
    token=os.environ.get("VAULT_TOKEN")
)

client = hvac.Client(url=vault_addr, token=vault_token)
