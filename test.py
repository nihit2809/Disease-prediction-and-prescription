import requests

url = "http://127.0.0.1:5000/home"

response = requests.get(url)

if response.status_code == 200:
    print("API is returning results.")
    print("Response content:", response)
else:
    print("API request failed with status code:", response.status_code)
