private string getNonResetEventsNew(string controllerType, string platform)
{
    string filePath = "platform_data.json";

    if (!File.Exists(filePath))
        return "File Not Found";
    try
    {
        string jsonContent = File.ReadAllText(filePath);
        var eventDictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonContent);
        Dictionary<string, string>? referenceData = JsonConvert.DeserializeObject<Dictionary<string, string>>(eventDictionary["Reference"].ToString());
        Dictionary<string, string>? eventsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(eventDictionary["Events"].ToString());
        string key = $"{platform}|{controllerType}";

        if (!referenceData.TryGetValue(key, out string newplat))
        {
            Console.WriteLine($"No matching newPlat found for Model: {platform}, Controller: {controllerType}");
            return "";
        }

        if (!eventsData.TryGetValue(newplat, out string emcodes))
        {
            Console.WriteLine($"No events found for newPlat: {newplat}");
            return "";
        }

        return emcodes;
    }
    catch (Exception ex)
    {
        return "Error";
    }
    
}
