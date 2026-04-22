USER_EMAIL = "your-email@domain.com"

url = f"https://graph.microsoft.com/v1.0/users/{USER_EMAIL}/mailFolders/inbox/messages"

params = {
    "$filter": f"receivedDateTime ge {time_filter}",
    "$orderby": "receivedDateTime DESC",
    "$top": 25
}
