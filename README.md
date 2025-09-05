import psycopg2
import pandas as pd
from openpyxl import Workbook
import smtplib
from email.message import EmailMessage
import ssl

# -------------------------
# CONFIG
# -------------------------
DB_CONFIG = {
    "dbname": "your_db",
    "user": "your_user",
    "password": "your_pass",
    "host": "your_host",
    "port": 5432
}

SITE_ID = 12345   # <-- put your siteid here
OUTPUT_FILE = "asset_status.xlsx"

EMAIL_FROM = "youremail@example.com"
EMAIL_TO = "youremail@example.com"
SMTP_SERVER = "smtp.example.com"
SMTP_PORT = 587
EMAIL_USER = "youremail@example.com"
EMAIL_PASS = "your_email_password"
# -------------------------


# Query (your exact one)
QUERY = f"""
WITH midnight_status AS (
    SELECT 
        s.assetid,
        CASE 
            WHEN s.quality = 3 AND s.ieccode IN (1, 2, 4, 13, 14, 15) THEN 'O'
            WHEN s.quality = 3 THEN 'S'
            ELSE 'S'
        END AS status
    FROM state_info s
    WHERE s.siteid = {SITE_ID}
      AND s.blocktimestamp = (
          -- Convert Central midnight to Eastern (since blocktimestamp is stored Eastern)
          timezone('US/Eastern', timezone('US/Central', date_trunc('day', now())))
      )
),
case_counts AS (
    SELECT 
        c.assetid,
        COUNT(*) AS case_count
    FROM cases c
    WHERE c.siteid = {SITE_ID}
      AND c.type = 2
      AND c.insertdate >= now() - interval '24 hours'
    GROUP BY c.assetid
)
SELECT 
    a.shortname,
    m.status || '(' || COALESCE(cc.case_count, 0)::text || ')' AS status_with_cases
FROM midnight_status m
JOIN asset_info a ON a.assetid = m.assetid
LEFT JOIN case_counts cc ON m.assetid = cc.assetid
ORDER BY a.shortname;
"""

def fetch_data():
    conn = psycopg2.connect(**DB_CONFIG)
    df = pd.read_sql(QUERY, conn)
    conn.close()
    return df

def save_to_excel(df, filename):
    df.to_excel(filename, index=False)

def send_email(filename):
    msg = EmailMessage()
    msg["From"] = EMAIL_FROM
    msg["To"] = EMAIL_TO
    msg["Subject"] = "Daily Asset Status Report"

    msg.set_content("Attached is the daily asset status report.")

    # Attach Excel file
    with open(filename, "rb") as f:
        file_data = f.read()
        msg.add_attachment(
            file_data,
            maintype="application",
            subtype="vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            filename=filename
        )

    # Send email
    context = ssl.create_default_context()
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls(context=context)
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)

if __name__ == "__main__":
    df = fetch_data()
    save_to_excel(df, OUTPUT_FILE)
    send_email(OUTPUT_FILE)
    print("Report sent successfully!")
