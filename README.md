using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

public class EventFetcher
{
    private Dictionary<string, string> referenceData;
    private Dictionary<string, string> eventsData;

    public EventFetcher(string jsonFilePath)
    {
        LoadJsonData(jsonFilePath);
    }

    private void LoadJsonData(string jsonFilePath)
    {
        if (!File.Exists(jsonFilePath))
        {
            throw new FileNotFoundException("JSON file not found: " + jsonFilePath);
        }

        string jsonContent = File.ReadAllText(jsonFilePath);
        var jsonData = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonContent);

        // Deserialize Reference data
        referenceData = JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonData["Reference"].ToString());

        // Deserialize Events data
        eventsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonData["Events"].ToString());
    }

    public List<string> GetEvents(string model, string controller)
    {
        string key = $"{model}|{controller}";  // Use the same format as Python script

        if (!referenceData.TryGetValue(key, out string newPlat))
        {
            Console.WriteLine($"No matching newPlat found for Model: {model}, Controller: {controller}");
            return new List<string>();
        }

        if (!eventsData.TryGetValue(newPlat, out string emcodes))
        {
            Console.WriteLine($"No events found for newPlat: {newPlat}");
            return new List<string>();
        }

        return new List<string>(emcodes.Split(','));
    }
}