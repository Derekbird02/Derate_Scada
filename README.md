private string getNonResetEventsNew(string controllerType, string platform)
{
    string filePath = "platform_data.json";

    if (!File.Exists(filePath))
        return "File Not Found";

    try
    {
        string jsonContent = File.ReadAllText(filePath);
        var eventDictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonContent);

        if (eventDictionary == null || 
            !eventDictionary.ContainsKey("Reference") || 
            !eventDictionary.ContainsKey("Events"))
        {
            return "Invalid JSON structure";
        }

        var referenceData = JsonConvert.DeserializeObject<Dictionary<string, string>>(eventDictionary["Reference"]?.ToString() ?? "");
        var eventsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(eventDictionary["Events"]?.ToString() ?? "");

        if (referenceData == null || eventsData == null)
            return "Error parsing JSON data";

        string key = $"{platform}|{controllerType}";

        if (!referenceData.TryGetValue(key, out string? newplat) || string.IsNullOrEmpty(newplat))
        {
            Console.WriteLine($"No matching newPlat found for Model: {platform}, Controller: {controllerType}");
            return "";
        }

        if (!eventsData.TryGetValue(newplat, out string? emcodes) || string.IsNullOrEmpty(emcodes))
        {
            Console.WriteLine($"No events found for newPlat: {newplat}");
            return "";
        }

        return emcodes;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
        return "Error";
    }
}