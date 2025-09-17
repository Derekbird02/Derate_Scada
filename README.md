from vault_helper import VaultClient

# Initialize Vault connection
vault = VaultClient()

# Example: get just the "user" key
db_user = vault.get_secret("secret/data/lsdb/creds", "user")
print("DB User:", db_user)

# Example: get the full secret dictionary
db_creds = vault.get_secret("secret/data/lsdb/creds")
print("Full DB creds:", db_creds)
