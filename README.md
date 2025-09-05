import psycopg2
import pandas as pd
from openpyxl import load_workbook
from openpyxl.styles import PatternFill
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import smtplib

# -------------------------
# Database Config
# -------------------------
DB_CONFIG = {
    "dbname": "your_db",
    "user": "your_user",
    "password": "your_pass",
    "host": "your_host",
    "port": 5432
}

SITE_ID = 12345
excel_file = "asset_status.xlsx"

# -------------------------
# Run Query and Save to Excel
# -------------------------
QUERY = f"""
-- Your full query here, output must include 'status_with_cases' column
"""

conn = psycopg2.connect(**DB_CONFIG)
df = pd.read_sql(QUERY, conn)
conn.close()

# Save DataFrame to Excel
df.to_excel(excel_file, index=False)

# -------------------------
# Apply cell coloring using openpyxl
# -------------------------
wb = load_workbook(excel_file)
ws = wb.active

red_fill = PatternFill(start_color="FFC7CE", end_color="FFC7CE", fill_type="solid")
green_fill = PatternFill(start_color="C6EFCE", end_color="C6EFCE", fill_type="solid")

# Assuming 'status_with_cases' is in column B (adjust if needed)
status_col = None
for idx, cell in enumerate(ws[1], 1):
    if cell.value == "status_with_cases":
        status_col = idx
        break

if status_col:
    for row in ws.iter_rows(min_row=2, min_col=status_col, max_col=status_col):
        cell = row[0]
        if str(cell.value).startswith("R"):
            cell.fill = red_fill
        elif str(cell.value).startswith("G"):
            cell.fill = green_fill

wb.save(excel_file)

# -------------------------
# Email setup (same as before)
# -------------------------
smtp_server = "smtp.example.com"
smtp_port = 587
from_addr = "you@example.com"
to_addrs = ["recipient1@example.com", "recipient2@example.com"]
subject = "Daily Asset Status Report"
body = "Attached is the daily asset status report."

msg = MIMEMultipart()
msg['From'] = from_addr
msg['To'] = ", ".join(to_addrs)
msg['Subject'] = subject
msg.attach(MIMEText(body, "html"))

with open(excel_file, "rb") as f:
    part = MIMEBase("application", "vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    part.set_payload(f.read())
    encoders.encode_base64(part)
    part.add_header("Content-Disposition", f"attachment; filename={excel_file}")
    msg.attach(part)

# Send the email
with smtplib.SMTP(smtp_server, smtp_port) as server:
    server.starttls()
    # server.login(from_addr, "your_password")  # if authentication needed
    server.sendmail(from_addr, to_addrs, msg.as_string())

print("Email sent with colored Excel successfully.")
