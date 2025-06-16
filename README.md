private bool EnsureJsonLoaded()
{
    if (_jsonData == null)
    {
        loadJson();
    }
    return _jsonData != null;
}

private string? GetPlatform(string model, string controllerType)
{
    if (!EnsureJsonLoaded()) return null;
    if (!_jsonData.TryGetValue("Reference", out var referenceObj) || referenceObj is not JObject reference)
        return null;

    string key = $"{model}|{controllerType}";
    return reference[key]?.ToString();
}

private JObject? GetPlatformEntry(string emCode, string platform)
{
    if (!_jsonData.TryGetValue("Frequency", out var freqObj) || freqObj is not JObject frequency)
        return null;

    var emEntry = frequency[emCode] as JObject;
    if (emEntry == null) return null;

    return emEntry[platform] as JObject;
}

private string getDefaultCodes(string controllertype)
{
    return controllertype.Equals("Mil", StringComparison.OrdinalIgnoreCase) ? "10" :
           controllertype.Equals("Bac", StringComparison.OrdinalIgnoreCase) ? "11" :
           controllertype.Equals("Win", StringComparison.OrdinalIgnoreCase) ? "3" :
           controllertype.Equals("Art", StringComparison.OrdinalIgnoreCase) ? "1" :
           "Error";
}


public string getEvents(string controllerType, string model, string strfunctionParameters, NpgsqlConnection cnn)
{
    if (!EnsureJsonLoaded() ||
        controllerType.Equals("Art", StringComparison.OrdinalIgnoreCase) ||
        controllerType.Equals("Win", StringComparison.OrdinalIgnoreCase))
    {
        return getDefaultCodes(controllerType);
    }

    string strResult = string.Empty;

    try
    {
        if (_jsonData.TryGetValue("Reference", out var referenceObj) &&
            _jsonData.TryGetValue("Events", out var eventsObj) &&
            referenceObj is not null && eventsObj is not null)
        {
            var referenceData = JsonConvert.DeserializeObject<Dictionary<string, string>>(referenceObj.ToString() ?? "");
            var eventsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(eventsObj.ToString() ?? "");

            string key = $"{model}|{controllerType}";

            if (referenceData?.TryGetValue(key, out string? platform) == true &&
                !string.IsNullOrEmpty(platform) &&
                eventsData?.TryGetValue(platform, out string? emcodes) == true &&
                !string.IsNullOrEmpty(emcodes))
            {
                var emcodeList = emcodes.Split(',').ToList();

                if (_jsonData.TryGetValue("Ex", out var exceptionsObj) && exceptionsObj != null)
                {
                    var exceptionsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(exceptionsObj.ToString() ?? "");
                    if (exceptionsData?.TryGetValue(platform, out string? exceptions) == true && !string.IsNullOrEmpty(exceptions))
                    {
                        var exceptionList = exceptions.Split(',');
                        emcodeList = emcodeList.Except(exceptionList).ToList();
                    }
                }

                strResult = string.Join(",", emcodeList);
            }
            else
            {
                strResult = getDefaultCodes(controllerType);
            }
        }
        else
        {
            strResult = getDefaultCodes(controllerType);
        }
    }
    catch
    {
        strResult = getDefaultCodes(controllerType);
    }

    if (strfunctionParameters.Contains("plant", StringComparison.OrdinalIgnoreCase) &&
        (controllerType == "Mil" || controllerType == "Bac"))
    {
        strResult = string.IsNullOrEmpty(strResult) ? "4" : $"{strResult},4";
    }

    return strResult;
}


private bool checkFreq(string controllerType, string model, string emCode, int dayFreq, int weekFreq)
{
    var platform = GetPlatform(model, controllerType);
    if (platform == null) return false;

    var platformEntry = GetPlatformEntry(emCode, platform);
    if (platformEntry == null) return false;

    int oneDay = platformEntry.Value<int?>("one_day") ?? int.MaxValue;
    int oneWeek = platformEntry.Value<int?>("one_week") ?? int.MaxValue;

    return dayFreq >= oneDay || weekFreq >= oneWeek;
}


private bool checkFreqExists(string controllerType, string model, string emCode)
{
    var platform = GetPlatform(model, controllerType);
    if (platform == null) return false;

    var platformEntry = GetPlatformEntry(emCode, platform);
    return platformEntry?.Value<string?>("sequence") != null;
}


private (string? sequence, string? note)? getSeq(string control, string model, string emCode)
{
    var platform = GetPlatform(model, control);
    if (platform == null) return null;

    var platformEntry = GetPlatformEntry(emCode, platform);
    if (platformEntry == null) return null;

    return (
        platformEntry.Value<string?>("sequence"),
        platformEntry.Value<string?>("note")
    );
}
