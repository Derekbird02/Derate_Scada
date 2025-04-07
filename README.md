if (referenceData.TryGetValue(key, out string? newplat) && !string.IsNullOrEmpty(newplat) &&
    eventsData.TryGetValue(newplat, out string? emcodes) && !string.IsNullOrEmpty(emcodes))
{
    // Split EM codes
    var emcodeList = emcodes.Split(',').ToList();

    // Try to fetch and apply exceptions
    if (eventDictionary.TryGetValue("Exceptions", out var exceptionsObj) && exceptionsObj != null)
    {
        var exceptionsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(exceptionsObj.ToString() ?? "");
        if (exceptionsData != null && exceptionsData.TryGetValue(newplat, out string? exceptions) && !string.IsNullOrEmpty(exceptions))
        {
            var exceptionList = exceptions.Split(',');
            emcodeList = emcodeList.Except(exceptionList).ToList(); // Remove exceptions
        }
    }

    strResult = string.Join(",", emcodeList);
}
