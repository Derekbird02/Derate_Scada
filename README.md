private string getNonResetEventsNew(string controllerType, string platform, string strfunctionParameters, NpgsqlConnection cnn)
{
    string filePath = "C:\\Users\\223042104\\Documents\\EnterpriseGit2\\platform_data.json";
    string defaultMark = "10,24,77,98";
    string defaultBac = "153,211";
    string strResult = string.Empty;

    if (!File.Exists(filePath))
    {
        strResult = GetDefaultResult(controllerType);
    }
    else
    {
        try
        {
            // Check for specific controller types first
            if (controllerType.Equals("Argos", StringComparison.OrdinalIgnoreCase))
            {
                strResult = "100,101,102"; // Example codes for Argos
            }
            else if (controllerType.Equals("Windaccess", StringComparison.OrdinalIgnoreCase))
            {
                strResult = "200,201,202"; // Example codes for Windaccess
            }
            else
            {
                // Read and parse JSON file
                string jsonContent = File.ReadAllText(filePath);
                var eventDictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonContent);

                if (eventDictionary != null &&
                    eventDictionary.TryGetValue("Reference", out var referenceObj) && referenceObj != null &&
                    eventDictionary.TryGetValue("Events", out var eventsObj) && eventsObj != null)
                {
                    var referenceData = JsonConvert.DeserializeObject<Dictionary<string, string>>(referenceObj.ToString() ?? "");
                    var eventsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(eventsObj.ToString() ?? "");

                    if (referenceData != null && eventsData != null)
                    {
                        string key = $"{platform}|{controllerType}";

                        if (referenceData.TryGetValue(key, out string? newplat) && !string.IsNullOrEmpty(newplat) &&
                            eventsData.TryGetValue(newplat, out string? emcodes) && !string.IsNullOrEmpty(emcodes))
                        {
                            strResult = emcodes;
                        }
                        else
                        {
                            Console.WriteLine($"No matching data found for Model: {platform}, Controller: {controllerType}");
                            strResult = GetDefaultResult(controllerType);
                        }
                    }
                    else
                    {
                        strResult = GetDefaultResult(controllerType);
                    }
                }
                else
                {
                    strResult = GetDefaultResult(controllerType);
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            strResult = GetDefaultResult(controllerType);
        }
    }

    // Append safety codes if needed
    if (strfunctionParameters.Contains("SAFETY", StringComparison.OrdinalIgnoreCase))
    {
        strResult = string.IsNullOrEmpty(strResult) || strResult == "Error" ? "12,16,18" : $"{strResult},12,16,18";
    }

    return strResult;
}

// Helper function to get default result based on controller type
private string GetDefaultResult(string controllerType)
{
    return controllerType.Equals("Mark", StringComparison.OrdinalIgnoreCase) ? "10,24,77,98" :
           controllerType.Equals("Bachman", StringComparison.OrdinalIgnoreCase) ? "153,211" :
           "Error";
}