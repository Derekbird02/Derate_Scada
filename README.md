import csv
import xml.etree.ElementTree as ET

# Create the root element
rdcman = ET.Element('RDCMan')
file_element = ET.SubElement(rdcman, 'file')
group = ET.SubElement(file_element, 'group')
properties = ET.SubElement(group, 'properties')
group_name = ET.SubElement(properties, 'name')
group_name.text = 'Imported Servers'  # Change this group name as needed

# Read CSV and add servers
with open('servers.csv', 'r') as csvfile:
    csvreader = csv.DictReader(csvfile)
    
    for row in csvreader:
        server = ET.SubElement(group, 'server')

        # Add properties section for the name and display name
        properties = ET.SubElement(server, 'properties')
        
        name = ET.SubElement(properties, 'name')
        name.text = row['ServerName']  # Server name for the 'name' field
        
        displayName = ET.SubElement(properties, 'displayName')
        displayName.text = row['ServerName']  # Server name for the 'displayName' field
        
        # Set the address field outside of properties
        address = ET.SubElement(server, 'address')
        address.text = row['ServerAddress']  # Use ServerAddress for the 'address' field

        # Add logon credentials
        logonCredentials = ET.SubElement(server, 'logonCredentials')
        userName = ET.SubElement(logonCredentials, 'userName')
        userName.text = f"{row['Domain']}\\Username"  # Replace 'Username' with actual username or leave as is

# Convert to XML string and save to a file
tree = ET.ElementTree(rdcman)
tree.write('imported_servers.rdg', encoding='utf-8', xml_declaration=True)