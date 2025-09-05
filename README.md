# Create the email
msg = MIMEText(body, "html")  # Set "plain" for text, "html" for HTML
msg['Subject'] = subject
msg['From'] = from_addr
msg['To'] = to_addr

# Send the email
try:
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.sendmail(from_addr, [to_addr], msg.as_string())
    print("Email sent successfully.")
except Exception as e:
    print(f"Error sending email: {e}")
