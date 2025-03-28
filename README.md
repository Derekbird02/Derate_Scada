import requests

urls = ["https://example.com/api1", "https://example.com/api2", "https://example.com/api3"]

for url in urls:
    try:
        res = requests.post(url, timeout=5)  # Set a timeout in seconds
        res.raise_for_status()  # Raise an error for HTTP errors (e.g., 500, 404)
        print(f"Success: {res.status_code} for {url}")
    except requests.exceptions.Timeout:
        print(f"Timeout error on {url}, skipping...")
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")