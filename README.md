import os
import hvac

class VaultClient:
    def __init__(self, url=None, token=None):
        """
        Initialize Vault client using environment variables or provided arguments.
        """
        self.url = url or os.environ.get("VAULT_ADDR")
        self.token = token or os.environ.get("VAULT_TOKEN")
        self.client = hvac.Client(url=self.url, token=self.token)

        if not self.client.is_authenticated():
            raise ValueError("Vault authentication failed. Check VAULT_ADDR and VAULT_TOKEN.")

    def get_secret(self, path, key=None):
        """
        Retrieve a secret from Vault.
        
        Args:
            path (str): Vault path (e.g., "secret/data/lsdb/creds")
            key (str, optional): Key inside the secret (e.g., "user")

        Returns:
            dict | str: Full secret data dict if no key is given, 
                        or just the specific value if key is provided.
        """
        secret = self.client.read(path)
        if not secret:
            raise KeyError(f"No secret found at {path}")

        data = secret["data"]["data"]  # unwrap Vault response

        if key:
            if key not in data:
                raise KeyError(f"Key '{key}' not found in {path}")
            return data[key]
        return data
