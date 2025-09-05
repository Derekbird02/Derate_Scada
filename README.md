import psycopg2
import pandas as pd
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

SITE_ID = 12345  # Replace with your site ID

# -------------------------
# Email Config
# -------------------------
smtp_server = "smtp.example.com"
smtp_port = 587
from_addr = "youremail@example.com"
to_addr = "youremail@example.com"
subject = "Daily Asset Status Report"
body = "Attached is the daily asset status report."

# -------------------------
# SQL Query
# -------------------------
QUERY = f"""
WITH midnight_status AS (
    SELECT 
        s.assetid,
        s.ieccode,
        s.quality,
        CASE 
            WHEN s.quality = 3 AND s.ieccode IN (1, 2, 4, 13, 14, 15) THEN 'O'
            WHEN s.quality = 3 THEN 'S'
            ELSE 'S'
        END AS status,
        CASE 
            WHEN s.quality = 3 AND s.ieccode = 1  THEN 'Running'
            WHEN s.quality = 3 AND s.ieccode = 2  THEN 'Standby'
            WHEN s.quality = 3 AND s.ieccode = 4  THEN 'Startup'
            WHEN s.quality = 3 AND s.ieccode = 6  THEN 'Faulted'
            WHEN s.quality = 3 AND s.ieccode = 9  THEN 'Communication Fault'
            WHEN s.quality = 3 AND s.ieccode = 13 THEN 'Online'
            WHEN s.quality = 3 AND s.ieccode = 14 THEN 'Curtailment'
            WHEN s.quality = 3 AND s.ieccode = 15 THEN 'Normal Stop'
            ELSE 'Unknown'
        END AS status_text
    FROM state_info s
    WHERE s.siteid = {SITE_ID}
      AND s.blocktimestamp = (date_trunc('day', now() AT TIME ZONE 'US/Central') + interval '1 hour') AT TIME ZONE 'US/Eastern'
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
    m.status || '(' || COALESCE(cc.case_count,0)::text || ')' AS status_with_cases,
    m.status_text
FROM midnight_status m
JOIN asset_info a ON a.assetid = m.assetid
LEFT JOIN case_counts cc ON m.assetid = cc.assetid
ORDER BY a.shortname;
"""

# -------------------------
# Run Query and Save to Excel
# -------------------------
conn = psycopg2.connect(**DB_CONFIG)
df = pd.read_sql(QUERY, conn)
conn.close()

excel_file = "asset_status.xlsx"
df.to_excel(excel_file, index=False)

# -------------------------
# Create Email with Attachment
# -------------------------
msg = MIMEMultipart()
msg['From'] = from_addr
msg['To'] = to_addr
msg['Subject'] = subject

# Attach the body
msg.attach(MIMEText(body, "html"))

# Attach the Excel file
with open(excel_file, "rb") as f:
    part = MIMEBase("application", "vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    part.set_payload(f.read())
    encoders.encode_base64(part)
    part.add_header(
        "Content-Disposition",
        f"attachment; filename= {excel_file}",
    )
    msg.attach(part)

# -------------------------
# Send Email
# -------------------------
try:
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        # Uncomment if authentication is needed
        # server.login(from_addr, "your_email_password")
        server.sendmail(from_addr, [to_addr], msg.as_string())
    print("Email sent successfully.")
except Exception as e:
    print(f"Error sending email: {e}")

