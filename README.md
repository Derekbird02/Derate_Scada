private string getNonResetEventsNew(string controllerType, string platform, string strfunctionParameters, NpgsqlConnection cnn)
{
    string filePath = "C:\\Users\\223042104\\Documents\\EnterpriseGit2\\platform_data.json";
    string strResult = string.Empty;

    if (!File.Exists(filePath))
        return "File Not Found";

    try
    {
        // Check for controller type first
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
            // Proceed with main logic if controllerType is not Argos or Windaccess
            string jsonContent = File.ReadAllText(filePath);
            var eventDictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonContent);

            if (eventDictionary == null)
                return "Error";

            if (!eventDictionary.TryGetValue("Reference", out var referenceObj) || referenceObj == null ||
                !eventDictionary.TryGetValue("Events", out var eventsObj) || eventsObj == null)
            {
                return "Error";
            }

            var referenceData = JsonConvert.DeserializeObject<Dictionary<string, string>>(referenceObj.ToString() ?? "");
            var eventsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(eventsObj.ToString() ?? "");

            if (referenceData == null || eventsData == null)
                return "Error parsing JSON data";

            string key = $"{platform}|{controllerType}";

            if (!referenceData.TryGetValue(key, out string? newplat) || string.IsNullOrEmpty(newplat))
            {
                Console.WriteLine($"No matching newPlat found for Model: {platform}, Controller: {controllerType}");
                return strResult; // Return whatever was appended earlier
            }

            if (!eventsData.TryGetValue(newplat, out string? emcodes) || string.IsNullOrEmpty(emcodes))
            {
                Console.WriteLine($"No events found for newPlat: {newplat}");
                return strResult; // Return whatever was appended earlier
            }

            // Append events from JSON lookup
            strResult = string.IsNullOrEmpty(strResult) ? emcodes : $"{strResult},{emcodes}";
        }

        // Check strfunctionParameters for "SAFETY" and append additional codes if needed
        if (strfunctionParameters.Contains("SAFETY", StringComparison.OrdinalIgnoreCase))
        {
            strResult = string.IsNullOrEmpty(strResult) ? "12,16,18" : $"{strResult},12,16,18";
        }

        return strResult;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
        return "Error";
    }
}