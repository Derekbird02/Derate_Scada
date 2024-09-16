import csv

# Open the CSV file
with open('servers.csv', 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    
    # Skip the header if there is one
    next(csvreader)
    
    for row in csvreader:
        servername = row[0]  # Replace with the correct column index for servername
        server_address = row[1]  # Replace with the correct column index for server address
        domain = row[2]  # Replace with the correct column index for domain
        
        # XML structure with placeholders replaced
        server_xml = f"""
<server>
  <properties>
    <displayName>{servername}</displayName>
    <name>{server_address}</name>
  </properties>
  <logonCredentials inherit="None">
    <profileName scope="Local">Custom</profileName>
    <userName/>
    <password/>
    <domain>{domain}</domain>
  </logonCredentials>
</server>
"""
        # Print or save the XML structure
        print(server_xml)