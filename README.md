private string getFrequencyDataAIO(string controllerType, string model, string emCode)
{
    if (_jsonData == null)
    {
        loadJson();
    }

    if (_jsonData == null)
    {
        //return false;
    }

    if (!_jsonData.TryGetValue("Reference", out var referenceObj))
    {
       // return false;
    }

    if (!(referenceObj is JObject reference))
    {
        //return false;
    }

    string key = $"{model}|{controllerType}";

    string platform = reference[key]?.ToString();

    if (string.IsNullOrEmpty(platform))
    {
        //return "false";
    }

    if (!_jsonData.TryGetValue("Frequency", out var freqObj))
    {
        //return "false";
    }

    if (!(freqObj is JObject frequency))
    {
        //return false;
    }

    var emEntry = frequency[emCode] as JObject;
    if (emEntry == null)
    {
        //return false;
    }

    var platformEntry = emEntry[platform] as JObject;
    if (platformEntry == null)
    {
        //return false;
    }

    string oneDay = platformEntry.Value<string?>("sequence");
    string oneWeek = platformEntry.Value<string?>("note");

    return (oneDay, oneWeek);
}
