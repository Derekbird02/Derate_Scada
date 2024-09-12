# Define the folder containing the RDP shortcuts
$rdpFolder = "$env:UserProfile\Desktop\Global Sites"

# Get all .rdp files in the folder
$rdpFiles = Get-ChildItem -Path $rdpFolder -Filter *.rdp

# Create an array to store the results
$results = @()

# Loop through each .rdp file
foreach ($file in $rdpFiles) {
    # Read the content of the .rdp file
    $rdpContent = Get-Content $file.FullName
    
    # Extract the computer address from the "full address" line
    $computerAddress = $rdpContent | Where-Object { $_ -like "full address:s:*" } | ForEach-Object { $_.Split(':')[1].Trim() }
    
    # Store the file name (without extension) and computer address in the results
    $results += [PSCustomObject]@{
        Name    = $file.BaseName
        Address = $computerAddress
    }
}

# Output the results
$results | Format-Table -AutoSize

# Optionally, export to CSV
#$results | Export-Csv -Path "$env:UserProfile\Desktop\RDP_Addresses.csv" -NoTypeInformation